# MirrorAsia production source recovery — 2026-10-15

This branch is a **partial, read-only extraction** from the currently deployed Worker `mirrorasia-iabc-2026`, release `20261015-hd2` (version `75b50fb9-8503-44cb-9764-0deb3dee92d3`).

Captured exactly from Cloudflare's multipart Worker content endpoint:
- `homepage/index.html`
- `homepage/landing.css`
- `homepage/landing.js`
- `worker.mjs`
- `homepage-router.mjs`

**Not yet recovered to this repo:** `legacy.mjs` (~259 KB) and `homepage-assets.mjs` (~1.62 MB, predominantly embedded WebP). These remain in the deployed Worker and Cloudflare versions. The entire production source is therefore **NOT YET reproducible from GitHub**. Do NOT deploy this partial snapshot. The legacy module is necessary for `/studio` and API routes; the embedded WebP must be preserved until replaced by native high-resolution source artwork.

Worker release metadata: `20261015-hd2`. Active version 100% traffic was confirmed via Cloudflare Deployments API on 2026-10-15. Rollback Worker `mirrorasia-ui-rollback-20261015` exists and must not be modified.

Next: recover the two remaining modules without truncation; package exact Worker and preserve Hyperdrive binding; verify byte equivalence, staging routes and artwork before any production change.
