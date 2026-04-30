// Font Awesome 6 Pro unicode glyph map used throughout Carda portal.
// Use <Icon name="heart" variant="solid" /> — variants: solid | regular | light | thin | sharp | brands
// Glyphs below are a working subset of the Carda icon vocabulary found in Figma.

window.FA_GLYPHS = {
  // vitals & clinical
  "heart":          "\uf004",
  "heart-pulse":    "\uf21e",
  "wave-pulse":     "\uf5f8",   // ECG / pulse waveform
  "droplet":        "\uf043",   // blood pressure
  "lungs":          "\uf604",
  "stethoscope":    "\uf0f1",
  "user-doctor":    "\uf0f0",
  "notes-medical":  "\uf481",
  "pills":          "\uf484",
  "temperature-half":"\uf2c9",
  "weight-scale":   "\uf496",
  "dumbbell":       "\uf44b",
  "person-running": "\uf70c",
  "fire":           "\uf06d",
  "bolt":           "\uf0e7",
  "gauge":          "\uf624",
  "wave-square":    "\uf83e",

  // status & control
  "circle-check":   "\uf058",
  "circle-xmark":   "\uf057",
  "circle-exclamation":"\uf06a",
  "triangle-exclamation":"\uf071",
  "circle-info":    "\uf05a",
  "circle-dot":     "\uf192",
  "check":          "\uf00c",
  "xmark":          "\uf00d",
  "plus":           "\u002b",
  "minus":          "\uf068",
  "arrow-up":       "\uf062",
  "arrow-down":     "\uf063",
  "arrow-up-right": "\uf08e",
  "arrow-right":    "\uf061",
  "chevron-right":  "\uf054",
  "chevron-down":   "\uf078",
  "chevron-up":     "\uf077",
  "ellipsis":       "\uf141",
  "ellipsis-vertical":"\uf142",

  // calling / video
  "video":          "\uf03d",
  "video-slash":    "\uf4e2",
  "microphone":     "\uf130",
  "microphone-slash":"\uf131",
  "phone":          "\uf095",
  "phone-hangup":   "\ue225",
  "screen-users":   "\uf63d",
  "message":        "\uf27a",
  "comment":        "\uf075",
  "comment-dots":   "\uf4ad",
  "bell":           "\uf0f3",
  "bell-ring":      "\uf8fd",
  "headset":        "\uf590",
  "speaker-high":   "\uf028",
  "speaker-low":    "\uf027",

  // navigation / UI
  "house":          "\uf015",
  "gauge-high":     "\uf625",
  "calendar":       "\uf073",
  "calendar-check": "\uf274",
  "clock":          "\uf017",
  "magnifying-glass":"\uf002",
  "bars-filter":    "\ue0ad",
  "filter":         "\uf0b0",
  "sliders":        "\uf1de",
  "gear":           "\uf013",
  "arrow-right-from-bracket":"\uf08b",
  "arrow-left":     "\uf060",
  "trash":          "\uf1f8",
  "pen":            "\uf304",
  "pen-to-square":  "\uf044",
  "list":           "\uf03a",
  "grid-2":         "\ue196",
  "table":          "\uf0ce",

  // people / session
  "users":          "\uf0c0",
  "user":           "\uf007",
  "user-plus":      "\uf234",
  "user-check":     "\uf4fc",
  "user-xmark":     "\uf235",
  "user-nurse":     "\uf82f",
  "user-group":     "\uf500",
  "hand":           "\uf256",
  "hand-holding-heart":"\uf4be",

  // documents / reports
  "file-lines":     "\uf15c",
  "file-medical":   "\uf477",
  "chart-line":     "\uf201",
  "chart-column":   "\ue0e3",
  "chart-simple":   "\ue473",
  "flag":           "\uf024",

  // connectivity
  "wifi":           "\uf1eb",
  "battery-full":   "\uf240",
  "bluetooth":      "\uf293",
  "plug":           "\uf1e6",
};

window.Icon = function Icon({ name, variant = "solid", size = 16, color = "currentColor", style = {} }) {
  const fam = variant === "brands" ? "Font Awesome 6 Brands"
            : variant === "sharp"  ? "Font Awesome 6 Sharp"
            :                        "Font Awesome 6 Pro";
  const weight = variant === "light" ? 300
              : variant === "thin"  ? 100
              : variant === "regular" ? 400
              :                        900;
  const glyph = window.FA_GLYPHS[name] || "\uf128"; // question-mark fallback
  return React.createElement("span", {
    style: { fontFamily: fam, fontWeight: weight, fontSize: size, color, lineHeight: 1, display: "inline-block", fontStyle: "normal", ...style },
    "aria-hidden": true,
  }, glyph);
};
