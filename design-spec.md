# Design Specification — Atom · UX/UI & Visual Designer Portfolio

**Deliverable:** a single static site — `index.html` + `css/style.css` + `js/main.js`. No build tools, no frameworks, no CDN JS libraries. Vanilla HTML/CSS/JS only. Google Fonts is the only external resource.

**Audience for this doc:** the frontend developer agent. Follow it exactly. Where a value is given, use that value.

**Reference:** https://afternow.co/ — editorial studio minimalism: big headlines + light body copy, hairline section dividers, grid work showcase with service tags + taglines, sticky nav, almost no ornament.

**CRITICAL:** the site will be opened directly from disk (`file://` protocol, no web server). All asset paths must be **relative**, and every image path containing spaces or `&` must be URL-encoded in the final `src` (space → `%20`, `&` → `%26`) or set via `encodeURI()` in JS so it resolves under `file://`.

---

## 1. Design Direction (read first)

A quiet, confident, editorial portfolio: warm cream canvas, one deep brand color *(originally forest green; amended 2026-07-05 to dark navy/royal blue — see §2.1)*, oversized Poppins headlines, generous whitespace, hairline dividers, and restrained scroll-reveal motion — the afternow.co mood. The work (colorful, varied) provides the color; the shell stays disciplined. Awwwards-level polish through spacing and typography, not decoration.

---

## 2. Design Tokens

Define all of these as CSS custom properties on `:root` in `css/style.css`.

### 2.1 Color palette — **AMENDED 2026-07-05: navy rebrand**

> **Amendment (2026-07-05).** Per client direction the site brand color moved from forest green to **dark navy / royal blue**, sampled from the new hero banner (`images/hero/Hero_banner.png`): royal highlight ≈ `#2B46E0`, deep navy shadow ≈ `#0B123F`, light-blue text accent `#9DB9F5`. Token **names were kept** (`--green-*`) so every existing usage across the 18 case-study pages, `css/style.css` and `js/main.js` stayed stable — only the values changed. Cream/ink/line tokens are untouched.

| Token | Hex | Usage |
|---|---|---|
| `--green-900` | `#0B123F` | Darkest navy — footer bg, Process band bg, modal image viewport bg |
| `--green-700` | `#2033B0` | **Primary brand navy (deep royal).** Buttons, active filter pill, headline accent words, links hover — anywhere white text sits on the brand color |
| `--green-500` | `#2B46E0` | Hover/active shift of green-700, focus outlines |
| `--accent` | `#2B46E0` | **Bright royal accent.** Eyebrow labels, step numbers, underlines, borders, large stat numbers |
| `--green-100` | `#E2E7F8` | Pale blue tint — tag pills bg, image placeholder bg |
| *(decor only)* | `#9DB9F5` | Light-blue accent from the banner — ONLY on dark navy surfaces (hero eyebrow, nav-over-hero hovers, constellation dots); never on cream |
| `--cream` | `#F5F4F0` | Page background (exact bg of the case study page) |
| `--surface` | `#EDECE8` | Tinted section bands, image placeholders (case study `--surface`) |
| `--white` | `#FFFFFF` | Cards, nav bar (scrolled), modal surface |
| `--ink-900` | `#0D0D0D` | Primary body/headline text (case study `--text`) |
| `--ink-600` | `#5A6157` | Secondary text, captions, taglines |
| `--ink-300` | `#9B9893` | Placeholder, disabled, footer meta (case study `--muted`) |
| `--line` | `rgba(0,0,0,0.09)` | 1px hairlines, card borders, section dividers (case study `--border`) |
| `--overlay` | `rgba(11, 18, 63, 0.92)` | Lightbox/modal backdrop |

Contrast (verified 2026-07-05, WCAG relative luminance): `--white` on `--green-700` = **9.71:1** (AAA); `--white` on `--green-500` = **6.87:1**; `--green-700` on `--cream` = **8.83:1** (safe for text at any size); `--accent` on cream = **6.25:1** (safe for labels and body text); `#9DB9F5` on `--green-900` = **9.12:1** (dark surfaces only). Body text is always `--ink-900`/`--ink-600`.

### 2.2 Typography

