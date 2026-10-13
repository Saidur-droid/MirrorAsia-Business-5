# MirrorAsia Public Landing — Design Spec

Date: 2026-10-13
Status: Review requested; implementation and production release not yet approved by this document.

## Purpose and accepted direction
Build a **real, operational, premium homepage** for the existing MirrorAsia Cloudflare Worker website — not an image mockup. The user explicitly rejected generic purple/dark SaaS dashboards for the public homepage. The approved target is an airy, warm-white public hero with carefully spaced headline/CTA, original floating Asian isometric miniature-city illustrations, refined coral branding, subtle motion, and excellent mobile adaptation. Simile.com is a quality/composition reference, **not** a license to copy source code, illustrations, text, partner identities, or branding.

## Boundaries
- Public homepage **/** showcases MirrorAsia, rather than replacing its existing study simulation application. Keep existing `/api/health` and `/api/simulate` behavior.
- **Run a simulation** moves to a working interactive product studio at `/studio`, with supported deep link and back navigation. Do not show a lead-generation request form in place of the working demo.
- Top-level public navigation: **Platform**, **Research**, **Validation**, **About** and **Run a simulation**. Navigation must point to actual working sections/routes, never dead buttons.
- Use the exact **Mirror Asia** brand wording and an original coral mark. Do not show invented investments, funding announcements, employees, customer logos or unverified accuracy metrics.
- Hero copy: **Understand your market before you move.** Subheading: **Explore product, price and positioning scenarios with transparent synthetic consumer simulations for Bangladesh.** Disclose that the current preview is illustrative and not validated market prediction.
- Responsive first: 320–1920 px, touch-friendly controls, no horizontal scroll, useful reduced-motion fallback.

## UX and visual system
1. Desktop: calm ivory (#FAF9F7) background, charcoal typography, coral accent (#FA5445), generous whitespace. Thin transparent navigation with Mirror Asia logo left, links center/right, coral CTA right. Main hero centered and unobscured.
2. Illustration layer: several **original** handcrafted or properly licensed isometric city/island visuals with Bangladesh/Asian character, positioned in margins as noninteractive decor (aria-hidden). No borrowed Simile illustrations. On small screens simplify or hide artwork to retain legibility and performance.
3. Animations: restrained 3–8 px float/parallax, gentle fade/slide on reveal, button hover and focus treatments, no continuous heavy GPU work or scroll-jank, `prefers-reduced-motion` respected.
4. Typography: responsive fluid heading, crisp black text, 2–3 line max hero subtitle and readable body. Usable keyboard navigation, visible focus rings, semantic headings, descriptive links.
5. Lower public page: coherent sections introducing Scenario Studio, Population Preview, evidence/validation status, methodology/limitations, and responsible-access call to action. No fake testimonials or logos.

## Architecture and paths
- Existing Next/React SPA is built by `scripts/build-pages.mjs`; a Cloudflare Worker embeds HTML/JS/CSS generated assets via `scripts/build-worker.mjs`.
- Separate `src/app/landing.tsx` (public content) from existing `src/app/page.tsx` (simulation studio); avoid rewriting validated `src/lib/engine.ts`.
- A small client router or pathname handling in the React entry should render landing at `/` and simulation studio at `/studio`, preserving browser history and direct loads. Worker should route `/studio` to the same SPA HTML without modifying API paths.
- Use `src/app/landing.css` (or dedicated scoped CSS) and self-hosted optimized illustrative assets under a source assets directory included in build. Prefer lightweight SVG or WebP over full-screen screenshot images. Keep CSS isolated so the studio remains functional.
- Preserve staging's separate `/api/internal/db-check` auth and binding. Never commit secrets or expose diagnostic tokens to UI. Retain security headers.

## Data states and trust
- Public marketing is not evidence of live AI or validated respondent accuracy. Studio outputs retain original provenance and `Uncalibrated` status until validated.
- No fake customer trademarks, investor funding banners, launch count, or model performance numbers.

## Acceptance tests
1. On staging, `GET /` returns real HTML, CSS and JS; browser displays public hero matching the approved composition, not static screenshot; CTA navigates to usable simulation studio.
2. `GET /studio` loads directly and after refresh; run scenario still invokes `POST /api/simulate` and renders real response; bad inputs surface errors.
3. Navigation works by mouse, keyboard and touch; viewport tests at 375px/768px/1440px without content overlap or horizontal scroll.
4. Browser check for no broken images/links, JS errors, asset 404s, page accessibility basics, reduced-motion behavior; animation is smooth on typical device.
5. `npm test`, `npm run typecheck`, `npm run build:pages`, and native Cloudflare Worker dry-build complete with exit code 0.
6. Compare visual screenshot on staging against accepted reference; **no main branch merge or live production Worker deploy** until user has inspected staging and given separate explicit release approval.

## Release safety and cost
- All changes first to existing feature branch (or isolated branch) and a separate staging Worker/preview; main application Worker must stay unchanged.
- Free-tier-only tooling; no credit card, subscription, paid AI APIs, or usage-intensive background jobs.
- If current tools cannot upload binary assets, run browser tests or deploy a Worker reliably, stop at the verified stage and report blockers. Do not claim homepage live until actual Cloudflare response and visual check confirm it.

## Beyond landing page (separate roadmap)
Database-backed studies, automated encrypted backups/restores, calibrated synthetic personas and human-validation dataset require separate specs/review; those are not deceptively presented as part of this homepage milestone.
