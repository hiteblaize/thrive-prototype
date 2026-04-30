/* global React, ReactDOM, DesignCanvas, DCSection, DCArtboard, DCPostIt, TabletFrame */

// Patient tablet (iPad / in-home companion) — 1080×810 (4:3 landscape).
// Each screen lives inside TabletFrame, grouped in a DesignCanvas.

const SCREENS = window.CARDA_TABLET_SCREENS || [];

const SECTIONS = [];
const byId = {};
SCREENS.forEach(s => {
  if (!byId[s.section]) { byId[s.section] = { id: s.section, title: s.section, items: [] }; SECTIONS.push(byId[s.section]); }
  byId[s.section].items.push(s);
});

const SECTION_SUBS = {
  "Onboarding":   "First-run on the in-home tablet — branded splash and lock screen with a pre-session notification.",
  "Home":         "Landing dashboard in three states: default (check-in done), 10-minute pre-session warm-up, and clinician visit day.",
  "Check-in":     "Two-step daily check-in sized for tablet: subjective wellness and full vitals entry.",
  "Live session": "The supervised video session — waiting room, HR states (not connected, in range, out of range), provider-paused, and end-of-session summary card.",
  "Post-session": "Cream recap screen showing time in target, BP delta, and a note from the coach.",
  "Care":         "Meet-your-team carousel — swipe through clinician, physiologist, and nurse cards.",
  "Journey":      "12-week program track with levels, plus the full activity log.",
  "You":          "Profile hub with paired devices, care links, and system settings.",
  "Safety":       "Emergency / safety-stop screen when HR exceeds safe range. High-contrast and one-tap to care.",
  "Learn":        "Education library with category tiles and suggested short lessons.",
  "Milestones":   "Moments of delight — celebratory overlays that surface when a patient crosses a threshold: first session, 36-session graduation, first HR in target, 14-day check-in streak.",
};

// Dark bezel + black inner for dark screens; lighter inner for cream ones
// (prevents a thin black hairline on the corner radius).
const CREAM_IDS = new Set(["home","home-pre","home-clinician","ci-question","ci-vitals","post-workout","team","journey","activity","profile","learn"]);

function App() {
  return (
    <DesignCanvas>
      {SECTIONS.map(sec => (
        <DCSection key={sec.id} id={sec.id} title={sec.title} subtitle={SECTION_SUBS[sec.id] || ""}>
          {sec.items.map(s => (
            <DCArtboard key={s.id} id={s.id} label={s.label} width={1080 + 56} height={810 + 56}>
              <TabletFrame inner={CREAM_IDS.has(s.id) ? "#F4F0EB" : "#000"}>
                <s.C/>
              </TabletFrame>
            </DCArtboard>
          ))}
        </DCSection>
      ))}
      <DCPostIt top={40} left={-280} rotate={-3} width={240}>
        Patient Tablet UI Kit — 20 screens at 1080×810 (4:3 iPad landscape). Coach video is full-bleed during sessions; HUD is dark pills overlaid on top. Clinical moments (safety stop, out-of-range) break the calm palette intentionally.
      </DCPostIt>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
