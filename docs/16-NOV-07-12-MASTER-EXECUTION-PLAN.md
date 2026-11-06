# 7–12 November 2026 — Massive Execution Plan
**Internal target:** demo/release freeze by 12 November.  
**User-stated competition submission target:** 20 November. This is not independently confirmed by the current official policy page; organizer/portal confirmation remains a separate eligibility gate. The current Submission Rules v1.1 says the deadline is the one officially announced by organizers and requires a one-page summary plus a three-minute video.

## The four weaknesses to close

| Weakness | 12 Nov target | Honest status rule |
|---|---|---|
| Bangladesh-specific intelligence | Versioned national aggregate reference schema, official source registry, first usable geography/household strata, Bangla/Banglish handling | Do not claim behaviour calibration from demographic statistics |
| Real human evidence | Public consent-first pilot survey live; initial voluntary responses; quality and coverage dashboard | If response count is zero, report zero; no simulated/fabricated participants |
| Business validation | Interview script, prospect map, pilot offer, pricing hypotheses, documented discovery evidence | A lead list or sent email is not customer validation; only completed conversations count |
| Investor readiness | Evidence-backed deck/data room, architecture, cost model, risk register, milestones and honest traction | “Investor-ready package” is not “funding-ready traction” |

## Day-by-day execution

### 7 Nov — Lock strategy and evidence contract
- Adopt `15-MIRRORASIA-OPERATING-CHARTER.md`.
- Adopt the Bangladesh-wide, all-category population model in doc 17.
- Freeze first decision workflow: compare a consumer product/offer across segment, price, packaging/message and channel. Beverage is one example, not the product boundary.
- Create source register, data-rights review column, evaluation protocol and judging scorecard.
- Freeze prohibited claims: no human validation, no calibrated accuracy, no customer traction, no MirrorScore until evidence exists.

**Acceptance:** architecture and rubric traceability documented; source registry has official sources and explicit “not yet ingested/rights review pending” statuses.

### 8 Nov — Population data foundation
- Implement typed source registry and population-observation schema.
- Ingest only aggregate official tables after checking download terms, metadata and licence/permission. Do not scrape restricted microdata.
- Build national → division → district → urban/rural coverage map from Census metadata; missing geographies remain missing, not imputed silently.
- Add HIES expenditure/income context and Labour Force employment context as separate measures with reference years.
- Add category-module contract and source-to-feature mapping.

**Acceptance:** every loaded value has a source ID, reference period, geography, unit and evidence type; all missing fields are explicit; tests reject unknown source and invalid values.

### 9 Nov — Public research pilot
- Complete public survey UI, 18+ self-attestation, clear purpose/consent, randomised A/B allocation, price assignment, anonymous duplicate controls, rate limiting, withdrawal and retention notice.
- Connect D1 schema and aggregate dashboard; suppress small cells (minimum n=10 for display is a privacy floor, not statistical representativeness).
- Launch a pilot link only after privacy/consent and end-to-end tests pass.
- Collect genuine voluntary responses. Record channel and sampling limitations at aggregate level; never infer national representativeness from convenience recruitment.

**Acceptance:** browser → consent → assignment → response → D1 → aggregate results works; duplicate, invalid consent, expired session, rate-limit and withdrawal tests pass. The human-evidence milestone remains “collecting” until actual responses arrive.

### 10 Nov — Population model + confidence
- Build population strata from available official aggregate sources; separate structural demographics from category behaviour.
- Add category modules for food/beverage, grocery/retail, personal care, home/appliances, electronics, fashion, mobility, telecom/digital services and other lawful consumer categories.
- Add Bangla/Banglish/English text handling as language support, not as evidence of behavioural accuracy.
- Freeze a benchmark split by study/time; use held-out real outcomes only.
- Add rank agreement, mean absolute percentage-point error, segment coverage, price-direction agreement, calibration freshness and overconfidence checks.
- Confidence must downgrade or be unavailable when the matching benchmark is missing/stale/too small.

**Acceptance:** no benchmark → unvalidated; held-out scope-matched evidence → experimental/provisional; “calibrated” only after the preregistered minimum gates in doc 17 pass.

### 11 Nov — Business proof + competition assets
- Prepare buyer-specific discovery for FMCG, retail, personal care, telecom and market-research teams.
- Create 15-minute interview script, design-partner one-pager and bounded pilot proposal.
- Document alternatives, buying trigger, budget owner, procurement/security objections, expected ROI and willingness to pilot.
- Build one-page project summary, architecture diagram, AI/data provenance, risk/ethics note, 180-second demo script and KPI sheet.
- Run a red-team review against all six judging criteria.

**Acceptance:** business claims are labelled “hypothesis”, “conversation”, “LOI”, “pilot” or “paid customer” accurately. Demo uses actual production output and visible limitations.

### 12 Nov — Release and demo freeze
- Full unit/integration/security/type/build suite.
- Staging smoke, production smoke, mobile/low-bandwidth and accessibility checks.
- Confirm every public link, demo account/access, video duration and permission.
- Freeze the exact commit and release tag; save rollback version.
- Prepare a submission pack and confirm organizer’s actual deadline/portal status before any submission.

**Acceptance:** no P0 failures; all six rubric categories have evidence or a candid gap; 1-page summary and 3-minute demo ready; exact release commit and evidence links archived.

## 20 November — submission buffer
Use 13–19 Nov for external review, customer/mentor feedback, fixes, final video, team/eligibility verification and portal submission. Save receipt/application ID and confirmation email. Do not assume a portal is open without checking it.

## Dependencies that cannot be fabricated or automated away
- Human responses require real people to volunteer and consent.
- Customer validation requires actual buyer conversations and recorded outcomes.
- NRB/mentor contribution requires an actual collaborator with a defined role.
- Team membership and submission receipt require verified portal records.
- Funding is not guaranteed by a prototype or competition entry.

## Daily reporting format
At the end of each day report: shipped artifacts, tests, live version, evidence counts, six-category scorecard movement, unresolved blockers, and next-day acceptance criteria. A code commit alone is not a milestone.
