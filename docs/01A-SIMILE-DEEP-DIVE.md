# Simile Deep Dive — Primary Operating Reference

Research snapshot: 2026-10-01.

This is the primary reference document for MirrorAsia. It separates:

- public facts about Simile,
- reasonable operating inferences from public evidence,
- MirrorAsia decisions inspired by that evidence.

Do not treat an inference as a confirmed Simile internal process.

---

# 1. What Simile is actually building

Simile describes itself as **The Simulation Company**.

Its public product thesis is broader than "synthetic survey respondents."

The company is building behavioral simulation infrastructure that lets organizations test what people, customers, employees or populations may do when something changes.

Examples publicly described by Simile include:

- product launches,
- customer experience changes,
- pricing/message/concept changes,
- market entry,
- policy changes,
- earnings-call rehearsal,
- litigation scenarios,
- customer journeys,
- eventually multi-agent market/system simulations.

The important pattern:

> Simile sells a decision-testing layer, not merely an AI research assistant.

---

# 2. How Simile says its populations are built

Simile's current homepage says every population starts with real people.

Its public description says it combines:

- large-scale studies it designs and runs,
- proprietary human-behavior datasets,
- observed behavior,
- interviews,
- surveys,
- experiments,
- customer-provided data where authorized.

Its September 2026 "What-If Machine" post gives additional examples of behavioral data:

- transactions,
- app usage,
- clickstreams,
- mobility,
- other signals of what people actually do,

combined with information that helps explain **why** they do it:

- surveys,
- interviews,
- experiments,
- beliefs,
- attitudes,
- motivations,
- constraints,
- habits,
- social influences.

This is important for MirrorAsia.

A synthetic population should not be created only from demographic prompts.

---

# 3. Validation is a product, not a side experiment

Simile publicly says validation comes first.

Its homepage says it validates against real humans weekly, across 7,000+ evaluations covering subpopulations and enterprise use cases.

It describes evaluating:

- distributional distance,
- effect-size comparisons,
- accuracy against observed behavior.

Simile also trains a confidence model that predicts how accurate a simulation is likely to be.

Its August 2026 confidence article explains the pattern:

1. define a population,
2. define a situation,
3. define possible actions,
4. simulate an action distribution,
5. compare with a real-human / real-behavior outcome,
6. estimate simulation confidence.

This is one of the strongest Simile ideas MirrorAsia should adopt.

---

# 4. Continuous refresh

Simile says its populations are continuously refreshed using new:

- behavioral data,
- macro data,
- pricing data,
- policy data.

Its homepage also says agents can consume media/news as the represented people would.

MirrorAsia should not blindly copy every mechanism, but should copy the principle:

> A population model becomes stale unless it is continuously refreshed.

For MirrorAsia this means:

- quarterly/monthly panel refresh,
- inflation/price context,
- media behavior,
- category shifts,
- Eid/Ramadan seasonality,
- urban/regional shifts,
- platform/channel shifts,
- customer outcome feedback.

---

# 5. Bring-your-own-data model

Simile explicitly offers customer data as an input.

Examples on its homepage include:

- loyalty data,
- balance histories,
- telemetry.

It says customer data is opt-in and customer-governed and can be used to train/customize a customer's model.

Public Itaú material also says Simile used Itaú's own customer archetypes to define a simulated population.

This indicates an important enterprise pattern:

**global/base behavioral model + customer-specific data + customer-specific population.**

MirrorAsia should copy the architecture, but adapt it:

**Bangladesh/SEA base population + client's customer/CRM/research data + client-specific calibrated population.**

---

# 6. Enterprise use cases and value proof

Public customers/partners include:

- CVS Health,
- Wealthfront,
- Deloitte,
- Gallup,
- Itaú,
- Suntory,
- Garnett Station Partners.

Publicly described outcomes/use cases include:

### Wealthfront
Simile's homepage publishes a customer quote saying simulated customers expanded qualitative research scope by 15x.

### Itaú
Simile reported that a research cycle that normally took five weeks was completed in four business days, and a two-week concept-exploration process was reduced to under three hours.

This was not positioned as "replace humans forever."

The workflow was earlier-stage simulation before formal validation.

### CVS Health
Simile describes a stepwise progression:

- validate individual agents,
- use simulations for known insights,
- expand to journeys over time,
- move toward interactions and multi-agent markets.

The important MirrorAsia lesson:

> Enter with a narrow research workflow, prove value, then expand into deeper decision infrastructure.

---

# 7. Product evolution — from static research to world simulation

Simile's public roadmap is structurally useful.

### Stage 1
Individual / population response.

### Stage 2
Customer journey over time.

### Stage 3
Interaction between people.

### Stage 4
Multi-agent systems with:
- customers,
- competitors,
- partners,
- policies,
- markets.

### Long-term mission
Simile publicly states a mission to simulate all eight billion people.

MirrorAsia should **not** adopt this mission literally at the start.

But the expansion pattern is useful:

**concept test → behavioral journey → competitor/customer interactions → market simulation.**

---

# 8. Simile funding timeline

## February 12, 2026 — Series A

Index Ventures announced it led Simile's **$100M Series A**.

Index's investment thesis emphasized:

- research pedigree,
- founding-team quality,
- demand from large enterprises across industries/geographies,
- belief that simulation could become foundational decision infrastructure.

This is a critical funding lesson:

> The large Series A was not justified by "AI personas." It was justified by world-class research + strong team + clear enterprise pull + huge platform ambition.

## July 30, 2026 — Series B

