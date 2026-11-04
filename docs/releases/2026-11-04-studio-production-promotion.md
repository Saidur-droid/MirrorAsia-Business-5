# MirrorAsia production promotion — 2026-11-04

## Released to Cloudflare

- Worker: `mirrorasia-iabc-2026`
- Live URL: https://mirrorasia-iabc-2026.mirrorasia-builders.workers.dev/
- Studio: https://mirrorasia-iabc-2026.mirrorasia-builders.workers.dev/studio
- New deployed version: `84c16400-9b44-4127-9bd2-bc94c6872075`
- Previous version retained in Cloudflare deployment history: `75b50fb9-8503-44cb-9764-0deb3dee92d3`
- `HYPERDRIVE` binding retained; original binding ID `98d592e539524d3ba7cb63a41bb9acf9`.
- Existing homepage modules `homepage-assets.mjs` and `homepage-router.mjs` kept unchanged.
- Existing `legacy.mjs` retained for fallback routing; new `studio.mjs` serves updated Studio UI, static assets and simulation endpoint.
- Compatibility date `2026-10-08` preserved.

## Verification

- GitHub Actions candidate smoke: https://github.com/Saidur-droid/MirrorAsia-Business-5/actions/runs/41873254446 — passed all steps.
- GitHub Actions production smoke: https://github.com/Saidur-droid/MirrorAsia-Business-5/actions/runs/41873499839 — passed all steps.
- Repo MVP CI: https://github.com/Saidur-droid/MirrorAsia-Business-5/actions/runs/41873264862 — passed.
- Readiness bundle / dependency security audit passed (Next.js `16.4.5`).

Smoke checks: preserved public landing HTML, Studio HTML, JS and CSS, healthy API, 18-row deterministic simulation results, strictly lower interest at higher default price, model=null, realRespondents=0, MirrorScore=null, invalid-input HTTP 400.

## Non-claims and remaining limitations

- No verified real-human consumer validation, no human calibration and no MirrorScore.
- No real LLM inference in public preview simulation. Marketing copy is not analyzed in deterministic mode.
- Generated scores are illustrative, not real market demand or claims of accuracy.
- This release does not mean the IABC CloudCamp submission has been made.
- Full deployment was executed through the connected Cloudflare account. The GitHub PR remains open for review; its commit is not the historical `main` branch.

## Recovery

Cloudflare prior production version `75b50fb9-8503-44cb-9764-0deb3dee92d3` remains visible in the Worker deployment history. A Worker rollback does not roll back database content or resource configuration; those were not modified in this release.
