/* ─────────────────────────────────────────────────────────────────────────
   components/FloatingAI.jsx
───────────────────────────────────────────────────────────────────────── */
import { X, Send } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function FloatingAI() {
  const { T, accent, bodyFont, floatOpen, setFloatOpen, showGreet, setShowGreet,
          floatMsgs, floatIn, setFloatIn, floatBusy, floatEndRef, sendFloat } = useApp();

  return (
    <>
      {/* Greeting bubble */}
      {showGreet && !floatOpen && (
        <div style={{ position: "fixed", bottom: "92px", right: "26px", zIndex: 1000, background: T.card, border: `1px solid ${accent}55`, borderRadius: "16px 16px 4px 16px", padding: "12px 15px", maxWidth: "200px", boxShadow: `0 8px 36px ${accent}30`, backdropFilter: "blur(20px)", animation: "floatSlideIn .4s cubic-bezier(.34,1.56,.64,1)" }}>
          <button onClick={() => setShowGreet(false)} style={{ position: "absolute", top: "6px", right: "7px", background: "none", border: "none", cursor: "pointer", color: T.muted, padding: 0 }}><X size={11}/></button>
          <div style={{ fontSize: "18px", marginBottom: "4px" }}>👋</div>
          <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: "13px", color: T.text, marginBottom: "3px" }}>Hey! I'm FlowAI</div>
          <div style={{ color: T.muted, fontSize: "11px", lineHeight: 1.5 }}>Your AI study co-pilot!</div>
        </div>
      )}

      {/* Chat panel */}
      {floatOpen && (
        <div style={{ position: "fixed", bottom: "92px", right: "22px", zIndex: 1000, width: "340px", height: "490px", background: T.sidebar, border: `1px solid ${accent}40`, borderRadius: "21px", boxShadow: `0 24px 80px ${accent}25`, backdropFilter: "blur(32px)", display: "flex", flexDirection: "column", overflow: "hidden", animation: "floatPopUp .35s cubic-bezier(.34,1.56,.64,1)" }}>
          {/* Header */}
          <div style={{ padding: "13px 16px 11px", flexShrink: 0, background: `linear-gradient(135deg,${accent}20,transparent)`, borderBottom: `1px solid ${accent}25`, display: "flex", alignItems: "center", gap: "9px" }}>
            <div style={{ width: "31px", height: "31px", borderRadius: "50%", background: `linear-gradient(135deg,${accent},#00e5ff)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", flexShrink: 0 }}>🤖</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "13px", color: T.text }}>FlowAI</div>
              <div style={{ display: "flex", alignItems: "center", gap: "3px", marginTop: "1px" }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#00ff94" }}/>
                <span style={{ color: T.muted, fontSize: "10px" }}>Powered by Claude</span>
              </div>
            </div>
            <button onClick={() => setFloatOpen(false)} style={{ background: `${accent}18`, border: `1px solid ${accent}30`, borderRadius: "7px", cursor: "pointer", color: T.muted, padding: "4px", display: "flex" }}><X size={12}/></button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "12px 11px", display: "flex", flexDirection: "column", gap: "9px" }}>
            {floatMsgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: "5px", alignItems: "flex-end" }}>
                {m.role === "assistant" && <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: `${accent}25`, border: `1px solid ${accent}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", flexShrink: 0 }}>🤖</div>}
                <div style={{ maxWidth: "80%", padding: "8px 11px", borderRadius: m.role === "user" ? "13px 13px 3px 13px" : "13px 13px 13px 3px", background: m.role === "user" ? accent : T.card, color: m.role === "user" ? "#fff" : T.text, fontSize: "12px", lineHeight: 1.65, border: `1px solid ${m.role === "user" ? accent + "80" : T.border}`, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{m.content}</div>
              </div>
            ))}
            {floatBusy && (
              <div style={{ display: "flex", gap: "5px", alignItems: "flex-end" }}>
                <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: `${accent}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}>🤖</div>
                <div style={{ padding: "8px 12px", borderRadius: "13px 13px 13px 3px", background: T.card, border: `1px solid ${T.border}` }}>
                  <div style={{ display: "flex", gap: "4px" }}>{[0, 1, 2].map(i => <div key={i} style={{ width: "5px", height: "5px", borderRadius: "50%", background: accent, animation: "pulse 1.2s ease-in-out infinite", animationDelay: `${i * .15}s` }}/>)}</div>
                </div>
              </div>
            )}
            <div ref={floatEndRef}/>
          </div>

          {/* Quick chips (first open only) */}
          {floatMsgs.length === 1 && (
            <div style={{ padding: "0 11px 7px", display: "flex", gap: "5px", flexWrap: "wrap", flexShrink: 0 }}>
              {["Help me focus 🍅", "Write a note ✍️", "Debug code 💻", "Plan my day 📅"].map(s => (
                <button key={s} onClick={() => setFloatIn(s)} style={{ fontSize: "11px", padding: "4px 8px", borderRadius: "16px", border: `1px solid ${accent}40`, background: `${accent}12`, color: T.text, cursor: "pointer", fontFamily: bodyFont }}>{s}</button>
              ))}
            </div>
          )}

          {/* Input bar */}
          <div style={{ padding: "8px 11px", flexShrink: 0, borderTop: `1px solid ${T.border}`, display: "flex", gap: "6px", alignItems: "flex-end" }}>
            <textarea value={floatIn}
              onChange={e => { setFloatIn(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 80) + "px"; }}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendFloat(); } }}
              placeholder="Ask me anything... ✨" rows={1}
              style={{ flex: 1, background: T.inp, border: `1px solid ${T.border}`, borderRadius: "9px", padding: "7px 11px", color: T.text, fontSize: "12px", fontFamily: bodyFont, outline: "none", resize: "none", lineHeight: 1.5, maxHeight: "80px" }}/>
            <button onClick={sendFloat} disabled={floatBusy || !floatIn.trim()}
              style={{ width: "31px", height: "31px", borderRadius: "9px", background: floatBusy || !floatIn.trim() ? T.inp : accent, border: `1px solid ${floatBusy || !floatIn.trim() ? T.border : accent}`, cursor: floatBusy || !floatIn.trim() ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, opacity: floatBusy || !floatIn.trim() ? .4 : 1 }}>
              <Send size={12} color="#fff"/>
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button onClick={() => { setFloatOpen(v => !v); setShowGreet(false); }}
        style={{ position: "fixed", bottom: "58px", right: "24px", zIndex: 1001, width: "52px", height: "52px", borderRadius: "50%", background: floatOpen ? T.card : `linear-gradient(135deg,${accent},#00e5ff)`, border: `2px solid ${floatOpen ? T.border : accent}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "21px", boxShadow: floatOpen ? "none" : `0 0 24px ${accent}60,0 4px 16px rgba(0,0,0,.3)`, animation: !floatOpen ? "botPulse 3s ease-in-out infinite" : "none", transition: "all .3s cubic-bezier(.34,1.56,.64,1)" }}>
        {floatOpen ? <X size={19} color={T.text}/> : "🤖"}
      </button>
    </>
  );
}
