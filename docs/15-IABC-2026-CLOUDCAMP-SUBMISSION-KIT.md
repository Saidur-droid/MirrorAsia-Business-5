# MirrorAsia — CloudCamp IABC 2026 Submission Kit

Updated: 24 October 2026 | Competition: International AI Builders Congress 2026 | Track: Idea to Unicorn

## IMPORTANT: Evidence and truth status

This repository currently contains planning, research and architecture documents rather than a runnable application. The material below is **submission copy to review and revise**, not evidence that a prototype, calibrated respondent panel, market benchmarks, live service, or paid customers exist. NEVER mark planned functionality as deployed. The proposed synthetic simulation is unvalidated until tested against consented human research.

**Video is omitted at the user's request, but the official submission policy and CloudCamp screenshot mark the 3-minute YouTube video REQUIRED. The final submission may be rejected or blocked without it.**

Submission rule: https://cloudcampbd.com/events/ai-builders-congress/policies/submission
AI provenance: https://cloudcampbd.com/events/ai-builders-congress/policies/ai-usage
Repository: https://github.com/Saidur-droid/MirrorAsia-Business-5 (PRIVATE; judges cannot necessarily access it)

## Project identity and classification

- **Track:** Idea to Unicorn — team-built AI product.
- **Project Name:** MirrorAsia
- **Full title:** MirrorAsia — Human-Calibrated AI Population Intelligence for Emerging Markets
- **Tagline:** Test in the virtual market before spending in the real market — and see how trustworthy each prediction is.
- **Proposed Domain:** CommerceSphere AI (verify the exact option in the CloudCamp dropdown).
- **Proposed Challenge:** Self-defined consumer/market intelligence challenge, if the portal explicitly allows it. Otherwise select the closest matching official challenge, without inventing an option.
- **Initial market:** Bangladesh.
- **Initial buyer:** FMCG brand managers, innovation teams, consumer-insights specialists, and research agencies.
- **Initial use case:** Beverage price-and-packaging concept screening.
- **Commercial strategy:** Managed research/simulation studies → enterprise workspace subscription → population API and optional human validation.

## Copy-ready answer 1 — Project Name

MirrorAsia

## Copy-ready answer 2 — Elevator Pitch

MirrorAsia is building an AI-native platform to help FMCG brands compare product concepts, pricing, packaging, and messaging using local synthetic consumer segments, while making uncertainty visible and using real-human research to validate and improve future predictions.

Short alternative for character-limited forms:

AI-powered consumer concept screening for emerging markets, designed to combine synthetic simulations with human validation and transparent confidence.

## Copy-ready answer 3 — Public Summary

MirrorAsia is an early-stage AI-native consumer research product designed for emerging markets, starting with Bangladesh. FMCG brands frequently need to compare product concepts, packaging, prices, and marketing messages across different consumer segments, but repeating conventional studies for every option can be costly and slow.

MirrorAsia proposes a human-calibrated population simulation workflow. A brand submits a scenario, selects a target consumer segment, and compares concept alternatives using structured AI-generated responses and segment-level aggregation. The long-term architecture incorporates consented respondent research, local demographic and behavioral context, benchmarking against real human outcomes, population versioning, and continuous recalibration.

A central product principle is to communicate uncertainty rather than present synthetic predictions as facts. The planned Confidence Lab will distinguish benchmark-supported findings from experimental or insufficiently validated outputs, while the Human Check workflow will route important decisions to real respondents. The proposed first application is FMCG beverage price-and-packaging screening in Bangladesh, with Bangla/Banglish and local purchasing context. The shared platform is designed for future country-specific population layers rather than assuming one model works identically across markets.

**Stage note:** Product architecture and business documentation have been prepared; implementation, calibration and public demo must be verified separately before claiming them as operational.

## Copy-ready answer 4 — Problem Statement

Consumer goods companies make repeated decisions about product concepts, prices, packaging, advertising messages, and target audiences. Traditional surveys, interviews, and focus groups provide essential human evidence, but commissioning a full study for every early-stage combination can be time-consuming and costly. As a result, teams may screen fewer ideas than they would like, or make initial choices using intuition rather than structured evidence.

Generic LLM-generated personas are not a sufficient substitute. They can sound plausible while failing to represent actual local spending power, language, household roles, regional variation, purchasing channels, and category-specific preferences. Without independent human benchmarks, an AI-generated 'consumer prediction' can create false certainty.

This is particularly relevant to emerging markets, where local language, socio-economic segmentation, and behavioral datasets may be underrepresented in general-purpose models. Buyers need a faster way to explore many hypotheses before committing to field research, but they also need to know when an AI signal is weak, which population it describes, and what additional real-human validation is necessary.

MirrorAsia addresses the gap between rapid AI-assisted screening and credible human-grounded market research. It is designed to complement, not replace, real respondents.

## Copy-ready answer 5 — Solution Description

MirrorAsia is designed as a repeatable population-intelligence workflow for pre-screening consumer-market decisions.

