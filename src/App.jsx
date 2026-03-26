/* ─────────────────────────────────────────────────────────────────────────
   App.jsx  —  The main shell. Just wires everything together.
   All state lives in AppContext. All sections/modals are self-contained.
import { useState } from "react";
import { useApp } from "./context/AppContext";
import { GFONTS } from "./constants";
import { X, Check, ArrowRight } from "lucide-react";

// Layout
import Sidebar       from "./components/Sidebar";
import { TopBar }    from "./components/TopBar";
import { StaticDock } from "./components/StaticDock";
import FloatingAI    from "./components/FloatingAI";

// Sections
import Dashboard     from "./sections/Dashboard";
import Notes         from "./sections/Notes";
import Focus         from "./sections/Focus";
import CodeEditor    from "./sections/CodeEditor";
import Files         from "./sections/Files";
import Vault         from "./sections/Vault";
import Settings      from "./sections/Settings";
import Landing       from "./sections/Landing";

// Modals
import { AuthModal, SpotifyModal, CalendarModal,
         PomPopup, SubscriptionModal, SessionCompleteModal } from "./modals";

const SECTION_MAP = { dashboard: Dashboard, notes: Notes, focus: Focus,
                      code: CodeEditor, files: Files, vault: Vault };

export default function App() {
  const { T, accent, dark, bodyFont, fontSize, bgImage, sec, onSideEnter, user } = useApp();
  const ActiveSection = SECTION_MAP[sec] || Dashboard;
  const isLanding = !user;

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

      {isLanding ? (
        <Landing />
      ) : (
        <>
          {/* ── Sidebar hover trigger ──────────────────────────────────── */}
          <div onMouseEnter={onSideEnter} style={{ position: "fixed", left: 0, top: 0, width: "10px", height: "100vh", zIndex: 30 }}/>

          {/* ── Layout components ─────────────────────────────────────── */}
          <Sidebar/>
          <TopBar/>

          {/* ── Main content area ─────────────────────────────────────── */}
          <main style={{ flex: 1, overflowY: "auto", padding: "32px 34px 0", position: "relative", zIndex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
            <div style={{ flex: 1 }}>
              {sec === "settings" ? <Settings/> : <ActiveSection/>}
            </div>
            <MiniFooter />
          </main>

          <StaticDock/>

          {/* ── Floating AI ───────────────────────────────────────────── */}
          <FloatingAI/>
        </>
      )}

      {/* ── All modals ────────────────────────────────────────────── */}
      <PomPopup/>
      <SpotifyModal/>
      <CalendarModal/>
      <AuthModal/>
      <SubscriptionModal/>
      <SessionCompleteModal/>
      <LegalModal/>
      <FeedbackModal/>
    </div>
  );
}

