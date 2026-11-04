import test from "node:test";
import assert from "node:assert/strict";
import { parseScenario, ScenarioInputError, SEGMENTS } from "../src/lib/schema.ts";
import { runSimulation } from "../src/lib/engine.ts";
import { validateModelOutput, ModelOutputError } from "../src/lib/ai.ts";

const raw = {
  country: "Bangladesh",
  city: "Dhaka",
  targetSegment: "young-professionals",
  concepts: [
    { id: "A", name: "Midnight Focus", color: "black", message: "Focus for a busy day" },
    { id: "B", name: "Crimson Lift", color: "red", message: "Fresh energy for everyone" }
  ],
  prices: [79, 89, 99],
  syntheticAgents: 120,
  seed: 42
};

test("safe scenario parser accepts bounded FMCG inputs", () => {
  const parsed = parseScenario(raw);
  assert.deepEqual(parsed.prices, [79, 89, 99]);
  assert.equal(parsed.concepts[0].id, "A");
});

test("parser rejects invalid geography, duplicate prices, and excessive sample count", () => {
  assert.throws(() => parseScenario({ ...raw, city: "London" }), ScenarioInputError);
  assert.throws(() => parseScenario({ ...raw, prices: [79, 79] }), ScenarioInputError);
  assert.throws(() => parseScenario({ ...raw, syntheticAgents: 9000 }), ScenarioInputError);
});

test("preview covers all 3 segments, both concepts and all prices", () => {
  const result = runSimulation(parseScenario(raw));
  assert.equal(result.rows.length, SEGMENTS.length * 2 * 3);
  assert.equal(result.mode, "preview");
  assert.equal(result.provenance.realRespondents, 0);
  assert.equal(result.confidence.mirrorScore, null);
  assert.equal(result.confidence.humanBenchmarkAvailable, false);
});

test("seeded results repeat and price response does not rise", () => {
  const scenario = parseScenario(raw);
  const first = runSimulation(scenario);
  const second = runSimulation(scenario);
  assert.deepEqual(first.rows, second.rows);
  for (const segment of SEGMENTS) {
    for (const conceptId of ["A", "B"]) {
      const group = first.rows.filter(r => r.segment === segment && r.conceptId === conceptId);
      assert.ok(group[0].interestIndex >= group[1].interestIndex);
      assert.ok(group[1].interestIndex >= group[2].interestIndex);
    }
  }
});

test("AI output validator rejects fabricated incomplete cells and bad values", () => {
  const scenario = parseScenario(raw);
  assert.throws(() => validateModelOutput({ rows: [] }, scenario), ModelOutputError);
  assert.throws(() => validateModelOutput({ rows: [{ segment: "students", conceptId: "A", price: 79, probability: 300, explanation: "test" }] }, scenario), ModelOutputError);
});

test("valid model estimates enter live-ai mode without claiming calibration", () => {
  const scenario = parseScenario(raw);
  const rows = SEGMENTS.flatMap(segment =>
    scenario.concepts.flatMap(c =>
      scenario.prices.map(price => ({
        segment, conceptId: c.id, price, probability: 0.55 - (price - 79) / 500,
        explanation: "Hypothetical behavior assumption."
      }))
    )
  );
  const validated = validateModelOutput({ rows }, scenario);
  const result = runSimulation(scenario, { modelEstimates: validated, modelName: "test-model" });
  assert.equal(result.mode, "live-ai");
  assert.equal(result.provenance.model, "test-model");
  assert.equal(result.provenance.realRespondents, 0);
  assert.equal(result.confidence.validatedErrorRange, null);
});

test("default segment and concept examples expose price sensitivity rather than equal flat scores", () => {
  const result = runSimulation(parseScenario(raw));
  for (const segment of SEGMENTS) {
    for (const conceptId of ["A", "B"]) {
      const series = result.rows.filter(row => row.segment === segment && row.conceptId === conceptId);
      assert.equal(series.length, 3);
      assert.ok(series[0].interestIndex > series[2].interestIndex,
        segment + " / " + conceptId + ": default BDT79 and BDT99 should differ");
      assert.ok(series.every(row => row.syntheticPositiveSignals <= row.syntheticAgents));
      assert.ok(series.every(row => row.assumedProbability >= 0 && row.assumedProbability <= 1));
    }
  }
});

test("scenario copy is not silently analyzed by deterministic preview", () => {
  const scenario = parseScenario(raw);
  const first = runSimulation(scenario);
  const altered = {
    ...scenario,
    concepts: [
      { ...scenario.concepts[0], message: "A different marketing message for hypothetical audiences" },
      scenario.concepts[1]
    ] as typeof scenario.concepts
  };
  const second = runSimulation(altered);
  assert.deepEqual(first.rows, second.rows);
  assert.equal(first.provenance.model, null);
  assert.equal(first.provenance.realRespondents, 0);
});