1. **Scenario Studio:** An enterprise user submits a product concept and alternative prices, packaging designs, or messages, with the target audience and research question.
2. **Population Selector:** The system chooses a versioned, market-specific segment defined by relevant geography, language, demographic and consumer-behavior attributes. Only lawful and appropriately licensed/consented source data may be used.
3. **AI Simulation Layer:** A model evaluates clearly structured concept scenarios for synthetic consumer representations. Outputs follow a validated schema, record model and prompt versions, and are aggregated by segment rather than exposing individual respondent identities.
4. **Segment Explorer:** The user compares directional preferences and qualitative reasons across segments and alternatives.
5. **Confidence Lab:** Where genuine matching human benchmarks exist, the system will report benchmark scope, observed errors, sample size, evidence age and uncertainty. Without such evidence, it will label results experimental/unvalidated and recommend human verification, not invent confidence percentages.
6. **Human Check and Recalibration:** A proposed validation workflow compares selected synthetic outputs with consented real-human research, measures failure by segment, and updates future population versions.

The first product slice focuses on Bangladesh FMCG beverage packaging and price screening. Later commercial offerings may include managed simulation studies, enterprise self-service workspaces, licensed population APIs, and optional research-panel verification. The same core engine could extend to Indonesia and Vietnam only after separate local data acquisition and calibration.

This is the proposed design; deployable features and validated performance must be demonstrated before describing them as complete.

## Copy-ready answer 6 — Data & AI Provenance

**Current evidence:** The project has original planning, positioning, architecture and competition documents in its GitHub repository. This submission's prose and planning have been assisted by ChatGPT and must be reviewed and approved by the team. The repository does not yet demonstrate live model inference, an acquired Bangladesh respondent panel, measured predictive accuracy, or a completed human-validation study.

**Planned prototype data:** Use a transparent, non-personal synthetic DEMO fixture for software testing. Clearly label it illustrative, not a representative Bangladesh survey. Public aggregate statistics from Bangladesh Bureau of Statistics Population and Housing Census 2022 and Household Income and Expenditure Survey 2022 may be used as contextual references after verifying licensing, variables, publication age, and suitability. Public statistics alone cannot validate synthetic consumer purchasing predictions.

**Planned real-human data:** Obtain purpose-specific consent from research participants or partner with a lawful research-panel provider. Minimize or pseudonymize personal information, secure storage, control access, allow deletion/withdrawal where applicable, and document collection date, sampling, limitations and legal permissions. Do not upload identifiable respondents to a third-party LLM without legal basis and suitable contractual safeguards.

**Models and processing:** The inference provider/model/version, embedding or retrieval systems, prompts, runtime tools, evaluation dataset and training/calibration choices are TO BE FILLED FROM THE ACTUAL IMPLEMENTATION. Do not mark RAG, agents, MCP or fine-tuning as used if they are not used.

**External work:** List actual contributors, mentors, advisors, source licenses and use of coding assistants honestly. MirrorAsia is independently conceived and must not claim ownership of Simile/Aaru technology or data.

**Evaluation:** Synthetic model responses are hypotheses until compared with held-out consented human results. Report rank agreement, preference error and confidence calibration only when measured on clearly described, non-leaking benchmark samples.

## Copy-ready answer 7 — Tooling & IDE

**Verified current project tooling:** GitHub for version control and project documentation; Markdown for planning and architecture. ChatGPT has assisted with submission drafting and technical planning in the current workflow.

**Implementation proposal (NOT YET VERIFIED AS USED):** VS Code or another team-selected editor; TypeScript/React (Vite) for the web interface; Cloudflare Pages for the frontend; TypeScript Cloudflare Workers or another verified compatible API runtime; Neon PostgreSQL for persistent application metadata; a selected LLM inference provider; GitHub Actions for validation and deployment checks.

Before final submission replace the proposed tools with the exact real tools, model names/versions, IDEs, frameworks, libraries, deployment URLs and MCP servers used. State 'none' for unused categories. No paid AI services or billing should be enabled without owner approval.

## Copy-ready answer 8 — YouTube Video

**INTENTIONALLY NOT PREPARED. THIS IS A REQUIRED CLOUDCAMP FIELD.**
Do not fabricate a link. Add a real accessible 3-minute concept/prototype walkthrough if the organizer requires it.

## Copy-ready answer 9 — Demo / Live Links

- Live demonstration: **[ADD VERIFIED PUBLIC OR REVIEWER-ACCESSIBLE HTTPS URL AFTER DEPLOYMENT]**
- GitHub source/research repository: https://github.com/Saidur-droid/MirrorAsia-Business-5
- Important: source repository is **PRIVATE**. A URL alone does not give the judges access. Provide the approved access method or a public deployment; do not expose proprietary data or secrets.
- Technical system walkthrough: **[ADD A VERIFIED WORKING LINK ONLY IF CREATED]**
- Screenshots: **[ADD ONLY IMAGES OF THE REAL IMPLEMENTED PROTOTYPE]**

Do not paste a placeholder as an active URL or claim demo readiness before checking the link in a logged-out browser.

