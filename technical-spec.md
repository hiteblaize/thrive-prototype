# Technical Specification — Carda Health "Thrive" Prototype

**Audited by:** Staff Engineer review  
**Codebase path:** `/Users/blaize/Documents/Code/business_experiment1/`  
**Date:** 2026-05-04

---

## 1. Architecture Overview

This is a **static HTML prototype** — a clickable demo of a GLP-1 companion mobile app called "Thrive" by Carda Health. It is not a web app in any engineering sense. There is no server, no build system, no framework, no bundler, no component abstraction, and no shared CSS. Every screen is a self-contained `.html` file with all its HTML, CSS, and JavaScript inlined.

The prototype simulates a single day (Day 14) of a named patient ("Bexli") on a GLP-1 program. State is persisted via `localStorage` to simulate session continuity between screens. The app is designed to be viewed at 390px width (iPhone 15 form factor) and renders a phone shell on a desktop background, making it clear this is a demonstration artifact, not a deployed product.

---

## 2. File Structure

**Root-level screens (17 HTML files):**

| File | Purpose |
|---|---|
| `index.html` | 2-line redirect to `preview.html` via `<meta http-equiv="refresh">` |
| `preview.html` | Home dashboard. 1,428 lines. The core of the app. |
| `checkin.html` | 4-step morning check-in flow (vitals → nausea → symptoms/appetite → completion) |
| `article.html` | Today's educational read with thumbs-up/down rating |
| `meal.html` | Protein tracker + hydration logger (hand-portion UI) |
| `session.html` | Live resistance training session screen (coach video feed mock) |
| `lifestyle-session.html` | Live lifestyle coaching session screen |
| `evening.html` | Evening wrap-up flow (gratitude → hunger → sleep prep → completion) |
| `progress.html` | Progress tab: week/phase views with charts and stats |
| `chat.html` | Chat hub listing Cardi, Coach Haley, Coach Maya |
| `cardi-insight.html` | Scripted branching chat with AI assistant "Cardi" about food noise |
| `coach.html` | Cardi AI chat screen (separate entry point from cardi-insight) |
| `haley.html` | Coach Haley profile/intro page |
| `haley-chat.html` | Coach Haley direct message thread |
| `maya.html` | Coach Maya profile/intro page |
| `dr-chat.html` | Dr. Priya Nair message thread |
| `care.html` | Care team overview + roadmap/journey view |
| `preview_backup.html` | Old version of `preview.html` (dead code, should be removed) |
| `progress_backup.html` | Old version of `progress.html` (dead code, should be removed) |

**Design system directory (`design-system/`):**

| Path | Purpose |
|---|---|
| `colors_and_type.css` | The canonical design token file — CSS custom properties for colors, typography, spacing, radii, shadows, motion |
| `preview/*.html` | 14 static preview pages for the design system |
| `ui_kits/patient-mobile/` | React JSX ui kit components (not used by the prototype) |
| `ui_kits/patient-tablet/` | React JSX tablet ui kit (not used) |
| `ui_kits/provider-portal/` | React JSX provider portal (not used) |
| `uploads/` | Font files (OTF/TTF) and pasted images |
| `assets/` | SVG logos and PNGs |

**Build/tooling:**

| File | Purpose |
|---|---|
| `package.json` | Single `devDependency`: puppeteer |
| `screenshot.mjs` | Puppeteer script capturing 9 screens to `exports/` |
| `.gitignore` | Ignores `design-system/fonts/`, `node_modules/`, `exports/`, `.DS_Store` |

---

## 3. Data Layer

All state is `localStorage`-based. No server, no auth, no user ID. The entire state represents a single hardcoded day (Day 14) for a single hardcoded user (Bexli).

**Keys:**

| Key | Written by | Shape |
|---|---|---|
| `carda_checkin` | `checkin.html` | `{ nauseaScore, appetiteChoice, symptoms[], severity, completedAt }` |
| `carda_protein` | `meal.html` | `{ logged, goal, lastUpdated }` |
| `carda_hydration` | `meal.html` | `{ glasses, goal: 8 }` |
| `carda_article` | `article.html` | `{ read: true, rating, readAt }` |
| `carda_exercise` | `session.html` | `{ completed: true, completedAt }` |
| `carda_lifestyle` | `lifestyle-session.html` | `{ completed: true, completedAt }` |
| `carda_evening` | `evening.html` | `{ gratitude, hungerScore, foodNoise[], sleepChecks[], completedAt }` |

**Score calculation:**

