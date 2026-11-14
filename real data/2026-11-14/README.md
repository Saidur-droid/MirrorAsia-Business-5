# MirrorAsia / real data — official aggregate research snapshot (2026-11-14)

This folder holds **published aggregate government research**, NOT individual personal information, purchased panel data, observed buying patterns, or evidence that the simulator predicts real market demand.

## Files
- `four_city_corporation_population_bbs_2022_final.csv` — DNCC, DSCC, CCC, SCC final Census population counts.
- `chattogram_41_wards_bbs_phc2022_P18.csv` — 41 2022 wards; households, population, male/female, average household size, literacy.
- `sylhet_27_wards_bbs_phc2022_P18.csv` — 27 historical 2022 wards, NOT current 42-ward mapping.
- `hies_2022_division_household_context.csv` — BBS 2022 division-level monthly income and consumption only.
- `research_source_registry.csv` — extracted versus candidate datasets, rights gates and canonical URLs.
- `quality_checks.json` — arithmetic checks, mismatches and missing data.
- `SCIENTIFIC_POPULATION_MASTER_PLAN.md` — canonical research and simulation architecture.
- `LEGAL_AND_DATA_GOVERNANCE.md` — Bangladesh privacy-by-design baseline, legal review needed.

## Quality and scope
- Four inclusive 2022 city-corporation totals sum to **14,059,132**. This is NOT a 2026 estimate.
- Chattogram P18 male+female = **3,230,262** vs inclusive final **3,230,507** (difference 245). P18 ward households add to **823,242** vs printed city figure **822,882** (difference 360). Do not silently reconcile.
- Sylhet P18 27-ward male+female = **532,748** vs inclusive final **532,839** (difference 91). Historical 27 wards cannot be used as the current 42 wards without boundary crosswalk.
- HIES division means are NOT city-specific or ward-specific income estimates.
- Missing DNCC/DSCC ward tables, MICS microdata, WorldPop raster, official ward polygons and ALL observed purchase behaviours remain **NOT INGESTED**.
- Manually transcribed aggregate tables need original official PDF spot-check and license/terms review before commercial production ingestion.
- No person-level respondent data here. No MirrorScore or measured synthetic accuracy.

Never combine these structural demographics with fictional behavioral propensity as if observational ground truth.
