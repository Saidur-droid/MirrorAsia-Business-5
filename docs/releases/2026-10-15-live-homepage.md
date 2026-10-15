# Mirror Asia production homepage release, 2026-10-15

## Released, not a mockup

The user's explicit request to update the real website was executed. No image-generation call was used for this release. Existing user-supplied artwork was cropped into a transparent six-scene AVIF atlas. All navigation, headings, controls, sections, and motion are real HTML/CSS/JavaScript; the page is not a screenshot overlay.

Production: https://mirrorasia-iabc-2026.mirrorasia-builders.workers.dev/
Studio: https://mirrorasia-iabc-2026.mirrorasia-builders.workers.dev/studio
Staging: https://mirrorasia-ui-preview-20261013.mirrorasia-builders.workers.dev/

## Release identity and rollback

- Release marker: `20261015` in the `x-mirrorasia-release` response header.
- Production upload: 2026-10-15T15:51:45.773839Z.
- Deployment: `8b7d47ac-ea4b-4863-a962-ba82deb3b0f9`.
- Active version: `858f1116-4495-4dad-98c3-db06290daded`, 100% traffic.
- Prior production version retained for rollback: `aad84457-f19f-4fd2-a95a-f0bc305c91d4`.
- Compatibility date retained: `2026-10-08`.
- Existing HYPERDRIVE binding inherited without changing its database credential.
- Main branch and production database were not modified.

The exact, tested four-module staging candidate was promoted to production. The old production worker was retained verbatim as `legacy.mjs`; the new entry delegates existing routes and maps `/studio` and `/studio/` to the original application.

## Deployed module SHA-256

| Module | SHA-256 |
| --- | --- |
| worker.mjs | f3915d851398aa1adb62d0a9c311a0f37d737c5f72d48aa0d8d0eea43f72333e |
| legacy.mjs | b2ce3b84f96feeec5ef878bff2794b65a289ca10b39cc0b76a489270e6aa43df |
| homepage-router.mjs | 35095b9b7bfcce69450d33942f2cc270eb9447a99ad46cb10a37abcc8d335952 |
| homepage-assets.mjs | 4c639f47a7c8f6b35c331d2d25ce1b8437a1f1a70aa9634a936572921fe1eaf8 |

## Live verification evidence

The Cloudflare Browser Rendering API loaded the public production URL and returned the new heading `Simulate better / decisions, faster.`, six city-scene elements, the initialized `Pause motion` control, and the CTA link to `/studio`.

A short-lived Cloudflare service-bound test harness invoked the actual staging Worker and then the actual production Worker. Both passed the following checks:

- HTTP 200: `/`, `/studio`, `/studio/`, `/api/health`.
- HTTP 200 with correct MIME types: new CSS, JS, AVIF; existing studio JS and CSS.
- Exact asset hash checks, including the 43,707-byte AVIF atlas.
- POST `/api/simulate` returned 200, 18 rows, `mode: preview`, `realRespondents: 0`, `mirrorScore: null`.
- Invalid JSON returned 400.

The diagnostic harness URL was disabled after verification. No database writes were used by these tests.

Local tests: seven routing/security/preservation tests passed, with a recorded failing baseline before implementation. Local browser DOM checks passed at widths 344, 390, 768, 1366, and 1672, including CTA, mobile navigation, pause/resume and reduced motion. These were local DOM tests, not falsely represented as public HTTP tests. Public staging additionally passed desktop and mobile browser inspection; the mobile body measured 390px at a 390px viewport.

## Content and artwork hashes

- HTML: `189dd25fc9b0f87466ebe06b8402c08e87f74fd90606304ad542c23b96906cf9`.
- CSS: `7792356ed047056b61c755ffbb1f575f1a7ace15c7bf2ff8b688533924aa4372`.
- JS: `b02b2cd0d79f49275e8b696a02ddb9ed864c13b8d6a6e81f5ae6359a81ee5d20`.
- AVIF: `361e21a0819d385148becad063689d06e4da6b08cf9aed742d0be0432e14a411`.

Versioned public asset prefix: `/assets/mirrorasia/20261015/`.
Files: `landing.css`, `landing.js`, `city-atlas.avif`.

Artwork is a decorative illustration adapted from the user's supplied reference, not a geographically exact map or a claim that landmarks were independently modeled. The reference's invented investment announcement and partner/customer logos were deliberately not published. The homepage prominently identifies current outputs as synthetic and uncalibrated.

## Future-build safeguard

This release used a directly verified Cloudflare module upload, not a claimed new CircleCI success. The earlier React-only feature-branch build and its generated artifacts are NOT the authoritative artifact for this production release. Do not upload those older artifacts over production.

Before changing deployment automation, retrieve the current production Worker via the authenticated Cloudflare script-content API, preserve all four modules, and verify the module hashes above. Integrate the homepage source and atlas into the repository build in a follow-up change, then test staging before replacing this release. A source/artwork/test package accompanies the conversation deliverable.

Outstanding database integration, encrypted backup restoration and real-human model calibration are separate workstreams and are not claimed complete by this UI release.
