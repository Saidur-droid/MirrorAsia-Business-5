# MirrorAsia encrypted backup and recovery runbook
Status: CODE PREPARED, NOT ACTIVE, NOT RESTORE-VERIFIED (2026-10-08).

## Current architecture
- Primary: Neon project muddy-forest-80473779, branch production, PostgreSQL 18, four MirrorAsia tables.
- Retention of Neon branch history is six hours at time of inspection; not a substitute for backups.
- Free-only fallback: GitHub Actions workflow neon-backup.yml, with encrypted GitHub Actions artifacts.
- The backup must NEVER upload unencrypted PostgreSQL dumps.
- Artifacts expire after 14 days and are stored on GitHub. Not an independent long-term backup provider.
- GitHub Actions scheduling is best effort and may miss runs; this does not guarantee zero data loss.

## One-time owner setup, not completed
1. On a trusted local device generate age identity with `age-keygen -o mirrorasia-recovery-identity.txt`.
2. Save the **private identity** encrypted/offline in TWO independent owner-controlled places.
   NEVER paste the private identity into ChatGPT, logs, GitHub or Neon.
3. Copy just its age1... PUBLIC recipient string.
4. Set repository Actions secret MIRRORASIA_BACKUP_AGE_RECIPIENT to public recipient.
5. Set repository Actions secret NEON_DIRECT_DATABASE_URL to the direct (non-pooler)
   connection string using a narrowly scoped read role, not an admin/owner role.
   A role created with the Neon API on 2026-10-08 unexpectedly inherited neon_superuser:
   NEVER use mirrorasia_worker_app as a least-privileged application or backup user.
6. Once credentials and secure identity custody are confirmed, set
   repository Actions variable MIRRORASIA_BACKUPS_ENABLED=true, run workflow manually
   and verify encrypted artifact existence. Then review automatic daily runs.
7. Perform a decryption + `pg_restore --list` check, and a FULL restoration into a fresh,
   isolated Neon test database. Never point restoration at production.

## Restore drill
Download the latest backup artifact while it is still retained. Verify encrypted file
hash and decrypt using the separately retained private key:
`age -d -i mirrorasia-recovery-identity.txt -o neon.pgcustom neon.pgcustom.age`
Check archive listing with PostgreSQL 18 `pg_restore -l neon.pgcustom`.
Restore to an empty isolated DB using explicit connection parameters and verify schema,
row counts, foreign keys, and application queries. Store audit record only after passing.
Do not share or upload plaintext dumps to cloud artifacts.

## Current blockers
- Backup private key custody and GitHub Actions secrets are not configured.
- No completed backup artifact or isolated restore drill exists.
- Cloudflare R2 requires a billing-capable subscription, not approved under free-only/no-billing.
- Hyperdrive database credential cannot use Neon-created role inheriting neon_superuser.
- GitHub Actions artifact expiry means additional independent offsite storage is required
  for robust, long-term business recovery.

Never claim backup or recovery completed without end-to-end verification.

## Verified platform limitations (2026-10-08)
- Neon free project rejects native automatic snapshot schedule: HTTP 404 `backup schedule creation is not enabled for this project`. No snapshot schedule has been activated.
- A separate SQL-created `mirrorasia_db_reader` role exists as NOLOGIN/NOCREATEDB/NOCREATEROLE/NOINHERIT. This is **not** a usable Cloudflare credential; login credentials and a securely deployed Hyperdrive binding are not yet configured. Do not mistake this for completed Cloudflare integration.
- Production migration is already applied; never reapply just to fix backup infrastructure.
- Verified backups: 0. Verified isolated restore drills: 0. GitHub encrypted artifact workflow remains disabled until recovery key and Actions secrets exist.