TechCrunch reported Simile raised **$200M Series B at a $2B valuation**, five months after the Series A.

Simile/Index described investors including:

- Greenoaks,
- Index Ventures,
- Hanabi,
- Bain Capital Ventures,
- A*,
- Factory,
- CVS Health Ventures,
- Definition.

Across the two publicly reported rounds, roughly **$300M** was announced.

## Growth reported around the Series B

Simile said that in the five months after launch it had:

- grown revenue 5x,
- run tens of millions of simulations for Fortune 100 enterprises,
- built a new foundation model for human behavior,
- built a confidence model,
- grown to a global team of 50+.

These growth figures are company-reported.

---

# 9. Why investors appear to have funded Simile

Public Index commentary points to four core reasons.

### 1. Founder / research authority
Joon Sung Park, Michael Bernstein and Percy Liang have deep Stanford research credentials in generative agents, social computing and foundation models.

### 2. Enterprise market pull
Index specifically said large companies across industries/geographies were expressing similar pain and demand.

### 3. Platform-scale ambition
Not one survey feature.

The thesis is foundational infrastructure for human decision simulation.

### 4. Early production evidence
By Series B, Index said the product was in production at scale with enterprise customers.

MirrorAsia should translate this into:

**local data authority + benchmark authority + paying enterprise pull + reusable platform.**

---

# 10. Simile GTM — what is public and what is inferred

Simile has not publicly published a complete sales playbook or pricing sheet.

So the following must be separated carefully.

## Public evidence

- strong enterprise customers appeared extremely early;
- customer-specific populations/data are supported;
- Simile publishes deep customer case studies;
- Simile sells business-critical decision use cases, not generic research automation;
- CVS Health Ventures participated in the Series B while CVS was also a customer;
- Gallup is positioned as a methodological/research partner;
- Itaú used the product inside an existing CX/product workflow.

## Reasonable inference from public evidence

Likely enterprise motion:

1. land with a high-value research / CX / product decision,
2. validate against known historical or parallel human research,
3. build trust with the customer's own data/archetypes,
4. prove time/scope advantage,
5. expand into more scenarios/workflows,
6. publish/earn a case study,
7. turn the relationship into strategic platform usage.

This is an **inference**, not a disclosed internal Simile sales SOP.

MirrorAsia should test this exact land-and-expand logic locally.

---

# 11. Enterprise sales — what MirrorAsia should learn

Do not sell:

> "We have 50,000 AI people."

Sell:

> "You currently test only three ideas because research is expensive. We let you explore 30, then validate the best three with humans."

The strongest value proposition is not lower survey cost alone.

It is:

- earlier decisions,
- more variants tested,
- faster iteration,
- cheaper failure,
- better use of expensive human research,
- decision confidence.

This matches the public Itaú/Simile workflow particularly well.

---

# 12. Hiring and organization lessons

Public Series B material says Simile grew to a global team of 50+ and was hiring:

- researchers,
- engineers,
- designers,
- operators.

Simile does not publicly disclose a full detailed org chart in the sources reviewed.

Do not invent one.

The strategic lesson is the multidisciplinary team shape:

### Research
Behavioral modeling, evaluation, calibration.

### Engineering
Data, model, simulation, infrastructure.

### Product/design
Turn complex simulations into usable decision workflows.

### Operations/business
Enterprise implementation, data programs, partnerships, sales.

MirrorAsia should use the same **functions**, but at a much smaller team size.

---

# 13. Expansion strategy lessons

Public Simile evidence shows expansion along multiple axes.

### Use-case expansion
Research/concept tests → customer journeys → policy/litigation/earnings calls → multi-agent markets.

### Customer expansion
Consumer brands + finance + healthcare + professional services + research.

### Data expansion
Generic/base populations + proprietary human datasets + customer-owned data.

### Model expansion
Population simulation + confidence prediction + larger behavioral foundation model.

### Geography/population expansion
Mission is global.

MirrorAsia should not copy all axes simultaneously.

Our order should be:

1. one category,
2. one country,
3. one trusted benchmark suite,
4. enterprise repeat use,
5. second country,
6. broader category/API.

---

# 14. What Simile does NOT publicly prove for us

Simile's success does **not** prove:

- Bangladesh buyers will pay our proposed price,
- our synthetic population will be accurate,
- our data collection will be sufficient,
- our local regulatory/privacy design is correct,
- FMCG is automatically the best first wedge,
- Indonesia is automatically the best second market,
- our unit economics will work.

Those remain MirrorAsia hypotheses.

---

# 15. Source anchors

## Simile primary
- Homepage / product / validation:
  https://www.simile.com/
- Series B:
  https://www.simile.com/blog/series-b
- Confidence system:
  https://www.simile.com/blog/confidence
- What-If Machine / data strategy:
  https://www.simile.com/blog/what-if-machine
- CVS Health case:
  https://www.simile.com/blog/simile-cvs-health
- Itaú case:
  https://www.simile.com/blog/itau-at-esomar
- The Simulation Company:
  https://www.simile.com/blog/the-simulation-company
- Participant privacy:
  https://www.simile.com/privacy

## Investor / external
- Index Series A:
  https://www.indexventures.com/perspectives/life-the-universe-and-simile-leading-similes-series-a/
- Index Series B:
  https://www.indexventures.com/perspectives/simulating-society-at-scale-our-investment-in-similes-200m-series-b/
- TechCrunch Series B:
  https://techcrunch.com/2026/07/30/synthetic-user-startup-simile-raises-200m-at-2b-valuation-5-months-after-100m-series-a/
