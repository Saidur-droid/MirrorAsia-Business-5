"use client";

import { useMemo, useState } from "react";
import type { Concept, Scenario, Segment } from "../lib/schema.ts";
import type { SimulationResult } from "../lib/engine.ts";
import { compareAggregateEvidence, HUMAN_AGGREGATE_TEMPLATE } from "../lib/research.ts";
import type { BenchmarkComparison } from "../lib/evaluation.ts";

const segments: { value: Segment; label: string; note: string }[] = [
  { value: "young-professionals", label: "Young professionals", note: "Illustrative age 22-35" },
  { value: "students", label: "Students", note: "Illustrative age 18-25" },
  { value: "family-shoppers", label: "Family shoppers", note: "Illustrative household purchasers" }
];
const firstConcept: Concept = { id: "A", name: "Midnight Focus", color: "black", message: "Fuel the moments that matter" };
const secondConcept: Concept = { id: "B", name: "Crimson Lift", color: "red", message: "A bright boost for your busy day" };
const initialScenario: Scenario = {
  country: "Bangladesh", city: "Dhaka", targetSegment: "young-professionals",
  concepts: [firstConcept, secondConcept], prices: [79, 89, 99], syntheticAgents: 120, seed: 42
};
const format = (segment: Segment) => segments.find(s => s.value === segment)?.label || segment;
interface AiHypothesis {
  mode: "ai-hypothesis";
  model: string;
  realRespondents: 0;
  calibrated: false;
  analysis: Record<"summary"|"conceptA"|"conceptB"|"tradeoffs"|"risks"|"nextStep", string>;
  warning: string;
}