Load once in `<head>` (both families in one request, `display=swap`):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Noto+Sans+Thai:wght@400;500;600&display=swap" rel="stylesheet">
```

```css
--font-sans: 'Poppins', 'Noto Sans Thai', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
```

`Noto Sans Thai` is the Thai-capable fallback: any Thai glyphs render in it automatically while Latin stays Poppins. Do not use a separate class for Thai — the fallback chain handles it.

Type scale (desktop → mobile via `clamp()`; letter-spacing tightened on display sizes):

| Role | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| Display (hero name) | `clamp(2.75rem, 6vw, 4.75rem)` | 600 | 1.05 | `-0.02em` |
| H1 (section titles) | `clamp(2rem, 4vw, 3rem)` | 600 | 1.1 | `-0.015em` |
| H2 (card/modal titles) | `clamp(1.375rem, 2.5vw, 1.75rem)` | 600 | 1.2 | `-0.01em` |
| H3 (sub-heads) | `1.125rem` | 500 | 1.35 | `0` |
| Body | `1rem` (16px) | 400 | 1.7 | `0` |
| Body small | `0.875rem` | 400 | 1.6 | `0` |
| Caption / meta | `0.75rem` | 500 | 1.4 | `0.08em`, uppercase |
| Eyebrow label | `0.8125rem` | 600 | 1.4 | `0.16em`, uppercase, green-700 |

Max text measure: paragraphs `max-width: 62ch`.

### 2.3 Spacing scale

`--space-1: 0.25rem; --space-2: 0.5rem; --space-3: 0.75rem; --space-4: 1rem; --space-6: 1.5rem; --space-8: 2rem; --space-12: 3rem; --space-16: 4rem; --space-24: 6rem; --space-32: 8rem;`

- Section vertical padding: `--space-32` desktop, `--space-16` mobile.
- Content container: `max-width: 1200px`, side padding `clamp(1.25rem, 4vw, 3rem)`.
- Grid gaps: `--space-8` desktop, `--space-4` mobile.
- Sections on cream are separated by a 1px `--line` hairline rule (afternow style), except where a dark band provides its own separation.

### 2.4 Radius & shadows

```css
--radius-sm: 6px;   /* pills, buttons */
--radius-md: 12px;  /* cards, inputs */
--radius-lg: 20px;  /* modal, hero image mask */
--shadow-sm: 0 1px 2px rgba(11,18,63,.06), 0 1px 3px rgba(11,18,63,.08);
--shadow-md: 0 4px 12px rgba(11,18,63,.08), 0 2px 4px rgba(11,18,63,.05);
--shadow-lg: 0 24px 48px -12px rgba(11,18,63,.25);   /* modal, hovered card */
```

Motion tokens: `--ease-out: cubic-bezier(0.22, 1, 0.36, 1); --dur-fast: 180ms; --dur-med: 350ms; --dur-slow: 700ms;`

---

## 3. Page Structure (single page, in this order)

Anchor ids: `#work`, `#about`, `#services`, `#process`, `#contact`.

### 3.1 Nav (fixed)
- Fixed top bar, 72px tall, transparent over the cream hero; after `scrollY > 40` add `.is-scrolled`: background `rgba(255,255,255,.9)` + `backdrop-filter: blur(12px)` + bottom hairline `--line`. Text is `--ink-900` at all times (hero is light).
- Left: wordmark `ATOM®` (Poppins 600, 1.125rem; the `®` styled small, green-700).
- Right (desktop): links `Work / About / Services / Process / Contact` (Body small, weight 500) + a pill button `Let's talk` (green-700 bg, white text, radius-sm, hover green-500 + translateY(-1px)).
- Active section link gets a 2px green-700 underline (offset 6px). Use IntersectionObserver on sections to set it.
- Mobile ≤ 768px: links collapse into a hamburger (see §6.5).

