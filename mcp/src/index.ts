import {
  createMcpHandler,
  type StatelessMcpHandler
} from "agents/mcp/server";
import {
  createPopulationServer,
  createResearchServer,
  createSimulationServer
} from "./servers.ts";

interface Env {
  MCP_API_TOKEN?: string;
}

type WorkerContext = Parameters<StatelessMcpHandler>[2];

const simulationHandler = createMcpHandler(createSimulationServer, {
  route: "/mcp/simulation",
  legacy: "reject",
  responseMode: "auto"
});

const researchHandler = createMcpHandler(createResearchServer, {
  route: "/mcp/research",
  legacy: "reject",
  responseMode: "auto"
});

const populationHandler = createMcpHandler(createPopulationServer, {
  route: "/mcp/population",
  legacy: "reject",
  responseMode: "auto"
});

function constantTimeEqual(left: string, right: string): boolean {
  const a = new TextEncoder().encode(left);
  const b = new TextEncoder().encode(right);
  let difference = a.length ^ b.length;
  const length = Math.max(a.length, b.length);
  for (let i = 0; i < length; i++) {
    difference |= (a[i] ?? 0) ^ (b[i] ?? 0);
  }
  return difference === 0;
}

function json(value: unknown, status = 200, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(value), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      ...extraHeaders
    }
  });
}

function unauthorized() {
  return json(
    { error: "Unauthorized", message: "A valid Bearer token is required." },
    401,
    { "www-authenticate": 'Bearer realm="MirrorAsia MCP"' }
  );
}

function serverNotConfigured() {
  return json(
    { error: "MCP server is not configured", message: "Set MCP_API_TOKEN as a Worker secret with at least 32 characters." },
    503
  );
}

function getBearerToken(request: Request): string {
  const header = request.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(header);
  return match?.[1]?.trim() ?? "";
}

export default {
  async fetch(request: Request, env: Env, ctx: WorkerContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/health" && request.method === "GET") {
      return json({
        status: "ok",
        service: "mirrorasia-mcp",
        version: "0.1.0",
        transport: "Streamable HTTP",
        authentication: "Bearer token required",
        endpoints: [
          "/mcp/simulation",
          "/mcp/research",
          "/mcp/population"
        ]
      });
    }

    const handler = url.pathname === "/mcp/simulation"
      ? simulationHandler
      : url.pathname === "/mcp/research"
        ? researchHandler
        : url.pathname === "/mcp/population"
          ? populationHandler
          : null;

    if (!handler) return json({ error: "Not found" }, 404);

    // Let the MCP handler validate and answer CORS preflight requests.
    if (request.method === "OPTIONS") {
      return handler(request, env, ctx);
    }

    const expected = env.MCP_API_TOKEN ?? "";
    if (expected.length < 32) return serverNotConfigured();

    const supplied = getBearerToken(request);
    if (!supplied || !constantTimeEqual(supplied, expected)) {
      return unauthorized();
    }

    return handler(request, env, ctx);
  }
};