export default function Home() {
  const [scenario, setScenario] = useState<Scenario>(initialScenario);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [humanCheck, setHumanCheck] = useState(false);
  const [aiConsent, setAiConsent] = useState(false);
  const [aiBusy, setAiBusy] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiOutput, setAiOutput] = useState<{fingerprint:string; data:AiHypothesis}|null>(null);
  const [researchText, setResearchText] = useState("");
  const [researchReport, setResearchReport] = useState<BenchmarkComparison|null>(null);
  const [researchError, setResearchError] = useState("");
  const [activeTab, setActiveTab] = useState<"results" | "method">("results");
  const conceptFingerprint=JSON.stringify({targetSegment:scenario.targetSegment,concepts:scenario.concepts});
  const visibleAi=aiOutput?.fingerprint===conceptFingerprint ? aiOutput.data : null;
  async function analyzeWithAI() {
    if (!aiConsent || aiBusy) return;
    setAiBusy(true);setAiError("");setAiOutput(null);
    const fingerprint=conceptFingerprint;
    try {
      const response=await fetch("/api/analyze",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({country:scenario.country,city:scenario.city,
          targetSegment:scenario.targetSegment,concepts:scenario.concepts})
      });
      const parsed:unknown=await response.json();
      if(!response.ok)throw Error(
        typeof parsed==="object"&&parsed!==null&&"error" in parsed ? String(parsed.error) : "AI analysis unavailable."
      );
      if(typeof parsed!=="object"||parsed===null||!("mode" in parsed)||parsed.mode!=="ai-hypothesis")
        throw Error("Unexpected AI response.");
      setAiOutput({fingerprint,data:parsed as AiHypothesis});
    }catch(e){setAiError(e instanceof Error?e.message:"AI analysis unavailable.");}
    finally{setAiBusy(false);}
  }
  function compareResearch() {
    setResearchReport(null);setResearchError("");
    if(!result){setResearchError("Run the current synthetic scenario first.");return;}
    try{
      const report=compareAggregateEvidence(result,researchText);
      if(!report){setResearchError("No genuine aggregate observations supplied. Calibration remains unavailable.");return;}
      setResearchReport(report);
    }catch(e){setResearchError(e instanceof Error?e.message:"Invalid aggregate evidence.");}
  }
  function downloadResearchTemplate() {
    downloadText("mirrorasia-consented-aggregate-template.csv","text/csv;charset=utf-8",HUMAN_AGGREGATE_TEMPLATE);
  }
  function updateConcept(index: 0 | 1, patch: Partial<Concept>) {
    setScenario(s => ({ ...s, concepts: s.concepts.map((c,i) => i === index ? { ...c, ...patch } : c) as [Concept, Concept] }));
    setResult(null);setResearchReport(null);
  }
  function setSegment(targetSegment: Segment) {
    setScenario(s => ({ ...s, targetSegment }));
    setResult(null);setResearchReport(null);
  }
  function downloadText(filename: string, mimeType: string, text: string) {
    const blobUrl = URL.createObjectURL(new Blob([text], { type: mimeType }));
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
  }
  function downloadEvidence() {
    if (!result) return;
    const quote = (value: string | number | boolean | null) => {
      const raw = String(value ?? "");
      // Spreadsheet applications may execute CSV cells beginning with formula markers.
      const safe = /^[=+@\-\t\r]/.test(raw) ? "'" + raw : raw;
      return '"' + safe.replaceAll('"', '""') + '"';
    };
    const header = ["run_id", "mode", "model", "population_pack", "seed", "real_respondents", "segment", "concept_id", "concept_name", "price_bdt", "synthetic_agents", "synthetic_positive_signals", "illustrative_interest_index", "assumed_probability", "assumption_explanation"];
    const rows = result.rows.map(row => [
      result.runId, result.mode, result.provenance.model, result.provenance.populationPack,
      result.provenance.inputSeed, result.provenance.realRespondents, row.segment,
      row.conceptId, scenario.concepts.find(c => c.id === row.conceptId)?.name ?? "",
      row.price, row.syntheticAgents, row.syntheticPositiveSignals, row.interestIndex,
      row.assumedProbability, row.explanation
    ]);
    const csv = [
      "# SYNTHETIC ILLUSTRATION ONLY - not real consumers, calibrated insights or a demand forecast",
      header.map(quote).join(","),
      ...rows.map(row => row.map(quote).join(","))
    ].join("\r\n");
    downloadText("mirrorasia-" + result.runId + "-synthetic.csv", "text/csv;charset=utf-8", csv);
  }
  function downloadResearchProtocol() {
    const lines = [
      "# MirrorAsia Human Check - preregistration template",
      "",
      "Status: unstarted protocol template. Real consumer validation has NOT happened.",
      "Market: Bangladesh / Dhaka",
      "Target segment: " + format(scenario.targetSegment),
      "Concept A: " + scenario.concepts[0].name + " / " + scenario.concepts[0].color,
      "Concept A message: " + scenario.concepts[0].message,
      "Concept B: " + scenario.concepts[1].name + " / " + scenario.concepts[1].color,
      "Concept B message: " + scenario.concepts[1].message,
      "Prices (BDT): " + scenario.prices.join(", "),
      "Simulation reference: " + (result?.runId ?? "Run simulation first"),
      "",
      "## Before recruiting",
      "- Define target sample, eligibility and a fixed question script.",
      "- Provide informed consent and a voluntary withdrawal option.",
      "- Do not collect names, contact details or sensitive personal information in this demo.",
      "- Get actual responses through a separate access-controlled survey.",
      "",
      "## Evaluation",
      "- Use identical concept wording and prices in human and synthetic tests.",
      "- Document response denominators and recruitment biases.",
      "- Calculate and report observed prediction error transparently.",
      "- Never invent human data or claim representativeness from a convenience sample.",
      "- Keep MirrorScore unavailable until benchmark evidence exists."
    ];
    downloadText("mirrorasia-human-check-protocol.md", "text/markdown;charset=utf-8", lines.join("\n"));
  }
  async function simulate() {
    setBusy(true); setError(""); setHumanCheck(false); setResult(null);setResearchReport(null);
    try {
      const response = await fetch("/api/simulate", {
        method: "POST", headers: {
          "Content-Type": "application/json",
        }, body: JSON.stringify(scenario)
      });
      const data: unknown = await response.json();
      if (!response.ok) {
        const message = typeof data === "object" && data !== null && "error" in data ? String(data.error) : "Simulation failed.";
        throw new Error(message);
      }
      setResult(data as SimulationResult);
      setActiveTab("results");
    } catch (err) { setError(err instanceof Error ? err.message : "Network error."); }
    finally { setBusy(false); }
  }
  const selectedRows = useMemo(() => result?.rows.filter(r => r.segment === scenario.targetSegment) ?? [], [result,scenario.targetSegment]);
  const best = useMemo(() => [...selectedRows].sort((a,b) => b.interestIndex-a.interestIndex)[0], [selectedRows]);
  const rowsByPrice = scenario.prices.map(price => ({
    price, a: selectedRows.find(r => r.price === price && r.conceptId === "A"),
    b: selectedRows.find(r => r.price === price && r.conceptId === "B")
  }));
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark">M<span>✦</span></div><div><strong>MirrorAsia</strong><small>CONSUMER INTELLIGENCE</small></div></div>
      <div className="nav-title">WORKSPACE</div>
      <div className="nav-link selected"><span>◈</span> Scenario Studio</div>
      <div className="nav-link"><span>◎</span> Mirror Population <small>v0.1</small></div>
      <div className="nav-link"><span>▤</span> Confidence Lab</div>
      <div className="nav-link"><span>♧</span> Human Check</div>
      <div className="sidebar-bottom"><div className="side-disclaimer"><span className="status-dot"/> DEMONSTRATION MODE<p>No real consumer responses or calibrated predictions.</p></div><div className="account"><div className="avatar">MA</div><div><strong>MirrorAsia Lab</strong><small>IABC 2026 Prototype</small></div></div></div>
    </aside>
    <main className="workspace">
      <header className="topbar"><div className="breadcrumbs">Workspace <span>/</span> Scenario Studio <span>/</span> Beverage concept test</div><div className="right-top"><span className="chip">BD • Dhaka</span><span className="round-icon">✦</span></div></header>
      <div className="page-content"><div className="heading-row"><div><div className="eyebrow">SCENARIO STUDIO / FMCG</div><h1>Test ideas before the market.</h1><p className="subtitle">Explore hypothetical consumer responses, compare options, and see where human validation is needed.</p></div><span className="version-tag">EXPERIMENTAL v0.1</span></div>
      <div className="steps"><span className="step active"><b>01</b> Define market</span><span className="line"/><span className="step active"><b>02</b> Compare concepts</span><span className="line"/><span className="step"><b>03</b> Explore simulation</span></div>
      <div className="dashboard-grid"><div className="main-column">
        <section className="panel"><div className="panel-heading"><div><div className="eyebrow">01 / TARGET AUDIENCE</div><h2>Who are we exploring?</h2></div><span className="muted-icon">◉</span></div>
          <div className="field-grid"><label className="field">Country<input readOnly value="Bangladesh"/></label><label className="field">City<input readOnly value="Dhaka"/></label></div>
          <label className="field section-label">Target segment</label>
          <div className="segment-options">{segments.map(s=><button key={s.value} type="button" className={"segment-option " + (scenario.targetSegment===s.value?"chosen":"")} onClick={()=>setSegment(s.value)}><span className="radio">{scenario.targetSegment===s.value?"●":""}</span><span><strong>{s.label}</strong><small>{s.note}</small></span></button>)}</div>
          <p className="field-footnote">Segment profiles are illustrative, not a measured Dhaka population.</p>
        </section>
        <section className="panel"><div className="panel-heading"><div><div className="eyebrow">02 / PRODUCT CONCEPTS</div><h2>Compare two directions</h2></div><span className="tiny-tag">BEVERAGE</span></div>
          <div className="concept-grid">{scenario.concepts.map((c,i)=><div className="concept-card" key={c.id}><div className="concept-card-title"><span className={"concept-letter concept-"+c.id.toLowerCase()}>{c.id}</span><strong>Concept {c.id}</strong></div>
            <div className={"can-preview can-"+c.color}><div className="can-top"/><div className="can-body"><span>M</span><small>MIRRORASIA<br/>SAMPLE</small></div><div className="can-bottom"/></div>
            <label className="field">Concept name<input value={c.name} maxLength={64} onChange={e=>updateConcept(i as 0|1,{name:e.target.value})}/></label>
            <label className="field">Packaging color<select value={c.color} onChange={e=>updateConcept(i as 0|1,{color:e.target.value as Concept["color"]})}><option value="black">Midnight black</option><option value="red">Vivid red</option><option value="blue">Electric blue</option><option value="green">Fresh green</option></select></label>
            <label className="field">Brand message<textarea rows={2} maxLength={180} value={c.message} onChange={e=>updateConcept(i as 0|1,{message:e.target.value})}/></label>
          </div>)}</div>
        </section>
        <section className="panel"><div className="panel-heading"><div><div className="eyebrow">03 / PRICING EXPLORATION</div><h2>Explore price sensitivity</h2></div><span className="muted-icon">৳</span></div><div className="pricing-row">{[79,89,99].map(price=><button type="button" key={price} onClick={()=>{setScenario(s=>({...s,prices:s.prices.includes(price)?(s.prices.length>2?s.prices.filter(p=>p!==price):s.prices):[...s.prices,price].sort((a,b)=>a-b)}));setResult(null)}} className={"price-chip "+(scenario.prices.includes(price)?"checked":"")}>{scenario.prices.includes(price)?"✓ ":""}৳{price}</button>)}</div><p className="field-footnote">Select at least two prices. All concepts are compared at each selected price.</p><p className="field-footnote">Preview scores use declared assumptions. <strong>Marketing messages are not analyzed in deterministic preview mode.</strong></p>
          <div className="simulation-control"><span><strong>Illustrative agents per segment</strong><small>Seeded synthetic signals, not human respondents</small></span><strong>{scenario.syntheticAgents}</strong></div>
          <div className="run-footer"><div className="privacy-hint">◇ Inputs and demo results are not stored on our server.</div><button className="primary-button" type="button" disabled={busy} onClick={simulate}>{busy?"Running...":"✦ Run simulation"} <span>→</span></button></div>
          <div className="ai-action">
            <div className="eyebrow">AI / CONCEPT CRITIQUE</div><h3>Optional AI-assisted review</h3>
            <p className="field-footnote">Run a real model on names, packaging colors and marketing messages. This <strong>does not simulate consumers</strong> or change the synthetic scores. Rate-limited public demo; brief text is sent to Cloudflare Workers AI for inference, not stored by MirrorAsia.</p>
            <label className="ai-consent"><input type="checkbox" checked={aiConsent} onChange={e=>setAiConsent(e.target.checked)}/> I understand that this produces hypotheses, not human research, and I agree to process these concept details with Cloudflare AI.</label>
            <button type="button" className="evidence-button" disabled={!aiConsent||aiBusy} onClick={analyzeWithAI}>{aiBusy?"Reviewing concepts...":"✦ Analyze concepts with AI"}</button>
            {aiError&&<div className="error-box" role="alert">{aiError}</div>}
            {visibleAi&&<div className="ai-result" aria-live="polite">
              <div className="eyebrow">MODEL-GENERATED HYPOTHESES · NO REAL RESPONDENTS</div>
              <p className="field-footnote"><strong>Model:</strong> {visibleAi.model} · Real humans: 0 · Not calibrated</p>
              {([["summary","Overview"],["conceptA","Concept A"],["conceptB","Concept B"],["tradeoffs","Trade-offs"],["risks","Risks"],["nextStep","Next test"]] as const).map(([key,label])=><div className="ai-finding" key={key}><strong>{label}</strong><p>{visibleAi.analysis[key]}</p></div>)}
              <p className="result-notice">{visibleAi.warning}</p>
            </div>}
          </div>
          {error&&<div className="error-box" role="alert">{error}</div>}
        </section>
      </div>
      <div className="results-column"><section className="panel results-panel"><div className="panel-heading"><div><div className="eyebrow">EXPERIMENT OUTPUT</div><h2>Simulation insights</h2></div><span className="tiny-tag purple">ILLUSTRATIVE</span></div>
        {!result?<div className="empty-results"><div className="empty-graphic"><span>◎</span><span>◌</span><span>✦</span></div><h3>Ready when you are.</h3><p>Choose your audience, customize both concepts, and run a scenario to explore hypothetical response patterns.</p><div className="mini-flow"><span>Concepts</span><b>→</b><span>Simulation</span><b>→</b><span>Insights</span></div></div>:<div className="result-content">
          <div className="result-tab-row"><button className={activeTab==="results"?"tab active":"tab"} onClick={()=>setActiveTab("results")}>Segment results</button><button className={activeTab==="method"?"tab active":"tab"} onClick={()=>setActiveTab("method")}>Method & sources</button></div>
          <div className="evidence-toolbar"><span>Synthetic evidence · mode, model and zero-human provenance</span><button type="button" className="evidence-button" onClick={downloadEvidence}>Download synthetic CSV ↓</button></div>
          {activeTab==="results"?<><div className="result-highlight"><div className="eyebrow">HIGHEST ILLUSTRATIVE INTEREST • {format(scenario.targetSegment).toUpperCase()}</div><div className="highlight-value">{best?.interestIndex.toFixed(1)}<span>/ 100</span></div><strong>{best ? scenario.concepts.find(c=>c.id===best.conceptId)?.name : ""} at ৳{best?.price}</strong><p>This is a seeded synthetic interest index, not market demand or validated preference.</p></div>
          <h3 className="section-mini">By concept and price</h3>{rowsByPrice.map(row=><div className="comparison-block" key={row.price}><strong className="price-label">৳{row.price}</strong>{[row.a,row.b].map(item=><div key={item?.conceptId} className="bar-row"><span>{item?.conceptId}</span><div className="bar-track"><div className={"bar-fill fill-"+item?.conceptId.toLowerCase()} style={{width:(item?.interestIndex??0)+"%"}}/></div><strong>{item?.interestIndex.toFixed(1)}</strong></div>)}</div>)}
          <div className="legend"><span><i className="legend-a"/> Concept A</span><span><i className="legend-b"/> Concept B</span></div>
          <div className="result-notice">ⓘ AI or hand-authored hypothetical estimates are not empirical evidence. No benchmark study exists yet.</div></>:<div className="method-details"><p><b>Run:</b> {result.runId}</p><p><b>Mode:</b> {result.mode==="preview"?"Deterministic assumptions (no AI inference)":"Model-generated hypothetical estimates"}</p><p><b>Method:</b> {result.provenance.methodology}</p><p><b>Model:</b> {result.provenance.model||"None"}</p><p><b>Population:</b> {result.provenance.populationPack}</p><p><b>Real humans:</b> 0</p><p><b>Seed:</b> {result.provenance.inputSeed}</p></div>}
        </div>}
      </section>
      <section className="panel confidence-panel"><div className="panel-heading"><div><div className="eyebrow">CONFIDENCE LAB</div><h2>Trust, not just numbers.</h2></div><span>♧</span></div><div className="confidence-status"><span className="amber-dot"/> Uncalibrated prototype</div><div className="metric-row"><span>Human benchmark</span><strong>Not available</strong></div><div className="metric-row"><span>Validated error range</span><strong>Not measured</strong></div><div className="metric-row"><span>MirrorScore</span><strong>Not available</strong></div><p className="confidence-note">Confidence requires real, consented benchmark evidence. We do not assign a score without it.</p></section>
      <section className="panel human-panel"><div className="human-header"><span className="human-symbol">♡</span><div><h3>Human Check</h3><p>Validate the most important scenario with real people.</p></div></div><button type="button" className="outline-button" onClick={()=>setHumanCheck(v=>!v)}>{humanCheck?"Hide research plan":"View validation plan"} <span>→</span></button>{humanCheck&&<div className="human-plan"><strong>Consent-first research plan</strong><p>Use the same scenario for consented human research and synthetic comparison. This does not recruit anyone, collect responses or claim validation.</p><button type="button" className="evidence-button" onClick={downloadResearchProtocol}>Download study protocol ↓</button>
          <div className="research-import"><h4>Compare consented aggregate research</h4>
            <p className="field-footnote">Only de-identified aggregate counts with documented consent. Data stays in this browser, is never uploaded, and is not saved. No individual responses or personal information.</p>
            <button type="button" className="evidence-button" onClick={downloadResearchTemplate}>Download aggregate template ↓</button>
            <label className="field">Paste completed aggregate CSV<textarea rows={5} maxLength={32000} value={researchText} placeholder="studyId,segment,conceptId,price,positive,respondents,consentVerified,source,observedAt" onChange={e=>{setResearchText(e.target.value);setResearchReport(null);setResearchError("");}}/></label>
            <button type="button" className="outline-button" onClick={compareResearch}>Compare with synthetic baseline</button>
            {researchError&&<p className="field-footnote" role="status">{researchError}</p>}
            {researchReport&&<div className="research-summary"><strong>Provisional, self-reported aggregate comparison</strong>
              <p>Matched cells: {researchReport.count} · Mean absolute error: {researchReport.meanAbsolutePercentagePointError} percentage points · Coverage: {researchReport.coverage}.</p>
              <p>No independent study audit or calibrated MirrorScore. These figures rely on the evidence supplied, not verified by MirrorAsia.</p>
            </div>}
          </div></div>}</section>
      </div></div>
      <footer className="footnote">MirrorAsia prototype v0.1 · Bangladesh FMCG · No respondent data, revenue, measured calibration or market-accuracy claims.</footer></div>
    </main>
  </div>;
}
