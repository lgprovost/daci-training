# DACI website

Client-approved design, November 15, 2026. Thirteen static HTML pages: six main pages, six permanent DACI program detail pages, and a branded 404. Live onsite training nationwide; all contact and quote follow-up is by email.

DACI has not launched a public website. The existing Sites publication is an owner-private review preview. Production hosting will be GoDaddy Web Hosting with cPanel, using `dacitraining.com`.

The navigation label is **Why DACI**, retaining the `/about` route. The founder photo/biography/credentials section has been removed from that page. No replacement imagery has been added.

Editable design and prototypes: [DACI Figma file](https://www.figma.com/design/ANVLLoJ53XnhfqFIdd5oib). Client follow-ups, QR destinations, and the editorial copy review are included in `docs/`.

## Build and verify

Run from this directory: `node scripts/build.mjs`, `node scripts/check.mjs`, and `node scripts/test-form.mjs`. Start a local preview with `node scripts/serve.mjs`. No package install is needed.

## Source of truth

- `data/programs-config.js`: six DACI programs, intended learning outcomes, curriculum modules, duration estimates, original DACI descriptions, and eight industry mappings.
- `scripts/build.mjs`: shared page content, permanent program routes, metadata, sitemap, and schema.
- `js/config.js`: intended domain `dacitraining.com`, inquiry email `info@dacitraining.com`, Web3Forms endpoint, and the client-supplied public form access key. No phone configuration or phone field.
- `js/quote-matrix.js`: course selection, URL/storage hydration, validation, Level 3 eligibility confirmation, and delivery handling.

The builder renders all curriculum content as static HTML and emits a smaller browser data module containing only selector fields. The shipped JavaScript budget remains below 10 KB gzip.

The quote form uses Web3Forms' zero-configuration hCaptcha widget and loads `https://web3forms.com/client/script.js` only on that page. It requires a nonempty `h-captcha-response` token before sending and resets verification after failed requests while retaining quote entries. The user confirmed hCaptcha is enabled in the Web3Forms dashboard. Server verification is handled by Web3Forms; a real solved challenge and inbox receipt still need manual confirmation. See [Web3Forms hCaptcha setup](https://docs.web3forms.com/getting-started/customizations/spam-protection/hcaptcha).

The `_headers` Content Security Policy allows the documented Web3Forms/hCaptcha resources and submit endpoint. That file is host-specific; future production hosting must apply equivalent headers where supported.

## Program catalog

- DACI Level 1: `/programs/daci-level-1`
- DACI Level 2: `/programs/daci-level-2`
- DACI Level 3: `/programs/daci-level-3`
- DACI Youth: `/programs/daci-youth`
- DACI Memory: `/programs/daci-memory`
- DACI Retail: `/programs/daci-retail`

Level 3 is restricted to law enforcement/corrections and is not automatically included in any broad industry bundle. Youth, Memory, and Retail use original DACI marketing descriptions. Brad must confirm the lesson plans; these descriptions do not reproduce or establish a license to CPI curricula. Course descriptions do not establish a CPI credential for DACI's independent program names.

## Remaining public launch requirements

1. Public inquiry email confirmed: `info@dacitraining.com`. Confirm the mailbox is active and receiving messages.
2. The client-supplied Web3Forms access key is configured, enabling quote submissions to https://api.web3forms.com/submit. A real delivery-and-reply test must still verify the inbox associated with the key; configured contact email does not change Web3Forms' recipient mapping. The key is public by Web3Forms design, not a secret server API token.
3. Connect domain DNS and public hosting access for `dacitraining.com`; canonical metadata alone does not connect a domain. The existing Sites review audience remains private. Test all seven QR destinations before printing.
4. Confirm remaining course-delivery details, including the scope and eligibility of Level 2’s approved 8-hour and 16-hour certification options. Design approval does not confirm outstanding lesson-plan or certification details. See `docs/client-follow-up.html`.
5. Prepare GoDaddy-compatible routing for extensionless page URLs and the branded 404, configure HTTPS and the domain, and preserve email DNS records. The current `_redirects` and `netlify.toml` files target other hosting workflows and do not configure cPanel.
6. Run `node scripts/check.mjs --launch` for configuration checks. Passing checks does not verify actual email delivery, DNS, HTTPS, or production hosting.

## Hosting and assets

`.openai/hosting.json` retains the existing Sites project identity. `dist/` is the deployment directory. Netlify and static-host route rules cover all six permanent program pages. All canonical URLs and sitemap routes use the intended domain.

Build locally with Node.js 20 or later; upload the **contents** of `dist/` to the GoDaddy domain's document root when the production routing and launch checks are ready. No Node.js server or database is needed for the current static site. Do not upload the source repository, `.git/`, or private review configuration as the document root. This repository does not automatically deploy to GoDaddy or launch the public site.

A universal QR entry page with multiple-program selection was discussed but has not been implemented. The current QR CSV lists individual program pages; confirm the final card workflow before printing.

The logo and its adaptations are unchanged. Social sharing uses `daci-og-share-card-v3.png` with nationwide wording; the code-native SVG source is retained. Workshop photos are representative generated imagery. See `ASSET-PROVENANCE.json`.

The earlier specification is retained for architectural history; its catalog, contact, and geography directions are superseded by the current revision at the top of that document.
