# Current approved revision — November 14, 2026

This revision supersedes conflicting catalog, contact, geography, and SEO copy in the original brief below. Follow the current generated site and `data/programs-config.js` as the implementation source of truth.

- Six programs: DACI Level 1, Level 2, Level 3, Youth, Memory, and Retail, each with a permanent `/programs/daci-…` page.
- Nationwide onsite delivery; email-only contact; remove all phone links and phone fields. Web3Forms replaces Formspree. Use https://api.web3forms.com/submit with a Web3Forms access key and confirmed recipient inbox. Public DACI email is info@dacitraining.com. The Web3Forms access key remains pending. Disclose unavailability and block delivery until configured.
- Intended domain: `dacitraining.com`. Seven QR destinations mean homepage plus six program pages, pending client confirmation and domain setup.
- Level 3 is law enforcement/corrections only, with eligibility confirmation in the quote builder and no broad industry recommendations.
- Brad's curriculum takes precedence. Youth and Memory use concise CPI-derived topic/outcome summaries. CPI credentials, research outcomes, and global reach must retain CPI attribution.
- Duration assumptions: Level 1 source tiers 2/4/8 hours and instructor 16–24; Level 2 approved alternatives: 8-hour or 16-hour certification, advanced 24, instructor 40; Level 3 24/40/80; Youth 8, Memory 8, Retail 4 hours as clearly labeled planning estimates.
- Quote page remains free of promotional statistics. Current data maps, meaningful checks, form tests, and static metadata are updated for six programs.

---

# MASTER DEVELOPER SPECIFICATION PROMPT: DACI (De-Escalation & Crisis Intervention)

> **Instructions for AI Coding Assistant (VS Code / Claude 3.5 Sonnet / Gemini Code Assist):**
> Act as the Lead Full-Stack Web Engineer for Op Modus (`getopmodus.com`). Build the complete, production-ready website for **DACI — De-Escalation & Crisis Intervention** (Client: Brad Leakey) strictly adhering to every architectural decision, WCAG 2.1 AA accessibility token, structural layout, copy deck, data schema, and scope boundary specified below. Do not deviate from the file structure, color hex values, or scope constraints.

---

## 1. PROJECT CONTEXT & CRITICAL SCOPE BOUNDARIES

* **Business Entity:** DACI — De-Escalation & Crisis Intervention (Founder & Lead Instructor: Brad Leakey; sister organization to CPR Plus+ `azcprplus.com`).
* **Operating Model:** Service Area Business (SAB) delivering **live, onsite organizational training** across Phoenix Metro and statewide Arizona (`Phoenix`, `Scottsdale`, `Mesa`, `Tempe`, `Chandler`, `Gilbert`, `Glendale`, `Peoria`, `Tucson`).
* **Primary Target Buyers:** HR professionals, compliance officers, risk managers, facility directors, and school/healthcare administrators.
* **Primary Conversions:**
  1. **Call DACI** (`tel:` click-to-call links across header, hero, course cards, quote sidebar, footer, and mobile sticky bar).
  2. **Request a Custom Quote** (interactive multi-course Guided Training Decision Matrix & Quote Builder form).
* **STRICT NEGATIVE CONSTRAINTS (MUST ENFORCE):**
  * **NO Online Training:** Online, virtual, or self-paced video training is **NOT** offered in Phase 1. Never mention or advertise online classes anywhere in the copy, UI, or schema.
  * **NO Active Login/LMS:** The header `Trainer Login` button must route strictly to `/trainer-login` (`trainer-login.html`), which is a branded **"Under Maintenance"** placeholder page containing **zero** username/password inputs, **zero** fake login error states, and **zero** LMS functionality.
  * **NO E-Commerce / Seat Checkout:** Do not build shopping carts, credit card inputs, or individual seat registration.
  * **NO Unsupported Claims:** Do not invent company headcount, physical campus addresses, or unverified license/certification numbers. Use exact configurable placeholders (`[PHONE_DISPLAY]`, `[PHONE_E164]`, `[EMAIL_INQUIRY]`, `[DOMAIN]`, `[FORM_ID]`) in `/js/config.js` and HTML templates.

---

## 2. TECHNOLOGY STACK & REPOSITORY SCAFFOLDING

* **Architecture:** Zero-framework static edge build (Semantic HTML5, modular CSS3, Vanilla ES6+ JavaScript modules, JSON-driven data config, serverless form submission via Formspree/Netlify Forms).
* **Performance Targets (Mobile 4G):** `LCP < 1.8s`, `CLS < 0.05`, `INP < 150ms`, total gzipped CSS `< 25KB`, total gzipped JS `< 10KB`.
* **Build the exact file & folder structure below:**

```text
/daci-website
├── index.html                        # Page 1: Home (/)
├── training-courses.html             # Page 2: Training & Courses (/training-courses)
├── industries.html                   # Page 3: Industries (/industries)
├── about.html                        # Page 4: About DACI (/about)
├── request-quote.html                # Page 5: Guided Quote Builder & Contact (/request-quote)
├── trainer-login.html                # Page 6: Trainer Portal Under Maintenance (/trainer-login)
├── 404.html                          # Branded 404 fallback page
├── robots.txt                        # Allow public routes; Disallow: /trainer-login
├── sitemap.xml                       # XML sitemap for 5 public indexable pages
├── netlify.toml                      # Clean URL rewrites, security headers & cache control
├── /assets
│   ├── /brand
│   │   ├── daci-logo-navbar.svg
│   │   ├── daci-logo-primary.svg
│   │   ├── daci-logo-footer-white.svg
│   │   ├── daci-og-share-card.png
│   │   ├── favicon.svg
│   │   └── apple-touch-icon.png
│   └── /images
│       ├── hero-home-workshop.webp
│       ├── course-verbal-intervention.webp
│       ├── course-nci-training.webp
│       ├── industry-leadership-planning.webp
│       └── brad-leakey-portrait.webp
├── /css
│   ├── tokens.css                    # WCAG AA color tokens, typography scale & 8px grid
│   ├── base.css                      # Reset, landmarks, skip-link & :focus-visible rules
│   ├── layout.css                    # 12-col grid, sticky header, footer & mobile sticky bar
│   ├── components.css                # Cards, badges, buttons, filters & Decision Matrix UI
│   └── forms.css                     # Persistent labels, 48px inputs, validation & summary card
├── /data
│   └── programs-config.js            # Single source of truth for 8 CPI courses & 8 industries
└── /js
    ├── config.js                     # Configurable phone, email, credential & endpoint constants
    ├── navigation.js                 # Accessible mobile drawer, focus trap & active nav state
    ├── course-catalog.js             # Category filtering & "+ Add to Quote" sessionStorage sync
    ├── quote-matrix.js               # Guided Decision Matrix, URL param hydration & form submit
    └── sticky-bar.js                 # Mobile <768px sticky bar IntersectionObserver controller

```

