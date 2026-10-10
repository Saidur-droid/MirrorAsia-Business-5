import type { Segment } from "./schema.ts";

// Evaluation operates on genuine, consented aggregate benchmark observations.
// No simulated person is permitted to count as a real benchmark respondent.
export interface HumanBenchmark {
  studyId: string;
  segment: Segment;
  conceptId: "A" | "B";
  price: number;
  positive: number;
  respondents: number;
  consentVerified: true;
  source: string;
  observedAt: string;
}
export interface BenchmarkComparison {
  count: number;
  meanAbsolutePercentagePointError: number;
  coverage: "partial" | "complete";
  calibrationIsValidated: false;
}
export function compareToHumanEvidence(
  predicted: ReadonlyArray<{ segment: Segment; conceptId: "A" | "B"; price: number; interestIndex: number }>,
  human: HumanBenchmark[]
): BenchmarkComparison | null {
  if (human.length === 0) return null;
  const lookup = new Map(predicted.map(row => [[row.segment,row.conceptId,row.price].join(":"), row]));
  const seen = new Set<string>();
  let errors = 0;
  let count = 0;
  for (const row of human) {
    if (!row.consentVerified || !row.source.trim() || !Number.isFinite(Date.parse(row.observedAt)) ||
        !Number.isInteger(row.respondents) || row.respondents <= 0 ||
        !Number.isInteger(row.positive) || row.positive < 0 || row.positive > row.respondents) {
      throw new Error("Unverified or invalid human benchmark.");
    }
    const key = [row.segment,row.conceptId,row.price].join(":");
    if (seen.has(key)) throw new Error("Duplicate human benchmark cell.");
    seen.add(key);
    const prediction = lookup.get(key);
    if (!prediction) throw new Error("Unmatched benchmark cell.");
    errors += Math.abs(prediction.interestIndex - (row.positive/row.respondents*100));
    count++;
  }
  return {
    count,
    meanAbsolutePercentagePointError: Math.round(errors/count*100)/100,
    coverage: count === predicted.length ? "complete" : "partial",
    calibrationIsValidated: false
  };
}
