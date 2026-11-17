import test from "node:test";
import assert from "node:assert/strict";
import { parseScenario } from "../../src/lib/schema.ts";
import { runSimulation } from "../../src/lib/engine.ts";
import { ILLUSTRATIVE_POPULATION } from "../../src/lib/population.ts";
import {
  RESEARCH_QUALITY_CHECKS,
  RESEARCH_SOURCES,
  searchResearchSources,
  getResearchSummary
} from "../src/research.ts";

const scenarioInput = {
  country: "Bangladesh",
  city: "Dhaka",
  targetSegment: "young-professionals",
  concepts: [
    { id: "A", name: "Midnight Focus", color: "black", message: "Fuel the moments that matter" },
    { id: "B", name: "Crimson Lift", color: "red", message: "A bright boost for your busy day" }
  ],
  prices: [79, 89, 99],
  syntheticAgents: 120,
  seed: 42
};

test("simulation is reproducible and explicitly uncalibrated", () => {
  const scenario = parseScenario(scenarioInput);
  const first = runSimulation(scenario);
  const second = runSimulation(scenario);

  assert.deepEqual(first.rows, second.rows);
  assert.equal(first.rows.length, 18);
  assert.equal(first.mode, "preview");
  assert.equal(first.provenance.realRespondents, 0);
  assert.equal(first.provenance.syntheticSamplesAreNotHumans, true);
  assert.equal(first.confidence.tier, "Uncalibrated");
  assert.equal(first.confidence.mirrorScore, null);
  assert.equal(first.confidence.validatedErrorRange, null);
});

test("scenario parser rejects duplicate prices", () => {
  assert.throws(() => parseScenario({
    ...scenarioInput,
    prices: [79, 79, 99]
  }), /unique/i);
});

test("research registry search returns source-backed metadata", () => {
  const results = searchResearchSources("Chattogram");
  assert.ok(results.some((source) => source.datasetId === "BBS-PHC-CTG-WARDS"));
  assert.equal(RESEARCH_SOURCES.length, 16);
  assert.equal(getResearchSummary().integratedIntoLiveSimulation, false);
});

test("quality checks preserve known discrepancies and missing evidence", () => {
  assert.equal(RESEARCH_QUALITY_CHECKS.chattogram_household_discrepancy, 360);
  assert.equal(RESEARCH_QUALITY_CHECKS.real_consumer_benchmark_available, false);
  assert.equal(RESEARCH_QUALITY_CHECKS.buying_accuracy_measured, false);
  assert.equal(RESEARCH_QUALITY_CHECKS.dhaka_ward_level_extracted, false);
});

test("population fixture is illustrative and has no measured sample size", () => {
  assert.equal(ILLUSTRATIVE_POPULATION.evidenceType, "illustrative");
  assert.equal(ILLUSTRATIVE_POPULATION.sampleSize, null);
  assert.ok(ILLUSTRATIVE_POPULATION.segments.every((segment) => segment.calibrationStatus === "unvalidated"));
});