---

## 3. DESIGN SYSTEM, TOKENS & WCAG 2.1 AA RULES (`/css/tokens.css` & `/css/base.css`)

### A. Color Tokens (`:root` variables)

* `--color-navy: #0B1F44;` *(Primary Brand — Headings, Hero Dark Surface, Footer; `16.23:1` on white)*
* `--color-crimson: #C62828;` *(Secondary Brand — Primary CTAs `Request a Quote`; `5.62:1` with `#FFFFFF` text)*
* `--color-crimson-hover: #9E1C1C;` *(CTA Hover State; `7.96:1` with `#FFFFFF` text)*
* `--color-steel: #1E4E8C;` *(Secondary Accent — Links, Eyebrow Pills, Focus Rings; `8.32:1` on white)*
* `--color-white: #FFFFFF;` *(Canvas Background & Dark-Surface Text)*
* `--color-surface-tint: #F4F6F9;` *(Elevated Surface / Alternating Section Bands)*
* `--color-ink: #1E293B;` *(Primary Body Text & Form Labels; `14.6:1` on white)*
* `--color-slate: #475569;` *(Muted / Meta Text; `7.58:1` on white)*
* `--color-border: #94A3B8;` *(Decorative borders only; measured `2.56:1` on white. Functional input and checkbox-card boundaries use `--color-slate`, `7.58:1`.)*
* `--color-emerald: #156534;` *(Semantic Success / Confirmation State; `7.14:1` on white)*
* **Color Guardrail:** NEVER place `#C62828` text directly on `#0B1F44` (`2.81:1` fails AA). Never rely on color alone for course risk tiers—always pair badge colors with explicit text and icons.

### B. Typography & Spatial Scale

* **Google Fonts (`display=swap`):**
* Display / Headings: `'Plus Jakarta Sans', sans-serif` (`700`, `800`; `-0.02em` letter-spacing on `H1`/`H2`; uppercase eyebrows at `0.75rem`, `700` weight, `+0.08em` tracking).
* Body / UI: `'Inter', sans-serif` (`400`, `500`, `600`, `700`; `16px` root size; `1.6` body line-height; `65ch` max paragraph measure).


* **Layout Grid:** `1200px` max-width container (`12-col`, `24px` gutter on Desktop `1440px`; `8-col`, `20px` gutter on Tablet `768px`; `4-col`, `16px` gutter on Mobile `375px`). Strict `8px` spacing scale (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `80px`, `96px`).

### C. Accessibility & Ergonomic Requirements

1. First DOM element on every page: `<a href="#main-content" class="skip-link">Skip to Main Content</a>` (visually hidden until `:focus`).
2. Universal `:focus-visible`: `outline: 2px solid #1E4E8C; outline-offset: 2px;` (and `#FFFFFF` outline on `#0B1F44` dark surfaces).
3. All interactive buttons, links, and mobile triggers must be at least `44x44px`.
4. All form `<input>`, `<select>`, and `<textarea>` elements must be at least `48px` tall with `16px` font-size (prevents iOS Safari zoom) and an explicit persistent `<label for="...">` `6px` above the field.

---

## 4. DATA CONTRACTS & JAVASCRIPT MODULES

### A. `/js/config.js`

```javascript
export const SITE_CONFIG = {
  businessName: "DACI — De-Escalation & Crisis Intervention",
  shortName: "DACI",
  phoneDisplay: "[PHONE_DISPLAY]",
  phoneE164: "[PHONE_E164]",
  inquiryEmail: "[EMAIL_INQUIRY]",
  domain: "[DOMAIN]",
  serviceArea: "Phoenix Metro & Statewide Arizona (Onsite Group Delivery)",
  cpiCredential: "Certified Crisis Prevention Institute (CPI) Instructor",
  formEndpoint: "https://formspree.io/f/[FORM_ID]"
};

```

*Write a small DOM hydration helper that automatically populates any `[data-phone-display]`, `[data-phone-href]`, and `[data-inquiry-email]` elements from `SITE_CONFIG` so contact info is controlled in one place.*

### B. `/data/programs-config.js` (8 Program Consultation Pathways & 8 Industries)

Export `COURSES` (array of 8 objects) and `INDUSTRIES` (array of 8 objects):

1. `verbal-intervention` — **Verbal Intervention™** | Category: `verbal` | Risk Badge: `Verbal Only • Hands-Off Policy` | Industries: `["healthcare", "education", "human-services", "security", "retail", "corporate"]`


2. `nonviolent-crisis-intervention` — **Nonviolent Crisis Intervention (NCI)™** | Category: `physical` | Risk Badge: `Standard Crisis • Safe Disengagement & Holding` | Industries: `["healthcare", "education", "behavioral-health", "human-services"]`


3. `nci-intermediate` — **NCI™ with Intermediate Physical Skills** | Category: `physical` | Risk Badge: `Elevated Risk • Non-Supine/Prone Physical Skills` | Industries: `["healthcare", "education", "behavioral-health"]`


4. `nci-advanced` — **NCI™ with Advanced Physical Skills** | Category: `physical` | Risk Badge: `High-Risk • Complex & Dangerous Behavior` | Industries: `["behavioral-health", "security", "healthcare"]`


5. `reframing-behavior` — **Reframing Behavior** | Category: `prevention` | Risk Badge: `Prevention & Neuroscience • All Staff` | Industries: `["education", "behavioral-health", "human-services"]`


6. `prevention-first` — **Prevention First** | Category: `prevention` | Risk Badge: `Early Recognition • Healthcare & Frontline` | Industries: `["healthcare", "dementia-care", "human-services"]`