function MiniFooter() {
  const { T, accent } = useApp();
  return (
    <footer style={{ marginTop: "32px", padding: "16px 0", borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", opacity: 0.8, paddingBottom: "80px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "20px", height: "20px", borderRadius: "6px", background: `linear-gradient(135deg,${accent},#00e5ff)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", boxShadow: `0 0 8px ${accent}60` }}>🌊</div>
        <span style={{ fontFamily: "Syne", fontWeight: 700, fontSize: "14px", color: T.text }}>FlowSpace</span>
        <span style={{ color: T.muted, fontSize: "12px", marginLeft: "10px" }}>© {new Date().getFullYear()} • v1.0.0</span>
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <button onClick={() => { setFeedbackTab("feedback"); setShowFeedback(true); }} style={{ background: "transparent", border: "none", color: T.muted, fontSize: "12px", transition: "color .2s", cursor: "pointer", padding: 0 }} onMouseEnter={e => e.target.style.color = T.text} onMouseLeave={e => e.target.style.color = T.muted}>Send Feedback</button>
        <button onClick={() => { setFeedbackTab("issue"); setShowFeedback(true); }} style={{ background: "transparent", border: "none", color: T.muted, fontSize: "12px", transition: "color .2s", cursor: "pointer", padding: 0 }} onMouseEnter={e => e.target.style.color = T.text} onMouseLeave={e => e.target.style.color = T.muted}>Report Issue</button>
        <button onClick={() => { setFeedbackTab("feature"); setShowFeedback(true); }} style={{ background: "transparent", border: "none", color: T.muted, fontSize: "12px", transition: "color .2s", cursor: "pointer", padding: 0 }} onMouseEnter={e => e.target.style.color = T.text} onMouseLeave={e => e.target.style.color = T.muted}>Request Feature</button>
      </div>
    </footer>
  );
}

function LegalModal() {
  const { T, dark, accent, showLegal, setShowLegal, legalTab, setLegalTab } = useApp();
  if (!showLegal) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: "20px" }} onClick={() => setShowLegal(false)}>
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: "24px", width: "90%", maxWidth: "700px", maxHeight: "85vh", overflowY: "auto", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: "32px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: "24px", position: "sticky", top: 0, background: dark ? "rgba(10,6,26,0.95)" : "rgba(252,250,255,0.95)", backdropFilter: "blur(20px)", zIndex: 10 }}>
          <h2 style={{ fontFamily: "Syne", fontSize: "28px", fontWeight: "800", color: T.text, margin: 0 }}>Legal</h2>
          <div style={{ display: "flex", background: T.inp, borderRadius: "100px", padding: "4px", gap: "4px" }}>
            <button onClick={() => setLegalTab("privacy")} style={{ background: legalTab === "privacy" ? T.card : "transparent", color: legalTab === "privacy" ? T.text : T.muted, border: "none", borderRadius: "100px", padding: "8px 20px", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all .2s", boxShadow: legalTab === "privacy" ? "0 4px 12px rgba(0,0,0,0.1)" : "none" }}>Privacy Policy</button>
            <button onClick={() => setLegalTab("terms")} style={{ background: legalTab === "terms" ? T.card : "transparent", color: legalTab === "terms" ? T.text : T.muted, border: "none", borderRadius: "100px", padding: "8px 20px", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all .2s", boxShadow: legalTab === "terms" ? "0 4px 12px rgba(0,0,0,0.1)" : "none" }}>Terms of Service</button>
          </div>
          <button onClick={() => setShowLegal(false)} style={{ marginLeft: "auto", background: T.inp, border: "none", color: T.muted, width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><X size={18} /></button>
        </div>
        <div style={{ padding: "32px", color: T.muted, fontSize: "15px", lineHeight: "1.7", fontFamily: "Outfit" }}>
          {legalTab === "privacy" && (
            <div>
              <h3 style={{ color: T.text, fontSize: "20px", marginBottom: "16px", fontFamily: "Syne" }}>Privacy Policy</h3>
              <p style={{ marginBottom: "16px" }}>At FlowSpace, we take your privacy extremely seriously. We collect minimal information necessary to provide you with the best productivity experience. Your Focus vault notes are entirely local or end-to-end encrypted depending on your sync settings.</p>
              <p style={{ marginBottom: "16px" }}><strong>Data Collection:</strong> We collect email addresses and basic usage telemetry (e.g., pomodoro sessions completed) purely for maintaining the service. We do not sell any data to third parties.</p>
              <p style={{ marginBottom: "16px" }}><strong>Third-Party Integrations:</strong> When connecting to Spotify or Google Calendar, you are subject to their respective privacy policies. FlowSpace only reads data required to display the widgets seamlessly.</p>
            </div>
          )}
          {legalTab === "terms" && (
            <div>
              <h3 style={{ color: T.text, fontSize: "20px", marginBottom: "16px", fontFamily: "Syne" }}>Terms of Service</h3>
              <p style={{ marginBottom: "16px" }}>By using FlowSpace, you agree to not misuse the product or attempt to reverse-engineer its core productivity tracking systems.</p>
              <p style={{ marginBottom: "16px" }}><strong>Pro Accounts:</strong> FlowSpace Pro subscriptions are billed via Razorpay. Subscriptions automatically renew unless cancelled. No refunds are provided for partial months.</p>
              <p style={{ marginBottom: "16px" }}><strong>Limitations:</strong> We reserve the right to limit API usage or file uploads for free accounts to ensure stability for all customers across the platform.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FeedbackModal() {
  const { T, dark, accent, showFeedback, setShowFeedback, feedbackTab, setFeedbackTab, btn, inp } = useApp();
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  if (!showFeedback) return null;
  const submitFeedback = () => {
    if (!msg.trim()) return;
    setSent(true);
    setTimeout(() => { setSent(false); setMsg(""); setShowFeedback(false); }, 2000);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: "20px" }} onClick={() => setShowFeedback(false)}>
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: "24px", width: "90%", maxWidth: "550px", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: "28px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: "16px", position: "relative" }}>
          <h2 style={{ fontFamily: "Syne", fontSize: "24px", fontWeight: "800", color: T.text, margin: 0 }}>We're Listening</h2>
          <button onClick={() => setShowFeedback(false)} style={{ position: "absolute", top: "28px", right: "28px", background: T.inp, border: "none", color: T.muted, width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><X size={16} /></button>
        </div>
        
        {sent ? (
          <div style={{ padding: "60px 40px", textAlign: "center" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: `linear-gradient(135deg, ${accent}, #00e5ff)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", margin: "0 auto 20px", boxShadow: `0 12px 32px ${accent}50` }}>
              <Check size={32} />
            </div>
            <h3 style={{ fontFamily: "Syne", fontSize: "22px", color: T.text, marginBottom: "8px" }}>Message Sent!</h3>
            <p style={{ color: T.muted, fontSize: "15px" }}>Thanks for helping us build FlowSpace. The product team will review this shortly.</p>
          </div>
        ) : (
          <div style={{ padding: "28px" }}>
            <div style={{ display: "flex", background: T.inp, borderRadius: "10px", padding: "4px", gap: "4px", marginBottom: "24px" }}>
              {[
                { id: "issue", label: "Report Bug 🐛" },
                { id: "feature", label: "Request Feature ✨" },
                { id: "feedback", label: "General Feedback 💡" }
              ].map(t => (
                <button key={t.id} onClick={() => setFeedbackTab(t.id)} style={{ flex: 1, background: feedbackTab === t.id ? T.card : "transparent", color: feedbackTab === t.id ? T.text : T.muted, border: "none", borderRadius: "8px", padding: "10px", fontSize: "13px", fontWeight: "600", cursor: "pointer", transition: "all .2s", boxShadow: feedbackTab === t.id ? "0 4px 12px rgba(0,0,0,0.1)" : "none" }}>
                  {t.label}
                </button>
              ))}
            </div>
            
            <textarea 
              placeholder={`Tell us what's on your mind...`}
              value={msg} onChange={e => setMsg(e.target.value)}
              style={{ ...inp(), height: "140px", resize: "none", marginBottom: "24px", padding: "16px", fontSize: "15px" }}
            />
            
            <button onClick={submitFeedback} style={{ ...btn(true), width: "100%", justifyContent: "center", padding: "16px", fontSize: "16px" }}>
              Send to HQ <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
