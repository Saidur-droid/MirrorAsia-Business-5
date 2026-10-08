# MirrorAsia — free-only deployment and data-safety decision

Decision date: 2026-10-08
Status: Architecture policy (not a claim that these services are already deployed)

## Non-negotiable constraints
- Use free tiers only. Do not enable billing, add paid add-ons, or deploy metered paid resources without the user's explicit approval.
- Never use a Render **Free PostgreSQL** database for durable user or respondent data: it expires after a short period and risks losing data.
- Do not delete, overwrite, or reset any existing Ledgerly or MirrorAsia Render resources, databases, or user data. Confirm and back up first.
- Protect consented respondent data, authentication credentials, and secrets; never commit raw exports, secrets, or private datasets to a public GitHub repository.

## Preferred architecture
1. Frontend: Cloudflare Pages free (project .pages.dev domain, no custom domain purchase required).
2. API: Cloudflare Workers free **only if the checked code/runtime is compatible**; otherwise evaluate a free alternative for the existing backend, with documented cold-start, quota and portability trade-offs. Render Free Web Service may be acceptable for stateless API, but **not** Render Free PostgreSQL.
3. Persistent relational database: Neon PostgreSQL free. The database connection must be an environment secret, never source code. Provider quotas/policies can change.
4. Source control: GitHub repo and GitHub Actions free quota; use an independent protected backup destination and test restores.
5. AI: no promise of free unlimited model training/inference. Use free usage only; report limits and get approval before enabling anything chargeable.

## Safety and reliability gates before a live launch
- Inspect the actual repository to identify frontend/backend framework and deployed endpoints; README-only does not prove the code is deployment-ready.
- Set up safe migrations and a staging smoke test for registration, login, data ingest, simulation, model results and export.
- Run scheduled **encrypted** pg_dump backups to independent storage; use provider-independent formats, sensible retention, and regular restore tests. Do not consider backups configured until a restore is verified.
- Verify that no database expiration timer, automatic deletion policy or unexpected billing configuration threatens persistent data.
- Make the deployment repeatable via repo configuration, document service URLs and environment variable names but not secret values.
- Stay within free-tier quotas; uptime is not guaranteed by free plans.

## Integration prerequisites
- GitHub and Neon ChatGPT app access are already available in October 2026; reverify connection before any action.
- Cloudflare account (Pages and possibly Workers) is needed for the preferred deployment. If no direct ChatGPT Cloudflare connector exists, authorize GitHub-to-Cloudflare integration in Cloudflare once, and configure secrets via Cloudflare's secure dashboard.
- A free independent backup destination/account will be needed; pick it only after evaluating export size, privacy and retention needs.

This note is a durable project decision for future work. It does not itself create any service or guarantee that a future chat automatically loads the file.