7. `de-escalation-basics` — **De-Escalation Basics** | Category: `verbal` | Risk Badge: `Foundational Skills • Fast Deployment` | Industries: `["retail", "corporate", "education"]`


8. `dementia-capable-care` — **Dementia Capable Care** | Category: `specialty` | Risk Badge: `Specialty Care • Cognitive & Memory Support` | Industries: `["dementia-care", "healthcare"]`



*Industry Bundles (`INDUSTRIES` map for `/industries` & `/request-quote` recommendations):*

* `healthcare` (Healthcare): `["prevention-first", "verbal-intervention", "nonviolent-crisis-intervention"]`


* `education` (Education): `["reframing-behavior", "verbal-intervention", "nci-intermediate"]`


* `behavioral-health` (Behavioral Health): `["nci-intermediate", "nci-advanced", "reframing-behavior"]`


* `human-services` (Human Services): `["verbal-intervention", "nonviolent-crisis-intervention"]`


* `dementia-care` (Dementia Care): `["dementia-capable-care", "prevention-first"]`


* `security` (Public Safety & Security): `["verbal-intervention", "nci-advanced"]`


* `retail` (Retail): `["de-escalation-basics", "verbal-intervention"]`


* `corporate` (Corporate Environments): `["de-escalation-basics", "verbal-intervention"]`



### C. Interactive Script Contracts

1. **`/js/navigation.js`:** Controls the `< 768px` mobile slide-out drawer (`aria-expanded`, focus trap while open, `Escape` key closes drawer and returns focus to trigger). Highlights current active page in `<nav aria-label="Primary">`.
2. **`/js/course-catalog.js`:**
* Filters course cards on `training-courses.html` by `data-category` (`all`, `prevention`, `verbal`, `physical`, `specialty`) and updates an `aria-live="polite"` status banner (`"Showing X of 8 programs"`).
* Toggles course IDs in `sessionStorage` (`daci_selected_courses`), updates the sticky `Selected for Quote (N)` badge, and supports direct `Build Custom Quote →` hand-off to `request-quote.html?courses=...`.


3. **`/js/quote-matrix.js`:**
* On `request-quote.html` load, reads `URLSearchParams` (`?industry=...&courses=...&risk=...`) merged with `sessionStorage` (`daci_selected_courses`).
* Renders all 8 courses grouped by tier (`Prevention & Culture`, `Verbal De-Escalation`, `Physical Intervention`, `Specialty Care`) as `64px+` clickable checkbox cards (`#EFF6FF` fill + `2px solid #1E4E8C` border when checked).
* When `industry_sector` changes, dynamically appends a `Recommended for Your Industry` badge to matching course cards and announces via `aria-live="polite"`.
* Live-updates the right-hand sticky `Your Selected Training Plan` summary card with individual `Remove` buttons and updates a hidden `selected_courses_summary` field.
* Validates required fields (`organization_name`, `contact_name_title`, `work_email`, `direct_phone`, `training_location`, `industry_sector`, `selected_courses >= 1`, `participant_count`) on submit, rendering inline `role="alert"` messages in `#C62828` and focusing the first error. Submits via async `fetch` `POST` (checking empty `_gotcha` honeypot) and replaces the form with an emerald (`#156534`) confirmation panel.


4. **`/js/sticky-bar.js`:**
* Renders fixed `56px` dual-button bar (`50%` Deep Navy `Call DACI` | `50%` Crimson `Request a Quote`) on `< 768px` viewports with `padding-bottom: env(safe-area-inset-bottom)`.
* Uses `IntersectionObserver` (`threshold: 0.1`) watching `#site-footer` and `#quote-form-submit` to apply `.is-hidden` (`transform: translateY(100%)`) when either enters the viewport.



---

## 5. PAGE-BY-PAGE BLUEPRINTS & PRODUCTION COPY DECK

### Global Header & Footer (All 6 Pages)

* **Header (`80px` Desktop / `64px` Mobile, sticky):**
* Left: Horizontal DACI Logo (`assets/brand/daci-logo-navbar.svg`, `width="220" height="64"`, `alt="DACI — De-Escalation & Crisis Intervention home"`).
* Center Nav: `Training & Courses` (`/training-courses`) | `Industries` (`/industries`) | `About DACI` (`/about`) | `Request a Quote` (`/request-quote`).


* Right Utility Cluster: `Trainer Login` outline pill (`/trainer-login`) + `Call DACI` phone link (`tel:[PHONE_E164]`) + solid `#C62828` `Request a Quote` button (`/request-quote`).




* **Footer (`#0B1F44` surface, 4-column desktop grid, `#site-footer`):**
* Col 1: White/Crimson reversed DACI logo (`assets/brand/daci-logo-footer-white.svg`, `width="240" height="70"`), mission statement (*"Building Safer People, Safer Teams, and Safer Organizations"*), and explicit note: *"All DACI programs are delivered live onsite for businesses and organizations."*


* Col 2: Navigation (`Home`, `Training & Courses`, `Industries`, `About DACI`, `Request a Quote`).


* Col 3: Core Programs (`Verbal Intervention™`, `Nonviolent Crisis Intervention (NCI)™`, `NCI™ Intermediate & Advanced`, `Reframing Behavior`, `Dementia Capable Care`).


* Col 4: Contact & Access (`Call DACI: [PHONE_DISPLAY]`, `Email: [EMAIL_INQUIRY]`, `Phoenix Metro & Statewide Arizona`, `Trainer Login` link to `/trainer-login`).





---

### Page 1: `index.html` (`/`)

* **Title:** `Onsite De-Escalation & Crisis Intervention Training | DACI`
* **Meta Description:** `CPI-certified onsite de-escalation and crisis intervention training for healthcare, education, behavioral health, and corporate teams. Call DACI or request a custom quote.`
* **Hero (`#0B1F44` band, `7/5` asymmetric 12-col split):**
* Left (`7 cols`): Eyebrow pill `PREVENT • DE-ESCALATE • RESOLVE` (`#1E4E8C` bg); `H1`: *"Organizational De-Escalation & Crisis Intervention Training Delivered Onsite"*; Subhead: *"Practical, CPI-certified workplace safety programs built for healthcare, education, behavioral health, human services, and corporate teams. Equip your staff to recognize early warning signs, de-escalate tense situations, and respond safely."*; CTAs: `Request a Custom Quote` (`#C62828`) + `Call DACI to Discuss Needs` (white outline); Trust strip: `Certified Crisis Prevention Institute (CPI) Instructor` • `Frontline Emergency Services & Crisis Response Experience` • `Onsite Group Training Tailored to Staff Role & Risk`.