### 3.2 Hero (light & editorial, afternow style)
- Min-height `100svh`, background `--cream` — **no dark hero band**. Optional: a very subtle radial `--green-100` glow at top-right, ≤ 40% opacity.
- Two-column layout (60/40) inside container, vertically centered:
  - **Left:** eyebrow `UX/UI & VISUAL DESIGNER — BANGKOK` (green-700, eyebrow style) → Display headline in `--ink-900`: `Atom designs products, brands & stories people remember.` with the words `products, brands & stories` in `--green-700` → one Body paragraph (`--ink-600`, ≤ 52ch): `Multidisciplinary designer with 10+ years across UX/UI, branding and campaign design for Thailand's leading tech, telecom and real-estate companies.` → two buttons: primary `View work` (green-700 bg, white text → scrolls to #work), ghost `Get in touch` (1px `--ink-900` border, ink text, hover: green-700 border + text → #contact).
  - **Right:** `images/hero/Atom-profile.jpg` in a rounded-rectangle mask (radius-lg), width ~380px, `object-fit: cover`, aspect 3/4, soft `--shadow-lg`. The photo's deep navy background acts as a natural color block against the cream — do not tint or blend it.
- Bottom-center: small scroll cue — a 1px × 48px `--ink-900` line animating scaleY (loop, 2s) + caption `SCROLL` (Caption, ink-600).
- Hero content animates in on load (staggered fade/rise, see §6.4).
- Hairline `--line` rule at hero's bottom edge.

### 3.3 About
- Bg `--cream`. Two columns: left sticky eyebrow `ABOUT` + H1 `Design that ships.`; right: two Body paragraphs (final copy comes from content.md by the Content Writer; these are placeholders):
  - `I'm Atom, a Bangkok-based designer working across the full spectrum — research-driven product UX, interface systems, brand identities and campaign visuals. My work spans government platforms, fintech-adjacent tools, NFT gaming and consumer brands.`
  - `I care about the unglamorous parts: information architecture, Thai/English typography, edge cases and handoff. Good design is the version that actually ships.`
- Below: a 4-up stat row (2×2 on mobile): `10+ Years experience` / `18 Selected projects` / `4 Disciplines` / `∞ Coffee` — number in H2 green-700, label in Caption ink-600.

### 3.4 Skills / Services (`#services`)
- White bg. Eyebrow `SERVICES` + H1 `What I do`.
- 4 cards in a responsive grid (4 → 2 → 1 columns): card = white, 1px `--line` border, radius-md, padding `--space-8`, hover: border-color green-100 + shadow-md + translateY(-4px).
- Cards (title H3 + Body small description + small tag pills in green-100 bg / green-700 text):
  1. **UX/UI Design** — Research, flows, wireframes and polished interfaces for web & mobile platforms. Tags: `Dashboards · Mobile apps · Design systems`
  2. **Branding** — Identity systems from logo to packaging that survive the real world. Tags: `Logo · Identity · Packaging`
  3. **Graphic Design** — Editorial, print and exhibition graphics with typographic care. Tags: `Editorial · Print · KV`
  4. **Marketing & Social** — Campaign key visuals and social content that perform. Tags: `Campaigns · Social · Content`
- Use inline SVG line icons (24px, stroke green-700, 1.5px stroke) — no icon font, no emoji.

### 3.5 Featured Work (`#work`) — the core section
- Cream bg. Eyebrow `SELECTED WORK` + H1 `Featured projects` + right-aligned filter bar.
- **Filter bar:** pill buttons `All · UX/UI Design · Branding · Graphic Design · Marketing & Social`. Default `All`. Style: Body small 500, padding 8px 18px, radius 999px; inactive = transparent bg, 1px `--line` border, ink-600 text; active = green-700 bg, white text, no border. Behavior in §6.2.
- **Grid:** CSS Grid, 3 columns desktop / 2 tablet / 1 mobile, gap `--space-8`. All 18 projects render at load (no pagination).
- **Card anatomy (afternow style):** figure with cover image (aspect-ratio 4/3, `object-fit: cover`, radius-md, bg `--green-100` while loading, `loading="lazy"`) → below: row of small **service tag pills** (green-100 bg, green-700 text, Caption size) → H2 project title (ink-900) → Body small one-line tagline (ink-600). Entire card is a button opening the modal (§6.3).
- **Card hover:** image scales to 1.04 inside overflow-hidden figure (`--dur-med`, `--ease-out`); a green-900/0→35% gradient overlay fades in from bottom with a white `View project →` label sliding up 8px; card lifts shadow-md. Title color → green-700.

### 3.6 Experience / Process (`#process`)
- **Dark band:** bg `--green-900`, white text — the visual counterweight to the light page.
- Eyebrow (green-100) `PROCESS` + H1 (white) `How I work`.
- Horizontal 4-step timeline (stacks vertically on mobile), each step: oversized step number `01–04` (Poppins 300, 3rem, green-100 at 40% opacity), H3 white title, Body small at 70% white:
  1. **Discover** — Stakeholder interviews, audits, and understanding what the business actually needs.
  2. **Define** — IA, user flows and the one sentence the design must say.
  3. **Design** — From wireframe to pixel-perfect UI or brand system, iterating with the team.
  4. **Deliver** — Specs, assets and support through build. Design isn't done until it ships.
- Steps connected by a 1px line at 15% white (desktop only).

### 3.7 Contact (`#contact`)
- White bg, centered, generous padding (`--space-32` top/bottom).
- Eyebrow `CONTACT` + Display-size headline `Let's make something worth shipping.` (ink-900, the word `shipping.` green-700) + Body line `Currently open to product design roles and select freelance projects.`
- Primary mailto button: `teevin.h@gmail.com` — green-700 pill, white text, H3 size, padding 16px 36px; hover green-500 + translateY(-2px) + shadow-md.
- Under it a small row of text links (Body small, ink-600, green-700 underline on hover): `LinkedIn · Behance · Dribbble` — developer: use `href="#"` placeholders, real URLs TBD from client.

### 3.8 Footer
- bg `--green-900`, padding `--space-12` vertical. Single row (stacks on mobile): left `© 2026 Atom — Bangkok, Thailand` (white 50%), right repeat of nav anchor links (white 70%, hover white). Caption size. Thin top border `rgba(255,255,255,.08)`.

---

## 4. Project Catalog (all 18 — data source of truth)

Implement as a JS array `PROJECTS` in `js/main.js`; render grid + modal from it.

⚠️ **File paths are EXACT as on disk** — many contain spaces, a `&`, mixed case, a **double space**, and a **space before the extension**. Keep raw strings in the JS array and set `img.src` via `encodeURI(path)` (and additionally replace `&` → `%26` if constructing URLs manually — `encodeURI` does NOT encode `&`, which is fine for `file://` srcs but be consistent). Never "clean up" a filename. Do **not** reference `.DS_Store`. `images/clients/logos/` is empty — do not use it. All paths relative (site opens via `file://`).

Categories (exact filter strings): `UX/UI Design`, `Branding`, `Graphic Design`, `Marketing & Social`.

**Taglines below are placeholders — the Content Writer's `content.md` is the final copy source. Structure and paths here are authoritative.**

| # | Display name | Category | One-liner | Cover image (exact path) |
|---|---|---|---|---|
| 1 | Baania | UX/UI Design | Full UX/UI for Thailand's real-estate marketplace — search, listings, price-estimate tools and analytics dashboards. | `images/projects/baania/Home-01.jpg` |
| 2 | Smart Utilities | UX/UI Design | Municipal water-utility platform: billing dashboard, OCR meter-reading handheld app and citizen payment flows. | `images/projects/smart-utilities/Dashboard.jpg` |
| 3 | TILOG Virtual Expo | UX/UI Design | Online business-matching platform for the TILOG-LOGISTIX trade event, with scheduling and video conferencing. | `images/projects/tivlog/home page.png` |
| 4 | True iService | UX/UI Design | Tablet POS app for telecom retail — guided SIM sale-order, package selection and identity verification flow. | `images/projects/true-iservice/Screen1.jpg` |
| 5 | M-Culture Big Data | UX/UI Design | Landing page and service UI for the Ministry of Culture's big-data platform, blending Thai pattern motifs with a modern layout. | `images/projects/MOC/Landing-page.png` |
| 6 | K-FLO | UX/UI Design | Bilingual corporate website for an industrial filtration brand, responsive across desktop, tablet and mobile. | `images/projects/k-flo/Mockup1.jpg` |
| 7 | Crypto Wushu Game | UX/UI Design | Website and game-asset design for an NFT martial-arts game — landing page, character cards and marketplace UI. | `images/projects/wushu Game/Landing page.png` |
| 8 | Neue Space Cafe | Branding | Cafe identity with a kraft-and-white graphic pattern system applied across logo, packaging and bags. | `images/projects/Nueu-Cafe/Bag.png` |
| 9 | Korner St. | Branding | Logo and supporting design elements for a neighborhood street-corner brand. | `images/projects/Korner st./logo.jpg` |
| 10 | Ordinary Bangkok | Branding | Minimalist identity and packaging for a Thai homeware label — "creatively ordinary" in kraft and white. | `images/projects/Ordinaly Bangkok/Package.jpg` |
| 11 | New Economy Academy | Branding | Full identity for a government learning academy: logo, color system, graphic style and print collateral. | `images/projects/new-economy-academy/NEA_FULL_LOGO.png` |
| 12 | Craftman Roastery | Branding | Brand and retail graphics for a specialty coffee roaster — cafe design, window display and exhibition booth. | `images/projects/craftman-roastery/Craftman cafe  design.png` |
| 13 | Bangkok University Bulletin | Graphic Design | Editorial design for BU International's bulletin, wrapped in a low-poly world-map cover illustration. | `images/projects/Bangkok University Bullentin/Cover-Bangkok University Bullentin.png` |
| 14 | DCA Book | Graphic Design | Book and poster design for a DCA investment publication, with launch reward materials. | `images/projects/dca-book/Book&Poster.png` |
| 15 | TCEB × Thai Airways | Graphic Design | Leaflet and banner set for the TCEB & TG "Optimice Pass" MICE-travel campaign. | `images/projects/Tceb/AW_TCEB&TG_Optimice Pass_leaflet_A5-PREVIEW.jpg` |
| 16 | NT Life Smart Solutions | Graphic Design | Campaign collateral for NT Digital Solutions — six "Smart" key visuals plus brochures and roll-up banners. | `images/projects/nt-life/KV/Smart-Business.jpg` |
| 17 | CAT Market 4.0 | Marketing & Social | Event campaign for CAT e-business — key visual, activity roadmap, lucky-draw and social post series. | `images/projects/cat-marketing/Key visual.jpg` |
| 18 | Social Media Content | Marketing & Social | Ongoing social content for major brands including 7-Eleven, SCG, Arabus, Weber and Thailand Trust Mark. | `images/projects/social-media/7-11.jpg` |

**Gallery images per project** (modal shows cover first, then these, in this order — exact paths):

1. **Baania**: `images/projects/baania/Hero banner.png`, `images/projects/baania/listing.jpg`, `images/projects/baania/feature_desktop.jpg`, `images/projects/baania/Feature_screen.png`, `images/projects/baania/estimate.jpg`, `images/projects/baania/estimate2.jpg`, `images/projects/baania/chat.jpg`, `images/projects/baania/Plan.png`, `images/projects/baania/Dashboard_1.jpg`, `images/projects/baania/Dashboard_2.jpg`, `images/projects/baania/Dashboard_3.jpg`, `images/projects/baania/Mobile.png`
2. **Smart Utilities**: `images/projects/smart-utilities/Citizen.jpg`, `images/projects/smart-utilities/Handheld.jpg`, `images/projects/smart-utilities/OCR_1.png`, `images/projects/smart-utilities/OCR_2.png`, `images/projects/smart-utilities/OCR_3.png`, `images/projects/smart-utilities/pay.jpg`, `images/projects/smart-utilities/Water_2.3.jpg`, `images/projects/smart-utilities/add user.png`, `images/projects/smart-utilities/Design element.png`
3. **TILOG Virtual Expo**: `images/projects/tivlog/Choose company.jpg`, `images/projects/tivlog/schedule.jpg`, `images/projects/tivlog/VDO_conference.jpg`, `images/projects/tivlog/Screen.png`
4. **True iService**: `images/projects/true-iservice/Catalog.png`, `images/projects/true-iservice/Sim.png`, `images/projects/true-iservice/Vertify.png`
5. **M-Culture Big Data**: (cover only — single image project)
6. **K-FLO**: `images/projects/k-flo/Landing.jpg`, `images/projects/k-flo/Category.png`, `images/projects/k-flo/Choose-Product.png`, `images/projects/k-flo/Mockup2.png`
7. **Crypto Wushu Game**: `images/projects/wushu Game/Card Design 1.png`, `images/projects/wushu Game/Card Design 2.png`, `images/projects/wushu Game/Card Design 3.png`, `images/projects/wushu Game/Card Design 4.png`, `images/projects/wushu Game/Card Design 5.png`, `images/projects/wushu Game/Character ability.png`, `images/projects/wushu Game/Marketplace_Item.png`, `images/projects/wushu Game/205.jpg`
8. **Neue Space Cafe**: `images/projects/Nueu-Cafe/Logo.png`, `images/projects/Nueu-Cafe/Package.png`, `images/projects/Nueu-Cafe/Design-Style.png`, `images/projects/Nueu-Cafe/Graphic_Style.png`
9. **Korner St.**: `images/projects/Korner st./Design element.jpg`
10. **Ordinary Bangkok**: `images/projects/Ordinaly Bangkok/logo ordinary bangkok-01.png`
11. **New Economy Academy**: `images/projects/new-economy-academy/logo_NEA-01.png`, `images/projects/new-economy-academy/Color.png`, `images/projects/new-economy-academy/NEA Graphic Style.png`, `images/projects/new-economy-academy/Concept_NEA.jpeg`, `images/projects/new-economy-academy/Concept NEA_2.png`, `images/projects/new-economy-academy/NEA Leaflet.png`
12. **Craftman Roastery**: `images/projects/craftman-roastery/window display.png`, `images/projects/craftman-roastery/exhibition.png`, `images/projects/craftman-roastery/Picture .png` ← note the space **before** `.png`
13. **Bangkok University Bulletin**: `images/projects/Bangkok University Bullentin/Inside.png` (folder name is misspelled "Bullentin" on disk — keep it)
14. **DCA Book**: `images/projects/dca-book/Reward.png`
15. **TCEB × Thai Airways**: `images/projects/Tceb/banner jpeg.PNG` ← uppercase `.PNG`
16. **NT Life Smart Solutions**: `images/projects/nt-life/KV/Smart-Education.jpg`, `images/projects/nt-life/KV/Smart-Environment.jpg`, `images/projects/nt-life/KV/Smart-Healthcare.jpg`, `images/projects/nt-life/KV/Smart-Industrial.jpg`, `images/projects/nt-life/KV/Smart-Tracking.jpg`, `images/projects/nt-life/BROCHURE/mockup.jpg`, `images/projects/nt-life/BROCHURE/Brochure_6Business_202111_09-01.jpg`, `images/projects/nt-life/BROCHURE/Brochure_6Business_202111_09-02.jpg`, `images/projects/nt-life/BROCHURE/Leaflet/leaflet mock up.png`, `images/projects/nt-life/BROCHURE/Leaflet/Brochure_eDoc_Finale-01.jpg`, `images/projects/nt-life/BROCHURE/Leaflet/Brochure_eDoc_Finale-02.jpg`, `images/projects/nt-life/Roll-up/RollUp_6B_20211130.jpg`
17. **CAT Market 4.0**: `images/projects/cat-marketing/Roadmap.png`, `images/projects/cat-marketing/event.jpeg`, `images/projects/cat-marketing/event 2.jpg`, `images/projects/cat-marketing/Lucky1.jpg`, `images/projects/cat-marketing/Lucky2.jpg`, `images/projects/cat-marketing/Lucky3.jpg`, `images/projects/cat-marketing/example_post1.jpg`, `images/projects/cat-marketing/example_post2.jpg`, `images/projects/cat-marketing/reward post.jpg`
18. **Social Media Content**: `images/projects/social-media/Arabus.jpg`, `images/projects/social-media/Cat e-Business.jpg`, `images/projects/social-media/Foodhunt.jpg`, `images/projects/social-media/SCG.jpg`, `images/projects/social-media/Thailand trust mark.png`, `images/projects/social-media/The agent.png`, `images/projects/social-media/Weber.jpg`

Tricky-filename checklist (verify byte-for-byte): `Craftman cafe  design.png` (TWO spaces between "cafe" and "design"), `Picture .png` (space before dot), `AW_TCEB&TG_Optimice Pass_leaflet_A5-PREVIEW.jpg` (`&`), `banner jpeg.PNG` (uppercase ext), `Korner st.` / `Ordinaly Bangkok` / `wushu Game` / `Bangkok University Bullentin` (folder names with spaces/dots/misspellings — use as-is).

---

## 5. Responsive Breakpoints

Mobile-first CSS. Breakpoints:

| Name | Media query | Layout changes |
|---|---|---|
| Mobile (base) | `< 600px` | 1-col everything; hero stacks (text above photo, photo max-width 280px); nav → hamburger; filter bar horizontally scrollable (`overflow-x: auto`, no wrap, hidden scrollbar); section padding `--space-16` |
| Tablet | `≥ 600px` | Work grid 2 cols; services 2 cols; stats 4-up |
| Desktop | `≥ 900px` | Work grid 3 cols; hero 2-col; services 4 cols; process horizontal; full nav links |
| Wide | `≥ 1440px` | Container capped at 1200px (no further scaling); Display type at clamp max |

Also: `html { scroll-behavior: smooth; }` with `scroll-padding-top: 88px` (fixed nav offset). Test at 375px, 768px, 1280px, 1440px.

---

## 6. Interaction Spec

### 6.1 Hover states (desktop; all transitions `--dur-fast`–`--dur-med` with `--ease-out`)
- Nav links: color → green-700 + 2px green-700 underline animating scaleX 0→1 from left.
- Buttons: see per-button notes (§3); all buttons get `translateY(-1px..-2px)` + shadow bump; `:active` returns to 0.
- Project cards: §3.5. Filter pills (inactive): border → green-500, text → green-700.
- All interactive elements: visible `:focus-visible` outline `2px solid var(--green-500), offset 3px`. Never remove outlines without this replacement.

### 6.2 Category filter
- Buttons carry `data-filter="All | UX/UI Design | Branding | Graphic Design | Marketing & Social"`; cards carry `data-category`.
- On click: move `.is-active` to clicked pill; non-matching cards get class `.is-hidden` → animate `opacity 0 + scale(.96)` over 250ms, then `display: none` (use `transitionend` or a 260ms timeout); matching hidden cards restore `display`, then next frame remove the class to fade/scale back in. Grid reflow thus animates as a soft crossfade — no external FLIP library required.
- Exactly one pill active at all times; re-clicking active pill does nothing. Filter state does not persist on reload. Update an `aria-pressed` attribute on pills.

### 6.3 Project detail modal (lightbox with gallery)
- Clicking a card opens a modal built from the `PROJECTS` entry. Structure: full-screen fixed wrapper → backdrop (`--overlay`, click closes) → centered panel (white, radius-lg, `max-width: 960px`, `max-height: 90vh`, shadow-lg, internal scroll).
- Panel content: main image viewport (bg `--green-900`, `max-height: 62vh`, image `object-fit: contain` — artwork aspect ratios vary wildly, never crop in the modal) → prev/next arrow buttons (44px circular, white 90% bg, green-900 icon, absolutely positioned mid-left/right) → below: image counter `3 / 12` (Caption), thumbnail strip (64px squares, `object-fit: cover`, radius-sm, horizontal scroll; active thumb = 2px green-700 border), then service tag pills, H2 title, Body description.
- Open animation: backdrop fades in 250ms; panel `opacity 0→1` + `translateY(24px)→0` + `scale(.98)→1`, 350ms `--ease-out`. Close reverses at 200ms.
- Controls: close ✕ (top-right inside panel, 44px hit area), `Esc` closes, backdrop click closes, `←`/`→` keys navigate images, thumbnails jump. Gallery does not loop (disable arrows at ends, 40% opacity).
- Accessibility: `role="dialog" aria-modal="true"` labelled by the title; focus moves to close button on open, is trapped inside (cycle Tab), and returns to the originating card on close. Lock body scroll while open (`overflow: hidden` on `<html>`; compensate scrollbar width to avoid layout jump).
- Preload next/previous gallery image when one is shown (simple `new Image().src = …`).
- Single-image projects (M-Culture Big Data): hide arrows, counter and thumbnail strip.

### 6.4 Scroll-reveal animation
- Pattern: elements with `.reveal` start `opacity: 0; transform: translateY(28px);` and get `.is-visible` (→ `opacity 1, translateY(0)`, `--dur-slow`, `--ease-out`) via a single `IntersectionObserver` (`threshold: 0.12`, `rootMargin: '0px 0px -8% 0px'`), unobserved after firing (reveal once, no re-hide).
- Apply to: every section header block, each service card, each project card, each process step, contact block. Stagger siblings via `transition-delay: calc(var(--i) * 70ms)` with `--i` set inline (cap staggering at 6; items 7+ share the last delay).
- Hero (load, not scroll): eyebrow → headline → paragraph → buttons → photo, staggered 90ms apart, starting 100ms after `DOMContentLoaded`.
- **Reduced motion:** wrap all reveal/looping animation in `@media (prefers-reduced-motion: no-preference)`. With reduced motion: everything visible immediately, transitions ≤ 1ms, scroll cue static, modal fades only.

### 6.5 Mobile nav
- ≤ 768px: hamburger button (44×44, three 1.5px ink bars) replaces links. Tap: full-screen overlay panel (bg `--green-900` at 98%) slides/fades in 300ms; links stacked, H2 size, white, staggered 60ms; `Let's talk` pill below (white bg, green-900 text); close by ✕ (hamburger morphs to ✕ via bar transforms), link tap, or `Esc`. Lock body scroll while open. `aria-expanded` on the button, focus trapped in panel.

### 6.6 Misc
- Smooth-scroll for all anchor links (native CSS; JS `scrollIntoView` fallback unnecessary).
- All images: `loading="lazy"` except hero photo (`fetchpriority="high"`); always set `alt` = project name + image role (e.g. `"Baania — listing page UI"`).
- No parallax, no cursor followers, no auto-playing carousels — restraint is the brief.

---

## 7. Case study page integration (client-provided content)

> **Amendment (2026-07-03):** the client supplied case-study pages for 13 projects in `images/Content/` and requested that **all 18 projects navigate to their own case-study page — the lightbox modal is removed entirely** (§6.3 no longer applies). The 13 provided pages are adapted to the project root (font stack, tokens, unified nav); 5 more are generated in the same template: `moc.html`, `korner-st.html`, `ordinary-bangkok.html`, `bangkok-university-bulletin.html`, `tceb.html`. Hero headline replaced with the client-specified line: “Where insights meet empathy, ensuring every data point drives business success and user happiness.” (accent on “insights” and “empathy”).

The client supplied a finished case-study page at `images/Content/smart-utilities.html` and said its content may be used. It contains verified facts that are the **source of truth** for copy:

- Full name: **Teevin "Atom" Hiranlertprasert** · email `teevin.h@gmail.com` · phone `+66 094-425-4159` (tel:+660944254159)
- Smart Utilities: Lead UX/UI Designer, Smart Utilities Co., Ltd., 2020–2022; deliverables UX Research · Handheld App · Citizen Portal · Admin Dashboard; outcome: Koh Samui district monthly revenue ฿900,000 → ฿8,000,000 (**8.9×**) with no added staff; 3 user groups; 100% digital receipts.

Developer tasks:
1. **Copy** the file to the project root as `smart-utilities.html` (its `images/projects/...` paths and `index.html` links only resolve from root). Keep all content; make these edits:
   - Restyle its `:root` tokens to this spec's palette (it's already cream+green, so only minor value changes) and swap the `Inter` font for the site stack (Poppins + Noto Sans Thai).
   - Bottom prev/next links point to `nt-smart-life.html` / `cat-marketing.html` which do **not** exist — replace that bottom nav with a single centered `← Back to all projects` link to `index.html#work`.
   - Align nav markup/wordmark with the main site's nav (same links, logo `ATOM®` or `Atom.` — pick one wordmark and use it on BOTH pages).
2. On `index.html`, the **Smart Utilities** card links to `smart-utilities.html` (navigate, not modal). Add a small `Case study ↗` badge to that card. All other 17 projects keep the lightbox modal behavior.
3. Footer of index.html uses the real name `© 2026 Teevin "Atom" Hiranlertprasert` and includes Email + Phone links as in the case study footer.

---

## 8. Developer checklist (definition of done)
1. All 18 projects render; filter counts: All 18 / UX/UI 7 / Branding 5 / Graphic 4 / Marketing & Social 2.
2. Every image path resolves with zero broken images **when index.html is opened directly via `file://`** (spaces/`&`/case URL-encoded correctly).
3. No layout shift from image loads (aspect-ratio boxes reserved), fonts swap cleanly.
4. Keyboard-only pass: nav → filters → cards → modal → contact all reachable and operable; focus visible everywhere.
5. `prefers-reduced-motion` respected.
6. Deliverables: `index.html` + `css/style.css` + `js/main.js` + `smart-utilities.html` (adapted case study at root), no external JS.
7. All copy taken from `content.md` (Content Writer's deliverable), not the placeholders in this spec.
8. Smart Utilities card navigates to `smart-utilities.html`; that page's images all resolve and its nav/back links return to `index.html`.
