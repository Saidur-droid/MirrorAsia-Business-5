# MirrorAsia Operating Charter
**Version:** 1.0 · **Adopted:** 2026-11-07 · **Internal demo freeze target:** 2026-11-12

This charter is the operating rule for all future MirrorAsia product, research, engineering, business, and competition work. It supersedes ad-hoc feature selection. Every substantial change must map to a measurable user problem, a judging criterion, a test, and an evidence artifact.

## 1. North star

> **MirrorAsia is a Bangladesh-first, product-agnostic population intelligence platform that helps organisations test decisions against a structured model of the people affected, measures where those simulations agree or disagree with real-world evidence, and improves only when new evidence justifies it.**

We are not building a beverage-only app, a generic persona generator, or a ChatGPT wrapper.

The long-term product covers consumer products and services across categories: food and beverage, grocery, personal care, household goods, appliances, electronics, fashion, mobility, telecom, digital services, entertainment, travel, education products, and other lawful consumer decisions. FMCG beverage is the first demonstrable wedge because one bounded use case is easier to test rigorously. It is not the product boundary.

### What “Bangladesh-first” means
- A reusable national reference layer, not a Dhaka-only hand-authored segment list.
- Geography and household context sourced from official aggregate statistics where lawful and available.
- Category-specific behaviour evidence collected separately; census data is not purchase behaviour.
- Bangla, Banglish, and English inputs and research instruments.
- Explicit rural/urban, division/district, age-band, household and socioeconomic coverage where sources support it.
- Each observation carries source, reference period, geography, evidence type, rights/terms status, and freshness.
- No invented income, purchase, preference, or behavioural distributions.

### What “all products” means
One shared population and evaluation platform plus versioned category modules. Each module defines the decision, product attributes, relevant outcomes, price/usage context, evidence requirements, and evaluation metric. We do not claim all categories are validated because the platform is category-agnostic. A category is “supported” only after its own human/observed benchmark exists.

## 2. Product architecture — the reusable core

```text
Public aggregate sources + consented research + partner-authorised aggregate data
                                 |
                    Source / rights / freshness registry
                                 |
            Bangladesh reference population (versioned strata)
                                 |
          Category modules (food, retail, personal care, tech, etc.)
                                 |
       Scenario: product / price / pack / message / context / segment
                                 |
        Simulation & optional LLM interpretation (separate provenance)
                                 |
              Predictions + uncertainty + benchmark lookup
                                 |
       Held-out human/observed outcome evaluation (by exact scope)
                                 |
       Confidence gate: unvalidated / experimental / provisional / calibrated
                                 |
              Human Check + evidence refresh + audit trail
```

**Separation rules**
1. Public aggregate statistics describe population structure; they do not prove what a person will buy.
2. A language model may interpret concepts, normalize Bangla/Banglish, or explain scenarios. It must not manufacture respondent records or ground-truth labels.
3. Synthetic outputs, AI critiques, real survey responses, partner observations, and public statistics remain separately typed and separately counted.
4. Training/tuning data and held-out evaluation data must never overlap.
5. No MirrorScore is displayed until a preregistered, scope-matched evaluation passes the confidence gate.

## 3. Competitor learning — copy the discipline, not the IP

### Simile (primary reference)
Publicly describes populations grounded in real people, continuous research/data refresh, weekly validation, distributional and effect-size evaluation, confidence modelling, and customer-authorised data. MirrorAsia's lesson: build a human evidence loop and confidence layer before scaling the number of synthetic agents.

### Aaru (secondary reference)
Publicly describes population-level scenario testing across products, price, messages and strategy, and publishes benchmark methodology/metrics. MirrorAsia's lesson: sell decision workflows and measurable evaluation, not attractive personas.

We may learn from public product principles. We must not copy proprietary code, UI, prompts, datasets, methods, or brand assets. We must independently document our own methodology and benchmark.

## 4. Official competition rubric — 100 points

| Criterion | Weight | MirrorAsia proof required before claiming readiness |
|---|---:|---|
| Innovation | 20 | Bangladesh reference population + category modules + human-calibrated feedback loop; clear distinction from generic AI personas |
| Technical Execution | 20 | Working end-to-end workflow, repeatable runs, versioned sources/population, AI provenance, tests, error handling, security and deployment |
| Business Model + Global Readiness | 20 | Defined buyer/problem, customer discovery evidence, pilot offer, pricing hypotheses, repeat-use path, country-pack expansion logic |
| Real-World Impact + Ethical AI | 20 | Measured time/cost workflow benefit, consent, minimisation, bias/coverage checks, uncertainty, withdrawal/retention and no fabricated claims |
| Scalability + NRB Collaboration | 10 | Modular population/category packs, multi-tenant/API path, documented real collaborator role/contribution (not a name-only claim) |
| Presentation | 10 | One-page summary, working 180-second demo, architecture, truthful evidence and clear next milestone |

**Scoring discipline:** no points are awarded internally for a feature merely existing in code. Each claim needs a test, a live artifact or a documented evidence source. Use the official current rules if the organizer publishes a newer rubric.

## 5. Release gates — definition of done

A milestone is complete only when all relevant gates pass:

- **Product:** a user can complete the whole workflow, not just see a button.
- **Data:** every non-synthetic value has provenance, period, scope, rights/terms review, and freshness.
- **Research:** consent and eligibility are clear; actual responses are genuine; small cells are suppressed; opt-out/withdrawal and retention are defined.
- **Model:** deterministic simulation and LLM output are separate; model/version/prompt and failure states are recorded.
- **Evaluation:** comparison uses held-out, scope-matched evidence; sample size and limitations are visible; no train/test leakage.
- **Business:** buyer, decision, current alternative, willingness-to-pilot evidence, and pricing hypothesis are documented.
- **Security:** least privilege, request limits, secret hygiene, abuse protection, and recovery path are tested.
- **Quality:** tests, typecheck, build, staging smoke and production smoke pass.
- **Release:** code, decision log, evidence and rollback version are stored in GitHub.

## 6. Product prioritisation rule

Priority score = user pain × strategic differentiation × evidence leverage × deadline relevance, divided by delivery risk. This is a prioritisation heuristic, not a scientific metric.

Build in this order:
1. Bangladesh population data foundation and rights/provenance registry.
2. Consent-first research collection and secure aggregate evidence.
3. Category-agnostic scenario schema and population strata.
4. Held-out evaluation and confidence gates.
5. Customer discovery, design partners and pilot workflow.
6. Competition narrative, demo and submission assets.

Do not prioritise 3D avatars, more synthetic-agent volume, multiple countries, or unrelated feature breadth ahead of evidence quality.

## 7. Operating cadence

Every work chunk begins with:
- target judging criterion(s),
- user/business problem,
- acceptance criteria,
- affected architecture and data,
- privacy/security risks,
- test plan,
- expected evidence artifact.

Every release ends with:
- commit/PR,
- CI and smoke-test links,
- live URL and version,
- measured result,
- known gaps,
- next decision.

**No more random micro-patches.** Prefer complete vertical slices. Do not claim a milestone is complete until its acceptance criteria pass.
