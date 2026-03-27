import { useApp } from "../context/AppContext";

export function Footer() {
  const { T, accent, user, setShowAuth, setShowSubscription, setSubTab, setFeedbackTab, setShowFeedback, setLegalTab, setShowLegal, setInfoTitle, setInfoOpen } = useApp();

  const handleLink = (action, title) => {
    if (action === "pricing") {
      if (!user) setShowAuth(true);
      else { setSubTab("plans"); setShowSubscription(true); }
      return;
    }
    if (action === "support") {
      window.open("https://buymeacoffee.com", "_blank");
      return;
    }
    // Generic placeholder pages
    if (action === "info") {
      if (!user) {
        setShowAuth(true);
      } else {
        setInfoTitle(title);
        setInfoOpen(true);
      }
      return;
    }
  };

  const linkStyle = { background: "transparent", border: "none", color: T.muted, textAlign: "left", fontSize: "14px", padding: 0, cursor: "pointer", transition: "color 0.2s" };

  return (
    <footer style={{ width: "100%", background: T.card, borderTop: `1px solid ${T.border}`, padding: "48px 40px", marginTop: "40px", position: "relative", zIndex: 10, flexShrink: 0 }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "40px", justifyContent: "space-between", alignItems: "flex-start" }}>
        
        {/* Brand Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "300px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img src="/flowspace.svg" alt="FlowSpace logo" style={{ width: "32px", height: "32px", borderRadius: "8px", flexShrink: 0, background: `linear-gradient(135deg,${accent},#00e5ff)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 12px ${accent}60` }} />
            <span style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "20px", color: T.text }}>FlowSpace</span>
          </div>
          <p style={{ color: T.muted, fontSize: "14px", lineHeight: "1.6" }}>The ultimate productivity sanctuary designed for students, developers, and creatives.</p>
          <button onClick={() => handleLink("support")} style={{ background: "linear-gradient(135deg, #FFDD00, #FBB034)", border: "none", borderRadius: "8px", padding: "10px 16px", color: "#000", fontWeight: 800, fontFamily: "Syne", fontSize: "13px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", width: "fit-content", boxShadow: "0 4px 14px rgba(255, 221, 0, 0.4)", transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
            ☕ Buy us a coffee
          </button>
        </div>

        {/* Links Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "40px", flex: 1, maxWidth: "700px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h4 style={{ color: T.text, fontFamily: "Syne", fontWeight: 700, fontSize: "15px", marginBottom: "8px" }}>🔥 Product</h4>
            <button onClick={() => handleLink("info", "Explore Features")} style={linkStyle} onMouseEnter={e => e.target.style.color = accent} onMouseLeave={e => e.target.style.color = T.muted}>Explore Features</button>
            <button onClick={() => handleLink("info", "Use Cases")} style={linkStyle} onMouseEnter={e => e.target.style.color = accent} onMouseLeave={e => e.target.style.color = T.muted}>Use Cases</button>
            {!user && <button onClick={() => handleLink("pricing")} style={linkStyle} onMouseEnter={e => e.target.style.color = accent} onMouseLeave={e => e.target.style.color = T.muted}>Pricing</button>}
            <button onClick={() => handleLink("info", "What’s New")} style={linkStyle} onMouseEnter={e => e.target.style.color = accent} onMouseLeave={e => e.target.style.color = T.muted}>What’s New</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h4 style={{ color: T.text, fontFamily: "Syne", fontWeight: 700, fontSize: "15px", marginBottom: "8px", display: "flex", alignItems: "center" }}><img src="/flowspace.svg" alt="FlowSpace logo" style={{ width: "16px", height: "16px", marginRight: "4px" }} /> FlowSpace</h4>
            <button onClick={() => handleLink("info", "About FlowSpace")} style={linkStyle} onMouseEnter={e => e.target.style.color = accent} onMouseLeave={e => e.target.style.color = T.muted}>About</button>
            <button onClick={() => handleLink("info", "Our Mission")} style={linkStyle} onMouseEnter={e => e.target.style.color = accent} onMouseLeave={e => e.target.style.color = T.muted}>Mission</button>
            <button onClick={() => handleLink("info", "Contact Us")} style={linkStyle} onMouseEnter={e => e.target.style.color = accent} onMouseLeave={e => e.target.style.color = T.muted}>Contact</button>
            <button onClick={() => handleLink("support")} style={linkStyle} onMouseEnter={e => e.target.style.color = accent} onMouseLeave={e => e.target.style.color = T.muted}>Support Us ☕</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h4 style={{ color: T.text, fontFamily: "Syne", fontWeight: 700, fontSize: "15px", marginBottom: "8px" }}>🛠️ Resources</h4>
            <button onClick={() => handleLink("info", "Help Center")} style={linkStyle} onMouseEnter={e => e.target.style.color = accent} onMouseLeave={e => e.target.style.color = T.muted}>Help Center</button>
            <button onClick={() => handleLink("info", "Productivity Tips")} style={linkStyle} onMouseEnter={e => e.target.style.color = accent} onMouseLeave={e => e.target.style.color = T.muted}>Productivity Tips</button>
            <button onClick={() => handleLink("info", "FlowSpace Blog")} style={linkStyle} onMouseEnter={e => e.target.style.color = accent} onMouseLeave={e => e.target.style.color = T.muted}>Blog</button>
            <button onClick={() => { setFeedbackTab("issue"); setShowFeedback(true); }} style={linkStyle} onMouseEnter={e => e.target.style.color = accent} onMouseLeave={e => e.target.style.color = T.muted}>Report Issue</button>
            <button onClick={() => { setFeedbackTab("feature"); setShowFeedback(true); }} style={linkStyle} onMouseEnter={e => e.target.style.color = accent} onMouseLeave={e => e.target.style.color = T.muted}>Request Feature</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h4 style={{ color: T.text, fontFamily: "Syne", fontWeight: 700, fontSize: "15px", marginBottom: "8px" }}>⚖️ Legal</h4>
            <button onClick={() => { setLegalTab("privacy"); setShowLegal(true); }} style={linkStyle} onMouseEnter={e => e.target.style.color = accent} onMouseLeave={e => e.target.style.color = T.muted}>Privacy Policy</button>
            <button onClick={() => { setLegalTab("terms"); setShowLegal(true); }} style={linkStyle} onMouseEnter={e => e.target.style.color = accent} onMouseLeave={e => e.target.style.color = T.muted}>Terms of Service</button>
          </div>
        </div>

      </div>

      {/* Bottom Socials Bar */}
      <div style={{ maxWidth: "1200px", margin: "48px auto 0", paddingTop: "24px", borderTop: `1px solid ${T.border}`, display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ color: T.muted, fontSize: "13px" }}>© {new Date().getFullYear()} FlowSpace Inc. All rights reserved. • v1.0.0</div>
        
        <div style={{ display: "flex", gap: "12px" }}>
          {/* X / Twitter */}
          <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ width: "36px", height: "36px", borderRadius: "10px", background: T.inp, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }} onMouseEnter={e => { e.currentTarget.style.background = `${T.border}`; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.background = T.inp; e.currentTarget.style.transform = "translateY(0)"; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill={T.text}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          {/* Instagram */}
          <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ width: "36px", height: "36px", borderRadius: "10px", background: T.inp, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }} onMouseEnter={e => { e.currentTarget.style.background = `#E1306C20`; e.currentTarget.style.borderColor = `#E1306C60`; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.background = T.inp; e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          {/* Facebook */}
          <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ width: "36px", height: "36px", borderRadius: "10px", background: T.inp, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }} onMouseEnter={e => { e.currentTarget.style.background = `#1877F220`; e.currentTarget.style.borderColor = `#1877F260`; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.background = T.inp; e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
