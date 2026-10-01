# Product & Calibration Architecture

## Core architecture

Real panel data  
→ Population schema  
→ synthetic agents  
→ scenario execution  
→ aggregate outputs  
→ benchmark comparison  
→ calibration update  
→ versioned population.

## Population schema

Potential dimensions:
- geography,
- age,
- gender,
- household,
- income,
- occupation,
- education,
- language,
- media usage,
- shopping channel,
- brand/category behavior,
- decision influences,
- price sensitivity,
- family dynamics,
- digital-payment behavior,
- cultural/seasonal context.

## Synthetic twins

A twin is not a literal copy of one individual.

It is a privacy-preserving synthetic representation generated from distributions/patterns.

Avoid preserving identifiable raw identity inside the simulation layer.

## Scenario types

Initial:
- concept test,
- price test,
- package test,
- message/ad test,
- promotion test,
- flavor/variant preference.

Later:
- market entry,
- feature prioritization,
- brand positioning,
- service proposition,
- campaign reaction.

## Calibration loop

1. simulate,
2. select benchmark case,
3. collect human sample,
4. compare ranking and magnitude,
5. identify segment bias,
6. adjust weighting/model/configuration,
7. version population,
8. re-run benchmark.

## Confidence tiers

### High
Strong recent benchmarks for similar population/category/task.

### Experimental
Partial benchmark coverage.

### Human validation recommended
Sparse/weak evidence.

## Population refresh

Version populations:
- BD-2027-Q1,
- BD-2027-Q2, etc.

Refresh inputs:
- new surveys,
- interviews,
- panel signals,
- category changes,
- price/inflation context,
- media/channel shifts,
- seasonality.

## MirrorScore

See docs/09-METRICS-AND-MIRRORSCORE.md.

## Human Check

One-click request:
- 100,
- 300,
- 500+ respondents,
depending on study design.

The real sample is not just a customer deliverable.

It improves future calibration.

## What not to build first

- political prediction,
- individual-level persuasion,
- credit/insurance profiling,
- health diagnosis,
- every consumer category,
- every country,
- huge avatar UI.

Start with trustworthy aggregate market research.
