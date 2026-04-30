/* global React */
// Carda Patient Mobile — shared primitives and all screens.
// Each Screen returns the *inner* content (no device chrome); the canvas
// wraps it in an iOS frame. Dimensions assume 402w × 874h iPhone 16.

const { useState, useEffect } = React;

/* ============================================================
   Inline SVG icon helper (matches preview/brand-icons.html)
   ============================================================ */
const ICON_PATHS = {
  heart: `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>`,
  "heart-pulse": `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/><path d="M3.2 12h3.5l2-4 3 7 2-4h3.6"/>`,
  droplet: `<path d="M12 3s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11z"/>`,
  lungs: `<path d="M6 20c1.6 0 3-1.4 3-3V12M18 20c-1.6 0-3-1.4-3-3V12"/><path d="M9 12c0-2 2-2.5 3-2.5s3 .5 3 2.5"/><path d="M12 2v7.5"/><path d="M6 20c-1.6 0-3-1.4-3-3 0-2.4 2.3-3.8 3-5C6.8 10.6 9 9 9 7"/><path d="M18 20c1.6 0 3-1.4 3-3 0-2.4-2.3-3.8-3-5C17.2 10.6 15 9 15 7"/>`,
  activity: `<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>`,
  check: `<path d="M4 12l6 6L20 6"/>`,
  x: `<path d="M6 6l12 12"/><path d="M18 6L6 18"/>`,
  "chevron-right": `<path d="M9 6l6 6-6 6"/>`,
  "chevron-left": `<path d="M15 6l-6 6 6 6"/>`,
  "chevron-down": `<path d="M6 9l6 6 6-6"/>`,
  plus: `<path d="M12 5v14"/><path d="M5 12h14"/>`,
  minus: `<path d="M5 12h14"/>`,
  "arrow-up": `<path d="M12 19V5"/><path d="M5 12l7-7 7 7"/>`,
  "arrow-right": `<path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>`,
  "alert-triangle": `<path d="M12 3L2 21h20L12 3z"/><path d="M12 10v4"/><path d="M12 18h.01"/>`,
  "alert-circle": `<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>`,
  "check-circle": `<circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/>`,
  bluetooth: `<path d="M6.5 6.5l11 11-5.5 5.5V1l5.5 5.5-11 11"/>`,
  wifi: `<path d="M5 12.5a11 11 0 0 1 14 0"/><path d="M1.5 9a16 16 0 0 1 21 0"/><path d="M8.5 16a6 6 0 0 1 7 0"/><circle cx="12" cy="20" r="1"/>`,
  mic: `<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v4"/>`,
  "mic-off": `<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v4"/><path d="M3 3l18 18"/>`,
  video: `<rect x="2" y="6" width="14" height="12" rx="2"/><path d="M22 8l-6 4 6 4V8z"/>`,
  "video-off": `<rect x="2" y="6" width="14" height="12" rx="2"/><path d="M22 8l-6 4 6 4V8z"/><path d="M3 3l18 18"/>`,
  phone: `<path d="M22 16.9V20a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3.1a2 2 0 0 1 2 1.7c.1 1 .3 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 10a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9z"/>`,
  message: `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`,
  bell: `<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>`,
  home: `<path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>`,
  calendar: `<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>`,
  user: `<circle cx="12" cy="7" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>`,
  "user-group": `<circle cx="9" cy="8" r="3"/><circle cx="17" cy="8" r="3"/><path d="M3 21v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1"/><path d="M17 13c2.67 0 5 1.33 5 4v4"/>`,
  "book-open": `<path d="M2 3h7a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-7a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h8z"/>`,
  settings: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
  pause: `<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>`,
  play: `<path d="M5 3l14 9-14 9V3z"/>`,
  camera: `<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>`,
  refresh: `<path d="M1 4v6h6"/><path d="M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>`,
  "log-out": `<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>`,
  trophy: `<path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v4a5 5 0 0 1-10 0V4z"/><path d="M17 6h3v2a3 3 0 0 1-3 3"/><path d="M7 6H4v2a3 3 0 0 0 3 3"/>`,
  "zap": `<path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/>`,
  star: `<path d="M12 2l3 7 7 .6-5.3 4.6L18 21l-6-3.6L6 21l1.3-6.8L2 9.6 9 9z"/>`,
  circle: `<circle cx="12" cy="12" r="10"/>`,
  "circle-filled": `<circle cx="12" cy="12" r="10" fill="currentColor"/>`,
};
function Icon({ name, size=22, stroke=1.75, color="currentColor", style={} }) {
  const body = ICON_PATHS[name] || ICON_PATHS.circle;
  return (
    <span style={{ display:"inline-flex", lineHeight:0, color, ...style }}
      dangerouslySetInnerHTML={{__html:
        `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`
      }}/>
  );
}

/* ============================================================
   Brand tokens
   ============================================================ */
const C = {
  green: "#142E0F",
  lime:  "#D8E73C",
  cream: "#F4F0EB",
  tint:  "#ECEEEC",
  citrus:"#FB6E28",
  plum:  "#C7B9FF",
  sky:   "#97DDF7",
  error: "#A60000",
  success:"#34CE00",
  warning:"#FFAC05",
  greenTint8:  "rgba(20,46,15,0.08)",
  greenTint30: "rgba(20,46,15,0.30)",
  greenTint60: "rgba(20,46,15,0.60)",
};

/* status bar — our own (matches brand, not iOS sim) */
function StatusBar({ time="9:41", dark=false }) {
  const c = dark ? "#fff" : C.green;
  return (
    <div style={{ height:50, padding:"14px 28px 0", display:"flex", justifyContent:"space-between", alignItems:"center", fontFamily:"'Circular Std'", fontSize:15, fontWeight:700, color:c }}>
      <span>{time}</span>
      <span style={{ display:"flex", gap:6, alignItems:"center", opacity:.9 }}>
        <Icon name="wifi" size={14} color={c}/>
        <span style={{ fontSize:12, fontWeight:700 }}>100%</span>
      </span>
    </div>
  );
}

/* Pill button */
function Button({ children, variant="lime", size="lg", onClick, icon, full, style={} }) {
  const h = size === "lg" ? 64 : size === "md" ? 52 : 44;
  const fs = size === "lg" ? 18 : 16;
  const fills = {
    lime:   { bg:C.lime,  fg:C.green, bd:"transparent" },
    green:  { bg:C.green, fg:"#fff",  bd:"transparent" },
    ghost:  { bg:"transparent", fg:C.green, bd:C.greenTint8 },
    white:  { bg:"#fff",  fg:C.green, bd:C.greenTint8 },
    error:  { bg:C.error, fg:"#fff",  bd:"transparent" },
  };
  const f = fills[variant];
  return (
    <button onClick={onClick} style={{
      height:h, padding:"0 24px", borderRadius:9999,
      background:f.bg, color:f.fg, border:`1px solid ${f.bd}`,
      fontFamily:"'Circular Std'", fontWeight:700, fontSize:fs, letterSpacing:".02em",
      cursor:"pointer", display:"inline-flex", alignItems:"center", justifyContent:"center",
      gap:10, width: full ? "100%" : undefined, ...style,
    }}>
      {icon && <Icon name={icon} size={18} />}
      {children}
    </button>
  );
}

/* A card — Carda's 32-radius pillow */
function Card({ children, style={}, color="#fff", noBorder }) {
  return (
    <div style={{
      background:color, borderRadius:32,
      border: noBorder ? "none" : `1px solid ${C.greenTint8}`,
      padding:24, ...style,
    }}>{children}</div>
  );
}

/* Header band — section title for cards */
function BandHeader({ band, title, subtitle, icon }) {
  return (
    <div>
      <div style={{ background:band, padding:"16px 20px", display:"flex", alignItems:"center", gap:10, color:C.green }}>
        {icon && <Icon name={icon} size={18} color={C.green}/>}
        <span style={{ fontFamily:"'Circular Std'", fontWeight:700, fontSize:14, letterSpacing:".02em" }}>{title}</span>
        {subtitle && <span style={{ marginLeft:"auto", fontSize:13, opacity:.7, fontWeight:500 }}>{subtitle}</span>}
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   A screen wrapper — fixed 402×874 interior
----------------------------------------------------------- */
function Screen({ children, bg="#fff", dark=false, padBottom=24 }) {
  return (
    <div style={{
      width:402, height:874, background:bg, color: dark ? "#fff" : C.green,
      fontFamily:"'Circular Std', -apple-system, sans-serif",
      position:"relative", overflow:"hidden",
      display:"flex", flexDirection:"column",
    }}>
      <StatusBar dark={dark}/>
      <div style={{ flex:1, minHeight:0, paddingBottom:padBottom, overflow:"hidden" }}>
        {children}
      </div>
    </div>
  );
}

/* Bottom tab bar (appears in-app screens) */
function TabBar({ active="home" }) {
  const tabs = [
    { id:"home", icon:"home", label:"Home" },
    { id:"journey", icon:"activity", label:"Journey" },
    { id:"learn", icon:"book-open", label:"Learn" },
    { id:"team", icon:"user-group", label:"Team" },
    { id:"you", icon:"user", label:"You" },
  ];
  return (
    <div style={{
      position:"absolute", bottom:0, left:0, right:0, height:78,
      background:"#fff", borderTop:`1px solid ${C.greenTint8}`,
      display:"flex", justifyContent:"space-around", alignItems:"flex-start",
      paddingTop:10,
    }}>
      {tabs.map(t => (
        <div key={t.id} style={{
          display:"flex", flexDirection:"column", alignItems:"center", gap:4,
          color: active === t.id ? C.green : C.greenTint30,
          fontWeight:700, fontSize:11,
        }}>
          <Icon name={t.icon} size={22} color={active === t.id ? C.green : C.greenTint30}/>
          <span>{t.label}</span>
        </div>
      ))}
      <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:139, height:5, borderRadius:99, background:C.greenTint30, marginBottom:6 }}/>
    </div>
  );
}

