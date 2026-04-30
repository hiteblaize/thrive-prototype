/* global React, ReactDOM */
// Carda Provider Portal — faithful recreation of the Figma design.
//
// Key principles (per product feedback):
//  • NO left sidebar. Top bar only, so the video grid gets maximum pixels.
//  • Right-side "Coverage Requests" drawer is collapsible and holds both
//    clinician-requested coverage and AI (Cardy) escalations.
//  • Each patient tile is modular: status header (LATE / CHECK-IN — WEIGHT
//    / AI CALL), coverage / supervision banner pills, quick-stats row,
//    daily-checkin streak chip, action icon row. Tile background tints
//    change to signal state (neutral / peach = covering mine /
//    lavender = covered by other / red = escalated / pink = critical).

const { useState } = React;
const { Icon } = window;

// ─────────────────────────────────────────────────────────────
// Tokens
// ─────────────────────────────────────────────────────────────
const C = {
  green:   "#142E0F",
  lime:    "#D8E73C",
  cream:   "#F4F0EB",
  white:   "#FFFFFF",
  line:    "rgba(20,46,15,0.08)",
  line2:   "rgba(20,46,15,0.18)",
  muted:   "rgba(20,46,15,0.55)",
  bodyMut: "rgba(20,46,15,0.65)",
  error:   "#A60000",
  errorBg: "#F9E3E3",
  warn:    "#FFAC05",
  ok:      "#34CE00",
  // Tile tints (sampled from Figma)
  tintPeach:    "#F7C9B7", // "covering for …" / critical alert
  tintPeachBg:  "#FBDFCF",
  tintLavender: "#DCD1FA",
  tintLavenderBg: "#E8E0FB",
  tintPink:     "#F6D4D4",
  tintPinkBg:   "#FADEDE",
};

const F = {
  display: 'ABC Marist, Georgia, serif',
  body: 'Circular Std, -apple-system, system-ui, sans-serif',
};

// ─────────────────────────────────────────────────────────────
// Little primitives
// ─────────────────────────────────────────────────────────────
const pill = (bg, color) => ({
  display: "inline-flex", alignItems: "center", gap: 6, height: 28, padding: "0 12px",
  borderRadius: 9999, background: bg, color, fontFamily: F.body, fontWeight: 700, fontSize: 13,
  letterSpacing: ".04em", whiteSpace: "nowrap",
});

function Chip({ kind, icon, children }) {
  const map = {
    late:     { bg: C.error,   color: "#FFF", caps: true },
    "checkin-weight": { bg: C.error, color: "#FFF", caps: true },
    "checkin-bp":     { bg: C.error, color: "#FFF", caps: true },
    "checkin-hr":     { bg: C.error, color: "#FFF", caps: true },
    ai:       { bg: "#FFF",    color: C.green, caps: false, border: `1px solid ${C.line2}` },
    covered:  { bg: C.lime,    color: C.green, caps: true },
    covering: { bg: C.lime,    color: C.green, caps: true },
    supervising: { bg: "#34CE00", color: "#FFF", caps: true },
    youCovering: { bg: C.lime, color: C.green, caps: true },
    streak:   { bg: C.lime,    color: C.green, caps: true },
    streakDark: { bg: C.green, color: C.lime, caps: true },
    warning:  { bg: "#FFAC05", color: C.green, caps: true },
    success:  { bg: C.ok,      color: "#FFF", caps: true },
  }[kind] || { bg: "#FFF", color: C.green, caps: false, border: `1px solid ${C.line2}` };
  return (
    <span style={{ ...pill(map.bg, map.color), textTransform: map.caps ? "uppercase" : "none",
                   border: map.border, fontSize: 12, height: 26 }}>
      {icon && <Icon name={icon} variant="solid" size={12} color={map.color}/>}
      {children}
    </span>
  );
}

