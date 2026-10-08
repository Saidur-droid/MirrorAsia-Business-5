# MirrorAsia AI Usage and Data Provenance Register

Updated: 2026-10-08

## Development assistance
Code drafting and architecture assistance: OpenAI ChatGPT / GPT-6.
All generated code requires human review and automated tests before production.
No third-party proprietary product code or datasets were intentionally reused.

## Data sources
- No real consumers, respondents, panels or surveys.
- No real purchase histories, ethnic profiles or private demographic data.
- Illustrative segment labels are product concepts, not measured proportions.
- Scenarios and pseudo-agents are generated at runtime from user-entered inputs.
- Static illustrative packaging effects and price response live in src/lib/engine.ts.

## AI inference
Preview (default): no LLM called. Illustrative rule-based probability + seeded
pseudo-random draws; this is NOT empirically based, accurate or calibrated.

Optional live AI: server-side OpenAI Chat Completions API, model name from
OPENAI_MODEL, prompts in src/lib/ai.ts. Input: user-provided concept names,
package color, messages, segment, price combinations. Output: JSON cells with
hypothetical interest propensities and assumptions. All cells validated; outputs
still cannot claim real consumer behavior, confidence or human calibration.
The service never sends private respondent data because none is collected.

## Evidence status
Human benchmark count: 0
MirrorScore: unavailable
Validated error range: unavailable
Reported accuracy: none
Paid customers / revenue: no claims

## External contributors
Not yet recorded. Add actual names and their confirmed contributions only after
consent, including mentors or NRB collaborators.

## Before collecting real responses
Consent notice, retention/deletion rules, legal basis, secure storage,
respondent anonymity, ethics review, permissions and validation methodology are
mandatory gates.
