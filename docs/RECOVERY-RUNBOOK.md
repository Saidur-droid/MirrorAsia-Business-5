# MirrorAsia disaster recovery runbook
Status: NOT ACTIVATED. Do not claim backups exist until first encrypted dump
and isolated restoration have been verified.

## Prerequisites
1. Confirm target Neon project ID and branch/database identity. Don't touch other projects.
2. Use only Free Tier quotas. Confirm Cloudflare R2 enabled without an unexpected paid plan.
3. Create private R2 bucket and restricted write-only backup credentials.
4. Generate age x25519 recipient (public key) and private identity OFFLINE. Store private
   identity independently in at least two secure locations; never in GitHub or database.
5. Add repository secrets for direct Neon connection, age public recipient, R2 endpoint,
   bucket, and key pair. Enable GitHub Actions variable MIRRORASIA_BACKUPS_ENABLED=true
   only after one successful manual backup and restore drill.

## Verification (independent test environment only)
- Fetch encrypted object from the private bucket with privileged recovery credentials.
- Decrypt with age -d -i offline-identity.txt -o restore.pgcustom backup.age
- Validate archive using pg_restore -l restore.pgcustom
- Restore with pg_restore --clean --if-exists only into a NEW isolated, empty test
  database, never production or a shared database.
- Compare per-table counts and important invariants, then mark the restore drill complete.
- Record createdAt, SHA256, destination, restore result, and review date.
- Test restoration at least monthly, and after migration changes.

## Failure modes
GitHub scheduler is best-effort, not guaranteed every day. Send failure alerts to
an actively monitored channel before depending on automation. R2 backup storage
is one offsite copy, not an absolute zero-data-loss guarantee. Use more than one
independent copy and restore rehearsals for real customer data.

## Data loss limits
Recovery point objective with daily backups can be up to 24+ hours of writes.
Continuous point-in-time recovery depends on Neon's paid/free retention window.
Never promise "no future data loss" on free infrastructure.
