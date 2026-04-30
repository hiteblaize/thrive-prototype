# Carda Health — Design System

A working design system for **Carda Health**, a virtual cardiopulmonary rehabilitation institution. Patients receive a tablet and home vitals devices (blood pressure cuff + pulse-ox) and meet with clinical teams 2–3× a week for supervised 30–60 minute sessions covering exercise, nutrition, mindfulness and stress management.

This system covers the brand surface (decks, marketing, illustration), the **patient iPad app** (live workouts, daily check-ins, education), and the **provider portal** (clinician monitoring of patients in session).

---

## Sources

- **Figma — "Design System.fig"** (mounted; user has access). Pages of interest:
  - `/Design-System` — the canonical token + component reference (`system-color`, `system-type`, `system-form-fields`, `cards`, `button-large`, `Double-Button`, `Triple-Button`, `Note`, `Favicon`, `carda-logo`).
  - `/BRANDING-Deck` — 84-page brand deck. The voice/visual bible.
  - `/All-Screens`, `/Workout-Card-Breakdown`, `/Checkin-Flow-Designs`, `/Auto-Vitals-Experiment` — patient app.
  - `/Provider-Portal` — clinician monitoring screens.
  - `/Icons`, `/App-Icons` — workout / vitals icons + iOS app icon.
  - `/Socials` — marketing imagery (Linkedin/FB banners, hero photos).
- **Uploaded font files** in `uploads/`: full Circular Std family + ABC Marist SemiBold. These are the brand's licensed faces; ship them with anything user-facing.
- No codebase was attached. All component recreations here are derived from the Figma JSX export.

---

## Index — what's in this folder

```
README.md                 ← you are here
SKILL.md                  ← Agent-Skill manifest (cross-compatible)
colors_and_type.css       ← all tokens (color, type scale, radii, shadows, motion)
fonts/                    ← Circular Std + ABC Marist (.otf)
assets/                   ← logos, brand symbol, social imagery, icons
preview/                  ← Design System tab cards (one HTML per swatch / specimen / component)
ui_kits/
  patient-mobile/         ← iPhone patient app — onboarding, live session, check-in, safety (27 screens)
  patient-tablet/         ← 10" iPad companion — home, daily check-in, full-bleed live session (20 screens at 1080×810)
  provider-portal/        ← clinician web portal — patient monitoring grid
slides/                   ← brand deck templates (cover, section, statement, content)
```

---

## CONTENT FUNDAMENTALS — voice & copy

Carda's voice is **clinical-warm**: it speaks like the physiologist on the other end of the call — confident, specific, encouraging, never saccharine. The brand is in the medical category but writes like a coach.

- **Person:** Second-person ("you"), inclusive first-person plural for the team ("we'll", "let's"). Never "the patient."
- **Sentence length:** Short imperatives in UI ("Submit", "Start session", "Finish my assessment"), one-clause body sentences in marketing.
- **Tone hallmarks:**
  - Direct & encouraging — *"Hold on, let's get you back to better health!"*
  - Outcome-focused — *"Find out how thousands of Americans are recovering with Carda Health in just 12 weeks."*
  - Quietly proud — *"8+ Years Experience"*, *"Haley has over 8 years experience managing a variety of different cardiac conditions from heart attack to heart transplant."*
  - Earnestly testimonial — *"This weekend I was able to go to the baseball game with my grandson and walk around for the first time in a very long time…"*
- **Casing:**
  - **Title Case** for buttons, section headers, slide titles ("Get Started Today", "How it works", "Insurance Info").
  - **Sentence case** for body, helper text, error messages ("Please enter your info as it is on your primary insurance card.", "Please correct.").
  - **lowercase** for system labels in the design-system itself ("primary color", "status color", "h1 72px"). Reserved for documentation surface.
- **Numbers:** Always numerals ("12 weeks", "65", "8+ Years"). Phone numbers use hyphens, no parens: `1-866-932-5104`.
- **Punctuation:** Em-dashes are fine; exclamation points are reserved for moments of genuine encouragement (one per screen, max).
- **No emoji.** None of the patient app, provider portal or brand deck uses emoji. Substitute Font Awesome icons or workout icons.
- **Vibe:** Calm. The brand never shouts; the lime CTA does the shouting for it.

---

## VISUAL FOUNDATIONS

### Color
A small, opinionated palette anchored on **dark green `#142E0F`** + **lime `#D8E73C`**, softened by **natural cream `#F4F0EB`** and three accent hues used sparingly.

| Token | Value | Where it shows up |
|---|---|---|
| `dark-green` | `#142E0F` | All body text, primary surfaces, dark deck backgrounds |
| `lime` | `#D8E73C` | Primary CTA buttons, brand symbol accent, deck stat-bursts |
| `natural` | `#F4F0EB` | Quiet card surfaces, indented quote blocks |
| `dark-green 8%` | `#ECEEEC` | Borders & dividers (also `rgba(20,46,15,0.08)`) |
| `citrus` | `#FB6E28` | Section divider slides, urgency, HR-high alerts |
| `plum` | `#C7B9FF` | Education / mindfulness moments |
| `sky` | `#97DDF7` | Wellness moments, lock-screen halo, blue card headers |
| `error` | `#A60000` | Form errors, critical alerts |
| `success` | `#34CE00` / `warning` `#FFAC05` | Status pills |

**Usage rules:** Lime never appears on lime; never on white in large blocks (uses dark green on lime instead). Citrus, plum, sky each get *one* slide or *one* card per screen — they are accents, not palettes. White space and natural cream do most of the work.

