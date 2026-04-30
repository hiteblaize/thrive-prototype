/* global React, ReactDOM, DesignCanvas, DCSection, DCArtboard, DCPostIt, IOSDevice */

// Patient mobile — assembles every Screen into a grouped DesignCanvas.
// Each screen is the iOS frame + the screen content from screens.jsx.

const SCREENS = window.CARDA_SCREENS || [];

// Group screens by section (preserve order of first appearance).
const SECTIONS = [];
const byId = {};
SCREENS.forEach(s => {
  if (!byId[s.section]) { byId[s.section] = { id:s.section, title:s.section, items:[] }; SECTIONS.push(byId[s.section]); }
  byId[s.section].items.push(s);
});

// Short intro blurbs per section.
const SECTION_SUBS = {
  "Onboarding":   "First-run: splash → lock → log in → pair home vitals. Green gets paired with cream to keep the clinical warmth.",
  "Home":         "Landing screen variations — the primary 'next session' hero, plus the missed-session recovery state.",
  "Check-in":     "Three-step daily check-in: subjective wellness → vitals → confirmation with streak nudge.",
  "Live session": "Core product — supervised video session with coach, plus HR-in-range, out-of-range, paused, and connection-lost states.",
  "Check-out":    "Post-session flow: celebration summary, RPE slider, symptom collection.",
  "Collect info": "Baseline assessment screens — weight capture and medication adherence.",
  "Journey":      "Level-up progress view — 5 levels across a 12-week program.",
  "Team":         "Asynchronous messaging with the care team.",
  "Safety":       "Hard-stop emergency screen when HR exceeds safe range or critical vitals trip.",
  "You":          "Profile / account / device-pair management.",
  "Learn":        "Education library — short lessons in mindfulness, nutrition, exercise, heart health.",
};

// Frame each screen in an iOS device. The screens already include their own
// status bar styling (we pass hideStatus to IOSDevice).
function Framed({ screen: S, dark }) {
  return (
    <IOSDevice width={402} height={874} dark={dark} hideStatus>
      <S/>
    </IOSDevice>
  );
}

// Some screens need a dark device chrome (green backgrounds).
const DARK_IDS = new Set(["splash","lock","prep","in-range","out-range","paused","emergency"]);

function App() {
  return (
    <DesignCanvas>
      {SECTIONS.map(sec => (
        <DCSection key={sec.id} id={sec.id} title={sec.title} subtitle={SECTION_SUBS[sec.id] || ""}>
          {sec.items.map(s => (
            <DCArtboard key={s.id} id={s.id} label={s.label} width={402} height={874 + 46 /* device bezel */}>
              <Framed screen={s.C} dark={DARK_IDS.has(s.id)} />
            </DCArtboard>
          ))}
        </DCSection>
      ))}
      <DCPostIt top={40} left={-260} rotate={-4} width={220}>
        Patient Mobile UI Kit — 27 screens across onboarding, daily rituals, the supervised session, and safety fallbacks.
      </DCPostIt>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
