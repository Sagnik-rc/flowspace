/* ─────────────────────────────────────────────────────────────────────────
   App.jsx  —  The main shell. Just wires everything together.
   All state lives in AppContext. All sections/modals are self-contained.
───────────────────────────────────────────────────────────────────────── */
import { useApp } from "./context/AppContext";
import { GFONTS } from "./constants";

// Layout
import Sidebar       from "./components/Sidebar";
import { TopBar, Footer } from "./components/TopBar";
import FloatingAI    from "./components/FloatingAI";

// Sections
import Dashboard     from "./sections/Dashboard";
import Notes         from "./sections/Notes";
import Focus         from "./sections/Focus";
import CodeEditor    from "./sections/CodeEditor";
import Files         from "./sections/Files";
import Vault         from "./sections/Vault";
import Settings      from "./sections/Settings";

// Modals
import { AuthModal, SpotifyModal, CalendarModal,
         PomPopup, SubscriptionModal, SessionCompleteModal } from "./modals";

const SECTION_MAP = { dashboard: Dashboard, notes: Notes, focus: Focus,
                      code: CodeEditor, files: Files, vault: Vault };

export default function App() {
  const { T, accent, dark, bodyFont, fontSize, bgImage, sec, onSideEnter } = useApp();
  const ActiveSection = SECTION_MAP[sec] || Dashboard;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: bodyFont, fontSize: `${fontSize}px`, color: T.text, overflow: "hidden", position: "relative", background: bgImage ? `url(${bgImage}) center/cover no-repeat fixed` : T.bg }}>

      {/* ── Global styles & fonts ─────────────────────────────────── */}
      <style>{GFONTS + `
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${accent}70; border-radius: 4px; }
        @keyframes pulse     { 0%,100%{opacity:.2;transform:scale(.7)} 50%{opacity:1;transform:scale(1.1)} }
        @keyframes floatSlideIn { from{opacity:0;transform:translateY(14px) scale(.93)} to{opacity:1;transform:none} }
        @keyframes floatPopUp   { from{opacity:0;transform:translateY(22px) scale(.88)} to{opacity:1;transform:none} }
        @keyframes botPulse  { 0%,100%{box-shadow:0 0 24px ${accent}60,0 4px 16px rgba(0,0,0,.3)} 50%{box-shadow:0 0 42px ${accent}90,0 4px 26px rgba(0,0,0,.4)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-16px) scale(.95)} to{opacity:1;transform:none} }
        @keyframes authPop   { from{opacity:0;transform:scale(.88) translateY(18px)} to{opacity:1;transform:none} }
        @keyframes spin      { to{transform:rotate(360deg)} }
        @keyframes donePulse { 0%{transform:scale(.7);opacity:0} 60%{transform:scale(1.15)} 100%{transform:scale(1);opacity:1} }
        input::placeholder, textarea::placeholder { color: ${T.muted}; }
        button:not(:disabled):hover { opacity: .85; transform: translateY(-1px); }
        button { transition: all .15s !important; }
      `}</style>

      {/* ── Background layers ─────────────────────────────────────── */}
      {bgImage && <div style={{ position: "fixed", inset: 0, background: dark ? "rgba(5,5,14,0.72)" : "rgba(244,241,255,0.66)", backdropFilter: "blur(2px)", zIndex: 0, pointerEvents: "none" }}/>}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, background: `radial-gradient(ellipse at 12% 20%,${accent}12 0%,transparent 52%),radial-gradient(ellipse at 88% 78%,#00e5ff08 0%,transparent 52%)` }}/>

      {/* ── Sidebar hover trigger ──────────────────────────────────── */}
      <div onMouseEnter={onSideEnter} style={{ position: "fixed", left: 0, top: 0, width: "10px", height: "100vh", zIndex: 30 }}/>

      {/* ── Layout components ─────────────────────────────────────── */}
      <Sidebar/>
      <TopBar/>

      {/* ── Main content area ─────────────────────────────────────── */}
      <main style={{ flex: 1, overflowY: "auto", padding: "32px 34px 0", position: "relative", zIndex: 1, minWidth: 0 }}>
        {sec === "settings" ? <Settings/> : <ActiveSection/>}
      </main>

      <Footer/>

      {/* ── All modals ────────────────────────────────────────────── */}
      <PomPopup/>
      <SpotifyModal/>
      <CalendarModal/>
      <AuthModal/>
      <SubscriptionModal/>
      <SessionCompleteModal/>

      {/* ── Floating AI ───────────────────────────────────────────── */}
      <FloatingAI/>
    </div>
  );
}
