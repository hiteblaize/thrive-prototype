---
name: Carda Health Design System
description: Use when designing ANY Carda Health surface — brand deck slides, marketing, the patient iPad app (live workout / home / check-in), or the provider clinician portal. Loads the full token set (colors, type, radii, shadows, motion), the fonts (Circular Std + ABC Marist), logos + brand symbol + workout icons, and two reference UI kits. Invoke this before mocking anything with the Carda name on it.
---

# Carda Health — Design System

A virtual cardiopulmonary rehab program. Patients get a tablet + home vitals devices (BP cuff, pulse-ox) and meet with clinical teams 2–3× per week for 30–60 min supervised sessions.

**Always start by reading `README.md`** — it carries the tone, copy rules, visual foundations, iconography rules, and caveats that the tokens alone won't teach you.

## When to use

| User says… | Load this |
|---|---|
| "make a Carda slide / deck / brand page" | `colors_and_type.css` + `slides/deck-templates.html` + `README.md` voice section |
| "mock the patient app / workout / check-in" | `ui_kits/patient-mobile/` (iPhone, 27 screens: onboarding / home / check-in / live session / post-workout / journey / messages / emergency / profile / learn) |
| "mock the in-home tablet / iPad / living-room screen" | `ui_kits/patient-tablet/` (1080×810 landscape, 20 screens: onboarding / home / check-in / waiting room / full-bleed session / safety / team / journey / learn) |
| "mock the clinician view / portal / monitoring" | `ui_kits/provider-portal/` (Portal.jsx + index.html) |
| "add a Carda button / card / form field" | `preview/components-*.html` — copy the reference markup |
| Anything with the Carda wordmark | `assets/logo-carda.svg` + `assets/logo-health.svg` (or the combined `carda-symbol.svg`) |

## Files

```
README.md                      Voice, copy, visual foundations, iconography, caveats
colors_and_type.css            All tokens: color, type scale, radii, shadows, motion
fonts/                         Circular Std family + ABC Marist SemiBold (brand-licensed)
assets/                        logo-carda.svg, logo-health.svg, carda-symbol.svg
preview/                       One HTML per swatch / specimen / component
  colors-primary.html          dark-green, lime, natural cream
  colors-semantic.html         citrus, plum, sky, error, success, warning
  colors-tints.html            rgba dark-green tints (8/30/40/60%)
  type-families.html           Circular Std + ABC Marist specimens
  type-display.html            h1 72 / h2 48 / h3 32 / h4 22
  type-body.html               p1/p2/p3 + caption/sm/xs
  spacing-scale.html           4pt base, 24/32/56 card padding
  spacing-radii.html           32 card / 39 button / 6 input
  spacing-shadows.html         0 4 8 .12 / 0 12 32 .19
  components-buttons.html      Lime / white / dark + hover + press
  components-cards.html        32-radius pillow + accent-band header
  components-fields.html       Inputs, active, error states
  components-patient-tile.html Provider portal patient tile
  components-provider-buttons.html  Portal action buttons
  components-status-chips.html      Status pills (success / warning / error)
  brand-logo.html              Full Carda Health wordmark
  brand-symbol.html            Seed-and-crescent brand symbol
  brand-icons.html             Bespoke workout / vitals icon set
ui_kits/
  patient-mobile/              iPhone patient app (27 screens: splash, lock, login, device-pair success/failure, home, missed-session, check-in (question/vitals/done), live session (in-range, out-of-range, paused, connection lost), post-workout summary, check-out (RPE, symptoms), baseline (weight, meds), journey, messages, emergency, profile, learn)
  patient-tablet/              In-home iPad companion — 1080×810 landscape, 20 screens (splash, lock, home · 3 states, check-in · question + vitals, waiting room, live session · not-connected / in-range / out-of-range / paused / summary card, post-workout recap, meet-team carousel, 12-week journey, activity log, profile + paired devices, emergency stop, learn library)
  provider-portal/             Clinician monitoring grid (desktop)
slides/
  deck-templates.html          4 deck templates: cover / section / statement / content
```

## Non-negotiables (see README for reasoning)

1. **No emoji. Anywhere.** Use the bespoke workout icons or Font Awesome 6 Pro (Lucide as CDN substitute for prototypes).
2. **No gradients.** Solid color blocks + the signature lime blob shape only.
3. **Lime never on white** in large blocks — put dark green on lime instead.
4. **Accent colors are accents.** Citrus / plum / sky each get *one* card or *one* slide per screen.
5. **Corner radii are different by surface:** 32px cards, 39px (pill) buttons, 6px inputs, ~2px deck blocks.
6. **Type pairing is fixed:** ABC Marist SemiBold for display/titles; Circular Std for everything else. No system fonts as fallback in final output — ship the `.otf` files.
7. **Voice is clinical-warm.** Title Case for buttons + headers; sentence case for body + helpers. Second person "you". No exclamation spam.
8. **Hover ≠ color shift.** Buttons add the card shadow + solid dark-green border on hover; no fill change. Press is 96% scale + shadow removal.

## Caveats

- **Font Awesome 6 Pro is licensed.** Use Lucide via CDN for prototypes; swap to the FA6 Pro kit before production.
- **CircularXX vs Circular Std** — Figma uses both names for the same family. Only Circular Std `.otf` was uploaded; treat as interchangeable.
- **Workout icons** are a small deliberate set. If a design needs something outside it (e.g. settings cog), use Lucide rather than inventing a new bespoke icon.
- **Photography** — only low-res samples in `assets/`. Production work needs the real Carda photo library (60–70 yr-old patients, warm natural light, no b&w, no grain).
