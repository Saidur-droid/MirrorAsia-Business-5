# MirrorAsia — MCP Usage Evidence

**Status:** Implementation branch created. Deployment and remote-host verification remain pending until CI and Cloudflare release checks pass.

## 1. MCP servers built

Three separately named stateless MCP server endpoints are implemented in one isolated Cloudflare Worker codebase. They are not three independently deployed Workers.

| Server identity | Endpoint | Tools |
|---|---|---|
| \`mirrorasia-simulation\` | \`/mcp/simulation\` | \`run_illustrative_simulation\`, \`get_simulation_methodology\` |
| \`mirrorasia-research\` | \`/mcp/research\` | \`list_research_datasets\`, \`search_research_sources\`, \`get_research_quality_checks\` |
| \`mirrorasia-population\` | \`/mcp/population\` | \`get_population_pack\`, \`get_population_segment\`, \`get_population_readiness\` |

## 2. MCP integrations used during development

- GitHub connector: repository discovery, source inspection, branch creation and file commits.
- Cloudflare documentation connector: current Workers and Agents SDK MCP handler, transport and security documentation.
- Context7 documentation connector: Agents SDK and MCP TypeScript SDK documentation.

These are development-time integrations, not runtime dependencies embedded in MirrorAsia.

## 3. MCP clients / hosts

- Node.js MCP TypeScript client v2.4.0: automated integration smoke suite uses the official Client and StreamableHTTPClientTransport to discover and call all three servers.
- ChatGPT: development host used with connected GitHub, Cloudflare documentation and Context7 integrations.
- Claude Desktop, Cursor and VS Code are not claimed as connected hosts.

## 4. Transport

- Used: Streamable HTTP.
- Not used: stdio.
- Not used: legacy standalone SSE.

## 5. Reuse, architecture and integration

- Cloudflare Agents SDK \`createMcpHandler\` creates stateless MCP handlers; no MCP session or Durable Object is required.
- Simulation reuses the existing \`parseScenario\` validator and deterministic \`runSimulation\` engine.
- Population reuses the existing \`ILLUSTRATIVE_POPULATION\` fixture and exposes its unvalidated status.
- Research exposes the versioned BBS/HIES source registry and arithmetic quality checks. Search is deterministic keyword filtering, not RAG or vector search.
- Each endpoint is protected by a Worker Bearer token; the Worker fails closed when the secret is absent or too short.
- Tools are read-only and do not collect respondent PII or claim calibrated predictions.
- One codebase and Worker deployment host three logically separate endpoint identities.

## 6. Evidence required before marking fields complete

- CI green for typecheck, domain tests, Worker build and MCP client smoke tests.
- Cloudflare deployment created and \`/health\` checked.
- Authenticated tool discovery and calls verified against the deployed Worker.
- A host/client connection screenshot or export if the form requires an interactive host.
- Actual Worker URL and deployment ID recorded after deployment.

## 7. Form-ready summary

> Built three stateless MirrorAsia MCP server endpoints on Cloudflare Workers: Simulation, Research and Population Intelligence. They use MCP Streamable HTTP through Cloudflare Agents SDK createMcpHandler, with Bearer-token protection. Simulation reuses MirrorAsia's deterministic seeded engine; Research exposes the versioned BBS/HIES source registry and quality checks through keyword retrieval; Population exposes the current illustrative pack and evidence-readiness status. The official MCP TypeScript client v2.4.0 is used for automated tool discovery and integration tests. Development also used GitHub, Cloudflare documentation and Context7 MCP-backed integrations. No stdio or legacy SSE transport is claimed. Synthetic outputs remain uncalibrated; no human benchmark, buying accuracy or MirrorScore is claimed.
