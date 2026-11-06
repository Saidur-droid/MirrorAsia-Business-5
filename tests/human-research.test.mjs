import test from "node:test";
import assert from "node:assert/strict";
import { handleHumanResearch } from "../worker/human-research.mjs";
const STUDY="dhaka-fmcg-concepts-v1",CONSENT="mirrorasia-research-consent-v1";
const make=(patch={})=>new Request("https://example.org/api/research/submit",{method:"POST",headers:{"Content-Type":"application/json","cf-connecting-ip":"192.0.2.1"},body:JSON.stringify({studyVersion:STUDY,consentVersion:CONSENT,consent:true,respondentToken:"550e8400-e29b-41d4-a716-446655440000",segment:"students",conceptChoice:"A",clarity:4,purchaseIntent:4,priceBdt:79,...patch})});
function env(result={id:"r1"}){return {RESEARCH_RATE:{limit:async()=>({success:true})},RESEARCH_DB:{prepare(sql){return {bind(...args){return {first:async()=>sql.startsWith("INSERT")?result:{total:11},all:async()=>({results:[]})}}}}}}}
test("study info is public but clearly voluntary",async()=>{const r=await handleHumanResearch(new Request("https://x/api/research/study"),{});const d=await r.json();assert.equal(d.voluntary,true);assert.equal(d.threshold,10);assert.ok(d.dataNotCollected.includes("Email"));});
test("consent and strict rating ranges required",async()=>{assert.equal((await handleHumanResearch(make({consent:false}),env())).status,400);assert.equal((await handleHumanResearch(make({purchaseIntent:6}),env())).status,400);});
test("duplicate anonymous browser token rejected",async()=>{assert.equal((await handleHumanResearch(make(),env(null))).status,409);});
test("successful submission returns accepted only after insert",async()=>{const r=await handleHumanResearch(make(),env());assert.equal(r.status,201);assert.equal((await r.json()).accepted,true);});
test("network rate limit enforced",async()=>{const e=env();e.RESEARCH_RATE.limit=async()=>({success:false});assert.equal((await handleHumanResearch(make(),e)).status,429);});
test("aggregates suppress cells below ten",async()=>{const e=env();e.RESEARCH_DB.prepare=()=>({bind:()=>({all:async()=>({results:[{segment:"students",concept_choice:"A",price_bdt:79,respondents:9,avg_clarity:4,avg_purchase_intent:4,high_intent:8}]}) ,first:async()=>({total:9})})});const d=await (await handleHumanResearch(new Request("https://x/api/research/results"),e)).json();assert.equal(d.cells[0].suppressed,true);assert.equal(d.cells[0].respondentsBand,"fewer than 10");});
