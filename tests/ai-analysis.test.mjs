import test from "node:test";
import assert from "node:assert/strict";
import { validateBrief, parseAnalysis, handleAiAnalysis, AI_MODEL } from "../worker/ai-analysis.mjs";

const body = {
  country:"Bangladesh",city:"Dhaka",targetSegment:"young-professionals",
  concepts:[
    {id:"A",name:"Midnight Focus",color:"black",message:"Fuel the moments that matter"},
    {id:"B",name:"Crimson Lift",color:"red",message:"A bright boost for your busy day"}
  ]
};
const successfulQuota={prepare:()=>({bind:()=>({first:async()=>({requests:1})})})};
const sample={summary:"Two distinct concepts worth testing",conceptA:"Dark color signals focus hypothetically",
  conceptB:"Red color can signal energy hypothetically",tradeoffs:"The clarity and tone differ",
  risks:"No actual preference data supports either idea",nextStep:"Run an informed-consent comprehension test"};
function req(data,headers={"Content-Type":"application/json","x-mirrorasia-ai-opt-in":"yes"}){
  return new Request("https://example.org/api/analyze",{method:"POST",headers,body:JSON.stringify(data)});
}
test("brief accepts exactly two bounded Bangladesh concepts",()=>{
  assert.equal(validateBrief(body).concepts.length,2);
  assert.throws(()=>validateBrief({...body,targetSegment:"adults"}));
  assert.throws(()=>validateBrief({...body,concepts:[body.concepts[0]]}));
  assert.throws(()=>validateBrief({...body,concepts:[{...body.concepts[0],message:"x".repeat(181)},body.concepts[1]]}));
});
test("strict AI JSON output validated before returning",()=>{
  assert.equal(parseAnalysis(JSON.stringify(sample)).summary,sample.summary);
  assert.throws(()=>parseAnalysis(JSON.stringify({...sample,risks:""})));
  assert.throws(()=>parseAnalysis(JSON.stringify({...sample,risks:0})));
  assert.throws(()=>parseAnalysis("not JSON"));
});
test("invalid body rejected without spending inference",async()=>{
  let invoked=0;
  const env={AI:{run(){invoked++;return sample;}},AI_RATE_GLOBAL:{limit:async()=>({success:true})},
    AI_RATE_IP:{limit:async()=>({success:true})},AI_QUOTA:successfulQuota};
  const result=await handleAiAnalysis(req({invalid:true}),env);
  assert.equal(result.status,400);assert.equal(invoked,0);
});
test("unconfigured model binding fails closed",async()=>{
  assert.equal((await handleAiAnalysis(req(body),{})).status,503);
});
test("global throttle prevents model call",async()=>{
  let invoked=0;
  const r=await handleAiAnalysis(req(body),{
    AI:{run(){invoked++;return {response:JSON.stringify(sample)};}},
    AI_RATE_GLOBAL:{limit:async()=>({success:false})},AI_RATE_IP:{limit:async()=>({success:true})},AI_QUOTA:successfulQuota
  });
  assert.equal(r.status,429);assert.equal(invoked,0);
});
test("AI output reports model provenance and zero real humans",async()=>{
  let invoked=0;
  const r=await handleAiAnalysis(req(body),{
    AI:{run(model,input){invoked++;assert.equal(model,AI_MODEL);assert.ok(input.max_tokens<=500);
      return {response:JSON.stringify(sample)};}},
    AI_RATE_GLOBAL:{limit:async()=>({success:true})},AI_RATE_IP:{limit:async()=>({success:true})},AI_QUOTA:successfulQuota
  });
  const data=await r.json();
  assert.equal(r.status,200);assert.equal(invoked,1);
  assert.equal(data.model,AI_MODEL);assert.equal(data.mode,"ai-hypothesis");
  assert.equal(data.realRespondents,0);assert.equal(data.calibrated,false);
});
test("bad model output causes no invented fallback",async()=>{
  const r=await handleAiAnalysis(req(body),{
    AI:{run:async()=>({response:'NOT A JSON RESPONSE'})},
    AI_RATE_GLOBAL:{limit:async()=>({success:true})},AI_RATE_IP:{limit:async()=>({success:true})},AI_QUOTA:successfulQuota
  });
  assert.equal(r.status,502);
});

test("inference denied without explicit opt-in header",async()=>{
 const r=await handleAiAnalysis(req(body,{"Content-Type":"application/json"}),{});
 assert.equal(r.status,403);
});

test("daily budget exhausted prevents model inference",async()=>{
 let invoked=0;
 const r=await handleAiAnalysis(req(body),{
   AI:{run(){invoked++;return {response:JSON.stringify(sample)};}},
   AI_RATE_GLOBAL:{limit:async()=>({success:true})},
   AI_RATE_IP:{limit:async()=>({success:true})},
   AI_QUOTA:{prepare:()=>({bind:()=>({first:async()=>null})})}
 });
 assert.equal(r.status,429);assert.equal(invoked,0);
});
test("quota database failure closes AI route without inference",async()=>{
 let invoked=0;
 const r=await handleAiAnalysis(req(body),{
   AI:{run(){invoked++;return {response:JSON.stringify(sample)};}},
   AI_RATE_GLOBAL:{limit:async()=>({success:true})},
   AI_RATE_IP:{limit:async()=>({success:true})},
   AI_QUOTA:{prepare(){throw Error("db down")}}
 });
 assert.equal(r.status,503);assert.equal(invoked,0);
});
