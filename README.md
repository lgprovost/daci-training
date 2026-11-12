# DACI website

Complete static website for DACI — De-Escalation & Crisis Intervention. Six primary pages, a branded 404, eight program pathways, industry bundles, and a guided multi-course quote builder. HTML, CSS, and browser JavaScript have no framework or runtime package dependency.

## Run locally

Requires Node.js 20 or later. From this directory:

```powershell
node scripts/build.mjs
node scripts/serve.mjs
```

Open http://127.0.0.1:4173. Clean routes need an HTTP server; opening HTML with `file://` will not load ES modules reliably.

## Edit and verify

- Contact and Formspree settings: `js/config.js`.
- Course descriptions, outcomes, categories, and industry mappings: `data/programs-config.js`.
- Shared markup and page copy: `scripts/build.mjs`. It regenerates the seven root HTML files and `dist/`.
- Tokens and styling: the five files in `css/`.
- Form and interaction behavior: the five modules in `js/`.

```powershell
node scripts/build.mjs
node scripts/check.mjs
node scripts/test-form.mjs
```

The first check audits routes, assets, schema, labels, scope, data consistency, contrast, and gzip budgets. The second exercises the actual quote module against isolated network fixtures, including success, HTTP errors, network failure, invalid fields, honeypot, duplicate sends, and URL/storage hydration. Browser checks are documented in `VERIFICATION.md`.

## Configure before public launch

The user requested templated values where actual business details were unavailable. The exact placeholders `[PHONE_DISPLAY]`, `[PHONE_E164]`, `[EMAIL_INQUIRY]`, `[DOMAIN]`, and `[FORM_ID]` are intentionally retained. Do not replace them with invented contact details.

1. Set the real phone display and E.164 number, inquiry email, bare domain, and Formspree endpoint in `js/config.js`.
2. Create/verify the Formspree destination, allow the intended domain, and test a real delivery with DACI.
3. Confirm the named program licenses, instructor authorization, and onsite availability, particularly Prevention First and De-Escalation Basics. These two are labeled for availability confirmation in the catalog and selector.
4. Replace the labeled Brad Leakey monogram with an approved 500×600 portrait. Review the supplied-logo adaptations and representative generated workshop photography.
5. Run the build and checks, followed by `node scripts/check.mjs --launch`. The launch check intentionally fails while contact placeholders remain.
6. Verify the generated canonical URLs, social card URL, JSON-LD, sitemap, and robots file against the real domain.

Phone and email links fall back to the quote contact section while values are unconfigured. A placeholder Formspree endpoint never sends a request and never shows a success state. Form field contents remain on the page after errors; only course IDs are stored in sessionStorage. There is no payment collection, account login, or course checkout.

## Deploy

`dist/` is the complete static publish directory. `netlify.toml` contains clean route rules, a true 404 fallback, security headers, and caching. `_headers` and `_redirects` provide equivalent static host configuration. Netlify can build with `node scripts/build.mjs`; no install step is required.

`.openai/hosting.json` records the private Sites project created for this delivery. Retain its identity for future updates to that Site. The hosted review copy remains owner-private. Public launch on DACI’s domain is a separate configuration step.

Assets use the requested long-lived immutable caching policy. When replacing a published image or logo, change its filename and update the generator so existing visitors receive the new version.

## Specification review

`MASTER-DEVELOPER-SPECIFICATION.md` consolidates the supplied brief, complete flyer copy, full program data, form contract, implementation decisions, and acceptance criteria. The exact twelve flyer points are the user-supplied text from the follow-up message.

The supplied border contrast ratio was incorrect: `#94A3B8` on white measures 2.56:1. The token remains intact; functional input/card boundaries use the existing `#475569` slate token, which measures 7.58:1. The selected-card style remains `#EFF6FF` with a `2px #1E4E8C` border.

CPI publisher information used to review program descriptions and delivery assumptions:

- [CPI program catalog](https://www.crisisprevention.com/our-programs/)
- [Verbal Intervention](https://www.crisisprevention.com/our-programs/verbal-intervention/)
- [Nonviolent Crisis Intervention](https://www.crisisprevention.com/our-programs/nonviolent-crisis-intervention/)
- [Prevention First](https://www.crisisprevention.com/our-programs/prevention-first)
- [CPI education program brochure](https://www.crisisprevention.com/globalassets/us-ca/resources/pdf/cpi-nci-ebk-0244-ed-1024-us-education-training-solutions-brochure-update_final.pdf)

DACI-specific delivery authorization was not established by these publisher pages. The review copy therefore asks visitors to confirm availability during consultation.

## Asset provenance

All logo variants, the favicon, social card, and app icon use the logo supplied by the user. The original JPG is retained in assets/brand; SVG files recompose and embed its raster artwork rather than claiming to be vector originals. Header and footer variants arrange the supplied emblem and wordmark horizontally. The footer uses a white plaque to preserve the original colors. Versioned asset URLs prevent stale immutable-cache branding. Workshop scenes were created with the built-in Imagegen tool using fictional subjects; they do not document actual DACI events or staff. No image portrays a fabricated Brad Leakey. Full generation prompts and dimensions are in `ASSET-PROVENANCE.json`.
