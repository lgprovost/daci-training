# DACI website

Current revision: November 14, 2026. Thirteen static HTML pages: six main pages, six permanent DACI program detail pages, and a branded 404. Live onsite training nationwide; all contact and quote follow-up is by email.

## Build and verify

Run from this directory: `node scripts/build.mjs`, `node scripts/check.mjs`, and `node scripts/test-form.mjs`. Start a local preview with `node scripts/serve.mjs`. No package install is needed.

## Source of truth

- `data/programs-config.js`: six DACI programs, intended learning outcomes, curriculum modules, duration estimates, CPI references, and eight industry mappings.
- `scripts/build.mjs`: shared page content, permanent program routes, metadata, sitemap, and schema.
- `js/config.js`: confirmed intended domain `dacitraining.com`, pending inquiry email, and Web3Forms endpoint, and pending `web3formsAccessKey`. No phone configuration or phone field.
- `js/quote-matrix.js`: course selection, URL/storage hydration, validation, Level 3 eligibility confirmation, and delivery handling.

The builder renders all curriculum content as static HTML and emits a smaller browser data module containing only selector fields. The shipped JavaScript budget remains below 10 KB gzip.

## Program catalog

- DACI Level 1: `/programs/daci-level-1`
- DACI Level 2: `/programs/daci-level-2`
- DACI Level 3: `/programs/daci-level-3`
- DACI Youth: `/programs/daci-youth`
- DACI Memory: `/programs/daci-memory`
- DACI Retail: `/programs/daci-retail`

Level 3 is restricted to law enforcement/corrections and is not automatically included in any broad industry bundle. Youth and Memory use editorial summaries of official CPI topics. Course descriptions do not establish a CPI credential for DACI's independent program names.

## Remaining public launch requirements

1. Confirm DACI’s new public inquiry email and set `inquiryEmail`.
2. Create a Web3Forms access key for the confirmed recipient inbox and set `web3formsAccessKey`; the `formEndpoint` is https://api.web3forms.com/submit. Send a real delivery-and-reply test. The current page discloses that submission is unavailable and blocks requests while email/endpoint are pending.
3. Connect domain DNS and public hosting access for `dacitraining.com`; canonical metadata alone does not connect a domain. The existing Sites review audience remains private. Test all seven QR destinations before printing.
4. Approve provisional duration and curriculum assumptions, including the scope and eligibility of Level 2’s approved 8-hour and 16-hour certification options. The client follow-up report and QR destination CSV are supplied alongside this repository.
5. The user-supplied founder photo is installed for provisional use. Replace its versioned asset if a new headshot is approved.
6. Run `node scripts/check.mjs --launch` once contact settings are complete. It is expected to fail until then.

## Hosting and assets

`.openai/hosting.json` retains the existing Sites project identity. `dist/` is the deployment directory. Netlify and static-host route rules cover all six permanent program pages. All canonical URLs and sitemap routes use the intended domain.

The logo and its adaptations are unchanged. Social sharing uses `daci-og-share-card-v3.png` with nationwide wording; the code-native SVG source is retained. Workshop photos are representative generated imagery. See `ASSET-PROVENANCE.json`.

The earlier specification is retained for architectural history; its catalog, contact, and geography directions are superseded by the current revision at the top of that document.
