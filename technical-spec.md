# Technical Specification — Carda Health "Thrive" Prototype

**Audited by:** Staff Engineer review  
**Codebase path:** `/Users/blaize/Documents/Code/business_experiment1/`  
**Date:** 2026-05-04

---

## 1. Architecture Overview

This is a **static HTML prototype** — a clickable demo of a GLP-1 companion mobile app called "Thrive" by Carda Health. It is not a web app in any engineering sense. There is no server, no build system, no framework, no bundler, no component abstraction, and no shared CSS. Every screen is a self-contained `.html` file with all its HTML, CSS, and JavaScript inlined.

The prototype simulates a single day (Day 14) for a single hardcoded patient ("Bexli") in Phase 1 of the program. State is persisted via `localStorage` to simulate session continuity between screens. The app renders at a fixed 390px width (iPhone 15 form factor) inside a phone shell on a desktop background — it is explicitly a presentation artifact, not a deployable product.

**Stack summary:**
- Language: HTML/CSS/JavaScript (vanilla, no framework)
- State: browser `localStorage` only
- External dependencies: 1 (Pretext CDN, used in one file)
- Build tools: none (Puppeteer used only for screenshot export)
- Hosting: GitHub Pages (static file serving)

---

## 2. File Structure

### Root-level screens

| File | Purpose | Lines |
|---|---|---|
| `index.html` | 2-line meta-refresh redirect to `preview.html` | 2 |
| `preview.html` | Home dashboard — the core screen, all state logic | ~1,430 |
| `checkin.html` | 4-step morning check-in wizard (vitals → nausea → appetite/symptoms → done) | ~1,100 |
| `article.html` | Daily educational read with thumbs up/down rating | ~600 |
| `meal.html` | Protein tracker + hydration logger (hand-portion visual UI) | ~800 |
| `session.html` | Live resistance training session screen (coach video mock) | ~750 |
| `lifestyle-session.html` | Live lifestyle coaching session screen | ~650 |
| `evening.html` | 4-step evening wrap-up wizard (gratitude → hunger → sleep → done) | ~900 |
| `progress.html` | Progress tab: week/phase charts and stats | ~950 |
| `chat.html` | Chat hub inbox: Cardi, Coach Haley, Coach Maya | ~340 |
| `cardi-insight.html` | Scripted branching AI conversation about food noise | ~500 |
| `coach.html` | Cardi AI free-form chat screen | ~700 |
| `haley.html` | Coach Haley intro/profile + session scheduling thread | ~600 |
| `haley-chat.html` | Coach Haley extended message thread | ~500 |
| `maya.html` | Coach Maya intro/profile + session preview thread | ~550 |
| `dr-chat.html` | Dr. Priya Nair message thread | ~450 |
| `care.html` | Care team overview + program journey roadmap | ~700 |
| `preview_backup.html` | Dead code — old version of preview.html | ~1,400 |
| `progress_backup.html` | Dead code — old version of progress.html | ~900 |

### Design system directory

| Path | Purpose |
|---|---|
| `design-system/colors_and_type.css` | Canonical design token file — CSS custom properties for colors, type, spacing, radii, shadows, motion. **Not imported by any prototype screen.** |
| `design-system/preview/*.html` | 14 static design system preview pages (colors, typography, components) |
| `design-system/ui_kits/patient-mobile/` | React JSX ui kit — `index.jsx`, `screens.jsx`, `ios-frame.jsx`, `design-canvas.jsx`. Not used by prototype. |
| `design-system/ui_kits/patient-tablet/` | React JSX tablet ui kit. Not used. |
| `design-system/ui_kits/provider-portal/` | React JSX provider portal. Not used. |
| `design-system/uploads/` | Font files (OTF/TTF) and pasted images from design process |
| `design-system/assets/` | SVG brand logos, patient avatar PNG |

### Build/tooling

| File | Purpose |
|---|---|
| `package.json` | Single `devDependency`: `puppeteer ^24.42.0` |
| `screenshot.mjs` | Puppeteer script — captures 9 screens, saves to `exports/` at 2x deviceScaleFactor |
| `.gitignore` | Excludes `design-system/fonts/`, `node_modules/`, `exports/`, `.DS_Store` |
| `design-brief.md` | Product design brief |
| `technical-spec.md` | This document |
| `README.md` | Repo overview and setup instructions |

