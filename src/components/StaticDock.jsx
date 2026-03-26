/* ─────────────────────────────────────────────────────────────────────────
   components/StaticDock.jsx
   A purely aesthetic, modular dock replacing the standard footer.
───────────────────────────────────────────────────────────────────────── */
import { useState } from "react";
import { useApp } from "../context/AppContext";

export function StaticDock() {
  const { T, accent, dark, setSpotOpen, setCalOpen, now } = useApp();

  // Custom icon SVGs
  const ICONS = {
    spotify: <svg width="22" height="22" viewBox="0 0 24 24" fill="#1ed760"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.021zM19.32 14.1c-.3.42-.84.54-1.26.24-3.36-2.04-8.52-2.64-12.54-1.44-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.56-1.32 10.26-.6 14.1 1.68.42.3.54.9.24 1.26zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.12-1.38-.72-.18-.6.12-1.2.72-1.38 4.2-1.26 11.28-1.02 15.72 1.62.54.36.72 1.02.36 1.56-.3.54-1.02.72-1.56.36z"/></svg>,
    calendar: <svg width="22" height="22" viewBox="0 0 24 24" fill="#4285f4"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/></svg>,
    twitter: <svg width="18" height="18" viewBox="0 0 24 24" fill={T.text}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    instagram: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
  };

  const DOCK_ITEMS = [
    { id: "spotify", name: "Spotify", icon: ICONS.spotify, color: "#1ed760", action: () => setSpotOpen(v => !v) },
    { id: "calendar", name: "Google Calendar", icon: ICONS.calendar, color: "#4285f4", action: () => setCalOpen(v => !v) },
    { id: "twitter", name: "X", icon: ICONS.twitter, color: dark ? "#ffffff" : "#000000", action: () => window.open("https://twitter.com", "_blank") },
    { id: "instagram", name: "Instagram", icon: ICONS.instagram, color: "#E1306C", action: () => window.open("https://instagram.com", "_blank") }
  ];

  return (
    <div style={{ position: "fixed", bottom: "20px", left: "50%", transform: "translateX(-50%)", zIndex: 50, display: "flex", alignItems: "center", gap: "10px", padding: "12px 20px", background: dark ? "rgba(10,6,26,0.6)" : "rgba(252,250,255,0.6)", backdropFilter: "blur(32px)", border: `1px solid ${accent}30`, borderRadius: "100px", boxShadow: `0 24px 60px rgba(0,0,0,0.1), 0 0 0 1px ${accent}20 inset` }}>
      
      {/* Brand Mini */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingRight: "16px", borderRight: `1px solid ${T.border}` }}>
        <div style={{ width: "26px", height: "26px", borderRadius: "8px", background: `linear-gradient(135deg,${accent},#00e5ff)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", boxShadow: `0 0 16px ${accent}60` }}>🌊</div>
      </div>

      {/* Dynamic Dock Icons */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "0 8px" }}>
        {DOCK_ITEMS.map((item) => (
          <DockIcon key={item.id} item={item} />
        ))}
      </div>

      {/* Clock Mini */}
      <div style={{ paddingLeft: "16px", borderLeft: `1px solid ${T.border}`, display: "flex", alignItems: "center" }}>
        <div style={{ fontFamily: "JetBrains Mono", fontWeight: 700, fontSize: "14px", color: T.text, letterSpacing: "-0.5px" }}>
          {now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}
        </div>
      </div>

    </div>
  );
}

function DockIcon({ item }) {
  const { T } = useApp();
  const [hover, setHover] = useState(false);

  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "center" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      
      {/* Icon Button */}
      <button onClick={item.action}
        style={{ width: "42px", height: "42px", borderRadius: "14px", background: hover ? `${item.color}20` : T.inp, border: `1px solid ${hover ? item.color + "50" : T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)", transform: hover ? "scale(1.2) translateY(-6px)" : "scale(1)", boxShadow: hover ? `0 12px 24px ${item.color}30` : "none", zIndex: hover ? 10 : 1 }}>
        {item.icon}
      </button>

      {/* Tooltip */}
      <div style={{ position: "absolute", top: "-40px", background: T.sidebar, border: `1px solid ${T.border}`, padding: "4px 10px", borderRadius: "6px", fontFamily: "Syne", fontSize: "11px", fontWeight: 700, color: T.text, whiteSpace: "nowrap", pointerEvents: "none", opacity: hover ? 1 : 0, transform: hover ? "translateY(0) scale(1)" : "translateY(8px) scale(0.9)", transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)", boxShadow: `0 8px 16px rgba(0,0,0,0.1)` }}>
        {item.name}
      </div>
    </div>
  );
}
