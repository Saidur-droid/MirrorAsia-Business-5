# MirrorAsia IABC 2026: Implementation Log (2026-10-08)

## What exists in branch feat/iabc-2026-mvp-foundation
- Next.js TypeScript application (FMCG Dhaka scenario studio)
- Two editable concept cards, packaging colors/messages
- Three fixed BDT price options, select 2 or 3
- Three illustrative consumer segment options
- POST /api/simulate and GET /api/health
- Scenario input schema with bounded fields, prices and synthetic agent count
- Seeded illustration engine; repeatable, non-empirical synthetic positive signals
- Optional server-side LLM propensity estimates, disabled by default
- Transparent simulation mode, provenance, null human benchmark and MirrorScore
- Human Check planning interface, NOT recruitment/collection
- Unit tests for validation, simulation reproducibility and safety labels

## Boundaries
- No real respondent data is collected or implied.
- This is a hypothesis-exploration product, not a calibrated consumer model.
- In preview mode, price/color illustrative assumptions are preprogrammed.
- Message text is editable but NOT analyzed in preview mode.
- In live AI mode the model suggests hypothetical propensities, not validated outcomes.
- Do not present synthetic sample size as a representative statistical sample.
- No persistent storage, authentication, billing or commercial users exist yet.
- Only free preview mode is enabled by default. Live API usage may cost money.

## Recommended deployment
Deploy on a Node 22-capable Next.js hosting platform, build with npm ci after
committing a generated package-lock.json, set MIRRORASIA_AI_MODE=preview.
Do not connect production respondent data or turn on live AI for an open
public endpoint. For paid model calls, configure server-side authentication,
provider spend limits, rate limits and cost alerts first.

## QA commands
npm install
npm test
npm run typecheck
npm run build

## Next milestones
1. Create and commit reproducible package-lock.json on a networked build runner.
2. Run tests and build in CI; review results and repair failures.
3. Set up free deployment preview, confirm API health / mobile usability.
4. Document model provenance and evaluate AI mode against consented human evidence.
5. Design Human Check consent workflow and storage controls before collecting data.
6. Complete IABC one-page summary and record true 3-minute walkthrough.
7. Reconfirm official submission link, team eligibility and final deadline.

## IABC reference
Submission Rules v1.1: https://cloudcampbd.com/events/ai-builders-congress/policies/submission
AI Usage Policy v1.1: https://cloudcampbd.com/events/ai-builders-congress/policies/ai-usage
Official event: https://cloudcampbd.com/ai-builders-congress

Contest documentation remains untouched under docs/13-IABC-2026-IDEA-TO-UNICORN-PLAYBOOK.md.