/* -----------------------------------------------------------
   Individual screens
----------------------------------------------------------- */

/* 1. Splash / loading */
function S_Splash() {
  return (
    <Screen bg={C.green} dark padBottom={0}>
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:32 }}>
        {/* lime blob */}
        <div style={{ position:"absolute", top:-140, right:-100, width:320, height:320, borderRadius:"50% 45% 55% 50%", background:C.lime, opacity:.9, transform:"rotate(-14deg)"}}/>
        <div style={{ position:"absolute", bottom:-180, left:-80, width:260, height:260, borderRadius:"48% 52% 45% 55%", background:C.plum, opacity:.85, transform:"rotate(22deg)"}}/>
        <div style={{ display:"flex", alignItems:"center", gap:12, zIndex:1 }}>
          <div style={{ width:48, height:56, borderRadius:"48% 48% 48% 90% / 48% 48% 70% 90%", background:C.lime }}/>
          <span style={{ fontFamily:"'ABC Marist', serif", fontWeight:600, fontSize:40, color:"#fff", letterSpacing:"-.02em" }}>carda<span style={{ opacity:.7, fontWeight:500, marginLeft:4 }}>health</span></span>
        </div>
        <div style={{ fontFamily:"'Circular Std'", fontSize:14, color:"rgba(255,255,255,.6)", letterSpacing:".12em", textTransform:"uppercase" }}>Getting things ready…</div>
      </div>
    </Screen>
  );
}

