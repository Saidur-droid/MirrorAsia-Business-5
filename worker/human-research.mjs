/**
 * MirrorAsia anonymous consent-first pilot. No names, email, phone, free text,
 * precise location, or raw IP are persisted. Public aggregate cells are hidden
 * until at least ten independent browser tokens contribute to that cell.
 */
const STUDY="dhaka-fmcg-concepts-v1";
const CONSENT="mirrorasia-research-consent-v1";
const MAX_BODY=1600;
const HEADERS={"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff","Referrer-Policy":"no-referrer"};
const json=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:HEADERS});
const SEGMENTS=new Set(["students","young-professionals","family-shoppers"]);
const choices=new Set(["A","B"]);
const prices=new Set([79,89,99]);
async function sha256(value){
 const bytes=new TextEncoder().encode(value);
 const hash=await crypto.subtle.digest("SHA-256",bytes);
 return Array.from(new Uint8Array(hash),b=>b.toString(16).padStart(2,"0")).join("");
}
function validate(input){
 if(!input||typeof input!=="object"||input.studyVersion!==STUDY||input.consentVersion!==CONSENT||input.consent!==true)
  throw Error("Current informed consent is required.");
 if(typeof input.respondentToken!=="string"||!/^[a-f0-9-]{36}$/i.test(input.respondentToken))throw Error("Invalid anonymous study token.");
 if(!SEGMENTS.has(input.segment)||!choices.has(input.conceptChoice)||!prices.has(input.priceBdt))throw Error("Invalid study response.");
 for(const k of ["clarity","purchaseIntent"])if(!Number.isInteger(input[k])||input[k]<1||input[k]>5)throw Error("Ratings must be between 1 and 5.");
 return input;
}
async function counts(env){
 const rows=await env.RESEARCH_DB.prepare(
 "SELECT segment, concept_choice, price_bdt, COUNT(*) AS respondents, ROUND(AVG(clarity),2) AS avg_clarity, ROUND(AVG(purchase_intent),2) AS avg_purchase_intent, SUM(CASE WHEN purchase_intent >= 4 THEN 1 ELSE 0 END) AS high_intent FROM mirrorasia_human_responses WHERE study_version = ? GROUP BY segment, concept_choice, price_bdt ORDER BY segment, concept_choice, price_bdt"
 ).bind(STUDY).all();
 return (rows.results||[]).map(r=>Number(r.respondents)>=10?{
  segment:r.segment,conceptChoice:r.concept_choice,priceBdt:r.price_bdt,
  respondents:Number(r.respondents),averageClarity:Number(r.avg_clarity),
  averagePurchaseIntent:Number(r.avg_purchase_intent),highIntentCount:Number(r.high_intent)
 }:{segment:r.segment,conceptChoice:r.concept_choice,priceBdt:r.price_bdt,
  suppressed:true,respondentsBand:"fewer than 10"});
}
export async function handleHumanResearch(request,env){
 const url=new URL(request.url);
 if(request.method==="GET"&&url.pathname==="/api/research/study")return json({
  studyVersion:STUDY,consentVersion:CONSENT,market:"Bangladesh · Dhaka",
  purpose:"Explore comprehension and stated purchase intent for two fictional beverage concepts.",
  estimatedMinutes:2,voluntary:true,withdrawal:"Close the page before submitting. After submission, responses are anonymous and cannot be individually retrieved.",
  dataCollected:["Broad target segment","Selected concept A or B","Selected price","Two 1–5 ratings","Random anonymous duplicate-prevention token hash"],
  dataNotCollected:["Name","Email","Phone","Exact location","Free-text answer","Raw IP address"],
  retention:"Pilot responses retained only for aggregate research analysis; contact the study owner for the retention policy.",
  threshold:10,concepts:[
   {id:"A",name:"Midnight Focus",color:"black",message:"Fuel the moments that matter"},
   {id:"B",name:"Crimson Lift",color:"red",message:"A bright boost for your busy day"}
  ],prices:[79,89,99]
 });
 if(request.method==="GET"&&url.pathname==="/api/research/results"){
  if(!env?.RESEARCH_DB)return json({error:"Research service unavailable"},503);
  try{
   const rows=await counts(env);
   const total=await env.RESEARCH_DB.prepare("SELECT COUNT(*) AS total FROM mirrorasia_human_responses WHERE study_version = ?").bind(STUDY).first();
   return json({studyVersion:STUDY,totalResponses:Number(total?.total||0),minimumCellSize:10,
    status:Number(total?.total||0)>=10?"pilot-aggregates":"collecting",
    disclaimer:"Self-selected pilot responses are not representative of Dhaka or Bangladesh. Small cells are suppressed; this is not validated model calibration.",cells:rows});
  }catch{return json({error:"Research results unavailable"},503);}
 }
 if(url.pathname!=="/api/research/submit")return json({error:"Not found"},404);
 if(request.method!=="POST")return json({error:"Method not allowed"},405);
 if((request.headers.get("content-type")||"").split(";")[0].trim()!=="application/json")return json({error:"Expected application/json"},415);
 if(Number(request.headers.get("content-length")||0)>MAX_BODY)return json({error:"Request too large"},413);
 if(!env?.RESEARCH_DB||!env?.RESEARCH_RATE)return json({error:"Research service unavailable"},503);
 let data;
 try{const raw=await request.text();if(raw.length>MAX_BODY)return json({error:"Request too large"},413);data=validate(JSON.parse(raw));}
 catch(e){return json({error:e instanceof Error?e.message:"Invalid response"},400);}
 const ip=(request.headers.get("cf-connecting-ip")||"unknown").slice(0,100);
 const rate=await env.RESEARCH_RATE.limit({key:ip});
 if(!rate.success)return json({error:"Too many submissions from this network. Please try later."},429);
 const respondentHash=await sha256(data.respondentToken);
 const id=crypto.randomUUID();
 try{
  const result=await env.RESEARCH_DB.prepare(
   "INSERT INTO mirrorasia_human_responses (id, respondent_hash, study_version, segment, concept_choice, clarity, purchase_intent, price_bdt, consent_version) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(respondent_hash) DO NOTHING RETURNING id"
  ).bind(id,respondentHash,STUDY,data.segment,data.conceptChoice,data.clarity,data.purchaseIntent,data.priceBdt,CONSENT).first();
  if(!result)return json({error:"This anonymous browser token has already submitted a response."},409);
  const total=await env.RESEARCH_DB.prepare("SELECT COUNT(*) AS total FROM mirrorasia_human_responses WHERE study_version = ?").bind(STUDY).first();
  return json({accepted:true,studyVersion:STUDY,totalResponses:Number(total?.total||0),
   message:"Thank you. Your anonymous response has been recorded. It is not a representative consumer benchmark."},201);
 }catch(e){
  console.error(JSON.stringify({event:"mirrorasia_research_submit_failed"}));
  return json({error:"Unable to record response. No success was claimed."},503);
 }
}