* Right (`5 cols`): White Quick-Path Selector card (*"Find the Right Training for Your Team"*) with Industry `<select>` + Primary Risk Level `<select>` (`Prevention & Workplace Culture`, `Verbal De-Escalation Only (Hands-Off)`, `Verbal + Physical Intervention`, `Specialty / Dementia Care`) + `Build Custom Quote →` button navigating to `/request-quote` with query params.




* **Section 2 (`#FFFFFF`): "The DACI Difference"** — `H2`: *"Building Safer People, Safer Teams, and Safer Organizations"* + 3 equal-height cards: `01 • PREVENTION: Dynamic Assessment`, `02 • DE-ESCALATION: Effective Communication`, `03 • RESOLUTION: Crisis Intervention & Organizational Safety`.


* **Section 3 (`#F4F6F9`): Core CPI-Aligned Training Pathways** — `2x2` grid featuring `Verbal Intervention™`, `Nonviolent Crisis Intervention (NCI)™`, `NCI™ with Intermediate / Advanced Physical Skills`, and `Reframing Behavior & Prevention First`, each with `View Details` and `+ Add to Quote`.


* **Section 4 (`#FFFFFF`): Industries Served Matrix** — `4x2` grid of clickable sector tiles (`Healthcare`, `Education`, `Behavioral Health`, `Human Services`, `Dementia Care`, `Public Safety & Security`, `Retail`, `Corporate Environments`) linking to `/industries#<slug>`.


* **Section 5 (`#0B1F44`): 3-Step Consultative Process & Conversion Banner** — `1. Assess Risk & Compliance Goals` → `2. Build a Custom Course Plan` → `3. Onsite Delivery & Ongoing Support` + dual CTAs (`Request a Custom Quote` & `Call DACI: [PHONE_DISPLAY]`).



---

### Page 2: `training-courses.html` (`/training-courses`)

* **Title:** `CPI Crisis Intervention & De-Escalation Courses | DACI`
* **Meta Description:** `Explore DACI's onsite CPI-certified training programs including Verbal Intervention, Nonviolent Crisis Intervention (NCI), Reframing Behavior, and Dementia Capable Care.`
* **Layout:** Compact `#0B1F44` Hero + Sticky Category Filter Bar (`All Programs (8)`, `Prevention & Culture`, `Verbal De-Escalation Only`, `Physical Intervention`, `Specialty Care`) + Stacked `8/4` specification cards for all 8 courses (each showing overview, 4 concrete learning outcomes, substantiated compliance/risk context, intended audience, *Onsite Instructor-Led Only* badge (except the two availability-confirmation pathways identified in Section 7), `+ Add to Quote Builder` toggle, and `Call to Discuss Fit`) + Onsite Delivery & Group Logistics section.



---

### Page 3: `industries.html` (`/industries`)

* **Title:** `Industry-Specific De-Escalation & Safety Training | DACI`
* **Meta Description:** `Onsite CPI crisis prevention training tailored for Healthcare, Education, Behavioral Health, Human Services, Dementia Care, Security, Retail, and Corporate teams.`
* **Layout:** Compact `#0B1F44` Hero + Quick-Jump Industry Anchor Pill Bar (`#healthcare`, `#education`, `#behavioral-health`, `#human-services`, `#dementia-care`, `#security`, `#retail`, `#corporate`) + 8 alternating `#FFFFFF`/`#F4F6F9` `7/5` deep-dive modules detailing sector workplace risk drivers and a right-hand `Recommended Training Bundle` card with a one-click `Select This Bundle for Quote` CTA.



---

### Page 4: `about.html` (`/about`)

* **Title:** `About DACI | Certified CPI De-Escalation Training Leadership`
* **Meta Description:** `Learn how DACI founder Brad Leakey combines decades of frontline emergency response experience with CPI certification to build safer organizations.`
* **Layout:**
* Hero with Mission Blockquote (`#1E4E8C` left border): *"To provide professional, practical de-escalation and crisis intervention training that enhances safety, reduces risk, strengthens communication, and improves outcomes for the people and organizations we serve."*


* Leadership `5/7` Split: Brad Leakey portrait (`assets/images/brad-leakey-portrait.webp`, `width="500" height="600"`) + Credential Summary Box (`Certified Crisis Prevention Institute (CPI) Instructor`, `Decades of Frontline Emergency Services & Crisis Response Experience`, `Partner Organization: CPR Plus+ (azcprplus.com)`) + narrative bio.


* `"12 Reasons Organizations Choose DACI"` (`3x4` numbered grid `01` through `12` using the complete approved copy in Section 7C) + Direct Consultation CTA band.





---

### Page 5: `request-quote.html` (`/request-quote`)

* **Title:** `Request an Onsite Training Quote & Contact | DACI`
* **Meta Description:** `Use DACI's guided training selector to combine CPI de-escalation courses, specify participant counts, and request a custom onsite training quote or call DACI directly.`
* **Layout:** Compact Hero + `8/4` asymmetric grid:
* Left (`8 cols`): 3-Step Guided Form (`Step 1: Organization & Industry Profile`, `Step 2: Guided Course Selection Matrix`, `Step 3: Cohort Size & Scheduling Logistics`) + hidden `_gotcha` honeypot + `Submit Custom Quote Request` button (`id="quote-form-submit"`, `#C62828`).


* Right (`4 cols`, sticky): `Your Selected Training Plan` live summary card + `#0B1F44` `Prefer to Discuss Your Needs by Phone?` card with `Call DACI: [PHONE_DISPLAY]`.





---

### Page 6: `trainer-login.html` (`/trainer-login`)

* **Meta Tag:** `<meta name="robots" content="noindex, nofollow">`
* **Title:** `Trainer Portal — Under Maintenance | DACI`
* **Layout:** Identical global Header & Footer + centered `560px` max-width `#FFFFFF` card on `#F4F6F9` canvas:
* Pill badge: `INSTRUCTOR PORTAL • UNDER MAINTENANCE` (`#0B1F44`)