/* 2. Lock screen with next session */
function S_Lock() {
  return (
    <Screen bg={C.green} dark padBottom={0}>
      <div style={{ padding:"28px 24px", textAlign:"center", color:"rgba(255,255,255,.65)", fontSize:14, fontWeight:500 }}>
        Wednesday · March 12
      </div>
      <div style={{ textAlign:"center", fontFamily:"'ABC Marist', serif", fontSize:80, color:"#fff", lineHeight:1, fontWeight:600, letterSpacing:"-.03em" }}>9:41</div>
      {/* notification */}
      <div style={{ margin:"40px 16px 0", background:"rgba(255,255,255,.08)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,.1)", borderRadius:24, padding:"18px 20px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:C.lime, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Icon name="heart-pulse" size={16} color={C.green}/>
          </div>
          <span style={{ fontWeight:700, fontSize:13, letterSpacing:".04em", textTransform:"uppercase", color:"rgba(255,255,255,.8)" }}>Carda · now</span>
          <span style={{ marginLeft:"auto", fontSize:12, opacity:.5 }}>9:41 AM</span>
        </div>
        <div style={{ color:"#fff", fontSize:17, fontWeight:700, marginBottom:4 }}>Session starts in 15 min</div>
        <div style={{ color:"rgba(255,255,255,.7)", fontSize:15, lineHeight:1.4 }}>Put on your heart-rate strap and pulse-ox — Haley will join at 10:00.</div>
      </div>
      {/* bottom controls */}
      <div style={{ position:"absolute", bottom:40, left:0, right:0, display:"flex", justifyContent:"space-between", padding:"0 36px" }}>
        <div style={{ width:48, height:48, borderRadius:99, background:"rgba(255,255,255,.14)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Icon name="camera" size={20} color="#fff"/>
        </div>
        <div style={{ width:48, height:48, borderRadius:99, background:"rgba(255,255,255,.14)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Icon name="zap" size={20} color="#fff"/>
        </div>
      </div>
    </Screen>
  );
}

/* 3. Login / verify */
function S_Login() {
  return (
    <Screen bg={C.cream}>
      <div style={{ padding:"40px 24px" }}>
        <div style={{ width:40, height:46, borderRadius:"48% 48% 48% 90% / 48% 48% 70% 90%", background:C.lime, marginBottom:32 }}/>
        <div style={{ fontFamily:"'ABC Marist', serif", fontSize:38, lineHeight:1, fontWeight:600, letterSpacing:"-.02em" }}>Welcome back.</div>
        <div style={{ fontSize:16, marginTop:12, color:C.greenTint60 }}>Sign in to start your session.</div>
        <div style={{ marginTop:40, display:"flex", flexDirection:"column", gap:16 }}>
          <label style={{ display:"flex", flexDirection:"column", gap:8 }}>
            <span style={{ fontSize:13, fontWeight:700, letterSpacing:".04em", textTransform:"uppercase" }}>Phone number</span>
            <div style={{ height:56, border:`1px solid ${C.green}`, borderRadius:6, padding:"0 16px", display:"flex", alignItems:"center", background:"#fff", fontSize:18, fontWeight:500 }}>
              (617) 555 — 0164
            </div>
          </label>
          <label style={{ display:"flex", flexDirection:"column", gap:8 }}>
            <span style={{ fontSize:13, fontWeight:700, letterSpacing:".04em", textTransform:"uppercase" }}>6-digit code</span>
            <div style={{ display:"flex", gap:8 }}>
              {["4","2","7","•","•","•"].map((d,i)=>(
                <div key={i} style={{ flex:1, height:56, border:`1px solid ${i<3?C.green:C.greenTint8}`, borderRadius:6, background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:700, color: i<3?C.green:C.greenTint30 }}>{d}</div>
              ))}
            </div>
            <span style={{ fontSize:13, color:C.greenTint60 }}>We just texted a code to ••• 0164. <span style={{ color:C.green, fontWeight:700, textDecoration:"underline" }}>Resend</span></span>
          </label>
        </div>
        <div style={{ marginTop:32 }}>
          <Button full>Continue</Button>
        </div>
      </div>
    </Screen>
  );
}

/* 4. Pair — intro / device picker */
function S_PairIntro() {
  const devices = [
    { icon:"heart-pulse", name:"Heart-rate strap", sub:"Polar H10 or similar", status:"Not connected" },
    { icon:"droplet", name:"Blood pressure cuff", sub:"Omron wireless", status:"Not connected" },
    { icon:"activity", name:"Pulse oximeter", sub:"Finger clip", status:"Not connected" },
  ];
  return (
    <Screen bg={C.cream}>
      <div style={{ padding:"24px 24px 0" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, color:C.greenTint60, marginBottom:18 }}>
          <Icon name="chevron-left" size={18}/>
          <span style={{ fontSize:15, fontWeight:500 }}>Back</span>
        </div>
        <div style={{ fontSize:13, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:C.greenTint60 }}>Step 2 of 4</div>
        <div style={{ fontFamily:"'ABC Marist', serif", fontSize:34, lineHeight:1.05, fontWeight:600, letterSpacing:"-.02em", marginTop:8 }}>Let's pair your devices.</div>
        <div style={{ fontSize:15, color:C.greenTint60, marginTop:12, lineHeight:1.4 }}>Turn each one on and keep it within a few feet of this phone. We'll find them automatically.</div>
      </div>
      <div style={{ padding:"24px", display:"flex", flexDirection:"column", gap:12 }}>
        {devices.map(d => (
          <Card key={d.name} style={{ padding:18, display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ width:48, height:48, borderRadius:14, background:C.cream, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Icon name={d.icon} size={22} color={C.green}/>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:16, fontWeight:700 }}>{d.name}</div>
              <div style={{ fontSize:13, color:C.greenTint60, marginTop:2 }}>{d.sub}</div>
            </div>
            <div style={{ fontSize:12, fontWeight:700, color:C.greenTint60, display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ width:8, height:8, borderRadius:99, background:C.greenTint30 }}/>
              Not&nbsp;paired
            </div>
          </Card>
        ))}
      </div>
      <div style={{ position:"absolute", bottom:24, left:24, right:24 }}>
        <Button full>Start pairing</Button>
      </div>
    </Screen>
  );
}

/* 5. Pair — searching */
function S_PairSearching() {
  return (
    <Screen bg={C.cream}>
      <div style={{ padding:"64px 24px 0", textAlign:"center" }}>
        <div style={{ width:140, height:140, borderRadius:99, background:"#fff", border:`1px solid ${C.greenTint8}`, display:"inline-flex", alignItems:"center", justifyContent:"center", position:"relative", marginBottom:28 }}>
          <div style={{ position:"absolute", inset:-8, borderRadius:99, border:`3px solid ${C.lime}`, animation:"pulse 2s infinite" }}/>
          <div style={{ position:"absolute", inset:-20, borderRadius:99, border:`2px solid ${C.lime}`, opacity:.4 }}/>
          <Icon name="bluetooth" size={52} color={C.green}/>
        </div>
        <div style={{ fontFamily:"'ABC Marist', serif", fontSize:30, fontWeight:600, letterSpacing:"-.01em" }}>Looking for your heart-rate strap…</div>
        <div style={{ fontSize:15, color:C.greenTint60, marginTop:12, padding:"0 12px", lineHeight:1.45 }}>
          Moisten the electrodes and place the strap snug under your chest.
        </div>
      </div>
      <div style={{ position:"absolute", bottom:24, left:24, right:24, display:"flex", flexDirection:"column", gap:10 }}>
        <Button variant="ghost" full>Skip for now</Button>
        <div style={{ fontSize:13, textAlign:"center", color:C.greenTint60 }}>Can't find it? <span style={{ color:C.green, fontWeight:700, textDecoration:"underline" }}>Get help</span></div>
      </div>
      <style>{`@keyframes pulse{0%{transform:scale(1);opacity:.9}70%{transform:scale(1.15);opacity:0}100%{opacity:0}}`}</style>
    </Screen>
  );
}

/* 6. Pair — success */
function S_PairSuccess() {
  return (
    <Screen bg={C.cream}>
      <div style={{ padding:"32px 24px 0" }}>
        <div style={{ fontSize:13, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:C.greenTint60 }}>Step 2 of 4</div>
        <div style={{ fontFamily:"'ABC Marist', serif", fontSize:32, lineHeight:1.05, fontWeight:600, letterSpacing:"-.02em", marginTop:8 }}>All three are talking.</div>
      </div>
      <div style={{ padding:"24px", display:"flex", flexDirection:"column", gap:12 }}>
        {[
          { icon:"heart-pulse", name:"Polar H10", sub:"Battery 82%", ok:true },
          { icon:"droplet", name:"Omron HEM-7361T", sub:"Battery 68%", ok:true },
          { icon:"activity", name:"Nonin 3230", sub:"Battery 91%", ok:true },
        ].map(d => (
          <Card key={d.name} style={{ padding:18, display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ width:48, height:48, borderRadius:14, background:"rgba(52,206,0,.14)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Icon name={d.icon} size={22} color={C.green}/>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:16, fontWeight:700 }}>{d.name}</div>
              <div style={{ fontSize:13, color:C.greenTint60, marginTop:2 }}>{d.sub}</div>
            </div>
            <div style={{ width:32, height:32, borderRadius:99, background:C.success, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Icon name="check" size={18} color="#fff"/>
            </div>
          </Card>
        ))}
      </div>
      <div style={{ position:"absolute", bottom:24, left:24, right:24 }}>
        <Button full>Continue to check-in</Button>
      </div>
    </Screen>
  );
}

/* 7. Pair — failure */
function S_PairFail() {
  return (
    <Screen bg={C.cream}>
      <div style={{ padding:"64px 24px 0", textAlign:"center" }}>
        <div style={{ width:88, height:88, borderRadius:99, background:"rgba(166,0,0,.08)", display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
          <Icon name="alert-triangle" size={44} color={C.error}/>
        </div>
        <div style={{ fontFamily:"'ABC Marist', serif", fontSize:30, fontWeight:600, letterSpacing:"-.01em", lineHeight:1.1 }}>We couldn't find your heart-rate strap.</div>
        <div style={{ fontSize:15, color:C.greenTint60, marginTop:12, padding:"0 8px", lineHeight:1.45 }}>
          Make sure it's charged and moisten the electrodes. You can still start the session without it — Haley will switch to visual effort cues.
        </div>
      </div>
      <div style={{ padding:"36px 24px 0" }}>
        <Card style={{ padding:16, background:C.cream, border:`1px dashed ${C.greenTint30}` }}>
          <div style={{ fontSize:13, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", color:C.greenTint60, marginBottom:8 }}>Things to try</div>
          <ul style={{ margin:0, paddingLeft:20, color:C.green, fontSize:14, lineHeight:1.6 }}>
            <li>Power-cycle the strap (hold the logo 5s)</li>
            <li>Bring it within 3 ft of the phone</li>
            <li>Dry the electrodes and re-wet them</li>
          </ul>
        </Card>
      </div>
      <div style={{ position:"absolute", bottom:24, left:24, right:24, display:"flex", flexDirection:"column", gap:10 }}>
        <Button full icon="refresh">Try again</Button>
        <Button variant="ghost" full>Continue without</Button>
      </div>
    </Screen>
  );
}

/* 8. Home — before session */
function S_HomeBefore() {
  return (
    <Screen>
      <div style={{ padding:"16px 24px 0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <div style={{ fontSize:13, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:C.greenTint60 }}>Wed · Mar 12</div>
          <div style={{ fontFamily:"'ABC Marist', serif", fontSize:32, fontWeight:600, letterSpacing:"-.02em", marginTop:4 }}>Hi Susan,<br/>ready to move?</div>
        </div>
        <div style={{ width:52, height:52, borderRadius:99, background:C.plum, color:C.green, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:20 }}>S</div>
      </div>

      {/* Next session card — dark green */}
      <div style={{ margin:"20px 20px 0", background:C.green, color:"#fff", borderRadius:28, padding:"20px 22px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
          <Icon name="heart-pulse" size={16} color={C.lime}/>
          <span style={{ fontSize:12, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", opacity:.7 }}>Your Workout</span>
          <span style={{ marginLeft:"auto", fontSize:12, fontWeight:700, background:"rgba(216,231,60,.2)", color:C.lime, padding:"3px 10px", borderRadius:99 }}>In 15 min</span>
        </div>
        <div style={{ display:"flex", gap:14 }}>
          <div style={{ width:54, height:54, borderRadius:99, background:C.citrus, flexShrink:0 }}/>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontFamily:"'ABC Marist', serif", fontSize:22, fontWeight:600, lineHeight:1.1 }}>Later Today<br/>with Michelle</div>
            <div style={{ fontSize:13, fontWeight:700, opacity:.75, marginTop:4 }}>4:30 PM — 5:15 PM</div>
          </div>
        </div>
        <div style={{ fontSize:14, opacity:.8, marginTop:12, lineHeight:1.4 }}>A one hour full-body workout — get ready to push yourself.</div>
        <div style={{ marginTop:16, padding:"12px 14px", borderRadius:16, background:"rgba(255,255,255,.08)", display:"flex", alignItems:"center", gap:8, fontSize:13, fontWeight:500 }}>
          <Icon name="chevron-right" size={14} color={C.lime}/>
          Tap to see your workout
        </div>
      </div>

      {/* Daily check in card */}
      <div style={{ margin:"16px 20px 0" }}>
        <Card style={{ padding:"18px 20px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
            <Icon name="check-circle" size={15} color={C.green}/>
            <span style={{ fontSize:12, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", color:C.greenTint60 }}>Your daily check-in</span>
          </div>
          <div style={{ fontFamily:"'ABC Marist', serif", fontSize:22, fontWeight:600, letterSpacing:"-.01em" }}>It's time to do your daily check-in!</div>
          <div style={{ marginTop:14 }}>
            <Button size="md">Tap To Check In</Button>
          </div>
          <div style={{ marginTop:14, display:"flex", alignItems:"center", gap:8, color:C.greenTint60, fontSize:13 }}>
            <Icon name="arrow-right" size={13}/>
            Tap to view your history
          </div>
        </Card>
      </div>

      {/* Journey level */}
      <div style={{ margin:"16px 20px 0" }}>
        <Card style={{ padding:"16px 20px", display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:42, height:42, borderRadius:99, background:C.lime, color:C.green, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:18 }}>3</div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:12, color:C.greenTint60, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase" }}>See your journey</div>
            <div style={{ fontFamily:"'ABC Marist', serif", fontSize:22, fontWeight:600 }}>Level 3</div>
            <div style={{ fontSize:12, color:C.greenTint60, marginTop:2 }}>6 / 20 · You're on track. Keep it up!</div>
          </div>
          <Icon name="chevron-right" size={18} color={C.greenTint60}/>
        </Card>
      </div>

      <TabBar active="home"/>
    </Screen>
  );
}

/* 9. Home — missed session */
function S_HomeMissed() {
  return (
    <Screen>
      <div style={{ padding:"16px 24px 0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ fontFamily:"'ABC Marist', serif", fontSize:26, fontWeight:600 }}>Hi Susan</div>
        <div style={{ width:44, height:44, borderRadius:99, background:C.plum, color:C.green, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900 }}>S</div>
      </div>
      <div style={{ margin:"16px 20px 0", background:C.error, color:"#fff", borderRadius:28, padding:"20px 22px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
          <Icon name="alert-triangle" size={16} color="#fff"/>
          <span style={{ fontSize:12, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", opacity:.85 }}>Your Workout</span>
        </div>
        <div style={{ fontFamily:"'ABC Marist', serif", fontSize:28, fontWeight:600, lineHeight:1 }}>Missed Session</div>
        <div style={{ fontSize:13, opacity:.9, marginTop:6, fontWeight:700 }}>4:30 PM — 5:15 PM</div>
        <div style={{ fontSize:14, marginTop:12, opacity:.95, lineHeight:1.4 }}>It happens. We'll reach out to reschedule — or tap below to pick a new time in the next 24 hours.</div>
        <div style={{ marginTop:16, background:"#fff", color:C.green, padding:"14px 18px", borderRadius:99, fontWeight:700, fontSize:15, textAlign:"center" }}>Reschedule Session</div>
      </div>
      <div style={{ margin:"16px 20px 0" }}>
        <Card style={{ padding:"18px 20px" }}>
          <div style={{ fontSize:12, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", color:C.greenTint60 }}>Self-Guided</div>
          <div style={{ fontFamily:"'ABC Marist', serif", fontSize:22, fontWeight:600, marginTop:4 }}>Don't skip it entirely.</div>
          <div style={{ fontSize:14, color:C.greenTint60, marginTop:8, lineHeight:1.4 }}>Try a self-guided 20-min session while you wait to be rescheduled.</div>
          <div style={{ marginTop:14 }}><Button size="md">Start Self-Guided</Button></div>
        </Card>
      </div>
      <TabBar active="home"/>
    </Screen>
  );
}

/* 10. Check-in: pre-session questionnaire */
function S_CheckinQuestion() {
  return (
    <Screen bg={C.cream}>
      <div style={{ padding:"20px 24px 0", display:"flex", alignItems:"center", gap:12 }}>
        <Icon name="x" size={20}/>
        <div style={{ flex:1, height:6, borderRadius:99, background:C.greenTint8, overflow:"hidden" }}>
          <div style={{ width:"45%", height:"100%", background:C.green }}/>
        </div>
        <span style={{ fontSize:13, fontWeight:700, color:C.greenTint60 }}>2 / 5</span>
      </div>
      <div style={{ padding:"36px 24px 0" }}>
        <div style={{ fontSize:13, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:C.greenTint60 }}>Daily check-in</div>
        <div style={{ fontFamily:"'ABC Marist', serif", fontSize:32, fontWeight:600, letterSpacing:"-.02em", lineHeight:1.05, marginTop:10 }}>How are you feeling this morning?</div>
      </div>
      <div style={{ padding:"28px 24px 0", display:"flex", flexDirection:"column", gap:10 }}>
        {[
          { emoji:"●", label:"Great — better than most days", color:C.success, sel:false },
          { emoji:"●", label:"Good — same as usual", color:C.lime, sel:true },
          { emoji:"●", label:"Off — not quite myself", color:C.warning, sel:false },
          { emoji:"●", label:"Rough — I need to talk to someone", color:C.error, sel:false },
        ].map((opt,i) => (
          <div key={i} style={{
            padding:"18px 18px", borderRadius:18,
            background:"#fff",
            border:`1px solid ${opt.sel?C.green:C.greenTint8}`,
            display:"flex", alignItems:"center", gap:14,
            boxShadow: opt.sel ? "0 4px 8px rgba(0,0,0,0.08)" : "none",
          }}>
            <div style={{ width:16, height:16, borderRadius:99, background:opt.color, flexShrink:0 }}/>
            <span style={{ flex:1, fontSize:16, fontWeight:500 }}>{opt.label}</span>
            {opt.sel && <Icon name="check" size={18} color={C.green}/>}
          </div>
        ))}
      </div>
      <div style={{ position:"absolute", bottom:24, left:24, right:24 }}>
        <Button full>Next</Button>
      </div>
    </Screen>
  );
}

/* 11. Check-in: vitals entry */
function S_CheckinVitals() {
  return (
    <Screen bg={C.cream}>
      <div style={{ padding:"20px 24px 0", display:"flex", alignItems:"center", gap:12 }}>
        <Icon name="x" size={20}/>
        <div style={{ flex:1, height:6, borderRadius:99, background:C.greenTint8, overflow:"hidden" }}>
          <div style={{ width:"80%", height:"100%", background:C.green }}/>
        </div>
        <span style={{ fontSize:13, fontWeight:700, color:C.greenTint60 }}>4 / 5</span>
      </div>
      <div style={{ padding:"28px 24px 0" }}>
        <div style={{ fontSize:13, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:C.greenTint60 }}>Morning vitals</div>
        <div style={{ fontFamily:"'ABC Marist', serif", fontSize:30, fontWeight:600, letterSpacing:"-.02em", lineHeight:1.05, marginTop:8 }}>What's your blood pressure today?</div>
      </div>
      <div style={{ padding:"32px 24px 0", display:"flex", flexDirection:"column", gap:18 }}>
        <div style={{ display:"flex", gap:12 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13, fontWeight:700, letterSpacing:".04em", textTransform:"uppercase", color:C.greenTint60, marginBottom:6 }}>Systolic</div>
            <div style={{ height:76, background:"#fff", border:`1px solid ${C.green}`, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'ABC Marist', serif", fontSize:40, fontWeight:600 }}>127</div>
            <div style={{ fontSize:12, color:C.greenTint60, marginTop:4, textAlign:"center" }}>mmHg</div>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13, fontWeight:700, letterSpacing:".04em", textTransform:"uppercase", color:C.greenTint60, marginBottom:6 }}>Diastolic</div>
            <div style={{ height:76, background:"#fff", border:`1px solid ${C.greenTint8}`, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'ABC Marist', serif", fontSize:40, fontWeight:600, color:C.greenTint30 }}>98</div>
            <div style={{ fontSize:12, color:C.greenTint60, marginTop:4, textAlign:"center" }}>mmHg</div>
          </div>
        </div>
        <Card style={{ padding:14, background:"rgba(216,231,60,.18)", border:"none" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, fontSize:13 }}>
            <Icon name="alert-circle" size={16} color={C.green}/>
            <span><b>Tip:</b> take three readings a minute apart and use the average.</span>
          </div>
        </Card>
        <div style={{ display:"flex", gap:10 }}>
          <Button variant="ghost" icon="bluetooth" style={{ flex:1 }}>Import from cuff</Button>
          <Button variant="ghost" icon="camera" style={{ flex:1 }}>Take a photo</Button>
        </div>
      </div>
      <div style={{ position:"absolute", bottom:24, left:24, right:24 }}>
        <Button full>Submit reading</Button>
      </div>
    </Screen>
  );
}

/* 12. Check-in complete */
function S_CheckinDone() {
  return (
    <Screen bg={C.cream}>
      <div style={{ padding:"32px 24px 0" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, color:C.greenTint60, fontSize:13, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase" }}>
          <Icon name="check-circle" size={16} color={C.green}/>
          Your daily check-in · saved at 7:31 am
        </div>
        <div style={{ fontFamily:"'ABC Marist', serif", fontSize:38, fontWeight:600, letterSpacing:"-.02em", marginTop:8 }}>You're all set.</div>
      </div>
      <div style={{ padding:"24px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        {[
          { icon:"heart-pulse", label:"Heart Rate", v:"70", unit:"BPM" },
          { icon:"lungs", label:"Oxygen", v:"99", unit:"%" },
          { icon:"activity", label:"Weight", v:"148", unit:"lbs" },
          { icon:"droplet", label:"Blood Pressure", v:"127/98", unit:"mmHg" },
        ].map(m => (
          <Card key={m.label} style={{ padding:18 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
              <Icon name={m.icon} size={16} color={C.green}/>
              <span style={{ fontSize:12, fontWeight:700, letterSpacing:".04em", textTransform:"uppercase", color:C.greenTint60 }}>{m.label}</span>
            </div>
            <div style={{ display:"flex", alignItems:"baseline", gap:4 }}>
              <span style={{ fontFamily:"'ABC Marist', serif", fontSize:34, fontWeight:600, letterSpacing:"-.02em" }}>{m.v}</span>
              <span style={{ fontSize:12, color:C.greenTint60 }}>{m.unit}</span>
            </div>
          </Card>
        ))}
      </div>
      <div style={{ padding:"0 24px" }}>
        <Card style={{ padding:16, display:"flex", alignItems:"center", gap:10, background:"rgba(216,231,60,.2)", border:"none" }}>
          <Icon name="trophy" size={20} color={C.green}/>
          <span style={{ fontSize:14, fontWeight:700 }}>You're on a 5-day check-in streak!</span>
        </Card>
      </div>
      <div style={{ position:"absolute", bottom:24, left:24, right:24 }}>
        <Button full>Back to home</Button>
      </div>
    </Screen>
  );
}

/* 13. Session start — "Later Today" prep */
function S_SessionPrep() {
  const checks = [
    { label:"Heart-rate strap", ok:true },
    { label:"Pulse oximeter", ok:true },
    { label:"Blood pressure cuff", ok:true },
    { label:"Microphone & camera", ok:true },
    { label:"Quiet, clear space", ok:false },
  ];
  return (
    <Screen bg={C.green} dark>
      <div style={{ padding:"20px 24px 0", display:"flex", alignItems:"center", justifyContent:"space-between", color:"rgba(255,255,255,.75)", fontSize:14, fontWeight:700 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <Icon name="chevron-left" size={18} color="#fff"/>
          <span>Back</span>
        </div>
        <span style={{ letterSpacing:".08em", textTransform:"uppercase", fontSize:12 }}>Starts in 4:12</span>
      </div>
      <div style={{ padding:"28px 24px 0" }}>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:54, height:54, borderRadius:99, background:C.citrus }}/>
          <div>
            <div style={{ fontSize:12, letterSpacing:".08em", textTransform:"uppercase", color:"rgba(255,255,255,.6)", fontWeight:700 }}>With Michelle · cardio</div>
            <div style={{ fontFamily:"'ABC Marist', serif", fontSize:26, fontWeight:600, color:"#fff", marginTop:2 }}>Let's get you ready.</div>
          </div>
        </div>
      </div>
      <div style={{ padding:"24px", display:"flex", flexDirection:"column", gap:10 }}>
        {checks.map(c => (
          <div key={c.label} style={{ padding:"14px 16px", borderRadius:16, background:"rgba(255,255,255,.06)", border:`1px solid rgba(255,255,255,.08)`, display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:28, height:28, borderRadius:99, background: c.ok?C.success:"rgba(255,255,255,.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Icon name={c.ok?"check":"minus"} size={16} color="#fff"/>
            </div>
            <span style={{ color:"#fff", fontSize:15, fontWeight:500 }}>{c.label}</span>
            <span style={{ marginLeft:"auto", fontSize:12, color: c.ok?C.lime:"rgba(255,255,255,.5)", fontWeight:700 }}>{c.ok?"Ready":"Confirm"}</span>
          </div>
        ))}
      </div>
      <div style={{ position:"absolute", bottom:24, left:24, right:24 }}>
        <Button full>Join Waiting Room</Button>
      </div>
    </Screen>
  );
}

/* 14. In-session — HR in range */
function S_SessionInRange() {
  return (
    <Screen bg={C.green} dark padBottom={0}>
      {/* coach video */}
      <div style={{ margin:"12px 16px 0", height:220, borderRadius:22, background:"linear-gradient(135deg,#8A3C16 0%,#C7B9FF 100%)", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 30% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,.25) 100%)" }}/>
        <div style={{ position:"absolute", top:12, left:12, background:"rgba(0,0,0,.45)", padding:"4px 10px", borderRadius:99, display:"flex", alignItems:"center", gap:6, fontSize:12, fontWeight:700, color:"#fff" }}>
          <span style={{ width:8, height:8, borderRadius:99, background:C.citrus }}/>
          LIVE · Michelle
        </div>
        <div style={{ position:"absolute", top:12, right:12, fontSize:13, color:"#fff", fontWeight:700, opacity:.9 }}>14:02</div>
        <div style={{ position:"absolute", bottom:10, right:10, width:70, height:90, borderRadius:12, background:"rgba(0,0,0,.4)", border:"1px solid rgba(255,255,255,.25)" }}/>
      </div>
      {/* HR ring */}
      <div style={{ padding:"16px 16px 0", textAlign:"center" }}>
        <div style={{ display:"inline-flex", flexDirection:"column", alignItems:"center" }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:C.lime, marginBottom:6 }}>Heart rate · in target zone</div>
          <div style={{ width:196, height:196, borderRadius:99, background:C.lime, color:C.green, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", boxShadow:"0 0 50px rgba(216,231,60,.3)" }}>
            <div style={{ fontFamily:"'ABC Marist', serif", fontSize:76, fontWeight:600, lineHeight:1, letterSpacing:"-.04em" }}>112</div>
            <div style={{ fontSize:13, fontWeight:700, opacity:.7 }}>bpm · target 102–118</div>
          </div>
        </div>
        <div style={{ display:"flex", justifyContent:"space-around", marginTop:20, color:"#fff" }}>
          {[{l:"SpO₂",v:"96%"},{l:"METs",v:"4.2"},{l:"kcal",v:"148"}].map(s=>(
            <div key={s.l} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'ABC Marist', serif", fontSize:22, fontWeight:600 }}>{s.v}</div>
              <div style={{ fontSize:11, opacity:.55, letterSpacing:".08em", textTransform:"uppercase", fontWeight:700 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      {/* control bar */}
      <div style={{ position:"absolute", bottom:16, left:16, right:16, background:"rgba(255,255,255,.08)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,.1)", borderRadius:28, padding:"10px", display:"flex", gap:8, alignItems:"center" }}>
        {["mic","video","message"].map(i=>(
          <div key={i} style={{ width:44, height:44, borderRadius:99, background:"rgba(255,255,255,.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Icon name={i} size={18} color="#fff"/>
          </div>
        ))}
        <div style={{ flex:1 }}/>
        <div style={{ padding:"10px 14px", borderRadius:99, background:C.error, color:"#fff", fontSize:14, fontWeight:700, display:"flex", alignItems:"center", gap:6 }}>
          <Icon name="phone" size={14} color="#fff" style={{ transform:"rotate(135deg)" }}/> End
        </div>
      </div>
    </Screen>
  );
}

/* 15. In-session — HR out of range */
function S_SessionOutOfRange() {
  return (
    <Screen bg={C.green} dark padBottom={0}>
      <div style={{ padding:"16px 16px 0" }}>
        <div style={{ padding:"14px 18px", borderRadius:20, background:C.citrus, color:C.green, display:"flex", alignItems:"center", gap:10 }}>
          <Icon name="alert-triangle" size={20} color={C.green}/>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13, fontWeight:700, letterSpacing:".04em", textTransform:"uppercase" }}>Out of range</div>
            <div style={{ fontSize:14, marginTop:2 }}>Your HR is a bit high. Ease off and breathe.</div>
          </div>
        </div>
      </div>
      <div style={{ padding:"24px 16px 0", textAlign:"center" }}>
        <div style={{ display:"inline-flex", flexDirection:"column", alignItems:"center" }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:C.citrus, marginBottom:6 }}>Above target</div>
          <div style={{ width:196, height:196, borderRadius:99, background:C.citrus, color:C.green, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", boxShadow:"0 0 50px rgba(251,110,40,.4)" }}>
            <div style={{ fontFamily:"'ABC Marist', serif", fontSize:76, fontWeight:600, lineHeight:1, letterSpacing:"-.04em" }}>131</div>
            <div style={{ fontSize:13, fontWeight:700, opacity:.7 }}>bpm · target 102–118</div>
          </div>
        </div>
      </div>
      <div style={{ padding:"24px 16px 0" }}>
        <Card style={{ padding:16, background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)", color:"#fff" }}>
          <div style={{ fontSize:13, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", color:"rgba(255,255,255,.7)", marginBottom:8 }}>Michelle says</div>
          <div style={{ fontFamily:"'ABC Marist', serif", fontSize:20, fontWeight:600, lineHeight:1.25 }}>"Slow your pace to a gentle march. I'll pause the timer."</div>
        </Card>
      </div>
      <div style={{ position:"absolute", bottom:16, left:16, right:16 }}>
        <Button variant="error" full>Exit Session</Button>
      </div>
    </Screen>
  );
}

/* 16. Session paused by provider */
function S_SessionPaused() {
  return (
    <Screen bg={C.green} dark padBottom={0}>
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:20, padding:32, textAlign:"center" }}>
        <div style={{ width:92, height:92, borderRadius:99, background:"rgba(255,255,255,.1)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Icon name="pause" size={36} color="#fff"/>
        </div>
        <div style={{ fontSize:12, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(255,255,255,.6)" }}>Paused by Michelle</div>
        <div style={{ fontFamily:"'ABC Marist', serif", fontSize:30, fontWeight:600, color:"#fff", lineHeight:1.15, letterSpacing:"-.02em" }}>Take a minute —<br/>Michelle will pick this back up.</div>
        <div style={{ fontSize:14, color:"rgba(255,255,255,.7)", maxWidth:280, lineHeight:1.4 }}>She's watching your vitals. Sip some water and breathe slowly through your nose.</div>
        {/* breathing indicator */}
        <div style={{ marginTop:10, width:120, height:120, borderRadius:99, border:`2px solid ${C.lime}`, display:"flex", alignItems:"center", justifyContent:"center", color:C.lime, fontSize:13, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase" }}>Breathe</div>
      </div>
      <div style={{ position:"absolute", bottom:16, left:16, right:16, display:"flex", gap:10 }}>
        <Button variant="ghost" full style={{ color:"#fff", borderColor:"rgba(255,255,255,.2)", background:"rgba(255,255,255,.06)" }}>I need help</Button>
      </div>
    </Screen>
  );
}

/* 17. Session connection lost */
function S_SessionLost() {
  return (
    <Screen bg={C.cream}>
      <div style={{ padding:"80px 24px 0", textAlign:"center" }}>
        <div style={{ width:88, height:88, borderRadius:99, background:"#fff", border:`1px solid ${C.greenTint8}`, display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
          <Icon name="alert-triangle" size={40} color={C.citrus}/>
        </div>
        <div style={{ fontFamily:"'ABC Marist', serif", fontSize:30, fontWeight:600, lineHeight:1.1, letterSpacing:"-.02em" }}>Hold on, we've lost Michelle.</div>
        <div style={{ fontSize:15, color:C.greenTint60, marginTop:12, lineHeight:1.45 }}>Your internet connection dropped. We'll reconnect automatically — stay put.</div>
      </div>
      <div style={{ padding:"32px 24px 0" }}>
        <Card style={{ padding:16 }}>
          <div style={{ fontSize:12, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", color:C.greenTint60, marginBottom:8 }}>Status</div>
          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"6px 0" }}>
            <div style={{ width:8, height:8, borderRadius:99, background:C.citrus, animation:"blink 1s infinite" }}/>
            <span style={{ fontSize:14 }}>Reconnecting… <b>attempt 2 of 5</b></span>
          </div>
        </Card>
      </div>
      <div style={{ position:"absolute", bottom:24, left:24, right:24, display:"flex", flexDirection:"column", gap:10 }}>
        <Button full icon="refresh">Try again now</Button>
        <Button variant="ghost" full>End session</Button>
      </div>
      <style>{`@keyframes blink{50%{opacity:.3}}`}</style>
    </Screen>
  );
}

/* 18. Post-workout: great job */
function S_PostWorkoutSummary() {
  return (
    <Screen bg={C.cream}>
      <div style={{ padding:"24px 24px 0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Icon name="x" size={20}/>
        <span style={{ fontSize:13, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:C.greenTint60 }}>Session Summary</span>
        <span style={{ width:20 }}/>
      </div>
      <div style={{ padding:"12px 24px 0" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:48, height:48, borderRadius:99, background:C.lime, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Icon name="trophy" size={22} color={C.green}/>
          </div>
          <div>
            <div style={{ fontSize:12, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", color:C.greenTint60 }}>45 min · with Michelle</div>
            <div style={{ fontFamily:"'ABC Marist', serif", fontSize:28, fontWeight:600, lineHeight:1, letterSpacing:"-.02em" }}>Great job.</div>
          </div>
        </div>
        <div style={{ fontSize:14, color:C.greenTint60, marginTop:12, lineHeight:1.4 }}>You crushed that workout! Log your post-session vitals so your team can check in.</div>
      </div>
      <div style={{ padding:"24px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        {[
          { label:"Avg HR", v:"109", unit:"bpm", color:C.lime },
          { label:"Time in zone", v:"38", unit:"min", color:C.sky },
          { label:"METs peak", v:"5.1", unit:"", color:C.plum },
          { label:"Effort", v:"RPE 6", unit:"/10", color:C.cream },
        ].map(m => (
          <Card key={m.label} style={{ padding:16, overflow:"hidden", position:"relative" }}>
            <div style={{ position:"absolute", inset:0, background:m.color, opacity:.22 }}/>
            <div style={{ position:"relative" }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", color:C.greenTint60, marginBottom:8 }}>{m.label}</div>
              <div style={{ display:"flex", alignItems:"baseline", gap:4 }}>
                <span style={{ fontFamily:"'ABC Marist', serif", fontSize:32, fontWeight:600, letterSpacing:"-.02em" }}>{m.v}</span>
                <span style={{ fontSize:12, color:C.greenTint60 }}>{m.unit}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div style={{ position:"absolute", bottom:24, left:24, right:24, display:"flex", flexDirection:"column", gap:10 }}>
        <Button full>Log post-session vitals</Button>
        <Button variant="ghost" full>Back home</Button>
      </div>
    </Screen>
  );
}

/* 19. Check-out: RPE slider */
function S_CheckoutRPE() {
  return (
    <Screen bg={C.cream}>
      <div style={{ padding:"20px 24px 0", display:"flex", alignItems:"center", gap:12 }}>
        <Icon name="x" size={20}/>
        <div style={{ flex:1, height:6, borderRadius:99, background:C.greenTint8, overflow:"hidden" }}>
          <div style={{ width:"33%", height:"100%", background:C.green }}/>
        </div>
        <span style={{ fontSize:13, fontWeight:700, color:C.greenTint60 }}>1 / 3</span>
      </div>
      <div style={{ padding:"28px 24px 0" }}>
        <div style={{ fontSize:13, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:C.greenTint60 }}>Session check-out</div>
        <div style={{ fontFamily:"'ABC Marist', serif", fontSize:30, fontWeight:600, letterSpacing:"-.02em", lineHeight:1.05, marginTop:8 }}>How hard was that for you?</div>
        <div style={{ fontSize:14, color:C.greenTint60, marginTop:10, lineHeight:1.45 }}>On a scale of 1 to 10 — where 1 is resting and 10 is the hardest you can imagine.</div>
      </div>
      <div style={{ padding:"36px 24px 0" }}>
        <div style={{ fontFamily:"'ABC Marist', serif", fontSize:90, fontWeight:600, letterSpacing:"-.04em", textAlign:"center", lineHeight:1, color:C.green }}>7</div>
        <div style={{ textAlign:"center", fontSize:14, fontWeight:700, letterSpacing:".04em", textTransform:"uppercase", color:C.citrus, marginTop:4 }}>Hard · pushed myself</div>
        <div style={{ marginTop:32, height:10, borderRadius:99, background:"#fff", border:`1px solid ${C.greenTint8}`, position:"relative" }}>
          <div style={{ position:"absolute", left:0, top:0, bottom:0, width:"66%", borderRadius:99, background:`linear-gradient(90deg, ${C.success} 0%, ${C.lime} 45%, ${C.citrus} 100%)` }}/>
          <div style={{ position:"absolute", left:"66%", top:"50%", transform:"translate(-50%,-50%)", width:28, height:28, borderRadius:99, background:C.green, border:"3px solid #fff", boxShadow:"0 2px 8px rgba(0,0,0,.15)" }}/>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, fontWeight:700, color:C.greenTint60, marginTop:8, padding:"0 2px" }}>
          <span>1 Easy</span><span>5 Moderate</span><span>10 Max</span>
        </div>
      </div>
      <div style={{ position:"absolute", bottom:24, left:24, right:24 }}>
        <Button full>Next</Button>
      </div>
    </Screen>
  );
}

/* 20. Check-out: symptoms */
function S_CheckoutSymptoms() {
  const syms = [
    { l:"Chest tightness", sel:false },
    { l:"Shortness of breath", sel:true },
    { l:"Dizziness", sel:false },
    { l:"Muscle soreness", sel:true },
    { l:"Headache", sel:false },
    { l:"Nausea", sel:false },
    { l:"Fatigue", sel:true },
    { l:"None of these", sel:false },
  ];
  return (
    <Screen bg={C.cream}>
      <div style={{ padding:"20px 24px 0", display:"flex", alignItems:"center", gap:12 }}>
        <Icon name="x" size={20}/>
        <div style={{ flex:1, height:6, borderRadius:99, background:C.greenTint8, overflow:"hidden" }}>
          <div style={{ width:"66%", height:"100%", background:C.green }}/>
        </div>
        <span style={{ fontSize:13, fontWeight:700, color:C.greenTint60 }}>2 / 3</span>
      </div>
      <div style={{ padding:"28px 24px 0" }}>
        <div style={{ fontSize:13, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:C.greenTint60 }}>Symptoms during</div>
        <div style={{ fontFamily:"'ABC Marist', serif", fontSize:30, fontWeight:600, letterSpacing:"-.02em", lineHeight:1.05, marginTop:8 }}>Anything feel off during the session?</div>
      </div>
      <div style={{ padding:"20px 24px 0", display:"flex", flexWrap:"wrap", gap:8 }}>
        {syms.map(s => (
          <div key={s.l} style={{
            padding:"12px 18px", borderRadius:99,
            background: s.sel ? C.green : "#fff",
            color: s.sel ? "#fff" : C.green,
            border:`1px solid ${s.sel ? C.green : C.greenTint8}`,
            fontSize:14, fontWeight:500, display:"flex", alignItems:"center", gap:8,
          }}>
            {s.sel && <Icon name="check" size={14} color="#fff"/>}
            {s.l}
          </div>
        ))}
      </div>
      <div style={{ padding:"24px" }}>
        <div style={{ fontSize:13, fontWeight:700, letterSpacing:".04em", textTransform:"uppercase", color:C.greenTint60, marginBottom:8 }}>Anything else? (optional)</div>
        <div style={{ height:100, padding:"14px 16px", border:`1px solid ${C.greenTint8}`, background:"#fff", borderRadius:14, fontSize:14, color:C.greenTint60 }}>Felt a little short of breath on the final interval — but it passed quickly.</div>
      </div>
      <div style={{ position:"absolute", bottom:24, left:24, right:24 }}>
        <Button full>Next</Button>
      </div>
    </Screen>
  );
}

/* 21. Info collection — weight */
function S_CollectWeight() {
  return (
    <Screen bg={C.cream}>
      <div style={{ padding:"20px 24px 0", display:"flex", alignItems:"center", gap:12 }}>
        <Icon name="chevron-left" size={20}/>
        <span style={{ fontSize:14, fontWeight:700, color:C.greenTint60 }}>Baseline assessment</span>
        <span style={{ marginLeft:"auto", fontSize:13, fontWeight:700, color:C.greenTint60 }}>3 / 9</span>
      </div>
      <div style={{ padding:"36px 24px 0" }}>
        <div style={{ fontFamily:"'ABC Marist', serif", fontSize:32, fontWeight:600, letterSpacing:"-.02em", lineHeight:1.05 }}>What's your current weight?</div>
        <div style={{ fontSize:14, color:C.greenTint60, marginTop:10 }}>Your clinical team uses this to set an exercise target.</div>
      </div>
      <div style={{ padding:"40px 24px 0" }}>
        <div style={{ display:"flex", gap:8, alignItems:"baseline", justifyContent:"center" }}>
          <span style={{ fontFamily:"'ABC Marist', serif", fontSize:88, fontWeight:600, letterSpacing:"-.04em", color:C.green }}>148</span>
          <span style={{ fontSize:22, color:C.greenTint60, fontWeight:700 }}>lbs</span>
        </div>
        {/* tick ruler */}
        <div style={{ position:"relative", marginTop:24, height:72 }}>
          <div style={{ position:"absolute", top:36, left:"50%", transform:"translateX(-50%)", width:2, height:36, background:C.green, borderRadius:2 }}/>
          <div style={{ display:"flex", justifyContent:"space-between", height:24, alignItems:"flex-end" }}>
            {Array.from({length:19}).map((_,i)=>(
              <div key={i} style={{ width:2, height: i%5===0?20:10, background: i===9?C.green:C.greenTint30, borderRadius:2 }}/>
            ))}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:10, fontSize:11, color:C.greenTint60, fontWeight:700 }}>
            <span>140</span><span>145</span><span>150</span><span>155</span>
          </div>
        </div>
      </div>
      <div style={{ padding:"28px 24px 0", display:"flex", gap:10, justifyContent:"center" }}>
        <div style={{ padding:"10px 18px", borderRadius:99, background:C.green, color:"#fff", fontSize:13, fontWeight:700 }}>lbs</div>
        <div style={{ padding:"10px 18px", borderRadius:99, background:"#fff", border:`1px solid ${C.greenTint8}`, color:C.greenTint60, fontSize:13, fontWeight:700 }}>kg</div>
      </div>
      <div style={{ position:"absolute", bottom:24, left:24, right:24 }}>
        <Button full>Continue</Button>
      </div>
    </Screen>
  );
}

/* 22. Info collection — meds */
function S_CollectMeds() {
  return (
    <Screen bg={C.cream}>
      <div style={{ padding:"20px 24px 0", display:"flex", alignItems:"center", gap:12 }}>
        <Icon name="chevron-left" size={20}/>
        <span style={{ fontSize:14, fontWeight:700, color:C.greenTint60 }}>Medications</span>
        <span style={{ marginLeft:"auto", fontSize:13, fontWeight:700, color:C.greenTint60 }}>5 / 9</span>
      </div>
      <div style={{ padding:"28px 24px 0" }}>
        <div style={{ fontFamily:"'ABC Marist', serif", fontSize:28, fontWeight:600, letterSpacing:"-.02em", lineHeight:1.1 }}>Did you take all your medications today?</div>
      </div>
      <div style={{ padding:"24px", display:"flex", flexDirection:"column", gap:10 }}>
        {[
          { n:"Metoprolol", d:"25 mg · morning", t:true },
          { n:"Atorvastatin", d:"40 mg · evening", t:null },
          { n:"Lisinopril", d:"10 mg · morning", t:true },
          { n:"Aspirin", d:"81 mg · morning", t:false },
        ].map(m => (
          <Card key={m.n} style={{ padding:"16px 18px", display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:15, fontWeight:700 }}>{m.n}</div>
              <div style={{ fontSize:12, color:C.greenTint60, marginTop:2 }}>{m.d}</div>
            </div>
            <div style={{ display:"flex", gap:6 }}>
              {["Yes","No"].map(opt=>{
                const active = (opt==="Yes" && m.t===true) || (opt==="No" && m.t===false);
                return <div key={opt} style={{
                  padding:"7px 14px", borderRadius:99, fontSize:13, fontWeight:700,
                  background: active ? (opt==="Yes"?C.green:C.error) : "#fff",
                  color: active ? "#fff" : C.greenTint60,
                  border:`1px solid ${active?"transparent":C.greenTint8}`,
                }}>{opt}</div>;
              })}
            </div>
          </Card>
        ))}
        <div style={{ textAlign:"center", fontSize:13, color:C.green, fontWeight:700, textDecoration:"underline", marginTop:6 }}>Add a medication</div>
      </div>
      <div style={{ position:"absolute", bottom:24, left:24, right:24 }}>
        <Button full>Continue</Button>
      </div>
    </Screen>
  );
}

/* 23. Journey level */
function S_Journey() {
  return (
    <Screen bg={C.cream}>
      <div style={{ padding:"24px 24px 0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <div style={{ fontSize:13, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:C.greenTint60 }}>Your journey</div>
          <div style={{ fontFamily:"'ABC Marist', serif", fontSize:30, fontWeight:600, letterSpacing:"-.02em", marginTop:4 }}>Level 3 of 5</div>
        </div>
        <div style={{ width:56, height:56, borderRadius:99, background:C.lime, color:C.green, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'ABC Marist', serif", fontWeight:600, fontSize:26 }}>3</div>
      </div>
      <div style={{ padding:"20px 24px 0" }}>
        <Card style={{ padding:0, overflow:"hidden" }}>
          <div style={{ height:120, background:`linear-gradient(135deg, ${C.sky} 0%, ${C.plum} 100%)`, position:"relative" }}>
            <div style={{ position:"absolute", bottom:16, left:20, color:C.green }}>
              <div style={{ fontSize:12, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase" }}>Week 9 of 12</div>
              <div style={{ fontFamily:"'ABC Marist', serif", fontSize:26, fontWeight:600 }}>Building endurance</div>
            </div>
          </div>
          <div style={{ padding:20 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10, fontSize:13, color:C.greenTint60, fontWeight:700 }}>
              <span>6 of 20 sessions</span><span>You're on track.</span>
            </div>
            <div style={{ height:10, background:C.greenTint8, borderRadius:99, overflow:"hidden" }}>
              <div style={{ width:"30%", height:"100%", background:C.green, borderRadius:99 }}/>
            </div>
          </div>
        </Card>
      </div>
      <div style={{ padding:"16px 24px 0" }}>
        <div style={{ fontSize:13, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", color:C.greenTint60, marginBottom:12 }}>This week's wins</div>
        <Card style={{ padding:16, marginBottom:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:40, height:40, borderRadius:99, background:"rgba(216,231,60,.3)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Icon name="arrow-up" size={18} color={C.green}/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:700 }}>Resting HR dropped 8 bpm</div>
              <div style={{ fontSize:12, color:C.greenTint60 }}>Since week 6 · that's real progress</div>
            </div>
          </div>
        </Card>
        <Card style={{ padding:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:40, height:40, borderRadius:99, background:"rgba(151,221,247,.5)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Icon name="star" size={18} color={C.green}/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:700 }}>5-day check-in streak</div>
              <div style={{ fontSize:12, color:C.greenTint60 }}>Kira says: "Consistency is everything."</div>
            </div>
          </div>
        </Card>
      </div>
      <TabBar active="journey"/>
    </Screen>
  );
}

/* 24. Messages / team */
function S_Messages() {
  const msgs = [
    { from:"Michelle · coach", time:"9:08", body:"Great session! Your HR recovery is really coming along. Let's aim for 40 min steady tomorrow.", mine:false, color:C.citrus },
    { from:"You", time:"9:12", body:"Thanks! I felt really good at the end for once.", mine:true },
    { from:"Michelle · coach", time:"9:14", body:"That's exactly the point. Rest well tonight.", mine:false, color:C.citrus },
    { from:"You", time:"now", body:"Quick question — should I still walk on rest days?", mine:true },
  ];
  return (
    <Screen>
      <div style={{ padding:"16px 20px 12px", borderBottom:`1px solid ${C.greenTint8}`, display:"flex", alignItems:"center", gap:10 }}>
        <Icon name="chevron-left" size={20}/>
        <div style={{ width:36, height:36, borderRadius:99, background:C.citrus }}/>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:15, fontWeight:700 }}>Michelle</div>
          <div style={{ fontSize:12, color:C.greenTint60 }}>Your exercise physiologist</div>
        </div>
        <Icon name="phone" size={18}/>
      </div>
      <div style={{ padding:"16px 16px", display:"flex", flexDirection:"column", gap:10 }}>
        {msgs.map((m,i)=>(
          <div key={i} style={{ display:"flex", gap:8, flexDirection: m.mine?"row-reverse":"row", alignItems:"flex-end" }}>
            {!m.mine && <div style={{ width:26, height:26, borderRadius:99, background:m.color, flexShrink:0 }}/>}
            <div style={{
              maxWidth:"76%", padding:"11px 14px", borderRadius:20,
              background: m.mine ? C.green : "#fff",
              color: m.mine ? "#fff" : C.green,
              border: m.mine ? "none" : `1px solid ${C.greenTint8}`,
              borderBottomRightRadius: m.mine?6:20,
              borderBottomLeftRadius: m.mine?20:6,
              fontSize:14, lineHeight:1.4,
            }}>{m.body}
              <div style={{ fontSize:10, opacity:.55, marginTop:4, fontWeight:500 }}>{m.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"12px 16px 28px", borderTop:`1px solid ${C.greenTint8}`, background:"#fff", display:"flex", gap:10, alignItems:"center" }}>
        <div style={{ flex:1, height:44, padding:"0 16px", borderRadius:99, background:C.cream, display:"flex", alignItems:"center", fontSize:14, color:C.greenTint30 }}>Message Michelle…</div>
        <div style={{ width:44, height:44, borderRadius:99, background:C.lime, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Icon name="arrow-right" size={18} color={C.green}/>
        </div>
      </div>
    </Screen>
  );
}

/* 25. Emergency / high HR banner */
function S_Emergency() {
  return (
    <Screen bg={C.error} dark padBottom={0}>
      <div style={{ position:"absolute", inset:0, padding:32, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center" }}>
        <div style={{ width:92, height:92, borderRadius:99, background:"rgba(255,255,255,.2)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:24 }}>
          <Icon name="alert-triangle" size={44} color="#fff"/>
        </div>
        <div style={{ fontSize:12, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(255,255,255,.8)", marginBottom:8 }}>HR too high for safe exercise</div>
        <div style={{ fontFamily:"'ABC Marist', serif", fontSize:32, fontWeight:600, color:"#fff", lineHeight:1.1, letterSpacing:"-.02em" }}>Stop moving. Sit down.</div>
        <div style={{ fontSize:15, color:"rgba(255,255,255,.85)", marginTop:14, lineHeight:1.45, maxWidth:300 }}>Your HR has been above 145 bpm for the last two minutes. We've paused the session and alerted your team.</div>
        <div style={{ marginTop:28, padding:"16px 22px", borderRadius:20, background:"rgba(255,255,255,.14)", display:"flex", alignItems:"center", gap:14, color:"#fff", width:"100%", boxSizing:"border-box", maxWidth:320 }}>
          <div style={{ width:44, height:44, borderRadius:99, background:C.cream, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Icon name="phone" size={20} color={C.green}/>
          </div>
          <div style={{ flex:1, textAlign:"left" }}>
            <div style={{ fontSize:13, opacity:.8, fontWeight:700, letterSpacing:".04em", textTransform:"uppercase" }}>Your care team</div>
            <div style={{ fontSize:16, fontWeight:700 }}>Calling Michelle now…</div>
          </div>
        </div>
      </div>
      <div style={{ position:"absolute", bottom:16, left:16, right:16, display:"flex", flexDirection:"column", gap:8 }}>
        <div style={{ padding:"16px", borderRadius:99, background:"#fff", color:C.green, fontWeight:700, fontSize:16, textAlign:"center" }}>Call 911</div>
        <div style={{ padding:"12px", borderRadius:99, background:"transparent", color:"rgba(255,255,255,.85)", border:"1px solid rgba(255,255,255,.3)", fontWeight:700, fontSize:14, textAlign:"center" }}>I'm okay, dismiss</div>
      </div>
    </Screen>
  );
}

/* 26. Profile / You */
function S_Profile() {
  return (
    <Screen>
      <div style={{ padding:"24px 24px 0", display:"flex", alignItems:"center", gap:16 }}>
        <div style={{ width:72, height:72, borderRadius:99, background:C.plum, color:C.green, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'ABC Marist', serif", fontWeight:600, fontSize:30 }}>S</div>
        <div>
          <div style={{ fontFamily:"'ABC Marist', serif", fontSize:24, fontWeight:600 }}>Susan Torres</div>
          <div style={{ fontSize:13, color:C.greenTint60 }}>Member since Oct 2024 · Boston, MA</div>
        </div>
      </div>
      <div style={{ padding:"20px 20px 0" }}>
        <div style={{ fontSize:12, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", color:C.greenTint60, padding:"0 4px 8px" }}>Your health</div>
        <Card style={{ padding:0, overflow:"hidden" }}>
          {[
            { icon:"heart-pulse", l:"Conditions", r:"2 managed" },
            { icon:"droplet", l:"Medications", r:"4 active" },
            { icon:"calendar", l:"Next session", r:"Today · 4:30" },
            { icon:"user-group", l:"Care team", r:"Michelle · Kira · Dr. Mike" },
          ].map((row,i,a)=>(
            <div key={row.l} style={{ padding:"16px 18px", display:"flex", alignItems:"center", gap:12, borderBottom: i<a.length-1?`1px solid ${C.greenTint8}`:"none" }}>
              <Icon name={row.icon} size={18}/>
              <span style={{ flex:1, fontSize:15 }}>{row.l}</span>
              <span style={{ fontSize:13, color:C.greenTint60 }}>{row.r}</span>
              <Icon name="chevron-right" size={14} color={C.greenTint30}/>
            </div>
          ))}
        </Card>
      </div>
      <div style={{ padding:"16px 20px 0" }}>
        <div style={{ fontSize:12, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", color:C.greenTint60, padding:"0 4px 8px" }}>Devices</div>
        <Card style={{ padding:0, overflow:"hidden" }}>
          {[
            { icon:"heart-pulse", l:"Polar H10", r:"Paired · 82%" },
            { icon:"droplet", l:"Omron cuff", r:"Paired · 68%" },
            { icon:"activity", l:"Pulse ox", r:"Paired · 91%" },
          ].map((row,i,a)=>(
            <div key={row.l} style={{ padding:"14px 18px", display:"flex", alignItems:"center", gap:12, borderBottom: i<a.length-1?`1px solid ${C.greenTint8}`:"none" }}>
              <Icon name={row.icon} size={18}/>
              <span style={{ flex:1, fontSize:15 }}>{row.l}</span>
              <span style={{ fontSize:12, color:C.success, fontWeight:700 }}>● {row.r}</span>
            </div>
          ))}
        </Card>
      </div>
      <TabBar active="you"/>
    </Screen>
  );
}

/* 27. Education library */
function S_Learn() {
  const items = [
    { tag:"Mindfulness", color:C.plum, title:"A 3-minute breath reset", min:3 },
    { tag:"Nutrition", color:C.sky, title:"Salt & your blood pressure", min:5 },
    { tag:"Exercise", color:C.lime, title:"Why warm-ups matter", min:4 },
    { tag:"Heart", color:C.citrus, title:"What your rhythms can teach us", min:7 },
  ];
  return (
    <Screen bg={C.cream}>
      <div style={{ padding:"20px 24px 0" }}>
        <div style={{ fontSize:12, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:C.greenTint60 }}>Learn</div>
        <div style={{ fontFamily:"'ABC Marist', serif", fontSize:30, fontWeight:600, letterSpacing:"-.02em", marginTop:4 }}>Today's lessons</div>
      </div>
      <div style={{ padding:"20px 20px 0", display:"flex", flexDirection:"column", gap:12 }}>
        {items.map(it => (
          <Card key={it.title} style={{ padding:0, overflow:"hidden" }}>
            <div style={{ height:100, background:it.color, position:"relative" }}>
              <div style={{ position:"absolute", top:12, left:14, padding:"4px 10px", borderRadius:99, background:"rgba(20,46,15,.12)", fontSize:11, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", color:C.green }}>{it.tag} · {it.min} min</div>
            </div>
            <div style={{ padding:"14px 18px 16px" }}>
              <div style={{ fontFamily:"'ABC Marist', serif", fontSize:18, fontWeight:600, lineHeight:1.2 }}>{it.title}</div>
              <div style={{ fontSize:12, color:C.greenTint60, marginTop:4, display:"flex", alignItems:"center", gap:6 }}>
                <Icon name="play" size={12}/>
                Tap to view education
              </div>
            </div>
          </Card>
        ))}
      </div>
      <TabBar active="learn"/>
    </Screen>
  );
}

/* ============================================================
   Screens registry
   ============================================================ */
window.CARDA_SCREENS = [
  { section:"Onboarding",   id:"splash",      label:"01 Splash",              C:S_Splash },
  { section:"Onboarding",   id:"lock",        label:"02 Lock screen",         C:S_Lock },
  { section:"Onboarding",   id:"login",       label:"03 Log in · verify",     C:S_Login },
  { section:"Onboarding",   id:"pair-intro",  label:"04 Pair · start",        C:S_PairIntro },
  { section:"Onboarding",   id:"pair-search", label:"05 Pair · searching",    C:S_PairSearching },
  { section:"Onboarding",   id:"pair-ok",     label:"06 Pair · success",      C:S_PairSuccess },
  { section:"Onboarding",   id:"pair-fail",   label:"07 Pair · failure",      C:S_PairFail },
  { section:"Home",         id:"home",        label:"08 Home · before",       C:S_HomeBefore },
  { section:"Home",         id:"home-miss",   label:"09 Home · missed",       C:S_HomeMissed },
  { section:"Check-in",     id:"ci-q",        label:"10 Check-in · question", C:S_CheckinQuestion },
  { section:"Check-in",     id:"ci-v",        label:"11 Check-in · vitals",   C:S_CheckinVitals },
  { section:"Check-in",     id:"ci-done",     label:"12 Check-in · complete", C:S_CheckinDone },
  { section:"Live session", id:"prep",        label:"13 Session prep",        C:S_SessionPrep },
  { section:"Live session", id:"in-range",    label:"14 In-session · in-range",  C:S_SessionInRange },
  { section:"Live session", id:"out-range",   label:"15 In-session · out of range", C:S_SessionOutOfRange },
  { section:"Live session", id:"paused",      label:"16 Session paused",      C:S_SessionPaused },
  { section:"Live session", id:"lost",        label:"17 Connection lost",     C:S_SessionLost },
  { section:"Check-out",    id:"post",        label:"18 Post-workout",        C:S_PostWorkoutSummary },
  { section:"Check-out",    id:"co-rpe",      label:"19 Check-out · RPE",     C:S_CheckoutRPE },
  { section:"Check-out",    id:"co-sym",      label:"20 Check-out · symptoms", C:S_CheckoutSymptoms },
  { section:"Collect info", id:"weight",      label:"21 Baseline · weight",   C:S_CollectWeight },
  { section:"Collect info", id:"meds",        label:"22 Baseline · meds",     C:S_CollectMeds },
  { section:"Journey",      id:"journey",     label:"23 Journey · level",     C:S_Journey },
  { section:"Team",         id:"messages",    label:"24 Messages · Michelle", C:S_Messages },
  { section:"Safety",       id:"emergency",   label:"25 Emergency · high HR", C:S_Emergency },
  { section:"You",          id:"profile",     label:"26 Profile",             C:S_Profile },
  { section:"Learn",        id:"learn",       label:"27 Learn library",       C:S_Learn },
];
