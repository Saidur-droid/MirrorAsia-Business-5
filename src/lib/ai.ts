import { SEGMENTS } from "./schema.ts";
import type { ConceptId, Scenario, Segment } from "./schema.ts";
import type { ModelEstimate } from "./engine.ts";

export class ModelOutputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ModelOutputError";
  }
}
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export function validateModelOutput(data: unknown, scenario: Scenario): ModelEstimate[] {
  if (!isRecord(data) || !Array.isArray(data.rows)) throw new ModelOutputError("Model returned no rows.");
  const validSegments = new Set<string>(SEGMENTS);
  const validPrices = new Set(scenario.prices);
  const seen = new Set<string>();
  const output: ModelEstimate[] = [];
  for (const row of data.rows) {
    if (!isRecord(row) ||
      typeof row.segment !== "string" || !validSegments.has(row.segment) ||
      (row.conceptId !== "A" && row.conceptId !== "B") ||
      typeof row.price !== "number" || !validPrices.has(row.price) ||
      typeof row.probability !== "number" || !Number.isFinite(row.probability) ||
      row.probability < 0 || row.probability > 1 ||
      typeof row.explanation !== "string" || row.explanation.trim().length < 4 ||
      row.explanation.length > 250) {
      throw new ModelOutputError("Model returned invalid segment, probability, or explanation.");
    }
    const key = [row.segment, row.conceptId, row.price].join(":");
    if (seen.has(key)) throw new ModelOutputError("Model returned duplicate cells.");
    seen.add(key);
    output.push({
      segment: row.segment as Segment,
      conceptId: row.conceptId as ConceptId,
      price: row.price,
      probability: row.probability,
      explanation: row.explanation.trim()
    });
  }
  if (output.length !== SEGMENTS.length * 2 * scenario.prices.length) {
    throw new ModelOutputError("Model returned an incomplete result matrix.");
  }
  return output;
}

export async function getModelEstimates(
  scenario: Scenario,
  apiKey: string,
  modelName: string
): Promise<ModelEstimate[]> {
  const instructions = [
    "You are generating an exploratory, hypothetical FMCG consumer simulation for a prototype.",
    "There are NO real respondents, no calibration data and no verified market shares.",
    "Do not present your numbers as real survey findings or claim local cultural facts as validated.",
    "Return only valid JSON with key rows, an array of EXACTLY one record for every combination:",
    "segments: students, young-professionals, family-shoppers;",
    "conceptId: A, B; and every price in the input.",
    "Each record contains segment, conceptId, price, probability (number 0 to 1),",
    "and explanation (plain English, max 200 characters, stating assumptions).",
    "Use text and packaging color as hypothetical cues. Prefer weaker, conservative distinctions.",
    "All other things equal, higher prices should not produce higher purchase interest.",
    "Do not include names, identities, citations, customer data, or claims of real validation."
  ].join(" ");
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json"
    },
    signal: AbortSignal.timeout(18000),
    body: JSON.stringify({
      model: modelName,
      response_format: { type: "json_object" },
      temperature: 0,
      max_completion_tokens: 1800,
      messages: [
        { role: "system", content: instructions },
        { role: "user", content: JSON.stringify(scenario) }
      ]
    })
  });
  if (!response.ok) throw new ModelOutputError("AI provider request failed with HTTP " + response.status + ".");
  const data: unknown = await response.json();
  if (!isRecord(data) || !Array.isArray(data.choices) || !isRecord(data.choices[0]) ||
      !isRecord(data.choices[0].message) || typeof data.choices[0].message.content !== "string") {
    throw new ModelOutputError("AI provider returned an unexpected response.");
  }
  let output: unknown;
  try {
    output = JSON.parse(data.choices[0].message.content);
  } catch {
    throw new ModelOutputError("AI provider returned invalid JSON.");
  }
  return validateModelOutput(output, scenario);
}