The Thrive Score is computed in `preview.html` and `progress.html`:

- Check-in done: +20
- Protein at goal: +35, partial: +15
- Article read: +10
- Exercise completed: +40
- Lifestyle completed: +25
- **Total possible raw: 130**, scaled to 0–100 via `Math.round((raw / 130) * 100)`

`evening.html` has its own `computeThrive()` using a completely different formula (max raw 65). The two implementations are not reconciled.

---

## 4. Navigation and Routing

Navigation is implemented via raw `<a href="...">` links and `window.location.href` assignments. No router.

**Bottom nav inconsistencies:**

- `preview.html`: Home (active), Chat, Progress ✓
- `progress.html`: Home, Chat, Progress (active) ✓
- `chat.html`: Home, Chat (active), Progress ✓
- `checkin.html`: Home, Progress, **Cardi** ← wrong third tab, non-functional items
- `care.html`: Four tabs (Home, Progress, Cardi, Care) ← unique, appears nowhere else

**Post-completion navigation:**

All screens navigate back to `preview.html` on completion — except `evening.html`, which goes to `coach.html` (Cardi). This may be intentional UX (dropping the user into a post-wrap-up conversation) but is undocumented.

---

## 5. Design System

The canonical design system lives in `design-system/colors_and_type.css`. It is comprehensive and well-structured. **However, it is not used by any prototype screen.** Every `.html` file re-declares the same CSS custom properties from scratch.

**Color tokens:**

| Variable | Value |
|---|---|
| `--c-dark-green` | `#142E0F` |
| `--c-lime` | `#D8E73C` |
| `--c-citrus` | `#FB6E28` |
| `--c-plum` | `#C7B9FF` |
| `--c-sky` | `--c-sky: #97DDF7` |
| `--c-natural` | `#F4F0EB` |
| `--c-dg-08/30/60` | Opacity variants of dark green |

**Fonts:** ABC Marist SemiBold (display) + Circular Std 4 weights (UI). Font files live in `design-system/uploads/` but are referenced as `design-system/fonts/` in all HTML — the `fonts/` directory is gitignored and must be manually populated.

**Page background colors (inconsistent, no variable):**
- Most pages: `#f0ede8`
- `checkin.html`, `meal.html`: `#e8e4df`
- `evening.html`: `#1a1a2e` (dark/night mode intent)
- `session.html`, `lifestyle-session.html`: `#0a0a0a`

---

## 6. Component Patterns

The following patterns appear repeatedly but are re-implemented from scratch each time:

- **Phone shell** — `.phone { width: 390px; min-height: 844px; border-radius: 48px }` — identical across all files
- **Status bar** — same 54px structure with signal/WiFi/battery SVGs — copy-pasted 17+ times
- **Bottom nav** — same CSS, different items per screen
- **`.btn-primary`** — same class name, different padding in different files
- **`.chip`** — same class name, `checkin.html` uses `padding: 9px 15px`, `evening.html` uses `padding: 8px 14px`
- **Step wizard** — `checkin.html` toggles `.hidden`, `evening.html` toggles `.active` — opposite conventions

Card border-radius varies by file: `preview.html` uses `32px`, `checkin.html` and `progress.html` use `28px`, `evening.html` uses `20px`. All called `.card`.

---

## 7. JavaScript Patterns

All JS is inline `<script>` at the bottom of each HTML file. No shared JS files.

**IIFE pattern:** `preview.html` uses 8 separate IIFEs for isolation. Reasonable given inline scripting, but each re-reads the same localStorage keys independently rather than computing once.

**Notable issues:**

- `renderCompletion()` and `saveThenDone()` in `checkin.html` both compute severity independently — the same `if/else if/else` block appears twice (lines 967–975 and 1022–1030). If one diverges, the displayed value and saved value could differ.
- `session.html` and `lifestyle-session.html` write `completed: true` to localStorage **on page load**, not on button click. Navigating to either page and immediately leaving marks that task as done.
- `evening.html` contains `const origGoToStep = goToStep` before `goToStep` is defined — `origGoToStep` is `undefined` and is never used. Dead code from a copy-paste artifact.
- `lifestyle-session.html` end button: `document.querySelector('.ctrl-btn .ctrl-icon.danger')` — the `.danger` class doesn't match the HTML structure; the selector silently fails. The end button may not be functional.
- `cardi-insight.html` timestamps all user messages as `'9:41 AM'` regardless of actual time.
- **Pretext CDN dependency:** `preview.html` imports `@chenglou/pretext` from `https://esm.sh` for text layout. This introduces a live internet dependency in a local demo.