* DACI emblem (`64px` height)
* `H1`: *"DACI Trainer Portal — Under Maintenance"*


* Body: *"Our certified instructor portal and training resource hub are currently undergoing scheduled maintenance as DACI expands its instructor network. If you are an authorized instructor or organizational coordinator needing immediate curriculum or scheduling support, please contact DACI directly."*


* Buttons: `← Return to DACI Home` (`/`) + `Contact DACI Administration` (`/request-quote`) — **NO form inputs or password fields**.





---

## 6. SEO, SCHEMA, ALT TEXT & DEPLOYMENT CONFIGURATION

* **JSON-LD Structured Data:** Embed valid `<script type="application/ld+json">` (`@type: ["ProfessionalService", "EducationalOrganization"]`) in `index.html` and `about.html` detailing `DACI — De-Escalation & Crisis Intervention`, founder `Brad Leakey` (`Certified Crisis Prevention Institute (CPI) Instructor`), `geo` (`33.4484`, `-112.0740`), `areaServed` (Arizona + Phoenix Metro cities), `openingHoursSpecification` (Mon–Fri `08:00–17:00`), and `hasOfferCatalog` with `courseMode: "onsite"`.


* **WCAG 2.1 AA Image Alt Text & Dimensions:** Representative imagery must be labeled honestly and must never be presented as actual DACI events or a real founder portrait. Every `<img>` must include explicit `width` and `height` attributes, `loading="lazy"` (except above-the-fold logo/hero which use `fetchpriority="high"`), and contextual alt text:
* `hero-home-workshop.webp`: `"Representative illustration of an instructor leading an onsite workplace communication workshop with healthcare and organizational staff"`
* `course-verbal-intervention.webp`: `"Representative illustration of healthcare staff practicing calm conversation and respectful communication"`
* `course-nci-training.webp`: `"Representative illustration of staff discussing situational awareness during an onsite workshop"`
* `industry-leadership-planning.webp`: `"Representative illustration of organizational leaders planning a staff safety training curriculum"`
* `brad-leakey-portrait.webp`: `"Brad Leakey founder profile graphic with initials BL; approved portrait pending"`


* **Deployment Files:**
* `robots.txt`: Allow `/`; `Disallow: /trainer-login`; reference `Sitemap: https://[DOMAIN]/sitemap.xml`.
* `netlify.toml`: Configure clean URL rewrites (`/*` without `.html`), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and long-lived immutable caching on `/assets/*`.



> **Execution Order:** Generate the codebase systematically in clean, complete files starting with CSS tokens/base/layout, followed by `config.js` and `programs-config.js`, the interactive JS modules, all 6 HTML templates + `404.html`, and the deployment/SEO config files. Verify every WCAG contrast pairing, `44x44px` touch target, persistent form label, and Phase 1 scope boundary before finishing.


## 7. COMPLETED COPY, CONTRACTS, AND RESOLVED IMPLEMENTATION DECISIONS

This consolidated version includes the user’s follow-up flyer copy. Sections 7–9 resolve ambiguities in the upstream brief and govern wherever older wording could imply unverified delivery or an incorrect contrast pairing. Build the full experience, retaining contact placeholders wherever business values are unavailable.

### A. Publishing and configuration

The review build is owner-private. Do not invent phone numbers, email accounts, addresses, course duration, pricing, certification identifiers, testimonials, or outcomes. Keep the five exact placeholder tokens in config. Run the generator after changes so static contact text, canonical URLs, structured data, sitemap, and robots stay synchronized. Unconfigured call/email links route to the contact section. Unconfigured submission must not issue a request or show confirmation.

Google Fonts use Inter 400/500/600/700 and Plus Jakarta Sans 700/800 with display=swap and local sans-serif fallbacks. No framework or runtime dependency is needed. Additional scripts, README, verification report, and deployment support files may accompany the prescribed source scaffold.

### B. Delivery and brand assets

Keep all eight named pathways in the catalog. Prevention First and De-Escalation Basics must display “Consultation required • Availability to confirm” rather than a confirmed onsite-program badge until DACI establishes delivery authorization. They may be selected for a quote consultation. No prohibited delivery mode is advertised. Final program fit, licensing, prerequisites, and delivery are confirmed by DACI. Do not imply course selection alone establishes legal compliance or authorizes physical intervention.

All brand assets must use the actual DACI logo supplied by the user: opposing profile silhouettes, red and blue sweeps, DACI lettering with the red A counter, and the exact De-Escalation & Crisis Intervention subline. Preserve the supplied source JPG. Recompose it into compact horizontal header/footer lockups and a stacked portal lockup without inventing a new mark. SVG wrappers may embed original raster artwork; do not claim they are vector originals. Use a white plaque where needed to preserve legibility on navy. Use versioned filenames for published logo, favicon, app icon, and social card assets because assets are cached immutably. Workshop scenes use fictional generated subjects and carry a representative-image disclosure. Brad Leakey is represented by a labeled monogram graphic until an approved portrait is supplied; never generate a fake likeness. All alt text must describe the actual asset truthfully. Asset prompts and provenance accompany the source.

### C. Approved “12 Reasons Organizations Choose DACI”

1. **Prevention Before Crisis:** We teach participants how to identify warning signs and intervene early, reducing the likelihood of escalation and improving outcomes.

2. **Real-World Experience:** Our curriculum is built upon decades of frontline experience in emergency services, healthcare, behavioral health, education, and crisis response.

3. **Proven De-Escalation Techniques:** Participants learn practical communication skills that help calm tense situations while maintaining dignity and respect.

4. **Safety-Focused Training:** DACI emphasizes personal safety, situational awareness, and team-based responses that help reduce injuries and liability.

5. **Trauma-Informed Approach:** Understanding how trauma influences behavior allows staff to respond more effectively and compassionately.

6. **Easy-to-Learn, Easy-to-Use Skills:** Our techniques are simple, realistic, and designed for immediate application in real-world situations.

7. **Adaptable Across Industries:** DACI principles can be customized for healthcare, schools, behavioral health, public safety, corporate environments, and community organizations.

8. **Respect and Professionalism:** We teach interventions that preserve dignity while maintaining a safe environment for everyone involved.

