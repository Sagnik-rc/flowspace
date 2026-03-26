/* ─────────────────────────────────────────────────────────────────────────
   components/TopBar.jsx  —  Spotify / Calendar / User buttons (top-right)
───────────────────────────────────────────────────────────────────────── */
import { Music2, CalendarDays, User } from "lucide-react";
import { useApp } from "../context/AppContext";

export function TopBar() {
  const { T, accent, bodyFont, user, setShowAuth, setSec,
          spotOpen, setSpotOpen, setCalOpen, spotConnected,
          calOpen, calConnected } = useApp();

  return (
    <div style={{ position: "fixed", top: "13px", right: "18px", zIndex: 20, display: "flex", alignItems: "center", gap: "7px" }}>
      <button onClick={() => { setSpotOpen(v => !v); setCalOpen(false); }}
        style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "20px", border: `1px solid ${spotConnected ? "#1ed76055" : T.border}`, background: spotConnected ? "#1ed76015" : T.card, cursor: "pointer", color: T.text, fontFamily: bodyFont, fontSize: "13px", fontWeight: 500, backdropFilter: "blur(20px)", transition: "all .18s" }}>
        <Music2 size={13} color={spotConnected ? "#1ed760" : undefined}/><span>Spotify</span>
        {spotConnected && <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#1ed760", boxShadow: "0 0 5px #1ed760" }}/>}
      </button>
      <button onClick={() => { setCalOpen(v => !v); setSpotOpen(false); }}
        style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "20px", border: `1px solid ${calConnected ? "#4285f455" : T.border}`, background: calConnected ? "#4285f415" : T.card, cursor: "pointer", color: T.text, fontFamily: bodyFont, fontSize: "13px", fontWeight: 500, backdropFilter: "blur(20px)", transition: "all .18s" }}>
        <CalendarDays size={13} color={calConnected ? "#4285f4" : undefined}/><span>Calendar</span>
        {calConnected && <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4285f4", boxShadow: "0 0 5px #4285f4" }}/>}
      </button>
      {user ? (
        <button onClick={() => setSec("settings")}
          style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 13px", borderRadius: "20px", border: `1px solid ${accent}50`, background: `${accent}15`, cursor: "pointer", color: T.text, fontFamily: bodyFont, fontSize: "13px", fontWeight: 600, backdropFilter: "blur(20px)" }}>
          <span style={{ fontSize: "14px" }}>{user.provider === "google" ? "🔵" : user.provider === "github" ? "⚫" : "👤"}</span>
          {user.name.split(" ")[0]}
        </button>
      ) : (
        <button onClick={() => setShowAuth(true)}
          style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 14px", borderRadius: "20px", border: `1px solid ${accent}60`, background: `linear-gradient(135deg,${accent}22,transparent)`, cursor: "pointer", color: T.text, fontFamily: bodyFont, fontSize: "13px", fontWeight: 600, backdropFilter: "blur(20px)" }}>
          <User size={12}/> Sign In
        </button>
      )}
    </div>
  );
}


/* ─────────────────────────────────────────────────────────────────────────
   components/Footer.jsx
───────────────────────────────────────────────────────────────────────── */
import { Heart, Crown } from "lucide-react";
import { SOCIALS } from "../constants";

export function Footer() {
  const { T, accent, btn, bodyFont, user, setShowAuth, setSec, isPro, setShowSubscription, now } = useApp();
  return (
    <footer style={{ position: "relative", zIndex: 1, flexShrink: 0, borderTop: `1px solid ${T.border}`, background: T.sidebar, backdropFilter: "blur(20px)", padding: "10px 34px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "16px" }}>🌊</span>
        <span style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "13px", color: T.text }}>FlowSpace</span>
        <span style={{ color: T.muted, fontFamily: bodyFont, fontSize: "12px" }}>your space. your flow.</span>
        <span style={{ color: T.muted, fontSize: "11px" }}>·</span>
        <span style={{ display: "flex", alignItems: "center", gap: "4px", color: T.muted, fontSize: "11px" }}>Made with <Heart size={10} color="#f43f5e" fill="#f43f5e"/> by FlowSpace</span>
      </div>

      {/* Socials */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {SOCIALS.map(({ href, icon, label, color }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" title={label}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "28px", height: "28px", borderRadius: "8px", background: T.inp, border: `1px solid ${T.border}`, fontSize: "13px", textDecoration: "none", transition: "all .15s" }}
            onMouseEnter={e => { e.currentTarget.style.background = `${color}22`; e.currentTarget.style.borderColor = `${color}60`; }}
            onMouseLeave={e => { e.currentTarget.style.background = T.inp; e.currentTarget.style.borderColor = T.border; }}>
            {icon}
          </a>
        ))}
      </div>

      {/* Right links */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "12px", color: T.muted }}>
        {!isPro && (
          <button onClick={() => setShowSubscription(true)}
            style={{ display: "flex", alignItems: "center", gap: "4px", background: "linear-gradient(135deg,#ffd32a30,#ff9f4320)", border: "1px solid #ffd32a40", borderRadius: "8px", padding: "4px 10px", cursor: "pointer", color: "#ffd32a", fontFamily: bodyFont, fontSize: "11px", fontWeight: 700 }}>
            <Crown size={10}/> Get Pro
          </button>
        )}
        <button onClick={() => setSec("settings")} style={{ background: "none", border: "none", cursor: "pointer", color: T.muted, fontFamily: bodyFont, fontSize: "12px", padding: 0 }}>Settings</button>
        <span>·</span>
        <button onClick={() => setShowAuth(true)} style={{ background: "none", border: "none", cursor: "pointer", color: T.muted, fontFamily: bodyFont, fontSize: "12px", padding: 0 }}>{user ? "Account" : "Sign In"}</button>
        <span>·</span>
        <span style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>{now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}</span>
      </div>
    </footer>
  );
}
