/* ─────────────────────────────────────────────────────────────────────────
   components/Sidebar.jsx
───────────────────────────────────────────────────────────────────────── */
import { LayoutDashboard, FileText, Timer, Code2, Shield, Settings2,
         LogOut, User, Crown } from "lucide-react";
import { useApp } from "../context/AppContext";

const NAV = [
  { id: "dashboard", Icon: LayoutDashboard, label: "Dashboard" },
  { id: "notes",     Icon: FileText,        label: "Notes"     },
  { id: "focus",     Icon: Timer,           label: "Focus"     },
  { id: "code",      Icon: Code2,           label: "Code"      },
  { id: "files",     Icon: Shield,          label: "Files"     },
  { id: "vault",     Icon: Shield,          label: "Vault"     },
  { id: "settings",  Icon: Settings2,       label: "Settings"  },
];
// Correct icons per id
const ICONS = { dashboard: LayoutDashboard, notes: FileText, focus: Timer, code: Code2, files: LayoutDashboard, vault: Shield, settings: Settings2 };

export default function Sidebar() {
  const { T, accent, btn, bodyFont, sec, setSec, sideOpen, onSideEnter, onSideLeave,
          user, logout, setShowAuth, now, isPro, setShowSubscription, vLocked } = useApp();

  return (
    <aside
      onMouseEnter={onSideEnter}
      onMouseLeave={onSideLeave}
      style={{ position: "fixed", left: 0, top: 0, height: "100vh", zIndex: 25, width: sideOpen ? "205px" : "0px", overflow: "hidden", background: T.sidebar, borderRight: sideOpen ? `1px solid ${T.border}` : "none", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", display: "flex", flexDirection: "column", padding: sideOpen ? "17px 9px" : "0", gap: "3px", transition: "width .28s cubic-bezier(.4,0,.2,1),padding .28s", boxShadow: sideOpen ? "5px 0 40px rgba(0,0,0,.4)" : "none" }}
    >
      {/* Logo */}
      <div onClick={() => setSec("dashboard")} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 6px 24px", overflow: "hidden", flexShrink: 0, cursor: "pointer" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0, background: `linear-gradient(135deg,${accent},#00e5ff)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: `0 0 20px ${accent}60` }}>🌊</div>
        <span style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "20px", color: T.text, whiteSpace: "nowrap" }}>FlowSpace</span>
      </div>

      {/* User card */}
      {user ? (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: "16px", padding: "9px 10px", marginBottom: "8px", flexShrink: 0, display: "flex", alignItems: "center", gap: "7px" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: `${accent}30`, border: `1px solid ${accent}60`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", flexShrink: 0 }}>
            {user.provider === "google" ? "🔵" : user.provider === "github" ? "⚫" : "👤"}
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div style={{ color: T.text, fontSize: "12px", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</div>
            <div style={{ color: T.muted, fontSize: "10px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</div>
          </div>
          <button onClick={logout} title="Sign out" style={{ background: "none", border: "none", cursor: "pointer", color: T.muted, padding: 0 }}><LogOut size={11}/></button>
        </div>
      ) : (
        <button onClick={() => setShowAuth(true)} style={{ ...btn(true), justifyContent: "center", marginBottom: "8px", fontSize: "12px", padding: "8px", flexShrink: 0 }}>
          <User size={12}/> Sign In
        </button>
      )}

      {/* Nav items */}
      {NAV.map(({ id, label }) => {
        const Icon = ICONS[id] || LayoutDashboard;
        return (
          <button key={id} onClick={() => setSec(id)}
            style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "16px", border: "none", cursor: "pointer", color: sec === id ? accent : T.muted, background: sec === id ? `${accent}15` : "transparent", fontFamily: bodyFont, fontSize: "14px", fontWeight: sec === id ? 700 : 500, transition: "all .15s", whiteSpace: "nowrap", width: "100%", textAlign: "left" }}
            onMouseEnter={e => { if(sec!==id) e.currentTarget.style.background = T.inp }}
            onMouseLeave={e => { if(sec!==id) e.currentTarget.style.background = "transparent" }}>
            <Icon size={18} style={{ flexShrink: 0, strokeWidth: sec === id ? 2.5 : 2 }}/>
            <span>{label}</span>
            {id === "vault" && !vLocked && <span style={{ fontSize: "10px", color: "#00ff94", marginLeft: "auto" }}>🔓</span>}
          </button>
        );
      })}

      <div style={{ flex: 1 }}/>

      {/* Upgrade / Pro badge */}
      {!isPro && (
        <button onClick={() => setShowSubscription(true)}
          style={{ display: "flex", alignItems: "center", gap: "6px", padding: "9px 11px", borderRadius: "10px", background: "linear-gradient(135deg,#ffd32a18,#ff9f4312)", border: "1px solid #ffd32a35", cursor: "pointer", color: "#ffd32a", fontFamily: bodyFont, fontSize: "11px", fontWeight: 700, marginBottom: "5px", flexShrink: 0, width: "100%", justifyContent: "center" }}>
          <Crown size={11}/> Upgrade to Pro
        </button>
      )}
      {isPro && (
        <div style={{ padding: "6px 9px", borderRadius: "10px", background: "linear-gradient(135deg,#ffd32a18,#ff9f4312)", border: "1px solid #ffd32a35", marginBottom: "5px", display: "flex", alignItems: "center", gap: "5px", flexShrink: 0 }}>
          <Crown size={10} color="#ffd32a"/><span style={{ color: "#ffd32a", fontSize: "10px", fontWeight: 700, fontFamily: "Syne" }}>PRO</span>
        </div>
      )}

      {/* Clock */}
      <div style={{ padding: "9px", borderRadius: "10px", background: T.inp, border: `1px solid ${T.border}`, marginBottom: "4px", textAlign: "center", flexShrink: 0 }}>
        <div style={{ fontFamily: "JetBrains Mono", fontSize: "15px", color: T.text }}>{now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}</div>
        <div style={{ color: T.muted, fontSize: "10px", marginTop: "2px" }}>{now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</div>
      </div>
    </aside>
  );
}