9. **Interactive, Hands-On Learning:** Participants gain confidence through realistic scenarios, skill practice, and instructor coaching.

10. **Comprehensive Crisis Management:** Training includes prevention, de-escalation, intervention, post-incident recovery, and documentation strategies.

11. **Reduced Risk and Increased Confidence:** Organizations report improved staff confidence, safer environments, and better management of challenging situations.

12. **Ongoing Support:** DACI is more than a class—we provide consultation, guidance, and continued support to help organizations build a culture of safety.

### D. Complete course copy and industry data

This is the single complete program dataset for generating static catalog content and driving browser interactions. Each course has four learning-focus statements, audience, risk context, and industry associations. Do not introduce guaranteed outcomes or additional service claims.

```json
{
  "COURSES": [
    {
      "id": "verbal-intervention",
      "name": "Verbal Intervention™",
      "category": "verbal",
      "riskBadge": "Verbal Only • Hands-Off Policy",
      "industries": [
        "healthcare",
        "education",
        "human-services",
        "security",
        "retail",
        "corporate"
      ],
      "overview": "Build a shared approach to recognizing distress and responding with calm, respectful communication. Designed for teams working within a hands-off policy.",
      "outcomes": [
        "Recognize early changes in behavior.",
        "Use calm verbal and nonverbal communication.",
        "Set clear, respectful limits.",
        "Understand how stress can influence a response."
      ],
      "audience": "Frontline staff, managers, educators, and customer-facing teams.",
      "context": "Supports a consistent communication approach within your organization’s hands-off policies.",
      "icon": "message"
    },
    {
      "id": "nonviolent-crisis-intervention",
      "name": "Nonviolent Crisis Intervention (NCI)™",
      "category": "physical",
      "riskBadge": "Standard Crisis • Safe Disengagement & Holding",
      "industries": [
        "healthcare",
        "education",
        "behavioral-health",
        "human-services"
      ],
      "overview": "Connect prevention and verbal de-escalation with supervised safety intervention skills for staff whose roles may involve a physical response.",
      "outcomes": [
        "Recognize developing crisis behavior.",
        "Match responses to assessed risk.",
        "Practice disengagement with an instructor.",
        "Review team communication after an incident."
      ],
      "audience": "Healthcare, education, behavioral health, and direct-support teams.",
      "context": "Course fit and physical skills must be reviewed against staff roles and organizational policy.",
      "icon": "shield"
    },
    {
      "id": "nci-intermediate",
      "name": "NCI™ with Intermediate Physical Skills",
      "category": "physical",
      "riskBadge": "Elevated Risk • Non-Supine/Prone Physical Skills",
      "industries": [
        "healthcare",
        "education",
        "behavioral-health"
      ],
      "overview": "A broader physical skills pathway for designated staff supporting people whose behavior may require more than the core NCI approach.",
      "outcomes": [
        "Assess the fit of a response to changing risk.",
        "Strengthen team coordination.",
        "Practice approved intermediate skills with an instructor.",
        "Review incident responses and next steps."
      ],
      "audience": "Designated response teams in healthcare, education, and behavioral health.",
      "context": "DACI reviews role, policy, prerequisites, and training environment before confirming this pathway.",
      "icon": "shield"
    },
    {
      "id": "nci-advanced",
      "name": "NCI™ with Advanced Physical Skills",
      "category": "physical",
      "riskBadge": "High-Risk • Complex & Dangerous Behavior",
      "industries": [
        "behavioral-health",
        "security",
        "healthcare"
      ],
      "overview": "Discuss a higher-risk pathway for designated staff supporting individuals who may display complex or dangerous behavior.",
      "outcomes": [
        "Consider risk when choosing a response.",
        "Coordinate roles during complex incidents.",
        "Practice advanced skills under instructor supervision.",
        "Identify opportunities to prevent repeat escalation."
      ],
      "audience": "Specialist response teams in behavioral health, healthcare, and security.",
      "context": "Advanced skills require a consultation about prerequisites, suitability, and organizational authorization.",
      "icon": "shield"
    },
    {
      "id": "reframing-behavior",
      "name": "Reframing Behavior",
      "category": "prevention",
      "riskBadge": "Prevention & Neuroscience • All Staff",
      "industries": [
        "education",
        "behavioral-health",
        "human-services"
      ],
      "overview": "Explore how an understanding of stress and behavior can support more constructive interactions and a stronger prevention culture.",
      "outcomes": [
        "Recognize how stress can affect behavior.",
        "Reflect on adult responses to distress.",
        "Develop supportive everyday interactions.",
        "Build a shared prevention vocabulary."
      ],
      "audience": "Educators and staff building a consistent approach to prevention.",
      "context": "Discuss licensing, staff roles, and an appropriate organizational delivery plan with DACI.",
      "icon": "brain"
    },
    {
      "id": "prevention-first",
      "name": "Prevention First",
      "category": "prevention",
      "riskBadge": "Early Recognition • Healthcare & Frontline",
      "industries": [
        "healthcare",
        "dementia-care",
        "human-services"
      ],
      "overview": "Start a conversation about foundational awareness for healthcare and support staff: recognizing distress early and knowing when to seek help.",
      "outcomes": [
        "Notice early signs of escalating distress.",
        "Use consistent language across teams.",
        "Reflect on the influence of staff responses.",
        "Recognize when additional support is needed."
      ],
      "audience": "Healthcare, dementia care, and frontline support staff.",
      "context": "Program availability and the appropriate onsite training option will be confirmed during consultation.",
      "availability": "Consultation required • Availability to confirm",
      "icon": "eye"
    },
    {
      "id": "de-escalation-basics",
      "name": "De-Escalation Basics",
      "category": "verbal",
      "riskBadge": "Foundational Skills • Fast Deployment",
      "industries": [
        "retail",
        "corporate",
        "education"
      ],
      "overview": "Discuss an introductory prevention and communication pathway for teams seeking a shared starting point for responding to tension.",
      "outcomes": [
        "Recognize situations that may escalate.",
        "Consider how tone and body language affect others.",
        "Use respectful communication to reduce tension.",
        "Identify when to involve a designated colleague."
      ],
      "audience": "Education, customer-facing, and workplace teams seeking foundational skills.",
      "context": "Program fit, licensing, and the appropriate onsite option will be confirmed before scheduling.",
      "availability": "Consultation required • Availability to confirm",
      "icon": "message"
    },
    {
      "id": "dementia-capable-care",
      "name": "Dementia Capable Care",
      "category": "specialty",
      "riskBadge": "Specialty Care • Cognitive & Memory Support",
      "industries": [
        "dementia-care",
        "healthcare"
      ],
      "overview": "A person-centered care pathway for understanding distress and adapting communication to the needs of people living with dementia.",
      "outcomes": [
        "Recognize that distress can communicate an unmet need.",
        "Adapt communication to the person.",
        "Consider abilities when planning supportive interactions.",
        "Discuss consistent approaches across the care team."
      ],
      "audience": "Memory care, senior living, and healthcare teams.",
      "context": "Discuss your care environment, team roles, and the appropriate program level with DACI.",
      "icon": "heart"
    }
  ],
  "INDUSTRIES": [
    {
      "id": "healthcare",
      "name": "Healthcare",
      "icon": "health",
      "courses": [
        "prevention-first",
        "verbal-intervention",
        "nonviolent-crisis-intervention"
      ],
      "description": "A consistent response, from the front desk to the care team.",
      "risks": [
        "Distress, uncertainty, and communication barriers in care settings.",
        "Different response responsibilities across clinical and support roles.",
        "A need for shared language and clear escalation pathways."
      ]
    },
    {
      "id": "education",
      "name": "Education",
      "icon": "school",
      "courses": [
        "reframing-behavior",
        "verbal-intervention",
        "nci-intermediate"
      ],
      "description": "Supportive school environments begin with a shared approach.",
      "risks": [
        "Recognizing student distress before behavior escalates.",
        "Consistent communication across classrooms and support teams.",
        "Matching staff responsibilities to school policies and support plans."
      ]
    },
    {
      "id": "behavioral-health",
      "name": "Behavioral Health",
      "icon": "brain",
      "courses": [
        "nci-intermediate",
        "nci-advanced",
        "reframing-behavior"
      ],
      "description": "Thoughtful preparation for complex care environments.",
      "risks": [
        "Changing levels of distress and complex behavior.",
        "Coordinated responses across multidisciplinary teams.",
        "Protecting dignity while considering safety and organizational policy."
      ]
    },
    {
      "id": "human-services",
      "name": "Human Services",
      "icon": "people",
      "courses": [
        "verbal-intervention",
        "nonviolent-crisis-intervention"
      ],
      "description": "Practical communication skills for people who support people.",
      "risks": [
        "Supporting individuals with different communication needs.",
        "Recognizing distress during daily support activities.",
        "Keeping responses consistent across shifts and settings."
      ]
    },
    {
      "id": "dementia-care",
      "name": "Dementia Care",
      "icon": "heart",
      "courses": [
        "dementia-capable-care",
        "prevention-first"
      ],
      "description": "Person-centered responses that respect the individual.",
      "risks": [
        "Distress linked to cognitive and communication changes.",
        "Understanding behavior in the context of individual needs.",
        "Maintaining a consistent, supportive approach across the care team."
      ]
    },
    {
      "id": "security",
      "name": "Public Safety & Security",
      "icon": "shield",
      "courses": [
        "verbal-intervention",
        "nci-advanced"
      ],
      "description": "Clear communication and coordinated responses under pressure.",
      "risks": [
        "Tense encounters in public-facing environments.",
        "Clear boundaries between communication and physical response roles.",
        "Coordination with organizational procedures and designated support."
      ]
    },
    {
      "id": "retail",
      "name": "Retail",
      "icon": "store",
      "courses": [
        "de-escalation-basics",
        "verbal-intervention"
      ],
      "description": "Prepare customer-facing teams for difficult conversations.",
      "risks": [
        "Customer frustration and conflict at service points.",
        "Knowing when to involve managers or designated support.",
        "Maintaining a respectful, consistent hands-off approach."
      ]
    },
    {
      "id": "corporate",
      "name": "Corporate Environments",
      "icon": "building",
      "courses": [
        "de-escalation-basics",
        "verbal-intervention"
      ],
      "description": "A shared language for a safer, more respectful workplace.",
      "risks": [
        "Tension in employee, visitor, or client interactions.",
        "Consistent communication across managers and departments.",
        "Clear pathways for reporting concerns and seeking support."
      ]
    }
  ],
  "TIERS": [
    {
      "id": "prevention",
      "name": "Prevention & Culture"
    },
    {
      "id": "verbal",
      "name": "Verbal De-Escalation"
    },
    {
      "id": "physical",
      "name": "Physical Intervention"
    },
    {
      "id": "specialty",
      "name": "Specialty Care"
    }
  ]
}
```