## Suggested Domain & Challenge text (only if custom challenge entry exists)

**Domain:** CommerceSphere AI

**Challenge title:** Trusted AI Consumer Concept Screening for Emerging Markets

**Challenge description:** How can emerging-market businesses explore multiple pricing, packaging and product concepts using AI, while avoiding misleading predictions by exposing uncertainty and validating promising results against real consumers?

## Localisation and inclusion

- Bangladesh-focused country pack; Bangla/Banglish research questions and labels.
- Mobile-friendly and low-bandwidth access.
- Region and purchasing-power variation explained, not stereotyping.
- Separate calibration and source licensing for each expansion country.
- No claim that currently available public aggregate data is sufficient for accurate consumer prediction.

## Business model and market case

- **Target buyer:** Consumer-insights team, FMCG innovation manager, research agency and D2C brand.
- **Initial offer:** Managed concept pre-screening with a transparent uncertainty report and optional real-human study.
- **Customer value hypothesis:** Explore more concept variants before deciding which deserve expensive respondent research.
- **Monetisation hypothesis:** Per-study/project fee initially; later enterprise SaaS subscriptions, API usage and human-validation add-ons.
- **Differentiation hypothesis:** Segment-specific local data + independent human benchmarking + error history + transparent confidence, rather than one-off generic LLM personas.
- **Long-term expansion:** Bangladesh proof → Indonesia → Vietnam; Singapore as possible regional sales base; later Gulf subject to market-specific validation.
- **Traction:** Not publicly verified; state 'pre-revenue' or 'no verified commercial traction yet' only if confirmed by founder. Do not invent customers, panel size, revenue, pricing, accuracy, study counts or LOIs.

## Team submission template — complete with genuine participant details

- Team lead: [ACTUAL REGISTERED NAME] — product vision, domain research, customer discovery, submission management.
- Member 2: [ACTUAL REGISTERED NAME] — AI/backend/data workflows, evaluation, provenance.
- Member 3: [ACTUAL REGISTERED NAME] — frontend/UX, testing, localization, documentation.
- Team size: 3 after all members ACCEPT invites and appear in CloudCamp.
- Female and NRB members: record genuine eligibility facts only; do not claim a member or advisor merely to gain points.
- External advisors: disclose actual role, dates and work; do not register them as team members unless genuinely eligible.

## Public presentation safety check

Always distinguish:
- **Built:** repository content or deployed functions you can demonstrate today.
- **Prototype:** working limited feature with clearly labeled demo data.
- **Planned:** architecture, roadmap, panel recruitment, validation study, regional expansion.
- **Measured:** a metric with a real documented protocol, sample and result.

Never conflate any two of these stages.

## CloudCamp on-screen fill sequence

1. Sign in; go to International AI Builders Congress → Teams and confirm all THREE members have joined.
2. Go to Submissions → existing 'Untitled Project' draft (do not create unnecessary duplicate submissions).
3. In Story: paste Project Name, Elevator Pitch, Public Summary, Problem Statement, Solution Description. Choose an appropriate Domain and approved Challenge.
4. In Proof: fill only verified public/reviewer-accessible demo links; leave the mandatory YouTube video pending until created.
5. In AI-Native Build: enter real AI model/orchestration details after implementation; the architecture document is planning evidence only.
6. In Data Lifecycle: disclose actual sources and permissions, capture/storage/evaluation policies. If no respondent dataset exists, say so.
7. In Prompt Library: include genuinely used prompts from the implemented prototype. Proposed prompts may be kept as plans but should not be represented as production-used.
8. In Team: confirm roles, correct identities and any declared external involvement.
9. Use 'Save Draft' frequently. Reopen to confirm persistence and resolve missing fields.
10. Check all links from a signed-out browser and test the prototype.
11. Add the required video later, reread policies, submit before the deadline shown in the portal, and verify submitted status.

## Current risks and blockers

- Working implementation has NOT been found in the repository.
- No verified public demo URL.
- Video deliberately omitted but mandatory for compliant final submission.
- No verified real-human benchmarks/panel data.
- Actual model, prompt and implementation stack not verified.
- Screenshot showed 1 team member, while founder said 2 recruited; check successful joins before the third invitation.
- Domain/Challenge dropdown options require checking inside the logged-in submission form.
- Deadline in screenshot: 31 October 2026, 5:59 PM UTC = 11:59 PM Asia/Dhaka, subject to portal updates.

## Official references

- https://cloudcampbd.com/events/ai-builders-congress/policies/submission
- https://cloudcampbd.com/events/ai-builders-congress/policies/ai-usage
- https://cloudcampbd.com/events/ai-builders-congress/policies/team
- https://cloudcampbd.com/events/ai-builders-congress/policies/judging
- https://cloudcampbd.com/events/ai-builders-congress/policies/terms
- https://bbs.portal.gov.bd/pages/static-pages/6922e073933eb65569e27220
- https://bbs.portal.gov.bd/pages/static-pages/6922dc57933eb65569e0fd4c