---

## 3. Third-Party Services, Databases, and Platform Integrations

### Current integrations

| Service | Where used | How it's used | Quality of implementation |
|---|---|---|---|
| **Pretext (`@chenglou/pretext`)** | `preview.html` line 1113, `preview_backup.html` line 1042 | Imported via CDN (`https://esm.sh/@chenglou/pretext`) as an ES module. Used for precise text height measurement on 5 task name label elements to prevent text overflow. | **Poor.** This is an experimental, low-adoption library with no versioning pin (`esm.sh` serves latest). The prototype will silently break if the CDN is unavailable or the API changes. The use case (measuring 5 text labels) does not justify a live network dependency. The implementation is wrapped in `try/catch` which degrades gracefully, but the dependency itself is unnecessary — CSS alone can solve this. |
| **Puppeteer** | `screenshot.mjs` (dev tooling only) | Used as a `devDependency` to automate screenshot exports of all 9 screens at 2x scale. Not used at runtime. | **Appropriate.** This is a legitimate use of Puppeteer for a prototype workflow. Pinned to a specific major version. The script is clean and well-structured with localStorage setup/teardown between shots. No issues. |
| **GitHub Pages** | Deployment | Hosts the static files at `hiteblaize.github.io/thrive-prototype`. Enabled via the `main` branch setting in repo settings. | **Appropriate for the use case.** Free, zero-config static hosting. The only concern is that the repo is currently public, which exposes all source files. The font directory is gitignored (correct), but all HTML logic, design patterns, and copy are visible to anyone. |

### External dependencies explicitly absent

The following services are **not** integrated, despite being referenced in the design brief or implied by the clinical scope:

| Category | Service | Status |
|---|---|---|
| Analytics | Mixpanel, Amplitude, Segment | None |
| Error monitoring | Sentry, Datadog | None |
| Auth | Auth0, Firebase Auth, Cognito | None |
| Database | Supabase, Firebase, PostgreSQL | None — `localStorage` only |
| Push notifications | FCM, APNs | None |
| Video sessions | Twilio, Daily.co, Zoom SDK | None — coach video is a static mockup |
| Wearable/CGM | Apple HealthKit, Dexcom API, Withings | None — all vitals are hardcoded strings |
| AI/LLM | Claude API, OpenAI API | None — Cardi is a hardcoded decision tree |
| SMS/email | Twilio, SendGrid | None |
| Payments | Stripe | None |

This is expected for a prototype. But if this doc is being used to scope the real build, every row in that table represents a significant integration effort.

---

## 4. Data Layer

All state is `localStorage`-based. No server, no auth, no user ID. The entire state represents a single hardcoded day (Day 14) for a single hardcoded user.

### Keys and data shapes

| Key | Written by | Shape |
|---|---|---|
| `carda_checkin` | `checkin.html` on `saveThenDone()` | `{ nauseaScore: number, appetiteChoice: string, symptoms: string[], severity: 'good'|'watch'|'moderate'|'high', completedAt: ISO string }` |
| `carda_protein` | `meal.html` on `logFuel()` | `{ logged: number, goal: number, lastUpdated: ISO string }` |
| `carda_hydration` | `meal.html` on drop click | `{ glasses: number, goal: 8 }` |
| `carda_article` | `article.html` on `showDone()` | `{ read: true, rating: string, readAt: ISO string }` |
| `carda_exercise` | `session.html` on **page load** | `{ completed: true, completedAt: ISO string }` |
| `carda_lifestyle` | `lifestyle-session.html` on **page load** | `{ completed: true, completedAt: ISO string }` |
| `carda_evening` | `evening.html` on `saveThenDone()` | `{ gratitude: string, hungerScore: number, foodNoise: string[], sleepChecks: string[], completedAt: ISO string }` |

### Score calculation

Computed independently in `preview.html`, `progress.html`, and `evening.html` — three separate implementations with no shared code:

**`preview.html` / `progress.html` formula (max raw: 130):**
- Check-in: +20
- Protein at goal: +35, partial: +15
- Article: +10
- Exercise: +40
- Lifestyle: +25
- Score = `Math.round((raw / 130) * 100)`

