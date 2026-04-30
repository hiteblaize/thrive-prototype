/* global React */

// Simple 10" tablet-in-landscape bezel. Content is 1080×810 (4:3); bezel adds
// 28px around with rounded-32 outer corners, a small camera dot on the long
// edge. Dark bezel by default to match the iPad look.
function TabletFrame({ children, bezel = "#0E0E0E", inner = "#000" }) {
  return (
    <div style={{
      width: 1080 + 56, height: 810 + 56, background: bezel,
      borderRadius: 40, padding: 28, boxSizing: "border-box", position: "relative",
      boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.06), 0 30px 80px rgba(0,0,0,0.35)",
    }}>
      {/* camera */}
      <div style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)",
                    width: 8, height: 8, borderRadius: 9999, background: "#2a2a2a" }}/>
      <div style={{ width: 1080, height: 810, borderRadius: 16, overflow: "hidden", background: inner }}>
        {children}
      </div>
    </div>
  );
}

window.TabletFrame = TabletFrame;
