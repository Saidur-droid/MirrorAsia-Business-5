# MirrorAsia — Bangladesh Privacy and Data Governance Review (2026-11-14)

Reference: Bangladesh **Personal Data Protection Act 2026**, Act 63 of 2026, primary text https://bdlaws.minlaw.gov.bd/act-print-1692.html . Official page intermittently unavailable; law text corroborated with https://ainkosh.bd/acts/act-1692/ and https://bdadvocacy.com/library/acts/personal-data-protection-act-2026/ . This is operational risk analysis, **not a legal opinion**.

## Commencement and key sections
Section 1(3) deems most of the Act effective 6 Nov 2025; sections 23 and 31–35 have deferred commencement linked to Gazette notification after 18 months. Do not infer no privacy obligations from delayed enforcement sections. Sections 5–7: consent/other lawful grounds and purpose restrictions. Section 9: children and people unable to consent. Sections 10–13: rights, correction and withdrawal/deletion. Sections 15–20: transparency, security, retention and breach obligations. Section 29: data classification and transfers.

## Safest low-friction path — no unlawful bypass
1. Use **non-personal published aggregate** Census/HIES data where commercial reuse/source terms allow; store citations, reference year and geography. Restrict outputs to demographic context.
2. If lawful partner data is needed, prefer rights-cleared **sufficiently aggregated data** with no possibility of reidentifying participants. Contract for data access and use limits; do not falsely label pseudonymous record-level data as anonymous.
3. For optional survey collection: explicit, purpose-specific opt-in, clear Bangla notice, adults-only scope, no precise location, no phone/name/raw IP in research tables, separate withdrawal procedure, defined retention, security logging and cell suppression. Audit whether device tokens and hashes constitute personal data.
4. Verify controller/processor roles, Cloudflare/AI-provider data flows, cross-border transfers and actual storage geography with privacy counsel before deployment. No sensitive individual profiles, unlawful scraping, or covert monitoring.
5. Never publish small cells or a model output as observed buying preferences. Document incident response, access controls and rights-handling.

## Decision
**Avoid unnecessary personal-data processing**, not legal duties. No legal loophole or assumed research exception justifies wholesale personal-data scraping. Check primary enacted law and current regulations with a qualified Bangladesh lawyer before live personal-data collection.
