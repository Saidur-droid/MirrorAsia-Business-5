# MirrorAsia research-to-product architecture (2026-10-08)

## Benchmark boundaries

Primary inspiration: Simile (https://www.simile.ai/).
Secondary workflow benchmark: Aaru (https://aaru.com/).
Research origins: Stanford Generative Agents (https://arxiv.org/abs/2304.03442),
Generative Agent Simulations of 1,000 People (https://arxiv.org/abs/2411.10109).
These sources do **not** disclose the commercial platforms' internal implementation.
Do not assume their production cloud, database, training code or UI source is public.
Do not copy proprietary source, visual assets or private datasets.

## Evidence to product pipeline

1. Human research operations: consented, de-identified observations with study ID,
   collection method, question/response schema, timestamps and withdrawal mechanism.
2. Population pack: country/locale/version/coverage/dataset provenance. Public BBS
   census/HIES could inform aggregate weighting, subject to source-license checking.
   **BBS aggregate demographics are not observed beverage purchase behavior.**
3. Model: start with simple measured baseline models (logistic / hierarchical regression),
   then compare against optional locally hosted or permitted language-model approaches.
   LLM provides interview transcription, Bangla/Banglish normalization, theme extraction,
   qualitative summaries, question generation and scenario descriptions. It should NOT
   manufacture respondent observations.
4. Experiment matrix: concept x price x segment with deterministic seed and versioned
   model configuration; identical inputs reproduce outputs within version.
5. Evaluation: hold out real responses, report mean absolute percentage-point
   preference error, rank agreement, sample/segment coverage, confidence calibration.
   Never train and evaluate on the same participant rows.
6. Human Check: ethical recruitment, informed consent, aggregate reporting,
   secure retention, delete/withdrawal processes.
7. Refresh: replace/populate a new version only after benchmark checks, audit and review.

## Near-term scope versus aspiration

Implemented at this stage: illustrative population schema and benchmark evaluation
helpers, without respondent ingestion or actual trained model. No real respondents.
The current scenario engine is **not** a human-trained model. Do not claim better
performance than any competitor without independent blinded head-to-head evidence.

## Research risk register

- Missing Bangladesh-specific behavioral ground truth: prioritize pilot research.
- Say-do gap: compare stated preference to actual purchase where consent and access allow.
- Representativeness: stratify recruitment and report nonresponse/coverage.
- Hidden uncertainty: suppress numerical confidence intervals until empirically assessed.
- Prompt injection: treat scenario text as user data, never system instructions.
- Privacy: never store respondent names or contact information in simulation records.
- Costs: disable paid AI and automated expensive inference on public demo.