---

## 8. Technical Debt and Inconsistencies

1. **Every page redeclares the entire design system from scratch.** ~200–400 lines of verbatim-duplicate CSS per file across 17 files. The canonical `design-system/colors_and_type.css` exists but zero prototype screens use it.

2. **Three independent scoring implementations.** `preview.html`, `progress.html`, and `evening.html` each contain their own score formula. The evening formula uses different weights and a different maximum than the other two.

3. **Session completion fires on page load, not on user action.** Both `session.html` (line 725) and `lifestyle-session.html` (line 527) mark themselves complete the moment the page is visited. The full playlist can be "completed" by opening each session page and immediately navigating away.

4. **Duplicate severity logic in `checkin.html`.** The nausea/appetite severity formula appears twice in the same file and is not shared between the two occurrences.

5. **`haley.html` and `maya.html` are missing color tokens.** `haley.html` only defines 7 of 11 color variables; `maya.html` defines 9. References to missing tokens render as transparent.

6. **`checkin.html` bottom nav items are non-functional.** Home and Progress `div`s have `role="button"` but no `onclick` or `href`.

7. **`care.html` has a 4-item nav** that appears nowhere else in the app.

8. **Two backup files committed to main.** `preview_backup.html` and `progress_backup.html` are live in the repo.

9. **`session.html` asset mismatch.** `src="/design-system/assets/coach-michelle.png"` with `alt="Coach Haley"`. The absolute path will also 404 on GitHub Pages.

10. **The status bar shows hardcoded times** (`9:41`, `7:14 AM`, `2:07 PM`, `9:02 PM`) that do not update. `preview.html` uses `new Date().getHours()` for the greeting but never updates the status bar time — two different time sources in the same screen.

---

## 9. What's Missing (vs. Production)

- **Authentication and user identity** — user is hardcoded as "Bexli" in every string
- **Multi-day state** — no concept of daily reset, historical data, or Day 15
- **Real vitals integration** — BP, SpO2, HR, weight are all hardcoded HTML strings
- **Real AI** — Cardi is a scripted 7-node decision tree
- **Error states** — no validation feedback, no empty states, no network error handling
- **Accessibility** — ARIA roles inconsistently applied; interactive `div`s without `button` semantics; no focus management in wizard transitions
- **Responsive design** — viewport locked to `width=390` — only renders correctly at exactly iPhone 15 width
- **Build pipeline** — no Sass, PostCSS, Tailwind, or any CSS sharing mechanism
- **Date awareness** — "Day 14" is a string constant everywhere; `new Date().getDate()` is never called
- **HIPAA compliance** — symptom data written to `localStorage` in plaintext with no encryption, expiry, or consent mechanism

---

## 10. Recommendations for Engineering Handoff

1. **Do not port this code.** Treat the HTML files as design specs only. The structural problems (CSS duplication, duplicate business logic, broken components) are easier to avoid in a fresh build than untangle from 12,000 lines of copy-pasted HTML.

2. **`design-system/colors_and_type.css` is the only reusable artifact.** It is well-structured and represents real design intent. Port its tokens into a Tailwind config or CSS module system.

3. **Define the scoring formula once.** Three independent implementations must collapse into a single canonical function.

4. **The `localStorage` key schema maps cleanly to API models.** The 7 keys correspond to 7 data models: CheckIn, ProteinLog, HydrationLog, ArticleRead, ExerciseSession, LifestyleSession, EveningWrapUp.

5. **Gate session completion on user action, not page load.** Both session screens write completion records on entry, not on the end-session button click.

6. **The bottom nav needs a single source of truth.** Three tabs: Home, Chat, Progress. Define once as a component with active state passed as a prop.

7. **Font path will recur as a deployment issue.** Fonts are gitignored and referenced via `design-system/fonts/`. Host with the app bundle or serve from a CDN.

8. **`cardi-insight.html` is the most valuable UX reference.** The branching dialogue tree is clean and gives a clear mental model for how scripted AI flows should feel. Use it as the UX template for a real LLM-backed chat.

9. **Confirm `evening.html`'s navigation to `coach.html` on completion.** It is the only screen that doesn't return to the home dashboard — this may be intentional (drops the user into a Cardi post-wrap-up chat) but is undocumented.

10. **The prototype represents a single user, single day, single program state.** The real app must handle Day 1 vs. Day 90, multiple phases, different GLP-1 medications, missed days, and varied user profiles. None of that complexity is represented here — plan for it early.
