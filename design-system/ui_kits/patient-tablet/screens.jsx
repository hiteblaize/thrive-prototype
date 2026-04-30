/* global React */
// Carda Patient Tablet — 1080×810 screen set.
// All screens assume the tablet frame (rounded corners + bezel are
// applied by the wrapper in index.jsx). Use colors from colors_and_type.css.

const { useState } = React;

// ─────────────────────────────────────────────────────────────
// Tokens (inline; must match colors_and_type.css)
// ─────────────────────────────────────────────────────────────
const C = {
  green: "#142E0F", lime: "#D8E73C", cream: "#F4F0EB",
  line: "rgba(20,46,15,0.08)", muted: "rgba(20,46,15,0.55)", bodyMuted: "rgba(20,46,15,0.65)",
  citrus: "#FB6E28", plum: "#C7B9FF", sky: "#97DDF7",
  error: "#A60000", success: "#34CE00", warning: "#FFAC05",
  onGreen: "#FFFFFF", dim: "rgba(255,255,255,0.70)",
};
const F = {
  display: 'ABC Marist, Georgia, serif',
  body: 'Circular Std, -apple-system, system-ui, sans-serif',
};

// ─────────────────────────────────────────────────────────────
// Tiny inline icon set (stroke-based, 1.75 weight)
// ─────────────────────────────────────────────────────────────
const ICONS = {
  run:      <><circle cx="12" cy="4" r="2"/><path d="M5 22l3-7 4-3-2-4-3 3-3-1"/><path d="M11 12l2 3v7"/><path d="M13 15l5-1 2-3"/></>,
  heart:    <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/><path d="M3 12h3l2-4 3 8 2-5 2 1h6"/></>,
  lungs:    <><path d="M12 3v9"/><path d="M6 20c-2 0-3-1.5-3-3.5 0-3 2-4 3-5s3-3 3-4.5"/><path d="M18 20c2 0 3-1.5 3-3.5 0-3-2-4-3-5s-3-3-3-4.5"/></>,
  weight:   <><path d="M5 7h14l-1.5 14H6.5z"/><path d="M9 7a3 3 0 0 1 6 0"/></>,
  bp:       <><path d="M12 3s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11z"/><path d="M10 13l1.5 1.5 3-3"/></>,
  pill:     <><rect x="2.5" y="9" width="19" height="6" rx="3" transform="rotate(-45 12 12)"/><path d="M8.5 8.5l7 7"/></>,
  check:    <><path d="M4 12l6 6L20 6"/></>,
  clock:    <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></>,
  video:    <><rect x="2" y="6" width="14" height="12" rx="2"/><path d="M22 8l-6 4 6 4V8z"/></>,
  phone:    <><path d="M22 16.9V20a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3.1a2 2 0 0 1 2 1.7 13 13 0 0 0 .7 2.8 2 2 0 0 1-.5 2.1L8.1 10a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.4 13 13 0 0 0 2.8.7 2 2 0 0 1 1.7 2z"/></>,
  list:     <><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></>,
  chevR:    <><path d="M9 6l6 6-6 6"/></>,
  chevL:    <><path d="M15 6l-6 6 6 6"/></>,
  flame:    <><path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c1.5 0 2.5-1 2.5-2.5 0-1-1-2-1-3 0-2 2-3 2-3s1 3 3 5 1 7-3 8-7-2-6-5z"/></>,
  alertT:   <><path d="M12 3L2 21h20L12 3z"/><path d="M12 10v4"/><path d="M12 18h.01"/></>,
  alertC:   <><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></>,
  seated:   <><path d="M5 6l3 12h8l3-12"/><path d="M7 10h10"/><circle cx="12" cy="3" r="1.5"/></>,
  plus:     <><path d="M12 5v14"/><path d="M5 12h14"/></>,
  minus:    <><path d="M5 12h14"/></>,
  volume:   <><path d="M11 5L6 9H2v6h4l5 4z"/><path d="M19 4.9a10 10 0 0 1 0 14.2"/><path d="M15.5 8.5a5 5 0 0 1 0 7.1"/></>,
  pause:    <><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></>,
  play:     <><path d="M6 4l14 8-14 8V4z"/></>,
  snowflake:<><path d="M12 2v20"/><path d="M2 12h20"/><path d="M4.9 4.9l14.2 14.2"/><path d="M19.1 4.9L4.9 19.1"/></>,
  thermometer:<><path d="M14 4v10.5a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z"/></>,
  gear:     <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
  message:  <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>,
  bolt:     <><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></>,
  activityBars:<><rect x="3" y="10" width="2" height="10" rx="1"/><rect x="7" y="6" width="2" height="14" rx="1"/><rect x="11" y="4" width="2" height="16" rx="1"/><rect x="15" y="8" width="2" height="12" rx="1"/><rect x="19" y="12" width="2" height="8" rx="1"/></>,
  trophy:   <><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v4a5 5 0 0 1-10 0V4z"/><path d="M17 6h3v2a3 3 0 0 1-3 3"/><path d="M7 6H4v2a3 3 0 0 0 3 3"/></>,
  circleCheck:<><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></>,
  arrowUpRight:<><path d="M7 17L17 7"/><path d="M7 7h10v10"/></>,
  headset:  <><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3zM3 19a2 2 0 0 0 2 2h1v-6H3z"/></>,
};

function I({ name, size = 24, color = "currentColor", stroke = 1.75, fill = false, style = {} }) {
  const body = ICONS[name];
  if (!body) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? color : "none"} stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", flexShrink: 0, ...style }}>
      {body}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Shared pieces
// ─────────────────────────────────────────────────────────────

