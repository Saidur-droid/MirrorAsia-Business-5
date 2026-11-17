import assert from "node:assert/strict";
import { Client } from "@modelcontextprotocol/client";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/client";

const baseUrl = process.env.MCP_BASE_URL ?? "http://127.0.0.1:8787";
const token = process.env.MCP_API_TOKEN;

if (!token || token.length < 32) {
  throw new Error("MCP_API_TOKEN must contain at least 32 characters.");
}

function parseToolJson(result) {
  assert.equal(result.isError, false, "MCP tool returned an error");
  const text = result.content?.find((item) => item.type === "text")?.text;
  assert.ok(text, "MCP tool did not return a text payload");
  return JSON.parse(text);
}

async function connect(path) {
  const transport = new StreamableHTTPClientTransport(
    new URL(baseUrl + path),
    {
      requestInit: {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    }
  );
  const client = new Client(
    {
      name: "mirrorasia-mcp-smoke",
      version: "0.1.0"
    },
    {
      versionNegotiation: { mode: "auto" }
    }
  );
  await client.connect(transport);
  return client;
}

const healthResponse = await fetch(baseUrl + "/health");
assert.equal(healthResponse.status, 200);
const health = await healthResponse.json();
assert.equal(health.service, "mirrorasia-mcp");
assert.deepEqual(health.endpoints, [
  "/mcp/simulation",
  "/mcp/research",
  "/mcp/population"
]);

const unauthenticatedResponse = await fetch(baseUrl + "/mcp/simulation");
assert.equal(unauthenticatedResponse.status, 401, "MCP endpoint must reject missing Bearer token");

const scenario = {
  country: "Bangladesh",
  city: "Dhaka",
  targetSegment: "young-professionals",
  concepts: [
    { id: "A", name: "Midnight Focus", color: "black", message: "Fuel the moments that matter" },
    { id: "B", name: "Crimson Lift", color: "red", message: "A bright boost for your busy day" }
  ],
  prices: [79, 89, 99],
  syntheticAgents: 120,
  seed: 42
};

const simulationClient = await connect("/mcp/simulation");
try {
  const listed = await simulationClient.listTools();
  const names = listed.tools.map((tool) => tool.name);
  assert.ok(names.includes("run_illustrative_simulation"));
  assert.ok(names.includes("get_simulation_methodology"));

  const first = parseToolJson(await simulationClient.callTool({
    name: "run_illustrative_simulation",
    arguments: scenario
  }));
  const second = parseToolJson(await simulationClient.callTool({
    name: "run_illustrative_simulation",
    arguments: scenario
  }));

  assert.equal(first.rows.length, 18);
  assert.deepEqual(first.rows, second.rows);
  assert.equal(first.mode, "preview");
  assert.equal(first.provenance.realRespondents, 0);
  assert.equal(first.confidence.tier, "Uncalibrated");
  assert.equal(first.confidence.mirrorScore, null);

  const methodology = parseToolJson(await simulationClient.callTool({
    name: "get_simulation_methodology",
    arguments: {}
  }));
  assert.equal(methodology.llmInferenceUsedByThisTool, false);
  assert.equal(methodology.calibrated, false);
} finally {
  await simulationClient.close();
}

const researchClient = await connect("/mcp/research");
try {
  const listed = await researchClient.listTools();
  const names = listed.tools.map((tool) => tool.name);
  assert.ok(names.includes("list_research_datasets"));
  assert.ok(names.includes("search_research_sources"));
  assert.ok(names.includes("get_research_quality_checks"));

  const search = parseToolJson(await researchClient.callTool({
    name: "search_research_sources",
    arguments: { query: "Chattogram", limit: 5 }
  }));
  assert.ok(search.results.some((source) => source.datasetId === "BBS-PHC-CTG-WARDS"));
  assert.equal(search.rag, false);

  const quality = parseToolJson(await researchClient.callTool({
    name: "get_research_quality_checks",
    arguments: {}
  }));
  assert.equal(quality.qualityChecks.chattogram_household_discrepancy, 360);
  assert.equal(quality.qualityChecks.real_consumer_benchmark_available, false);
  assert.equal(quality.summary.integratedIntoLiveSimulation, false);
} finally {
  await researchClient.close();
}

const populationClient = await connect("/mcp/population");
try {
  const listed = await populationClient.listTools();
  const names = listed.tools.map((tool) => tool.name);
  assert.ok(names.includes("get_population_pack"));
  assert.ok(names.includes("get_population_segment"));
  assert.ok(names.includes("get_population_readiness"));

  const pack = parseToolJson(await populationClient.callTool({
    name: "get_population_pack",
    arguments: {}
  }));
  assert.equal(pack.populationPack.id, "BD-DHAKA-ILLUSTRATIVE-v0.1");
  assert.equal(pack.populationPack.sampleSize, null);
  assert.equal(pack.populationPack.evidenceType, "illustrative");

  const readiness = parseToolJson(await populationClient.callTool({
    name: "get_population_readiness",
    arguments: {}
  }));
  assert.equal(readiness.realRespondents, 0);
  assert.equal(readiness.buyingAccuracyMeasured, false);
  assert.equal(readiness.bbsHiesResearchPackIntegratedIntoLiveEngine, false);
} finally {
  await populationClient.close();
}

console.log("MirrorAsia MCP smoke tests passed: 3 servers, 8 tools, Streamable HTTP, Bearer auth.");
