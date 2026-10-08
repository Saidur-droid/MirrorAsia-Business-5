import { NextRequest, NextResponse } from "next/server";
import { parseScenario, ScenarioInputError } from "../../../lib/schema.ts";
import { runSimulation } from "../../../lib/engine.ts";
import { getModelEstimates, ModelOutputError } from "../../../lib/ai.ts";

export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 16000) return NextResponse.json({ error: "Request too large." }, { status: 413 });
  let payload: unknown;
  try {
    const body = await request.text();
    if (body.length > 16000) return NextResponse.json({ error: "Request too large." }, { status: 413 });
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }
  try {
    const scenario = parseScenario(payload);
    const live = process.env.MIRRORASIA_AI_MODE === "live";
    if (!live) return NextResponse.json(runSimulation(scenario), { headers: { "Cache-Control": "no-store" } });
    const secret = process.env.MIRRORASIA_DEMO_ACCESS_KEY;
    const provided = request.headers.get("x-demo-access-key");
    if (!secret || secret.length < 24 || !provided || provided !== secret) {
      return NextResponse.json({ error: "Live AI is protected; valid demo access key required." }, { status: 401 });
    }
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "Live AI is not configured." }, { status: 503 });
    const modelName = process.env.OPENAI_MODEL || "gpt-4.1-mini";
    const estimates = await getModelEstimates(scenario, apiKey, modelName);
    return NextResponse.json(runSimulation(scenario, { modelEstimates: estimates, modelName }), { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    if (err instanceof ScenarioInputError) return NextResponse.json({ error: err.message }, { status: 400 });
    if (err instanceof ModelOutputError) return NextResponse.json({ error: "AI model output could not be validated. " + err.message }, { status: 502 });
    return NextResponse.json({ error: "Unable to complete simulation." }, { status: 500 });
  }
}