**`evening.html` formula (max raw: 65):** Different weights, different maximum, different result for the same inputs. Not reconciled with the above.

---

## 5. Navigation and Routing

Navigation uses raw `<a href>` links and `window.location.href` assignments. No router.

### Bottom navigation — inconsistencies by screen

| Screen | Tab 1 | Tab 2 | Tab 3 | Tab 4 | Issues |
|---|---|---|---|---|---|
| `preview.html` | Home (active) | Chat | Progress | — | ✓ Correct |
| `progress.html` | Home | Chat | Progress (active) | — | ✓ Correct |
| `chat.html` | Home | Chat (active) | Progress | — | ✓ Correct |
| `coach.html` | Home | Chat (active) | Progress | — | ✓ Correct |
| `checkin.html` | Home | Progress | **Cardi** | — | ✗ Wrong third tab; Home and Progress are non-functional `div`s with no `href` or `onclick` |
| `care.html` | Home | Progress | Cardi | **Care** (active) | ✗ Four tabs — unique to this screen, appears nowhere else |

### Post-completion routing

Every screen routes back to `preview.html` on completion — **except `evening.html`**, which routes to `coach.html` (Cardi). This may be intentional UX (dropping the user into a Cardi debrief) but is undocumented.

---

## 6. Design System

The canonical design system lives in `design-system/colors_and_type.css`. **It is not imported by any prototype screen.** Every `.html` file re-declares the same CSS custom properties inline.

### Color tokens (re-declared in every file)

| Variable | Value | Role |
|---|---|---|
| `--c-dark-green` | `#142E0F` | Primary brand surface |
| `--c-lime` | `#D8E73C` | Primary CTA, active states |
| `--c-citrus` | `#FB6E28` | Urgency, notifications |
| `--c-plum` | `#C7B9FF` | Education, evening mode |
| `--c-sky` | `#97DDF7` | Wellness, hydration |
| `--c-natural` | `#F4F0EB` | Warm neutral surface |
| `--c-dg-08/30/60` | Opacity variants of `#142E0F` | Borders, muted text, secondary text |

Tokens defined in `colors_and_type.css` but **never used** by prototype screens: `--c-dg-40`, `--c-off-white`, `--c-bg-page`, `--c-bg-soft`, `--c-stroke-soft`, `--c-stroke-quiet`, `--c-fg`, `--c-fg-muted`, `--c-fg-on-dark`, `--c-info`, `--c-hr-high`, `--c-hr-low`, `--c-target`, `--font-mono`, all spacing tokens, all radius tokens, all duration tokens.

### Typography

- Display: ABC Marist SemiBold (OTF) — used for headers and section labels
- UI: Circular Std in 4 weights — Book (400), Medium (500), Bold (700), Black (900)
- Font files live in `design-system/uploads/` but are referenced as `design-system/fonts/` — the `fonts/` directory is gitignored and must be manually populated before the app will render with correct fonts

### Page background colors (no variable — all hardcoded hex)

| Context | Value |
|---|---|
| Most screens | `#f0ede8` |
| `checkin.html`, `meal.html` | `#e8e4df` |
| `evening.html` | `#1a1a2e` (dark/night mode intent) |
| `session.html`, `lifestyle-session.html` | `#0a0a0a` |

---

## 7. Component Patterns

The following UI patterns appear across multiple files but are re-implemented from scratch each time — no shared CSS, no components.

### Phone shell
```css
.phone { width: 390px; min-height: 844px; border-radius: 48px; overflow: hidden; }
```
Identical in all 17 files. Zero variation. Never extracted.

### Status bar
54px dark-green bar with hardcoded signal/WiFi/battery SVGs. Copy-pasted verbatim 17+ times. The time shown varies by screen (`9:41`, `7:14 AM`, `2:07 PM`, `9:02 PM`) but is never dynamically updated — these are static strings.

### Buttons
`.btn-primary` is defined differently across files:
- `preview.html`: `display: inline-flex; padding: 9px 18px` (pill button, fits content)
- `checkin.html`, `evening.html`, `meal.html`: `display: flex; padding: 18px 24px` (full-width block button)
Same class name, incompatible behavior.

