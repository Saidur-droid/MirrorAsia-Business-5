import test from "node:test";
import assert from "node:assert/strict";
import { compareToHumanEvidence } from "../src/lib/evaluation.ts";
const predictions = [{ segment:"students" as const,conceptId:"A" as const,price:79,interestIndex:60 }];
test("human benchmarking remains unavailable without verified evidence",()=>{
 assert.equal(compareToHumanEvidence(predictions,[]),null);
});
test("reject fabricated or invalid benchmark records",()=>{
 assert.throws(()=>compareToHumanEvidence(predictions,[{
   studyId:"x",segment:"students",conceptId:"A",price:79,positive:10,respondents:5,
   consentVerified:true,source:"test",observedAt:"2026-10-08"
 }]));
});
test("evaluate only validated aggregate observations; no automatic calibration claim",()=>{
 const result=compareToHumanEvidence(predictions,[{
   studyId:"test",segment:"students",conceptId:"A",price:79,positive:5,respondents:10,
   consentVerified:true,source:"consented-study-ref",observedAt:"2026-10-08"
 }]);
 assert.equal(result?.meanAbsolutePercentagePointError,10);
 assert.equal(result?.calibrationIsValidated,false);
});
