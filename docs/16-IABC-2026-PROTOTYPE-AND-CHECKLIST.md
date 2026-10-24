# MirrorAsia — 7-Day Prototype & Submission Execution

**Period:** 24–30 October 2026 (reserve 31 October as contingency). **Video deliberately excluded from production tasks at user's request; the required video remains an unresolved final submission blocker.**

## Prioritised minimum product

Build an honest **FMCG beverage concept-screening demonstrator**, NOT a fictitious validated prediction service.

### Frontend pages
1. Landing + product explanation and experimental-status warning
2. Scenario Studio: two beverages/packaging concepts, user-supplied prices in BDT, location, target segment, concept text
3. Population Selector: synthetic *illustrative* country/segment fixture with source label
4. Run Simulation: model/engine API processing with job status, input controls, errors
5. Segment Explorer: response aggregation, caveat and export
6. Confidence Lab: show 'UNVALIDATED / Human validation recommended' until genuine evidence exists; expose model, prompt, fixture and run versions
7. Human Check: request-intake/waitlist, **not** 'completed respondent survey'
8. Methodology & Privacy page: explain assumptions, source provenance and limitations.

### Schema sketch
- scenarios(id,workspace_id,description,category,created_at,fixture_version)
- alternatives(id,scenario_id,label,price_bdt,concept_text,asset_ref)
- population_packs(id,market,version,source_type,licensed,validated_at)
- cohorts(id,population_pack_id,description,aggregate_metadata)
- simulation_runs(id,scenario_id,population_pack_id,model_id,prompt_version,status,seed,created_at,finished_at)
- simulation_outputs(id,run_id,cohort_id,alternative_id,response_json,model_reasoning_summary)
- human_benchmarks(id,consent_basis,source_ref,sample_n,study_period,market,category)
- evaluation_results(id,run_id,benchmark_id,metric_name,value,method)
- provenance_records(id,run_id,source_type,source_name,model_version,license_ref)
- validation_requests(id,scenario_id,requested_sample,target_segment,status)
- audit_events(id,actor_id,action,object_id,created_at)

**No personally identifying respondent data in demo fixtures.** Avoid exposing provider credentials; do not collect real data until privacy/consent processes exist.

## Proposed free-only deployment (subject to verified compatibility and quotas)

- Frontend: Cloudflare Pages Free
- API: Cloudflare Workers Free only if runtime is compatible; alternative explicitly approved free stateless service
- DB: Neon PostgreSQL Free; NEVER Render Free PostgreSQL for durable data
- AI inference: a verified available free allowance or deterministic local illustrative engine; do NOT claim AI model usage if using only fixtures
- CI: GitHub Actions within free allowances
- Backups: planned only until independent encrypted backup and restore actually tested
- No billing/paid inference without explicit approval.

## MVP acceptance tests

- Create two alternatives with same scenario and two eligible segments.
- Input validation rejects missing alternative, invalid price, bad values and bad asset types.
- Exactly one run persists with traceable run_id, fixture/model/prompt versions and status.
- Outputs have segment and alternative IDs and a documented schema.
- Failed API run shows error, retry does not duplicate results.
- No code path invents a verified accuracy score or demographic representativeness.
- Confidence is explicitly 'experimental/unvalidated' in absence of a real benchmark.
- Demo can run on mobile and desktop; no private respondent data exposed.
- Links open in logged-out browser (or judges have explicit approved access).
- Source licenses, consent and contributor provenance are accurate.
- Automated tests/build pass; security scan for leaked secrets.
- Accessibility: keyboard, labels, error text, color contrast.

## Prompt library — DRAFT PROMPTS (not evidence of deployed use)

> Add a prompt to CloudCamp's used-prompt library only after the team actually runs and documents it. Each entry should record model/provider, date, version, purpose, inputs, results, human verification, safety constraints, and the member who used it.

### P1: Structured FMCG concept comparison (planned)
Role: Research-screening assistant for a transparent synthetic test.
Prompt:
```
You are generating illustrative, synthetic consumer responses for a prototype.
You are NOT a representative human panel and cannot predict real purchase behavior.
Use only the explicitly supplied, non-personal segment profile and product alternatives.
Compare price, packaging and message, with short, neutral reasons.
Return strictly valid JSON with:
{segment_id, alternatives:[{alternative_id, directional_preference, reasons, limitations}], evidence_status:"synthetic_unvalidated", human_validation_recommended:true}
Never invent observed consumer counts, percentages, confidence intervals, field research, survey participants, or validated market share.
If a critical input is missing, return an explicit error.
```