### Chips
`.chip` appears in `checkin.html` (`padding: 9px 15px`) and `evening.html` (`padding: 8px 14px`). Same class name, different sizing.

### Step wizard
Two wizard flows (`checkin.html` and `evening.html`) use opposite toggle conventions:
- `checkin.html`: hides inactive steps with `.hidden`
- `evening.html`: shows active steps with `.active`

### Card border radius
| File | `.card` border-radius |
|---|---|
| `preview.html` | `32px` |
| `checkin.html` | `28px` |
| `progress.html` | `28px` |
| `evening.html` | `20px` |

All called `.card`. No shared value.

---

## 8. JavaScript Patterns

All JS is inline `<script>` at the bottom of each HTML file. No shared JS modules.

### IIFE pattern
`preview.html` wraps each distinct behavior in its own `(function() { ... })()` for isolation. There are 8 separate IIFEs. Each re-reads the same localStorage keys independently rather than computing state once and sharing it — minor inefficiency in a prototype, a real problem in production.

### Scripted chat (`cardi-insight.html`)
Uses a plain JS object as a decision tree:
```javascript
const responses = {
  stillBad: { text: '...', chips: ['whyProtein', 'willItPass', 'backToDay'] },
  better: { text: '...', chips: [...] },
  // ...
}
```
Event delegation handles chip clicks. Clean pattern for a prototype. The tree has 7 nodes and a terminal node that redirects to `preview.html`. All message timestamps are hardcoded to `'9:41 AM'`.

---

## 9. Technical Debt and Inconsistencies

### Critical (would block production use)

**1. Session completion fires on page load, not on user action.**
Both `session.html` (line 725) and `lifestyle-session.html` (line 527) write `completed: true` to localStorage unconditionally when the page loads — before any user interaction. The full daily playlist can be "completed" by visiting each session screen and immediately navigating away.

**2. Three independent scoring implementations with different results.**
`preview.html`, `progress.html`, and `evening.html` each contain their own score formula. The `evening.html` formula uses different weights and a different maximum, producing a different score for the same inputs. There is no source of truth.

**3. `lifestyle-session.html` end button likely broken.**
Line 528: `document.querySelector('.ctrl-btn .ctrl-icon.danger')` — the `.danger` class doesn't match any element in the DOM. The selector silently returns `null`. The optional chaining prevents a crash, but the end button's click handler may never attach. Users cannot navigate back cleanly.

**4. `haley.html` and `maya.html` missing color tokens.**
`haley.html` declares only 7 of 11 color variables. `maya.html` declares 9. Any CSS referencing the missing tokens (e.g. `--c-citrus`, `--c-plum`) renders as transparent on those screens.

### Significant (bad practice, easy to fix)

**5. Duplicate severity logic in `checkin.html`.**
The nausea/appetite severity calculation appears twice in the same file — in `renderCompletion()` (lines 967–975) and `saveThenDone()` (lines 1022–1030). They are identical today. If one changes, the displayed severity and the saved severity will diverge silently.

**6. `evening.html` dead code — `origGoToStep`.**
Line 548: `const origGoToStep = goToStep` is evaluated before `goToStep` is defined in scope, making `origGoToStep = undefined`. The variable is never referenced again. This is a copy-paste artifact.

**7. `checkin.html` bottom nav is non-functional.**
Home and Progress items are `div` elements with `role="button"` and `tabindex="0"` but no `onclick` or `href`. They look interactive and do nothing.

**8. `care.html` has a 4-tab nav.**
Every other screen has 3 tabs. `care.html` has 4 (Home, Progress, Cardi, Care). If this screen were reachable from the main nav, the layout shift would be jarring.

### Minor (inconsistency, low risk)

**9. Two backup files committed to main.**
`preview_backup.html` and `progress_backup.html` are in the repository. They represent old design states and serve no function. They bloat the repo and add noise to any future search or grep.

**10. Status bar time and greeting time use different sources.**
`preview.html` uses `new Date().getHours()` to compute the greeting ("Good morning", "Good afternoon", etc.) but the status bar always shows the hardcoded string `"9:41"`. These two time displays are always out of sync.

