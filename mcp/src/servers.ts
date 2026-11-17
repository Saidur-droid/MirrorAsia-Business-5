import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";
import { runSimulation } from "../../src/lib/engine.ts";
import { ILLUSTRATIVE_POPULATION } from "../../src/lib/population.ts";
import { COLORS, SEGMENTS, parseScenario } from "../../src/lib/schema.ts";
import {
  RESEARCH_QUALITY_CHECKS,
  RESEARCH_SOURCES,
  getResearchSummary,
  searchResearchSources
} from "./research.ts";

const EMPTY_INPUT = z.object({}).strict();

function textResult(value: unknown) {
  return {
    content: [{
      type: "text" as const,
      text: JSON.stringify(value, null, 2)
    }]
  };
}

const conceptInput = z.object({
  id: z.enum(["A", "B"]),
  name: z.string().min(2).max(64),
  color: z.enum(COLORS),
  message: z.string().min(2).max(180)
}).strict();

const simulationInput = z.object({
  country: z.literal("Bangladesh"),
  city: z.literal("Dhaka"),
  targetSegment: z.enum(SEGMENTS),
  concepts: z.tuple([conceptInput, conceptInput]),
  prices: z.array(z.number().int().min(20).max(500)).min(2).max(5),
  syntheticAgents: z.number().int().min(50).max(500).default(120),
  seed: z.number().int().min(0).max(2147483647).default(42)
}).strict();

export function createSimulationServer() {
  const server = new McpServer({
    name: "mirrorasia-simulation",
    version: "0.1.0"
  });

  server.registerTool(
    "run_illustrative_simulation",
    {
      description: "Run MirrorAsia's deterministic Bangladesh/Dhaka FMCG preview engine. Uses hand-authored assumptions and seeded synthetic draws only; it does not call an LLM, does not represent real people, and is not calibrated or a demand forecast.",
      inputSchema: simulationInput
    },
    async (input) => {
      const scenario = parseScenario(input);
      return textResult(runSimulation(scenario));
    }
  );

  server.registerTool(
    "get_simulation_methodology",
    {
      description: "Return the current simulation method, provenance and non-negotiable limitations.",
      inputSchema: EMPTY_INPUT
    },
    async () => textResult({
      engine: "src/lib/engine.ts",
      mode: "deterministic preview",
      randomisation: "seeded pseudo-random draws",
      assumptions: [
        "hand-authored package-colour affinity by illustrative segment",
        "hand-authored price sensitivity by illustrative segment",
        "conservative monotone price response"
      ],
      llmInferenceUsedByThisTool: false,
      humanRespondents: 0,
      calibrated: false,
      humanBenchmarkAvailable: false,
      mirrorScoreAvailable: false,
      validatedErrorRangeAvailable: false,
      warnings: [
        "Synthetic agents are not human respondents.",
        "The illustrative segment profiles are not representative population estimates.",
        "Do not use preview outputs as real-world demand or sales forecasts."
      ]
    })
  );

  return server;
}

export function createResearchServer() {
  const server = new McpServer({
    name: "mirrorasia-research",
    version: "0.1.0"
  });

  server.registerTool(
    "list_research_datasets",
    {
      description: "List the versioned MirrorAsia Bangladesh aggregate research source registry, including extraction status, geography, source links and rights limitations.",
      inputSchema: EMPTY_INPUT
    },
    async () => textResult({
      summary: getResearchSummary(),
      sources: RESEARCH_SOURCES
    })
  );

  server.registerTool(
    "search_research_sources",
    {
      description: "Search the local research source registry by keyword. This is deterministic metadata filtering, not vector search or RAG.",
      inputSchema: z.object({
        query: z.string().min(2).max(120),
        limit: z.number().int().min(1).max(20).default(10)
      }).strict()
    },
    async ({ query, limit }) => {
      const results = searchResearchSources(query, limit);
      return textResult({
        query,
        method: "case-insensitive keyword filter over source metadata",
        semanticSearch: false,
        rag: false,
        resultCount: results.length,
        results
      });
    }
  );

  server.registerTool(
    "get_research_quality_checks",
    {
      description: "Return the recorded arithmetic checks, missing-data flags and evidence limitations for the 2026-11-14 Bangladesh research snapshot.",
      inputSchema: EMPTY_INPUT
    },
    async () => textResult({
      qualityChecks: RESEARCH_QUALITY_CHECKS,
      summary: getResearchSummary(),
      caveat: "Official aggregate context is not product preference or observed buying behaviour. Source terms and commercial reuse permissions remain under review."
    })
  );

  return server;
}

export function createPopulationServer() {
  const server = new McpServer({
    name: "mirrorasia-population",
    version: "0.1.0"
  });

  server.registerTool(
    "get_population_pack",
    {
      description: "Return the current Bangladesh/Dhaka illustrative population pack and its explicit evidence status.",
      inputSchema: EMPTY_INPUT
    },
    async () => textResult({
      populationPack: ILLUSTRATIVE_POPULATION,
      note: "This is an illustrative product fixture, not a statistically representative or calibrated population."
    })
  );

  server.registerTool(
    "get_population_segment",
    {
      description: "Return one supported illustrative segment and the fields currently available for it. No individual-level or measured income data is present.",
      inputSchema: z.object({
        segment: z.enum(SEGMENTS)
      }).strict()
    },
    async ({ segment }) => {
      const profile = ILLUSTRATIVE_POPULATION.segments.find((item) => item.id === segment);
      return textResult({
        populationPackId: ILLUSTRATIVE_POPULATION.id,
        profile,
        evidenceType: ILLUSTRATIVE_POPULATION.evidenceType,
        calibrated: false,
        humanBenchmarkAvailable: false
      });
    }
  );

  server.registerTool(
    "get_population_readiness",
    {
      description: "Return current population-data coverage and blockers before any calibration or representativeness claim can be made.",
      inputSchema: EMPTY_INPUT
    },
    async () => textResult({
      populationPack: ILLUSTRATIVE_POPULATION.id,
      version: ILLUSTRATIVE_POPULATION.version,
      evidenceType: ILLUSTRATIVE_POPULATION.evidenceType,
      calibrationStatus: "unvalidated",
      realRespondents: 0,
      humanBenchmarkAvailable: false,
      buyingAccuracyMeasured: false,
      mirrorScoreAvailable: false,
      bbsHiesResearchPackIntegratedIntoLiveEngine: false,
      availableContext: [
        "2022 final population totals for DNCC, DSCC, Chattogram City Corporation and Sylhet City Corporation",
        "41 historical Chattogram ward rows from BBS PHC 2022",
        "27 historical Sylhet ward rows from BBS PHC 2022",
        "2022 national and division-level HIES household income/consumption context"
      ],
      blockers: [
        "Dhaka ward-level census tables have not been extracted",
        "Sylhet 2022-to-2025 ward boundary crosswalk is absent",
        "WorldPop and MICS datasets are not ingested",
        "No consented human purchase-preference benchmark is available",
        "Commercial source-rights review is incomplete",
        "Population context has not been connected to the live simulation engine"
      ],
      nextValidationGate: "Integrate lawful, versioned population context; collect consented category-specific outcomes; freeze predictions before a holdout evaluation; report scoped error and uncertainty."
    })
  );

  return server;
}