// Circular action icon button (used on bottom rail of each tile)
function ActionIcon({ icon, bg = C.green, color = "#FFF", active = false, size = 36 }) {
  return (
    <button style={{
      width: size, height: size, borderRadius: 9999, border: "none",
      background: active ? C.lime : bg, color: active ? C.green : color,
      display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
      fontFamily: F.body,
    }}>
      <Icon name={icon} variant="solid" size={size*0.42} color={active ? C.green : color}/>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Top bar — no left sidebar; portal-wide chrome lives up here
// ─────────────────────────────────────────────────────────────
function TopBar({ onCoverage, coverageOpen, coverageCount }) {
  return (
    <header style={{
      height: 64, background: "#FFF", borderBottom: `1px solid ${C.line}`,
      display: "flex", alignItems: "center", padding: "0 16px", gap: 14, flexShrink: 0, zIndex: 5,
    }}>
      {/* Logo + wordmark */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img src="../../assets/carda-symbol.svg" style={{ width: 26, height: 28 }}/>
        <span style={{ fontFamily: F.body, fontWeight: 700, fontSize: 20, color: C.green, letterSpacing: "-0.01em" }}>carda</span>
        <span style={{ fontFamily: F.body, fontWeight: 400, fontSize: 20, color: C.green, letterSpacing: "-0.01em" }}>health</span>
      </div>
      {/* Tabs */}
      <nav style={{ display: "flex", gap: 2, marginLeft: 20 }}>
        {[
          { k: "live",    label: "Live Session", active: true },
          { k: "notes",   label: "Notes Review" },
          { k: "sessions", label: "Sessions" },
        ].map(t => (
          <button key={t.k} style={{
            padding: "10px 16px", fontFamily: F.body, fontWeight: 700, fontSize: 13, letterSpacing: ".04em",
            textTransform: "uppercase", border: "none", cursor: "pointer",
            background: t.active ? C.green : "transparent", color: t.active ? "#FFF" : C.green,
            borderRadius: 6,
          }}>{t.label}</button>
        ))}
      </nav>
      <div style={{ flex: 1 }}/>
      {/* Middle search + filters */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, height: 36, padding: "0 12px",
                      borderRadius: 6, border: `1px solid ${C.line2}`, background: "#FFF", width: 220 }}>
          <Icon name="magnifying-glass" variant="regular" size={12} color={C.muted}/>
          <span style={{ fontSize: 13, color: C.muted }}>Patient Name</span>
        </div>
        <Select label="Shift: AM" icon="clock"/>
        <Select label="All Providers" icon="user-doctor"/>
      </div>
      {/* Broadcast / message */}
      <button style={btnSm(C.green, "#FFF")}>Broadcast to All Patients</button>
      <button style={btnSm("#FFF", C.green, true)}>Message All Patients</button>
      {/* Coverage drawer toggle */}
      <button onClick={onCoverage} title="Coverage Requests" style={{
        position: "relative", width: 40, height: 40, borderRadius: 9999,
        border: `1px solid ${C.line2}`, background: coverageOpen ? C.lime : "#FFF",
        display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
      }}>
        <Icon name="bell" variant="solid" size={15} color={C.green}/>
        {coverageCount > 0 && (
          <span style={{ position: "absolute", top: -4, right: -4, background: C.error, color: "#FFF",
                         fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 9999, minWidth: 18, textAlign: "center" }}>
            {coverageCount}
          </span>
        )}
      </button>
      {/* Provider avatar */}
      <div style={{ width: 36, height: 36, borderRadius: 9999, background: C.lime, color: C.green,
                    display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 }}>NA</div>
    </header>
  );
}

function Select({ label, icon }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, height: 36, padding: "0 12px",
                  borderRadius: 6, border: `1px solid ${C.line2}`, background: "#FFF",
                  fontFamily: F.body, fontSize: 13, color: C.green, fontWeight: 700 }}>
      {icon && <Icon name={icon} variant="regular" size={12} color={C.green}/>}
      <span>{label}</span>
      <Icon name="chevron-down" variant="solid" size={10} color={C.muted}/>
    </div>
  );
}

function btnSm(bg, color, outlined) {
  return {
    height: 36, padding: "0 14px", borderRadius: 6, border: outlined ? `1px solid ${C.line2}` : "none",
    background: bg, color, fontFamily: F.body, fontWeight: 700, fontSize: 12,
    letterSpacing: ".04em", textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap",
  };
}

