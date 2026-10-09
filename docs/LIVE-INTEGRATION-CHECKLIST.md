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