### E. Quote request payload

Send a FormData POST to the configured Formspree URL, with Accept: application/json. Only a successful HTTP response permits the success panel. Keep the form, field values, and selected course IDs on HTTP failure, network failure, or timeout. Disable the submit button during a pending request and suppress repeat sends. Use a 20-second timeout. Reject the honeypot locally. Clear course sessionStorage only after confirmed success. Do not store contact details in sessionStorage.

| Field | Type and validation |
| --- | --- |
| organization_name | Required trimmed string, max 160 |
| contact_name_title | Required trimmed string, max 160 |
| work_email | Required valid email, max 254 |
| direct_phone | Required telephone, min 7 digits, max 40 characters |
| training_location | Required city/facility, max 200 |
| industry_sector | Required known industry ID |
| selected_courses | Required comma-separated list of known course IDs, at least one |
| selected_courses_summary | Hidden semicolon-separated readable course names |
| participant_count | Required positive whole number |
| primary_risk | Optional known tier ID |
| preferred_dates | Optional timeframe text, max 200 |
| training_notes | Optional logistics/accessibility notes, max 3000 |
| _gotcha | Honeypot; must be empty |
| _subject | DACI — Custom onsite training quote request |

Provider-side validation and spam controls remain necessary when the real form is activated. Avoid collecting sensitive health or incident details.

### F. URL hydration and selection precedence

