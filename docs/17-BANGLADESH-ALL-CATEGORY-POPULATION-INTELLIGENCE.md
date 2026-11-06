# Bangladesh Population Intelligence — All-Category Foundation
**Architecture specification v1.0 · 7 November 2026**

## Product definition

MirrorAsia is a reusable population intelligence platform for consumer products and services in Bangladesh. It must not be modelled as a beverage-only tool. A category module plugs into one shared population foundation and evaluation system.

The product promise is not “we know every Bangladeshi consumer.” It is:

> Build a transparent, versioned picture of the relevant population from lawful aggregate evidence; test a decision; measure its agreement with held-out human/observed outcomes; expose where evidence is weak.

## 1. Universal population layers

1. **Geography:** country, division, district, upazila/municipality/urban-rural where official source granularity permits.
2. **People and households:** age bands, household size/composition, education, disability where lawfully aggregated, migration/urbanisation context.
3. **Socioeconomic context:** income/expenditure bands, employment/occupation, poverty/consumption context. Preserve source year and definitions.
4. **Language and access:** Bangla, Banglish, English; connectivity/device/access variables only when an authoritative source supports them.
5. **Observed behaviour:** category-specific purchase/use/choice outcomes from consented studies or partner-authorised aggregate data.
6. **Decision context:** product/offer attributes, price, availability, channel, seasonality, competitors and exposure conditions.
7. **Evidence and confidence:** provenance, sample, coverage, bias, freshness, held-out error and benchmark scope.

No layer silently substitutes for another. Census counts do not become purchasing propensities. Payment-system totals do not become individual spending patterns. An LLM does not become a data source.

## 2. Category modules — one platform, many products

Each module must declare its decision types, feature schema, outcomes, evidence needs and safety restrictions.

| Module | Example decisions | Required behaviour evidence |
|---|---|---|
| Food & beverage | concept, taste description, pack, price, frequency | purchase/consumption study, repeat purchase if available |
| Grocery & retail | assortment, basket, promotion, channel | basket/loyalty/retail panel aggregate, consented survey |
| Personal care & household | product claims, format, price, usage | usage frequency, choice and repeat outcomes |
| Home & appliances | feature bundles, design, price | consideration, purchase, usage/returns where available |
| Electronics & devices | specs, brand, price, replacement | choice, ownership, upgrade cycle |
| Fashion & lifestyle | style, size availability, price, channel | preference and actual purchase outcomes |
| Mobility & automotive | ownership, feature, service, price | consideration, usage and purchase evidence |
| Telecom & digital services | plan, bundle, UX, price | adoption, churn, usage outcomes |
| Entertainment & travel | content, destination, package, price | booking/usage/retention evidence |
| Education products | learning product format, price, access | opt-in usage and learning outcomes; no high-stakes student profiling |
| Other lawful consumer products | configurable | module-specific evidence contract |

The platform may be product-agnostic, but it is not evidence-agnostic. A category remains “experimental” until that category has matching human/observed benchmarks.

**Out of scope for individual-level decisioning:** political persuasion, credit/insurance eligibility or pricing, employment screening, individual health diagnosis, sensitive-trait inference, and manipulative targeting.

## 3. Official Bangladesh source registry (candidate sources; ingestion is a separate gated step)

| Source ID | Publisher / dataset | Potential use | Limitation / gate |
|---|---|---|---|
| BBS-PHC-2022 | Population & Housing Census 2022; national, district, urban-area, union/community tables and metadata | geography, population and household structure | Aggregate demographics only; verify table definitions, downloadable terms and licence before ingestion |
| BBS-HIES-2022 | Household Income and Expenditure Survey 2022 final report/tables | income, expenditure, consumption and poverty context | Survey year and sampling design must accompany each statistic; not product-specific preference |
| BBS-LFS-2024 | Labour Force Survey 2024 final report | employment/occupation/labour-force context | Not a purchase or brand-choice dataset |
| BB-PSR-2025 | Bangladesh Bank Payment Systems Report 2025 | macro digital/cash payment environment | Aggregate payment system trends; not individual or category-level purchasing |
| BDL-PDPA-2026 | Personal Data Protection Act 2026 | consent, purpose, retention, rights and security design | Obtain legal review for actual collection, cross-border processing and controller/processor obligations |

