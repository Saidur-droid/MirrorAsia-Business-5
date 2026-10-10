# Cloudflare Pages + Neon deployment and recovery
## Deployment mode
This branch contains a separate esbuild-powered static frontend for Cloudflare Pages and a
Pages Function for /api/simulate. Existing Next.js routes and main branch remain intact.
The Pages simulation endpoint is intentionally preview-only and cannot call a paid LLM.
No Neon tables are read or written by the demo, and there are zero claimed human respondents.
## Database
Do not fabricate a database connection or expose DATABASE_URL in browser code.
Create migration files and test on an isolated Neon branch before modifying production.
A dedicated Neon project ID must be verified before attaching credentials or writing SQL.
## Backup policy
Neon point-in-time restore is not equivalent to an independent encrypted offsite backup.
Use pg_dump over direct TLS connection, encrypt BEFORE upload with an independently retained
encryption key, upload to a private storage destination, and test restoration in an isolated DB.
Use retention, failure alerts, and two separate storage providers if continuity is critical.
No automatic backup should be claimed until scheduled jobs, object verification, and restore
tests complete. Never commit data dumps, connection URLs, encryption keys or tokens.
## Validation
npm ci; npm test; npm run typecheck; npm run build; npm run build:pages
Validate live /, /api/health, /api/simulate, negative inputs and browser UX.