1. Read sessionStorage defensively; unavailable storage or malformed JSON must not break the page.
2. Merge valid stored IDs with valid comma-separated courses URL IDs; deduplicate and ignore unknown values.
3. Apply a recognized industry to the sector field and recommendations.
4. With a recognized risk, add matching courses from that industry’s bundle. If none match, use one starting course: prevention → reframing-behavior; verbal → verbal-intervention; physical → nonviolent-crisis-intervention; specialty → dementia-capable-care. Never automatically select every physical tier.
5. With an industry but no risk and no selected courses, use that industry bundle as the starting point.
6. Changing industry afterward changes recommendations, preserving the visitor’s selections. Every course can be removed from the live summary.

### G. System copy

- Empty plan: “Choose a program to start your plan.”
- Unconfigured endpoint: “Quote requests are temporarily unavailable. Your training selections are saved for this visit. Please use the contact options below when available.”
- Sending: “Sending your request…”
- Failure: “We couldn’t send your request. Your entries are still here. Please try again or contact DACI directly.”
- Success heading: “Thank you. Your training conversation starts here.”
- Success body: “Your custom quote request has been sent to DACI. We’ll review your organization’s needs and contact you to discuss program fit and onsite logistics.”
- 404 heading: “Let’s Get You Back on the Right Path.”
- 404 body: “The page you’re looking for may have moved. Explore our programs or return to the DACI home page.”

## 8. ACCEPTANCE AND HANDOFF

Generate six primary HTML pages plus a branded 404. Preserve the supplied page titles and descriptions. Keep exactly five public routes in the sitemap. The trainer portal remains noindex/nofollow and has zero forms or inputs. Use ProfessionalService and EducationalOrganization JSON-LD on Home and About. The OfferCatalog can list all consultation pathways; courseMode onsite is emitted only for pathways not marked availability-to-confirm. Never invent a street address.

Every link/button must have at least a 44×44 CSS pixel target. Inputs/selects/textareas must be at least 48px; course checkbox inputs may be smaller inside their 64px-plus clickable labels. Use persistent labels, inline errors, live statuses, keyboard focus management, a skip link first in the body, and reduced-motion handling. Keep the border token but use slate functional boundaries; the supplied 3.15:1 border assertion is incorrect.

Verify all seven routes at 375, 768, and 1440 CSS pixels for overflow, loaded imagery, labels, controls, and keyboard behavior. Verify catalog filters and multi-course session handoff. Exercise all submit states with isolated mocks and do not send test leads. Report the CSS/JS separately gzipped total. Treat the supplied Mobile 4G LCP/CLS/INP numbers as targets until measured under that condition.

Use Netlify-compatible clean rewrites and a true unknown-route 404. Apply X-Frame-Options DENY, nosniff, strict-origin-when-cross-origin, and the provided CSP. Version filenames when replacing immutable assets. Include a source ZIP, generated dist directory, launch instructions, and a verification report.

## 9. PRIMARY SOURCES USED IN THE REVIEW

The original brief and the user’s follow-up provide DACI business copy and founder claims. No inaccessible Drive document is claimed as independently inspected. CPI pages establish publisher program descriptions, not DACI’s delivery authorization.

- [CPI programs](https://www.crisisprevention.com/our-programs/)
- [Verbal Intervention](https://www.crisisprevention.com/our-programs/verbal-intervention/)
- [Nonviolent Crisis Intervention](https://www.crisisprevention.com/our-programs/nonviolent-crisis-intervention/)
- [Prevention First](https://www.crisisprevention.com/our-programs/prevention-first)
- [CPI education training brochure](https://www.crisisprevention.com/globalassets/us-ca/resources/pdf/cpi-nci-ebk-0244-ed-1024-us-education-training-solutions-brochure-update_final.pdf)


## 10. APPROVED CUSTOMER-JOURNEY EVIDENCE ADDITIONS — NOVEMBER 12, 2026

Render the following additions as static HTML. Keep the quote-page template free of promotional statistics and preserve its course-selection and contact flow.

### Home: CPI-reported outcomes

Insert a compact proof strip immediately after The DACI Difference and before Core CPI-Aligned Training Pathways. Use the existing tinted surface and navy 36px/800 Plus Jakarta Sans numerals. Source text is 14px in slate, with a direct source link and a 44px minimum link target. Use three columns on desktop and stacked number/description rows on mobile; include a subtle divider before the next tinted section.

Heading: “Organizational outcomes reported by CPI.”

- 89% — of schools improved staff skills and confidence
- 74% — of healthcare facilities reduced challenging behavior
- 58% — of organizations reduced workers’ compensation claims by more than one-third

Caption: “Source: Crisis Prevention Institute, published organizational outcomes. Results vary by organization. DACI provides onsite training led by a CPI Certified Instructor.” Link the source to https://www.crisisprevention.com/about-us/frequently-asked-questions/. Treat these as CPI-reported organizational outcomes; do not turn the percentages into the size of a reduction or imply they are measured DACI client results. The publisher page does not identify study date, sample, or methodology, so do not invent a research-report title.

### About: curriculum authority

Inside Brad’s credential box, after his credentials, add a restrained callout titled “The curriculum behind the training.” Copy: “Brad’s onsite instruction draws on CPI curricula. Since its founding in 1980, CPI reports reaching over 17 million people globally.” Source: https://www.crisisprevention.com/about-us/. Attribute this reach to CPI.

### Healthcare: dated workplace-risk benchmark

In #healthcare, add a left-column callout titled “Healthcare workplace risk.” Copy: “For 2021–2022, BLS reported an annualized workplace-violence injury rate of 14.2 per 10,000 full-time workers in private healthcare and social assistance, versus 2.9 across private industry—nearly five times the rate.” Follow with: “These figures include cases involving time away from work, restricted duties, or job transfer.” Source: U.S. Bureau of Labor Statistics, 2021–2022, linked to https://www.bls.gov/iif/factsheets/workplace-violence-2021-2022.htm.

Align the healthcare bundle beside the risk context on desktop and place it after that context on mobile. Its CTA is “Select Healthcare Training Bundle →”; preserve the existing industry/course URL parameters and storage merge behavior. Do not reuse the 2018 rates or imply that the benchmark establishes compliance.

### Verification

Check the three edited pages at 375, 768, and 1440 CSS pixels; verify the source links, reading order, and bundle handoff. The request-quote HTML must remain unchanged by this addition. No counter animation, new runtime JavaScript, or external tracking is required.
