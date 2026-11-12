# Verification record

Reviewed November 11, 2026, in the America/Phoenix client timezone.

## Automated checks

- 388 static/data checks pass: route and asset integrity, one H1 per page, unique IDs, persistent labels, image attributes, eight courses and eight industry mappings, structured data, sitemap, maintenance-page scope, and excluded feature checks.
- Nine quote-module tests pass with mocked responses: field validation, unconfigured endpoint, successful POST payload and confirmation, HTTP error, network error, honeypot, duplicate request suppression, URL/session merge, and focused risk defaults.
- Total separately gzipped browser JavaScript, including the shared program data: 8,897 bytes, below 10 KB.
- Total separately gzipped CSS: 7,213 bytes, below 25 KB.

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