### Source rights and provenance policy
For every file/table, record: publisher, canonical URL, exact table/page, publication and reference period, download date, licence/terms, permitted use, geography, unit, denominator, transformations, version/hash, quality review, and refresh cadence. “Publicly downloadable” does not automatically mean unrestricted commercial reuse. No microdata ingestion until terms and lawful basis are reviewed.

## 4. Evidence hierarchy

- **Tier A — observed outcome:** consented, quality-checked human or real-world outcome, with documented collection method.
- **Tier B — official aggregate context:** BBS/BB/other official aggregate statistics; structural context, not behavioural labels.
- **Tier C — partner-authorised aggregate data:** client data with contract, purpose limitation and rights documented.
- **Tier D — published secondary research:** cited, scope-limited, date-stamped and quality assessed.
- **Tier E — illustrative assumptions:** explicitly synthetic; never used as ground truth or to claim calibration.
- **LLM output:** an interpretation/analysis artifact, not population evidence.

## 5. Canonical observation schema

Every observation must include:
- source ID and source version,
- metric and unit,
- category module (or null for universal population context),
- geography and granularity,
- segment definition/version,
- reference period and collection date,
- numerator/denominator or estimate/sample size where applicable,
- evidence tier and method,
- rights/terms status,
- quality/coverage notes,
- transformation lineage.

Missing or incompatible data is represented as missing. Do not fill it with a model guess and then label it observed.

## 6. Calibration and confidence protocol

For every evaluation scope define: country, category, decision/outcome, segment, price/condition, study period, population version and model version.

- Freeze predictions before revealing held-out results.
- Split by study or time, not random rows from the same respondent pool.
- Report mean absolute percentage-point error, winner/rank agreement, price-direction agreement, segment coverage, uncertainty intervals, and overconfidence.
- Report n, number of independent studies, recruitment method, nonresponse/coverage, source age and confidence interval.
- Do not train and evaluate on the same response records.
- No global MirrorScore. Any future score is scoped to category × geography × segment × decision × time and requires independent review.

### Internal confidence gates (release policy, not universal scientific thresholds)
- **Unvalidated:** no comparable held-out evidence.
- **Experimental:** some comparable evidence exists but sample, independent studies, scope match or freshness is insufficient.
- **Provisional:** held-out, scope-matched evidence from at least two independent studies and at least 30 responses; publish uncertainty and limitations.
- **Calibrated (restricted scope only):** preregistered held-out evaluation, at least three independent studies and 100 responses, rank agreement ≥0.75, MAE ≤10 percentage points, and evidence no older than 180 days. These are conservative internal release gates and must be reviewed by a statistician; passing them does not imply national representativeness.

## 7. Bangladesh language strategy
- Research instruments and product text support Bangla, Banglish (Bangla written in Latin script), and English.
- Store original response language and a separate normalized version; never overwrite source text.
- Translation/normalization must be versioned and human-reviewed on a sample.
- Measure whether model performance differs by language and segment.
- Never infer literacy, income or education from writing style alone.

## 8. Initial implementation sequence
1. Ingest Census/HIES/LFS aggregate tables after rights/metadata review.
2. Create a national/division/district coverage matrix and missingness report.
3. Build population strata and constraint checks; no individual “real person” profiles.
4. Add one category module at a time using the same canonical contract.
5. Launch consented research pilots for the first decision categories.
6. Backtest on held-out studies and expose scope-specific uncertainty.
7. Only then expand supported categories or countries.

## References
- BBS Population & Housing Census 2022 portal: https://bbs.portal.gov.bd/pages/static-pages/6922e073933eb65569e27220
- BBS HIES 2022: https://bbs.gov.bd/site/page/648dd9f5-067b-4bcc-ba38-45bfb9b12394/Income%2C-Expenditure-%26-Poverty
- BBS Labour Force Survey 2024: https://bbs.gov.bd/pages/static-pages/6922ddd1935eb65569e166e7
- Bangladesh Bank Payment Systems Report 2025: https://www.bb.org.bd/pub/annual/psdreport/paymentreport_dec2025.pdf
- Bangladesh Personal Data Protection Act 2026: https://bdlaws.minlaw.gov.bd/act-details-1692.html?lang=en