// ─────────────────────────────────────────────────────────────
// Patient tile — modular, tinted by state
// ─────────────────────────────────────────────────────────────
function PatientTile({ p }) {
  const tint = p.tint || "white"; // white | peach | lavender | pink | red
  const tintMap = {
    white:    { bg: "#FFF",           header: "#FFF",           border: C.line2 },
    peach:    { bg: C.tintPeachBg,    header: C.tintPeach,      border: "rgba(20,46,15,0.14)" },
    lavender: { bg: C.tintLavenderBg, header: C.tintLavender,   border: "rgba(20,46,15,0.14)" },
    pink:     { bg: C.tintPinkBg,     header: C.tintPink,       border: "rgba(20,46,15,0.14)" },
    red:      { bg: "#FCE4E4",        header: "#F6C9C9",        border: C.error },
  }[tint] || { bg: "#FFF", header: "#FFF", border: C.line2 };

  return (
    <div style={{
      background: tintMap.bg, border: `1px solid ${tintMap.border}`, borderRadius: 10, overflow: "hidden",
      display: "flex", flexDirection: "column", position: "relative",
    }}>
      {/* Row 1: name + right-side tabs */}
      <div style={{ padding: "8px 12px 4px", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontFamily: F.body, fontWeight: 700, fontSize: 17, color: C.green, letterSpacing: "-0.01em" }}>{p.name}</span>
        <Icon name="pen-to-square" variant="regular" size={11} color={C.muted}/>
        <div style={{ flex: 1 }}/>
        <TileTabs/>
      </div>
      {/* Row 2: SMART / quick desc */}
      <div style={{ padding: "0 12px 6px", display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.green }}>
        <span style={{ fontWeight: 700 }}>SMART</span>
        <span style={{ color: C.muted }}>· Goals Session w/ Nicole</span>
        <Icon name="pen-to-square" variant="regular" size={10} color={C.muted}/>
      </div>
      {/* Row 3: device pairing toggles + status chips */}
      <div style={{ padding: "0 12px 6px", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <MiniToggle label="Polar HR" on={p.polar ?? true}/>
        <MiniToggle label="xLabs HR" on={p.xlabs ?? false}/>
        <MiniPill label={`Vitals ${p.vitalsDone ?? 3}/5`}/>
        <div style={{ flex: 1 }}/>
        {p.statusChips?.map((c, i) => <Chip key={i} {...c}>{c.label}</Chip>)}
      </div>
      {/* Row 4: Big state banner pills (COVERED BY / SUPERVISING etc.) */}
      {(p.bannerLeft || p.bannerRight) && (
        <div style={{ padding: "0 12px 8px", display: "flex", alignItems: "center", gap: 6 }}>
          {/* siren alert dot */}
          {p.alertDot && (
            <div style={{ width: 22, height: 22, borderRadius: 9999, background: C.lime, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name="triangle-exclamation" variant="solid" size={11} color={C.green}/>
            </div>
          )}
          {p.bannerLeft && <BannerPill kind={p.bannerLeft.kind} icon={p.bannerLeft.icon}>{p.bannerLeft.label}</BannerPill>}
          {p.bannerRight && <BannerPill kind={p.bannerRight.kind} icon={p.bannerRight.icon}>{p.bannerRight.label}</BannerPill>}
        </div>
      )}
      {/* Row 5: stats grid (left) + video feed (right) */}
      <div style={{ padding: "0 12px 6px", display: "grid", gridTemplateColumns: "1fr 1.35fr", gap: 10 }}>
        <StatTable data={p.stats} tint={tint}/>
        <VideoFeed me={p.me} second={p.second}/>
      </div>
      {/* Row 6: Quick Stats tabs (ECG / GMFQ / ...) */}
      <div style={{ padding: "4px 12px 2px" }}>
        <QuickStatTabs/>
      </div>
      {/* Row 7: Check-in streak pill + local dispatch + education + progress */}
      <div style={{ padding: "4px 12px 10px", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 10, alignItems: "center" }}>
        <StreakChip days={p.streak ?? 5} lastCheckin={p.lastCheckin}/>
        <KeyPairs data={p.keyPairs}/>
        <ProgressLink value={p.progress}/>
      </div>
      {/* Row 8: action buttons (Enable Exercise / Complete Session + bottom rail) */}
      <div style={{ padding: "8px 12px 12px", display: "flex", alignItems: "center", gap: 8, borderTop: `1px solid ${C.line}` }}>
        <SmallActionBtn label="Enable Exercise"/>
        <SmallActionBtn label="Complete Session"/>
        <div style={{ flex: 1 }}/>
        <ActionIcon icon="microphone-slash" bg={C.green} color="#FFF"/>
        <ActionIcon icon="comment-dots" bg={C.green} color="#FFF"/>
        <ActionIcon icon="comment-medical" bg={C.green} color="#FFF"/>
        <ActionIcon icon="video" bg={C.green} color="#FFF"/>
        <ActionIcon icon="phone-xmark" bg={C.error} color="#FFF"/>
      </div>
    </div>
  );
}

// Mini toggle: label with a tiny switch, used for "Polar HR", "xLabs HR"
function MiniToggle({ label, on }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: C.green }}>
      <span style={{ fontWeight: 700 }}>{label}</span>
      <Icon name="pen-to-square" variant="regular" size={9} color={C.muted}/>
      <div style={{ width: 22, height: 12, borderRadius: 9999, background: on ? C.green : "rgba(20,46,15,0.18)",
                    padding: 1, display: "flex", alignItems: "center",
                    justifyContent: on ? "flex-end" : "flex-start" }}>
        <div style={{ width: 10, height: 10, borderRadius: 9999, background: "#FFF" }}/>
      </div>
    </div>
  );
}
function MiniPill({ label }) {
  return (
    <span style={{ ...pill("#FFF", C.green), fontSize: 11, height: 22, border: `1px solid ${C.line2}`, fontWeight: 700 }}>
      {label}
    </span>
  );
}
function TileTabs() {
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center", fontSize: 11, color: C.green, fontWeight: 700 }}>
      <span style={{ display: "flex", gap: 4, alignItems: "center", padding: "4px 8px", border: `1px solid ${C.line2}`, borderRadius: 6 }}>
        <Icon name="heart-pulse" variant="solid" size={10} color={C.green}/> Vitals
      </span>
      <span style={{ display: "flex", gap: 4, alignItems: "center", padding: "4px 8px", border: `1px solid ${C.line2}`, borderRadius: 6 }}>
        <Icon name="up-right-from-square" variant="regular" size={10} color={C.green}/> Canvas
      </span>
    </div>
  );
}
function BannerPill({ kind, icon, children }) {
  const map = {
    covered:     { bg: C.lime,    color: C.green, border: `1px solid ${C.green}` },
    covering:    { bg: C.lime,    color: C.green, border: "none" },
    youCovering: { bg: C.lime,    color: C.green, border: "none" },
    supervising: { bg: "#34CE00", color: "#FFF",  border: "none" },
    gardySuper:  { bg: "#34CE00", color: "#FFF",  border: "none" },
    preSession:  { bg: C.warn,    color: C.green, border: "none" },
    waiting:     { bg: C.lime,    color: C.green, border: "none" },
  }[kind] || { bg: "#FFF", color: C.green, border: `1px solid ${C.line2}` };
  return (
    <span style={{ ...pill(map.bg, map.color), textTransform: "uppercase", fontSize: 11,
                   height: 26, border: map.border, fontWeight: 700 }}>
      {icon && <Icon name={icon} variant="solid" size={11} color={map.color}/>}
      {children}
    </span>
  );
}

