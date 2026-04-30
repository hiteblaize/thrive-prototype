# Provider Portal UI Kit

The administrative surface Carda's clinical team (CEPs, RNs) uses to **monitor 12–15 patients simultaneously** during a live group rehab session.

## Screens

**Live Monitor** (primary) — three-column layout built directly from `/Provider-Portal/Components/PatientVideoFeed` and `/Provider-Portal/Final`:
- **Spotlight pane** — focused patient video with AI-coverage rail (Claim back / Add Cardy / Remove), big vitals (HR / SpO₂ / BP / METs), live ECG strip, and quick actions (message, call, flag, note, chart).
- **Session header** — live timer, session title, CEP coverage status, "Claim all" and "End session" actions.
- **Cohort grid** — 14 compact patient tiles with faux-video, status chip (In range / Flagged / Below zone / Idle), coverage + Cardy badges, mic/hand indicators, vitals strip. Click to spotlight.
- **Session controls bar** — mic / camera / screen-share, broadcast message, Cardy AI toggle, global end-call.
- **Right rail** — cohort KPIs (in zone / flagged / avg HR / avg SpO₂), auto-scrolling alerts feed (color-coded by severity), quick roster.

Other sidebar routes (Patients / Sessions / Alerts / Messages / Reports) are placeholder screens for now.

## Audience split

This kit is **clinician-facing** and intentionally does NOT share components with the patient iPad kit:
- Patient iPad kit → large type, single-task screens, big touch targets, soft cream surfaces.
- Provider portal → dense multi-patient grids, small-text data tables, mouse-first hit targets, dark-green chrome, monospace MRNs.

Both pull from the same tokens (colors, type, radii, shadows) but compose them very differently.

## Iconography

Uses the local **Font Awesome 6 Pro** font files (Solid / Regular / Light / Thin / Sharp / Brands / Duotone). The `<Icon name="..." variant="..." />` helper lives in `fa-icons.js` at the project root.
