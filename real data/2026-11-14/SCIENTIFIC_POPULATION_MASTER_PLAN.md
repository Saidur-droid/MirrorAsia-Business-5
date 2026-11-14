# MirrorAsia — Canonical Scientific Architecture (2026-11-14)

**Status: Approved strategic direction / implementation incomplete.** Scope: Dhaka first for the competition; Chattogram and Sylhet available as secondary descriptive census datasets; national and global expansion only after quality gates.

## North star
Reduce wasted concept-screening effort by evaluating product/price/pack/message/channel combinations quickly, **then measure agreement against external observed outcomes**. Synthetic consumer results are estimates, not survey respondents, sales evidence or guaranteed demand.

## 1. Official data foundation
BBS Population & Housing Census 2022 + HIES 2022 + MICS 2025 + WorldPop + lawful licensed GIS boundaries. **Actual ingestion status:** local 2022 CSV aggregates only; MICS, WorldPop and GIS are research candidates and NOT ingested. Every observation requires source ID, source link, geography, vintage, units, license state, transformations and missingness.

## 2. Geo-calibrated synthetic population
Use administrative boundary version, household strata, constraint tables and **IPF/raking** with explicit weights, residual constraints, structural missingness and uncertainty. Never use division income as ward income. Validate marginal totals, weight dispersion and geography crosswalk before naming a population pack calibrated. Start with Dhaka City Corporation national totals; no complete Dhaka ward data yet. Create pack versions such as `BD-DHAKA-2022-DEMO-v0.1` marked DEMOGRAPHIC ONLY.

## 3. Observed consumer decision baseline
Category-specific outcome schema: choice, stated intent, actual purchase when lawful, price, exposure, channel, segment and study/time. Evidence options: purpose-specific voluntary studies or properly licensed/authorized aggregated retail sales and historical research. The product is intended to greatly **reduce repeated broad human surveys**, not eliminate every independent measurement. Public census **contains no product-preference ground truth**. Consentless personal profiling or fabricated responses are prohibited.

## 4. Scenario engine
`product × price × packaging × message × city × segment × channel`; deterministic seeds, model and prompt versions, scenario provenance. Start with logistic/hierarchical statistical baselines; compare CatBoost/XGBoost only after real labels; LLM qualitative critique cannot count as consumer buying truth.

## 5. Blind validation and confidence
Hold out by independent study or time. Freeze predictions before revealing truth. Publish **preference mean absolute percentage-point error, winner/rank agreement, price-direction agreement, segment disparity, uncertainty-interval coverage and overconfidence**, plus sample n, study scope, freshness and limitations. If no held-out observed evidence: `UNCALIBRATED`, `MirrorScore=null`, `accuracy=NOT_MEASURED`. Human check is triggered by low evidence or novelty.

## Implementation
PostgreSQL/PostGIS; Python pandas/geopandas/statsmodels/scikit-learn/IPF; Next.js and existing Cloudflare Worker; optionally CatBoost/XGBoost after labels, agent networks later. Never enable elevated Neon roles in a public Worker. Separate research artifacts from production deployment.

## Sequence and release gate
(1) Source registry and data QA (in this folder). (2) Dhaka ward-level official extract with licensing. (3) ward crosswalk and IPF with tests. (4) simple outcome model once lawful observations are available. (5) blind benchmark against actual outcomes. (6) scoped confidence report. (7) safe production release and pitch. Later Chattogram/Sylhet complete geographic crosswalk and Bangladesh nationwide coverage.

## Competition snapshot
A working **illustrative** FMCG Studio and AI concept critique exist in a separate feature branch; no measured consumer prediction accuracy. Judges can inspect technical flow and official demographic source, not claim prediction is validated. The 1-page summary and real 3-minute demo are mandatory; organizer submission eligibility must be independently verified.