// Top nav bar used across Home, Team, Profile etc. (1080 wide)
function TopNav({ active = "home" }) {
  const pill = (txt, k, extra = null) => (
    <div key={k} style={{
      height: 70, padding: "0 38px",
      background: active === k ? C.lime : "#FFF",
      borderRadius: 9999, display: "flex", alignItems: "center", gap: 14,
      fontFamily: F.body, fontWeight: 700, fontSize: 22, color: C.green,
      boxShadow: active === k ? "none" : "0 0 0 1px " + C.line,
    }}>{txt}{extra}</div>
  );
  return (
    <div style={{ height: 94, padding: "12px 22px", background: "#FFF",
                  display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${C.line}` }}>
      <div style={{ width: 70, height: 70, borderRadius: 9999, background: "#FFF", border: `1px solid ${C.line}`,
                    display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="../../assets/carda-symbol.svg" alt="" style={{ width: 34, height: 36 }}/>
      </div>
      {pill("Tap To View Your Journey", "home")}
      <div style={{ flex: 1 }}/>
      {pill("Your Care Team", "team")}
      {pill("Settings", "settings")}
      {pill("Your Profile", "profile",
        <div style={{ width: 40, height: 40, borderRadius: 9999, marginLeft: 6,
                      backgroundImage: "url(../../assets/patient-avatar.png)", backgroundSize: "cover", backgroundPosition: "center" }}/>
      )}
    </div>
  );
}

// Decorative "circuit" line pattern in cream — appears faintly across
// every Home variant in the real product. Pure decoration.
function HomeCircuit() {
  return (
    <svg width="1080" height="716" viewBox="0 0 1080 716" fill="none" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: .35 }}>
      <path d="M0 360 Q 120 200 260 300 T 540 260 T 820 370 T 1080 240" stroke="rgba(20,46,15,.10)" strokeWidth="1.2" fill="none"/>
      <path d="M0 560 Q 140 460 320 520 T 620 480 T 900 540 T 1080 500" stroke="rgba(20,46,15,.08)" strokeWidth="1.2" fill="none"/>
      <path d="M540 0 L540 130 Q540 160 570 170 L720 220" stroke="rgba(20,46,15,.08)" strokeWidth="1.2" fill="none"/>
    </svg>
  );
}

// Workout badge: dark-green circle with run icon, used at top-left of
// "Your Workout" card.
function RunBadge({ size = 64, bg = C.green, color = "#FFF" }) {
  return (
    <div style={{ width: size, height: size, borderRadius: 9999, background: bg,
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
      <I name="run" size={size * 0.55} color={color}/>
    </div>
  );
}

// Big ABC Marist title — used across the app
const titleCSS = { fontFamily: F.display, fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.015em", color: C.green };

// Shared back bar — used on every non-home screen. Top-left back
// button + optional right-side title/crumb. Keeps patients oriented
// without hiding content behind a full nav.
function BackBar({ title, onDark = false, right = null }) {
  const textColor = onDark ? "#FFF" : C.green;
  const bg = onDark ? "rgba(255,255,255,0.10)" : "#FFF";
  const border = onDark ? "1px solid rgba(255,255,255,0.28)" : `1px solid ${C.line}`;
  return (
    <div style={{ height: 84, padding: "18px 28px", display: "flex", alignItems: "center", gap: 16, position: "relative", zIndex: 5 }}>
      <button style={{ height: 56, padding: "0 26px", borderRadius: 9999, background: bg, border,
                       display: "flex", alignItems: "center", gap: 12, fontFamily: F.body, fontWeight: 700, fontSize: 18, color: textColor, cursor: "pointer" }}>
        <I name="chevL" size={20} color={textColor}/>
        <span>Home</span>
      </button>
      {title && <div style={{ fontFamily: F.body, fontWeight: 700, fontSize: 20, color: textColor, opacity: .85 }}>{title}</div>}
      <div style={{ flex: 1 }}/>
      {right}
    </div>
  );
}

// Milestone overlay — drops over the session/home view when a
// patient crosses a celebratory threshold: session 1, session 36,
// first HR in range, streak milestones, etc.
function MilestoneOverlay({ kind, title, body, continueLabel = "Continue" }) {
  // Tone per kind
  const theme = {
    first:     { bg: C.lime,   accent: C.green, artTint: "rgba(20,46,15,0.12)", icon: "trophy"     },
    graduate:  { bg: C.plum,   accent: C.green, artTint: "rgba(255,255,255,0.40)", icon: "circleCheck" },
    streak:    { bg: C.citrus, accent: "#FFF",   artTint: "rgba(255,255,255,0.22)", icon: "flame"      },
    inRange:   { bg: C.sky,    accent: C.green, artTint: "rgba(255,255,255,0.35)", icon: "heart"      },
    recovery:  { bg: "#FFF",   accent: C.green, artTint: C.lime,                  icon: "lungs"      },
  }[kind] || { bg: C.lime, accent: C.green, artTint: "rgba(20,46,15,0.12)", icon: "trophy" };
  const fg = theme.accent;
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 40, display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(0,0,0,0.45)" }}>
      <div style={{ position: "relative", width: 720, borderRadius: 36, background: theme.bg, padding: "42px 46px 38px",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.32)", overflow: "hidden" }}>
        {/* decorative rings */}
        <svg width="720" height="260" viewBox="0 0 720 260" style={{ position: "absolute", top: -40, left: -60, pointerEvents: "none", opacity: .55 }}>
          <circle cx="120" cy="120" r="200" fill="none" stroke={theme.artTint} strokeWidth="2"/>
          <circle cx="120" cy="120" r="150" fill="none" stroke={theme.artTint} strokeWidth="2"/>
          <circle cx="120" cy="120" r="100" fill="none" stroke={theme.artTint} strokeWidth="2"/>
          <circle cx="660" cy="60" r="8" fill={theme.artTint}/>
          <circle cx="580" cy="30" r="5" fill={theme.artTint}/>
          <circle cx="700" cy="200" r="12" fill={theme.artTint}/>
        </svg>
        {/* confetti dots */}
        <div style={{ position: "absolute", top: 14, right: 20, display: "flex", gap: 8, opacity: .7 }}>
          <div style={{ width: 10, height: 10, borderRadius: 9999, background: fg }}/>
          <div style={{ width: 6, height: 6, borderRadius: 9999, background: fg, marginTop: 10 }}/>
          <div style={{ width: 12, height: 12, borderRadius: 9999, background: fg, marginTop: 2 }}/>
        </div>
        <div style={{ position: "relative", display: "flex", gap: 20, alignItems: "center" }}>
          <div style={{ width: 92, height: 92, borderRadius: 28, background: fg, color: theme.bg,
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                        boxShadow: "0 10px 24px rgba(0,0,0,0.18)" }}>
            <I name={theme.icon} size={48} color={theme.bg} stroke={2}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: F.body, fontWeight: 700, fontSize: 13, color: fg, opacity: .7,
                          letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 4 }}>Milestone</div>
            <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 46, lineHeight: 1.05, letterSpacing: "-0.015em", color: fg }}>
              {title}
            </div>
          </div>
        </div>
        <div style={{ position: "relative", marginTop: 18, fontSize: 18, lineHeight: 1.5, color: fg, opacity: .85, maxWidth: 560 }}>
          {body}
        </div>
        <button style={{ position: "relative", marginTop: 26, width: "100%", height: 68, borderRadius: 9999, background: fg, color: theme.bg,
                         border: "none", fontFamily: F.body, fontWeight: 700, fontSize: 20, cursor: "pointer" }}>{continueLabel}</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 1: Splash
// ─────────────────────────────────────────────────────────────
function SplashScreen() {
  return (
    <div style={{ width: 1080, height: 810, background: C.green, position: "relative", overflow: "hidden" }}>
      {/* decorative blobs */}
      <div style={{ position: "absolute", top: -180, left: -220, width: 540, height: 540, borderRadius: 9999, background: C.plum }}/>
      <div style={{ position: "absolute", bottom: -240, right: -180, width: 560, height: 560, borderRadius: 9999, background: C.lime }}/>
      {/* logo */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
        <img src="../../assets/carda-symbol.svg" style={{ width: 78, height: 82, filter: "brightness(0) saturate(100%) invert(85%) sepia(42%) saturate(620%) hue-rotate(15deg) brightness(100%)" }}/>
        <span style={{ fontFamily: F.body, fontWeight: 700, fontSize: 76, color: "#FFF", letterSpacing: "-0.02em" }}>carda</span>
        <span style={{ fontFamily: F.body, fontWeight: 300, fontSize: 76, color: "#FFF", letterSpacing: "-0.02em" }}>health</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 2: Lock
// ─────────────────────────────────────────────────────────────
function LockScreen() {
  return (
    <div style={{ width: 1080, height: 810, background: C.green, position: "relative", overflow: "hidden",
                  fontFamily: F.body, color: "#FFF" }}>
      {/* status strip */}
      <div style={{ padding: "24px 36px", display: "flex", justifyContent: "space-between", fontSize: 14, opacity: .8 }}>
        <span>iPad • Carda</span>
        <span>9:41 AM · Wed, Mar 12</span>
      </div>
      {/* big time */}
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 220, lineHeight: 1, letterSpacing: "-0.02em" }}>9:41</div>
        <div style={{ marginTop: 16, fontSize: 22, opacity: .78 }}>Wednesday · March 12</div>
      </div>
      {/* notification */}
      <div style={{ position: "absolute", left: 140, right: 140, bottom: 120, background: "rgba(255,255,255,0.10)",
                    backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.18)",
                    borderRadius: 24, padding: "20px 26px", display: "flex", gap: 18, alignItems: "center" }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: C.lime, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <I name="run" size={26} color={C.green}/>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 12, fontSize: 13, opacity: .78, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>
            <span>CARDA · NOW</span><span style={{ marginLeft: "auto" }}>9:41 AM</span>
          </div>
          <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>Session starts in 15 min</div>
          <div style={{ fontSize: 15, opacity: .82 }}>Put on your heart-rate strap and pulse-ox — Michelle is prepping now.</div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 28, left: 0, right: 0, textAlign: "center", fontSize: 14, opacity: .55 }}>Swipe up to unlock</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 3: Home — default
// ─────────────────────────────────────────────────────────────
function HomeScreen() {
  return (
    <div style={{ width: 1080, height: 810, background: C.cream, fontFamily: F.body, color: C.green, position: "relative", overflow: "hidden" }}>
      <TopNav active="home"/>
      <HomeCircuit/>
      <div style={{ padding: 28, display: "grid", gridTemplateColumns: "1fr 400px", gap: 24, position: "relative" }}>
        {/* Workout card */}
        <div style={{ background: C.green, borderRadius: 32, padding: "34px 38px", color: "#FFF", position: "relative", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
            <RunBadge size={56} bg="#FFF" color={C.green}/>
            <span style={{ fontSize: 22, fontWeight: 400, opacity: .95 }}>Your Workout</span>
          </div>
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
            <div style={{ width: 120, height: 120, borderRadius: 9999, border: "2px solid rgba(255,255,255,0.35)", flexShrink: 0 }}/>
            <div>
              <div style={{ ...titleCSS, color: "#FFF", fontSize: 52, maxWidth: 420 }}>Later Today with Michelle</div>
              <div style={{ fontWeight: 700, fontSize: 22, marginTop: 18 }}>4:30 PM - 5:15 PM</div>
              <div style={{ fontSize: 17, opacity: .85, marginTop: 18, lineHeight: 1.55, maxWidth: 440 }}>
                A one hour full-body workout, get ready to push yourself!
              </div>
            </div>
          </div>
          {/* footer button */}
          <div style={{ marginTop: 30, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,0.18)",
                        display: "flex", alignItems: "center", gap: 14, fontWeight: 700, fontSize: 19 }}>
            <I name="list" size={22} color={C.lime}/>
            <span>Tap to see your workouts</span>
            <I name="chevR" size={22} color={C.lime} style={{ marginLeft: "auto" }}/>
          </div>
        </div>
        {/* Daily check-in card */}
        <div style={{ background: "#FFF", borderRadius: 32, padding: "26px 28px" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 15, color: C.bodyMuted, marginBottom: 10 }}>
            <I name="circleCheck" size={18} color={C.green} stroke={1.75}/>
            <span>Your Daily Check In</span>
            <span style={{ marginLeft: "auto" }}>Saved at 7:31 pm</span>
          </div>
          <div style={{ ...titleCSS, fontSize: 38, marginBottom: 20 }}>You're all set</div>
          <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 18, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <MetricTile icon="heart" label="Heart Rate" value="70" unit="BPM"/>
            <MetricTile icon="lungs" label="Oxygen" value="99" unit="%"/>
            <MetricTile icon="weight" label="Weight" value="148" unit="LBS"/>
            <MetricTile icon="bp" label="Blood Pressure" value="127/98"/>
          </div>
          <div style={{ marginTop: 18, display: "flex", alignItems: "flex-end", gap: 14 }}>
            <I name="pill" size={22} color={C.green}/>
            <div>
              <div style={{ fontSize: 15, color: C.bodyMuted }}>Medications Taken?</div>
              <div style={{ ...titleCSS, fontSize: 28 }}>Yes</div>
            </div>
          </div>
          <button style={{ marginTop: 18, width: "100%", height: 64, borderRadius: 9999, background: C.green, color: "#FFF",
                           border: "none", fontFamily: F.body, fontWeight: 700, fontSize: 18 }}>Tap To Check In Again</button>
        </div>
        {/* Activity row */}
        <div style={{ background: "#FFF", borderRadius: 20, padding: 18, display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ width: 60, height: 60, borderRadius: 14, background: C.cream, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <I name="activityBars" size={30} color={C.plum} stroke={2}/>
          </div>
          <div>
            <div style={{ fontSize: 14, color: C.bodyMuted, marginBottom: 2 }}>Your Activity</div>
            <div style={{ fontWeight: 700, fontSize: 20, maxWidth: 420, lineHeight: 1.3 }}>
              Tap to track an activity, or view your previous entries below.
            </div>
          </div>
          <I name="chevR" size={28} color={C.green} style={{ marginLeft: "auto" }}/>
        </div>
        {/* Streak row */}
        <div style={{ background: "#FFF", borderRadius: 20, padding: "16px 22px", display: "flex", alignItems: "center", gap: 14, fontSize: 17, fontWeight: 700 }}>
          <I name="flame" size={22} color={C.lime} fill/>
          <span>You're on 5 day Checkin streak!</span>
        </div>
      </div>
    </div>
  );
}
function MetricTile({ icon, label, value, unit }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <I name={icon} size={26} color={C.green}/>
      <div>
        <div style={{ fontSize: 13, color: C.bodyMuted }}>{label}</div>
        <div style={{ fontFamily: F.body, fontWeight: 700, fontSize: 22, letterSpacing: "-0.01em" }}>
          {value}{unit && <span style={{ fontSize: 12, fontWeight: 700, marginLeft: 4, opacity: .55, textTransform: "uppercase" }}>{unit}</span>}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 4: Home — pre-session (session in <10 min)
// ─────────────────────────────────────────────────────────────
function HomePreSession() {
  return (
    <div style={{ width: 1080, height: 810, background: C.cream, fontFamily: F.body, color: C.green, position: "relative", overflow: "hidden" }}>
      <TopNav active="home"/>
      <HomeCircuit/>
      <div style={{ padding: 28, position: "relative" }}>
        {/* alert pill */}
        <div style={{ background: "#FFF", borderRadius: 9999, padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, marginBottom: 24,
                      boxShadow: "0 4px 8px rgba(0,0,0,0.06)" }}>
          <div style={{ width: 38, height: 38, borderRadius: 9999, background: C.citrus, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <I name="phone" size={18} color="#FFF"/>
          </div>
          <span style={{ fontSize: 18, fontWeight: 400 }}>You have a Zoom session in 10 minutes. Join the waiting room!</span>
          <button style={{ marginLeft: "auto", height: 48, padding: "0 26px", borderRadius: 9999, background: C.green, color: "#FFF",
                           border: "none", fontFamily: F.body, fontWeight: 700, fontSize: 16 }}>Join Waiting Room</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 24 }}>
          {/* Workout card — "In less than 10 min" */}
          <div style={{ background: C.green, borderRadius: 32, padding: "34px 38px", color: "#FFF" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
              <RunBadge size={56} bg="#FFF" color={C.green}/>
              <span style={{ fontSize: 22 }}>Your Workout</span>
              <div style={{ marginLeft: "auto", background: "#FFF", borderRadius: 16, padding: "10px 16px",
                            display: "flex", alignItems: "center", gap: 10, color: C.green }}>
                <I name="heart" size={20} color={C.green}/>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1 }}>Current Heart Rate</div>
                  <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2 }}>101 <span style={{ fontSize: 12 }}>BPM</span></div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ width: 120, height: 120, borderRadius: 9999, border: "2px solid rgba(255,255,255,0.35)", flexShrink: 0 }}/>
              <div>
                <div style={{ ...titleCSS, color: "#FFF", fontSize: 58, maxWidth: 560 }}>In less than 10 min</div>
                <div style={{ fontWeight: 700, fontSize: 22, marginTop: 14 }}>4:30 PM - 5:15 PM</div>
                <div style={{ fontSize: 17, opacity: .85, marginTop: 14, lineHeight: 1.55, maxWidth: 520 }}>
                  A one hour full-body workout, get ready to push yourself!
                </div>
              </div>
            </div>
            <button style={{ marginTop: 30, width: "100%", height: 72, borderRadius: 9999, background: C.lime, color: C.green,
                             border: "none", fontFamily: F.body, fontWeight: 700, fontSize: 22 }}>Join Waiting Room</button>
          </div>
          {/* Vitals stack */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#FFF", borderRadius: 20, padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <I name="heart" size={30} color={C.green}/>
                <div>
                  <div style={{ fontSize: 14, color: C.bodyMuted }}>Heart Rate</div>
                  <div style={{ ...titleCSS, fontSize: 30 }}>101 <span style={{ fontSize: 14, color: C.bodyMuted }}>BPM</span></div>
                </div>
                <div style={{ marginLeft: "auto", padding: "6px 14px", borderRadius: 9999, border: `1px solid ${C.green}`,
                              display: "flex", gap: 6, alignItems: "center", fontSize: 13, fontWeight: 700 }}>
                  <I name="circleCheck" size={14} color={C.green}/>
                  IN RANGE
                </div>
              </div>
            </div>
            <div style={{ background: "#FFF", borderRadius: 20, padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: C.bodyMuted, marginBottom: 6 }}>
                <I name="circleCheck" size={16} color={C.green}/>
                <span>Your Vitals</span>
              </div>
              <div style={{ ...titleCSS, fontSize: 28, marginBottom: 10 }}>You're all set</div>
              <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 14 }}>
                <button style={{ width: "100%", height: 56, borderRadius: 9999, background: C.green, color: "#FFF",
                                 border: "none", fontFamily: F.body, fontWeight: 700, fontSize: 16 }}>Retake Vitals</button>
              </div>
            </div>
            {/* Weekly session preview */}
            <div style={{ background: "#FFF", borderRadius: 20, padding: 20, display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 18, fontSize: 13, color: C.bodyMuted, marginBottom: 4 }}>
                  <span style={{ display: "flex", gap: 6, alignItems: "center" }}><I name="phone" size={14} color={C.green}/>Community</span>
                  <span style={{ display: "flex", gap: 6, alignItems: "center" }}><I name="clock" size={14} color={C.green}/>1 hour</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 17 }}>Weekly Community Session</div>
                <button style={{ marginTop: 8, height: 40, padding: "0 18px", borderRadius: 9999, background: C.green, color: "#FFF",
                                 border: "none", fontFamily: F.body, fontWeight: 700, fontSize: 13 }}>Join Call</button>
              </div>
              <div style={{ width: 88, height: 88, borderRadius: 16, background: C.sky,
                            display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                <div style={{ width: 60, height: 70, borderRadius: "30px 30px 0 0", background: "#FFF", marginBottom: 0 }}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 5: Home — clinician visit
// ─────────────────────────────────────────────────────────────
function HomeClinicianVisit() {
  return (
    <div style={{ width: 1080, height: 810, background: C.cream, fontFamily: F.body, color: C.green, position: "relative", overflow: "hidden" }}>
      <TopNav active="home"/>
      <HomeCircuit/>
      <div style={{ padding: 28, display: "grid", gridTemplateColumns: "1fr 400px", gap: 24, position: "relative" }}>
        {/* Visit card */}
        <div style={{ background: C.green, borderRadius: 32, padding: "34px 38px", color: "#FFF" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
            <div style={{ width: 56, height: 56, borderRadius: 9999, background: "#FFF", color: C.green,
                          display: "flex", alignItems: "center", justifyContent: "center" }}>
              <I name="arrowUpRight" size={28} color={C.green}/>
            </div>
            <span style={{ fontSize: 22 }}>Clinician Visit</span>
          </div>
          <div style={{ display: "flex", gap: 22, alignItems: "flex-start" }}>
            <div style={{ width: 120, height: 120, borderRadius: 9999, background: `conic-gradient(from 180deg, ${C.plum}, ${C.sky}, ${C.lime}, ${C.plum})`,
                          flexShrink: 0, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 8, borderRadius: 9999, background: "#D9B995" }}/>
            </div>
            <div>
              <div style={{ ...titleCSS, color: "#FFF", fontSize: 50 }}>Later Today with Dr. Mike</div>
              <div style={{ fontWeight: 700, fontSize: 22, marginTop: 16 }}>4:30 PM - 5:15 PM</div>
              <div style={{ fontSize: 17, opacity: .85, marginTop: 16, lineHeight: 1.55, maxWidth: 480 }}>
                Come back closer to the start time of this meeting to be ready to join the video call.
              </div>
            </div>
          </div>
        </div>
        {/* Check-in card (pending) */}
        <div style={{ background: "#FFF", borderRadius: 32, padding: "26px 28px" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 15, color: C.bodyMuted, marginBottom: 10 }}>
            <I name="heart" size={18} color={C.green}/>
            <span>Your Daily Check In</span>
          </div>
          <div style={{ ...titleCSS, fontSize: 36, lineHeight: 1.1, marginBottom: 22 }}>
            It's time to do your daily check in!
          </div>
          <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 18 }}>
            <button style={{ width: "100%", height: 72, borderRadius: 9999, background: C.lime, color: C.green,
                             border: "none", fontFamily: F.body, fontWeight: 700, fontSize: 22 }}>Tap To Check In</button>
          </div>
        </div>
        {/* History row */}
        <div style={{ background: "#FFF", borderRadius: 20, padding: "16px 22px", display: "flex", alignItems: "center", gap: 14, fontSize: 17, fontWeight: 700 }}>
          <I name="list" size={22} color={C.green}/>
          <span>Tap to view your history</span>
          <I name="chevR" size={22} color={C.green} style={{ marginLeft: "auto" }}/>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 6: Check-in — question (How are you feeling?)
// ─────────────────────────────────────────────────────────────
function CheckinQuestion() {
  const [sel, setSel] = useState(2);
  const faces = ["Awful", "Not Great", "Okay", "Good", "Great"];
  return (
    <div style={{ width: 1080, height: 810, background: C.cream, fontFamily: F.body, color: C.green, position: "relative", overflow: "hidden" }}>
      <BackBar title="Daily Check In"/>
      <HomeCircuit/>
      <div style={{ padding: "12px 60px 36px", position: "relative" }}>
        <div style={{ fontSize: 14, color: C.bodyMuted, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 10 }}>Daily Check In · Step 1 of 3</div>
        <div style={{ ...titleCSS, fontSize: 72, maxWidth: 720, marginBottom: 10 }}>How are you feeling today?</div>
        <div style={{ fontSize: 19, color: C.bodyMuted, maxWidth: 600, marginBottom: 40 }}>
          Let your care team know where you're at. This helps Michelle tailor today's session.
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          {faces.map((f, i) => (
            <button key={i} onClick={() => setSel(i)} style={{
              flex: 1, padding: "22px 14px 18px", borderRadius: 32, border: `1px solid ${sel === i ? C.green : C.line}`,
              background: sel === i ? C.lime : "#FFF", fontFamily: F.body, cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 12, color: C.green,
            }}>
              <div style={{ fontSize: 52 }}>
                <FaceSVG variant={i}/>
              </div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{f}</div>
            </button>
          ))}
        </div>
        <div style={{ marginTop: 40, padding: 20, background: "#FFF", borderRadius: 20, display: "flex", gap: 12, alignItems: "flex-start" }}>
          <I name="message" size={24} color={C.green} style={{ marginTop: 2 }}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: C.bodyMuted, marginBottom: 4 }}>Optional note to your team</div>
            <div style={{ fontSize: 17, color: C.bodyMuted, fontStyle: "italic" }}>Felt a bit short of breath walking up the stairs this morning…</div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 36, left: 60, right: 60, display: "flex", gap: 16 }}>
          <button style={{ height: 72, padding: "0 36px", borderRadius: 9999, background: "#FFF", color: C.green,
                           border: `1px solid ${C.line}`, fontFamily: F.body, fontWeight: 700, fontSize: 18 }}>Back</button>
          <button style={{ flex: 1, height: 72, borderRadius: 9999, background: C.green, color: "#FFF",
                           border: "none", fontFamily: F.body, fontWeight: 700, fontSize: 22 }}>Continue to Vitals</button>
        </div>
      </div>
    </div>
  );
}
function FaceSVG({ variant }) {
  // 0 awful → 4 great
  const mouths = [
    "M18 34 Q30 24 42 34", // awful (deep frown)
    "M18 32 Q30 26 42 32", // not great
    "M18 30 L42 30",        // flat
    "M18 28 Q30 34 42 28",  // good
    "M18 26 Q30 40 42 26",  // great
  ];
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="26" stroke="currentColor" strokeWidth="2"/>
      <circle cx="22" cy="24" r="2.2" fill="currentColor"/>
      <circle cx="38" cy="24" r="2.2" fill="currentColor"/>
      <path d={mouths[variant]} stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 7: Check-in — vitals entry
// ─────────────────────────────────────────────────────────────
function CheckinVitals() {
  const Row = ({ icon, label, value, unit, color = C.green }) => (
    <div style={{ background: "#FFF", borderRadius: 20, padding: "22px 26px", display: "flex", gap: 16, alignItems: "center" }}>
      <div style={{ width: 48, height: 48, borderRadius: 9999, background: C.cream, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <I name={icon} size={24} color={color}/>
      </div>
      <div style={{ fontWeight: 700, fontSize: 19 }}>{label}</div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "baseline", gap: 6 }}>
        <span style={{ fontFamily: F.display, fontWeight: 600, fontSize: 32, letterSpacing: "-0.01em" }}>{value}</span>
        {unit && <span style={{ fontSize: 13, color: C.bodyMuted, textTransform: "uppercase", fontWeight: 700 }}>{unit}</span>}
      </div>
      <I name="chevR" size={22} color={C.muted}/>
    </div>
  );
  return (
    <div style={{ width: 1080, height: 810, background: C.cream, fontFamily: F.body, color: C.green, position: "relative", overflow: "hidden" }}>
      <BackBar title="Daily Check In"/>
      <div style={{ padding: "12px 60px 36px" }}>
        <div style={{ fontSize: 14, color: C.bodyMuted, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 10 }}>Daily Check In · Step 2 of 3</div>
        <div style={{ ...titleCSS, fontSize: 56, marginBottom: 6 }}>Let's take your vitals</div>
        <div style={{ fontSize: 18, color: C.bodyMuted, marginBottom: 28, maxWidth: 640 }}>
          Tap each to enter. Use your Carda blood-pressure cuff and pulse-ox — we'll pull heart rate automatically.
        </div>
        <div style={{ display: "grid", gap: 14 }}>
          <Row icon="bp" label="Blood Pressure" value="127/98" unit=""/>
          <Row icon="heart" label="Resting Heart Rate" value="70" unit="BPM"/>
          <Row icon="lungs" label="Blood Oxygen" value="99" unit="%"/>
          <Row icon="weight" label="Weight" value="148" unit="LBS"/>
          <Row icon="pill" label="Medications Taken Today" value="Yes"/>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 36, left: 60, right: 60, display: "flex", gap: 16 }}>
        <button style={{ height: 72, padding: "0 36px", borderRadius: 9999, background: "#FFF", color: C.green,
                         border: `1px solid ${C.line}`, fontFamily: F.body, fontWeight: 700, fontSize: 18 }}>Back</button>
        <button style={{ flex: 1, height: 72, borderRadius: 9999, background: C.green, color: "#FFF",
                         border: "none", fontFamily: F.body, fontWeight: 700, fontSize: 22 }}>Review & Submit</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 8: Waiting room (pre-session)
// ─────────────────────────────────────────────────────────────
function WaitingRoom() {
  return (
    <div style={{ width: 1080, height: 810, background: C.green, fontFamily: F.body, color: "#FFF", position: "relative", overflow: "hidden" }}>
      {/* decorative blob */}
      <div style={{ position: "absolute", top: -200, right: -200, width: 600, height: 600, borderRadius: 9999, background: C.lime, opacity: .9 }}/>
      {/* exit pill */}
      <div style={{ position: "absolute", top: 26, left: 26, height: 56, padding: "0 28px", borderRadius: 9999, border: "1px solid rgba(255,255,255,0.35)",
                    display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 18 }}>
        <I name="chevL" size={18} color="#FFF"/>
        Exit Session
      </div>
      <div style={{ padding: "140px 70px 60px", position: "relative" }}>
        <div style={{ fontSize: 14, letterSpacing: ".12em", textTransform: "uppercase", opacity: .7, marginBottom: 12 }}>Waiting Room</div>
        <div style={{ ...titleCSS, color: "#FFF", fontSize: 92, maxWidth: 780, lineHeight: 1 }}>Hold tight — Michelle is joining now.</div>
        <div style={{ fontSize: 20, opacity: .85, marginTop: 22, maxWidth: 640 }}>
          Please make sure your pulse-ox and heart-rate strap are on. We'll connect them automatically.
        </div>

        {/* vitals row */}
        <div style={{ marginTop: 56, display: "flex", gap: 18 }}>
          <VitalPill icon="heart" label="Heart Rate" value="72 BPM" status="ok"/>
          <VitalPill icon="lungs" label="Oxygen" value="98%" status="ok"/>
          <VitalPill icon="headset" label="Mic" value="Ready" status="ok"/>
          <VitalPill icon="video" label="Camera" value="Ready" status="ok"/>
        </div>
      </div>
      <button style={{ position: "absolute", bottom: 36, left: 70, right: 70, height: 80, borderRadius: 9999, background: C.lime, color: C.green,
                       border: "none", fontFamily: F.body, fontWeight: 700, fontSize: 24 }}>Join Session</button>
    </div>
  );
}
function VitalPill({ icon, label, value, status }) {
  return (
    <div style={{ flex: 1, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 20, padding: "18px 20px", display: "flex", alignItems: "center", gap: 12 }}>
      <I name={icon} size={22} color={status === "ok" ? C.lime : "#FFF"}/>
      <div>
        <div style={{ fontSize: 13, opacity: .7 }}>{label}</div>
        <div style={{ fontWeight: 700, fontSize: 19 }}>{value}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Live-session HUD pieces (reused across all session states)
// ─────────────────────────────────────────────────────────────
function SessionExit() {
  return (
    <div style={{ position: "absolute", top: 26, left: 26, zIndex: 10, height: 56, padding: "0 26px", borderRadius: 9999,
                  border: "1px solid rgba(255,255,255,0.45)", display: "flex", alignItems: "center", gap: 10,
                  color: "#FFF", fontFamily: F.body, fontWeight: 700, fontSize: 18 }}>
      <I name="chevL" size={18} color="#FFF"/>
      Exit Session
    </div>
  );
}
function PatientRailCompact() {
  return (
    <div style={{ position: "absolute", top: 120, left: 26, zIndex: 10, width: 180, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ height: 180, borderRadius: 20, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.16)",
                    position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)",
                      background: C.green, color: "#FFF", fontSize: 13, fontWeight: 700, padding: "6px 14px", borderRadius: 9999, letterSpacing: ".08em" }}>MICHELLE</div>
      </div>
      <div style={{ height: 180, borderRadius: 20, overflow: "hidden", position: "relative",
                    backgroundImage: "url(../../assets/patient-avatar.png)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
                      background: C.green, color: "#FFF", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 9999 }}>ME</div>
      </div>
    </div>
  );
}
function HrCard({ bpm, target = "65-90", color = C.plum, orange = false }) {
  const accent = orange ? C.citrus : color;
  return (
    <div style={{ position: "absolute", top: 26, right: 26, zIndex: 10, background: "#0F1F0C", borderRadius: 20, padding: "16px 22px", display: "flex", gap: 32 }}>
      <div>
        <div style={{ color: accent, fontSize: 15, fontWeight: 700, marginBottom: 2 }}>Heart Rate</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <I name="heart" size={28} color={accent}/>
          <div style={{ fontFamily: F.body, fontWeight: 900, fontSize: 40, color: accent, letterSpacing: "-0.02em", lineHeight: 1 }}>
            {bpm}<span style={{ fontSize: 14, marginLeft: 4, fontWeight: 700 }}>BPM</span>
          </div>
        </div>
      </div>
      <div>
        <div style={{ color: "#FFF", fontSize: 15, fontWeight: 700, marginBottom: 2 }}>Target</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <I name="heart" size={28} color={accent}/>
          <div style={{ fontFamily: F.body, fontWeight: 900, fontSize: 40, color: "#FFF", letterSpacing: "-0.02em", lineHeight: 1 }}>{target}</div>
        </div>
      </div>
    </div>
  );
}
function TimerCard({ remaining = "45 SEC", label = "Seated" }) {
  return (
    <div style={{ position: "absolute", top: 180, right: 26, zIndex: 10, background: "#0F1F0C", borderRadius: 20, padding: "14px 22px",
                  display: "flex", alignItems: "center", gap: 22 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <I name="seated" size={24} color="#FFF"/>
        </div>
        <span style={{ color: "#FFF", fontSize: 17, fontWeight: 700 }}>{label}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 50, height: 50, borderRadius: 9999, background: C.lime, position: "relative" }}>
          <div style={{ position: "absolute", inset: 8, borderRadius: 9999, background: "#0F1F0C" }}/>
        </div>
        <div>
          <div style={{ color: "#FFF", fontSize: 13, fontWeight: 700 }}>Remaining</div>
          <div style={{ color: C.lime, fontFamily: F.body, fontWeight: 900, fontSize: 26, letterSpacing: "-0.02em", lineHeight: 1 }}>{remaining}</div>
        </div>
      </div>
    </div>
  );
}
function SessionFooter() {
  const blocks = [
    { icon: "flame", done: true }, { icon: "run", done: true }, { icon: "snowflake", done: false }, { icon: "check", done: false },
  ];
  return (
    <>
      {/* Bottom-left: mini timeline */}
      <div style={{ position: "absolute", bottom: 26, left: 26, zIndex: 10, background: "#0F1F0C", borderRadius: 9999,
                    padding: "14px 22px", display: "flex", alignItems: "center", gap: 18, color: "#FFF" }}>
        <I name="pause" size={22} color="#FFF" fill/>
        {blocks.map((b, i) => (
          <React.Fragment key={i}>
            <div style={{ width: 38, height: 38, borderRadius: 9999, background: b.done ? C.lime : "rgba(255,255,255,0.1)",
                          display: "flex", alignItems: "center", justifyContent: "center" }}>
              <I name={b.icon} size={18} color={b.done ? C.green : "#FFF"}/>
            </div>
            {i < blocks.length - 1 && <div style={{ width: 40, height: 2, background: "rgba(255,255,255,0.2)" }}/>}
          </React.Fragment>
        ))}
        <div style={{ marginLeft: 14, fontFamily: F.body, fontWeight: 700, fontSize: 20, color: C.lime }}>45:00</div>
      </div>
      {/* Bottom-right: volume */}
      <div style={{ position: "absolute", bottom: 26, right: 26, zIndex: 10, background: "#0F1F0C", borderRadius: 9999,
                    padding: "14px 16px", display: "flex", alignItems: "center", gap: 16 }}>
        <I name="volume" size={26} color="#FFF"/>
        <div style={{ width: 44, height: 44, borderRadius: 9999, border: `2px solid ${C.lime}`,
                      display: "flex", alignItems: "center", justifyContent: "center" }}>
          <I name="plus" size={22} color={C.lime}/>
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 9999, border: `2px solid ${C.lime}`,
                      display: "flex", alignItems: "center", justifyContent: "center" }}>
          <I name="minus" size={22} color={C.lime}/>
        </div>
      </div>
    </>
  );
}
function CoachBackdrop({ overlay = "none" }) {
  // overlay: "none" | "darken" (paused)
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", inset: 0,
                    backgroundImage: "url(../../assets/coach-michelle.png)", backgroundSize: "cover", backgroundPosition: "center top",
                    filter: overlay === "darken" ? "brightness(0.55) saturate(0.7)" : "none" }}/>
      {/* dim top + bottom so HUD reads */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.35) 100%)" }}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 9: Live session — HR not connected
// ─────────────────────────────────────────────────────────────
function SessionNotConnected() {
  return (
    <div style={{ width: 1080, height: 810, position: "relative", overflow: "hidden", fontFamily: F.body }}>
      <CoachBackdrop/>
      <SessionExit/>
      <PatientRailCompact/>
      {/* HR = Not Connected chip */}
      <div style={{ position: "absolute", top: 26, right: 26, zIndex: 10, background: "#0F1F0C", borderRadius: 20, padding: "18px 26px",
                    display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(251,110,40,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <I name="heart" size={26} color={C.citrus}/>
        </div>
        <span style={{ color: C.citrus, fontWeight: 700, fontSize: 24 }}>Not Connected</span>
      </div>
      <TimerCard/>
      <SessionFooter/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 10: Live session — in range
// ─────────────────────────────────────────────────────────────
function SessionInRange() {
  return (
    <div style={{ width: 1080, height: 810, position: "relative", overflow: "hidden", fontFamily: F.body }}>
      <CoachBackdrop/>
      <SessionExit/>
      <PatientRailCompact/>
      <HrCard bpm="70" color={C.plum}/>
      <TimerCard/>
      {/* encouragement pop */}
      <div style={{ position: "absolute", top: 130, left: 230, zIndex: 5, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ background: "#FFF", color: C.green, padding: "10px 18px", borderRadius: 14, fontWeight: 700, fontSize: 17, alignSelf: "flex-start",
                      boxShadow: "0 6px 14px rgba(0,0,0,0.18)" }}>Keep Going!</div>
        <div style={{ background: C.green, color: "#FFF", padding: "8px 14px", borderRadius: 12, fontWeight: 700, fontSize: 13, alignSelf: "flex-start", marginLeft: 26 }}>Great job!</div>
      </div>
      <SessionFooter/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 11: Live session — out of range
// ─────────────────────────────────────────────────────────────
function SessionOutOfRange() {
  return (
    <div style={{ width: 1080, height: 810, position: "relative", overflow: "hidden", fontFamily: F.body }}>
      <CoachBackdrop/>
      <SessionExit/>
      <PatientRailCompact/>
      <HrCard bpm="170" orange/>
      <TimerCard/>
      {/* banner */}
      <div style={{ position: "absolute", top: "45%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 6,
                    background: "rgba(166,0,0,0.95)", color: "#FFF", borderRadius: 20, padding: "18px 28px",
                    display: "flex", alignItems: "center", gap: 14, boxShadow: "0 12px 32px rgba(0,0,0,0.28)" }}>
        <I name="alertT" size={28} color="#FFF"/>
        <div>
          <div style={{ fontWeight: 700, fontSize: 22 }}>Slow down — heart rate above target</div>
          <div style={{ fontSize: 14, opacity: .85 }}>Michelle is watching. Take a seated pause if needed.</div>
        </div>
      </div>
      <SessionFooter/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 12: Live session — paused by provider
// ─────────────────────────────────────────────────────────────
function SessionPaused() {
  return (
    <div style={{ width: 1080, height: 810, position: "relative", overflow: "hidden", fontFamily: F.body }}>
      <CoachBackdrop overlay="darken"/>
      <SessionExit/>
      <PatientRailCompact/>
      <HrCard bpm="170" orange/>
      <TimerCard/>
      <div style={{ position: "absolute", top: "48%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 6,
                    display: "flex", alignItems: "center", gap: 14, color: "#FFF" }}>
        <div style={{ width: 46, height: 46, borderRadius: 9999, background: C.lime, color: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <I name="alertC" size={26} color={C.green}/>
        </div>
        <div style={{ fontFamily: F.body, fontWeight: 700, fontSize: 38, letterSpacing: "-0.01em" }}>Session paused by Provider</div>
      </div>
      <SessionFooter/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 13: Session — workout summary (green dark card)
// ─────────────────────────────────────────────────────────────
function SessionSummary() {
  const Step = ({ label, done, active }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#FFF" }}>
      <span style={{ fontWeight: 700, fontSize: 20, opacity: done ? 1 : 0.55 }}>{label}</span>
      <div style={{ width: 26, height: 26, borderRadius: 9999, background: done ? C.lime : "transparent",
                    border: done ? "none" : `2px solid ${active ? C.lime : "rgba(255,255,255,0.35)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center" }}>
        {done && <I name="check" size={14} color={C.green} stroke={3}/>}
      </div>
    </div>
  );
  const Row = ({ icon, label, value }) => (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      <I name={icon} size={30} color={C.lime}/>
      <div>
        <div style={{ fontSize: 15, color: "rgba(255,255,255,0.55)" }}>{label}</div>
        <div style={{ color: "#FFF", fontWeight: 700, fontSize: 22, marginTop: 2, whiteSpace: "pre-line" }}>{value}</div>
      </div>
    </div>
  );
  return (
    <div style={{ width: 1080, height: 810, position: "relative", overflow: "hidden", fontFamily: F.body, background: "#1F3A4B" }}>
      <CoachBackdrop overlay="darken"/>
      <SessionExit/>
      <PatientRailCompact/>
      {/* summary card */}
      <div style={{ position: "absolute", top: 50, left: 236, right: 26, bottom: 96, background: "#142E0F", borderRadius: 24, padding: "26px 32px",
                    color: "#FFF", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 24, marginBottom: 18 }}>
          <Step label="Blood Pressure" done/>
          <Step label="Blood Oxygen" done/>
          <Step label="Perceived Effort" done/>
          <Step label="Rating" done/>
          <Step label="Summary" active/>
        </div>
        <div style={{ ...titleCSS, color: "#FFF", fontSize: 56, marginBottom: 22 }}>Your Workout Summary</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", rowGap: 22, columnGap: 20 }}>
          <Row icon="calendar" label="Session 3" value={"Mar 3, 2023"}/>
          <Row icon="bolt" label="Effort" value="Challenging"/>
          <Row icon="clock" label="Duration" value="47m"/>
          <Row icon="weight" label="Weight" value="148 Lbs"/>
          <Row icon="bp" label="Blood Pressure" value={"127/98 PRE\n127/98 POST"}/>
          <Row icon="heart" label="Heart Rate" value="In Range"/>
          <Row icon="heart" label="Heart Rate" value={"70 BPM PRE\n86 BPM POST"}/>
          <Row icon="lungs" label="Blood Oxygen" value={"92% PRE\n90% POST"}/>
        </div>
        <div style={{ marginTop: 22 }}>
          <div style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", marginBottom: 2 }}>Provider</div>
          <div style={{ fontWeight: 700, fontSize: 20 }}>Michelle MD</div>
        </div>
        <button style={{ position: "absolute", left: 28, right: 28, bottom: 24, height: 72, borderRadius: 9999, background: "#FFF", color: C.green,
                         border: "none", fontFamily: F.body, fontWeight: 700, fontSize: 22 }}>End Session</button>
      </div>
      <SessionFooter/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 14: Post-workout — summary (cream / journey look)
// ─────────────────────────────────────────────────────────────
function PostWorkout() {
  return (
    <div style={{ width: 1080, height: 810, background: C.cream, fontFamily: F.body, color: C.green, position: "relative", overflow: "hidden" }}>
      <BackBar title="Workout Recap"/>
      <div style={{ padding: "12px 60px 36px" }}>
        <div style={{ fontSize: 14, color: C.bodyMuted, letterSpacing: ".12em", textTransform: "uppercase" }}>March 12 · Session 14</div>
        <div style={{ ...titleCSS, fontSize: 72, marginTop: 6, marginBottom: 8 }}>That was a strong one.</div>
        <div style={{ fontSize: 20, color: C.bodyMuted, maxWidth: 680 }}>
          You finished 4 out of 4 blocks and stayed in target 82% of the session. Michelle has notes.
        </div>

        <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 16 }}>
          <div style={{ background: C.green, color: "#FFF", borderRadius: 24, padding: 26 }}>
            <div style={{ fontSize: 14, opacity: .75, marginBottom: 6 }}>Time in Target</div>
            <div style={{ ...titleCSS, color: "#FFF", fontSize: 68 }}>38 <span style={{ fontSize: 24, opacity: .7 }}>min</span></div>
            <div style={{ marginTop: 10, fontSize: 14, opacity: .78 }}>65-90 BPM · 82% of session</div>
            {/* mini bar */}
            <div style={{ marginTop: 20, height: 6, background: "rgba(255,255,255,0.18)", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ width: "82%", height: "100%", background: C.lime }}/>
            </div>
          </div>
          <SumCard color={C.plum} label="Peak HR" value="143" unit="BPM" hint="reached during block 3"/>
          <SumCard color={C.sky} label="Calories" value="382" unit="kcal" hint="approximate, from HR"/>
          <SumCard color="#FFF" label="BP · before → after" value={`132/86 → 127/82`} hint="Post-reading dropped 5 points" big/>
          <SumCard color={C.lime} label="Effort" value="Challenging" hint="Reported 7/10"/>
          <SumCard color="#FFF" label="Blood Oxygen" value="98%" hint="stable throughout"/>
        </div>

        <div style={{ marginTop: 22, padding: 22, background: "#FFF", borderRadius: 20, display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{ width: 54, height: 54, borderRadius: 9999, background: C.sky }}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: C.bodyMuted, marginBottom: 2 }}>Michelle, your Physiologist</div>
            <div style={{ fontSize: 18, lineHeight: 1.45 }}>
              "Really nice job pacing through the intervals — you recovered a full 20 BPM between sets 2 and 3.
              Hydrate and I'll see you Wednesday."
            </div>
          </div>
        </div>

        <div style={{ marginTop: 22, display: "flex", gap: 14 }}>
          <button style={{ height: 64, padding: "0 30px", borderRadius: 9999, background: C.green, color: "#FFF",
                           border: "none", fontFamily: F.body, fontWeight: 700, fontSize: 18 }}>Message Michelle</button>
          <button style={{ height: 64, padding: "0 30px", borderRadius: 9999, background: "#FFF", color: C.green,
                           border: `1px solid ${C.line}`, fontFamily: F.body, fontWeight: 700, fontSize: 18 }}>See Full History</button>
          <button style={{ marginLeft: "auto", height: 64, padding: "0 30px", borderRadius: 9999, background: C.lime, color: C.green,
                           border: "none", fontFamily: F.body, fontWeight: 700, fontSize: 18 }}>Back to Home</button>
        </div>
      </div>
    </div>
  );
}
function SumCard({ color, label, value, unit, hint, big }) {
  const dark = color === C.green;
  const onLight = ["#FFF", C.lime, C.sky, C.plum].includes(color);
  const text = onLight ? C.green : "#FFF";
  return (
    <div style={{ background: color, borderRadius: 24, padding: 22, color: text, gridColumn: big ? "span 2" : undefined }}>
      <div style={{ fontSize: 14, opacity: onLight ? .6 : .8, marginBottom: 4 }}>{label}</div>
      <div style={{ ...titleCSS, color: text, fontSize: big ? 40 : 44 }}>{value} {unit && <span style={{ fontSize: 16, opacity: .65 }}>{unit}</span>}</div>
      {hint && <div style={{ fontSize: 13, marginTop: 8, opacity: onLight ? .55 : .78 }}>{hint}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 15: Your Team (Meet your Team — carousel)
// ─────────────────────────────────────────────────────────────
function MeetTeam() {
  const card = (name, title, years, bg) => (
    <div style={{ width: 320, background: "#FFF", borderRadius: 24, overflow: "hidden", position: "relative", flexShrink: 0 }}>
      <div style={{ height: 260, background: bg, position: "relative" }}>
        <div style={{ position: "absolute", bottom: -28, left: 20, width: 60, height: 60, borderRadius: 9999, background: C.sky,
                      border: `3px solid ${bg}` }}/>
      </div>
      <div style={{ padding: "40px 22px 26px" }}>
        <div style={{ fontWeight: 700, fontSize: 19, marginBottom: 4 }}>{name}</div>
        <div style={{ fontSize: 14, color: C.bodyMuted, fontWeight: 700, marginBottom: 2 }}>{title}</div>
        <div style={{ fontSize: 14, color: C.bodyMuted, fontWeight: 700, marginBottom: 16 }}>{years}+ Years Experience</div>
        <div style={{ fontSize: 14, lineHeight: 1.55, color: C.green, opacity: .82 }}>
          Has over {years} years experience managing a variety of different cardiac conditions — heart attack to heart transplant.
        </div>
      </div>
    </div>
  );
  return (
    <div style={{ width: 1080, height: 810, background: C.cream, fontFamily: F.body, color: C.green, position: "relative", overflow: "hidden" }}>
      {/* Go Home pill */}
      <div style={{ position: "absolute", top: 26, left: 26, height: 56, padding: "0 26px", borderRadius: 9999, background: C.lime,
                    display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 18, color: C.green }}>
        <I name="chevL" size={18} color={C.green}/>
        Go Home
      </div>
      <div style={{ paddingTop: 120, textAlign: "center" }}>
        <div style={{ ...titleCSS, fontSize: 60 }}>Meet your Team</div>
        <div style={{ fontSize: 18, color: C.bodyMuted, marginTop: 14, maxWidth: 780, margin: "14px auto 0", lineHeight: 1.55 }}>
          Your team is here for you every step of the way — providing clinical quality care in a fun environment
          that makes exercising easy and enjoyable again while lowering the risk of future events.
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 60, left: 0, right: 0, display: "flex", gap: 24, padding: "0 90px", alignItems: "flex-start",
                    overflow: "visible" }}>
        {/* chev L */}
        <div style={{ position: "absolute", left: 30, top: 160, width: 64, height: 64, borderRadius: 9999, background: "#FFF",
                      display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 14px rgba(0,0,0,0.12)" }}>
          <I name="chevL" size={26} color={C.green}/>
        </div>
        {card("Dr. Mike Patel, MD", "Cardiologist", "12", "#D9B995")}
        {card("Haley Uher, BS, MS, ASCM-CEP", "Physiologist", "8", "#5AB3D6")}
        {card("Michelle Okoye, RN", "Exercise Physiologist", "6", "#B9A6D9")}
        <div style={{ position: "absolute", right: 30, top: 160, width: 64, height: 64, borderRadius: 9999, background: "#FFF",
                      display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 14px rgba(0,0,0,0.12)" }}>
          <I name="chevR" size={26} color={C.green}/>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 16: Journey (12-week program)
// ─────────────────────────────────────────────────────────────
function Journey() {
  const weeks = Array.from({ length: 12 }, (_, i) => i + 1);
  const cur = 7;
  return (
    <div style={{ width: 1080, height: 810, background: C.cream, fontFamily: F.body, color: C.green, position: "relative", overflow: "hidden" }}>
      <BackBar title="Your Journey"/>
      <div style={{ padding: "12px 60px 36px", position: "relative" }}>
        <div style={{ fontSize: 14, color: C.bodyMuted, letterSpacing: ".12em", textTransform: "uppercase" }}>Your Journey</div>
        <div style={{ ...titleCSS, fontSize: 64, marginTop: 6 }}>You're halfway there, Elena.</div>
        <div style={{ fontSize: 19, color: C.bodyMuted, marginTop: 12, maxWidth: 680 }}>
          Week 7 of 12. Your resting heart rate dropped 4 BPM since you started, and you've logged 19 of 24 sessions.
        </div>

        {/* Program track */}
        <div style={{ marginTop: 40, background: "#FFF", borderRadius: 28, padding: "34px 30px", position: "relative" }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: C.bodyMuted, marginBottom: 20 }}>12 WEEK PROGRAM</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 28 }}>
            {weeks.map(w => (
              <React.Fragment key={w}>
                <div style={{ width: 44, height: 44, borderRadius: 9999,
                              background: w < cur ? C.green : w === cur ? C.lime : "#FFF",
                              border: w < cur ? "none" : `2px solid ${w === cur ? C.green : "rgba(20,46,15,0.18)"}`,
                              color: w < cur ? "#FFF" : C.green, display: "flex", alignItems: "center", justifyContent: "center",
                              fontWeight: 700, fontSize: 15 }}>{w < cur ? <I name="check" size={18} color="#FFF" stroke={3}/> : w}</div>
                {w < 12 && <div style={{ flex: 1, height: 3, background: w < cur ? C.green : "rgba(20,46,15,0.15)" }}/>}
              </React.Fragment>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            <LevelCard level="Level 1" label="Foundation" weeks="Weeks 1-3" done/>
            <LevelCard level="Level 2" label="Build" weeks="Weeks 4-6" done/>
            <LevelCard level="Level 3" label="Push" weeks="Weeks 7-9" current/>
            <LevelCard level="Level 4" label="Maintain" weeks="Weeks 10-12"/>
          </div>
        </div>

        {/* Stats strip */}
        <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
          <StatBlock label="Sessions" value="19 / 24" sub="logged"/>
          <StatBlock label="Resting HR" value="−4 BPM" sub="since start"/>
          <StatBlock label="Active min" value="612" sub="this month"/>
          <StatBlock label="Streak" value="5 days" sub="check-in"/>
        </div>
      </div>
    </div>
  );
}
function LevelCard({ level, label, weeks, done, current }) {
  const bg = current ? C.green : done ? "#FFF" : "#FFF";
  const color = current ? "#FFF" : C.green;
  const bdr = current ? "none" : `1px solid ${C.line}`;
  return (
    <div style={{ background: bg, color, borderRadius: 18, padding: 18, border: bdr, position: "relative" }}>
      <div style={{ fontSize: 12, opacity: current ? .75 : .55, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>{level}</div>
      <div style={{ ...titleCSS, color, fontSize: 26, marginTop: 4 }}>{label}</div>
      <div style={{ fontSize: 13, opacity: current ? .8 : .6, marginTop: 2 }}>{weeks}</div>
      {done && <I name="circleCheck" size={22} color={C.green} style={{ position: "absolute", top: 14, right: 14 }}/>}
      {current && <div style={{ position: "absolute", top: 14, right: 14, background: C.lime, color: C.green, fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 99 }}>YOU'RE HERE</div>}
    </div>
  );
}
function StatBlock({ label, value, sub }) {
  return (
    <div style={{ background: "#FFF", borderRadius: 16, padding: 16 }}>
      <div style={{ fontSize: 12, color: C.bodyMuted, textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 700 }}>{label}</div>
      <div style={{ ...titleCSS, fontSize: 30, marginTop: 2 }}>{value}</div>
      <div style={{ fontSize: 13, color: C.bodyMuted }}>{sub}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 17: Activity log
// ─────────────────────────────────────────────────────────────
function ActivityLog() {
  const items = [
    { day: "Mar 12, Wed", workouts: [
      { kind: "Live Session", with: "Michelle", dur: "47m", effort: "Challenging", hr: "70→86", ok: true },
      { kind: "Community Call", with: "Dr. Mike", dur: "32m", effort: "Light", hr: "68→74", ok: true },
    ]},
    { day: "Mar 10, Mon", workouts: [
      { kind: "Live Session", with: "Haley", dur: "45m", effort: "Moderate", hr: "72→90", ok: true },
    ]},
    { day: "Mar 8, Sat", workouts: [
      { kind: "Logged walk", with: "Self", dur: "28m", effort: "Light", hr: "—", ok: true },
    ]},
    { day: "Mar 7, Fri", workouts: [
      { kind: "Missed session", with: "Michelle", dur: "—", effort: "—", hr: "—", ok: false },
    ]},
  ];
  return (
    <div style={{ width: 1080, height: 810, background: C.cream, fontFamily: F.body, color: C.green, position: "relative", overflow: "hidden" }}>
      <BackBar title="Activity"/>
      <div style={{ padding: "8px 60px 30px", overflow: "hidden", height: 700 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ ...titleCSS, fontSize: 52 }}>Your Activity</div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
            <button style={{ height: 48, padding: "0 18px", borderRadius: 9999, background: "#FFF", border: `1px solid ${C.line}`, fontWeight: 700, fontSize: 14, color: C.green }}>Last 30 days</button>
            <button style={{ height: 48, padding: "0 20px", borderRadius: 9999, background: C.green, color: "#FFF", border: "none", fontWeight: 700, fontSize: 14 }}>+ Log Activity</button>
          </div>
        </div>
        <div style={{ fontSize: 17, color: C.bodyMuted, marginTop: 6 }}>19 sessions · 612 active minutes · 82% in target</div>

        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 18 }}>
          {items.map((day, i) => (
            <div key={i}>
              <div style={{ fontSize: 13, color: C.bodyMuted, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 8 }}>{day.day}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {day.workouts.map((w, j) => (
                  <div key={j} style={{ background: "#FFF", borderRadius: 20, padding: "16px 22px", display: "flex", gap: 18, alignItems: "center",
                                         border: !w.ok ? `1px solid ${C.error}` : `1px solid transparent` }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: !w.ok ? "rgba(166,0,0,0.10)" : C.cream,
                                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <I name={w.ok ? "run" : "alertT"} size={22} color={w.ok ? C.green : C.error}/>
                    </div>
                    <div style={{ minWidth: 180 }}>
                      <div style={{ fontWeight: 700, fontSize: 17 }}>{w.kind}</div>
                      <div style={{ fontSize: 13, color: C.bodyMuted }}>with {w.with}</div>
                    </div>
                    <Col label="Duration" value={w.dur}/>
                    <Col label="Effort" value={w.effort}/>
                    <Col label="HR pre → post" value={w.hr}/>
                    <I name="chevR" size={22} color={C.muted} style={{ marginLeft: "auto" }}/>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function Col({ label, value }) {
  return (
    <div style={{ minWidth: 150 }}>
      <div style={{ fontSize: 12, color: C.bodyMuted, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 700 }}>{value}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 18: Profile / Settings
// ─────────────────────────────────────────────────────────────
function Profile() {
  const Row = ({ icon, title, sub, trail }) => (
    <div style={{ padding: "18px 22px", display: "flex", gap: 16, alignItems: "center", borderBottom: `1px solid ${C.line}` }}>
      <I name={icon} size={24} color={C.green}/>
      <div>
        <div style={{ fontWeight: 700, fontSize: 17 }}>{title}</div>
        {sub && <div style={{ fontSize: 14, color: C.bodyMuted }}>{sub}</div>}
      </div>
      <div style={{ marginLeft: "auto", fontSize: 14, color: C.bodyMuted, display: "flex", alignItems: "center", gap: 10 }}>
        {trail}
        <I name="chevR" size={18} color={C.muted}/>
      </div>
    </div>
  );
  return (
    <div style={{ width: 1080, height: 810, background: C.cream, fontFamily: F.body, color: C.green, position: "relative", overflow: "hidden" }}>
      <BackBar title="Your Profile"/>
      <div style={{ padding: "12px 60px 36px", display: "grid", gridTemplateColumns: "320px 1fr", gap: 28 }}>
        {/* Profile card */}
        <div style={{ background: "#FFF", borderRadius: 24, padding: 24, textAlign: "center" }}>
          <div style={{ width: 140, height: 140, borderRadius: 9999, margin: "0 auto 14px",
                        backgroundImage: "url(../../assets/patient-avatar.png)", backgroundSize: "cover", backgroundPosition: "center" }}/>
          <div style={{ ...titleCSS, fontSize: 30 }}>Elena Okafor</div>
          <div style={{ fontSize: 15, color: C.bodyMuted, marginTop: 4 }}>Member since Jan 2025 · Week 7 of 12</div>
          <div style={{ marginTop: 16, display: "flex", gap: 10, justifyContent: "center" }}>
            <span style={{ background: C.lime, color: C.green, padding: "6px 12px", borderRadius: 99, fontSize: 12, fontWeight: 700 }}>On track</span>
            <span style={{ background: C.cream, color: C.green, padding: "6px 12px", borderRadius: 99, fontSize: 12, fontWeight: 700, border: `1px solid ${C.line}` }}>5 day streak</span>
          </div>
        </div>
        {/* Settings list */}
        <div style={{ background: "#FFF", borderRadius: 24, overflow: "hidden" }}>
          <div style={{ padding: "18px 22px", fontSize: 13, color: C.bodyMuted, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>Devices & Pairing</div>
          <Row icon="heart" title="Heart-rate strap" sub="Polar H10 · Paired" trail="Connected"/>
          <Row icon="lungs" title="Pulse-oximeter" sub="Carda · Paired" trail="Connected"/>
          <Row icon="bp" title="Blood-pressure cuff" sub="Omron · Paired" trail="Connected"/>
          <div style={{ padding: "18px 22px", fontSize: 13, color: C.bodyMuted, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>Care</div>
          <Row icon="headset" title="Care team" sub="Michelle, Dr. Mike, Haley"/>
          <Row icon="message" title="Messages" sub="2 unread" trail={<span style={{ background: C.citrus, color: "#FFF", padding: "2px 8px", borderRadius: 99, fontSize: 11, fontWeight: 700 }}>2</span>}/>
          <Row icon="pill" title="Medications" sub="6 active"/>
          <div style={{ padding: "18px 22px", fontSize: 13, color: C.bodyMuted, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>System</div>
          <Row icon="gear" title="Display & captions"/>
          <Row icon="volume" title="Sound" sub="Volume 60%"/>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 19: Emergency / safety stop
// ─────────────────────────────────────────────────────────────
function EmergencyScreen() {
  return (
    <div style={{ width: 1080, height: 810, background: C.error, color: "#FFF", fontFamily: F.body, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at top, rgba(255,255,255,0.10), transparent 60%)" }}/>
      <div style={{ padding: "50px 70px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.12)", padding: "10px 18px", borderRadius: 9999 }}>
          <I name="alertT" size={22} color="#FFF"/>
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: ".08em", textTransform: "uppercase" }}>Session stopped — safety</span>
        </div>
        <div style={{ ...titleCSS, color: "#FFF", fontSize: 84, marginTop: 26, lineHeight: 1, maxWidth: 780 }}>
          Hold on — let's get you back to baseline.
        </div>
        <div style={{ fontSize: 20, opacity: .9, marginTop: 18, maxWidth: 700, lineHeight: 1.45 }}>
          Your heart rate crossed safe range. Sit down, breathe slowly, and Michelle is calling you now on the line.
        </div>

        <div style={{ marginTop: 44, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          <EmgStat label="Heart Rate" value="178 BPM" note="Target 65-90"/>
          <EmgStat label="Oxygen" value="94%" note="Last reading"/>
          <EmgStat label="Since alert" value="00:12" note="clinician connecting"/>
        </div>

        <div style={{ marginTop: 30, display: "flex", gap: 14 }}>
          <button style={{ flex: 1, height: 84, borderRadius: 9999, background: "#FFF", color: C.error, border: "none",
                           fontFamily: F.body, fontWeight: 700, fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <I name="phone" size={24} color={C.error} fill/> Call 911
          </button>
          <button style={{ flex: 1, height: 84, borderRadius: 9999, background: C.green, color: "#FFF", border: "none",
                           fontFamily: F.body, fontWeight: 700, fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <I name="headset" size={24} color="#FFF"/> Call Michelle
          </button>
        </div>
        <div style={{ marginTop: 18, fontSize: 15, opacity: .85 }}>I'm okay — <span style={{ textDecoration: "underline", fontWeight: 700 }}>tap here to dismiss (after 30s)</span></div>
      </div>
    </div>
  );
}
function EmgStat({ label, value, note }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 18, padding: 18 }}>
      <div style={{ fontSize: 14, opacity: .8 }}>{label}</div>
      <div style={{ ...titleCSS, color: "#FFF", fontSize: 44, marginTop: 2 }}>{value}</div>
      <div style={{ fontSize: 13, opacity: .72, marginTop: 4 }}>{note}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 20: Community / Learn library
// ─────────────────────────────────────────────────────────────
function LearnLibrary() {
  const topics = [
    { k: "Mindfulness", color: C.plum, count: 8, art: "plum" },
    { k: "Nutrition", color: C.lime, count: 12, art: "lime" },
    { k: "Movement", color: C.sky, count: 10, art: "sky" },
    { k: "Heart basics", color: "#FFF", count: 6, art: "cream" },
  ];
  const lessons = [
    { t: "Box breathing for angina", dur: "6 min", cat: "Mindfulness", color: C.plum },
    { t: "Reading a BP cuff", dur: "4 min", cat: "Heart basics", color: "#FFF" },
    { t: "Sodium in packaged food", dur: "8 min", cat: "Nutrition", color: C.lime },
    { t: "Stairs without getting winded", dur: "5 min", cat: "Movement", color: C.sky },
  ];
  return (
    <div style={{ width: 1080, height: 810, background: C.cream, fontFamily: F.body, color: C.green, position: "relative", overflow: "hidden" }}>
      <BackBar title="Learn"/>
      <div style={{ padding: "8px 60px 30px" }}>
        <div style={{ ...titleCSS, fontSize: 52 }}>Learn</div>
        <div style={{ fontSize: 17, color: C.bodyMuted, marginTop: 6 }}>Short lessons between sessions. Nothing to memorize — just watch or listen.</div>
        <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
          {topics.map(t => (
            <div key={t.k} style={{ background: t.color, borderRadius: 24, padding: 20, height: 140, position: "relative", color: t.color === "#FFF" ? C.green : C.green }}>
              <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: 9999,
                            background: t.color === C.lime ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.45)" }}/>
              <div style={{ position: "relative", ...titleCSS, fontSize: 26 }}>{t.k}</div>
              <div style={{ position: "relative", fontSize: 13, opacity: .7, marginTop: 4 }}>{t.count} lessons</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, fontWeight: 700, fontSize: 18 }}>Suggested for you</div>
        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
          {lessons.map(l => (
            <div key={l.t} style={{ background: "#FFF", borderRadius: 20, padding: 18, display: "flex", gap: 16, alignItems: "center" }}>
              <div style={{ width: 76, height: 76, borderRadius: 16, background: l.color, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <I name="play" size={26} color={C.green} fill/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: C.bodyMuted, textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 700 }}>{l.cat}</div>
                <div style={{ fontWeight: 700, fontSize: 17 }}>{l.t}</div>
                <div style={{ fontSize: 13, color: C.bodyMuted, marginTop: 2 }}>{l.dur}</div>
              </div>
              <I name="chevR" size={22} color={C.muted}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Milestone moments — celebratory overlays triggered mid- or
// post-session for first session, 36th (graduation), HR-in-range,
// streak, and recovery milestones.
// ─────────────────────────────────────────────────────────────
function MilestoneFirstSession() {
  return (
    <div style={{ width: 1080, height: 810, position: "relative", overflow: "hidden", fontFamily: F.body }}>
      <CoachBackdrop/>
      <SessionExit/>
      <PatientRailCompact/>
      <HrCard bpm="86" color={C.plum}/>
      <TimerCard remaining="02:14" label="Cooldown"/>
      <SessionFooter/>
      <MilestoneOverlay
        kind="first"
        title="Your first session — done."
        body="That's the hardest one. You moved, you breathed through it, and Michelle has your full summary waiting. We'll see you Wednesday."
        continueLabel="See my summary"
      />
    </div>
  );
}
function MilestoneGraduation() {
  return (
    <div style={{ width: 1080, height: 810, position: "relative", overflow: "hidden", fontFamily: F.body }}>
      <CoachBackdrop overlay="darken"/>
      <SessionExit/>
      <PatientRailCompact/>
      <HrCard bpm="74" color={C.plum}/>
      <TimerCard remaining="00:00" label="Complete"/>
      <SessionFooter/>
      <MilestoneOverlay
        kind="graduate"
        title="Session 36. You did it, Elena."
        body="You've completed your 12-week cardiac rehab program. Resting HR is down 6 BPM, BP is down 14 points, and you logged 34 of 36 sessions. Dr. Mike has your graduation call on the books."
        continueLabel="Celebrate & continue"
      />
    </div>
  );
}
function MilestoneInRange() {
  return (
    <div style={{ width: 1080, height: 810, position: "relative", overflow: "hidden", fontFamily: F.body }}>
      <CoachBackdrop/>
      <SessionExit/>
      <PatientRailCompact/>
      <HrCard bpm="78" color={C.plum}/>
      <TimerCard remaining="38:12" label="Interval"/>
      <SessionFooter/>
      <MilestoneOverlay
        kind="inRange"
        title="You hit your target — keep it steady."
        body="Heart rate crossed into your 65-90 BPM target zone. Stay here as long as it feels comfortable. Michelle will coach your breathing through it."
        continueLabel="Keep going"
      />
    </div>
  );
}
function MilestoneStreak() {
  return (
    <div style={{ width: 1080, height: 810, background: C.cream, fontFamily: F.body, color: C.green, position: "relative", overflow: "hidden" }}>
      <TopNav active="home"/>
      <HomeCircuit/>
      <MilestoneOverlay
        kind="streak"
        title="14 days, no missed check-in."
        body="Two weeks straight of daily check-ins. Your team sees every entry — this is how Michelle catches things early and keeps your plan tuned to how you actually feel."
        continueLabel="Nice"
      />
    </div>
  );
}


window.CARDA_TABLET_SCREENS = [
  // Onboarding
  { section: "Onboarding", id: "splash", label: "01 Splash", C: SplashScreen },
  { section: "Onboarding", id: "lock",   label: "02 Lock screen", C: LockScreen },
  // Home
  { section: "Home",       id: "home",           label: "03 Home · default", C: HomeScreen },
  { section: "Home",       id: "home-pre",       label: "04 Home · pre-session", C: HomePreSession },
  { section: "Home",       id: "home-clinician", label: "05 Home · clinician visit", C: HomeClinicianVisit },
  // Check-in
  { section: "Check-in",   id: "ci-question", label: "06 Check-in · feeling", C: CheckinQuestion },
  { section: "Check-in",   id: "ci-vitals",   label: "07 Check-in · vitals", C: CheckinVitals },
  // Live session
  { section: "Live session", id: "waiting",   label: "08 Waiting room", C: WaitingRoom },
  { section: "Live session", id: "not-connected", label: "09 Session · HR not connected", C: SessionNotConnected },
  { section: "Live session", id: "in-range",  label: "10 Session · in range", C: SessionInRange },
  { section: "Live session", id: "out-range", label: "11 Session · out of range", C: SessionOutOfRange },
  { section: "Live session", id: "paused",    label: "12 Session · paused", C: SessionPaused },
  { section: "Live session", id: "summary",   label: "13 Session · summary card", C: SessionSummary },
  // Post-session
  { section: "Post-session", id: "post-workout", label: "14 Post-workout recap", C: PostWorkout },
  // Care
  { section: "Care",       id: "team",    label: "15 Your team", C: MeetTeam },
  { section: "Journey",    id: "journey", label: "16 Your journey · 12 weeks", C: Journey },
  { section: "Journey",    id: "activity", label: "17 Activity log", C: ActivityLog },
  // Profile
  { section: "You",        id: "profile", label: "18 Profile · devices & settings", C: Profile },
  // Safety
  { section: "Safety",     id: "emergency", label: "19 Emergency · safety stop", C: EmergencyScreen },
  // Learn
  { section: "Learn",      id: "learn",   label: "20 Learn library", C: LearnLibrary },
  // Milestones (moments of delight)
  { section: "Milestones", id: "ms-first",     label: "21 First session complete", C: MilestoneFirstSession },
  { section: "Milestones", id: "ms-graduate",  label: "22 Session 36 · graduation", C: MilestoneGraduation },
  { section: "Milestones", id: "ms-in-range",  label: "23 First HR in target", C: MilestoneInRange },
  { section: "Milestones", id: "ms-streak",    label: "24 14-day check-in streak", C: MilestoneStreak },
];
