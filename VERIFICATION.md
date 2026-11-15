# Verification record

## Approved design handoff — November 15, 2026

- Current catalog: six DACI programs and 13 public HTML pages.
- 717 static/data checks and 13 mocked quote-form tests pass. Documentation HTML in `docs/` is excluded from the public-page checks and is not included in `dist/`. The form access key is configured; request payload tests cover the access key, reply-to email, selected programs and readable message summary.
- The Why DACI navigation label retains `/about`; the founder section is removed. No other page content or metadata was changed by those updates.
- The public site has not launched. Production hosting/routing, domain/HTTPS configuration, and real inbox delivery tests remain outstanding. The client-supplied Web3Forms key is configured; no real submission or inbox-receipt verification was performed by the automated tests.
- Earlier browser observations below are historical, not verification of the current public launch.

## Historical development verification

Reviewed November 11, 2026, in the America/Phoenix client timezone.

## Automated checks

- 388 static/data checks pass: route and asset integrity, one H1 per page, unique IDs, persistent labels, image attributes, eight courses and eight industry mappings, structured data, sitemap, maintenance-page scope, and excluded feature checks.
- Nine quote-module tests pass with mocked responses: field validation, unconfigured endpoint, successful POST payload and confirmation, HTTP error, network error, honeypot, duplicate request suppression, URL/session merge, and focused risk defaults.
- Total separately gzipped browser JavaScript, including the shared program data: 8,897 bytes, below 10 KB.
- Total separately gzipped CSS: 7,570 bytes, below 25 KB.

## Browser checks

All seven routes were inspected at 375, 768, and 1440 CSS pixels. No horizontal page overflow or broken loaded images was found. A footer Home link initially fell below 44px in width; it was corrected to a 44px minimum and the mobile control audit then reported no undersized links/buttons. Form inputs are at least 48px tall, and course checkbox cards exceed 64px.

Verified in the local browser:

- Healthcare + verbal priority transfers from the homepage selector into the quote page and selects the verbal course.
- Changing the industry displays the corresponding recommendation badges.
- Physical filtering shows exactly three of eight programs.
- Catalog toggles update the selected count and preserve two distinct programs through the quote handoff.
- Plan removal updates the summary, checkbox state, storage, and focus.
- Missing required fields render inline errors and focus the first invalid field.
- A complete form with the placeholder endpoint shows the unavailable message; it does not show confirmation.
- Mobile navigation opens with focus on the first link, wraps keyboard focus, closes with Escape, and returns focus to its trigger.
- The mobile contact bar hides when the quote submit button is in view.
- Trainer maintenance page has no form or input fields and is noindex/nofollow.
- The local server returns 200 for the known routes and 404 for an unknown route.
- No JavaScript console warnings or errors were reported in the checked views.

## Measured contrast against white

| Token | Ratio |
| --- | ---: |
| Navy | 16.23:1 |
| Crimson | 5.62:1 |
| Crimson hover | 7.96:1 |
| Steel | 8.32:1 |
| Ink | 14.63:1 |
| Slate | 7.58:1 |
| Emerald | 7.14:1 |
| Border, decorative only | 2.56:1 |

## Limits

The real phone, email, domain, and Formspree ID remain placeholders by request. Live delivery to DACI’s inbox was not tested. Public indexing, domain ownership, approved founder photography, and program authorization require business configuration. The success and failure network paths were tested with mocks, without sending leads.

The LCP, CLS, and INP values in the brief are targets. A throttled Mobile 4G field/performance audit and a full assistive-technology conformance audit were not performed; passing these checks is not a claim of complete WCAG certification. Google Fonts require a network connection; local fallback fonts remain available.


## Supplied logo update

Replaced the provisional identity in the shared header/footer, maintenance portal, favicon, touch icon, and Open Graph card. All seven pages use versioned asset URLs; the original scaffold filenames also contain the updated artwork. The supplied JPG is retained unchanged. Header/footer wrappers preserve the original profiles, lettering, red A detail, and subtitle in compact horizontal layouts. The footer uses a white plaque. SVG delivery wrappers embed raster renders and are not vector logo masters. Browser checks confirm the header and full portal logo load at mobile/desktop sizes without horizontal overflow; the portal still contains zero inputs.


## Customer-journey evidence — November 12, 2026

Added the Home CPI outcomes strip, an attributed CPI history/reach callout inside Brad’s credential box, and the Healthcare BLS 2021–2022 private-industry risk benchmark. All three source links point directly to the publisher pages checked for this update. The healthcare bundle CTA now says “Select Healthcare Training Bundle” and preserves its industry/course query parameters.

The three edited pages were checked at 375, 768, and 1440 CSS pixels: no horizontal overflow, one evidence block per relevant page, and every source-link target is at least 44px tall. Desktop risk/bundle boxes align alongside each other; on mobile the risk context precedes the bundle. Home numerals are 36px/800; sources are 14px. Browser handoff confirms all three healthcare courses are selected while preserving existing saved selections.

All 388 existing static/data checks pass. JavaScript remains 8,897 gzipped bytes and CSS is 7,570 gzipped bytes. The request-quote.html SHA-256 before and after this addition is 358B539E04DA6FC3726A53587EF2538AFEB57A0AD6B0BD2420512A859B7F0E35. No promotional statistic or evidence block is present in the quote page; its markup is byte-for-byte unchanged. No new browser JavaScript or analytics was introduced.
