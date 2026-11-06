import type { Concept, ConceptId, Scenario, Segment } from "./schema.ts";
import { SEGMENTS } from "./schema.ts";

export interface ModelEstimate {
  segment: Segment;
  conceptId: ConceptId;
  price: number;
  probability: number;
  explanation: string;
}
export interface ResultRow {
  segment: Segment;
  conceptId: ConceptId;
  price: number;
  syntheticPositiveSignals: number;
  syntheticAgents: number;
  interestIndex: number;
  assumedProbability: number;
  explanation: string;
}
export interface SimulationResult {
  runId: string;
  targetSegment: Segment;
  rows: ResultRow[];
  mode: "preview" | "live-ai";
  confidence: {
    tier: "Uncalibrated";
    humanBenchmarkAvailable: false;
    mirrorScore: null;
    validatedErrorRange: null;
    recommendation: string;
  };
  provenance: {
    generatedAt: string;
    country: "Bangladesh";
    city: "Dhaka";
    populationPack: "BD-DHAKA-ILLUSTRATIVE-v0.1";
    inputSeed: number;
    methodology: string;
    model: string | null;
    realRespondents: 0;
    syntheticSamplesAreNotHumans: true;
    caveats: string[];
  };
}
const COLOR_EFFECT: Record<Segment, Record<Concept["color"], number>> = {
  students: { black: 0.025, red: 0.075, blue: 0.045, green: 0.01 },
  "young-professionals": { black: 0.085, red: 0.025, blue: 0.055, green: 0.04 },
  "family-shoppers": { black: 0.02, red: 0.045, blue: 0.04, green: 0.07 }
};
const PRICE_SENSITIVITY: Record<Segment, number> = {
  students: 0.0045,
  "young-professionals": 0.0028,
  "family-shoppers": 0.0037
};
function bound(probability: number) {
  return Math.max(0.02, Math.min(0.98, probability));
}
function previewProbability(segment: Segment, concept: Concept, price: number): number {
  return bound(0.62 + COLOR_EFFECT[segment][concept.color] - (price - 79) * PRICE_SENSITIVITY[segment]);
}
// FNV-1a, based on a seed and a synthetic agent ID. The same synthetic agent
// is reused across all prices so that illustrative price response is monotone.
function syntheticRandom(seed: number, segment: Segment, id: ConceptId, agent: number): number {
  const key = [seed, segment, id, agent].join(":");
  let value = 2166136261;
  for (let i = 0; i < key.length; i++) {
    value ^= key.charCodeAt(i);
    value = Math.imul(value, 16777619);
  }
  // Avalanche the FNV hash: sequential synthetic agent IDs otherwise cluster,
  // hiding changes in assumed price sensitivity at small sample sizes.
  value ^= value >>> 16;
  value = Math.imul(value, 0x7feb352d);
  value ^= value >>> 15;
  value = Math.imul(value, 0x846ca68b);
  value ^= value >>> 16;
  return (value >>> 0) / 4294967296;
}
function simpleHash(value: string): string {
  let h = 5381;
  for (const char of value) h = Math.imul(h, 33) ^ char.charCodeAt(0);
  return (h >>> 0).toString(16).padStart(8, "0");
}

export function runSimulation(
  scenario: Scenario,
  options?: { modelEstimates?: ModelEstimate[]; modelName?: string }
): SimulationResult {
  const live = options?.modelEstimates !== undefined;
  if (live && !options?.modelName) throw new Error("Live AI mode requires model provenance.");
  const rows: ResultRow[] = [];
  const estimates = new Map<string, ModelEstimate>();
  if (options?.modelEstimates) {
    for (const estimate of options.modelEstimates) {
      estimates.set([estimate.segment, estimate.conceptId, estimate.price].join(":"), estimate);
    }
  }
  for (const segment of SEGMENTS) {
    for (const concept of scenario.concepts) {
      // Enforce conservative monotonic price response for the same product:
      // a higher price cannot increase assumed purchase interest in this demo.
      let lastProbability = 1;
      for (const price of scenario.prices) {
        const estimate = estimates.get([segment, concept.id, price].join(":"));
        if (live && !estimate) throw new Error("Missing AI estimate for a scenario cell.");
        const rawProbability = estimate
          ? estimate.probability
          : previewProbability(segment, concept, price);
        const probability = Math.min(lastProbability, bound(rawProbability));
        lastProbability = probability;
        let signals = 0;
        for (let agent = 0; agent < scenario.syntheticAgents; agent++) {
          if (syntheticRandom(scenario.seed, segment, concept.id, agent) < probability) signals++;
        }
        rows.push({
          segment,
          conceptId: concept.id,
          price,
          syntheticPositiveSignals: signals,
          syntheticAgents: scenario.syntheticAgents,
          interestIndex: Math.round(signals / scenario.syntheticAgents * 1000) / 10,
          assumedProbability: Math.round(probability * 1000) / 1000,
          explanation: estimate?.explanation
            ?? "Illustrative assumption: package-color affinity and price sensitivity; marketing copy is not analyzed in preview mode."
        });
      }
    }
  }
  return {
    runId: "demo-" + simpleHash(JSON.stringify({ scenario, estimates: options?.modelEstimates ?? null })),
    targetSegment: scenario.targetSegment,
    rows,
    mode: live ? "live-ai" : "preview",
    confidence: {
      tier: "Uncalibrated",
      humanBenchmarkAvailable: false,
      mirrorScore: null,
      validatedErrorRange: null,
      recommendation: "Collect consented human responses before using any result to make a business decision."
    },
    provenance: {
      generatedAt: new Date().toISOString(),
      country: "Bangladesh",
      city: "Dhaka",
      populationPack: "BD-DHAKA-ILLUSTRATIVE-v0.1",
      inputSeed: scenario.seed,
      methodology: live
        ? "AI-estimated propensities sampled with seeded synthetic draws; NOT calibrated to a respondent panel."
        : "Hand-authored illustrative behavior assumptions sampled with seeded synthetic draws; no external AI inference.",
      model: live ? options?.modelName ?? null : null,
      realRespondents: 0,
      syntheticSamplesAreNotHumans: true,
      caveats: [
        "This is not representative of Dhaka consumers.",
        "Synthetic positive signals are generated values, not survey participants.",
        "No human benchmark, validated uncertainty interval, or MirrorScore is available.",
        "Illustrative population assumptions have not been calibrated.",
        "Do not use these figures as real-world demand forecasts."
      ]
    }
  };
}