### Type
- **Display:** ABC Marist SemiBold — slightly editorial humanist serif. Used for slide titles, marketing H1/H2/H3, and card hero copy. Tight tracking (-0.02em at 72px).
- **Body / UI:** Circular Std — Book for body, Bold for buttons & headings, Black at very large sizes when chunky weight is the goal.
- **Mono / annotations:** Source Code Pro 12px, used only for designer notes (rendered on a `#FFCCCC` swatch in Figma).
- **Display-Circular alternative:** When Marist feels too refined (mobile UI splash, marketing ad numbers), Circular Std Black 100px is the alternate display face.
- **Scale:** h1 72 / h2 48 / h3 32 / h4 22 / p1 22 / p2 19 / p3 16 / caption 16 / sm 14 / xs 12. h1 collapses to h2 size below 390px width.

### Spacing & layout
- 4-pt base. Cards use 32–56px internal padding; deck slides use a 58px outer margin.
- Two layout modes:
  1. **Marketing / brand:** generous, often 1920×1080 with a single large headline + accent shape; ample white space.
  2. **Patient app:** dense iPad cards (1024×1366), gridded, 24–32px gutters.
- Fixed elements: deck slides have a tiny `pg-header` (section · subsection) top-left @ 16px and `pg-footer` (Carda Health · Brand Guide) bottom-left.

### Backgrounds & imagery
- **Solid color blocks** are the dominant backdrop on brand decks — full-bleed dark green, citrus, natural, white. **No gradients.**
- A single signature **brand shape**: a giant rounded blob (the "Vector" SVG from slide 000) — lime on dark green, or sky on white, used as a 1296×1400 corner element.
- **Photography:** warm, natural light, real patients (60–70 yr-olds), at home or with clinicians. Skin-toned warmth; never b&w, never grainy. Often masked into rounded 32px corners or large pills.
- No repeating textures, no grain, no decorative patterns.

### Animation & motion
- Calm easing (`cubic-bezier(0.2, 0.8, 0.2, 1)`), 140–420ms.
- Fades and short slides over bounces. The product has *no* spring physics.
- Vital readouts pulse gently at the user's BPM during live sessions; otherwise static.

### Borders, shadows, elevation
- **Borders:** Hairline `1px solid rgba(20,46,15,0.08)` on cards & inputs. Active state: `1px solid #142E0F`. Error: `1px solid #A60000`.
- **Shadows:** Quiet. Card shadow is `0 4px 8px rgba(0,0,0,0.12)`. Pop modals: `0 12px 32px rgba(0,0,0,0.19)`. The brand prefers tinted surfaces & outlines over heavy elevation.
- **No inner shadows. No glows.** No glass-morphism / blur backdrops anywhere in the system.

### Hover & press states
- **Buttons (lime, white, dark):** hover keeps the same fill, adds the card shadow + the border becomes solid dark-green. No color shift on hover.
- **Press:** 96% scale + remove shadow, 100ms.
- **Form fields:** hover adds shadow; focus swaps the border to solid dark-green.

### Corner radii
- Cards: **32px** (the signature pillowy radius).
- Buttons: **39px** (true pill at 80px tall — `border-radius: 9999px` is fine).
- Inputs: **6px**.
- Deck content blocks: **2px** or square. The deck is more architectural than the app.

### Cards
- Generous 32px radius. White or natural-cream fill. Hairline 8% dark-green border *or* shadow — never both.
- Card headers often use a **full-width colored band** (sky / plum / citrus) with the title set in ABC Marist SemiBold dark green.
- Cards often pair with a **photograph above** (full-bleed, 220px tall) and a dark-green "quote" block below — the testimonial pattern.

### Transparency & blur
- Used only for **rgba dark-green tints** (8/30/40/60%) — for borders, muted text, disabled states.
- No `backdrop-filter` blur in the system.

---

## ICONOGRAPHY

Carda uses two distinct icon systems, in this priority:

1. **Bespoke workout/vitals icons** — pencil-stroke, 2px, dark-green outlines for the patient app. The set is small and deliberate: *Workout, METs, Lungs, Heart, Weight, Blood Pressure, Effort, Trophy, Group, Check, ArrowUp, ArrowDown*. These ship as SVGs in `assets/icons/`.
2. **Font Awesome 6 Pro (Light / Regular / Solid)** — for everything else: input affordances, chevrons, disclosure indicators, navigation. Loaded via Font Awesome Kit on production. In this design system we substitute **Lucide** as the closest CDN-available equivalent (matching stroke weight and rounded terminals).
   - **⚠️ Substitution flagged:** Font Awesome 6 Pro requires a license key. Use Lucide (CDN) for prototypes; swap in the FA6 Pro kit before production.

**Other rules:**
- **No emoji.** Not in product, deck, marketing, or social.
- **No unicode symbols as icons.** A check is the bespoke `Check.svg`, not `✓`.
- **Brand symbol** (`assets/carda-symbol.svg`) — the dark-green seed shape with a lime crescent. Always paired with the wordmark unless space is critically tight (favicon).

---

## CAVEATS

- **Font Awesome 6 Pro is licensed.** Lucide is the prototyping substitute. Replace with the licensed kit before shipping production code.
- **CircularXX vs Circular Std:** Figma metadata shows both. Only Circular Std `.otf` files were uploaded. Treat them as the same family — Circular Std is the licensed retail version of CircularXX, and the metrics are interchangeable for our purposes.
- **Workout icons** — copied from Figma into `assets/icons/` as SVGs. The set is small; if a design needs an icon outside the bespoke set (e.g. a settings cog), use Lucide.
- **Photography assets** — only a couple of low-res samples were copied; production use needs the original Carda photo library.
