# MirrorAsia DB integration and backup verification checklist

- [x] Neon production schema migration applied and verified previously
- [x] Restricted read-only SQL role exists and has LOGIN flag
- [ ] Read-only role password provisioned securely and login tested
- [ ] Cloudflare Hyperdrive created with role credentials
- [ ] Worker binding deployed and authenticated database query tested live
- [x] Manual Neon snapshot created and restored to isolated branch (snapshot restore only)
- [ ] Age public recipient saved in GitHub Actions Secrets; private key kept offline by owner
- [ ] Neon read-only direct connection saved in GitHub Actions Secrets
- [ ] Scheduled encrypted GitHub artifact backup enabled with successful first run
- [ ] Encrypted artifact downloaded and decrypted locally, pg_restore to isolated DB succeeds
- [ ] Second independent long-term backup copy arranged (no-billing requirement upheld)

**Never mark the three outstanding user goals Done until their own end-to-end tests pass.**

## 2026-10-10 implementation update
- [x] Existing Cloudflare production Worker has `HYPERDRIVE` binding to `mirrorasia-neon-readonly` (confirmed with Cloudflare API).
- [x] Feature branch has PostgreSQL `pg` driver, protected read-only `/api/internal/db-check` route gated by `DB_DIAGNOSTICS_TOKEN`, and synchronized Wrangler Hyperdrive config.
- [x] GitHub dependency lockfile synchronized with npm and temporary synchronization workflows removed.
- [x] GitHub application CI verified success with new Worker bundle and TypeScript.
- [ ] Public Worker deployment **not performed**: Cloudflare staging upload of new Node-compatible bundle failed validation (`Unexpected token 'export'`). Existing live Worker remained unchanged; no staging Worker was created.
- [ ] Compatibility flags for running Cloudflare Worker currently empty, while new `pg` driver needs `nodejs_compat`.
- [ ] A private `DB_DIAGNOSTICS_TOKEN` (at least 32 characters) must be set as a Cloudflare Worker secret before authenticated SQL check is usable. Never commit or post this token.
- [ ] Actual live DB query, encrypted GitHub backup artifact and isolated age decryption/pg_restore are **not yet verified**.