**11. `session.html` image mismatch.**
`src="/design-system/assets/coach-michelle.png"` with `alt="Coach Haley"`. The asset name and the label are mismatched. The absolute path also 404s on GitHub Pages (should be relative).

**12. Entire design system re-declared 17 times.**
Approximately 200–400 lines of verbatim CSS per file (the `:root` token block, phone shell, status bar, scroll area, bottom nav) are copy-pasted across all 17 files. The canonical `design-system/colors_and_type.css` exists and is well-structured but is never imported.

**13. Live CDN dependency for a local prototype.**
`preview.html` imports `@chenglou/pretext` from `https://esm.sh` to measure text height on 5 labels. This breaks the prototype when offline and introduces a fragile unpinned dependency for a task that CSS can solve.

---

## 10. What's Missing vs. Production

| Category | Gap |
|---|---|
| **Auth** | No login, no user identity — "Bexli" is hardcoded in every string |
| **Multi-day state** | No daily reset, no Day 15, no historical data |
| **Real vitals** | BP, SpO2, HR, weight are hardcoded HTML strings — no wearable or CGM integration |
| **Real AI** | Cardi is a 7-node scripted decision tree — no LLM, no context memory |
| **Video sessions** | Coach video frames are static mocks — no Twilio, Daily.co, or similar |
| **Push notifications** | Not implemented — no FCM/APNs |
| **Analytics** | No usage tracking of any kind |
| **Error handling** | No validation feedback, no empty states, no network error states |
| **Accessibility** | ARIA roles inconsistently applied; interactive `div`s without `button` semantics; no focus management in wizard transitions |
| **Responsive design** | Viewport locked to `width=390` — only renders at iPhone 15 width |
| **Build pipeline** | No Sass, PostCSS, Tailwind, or shared CSS mechanism |
| **Date awareness** | "Day 14" is a string constant — `new Date()` is used for time-of-day only |
| **HIPAA** | Symptom data written to `localStorage` in plaintext, no encryption, no expiry, no consent |

---

## 11. Recommendations for Engineering Handoff

1. **Do not port this code.** Use the HTML files as visual and interaction specs only. The structural problems — duplicate CSS, duplicate business logic, broken components — are cheaper to avoid in a fresh build than to untangle from 12,000 lines of copy-pasted HTML.

2. **`design-system/colors_and_type.css` is the only reusable engineering artifact.** It is well-structured and represents real design intent. Port its tokens directly into a Tailwind config or CSS module system. Do not copy the `:root` block into components manually.

3. **The `localStorage` key schema maps cleanly to API models.** The 7 keys correspond to 7 data models: CheckIn, ProteinLog, HydrationLog, ArticleRead, ExerciseSession, LifestyleSession, EveningWrapUp. Each has a `completedAt` timestamp — natural primary key shape.

4. **Define the scoring formula in one place.** Three independent implementations must collapse into a single canonical function with a clear spec: which habits contribute, what the weights are, and how partial completion is handled.

5. **Gate session completion on user action, not page load.** Both session screens write completion to storage on entry. In a real app this must be triggered by the end-session action or a verified timer.

6. **The bottom nav is a component.** Three tabs: Home, Chat, Progress. Define once, pass active state as a prop. Never re-implement per screen.

7. **The font path will recur as a deployment issue.** Fonts are gitignored and referenced via `design-system/fonts/`. Either bundle fonts with the app or serve from a CDN — document the requirement clearly for any engineer who clones the repo.

8. **`cardi-insight.html` is the best UX reference in the codebase.** The branching dialogue tree is clean, legible, and gives a clear mental model for how scripted AI flows should feel. Use it as the UX template when building real LLM-backed chat — it shows exactly what the response pattern should look like.

9. **Confirm `evening.html`'s terminal navigation to `coach.html`.** It is the only screen that doesn't return to the home dashboard. If intentional (Cardi debrief after wrap-up), document it as a deliberate flow. If not, it's a bug.

10. **This prototype represents one user, one day, one program state.** The real app must handle Day 1 through Day 365, three phases, multiple GLP-1 medications, different patient profiles, missed days, and clinical edge cases (disordered eating flags, extreme weight loss triggers). Plan for that data model before writing a line of production code.
