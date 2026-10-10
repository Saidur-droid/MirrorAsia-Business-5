# MirrorAsia: Complete Cloudflare + encrypted backup setup
Status: NOT YET LIVE. All credential operations below are intentionally owner-controlled.

## Confirmed facts
- Neon project: `muddy-forest-80473779`, database `neondb`, default production branch ID `br-raspy-sunset-b5577y3z`.
- `mirrorasia_db_reader` is a SQL-created role with SELECT only, no CREATEDB, CREATEROLE, superuser, or inherited memberships. It has LOGIN but NO PASSWORD. Never attach the privileged `mirrorasia_worker_app` role.
- Cloudflare account `fd15fb7e922cdac15c71586a770e517d` has a Worker but NO Hyperdrive config. The running public Worker is a simulation preview, not DB-backed.
- Native scheduled Neon snapshots are unavailable on this free project. The Neon-native manual restore drill passed, but **not** an encrypted offsite dump drill.
- R2 needs a billing-capable subscription, so it is excluded.

## 1. Database credential: safe owner-only setup
Use a trusted terminal with Neon CLI, after `neon login` and `neon link --project-id muddy-forest-80473779 --branch production -y`.
Run `neon connection-string` for a **direct** connection to `neondb`; do not paste its output into chat or a GitHub file. Open `psql` as the database owner.
Generate a long random unique secret in a password manager and execute a parameterized/safely quoted statement to set:
`ALTER ROLE mirrorasia_db_reader PASSWORD 'YOUR_NEW_RANDOM_PASSWORD';`
Verify the following must be true: SELECT granted; INSERT/UPDATE/DELETE denied; no superuser, CREATEDB or CREATEROLE; zero parent-role memberships.
Do not reuse the database owner credentials for production Worker traffic.

## 2. Cloudflare Hyperdrive (Free, without R2)
Run from a trusted terminal (never store password in shell history):
`npx wrangler hyperdrive create mirrorasia-neon-ro-production --connection-string="$NEON_READONLY_DATABASE_URL" --caching-disabled`
Set `NEON_READONLY_DATABASE_URL` privately to `postgresql://mirrorasia_db_reader:<password>@<Neon-direct-host>:5432/neondb?sslmode=require`.
Create a Worker Hyperdrive binding called `HYPERDRIVE` with the returned ID, and enable `nodejs_compat`.
**Important:** current `worker/entry.ts` does not query Postgres. Adding Hyperdrive to the dashboard alone is NOT a live integration. Implement an authenticated, read-only DB query first, then test live. Never introduce a public write endpoint without authentication/authorization.
Free Hyperdrive limits apply.

## 3. Free GitHub artifact backups
Existing workflow: `.github/workflows/neon-backup.yml`, currently disabled unless repo variable `MIRRORASIA_BACKUPS_ENABLED=true`.
On a trusted local machine run `age-keygen -o mirrorasia-recovery-identity.txt`; store this PRIVATE file independently offline in two secure places, outside of GitHub/Neon and this chat.
Only copy the PUBLIC `age1...` recipient to repository Actions secret `MIRRORASIA_BACKUP_AGE_RECIPIENT`.
Provision separate direct Neon READ-only URL for `NEON_DIRECT_DATABASE_URL` repository Actions secret. In GitHub Actions Variables set `MIRRORASIA_BACKUPS_ENABLED=true` **only after** both secrets have been configured and secure recovery key custody is confirmed.
Run the backup workflow manually; verify new encrypted artifact is uploaded and never plaintext.
Artifact retention is 14 days; GitHub is not an independent long-term backup provider.

## 4. Isolated restore verification
Download encrypted artifact from the workflow run onto trusted recovery machine. Decrypt with the private age identity file to a temporary local directory (mode 0700):
`age -d -i mirrorasia-recovery-identity.txt -o neon.pgcustom neon.pgcustom.age`
`pg_restore --list neon.pgcustom` using PostgreSQL 18. Restore into a NEW empty test database on an isolated non-production branch with direct connection and no automatic branch swap:
`pg_restore --dbname="$ISOLATED_EMPTY_TEST_DATABASE_URL" --no-owner --no-acl --exit-on-error neon.pgcustom`
Compare four table schemas and row counts with production. Then securely remove plaintext temp files. Never use `production` as the restore target.
Without a verified encrypted artifact + isolated restoration, keep backup status as **NOT ACTIVE / NOT RESTORE-VERIFIED**.

## Blocker and completion gate
This connector can inspect Neon and GitHub/Cloudflare resources but does not have authorized GitHub Actions secrets-writing, and secret-bearing SQL/Hyperdrive creation has been rejected by available tools. Do not circumvent these checks or place credentials in code. Setup requires an owner-controlled secure credential action. Contact or open GitHub Issue #7 for progress.
