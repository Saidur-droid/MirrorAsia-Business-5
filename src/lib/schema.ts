export const SEGMENTS = ["students", "young-professionals", "family-shoppers"] as const;
export const COLORS = ["black", "red", "blue", "green"] as const;
export type Segment = (typeof SEGMENTS)[number];
export type PackageColor = (typeof COLORS)[number];
export type ConceptId = "A" | "B";

export interface Concept {
  id: ConceptId;
  name: string;
  color: PackageColor;
  message: string;
}
export interface Scenario {
  country: "Bangladesh";
  city: "Dhaka";
  targetSegment: Segment;
  concepts: [Concept, Concept];
  prices: number[];
  syntheticAgents: number;
  seed: number;
}

export class ScenarioInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ScenarioInputError";
  }
}
function record(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}
function boundedText(value: unknown, label: string, max: number): string {
  if (typeof value !== "string" || value.trim().length < 2 || value.trim().length > max) {
    throw new ScenarioInputError(label + " must contain 2-" + max + " characters.");
  }
  return value.trim();
}
function isSegment(value: unknown): value is Segment {
  return SEGMENTS.some((segment) => segment === value);
}
function isColor(value: unknown): value is PackageColor {
  return COLORS.some((color) => color === value);
}

export function parseScenario(value: unknown): Scenario {
  if (!record(value)) throw new ScenarioInputError("Scenario must be a JSON object.");
  if (value.country !== "Bangladesh" || value.city !== "Dhaka") {
    throw new ScenarioInputError("Only Bangladesh / Dhaka is supported in prototype v0.1.");
  }
  if (!isSegment(value.targetSegment)) throw new ScenarioInputError("Choose a supported consumer segment.");
  if (!Array.isArray(value.concepts) || value.concepts.length !== 2) {
    throw new ScenarioInputError("Exactly two concepts are required.");
  }
  const concepts = value.concepts.map((c: unknown, i: number): Concept => {
    if (!record(c) || c.id !== (i === 0 ? "A" : "B") || !isColor(c.color)) {
      throw new ScenarioInputError("Concept IDs must be A and B, with supported package colors.");
    }
    return {
      id: c.id as ConceptId,
      name: boundedText(c.name, "Concept name", 64),
      color: c.color,
      message: boundedText(c.message, "Marketing message", 180)
    };
  }) as [Concept, Concept];
  if (!Array.isArray(value.prices) || value.prices.length < 2 || value.prices.length > 5) {
    throw new ScenarioInputError("Provide 2-5 prices.");
  }
  if (!value.prices.every((p: unknown) => typeof p === "number" && Number.isInteger(p) && p >= 20 && p <= 500)) {
    throw new ScenarioInputError("Prices must be whole BDT amounts from 20 to 500.");
  }
  const prices = [...new Set(value.prices as number[])].sort((a, b) => a - b);
  if (prices.length !== value.prices.length) throw new ScenarioInputError("Prices must be unique.");
  const syntheticAgents = value.syntheticAgents ?? 120;
  if (typeof syntheticAgents !== "number" || !Number.isInteger(syntheticAgents) || syntheticAgents < 50 || syntheticAgents > 500) {
    throw new ScenarioInputError("Synthetic agent count must be 50-500.");
  }
  const seed = value.seed ?? 42;
  if (typeof seed !== "number" || !Number.isInteger(seed) || seed < 0 || seed > 2147483647) {
    throw new ScenarioInputError("Seed must be an integer between 0 and 2147483647.");
  }
  return {
    country: "Bangladesh",
    city: "Dhaka",
    targetSegment: value.targetSegment,
    concepts,
    prices,
    syntheticAgents,
    seed
  };
}