// Stat table — the left chunk inside the tile
function StatTable({ data }) {
  const rows = data || defaultStats;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3, fontSize: 11.5 }}>
      {rows.map((r, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8,
                              color: C.green, lineHeight: 1.35 }}>
          <span style={{ color: C.bodyMut, fontWeight: 400 }}>{r.label}</span>
          <span style={{ fontWeight: 700, textAlign: "right",
                         color: r.color || C.green }}>{r.value}</span>
        </div>
      ))}
      <a style={{ fontSize: 11, color: C.green, textDecoration: "underline", marginTop: 2, cursor: "pointer", fontWeight: 700 }}>View Vitals History</a>
    </div>
  );
}
const defaultStats = [
  { label: "Status", value: "Pre-Session" },
  { label: "BP", value: "128/87" },
  { label: "Target HR", value: "108-128" },
  { label: "BP Before", value: "148/98" },
  { label: "SpO2 Before", value: "97" },
  { label: "SpO2 After", value: "—" },
  { label: "Mic", value: "Off" },
];

// Video feed: primary coach-view + secondary patient-view (patient-tile)
function VideoFeed({ me, second }) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      <div style={{ flex: 2, aspectRatio: "16/10", borderRadius: 6, background: "#B7BBBE",
                    position: "relative", overflow: "hidden", minHeight: 110,
                    backgroundImage: "linear-gradient(135deg, #9FA7AC 0%, #BFC3C6 100%)" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: .5 }}>
          <Icon name="image" variant="solid" size={38} color="#6C7277"/>
        </div>
        {second && (
          <div style={{ position: "absolute", bottom: 6, right: 6, fontSize: 11, color: "#FFF",
                        background: "rgba(0,0,0,0.5)", padding: "2px 6px", borderRadius: 4 }}>{second}</div>
        )}
      </div>
      {me && (
        <div style={{ flex: 1, borderRadius: 6, background: "#B7BBBE", position: "relative", overflow: "hidden", minHeight: 110 }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: .45 }}>
            <Icon name="image" variant="solid" size={28} color="#6C7277"/>
          </div>
          <div style={{ position: "absolute", bottom: 6, left: 6, fontSize: 10, color: "#FFF",
                        background: "rgba(0,0,0,0.5)", padding: "2px 6px", borderRadius: 4 }}>You</div>
        </div>
      )}
    </div>
  );
}

