/* ─────────────────────────────────────────────────────────────────────────
   components/TopBar.jsx  —  User Profile/Auth buttons (top-right)
───────────────────────────────────────────────────────────────────────── */
import { User } from "lucide-react";
import { useApp } from "../context/AppContext";

export function TopBar() {
  const { T, accent, bodyFont, user, setShowAuth, setSec } = useApp();

  return (
    <div style={{ position: "fixed", top: "24px", right: "30px", zIndex: 20, display: "flex", alignItems: "center", gap: "12px" }}>
      {user ? (
        <button onClick={() => setSec("settings")}
          style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 20px", borderRadius: "100px", border: `1px solid ${accent}40`, background: `${accent}15`, cursor: "pointer", color: T.text, fontFamily: bodyFont, fontSize: "14px", fontWeight: 700, backdropFilter: "blur(24px)", transition: "all .2s cubic-bezier(0.34, 1.56, 0.64, 1)", boxShadow: `0 12px 32px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.05)` }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px) scale(1.02)"; e.currentTarget.style.boxShadow = `0 16px 40px ${accent}30`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.1)`; }}>
          <span style={{ fontSize: "18px" }}>{user.provider === "google" ? "🔵" : user.provider === "github" ? "⚫" : "👤"}</span>
          {user.name}
        </button>
      ) : (
        <button onClick={() => setShowAuth(true)}
          style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 24px", borderRadius: "100px", border: `1px solid ${accent}60`, background: `linear-gradient(135deg,${accent}30,transparent)`, cursor: "pointer", color: T.text, fontFamily: bodyFont, fontSize: "15px", fontWeight: 800, backdropFilter: "blur(24px)", transition: "all .2s cubic-bezier(0.34, 1.56, 0.64, 1)", boxShadow: `0 12px 32px ${accent}20, inset 0 0 0 1px rgba(255,255,255,0.05)` }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px) scale(1.02)"; e.currentTarget.style.boxShadow = `0 20px 48px ${accent}40`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = `0 12px 32px ${accent}20`; }}>
          <User size={16}/> Sign In
        </button>
      )}
    </div>
  );
}
