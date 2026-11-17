# MirrorAsia MCP Infrastructure

Three stateless MCP server identities are exposed from one isolated Cloudflare Worker deployment.

| Server | Endpoint | Tools |
|---|---|---|
| Simulation | \`/mcp/simulation\` | \`run_illustrative_simulation\`, \`get_simulation_methodology\` |
| Research | \`/mcp/research\` | \`list_research_datasets\`, \`search_research_sources\`, \`get_research_quality_checks\` |
| Population | \`/mcp/population\` | \`get_population_pack\`, \`get_population_segment\`, \`get_population_readiness\` |

## Architecture

- Runtime: Cloudflare Workers.
- MCP server API: Cloudflare Agents SDK \`createMcpHandler\`.
- Protocol: MCP Streamable HTTP.
- Server model: stateless; each request creates a fresh MCP server.
- Authentication: Bearer token in \`Authorization\`; fail closed if \`MCP_API_TOKEN\` is missing or shorter than 32 characters.
- Data storage: none. Tools are read-only and deterministic.
- Reuse: simulation imports existing MirrorAsia \`parseScenario\`, \`runSimulation\`, and population fixture.
- Research search is local keyword filtering, not vector search or RAG.

## Local development

Requires Node.js 22+.

\`\`\`sh
cd mcp
npm install
cp .dev.vars.example .dev.vars
npm run dev
\`\`\`

Replace the placeholder in \`.dev.vars\` with a random token of at least 32 characters. In another terminal:

\`\`\`sh
MCP_API_TOKEN='your-local-token' npm run smoke
\`\`\`

The smoke suite uses the official MCP TypeScript client over Streamable HTTP to check all three endpoints, tool discovery, calls, deterministic simulation, evidence caveats, and unauthenticated rejection.

## Deployment

Set a unique Cloudflare Worker secret before deployment:

\`\`\`sh
npx wrangler secret put MCP_API_TOKEN
npm run deploy
\`\`\`

Cloudflare assigns the actual workers.dev URL. It is intentionally not guessed here. After deployment, verify \`/health\` and test all three endpoints using an authenticated MCP client.

## Client configuration pattern

Replace the URL and token placeholders with actual deployed values:

\`\`\`json
{
  "mcpServers": {
    "mirrorasia-simulation": {
      "url": "https://YOUR-WORKER.workers.dev/mcp/simulation",
      "headers": { "Authorization": "Bearer YOUR_MCP_API_TOKEN" }
    },
    "mirrorasia-research": {
      "url": "https://YOUR-WORKER.workers.dev/mcp/research",
      "headers": { "Authorization": "Bearer YOUR_MCP_API_TOKEN" }
    },
    "mirrorasia-population": {
      "url": "https://YOUR-WORKER.workers.dev/mcp/population",
      "headers": { "Authorization": "Bearer YOUR_MCP_API_TOKEN" }
    }
  }
}
\`\`\`

## Evidence and limitations

- Simulation uses the existing seeded preview engine; it does not call an LLM.
- Synthetic agents are not human respondents.
- Human respondents: 0.
- Human benchmark: unavailable.
- Buying accuracy, validated error range and MirrorScore: not measured.
- BBS/HIES aggregate research is not integrated into the live simulation engine.
- Commercial source-rights review remains outstanding.
- No RAG, vector database, stdio transport, legacy SSE transport, or third-party runtime MCP server is claimed.
- The Bearer secret is not OAuth. Rotate it if exposed.
