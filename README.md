# Thrive by Carda Health — GLP-1 Companion App Prototype

A high-fidelity mobile prototype for **Thrive**, Carda Health's GLP-1 tapering and lifestyle companion program. Built as an interactive HTML/CSS prototype to support product and business development.

## What is Thrive?

Thrive is a tech-enabled clinical companion for adults actively taking GLP-1 receptor agonists or tapering off them. The program addresses three critical challenges GLP-1 patients face:

- Up to 40% of weight lost can be lean muscle mass
- GI side effects (nausea, constipation) are common and undertreated
- ~67% of lost weight is typically regained within a year of stopping the medication

Thrive combines supervised resistance training, high-protein nutrition tracking, and behavioral psychology to protect muscle during active loss and rebuild natural satiety habits for permanent maintenance.

## Prototype Screens

| File | Screen |
|------|--------|
| `preview.html` | Home Dashboard |
| `checkin.html` | Morning Check-In |
| `article.html` | Today's Read |
| `chat.html` | Chat Hub |
| `coach.html` | Cardi — AI Coach |
| `haley.html` | Coach Haley (Exercise) |
| `maya.html` | Coach Maya (Lifestyle) |
| `cardi-insight.html` | Cardi Conversation Thread |
| `progress.html` | Progress |
| `evening.html` | Evening Wrap-Up |

## Running Locally

1. Clone the repo
2. Install fonts (not included — see note below)
3. Serve the folder with any static file server, e.g.:
   ```
   npx serve .
   ```
4. Open `http://localhost:3000/preview.html`

## Fonts

The prototype uses **Circular Std** and **ABC Marist**, which are licensed fonts not included in this repository. Place the font files in `design-system/fonts/` to render the full design. The app falls back to system fonts if they are not present.

## Design Brief

See [`design-brief.md`](design-brief.md) for the full product design brief including clinical context, phase logic, and success criteria.
