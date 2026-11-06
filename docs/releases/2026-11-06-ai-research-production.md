# MirrorAsia production milestone — AI-assisted concept critique and research comparison
**Date:** 2026-11-06 (Asia/Dhaka)  
**Production Worker:** `mirrorasia-iabc-2026`  
**Production Studio:** https://mirrorasia-iabc-2026.mirrorasia-builders.workers.dev/studio  
**Current deployed version:** `8acc7f85-8a5f-465d-b78a-cd301d3007c2`  
**Previous version retained:** `a9e280ea-bee0-4f53-b7df-68d27417fa88`

## Release scope

- Existing animated marketing homepage, graphics, old legacy routes, health and corrected deterministic FMCG simulation retained.
- Opt-in real Cloudflare Workers AI inference added as an **independent concept critique**; it does not modify simulated interest scores or imply a survey.
- Model: `@cf/meta/llama-3.3-70b-instruct-fp8-fast` (open model served through Cloudflare Workers AI). Input includes scenario target segment, concept name, packaging color and marketing copy.
- Strict bounded JSON fields: summary, conceptA, conceptB, tradeoffs, risks, nextStep. Model failures are not disguised as valid results; at most one bounded retry is allowed for malformed JSON, then a clear failure.
- Explicit browser opt-in checkbox required; backend also requires `x-mirrorasia-ai-opt-in: yes`. No AI inference from routine simulation calls.
- Strictly bounded body input (3500 characters) and allowlisted country/city, segments and colors.
- Cloudflare AI binding named `AI`, per-visitor and aggregate Worker rate-limit bindings `AI_RATE_IP`/`AI_RATE_GLOBAL` (1 request per 60 seconds each); Worker location rate limits are auxiliary, not claimed as a mathematically strict global spending ceiling.
- A **hard UTC daily budget of 25 opt-in AI analysis requests** is enforced with a single atomic D1 UPSERT `INSERT ... ON CONFLICT ... WHERE requests < 25 RETURNING`. Quota remains consumed on a failed model output, by design. The database contains only UTC day, request count, and timestamp; no respondent data, IP addresses or concept content.
- D1 quota database: `mirrorasia-ai-usage-20261106` (binding `AI_QUOTA`).
- Consent-aware research panel for importing only **already collected** anonymized aggregate observations. Imported CSV stays in browser memory, is not submitted to MirrorAsia servers, and can be compared against matching synthetic baseline cells for provisional mean absolute percentage-point error. This is not externally audited calibration.
- Consent-and-methodology study protocol plus research CSV template downloadable from Studio.
- The original `HYPERDRIVE` binding was preserved; no old database tables modified.
- Structured error logging and Cloudflare sampled logs/traces enabled.

## Independently checked

- MVP unit/type/build/dependency security workflow: https://github.com/Saidur-droid/MirrorAsia-Business-5/actions/runs/42243757376 — **success**.
- 70B model staging end-to-end smoke workflow: https://github.com/Saidur-droid/MirrorAsia-Business-5/actions/runs/42243919521 — **success**.
- 70B production end-to-end smoke workflow: https://github.com/Saidur-droid/MirrorAsia-Business-5/actions/runs/42244094585 — **success**.
- Browser Studio HTML, bundled JavaScript/CSS, preserved homepage, health, 18-row simulation, mandatory AI consent, live structured model response, no-human provenance: smoke-tested.
- D1 cap table and quota increments verified on Cloudflare account; requests today at final spot-check were 4 of 25.
- Cloudflare current and previous version IDs verified; all five Worker bindings retained.

## Explicit non-claims and future gates

1. No actual human consumer validation has happened. No one should describe AI output or synthetic draws as real consumer survey answers.
2. `MirrorScore` and validated predictive accuracy are **not available**. Provisional imported-aggregate error is conditional on study data supplied by an operator.
3. A formal research study still needs actual informed-consent recruitment, privacy review, eligibility criteria, bias documentation and genuine data collection; nothing is fabricated.
4. CloudCamp submission, team confirmation, demo video and competition dates were **not independently verified or submitted** in this release.
5. AI calls have Cloudflare model usage cost; only the daily request count is hard-capped, not a contractual currency billing limit. The model can retry once on malformed output.
6. Avoid enabling unbounded models, broadening public API access, or loosening rate limits before reviewing usage and security.

## Recovery

Prior production Worker version `a9e280ea-bee0-4f53-b7df-68d27417fa88` remains in deployment history. A Worker rollback does **not** roll back connected resources; old Cloudflare Hyperdrive was not changed and the new quota D1 contains only aggregate operational counters.
