import test from "node:test";
import assert from "node:assert/strict";
import { parseHumanAggregateCSV, compareAggregateEvidence } from "../src/lib/research.ts";
import { runSimulation } from "../src/lib/engine.ts";
import { parseScenario } from "../src/lib/schema.ts";
const header="studyId,segment,conceptId,price,positive,respondents,consentVerified,source,observedAt";
const row="study-001,students,A,79,7,10,true,consented-study-ref,2026-11-06";
const scenario=parseScenario({
  country:"Bangladesh",city:"Dhaka",targetSegment:"students",concepts:[
    {id:"A",name:"Focus",color:"black",message:"Fuel the moment"},
    {id:"B",name:"Crimson",color:"red",message:"The bright boost"}
  ],prices:[79,89,99],seed:42,syntheticAgents:120
});
test("aggregate CSV format must match explicitly",()=>{
  assert.equal(parseHumanAggregateCSV(header+"\n"+row).length,1);
  assert.throws(()=>parseHumanAggregateCSV("foo,bar\na,b"));
});
test("reject missing consent, nonaggregated counts, duplicate cells and formula fields",()=>{
  assert.throws(()=>parseHumanAggregateCSV(header+"\n"+row.replace(",true,",",false,")));
  assert.throws(()=>parseHumanAggregateCSV(header+"\n"+row.replace(",7,10,",",17,10,")));
  assert.throws(()=>parseHumanAggregateCSV(header+"\n"+row+"\n"+row));
  assert.throws(()=>parseHumanAggregateCSV(header+"\n"+row.replace("study-001","=A1+1")));
});
test("no data means no benchmark or confidence",()=>{
  assert.equal(compareAggregateEvidence(runSimulation(scenario),header+"\n"),null);
});
test("honest error comparison never self-certifies calibration",()=>{
  const report=compareAggregateEvidence(runSimulation(scenario),header+"\n"+row);
  assert.equal(report?.count,1);
  assert.equal(report?.coverage,"partial");
  assert.equal(report?.calibrationIsValidated,false);
  assert.ok((report?.meanAbsolutePercentagePointError??0)>=0);
});
