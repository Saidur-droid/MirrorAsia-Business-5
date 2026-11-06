import type { HumanBenchmark, BenchmarkComparison } from "./evaluation.ts";
import { compareToHumanEvidence } from "./evaluation.ts";
import { SEGMENTS, type Segment } from "./schema.ts";
import type { SimulationResult } from "./engine.ts";

const HEADER = "studyId,segment,conceptId,price,positive,respondents,consentVerified,source,observedAt";

export function parseHumanAggregateCSV(csv: string): HumanBenchmark[] {
  if (csv.length > 32000) throw new Error("CSV exceeds 32 KB limit.");
  const lines = csv.replaceAll("\r", "").trim().split("\n");
  if (lines.length < 2 || lines[0].trim() !== HEADER) {
    throw new Error("Use the exact aggregate research CSV header from the downloaded template.");
  }
  if (lines.length > 301) throw new Error("At most 300 aggregate observations are accepted.");
  const seen = new Set<string>();
  return lines.slice(1).filter(Boolean).map((line, idx): HumanBenchmark => {
    const c = line.split(",");
    if (c.length !== 9 || c.some(value => value.length > 160)) {
      throw new Error("Malformed CSV row " + (idx + 2) + ". No quoted or personal data fields are supported.");
    }
    const [studyId, segment, conceptId, p, positiveText, respondentsText, consentText, source, observedAt] = c.map(x => x.trim());
    const price = Number(p), positive = Number(positiveText), respondents = Number(respondentsText);
    if (studyId.length < 3 || studyId.length > 60 || /[=+@\-]/.test(studyId[0] ?? "") ||
      !SEGMENTS.includes(segment as Segment) || (conceptId !== "A" && conceptId !== "B") ||
      !Number.isInteger(price) || price < 20 || price > 500 ||
      !Number.isInteger(positive) || positive < 0 || !Number.isInteger(respondents) ||
      respondents < 1 || respondents > 100000 || positive > respondents ||
      consentText !== "true" || source.length < 3 || source.length > 100 ||
      /[=+@\-]/.test(source[0] ?? "") || !/^\d{4}-\d\d-\d\d$/.test(observedAt) ||
      !Number.isFinite(Date.parse(observedAt))) {
      throw new Error("Invalid or unverified aggregate data at row " + (idx + 2) + ".");
    }
    const key = [segment,conceptId,price].join(":");
    if (seen.has(key)) throw new Error("Duplicate segment/concept/price evidence cell.");
    seen.add(key);
    return {studyId, segment:segment as Segment, conceptId, price, positive,
      respondents, consentVerified:true, source, observedAt};
  });
}

export function compareAggregateEvidence(result: SimulationResult, csv: string): BenchmarkComparison | null {
  const observations = parseHumanAggregateCSV(csv);
  return compareToHumanEvidence(result.rows, observations);
}

export const HUMAN_AGGREGATE_TEMPLATE = HEADER + "\n" +
  "# Complete only with genuine, consented, aggregated responses. Do not upload personal data.\n";