function QuickStatTabs() {
  const items = ["Quick Stats", "ECG", "GMFQ", "Community Events", "Activity Log", "CEP Survey"];
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center", borderBottom: `1px solid ${C.line}`, paddingBottom: 4 }}>
      {items.map((t, i) => (
        <span key={t} style={{ fontSize: 10.5, color: i === 0 ? C.green : C.muted, fontWeight: 700,
                                padding: "3px 6px", borderBottom: i === 0 ? `2px solid ${C.green}` : "none",
                                marginBottom: i === 0 ? -5 : 0 }}>
          {t}
        </span>
      ))}
      <span style={{ marginLeft: "auto", fontSize: 10, color: C.muted }}>iOS</span>
      <Icon name="arrow-up-right-from-square" variant="regular" size={9} color={C.muted}/>
    </div>
  );
}

function StreakChip({ days, lastCheckin }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.error, color: "#FFF",
                  borderRadius: 9999, padding: "3px 10px 3px 4px", fontWeight: 700, fontSize: 11 }}>
      <div style={{ width: 22, height: 22, borderRadius: 9999, background: "#FFF", color: C.error,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700 }}>{days}</div>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <span style={{ fontSize: 9, opacity: .9, letterSpacing: ".04em" }}>{days > 0 ? `${days} DAY STREAK` : "NO STREAK"}</span>
        <span style={{ fontSize: 11 }}>Daily Checkin</span>
        <span style={{ fontSize: 9, opacity: .9 }}>{lastCheckin || "Last 30 Days"}</span>
      </div>
    </div>
  );
}

