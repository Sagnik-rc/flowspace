/* ─────────────────────────────────────────────────────────────────────────
   components/StaticDock.jsx
   An expandable, modular dock replacing the standard footer.
───────────────────────────────────────────────────────────────────────── */
import { useState } from "react";
import { useApp } from "../context/AppContext";

export function StaticDock() {
  const { T, accent, dark, setSpotOpen, setCalOpen } = useApp();
  const [expanded, setExpanded] = useState(false);

  const ICONS = {
    spotify: <svg width="22" height="22" viewBox="0 0 24 24" fill="#1ed760"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.021zM19.32 14.1c-.3.42-.84.54-1.26.24-3.36-2.04-8.52-2.64-12.54-1.44-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.56-1.32 10.26-.6 14.1 1.68.42.3.54.9.24 1.26zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.12-1.38-.72-.18-.6.12-1.2.72-1.38 4.2-1.26 11.28-1.02 15.72 1.62.54.36.72 1.02.36 1.56-.3.54-1.02.72-1.56.36z"/></svg>,
    calendar: <svg width="22" height="22" viewBox="0 0 24 24" fill="#4285f4"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/></svg>,
    youtube: <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
  };

  const DOCK_ITEMS = [
    { id: "spotify", name: "Spotify", icon: ICONS.spotify, color: "#1ed760", action: () => { setSpotOpen(v => !v); setExpanded(false); } },
    { id: "calendar", name: "Google Calendar", icon: ICONS.calendar, color: "#4285f4", action: () => { setCalOpen(v => !v); setExpanded(false); } },
    { id: "youtube", name: "YouTube", icon: ICONS.youtube, color: "#FF0000", action: () => { window.open("https://youtube.com", "_blank"); setExpanded(false); } }
  ];

  return (
    <div style={{ position: "fixed", bottom: "90px", left: "50%", transform: "translateX(-50%)", zIndex: 500, display: "flex", flexDirection: "column", alignItems: "center" }}>
      
      {/* Main FlowSpace Brand FAB */}
      <button onClick={() => setExpanded(!expanded)} style={{
        width: "58px", height: "58px", borderRadius: "50%", background: `linear-gradient(135deg,${accent},#00e5ff)`, 
        border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", 
        boxShadow: `0 12px 36px ${accent}60`, transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: expanded ? "rotate(180deg) scale(0.95)" : "scale(1)", position: "relative", zIndex: 10
      }}>
        <img src="/flowspace.svg" alt="FlowSpace" style={{ width: "32px", height: "32px", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))", transition: "transform 0.4s", transform: expanded ? "rotate(180deg)" : "none" }} 
             onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }}/>
        <span style={{ display: "none", fontSize: "24px" }}>🌊</span>
      </button>

      {/* Expanded Dock (Appears Below FAB on Hover) */}
      <div style={{ 
        display: "flex", alignItems: "center", gap: "12px", justifyContent: "center",
        background: dark ? "rgba(10,6,26,0.8)" : "rgba(252,250,255,0.8)", 
        backdropFilter: "blur(32px)", border: `1px solid ${accent}30`, borderRadius: "100px", 
        boxShadow: `0 24px 60px rgba(0,0,0,0.2)`, marginTop: "16px",
        padding: "10px", width: expanded ? "270px" : "40px", opacity: expanded ? 1 : 0, 
        transform: expanded ? "translateY(0) scale(1)" : "translateY(-20px) scale(0.8)", 
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)", pointerEvents: expanded ? "auto" : "none",
        overflow: "hidden", position: "absolute", top: "100%"
      }}>
        {DOCK_ITEMS.map((item) => (
          <DockIcon key={item.id} item={item} />
        ))}
      </div>

    </div>
  );
}

function DockIcon({ item }) {
  const { T } = useApp();
  const [hover, setHover] = useState(false);

  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "center", flexShrink: 0 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      
      {/* Icon Button */}
      <button onClick={item.action}
        style={{ width: "42px", height: "42px", borderRadius: "14px", background: hover ? `${item.color}20` : T.inp, border: `1px solid ${hover ? item.color + "50" : T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)", transform: hover ? "scale(1.2) translateY(-6px)" : "scale(1)", boxShadow: hover ? `0 12px 24px ${item.color}30` : "none", zIndex: hover ? 10 : 1 }}>
        {item.icon}
      </button>

      {/* Tooltip */}
      <div style={{ position: "absolute", top: "-48px", background: T.sidebar, border: `1px solid ${T.border}`, padding: "6px 12px", borderRadius: "8px", fontFamily: "Syne", fontSize: "12px", fontWeight: 700, color: T.text, whiteSpace: "nowrap", pointerEvents: "none", opacity: hover ? 1 : 0, transform: hover ? "translateY(0) scale(1)" : "translateY(8px) scale(0.9)", transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)", boxShadow: `0 8px 16px rgba(0,0,0,0.1)`, zIndex: 20 }}>
        {item.name}
      </div>
    </div>
  );
}