### P2: Localisation and fairness review (planned)
```
Review these Bangla/Banglish concept descriptions and segment aggregates for
translation errors, unsupported demographic assumptions, stereotypes and culturally
inappropriate claims. Return flags with severity, evidence and safer wording.
Do not infer sensitive traits about individuals. Use uncertainty whenever evidence is absent.
```

### P3: Benchmark comparison (planned, requires actual approved human benchmark)
```
Given REAL documented benchmark results, synthetic outputs, target populations and
the full evaluation protocol, calculate only the specified evaluation metrics.
Report sample size, source IDs, date, cohort and category scope; calculate errors
deterministically; flag mismatches, distribution shift, insufficient sample sizes
and possible leakage. Never manufacture benchmark values or confidence claims.
```

### P4: Plain-language decision brief (planned)
```
Summarise the concept comparison for an FMCG product manager. Separate:
1. Synthetic directional findings
2. Evidence available
3. Important limitations
4. Next real-human validation action.
Never represent an unvalidated simulation as a sales forecast.
```

## Team work split

- Lead: submission copy, customer/problem story, research, IP attribution, preview and acceptance.
- AI/backend: data schema, API, safe inference, logged model provenance, tests.
- Frontend/UX: mobile UI, scenario input, dashboard, accessible demo, screenshots.
- All: independent QA, consent/security review, actual tool disclosure.

## Calendar

**Oct 24** Confirm 3 CloudCamp members and their joined status; freeze FMCG scope; save draft.
**Oct 25** Story fields + architecture; create first frontend screens.
**Oct 26** Implement inputs, mock population fixture, API contract and traceable runs.
**Oct 27** Implement schema-driven outputs, Segment Explorer and unvalidated Confidence Lab.
**Oct 28** Deploy and test free infrastructure; add privacy/methodology/provenance.
**Oct 29** Validate demo on mobile and clean browser; actual prompt/tool disclosure; complete story.
**Oct 30** Audit claims, team, links and missing fields; save/reopen; freeze build and record proof.
**Oct 31** Final policy and submission check; mandatory video is still missing unless user adds it.

## Step by step in CloudCamp

1. Open **Teams**; ensure all 3 invitations ACCEPTED and all 3 members displayed.
2. Existing draft: **Submissions** → **Untitled Project**.
3. Story: paste from `docs/15-IABC-2026-CLOUDCAMP-SUBMISSION-KIT.md`.
4. Choose Domain = CommerceSphere AI if available; choose self-defined challenge only if offered.
5. Proof: add actual working demo URL and permitted repository access; not placeholders.
6. AI-Native Build: record real model, orchestration, methods, IDE, framework, infrastructure and real MCP information.
7. Data Lifecycle: distinguish demo fixture, aggregate public sources and any genuinely consented human benchmarks.
8. Prompt Library: log actual prompt usage with versions; never claim unused prompts were run.
9. Team: confirm three active contributors and honest disclosures.
10. Save Draft; re-open and check each field.
11. Mandatory video remains separate. Do not attempt to bypass validation or insert fake links.
12. Submit only once the portal's required fields and official policy are satisfied and verify confirmation.

## Reporting status matrix

| Item | Verified on repo 2026-10-24 | Submission status |
|---|---|---|
| MirrorAsia positioning and architecture | Yes, docs | Ready to describe as proposed |
| Business plan and FMCG wedge | Yes, docs | Ready to describe as planned |
| Functional frontend/backend | No code found | Build required |
| Real model invocation | Not evidenced | Build and disclose |
| Consented Bangladesh respondents | Not evidenced | Do not claim |
| Human benchmark accuracy / MirrorScore | Not evidenced | Never invent |
| Public deployed demo | Not evidenced | Deploy and verify |
| Three joined CloudCamp members | Screenshot showed one | Confirm |
| Video | Omitted by request | Required blocker |

## Grounding
See README.md, AI_CONTEXT.md, docs/03-PRODUCT-AND-CALIBRATION-ARCHITECTURE.md, docs/09-METRICS-AND-MIRRORSCORE.md and docs/13-IABC-2026-IDEA-TO-UNICORN-PLAYBOOK.md.