function KeyPairs({ data }) {
  const rows = data || [
    { label: "Local Dispatch", value: "(203) 555-1421" },
    { label: "Education", value: "5/10 Completed" },
    { label: "Progress Report", value: "Open", accent: true },
  ];
  return (
    <div style={{ display: "flex", gap: 14, fontSize: 11, color: C.green, overflow: "hidden" }}>
      {rows.map((r, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <span style={{ color: C.muted, fontSize: 10 }}>{r.label}</span>
          <span style={{ fontWeight: 700, color: r.accent ? C.green : C.green,
                         background: r.accent ? C.lime : "transparent", padding: r.accent ? "1px 8px" : 0,
                         borderRadius: r.accent ? 9999 : 0, fontSize: r.accent ? 10 : 11 }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

function ProgressLink({ value = "Jan 4, 2025 — Jan 6, 2025" }) {
  return (
    <div style={{ fontSize: 10, color: C.muted }}>{value}</div>
  );
}

function SmallActionBtn({ label, primary }) {
  return (
    <button style={{
      height: 28, padding: "0 10px", borderRadius: 6, border: primary ? "none" : `1px solid ${C.line2}`,
      background: primary ? C.green : "#FFF", color: primary ? "#FFF" : C.green,
      fontFamily: F.body, fontWeight: 700, fontSize: 10, letterSpacing: ".04em",
      textTransform: "uppercase", cursor: "pointer",
    }}>{label}</button>
  );
}

// ─────────────────────────────────────────────────────────────
// Coverage Requests drawer (right-side, collapsible)
// ─────────────────────────────────────────────────────────────
function CoverageDrawer({ open, onClose, items }) {
  return (
    <aside style={{
      width: open ? 380 : 42, flexShrink: 0, background: "#FFF",
      borderLeft: `1px solid ${C.line}`, display: "flex", flexDirection: "column",
      transition: "width 0.2s ease",
    }}>
      {/* header */}
      <div style={{ padding: open ? "14px 16px" : "14px 6px", borderBottom: `1px solid ${C.line}`,
                     display: "flex", alignItems: "center", gap: 10,
                     writingMode: open ? "horizontal-tb" : "vertical-rl" }}>
        {!open && (
          <button onClick={onClose} style={{ border: "none", background: "transparent", cursor: "pointer",
                                              writingMode: "vertical-rl", transform: "rotate(180deg)",
                                              fontFamily: F.body, fontWeight: 700, fontSize: 13, color: C.green,
                                              letterSpacing: ".06em", textTransform: "uppercase",
                                              display: "flex", alignItems: "center", gap: 8, padding: "10px 4px" }}>
            <Icon name="bell" variant="solid" size={13} color={C.green}/>
            Coverage Requests
            {items.length > 0 && <span style={{ background: C.error, color: "#FFF", fontSize: 10, padding: "2px 6px", borderRadius: 9999 }}>{items.length}</span>}
          </button>
        )}
        {open && (
          <>
            <Icon name="bell" variant="solid" size={16} color={C.green}/>
            <span style={{ fontFamily: F.body, fontWeight: 700, fontSize: 16, color: C.green }}>Coverage Requests</span>
            <span style={{ background: C.error, color: "#FFF", fontSize: 11, padding: "2px 7px", borderRadius: 9999, fontWeight: 700 }}>{items.length}</span>
            <div style={{ flex: 1 }}/>
            <button onClick={onClose} style={{ border: "none", background: "transparent", cursor: "pointer", color: C.muted }}>
              <Icon name="chevron-right" variant="solid" size={14} color={C.muted}/>
            </button>
          </>
        )}
      </div>
      {open && (
        <div style={{ overflow: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((it, i) => <CoverageCard key={i} {...it}/>)}
          <div style={{ textAlign: "center", fontSize: 12, color: C.muted, padding: "20px 0" }}>No more requests</div>
        </div>
      )}
    </aside>
  );
}

function CoverageCard({ patient, requestedBy, age, condition, specialNeeds, reason, plan, note, kind, timestamp, ai }) {
  const headerBg = kind === "critical" ? C.error : (kind === "ai" ? C.green : "#FFF");
  return (
    <div style={{ border: `1px solid ${kind === "critical" ? C.error : C.line2}`, borderRadius: 8, overflow: "hidden", background: "#FFF" }}>
      {/* header */}
      <div style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 8,
                     background: kind === "critical" ? C.errorBg : "#FFF",
                     borderBottom: `1px solid ${C.line}` }}>
        <Icon name={ai ? "robot" : "file-user"} variant="solid" size={14} color={kind === "critical" ? C.error : C.green}/>
        <span style={{ fontFamily: F.body, fontWeight: 700, fontSize: 15, color: kind === "critical" ? C.error : C.green }}>{patient}</span>
        {ai && <span style={{ ...pill(C.green, C.lime), height: 20, fontSize: 10 }}>AI ESCALATION</span>}
        <span style={{ marginLeft: "auto", fontSize: 11, color: C.muted }}>{timestamp}</span>
      </div>
      <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.green }}>
          <Icon name="user-doctor" variant="regular" size={11} color={C.green}/>
          <span>Requested By: <b>{requestedBy}</b></span>
        </div>
        {/* Expanded patient details */}
        <div style={{ border: `1px solid ${C.lime}`, borderRadius: 6, padding: "8px 10px",
                       display: "flex", alignItems: "center", gap: 6, fontFamily: F.body, fontWeight: 700, fontSize: 13, color: C.green }}>
          View Patient Details
          <Icon name="chevron-down" variant="solid" size={11} color={C.green} style={{ marginLeft: "auto" }}/>
        </div>
        {/* detail rows */}
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", columnGap: 10, rowGap: 4, fontSize: 12 }}>
          <span style={{ fontWeight: 700, color: C.green }}>Age:</span>
          <span style={{ textAlign: "right", color: C.green }}>{age}</span>
          <span style={{ fontWeight: 700, color: C.green }}>Condition:</span>
          <span style={{ textAlign: "right", color: C.green }}>{condition}</span>
          <span style={{ fontWeight: 700, color: C.green }}>Special Needs:</span>
          <span style={{ textAlign: "right", color: C.green }}>{specialNeeds}</span>
          <span style={{ fontWeight: 700, color: C.green }}>Coverage Reason:</span>
          <span style={{ textAlign: "right", color: C.green }}>{reason}</span>
          <span style={{ fontWeight: 700, color: C.green, gridColumn: "1 / 3" }}>Session Plan:</span>
          <span style={{ gridColumn: "1 / 3", color: C.green, fontSize: 12 }}>{plan}</span>
        </div>
        {note && (
          <>
            <div style={{ fontWeight: 700, color: C.green, fontSize: 12 }}>Coverage Note:</div>
            <div style={{ border: `1px solid ${C.error}`, borderRadius: 6, padding: "8px 10px", fontSize: 12, color: C.green, lineHeight: 1.4 }}>{note}</div>
          </>
        )}
        {/* actions */}
        <div style={{ display: "flex", gap: 8, paddingTop: 4 }}>
          <button style={{ flex: 1, height: 40, borderRadius: 9999, border: `1px solid ${C.line2}`, background: "#FFF",
                            color: C.green, fontFamily: F.body, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Decline</button>
          <button style={{ flex: 1, height: 40, borderRadius: 9999, border: "none", background: C.green,
                            color: "#FFF", fontFamily: F.body, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Accept</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Data — 9 patients, each in a different state
// ─────────────────────────────────────────────────────────────
const PATIENTS = [
  {
    name: "Robert Morse", tint: "white",
    statusChips: [{ kind: "late", icon: "clock", label: "LATE" }, { kind: "ai", icon: "phone", label: "AI Call" }],
    stats: [
      { label: "Polar HR", value: "—" }, { label: "Heart Rate", value: "—" },
      { label: "Time Elapsed", value: "02:25" }, { label: "Mic", value: "Off" },
      { label: "Status", value: "PRE-SESSION" },
      { label: "Target HR", value: "108-128" },
      { label: "BP Before", value: "148/98" },
      { label: "SpO2 Before", value: "97" },
      { label: "SpO2 After", value: "—" },
    ],
    second: "Robert",
    streak: 12, lastCheckin: "Last 30 Days",
    progress: "Jan 4, 2025 — Jan 6, 2025",
  },
  {
    name: "Timothy Gallagher", tint: "white",
    statusChips: [{ kind: "warning", icon: "door-open", label: "Waiting Room" }],
    stats: [
      { label: "Polar HR", value: "68" },
      { label: "Heart Rate", value: "72" },
      { label: "Time Elapsed", value: "—" },
      { label: "Mic", value: "Muted" },
      { label: "Status", value: "WAITING" },
      { label: "Target HR", value: "100-120" },
      { label: "BP Before", value: "142/92" },
      { label: "SpO2 Before", value: "98" },
    ],
    streak: 5,
    progress: "Jan 4, 2025 — Jan 6, 2025",
  },
  {
    name: "Michael Oliver", tint: "peach",
    bannerLeft: { kind: "covering", icon: "hand-holding-medical", label: "Covering for Nicole" },
    bannerRight: { kind: "supervising", icon: "display", label: "Cardy Supervising" },
    alertDot: true,
    statusChips: [{ kind: "late", icon: "clock", label: "LATE" }, { kind: "ai", icon: "phone", label: "AI Call" }],
    stats: [
      { label: "Polar HR", value: "112" },
      { label: "Heart Rate", value: "114" },
      { label: "Time Elapsed", value: "18:42" },
      { label: "Mic", value: "On" },
      { label: "Status", value: "EXERCISING" },
      { label: "Target HR", value: "108-128" },
      { label: "BP Before", value: "138/89" },
      { label: "SpO2 Before", value: "97" },
      { label: "SpO2 After", value: "96" },
    ],
    streak: 18, lastCheckin: "Last 30 Days",
    progress: "Jan 4, 2025 — Jan 6, 2025",
  },
  {
    name: "Sarah Martinez", tint: "lavender",
    bannerLeft: { kind: "covered", icon: "shield-check", label: "Covered by Nicole" },
    bannerRight: { kind: "supervising", icon: "display", label: "Cardy Supervising" },
    statusChips: [{ kind: "late", icon: "clock", label: "LATE" }, { kind: "ai", icon: "phone", label: "AI Call" }],
    stats: [
      { label: "Polar HR", value: "98" },
      { label: "Heart Rate", value: "101" },
      { label: "Time Elapsed", value: "22:10" },
      { label: "Mic", value: "Off" },
      { label: "Status", value: "COOLDOWN" },
      { label: "Target HR", value: "95-118" },
      { label: "BP Before", value: "128/82" },
      { label: "SpO2 Before", value: "99" },
      { label: "SpO2 After", value: "98" },
    ],
    streak: 7,
    progress: "Jan 4, 2025 — Jan 6, 2025",
  },
  {
    name: "David Chen", tint: "white",
    statusChips: [{ kind: "checkin-weight", icon: "weight-scale", label: "CHECK IN — WEIGHT" }, { kind: "ai", icon: "phone", label: "AI Call" }],
    stats: [
      { label: "Polar HR", value: "88" },
      { label: "Heart Rate", value: "90" },
      { label: "Time Elapsed", value: "04:18" },
      { label: "Mic", value: "On" },
      { label: "Status", value: "WARM-UP" },
      { label: "Target HR", value: "102-122" },
      { label: "BP Before", value: "132/84" },
      { label: "SpO2 Before", value: "98" },
      { label: "SpO2 After", value: "—" },
    ],
    streak: 21,
    progress: "Jan 4, 2025 — Jan 6, 2025",
  },
  {
    name: "Evelyn Santos", tint: "red",
    statusChips: [{ kind: "checkin-bp", icon: "heart-pulse", label: "CHECK IN — BP" }, { kind: "ai", icon: "phone", label: "AI Call" }],
    stats: [
      { label: "Polar HR", value: "162", color: C.error },
      { label: "Heart Rate", value: "168", color: C.error },
      { label: "Time Elapsed", value: "12:02" },
      { label: "Mic", value: "On" },
      { label: "Status", value: "HR OUT OF RANGE", color: C.error },
      { label: "Target HR", value: "98-118" },
      { label: "BP Before", value: "156/102" },
      { label: "SpO2 Before", value: "94" },
      { label: "SpO2 After", value: "92" },
    ],
    streak: 0,
    progress: "Jan 4, 2025 — Jan 6, 2025",
  },
  {
    name: "Anna Khan", tint: "lavender",
    bannerLeft: { kind: "youCovering", icon: "hand-holding-medical", label: "You are covering" },
    bannerRight: { kind: "supervising", icon: "display", label: "Cardy Supervising" },
    statusChips: [{ kind: "ai", icon: "phone", label: "AI Call" }],
    stats: [
      { label: "Polar HR", value: "104" },
      { label: "Heart Rate", value: "106" },
      { label: "Time Elapsed", value: "26:14" },
      { label: "Mic", value: "Off" },
      { label: "Status", value: "EXERCISING" },
      { label: "Target HR", value: "100-120" },
      { label: "BP Before", value: "126/80" },
      { label: "SpO2 Before", value: "98" },
      { label: "SpO2 After", value: "97" },
    ],
    streak: 9,
    progress: "Jan 4, 2025 — Jan 6, 2025",
  },
  {
    name: "Bob Bobberson", tint: "pink",
    bannerLeft: { kind: "preSession", icon: "user-clock", label: "Pre-Session" },
    bannerRight: { kind: "gardySuper", icon: "display", label: "Cardy Supervising" },
    statusChips: [{ kind: "late", icon: "clock", label: "LATE" }, { kind: "ai", icon: "phone", label: "AI Call" }],
    stats: [
      { label: "Polar HR", value: "—" },
      { label: "Heart Rate", value: "—" },
      { label: "Time Elapsed", value: "—" },
      { label: "Mic", value: "Off" },
      { label: "Status", value: "PRE-SESSION" },
      { label: "Target HR", value: "108-128" },
      { label: "BP Before", value: "—" },
      { label: "SpO2 Before", value: "—" },
      { label: "SpO2 After", value: "—" },
    ],
    streak: 3,
    progress: "Jan 4, 2025 — Jan 6, 2025",
  },
  {
    name: "Grace Liu", tint: "white",
    bannerLeft: { kind: "waiting", icon: "door-open", label: "Waiting Room" },
    statusChips: [{ kind: "ai", icon: "phone", label: "AI Call" }],
    stats: [
      { label: "Polar HR", value: "72" },
      { label: "Heart Rate", value: "74" },
      { label: "Time Elapsed", value: "—" },
      { label: "Mic", value: "Ready" },
      { label: "Status", value: "WAITING" },
      { label: "Target HR", value: "95-115" },
      { label: "BP Before", value: "118/76" },
      { label: "SpO2 Before", value: "99" },
      { label: "SpO2 After", value: "—" },
    ],
    streak: 14,
    progress: "Jan 4, 2025 — Jan 6, 2025",
  },
];

const COVERAGE_ITEMS = [
  {
    patient: "James Wilson", timestamp: "2 min ago",
    requestedBy: "Nicole Allen", age: 67, condition: "Post-MI Cardyac Rehab",
    specialNeeds: "Male CEP ONLY", reason: "OOO",
    plan: "Session 36, Seated Chair Yoga and Pilates",
    note: "Here is some note about the patient which you should be aware of. Lorem ipsum lorem ipsum.",
  },
  {
    patient: "Evelyn Santos", timestamp: "just now", kind: "critical", ai: true,
    requestedBy: "Cardy AI", age: 72, condition: "Post-CABG, Afib",
    specialNeeds: "Female only, CEP preferred", reason: "HR sustained > 160 BPM",
    plan: "Session 12 — Seated mobility + breathing",
    note: "Cardy paused session. Patient HR above target for 90 seconds. Recommend immediate clinician pickup.",
  },
  {
    patient: "David Chen", timestamp: "5 min ago",
    requestedBy: "Michelle Park", age: 58, condition: "Heart Failure (HFrEF)",
    specialNeeds: "None", reason: "Back-to-back coverage",
    plan: "Session 8 — Build phase, resistance bands",
  },
];

// ─────────────────────────────────────────────────────────────
// App shell
// ─────────────────────────────────────────────────────────────
function App() {
  const [drawer, setDrawer] = useState(true);
  return (
    <div style={{ minHeight: "100vh", background: C.cream, display: "flex", flexDirection: "column" }}>
      <TopBar onCoverage={() => setDrawer(v => !v)} coverageOpen={drawer} coverageCount={COVERAGE_ITEMS.length}/>
      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>
        <main style={{ flex: 1, padding: 14, overflow: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 14, maxWidth: 1800, margin: "0 auto" }}>
            {PATIENTS.map((p, i) => <PatientTile key={i} p={p}/>)}
          </div>
        </main>
        <CoverageDrawer open={drawer} onClose={() => setDrawer(v => !v)} items={COVERAGE_ITEMS}/>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
