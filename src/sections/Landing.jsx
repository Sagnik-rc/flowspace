import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { Sparkles, Timer, Code2, Shield, ArrowRight, Zap, Target, BookOpen, Quote } from "lucide-react";
import { Footer } from "../components/Footer";

export default function Landing() {
  const { T, accent, bodyFont, setShowAuth } = useApp();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bentoStyle = {
    background: T.card,
    border: `1px solid ${T.border}`,
    borderRadius: "32px",
    padding: "36px",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    position: "relative",
    overflow: "hidden",
    boxShadow: `0 16px 40px rgba(0,0,0,0.06)`,
    transition: "transform 0.3s ease",
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", position: "relative", zIndex: 1, padding: "0", display: "flex", flexDirection: "column", minHeight: "100%", opacity: mounted ? 1 : 0, transition: "opacity .8s ease-in-out" }}>
      
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .interactive-bar { transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.2s; cursor: crosshair; }
        .interactive-bar:hover { transform: scaleY(1.05) translateY(-4px); filter: brightness(1.2); }
        .interactive-bar .tooltip { opacity: 0; transform: translateY(10px); transition: all 0.2s; }
        .interactive-bar:hover .tooltip { opacity: 1; transform: translateY(-8px); }
        
        .interactive-ring { transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.2s; cursor: crosshair; }
        .interactive-ring:hover { transform: scale(1.05); filter: drop-shadow(0 0 20px rgba(0,229,255,0.4)); }
        .interactive-ring .tooltip { opacity: 0; transform: translateY(10px); transition: all 0.2s; }
        .interactive-ring:hover .tooltip { opacity: 1; transform: translateY(-10px); }

        .interactive-line { transition: transform 0.3s ease; cursor: crosshair; }
        .interactive-line:hover { transform: translateY(-4px); }
        .interactive-line .tooltip { opacity: 0; transition: all 0.2s; }
        .interactive-line:hover .tooltip { opacity: 1; transform: translateY(-5px); }
      `}</style>
      
      {/* ── Fixed Clean Header for Landing ────────────────────────────── */}
      <header style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="/flowspace.svg" alt="FlowSpace logo" style={{ width: "38px", height: "38px", borderRadius: "10px", flexShrink: 0, background: `linear-gradient(135deg,${accent},#00e5ff)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 16px ${accent}60` }} />
          <span style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "22px", color: T.text }}>FlowSpace</span>
        </div>
        <button onClick={() => setShowAuth(true)} style={{ background: `${accent}15`, border: `1px solid ${accent}40`, color: T.text, borderRadius: "12px", padding: "10px 24px", fontSize: "14px", fontWeight: "600", fontFamily: bodyFont, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", backdropFilter: "blur(10px)", transition: "all .2s" }}>
          Log In <ArrowRight size={14}/>
        </button>
      </header>

      <div style={{ padding: "120px 40px 80px", display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        
        {/* ── Hero Section ────────────────────────────────────────────── */}
        <div style={{ textAlign: "center", maxWidth: "900px", marginBottom: "80px", transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "transform .8s ease-out" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "8px 16px", background: `${accent}12`, border: `1px solid ${accent}40`, borderRadius: "30px", color: accent, fontSize: "14px", fontWeight: "600", marginBottom: "28px" }}>
            <Sparkles size={16} /> Enter the next era of deep work
          </div>
          <h1 style={{ fontFamily: "Syne", fontSize: "clamp(56px, 8vw, 92px)", fontWeight: "800", color: T.text, lineHeight: "1.02", marginBottom: "26px", letterSpacing: "-2px" }}>
            Your flow state.<br/>
            <span style={{ background: `linear-gradient(135deg, ${accent}, #00e5ff)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Weaponized.</span>
          </h1>
          <p style={{ fontSize: "21px", color: T.muted, lineHeight: "1.6", fontFamily: bodyFont, maxWidth: "700px", margin: "0 auto 40px" }}>
            The ultimate productivity sanctuary for GenZ. Timers, aesthetic code editors, and encrypted vaults built directly into your workflow. 
          </p>
          <button onClick={() => setShowAuth(true)} style={{ background: `linear-gradient(135deg, ${accent}, #00e5ff)`, color: "#fff", border: "none", borderRadius: "100px", padding: "20px 48px", fontSize: "18px", fontWeight: "700", fontFamily: bodyFont, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "12px", boxShadow: `0 12px 36px ${accent}50`, transition: "all .2s ease" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 16px 46px ${accent}65`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 12px 36px ${accent}50`; }}
          >
            Start Cooking <Zap size={18} fill="#fff"/>
          </button>
        </div>

        {/* ── GenZ Bento Box Specs & Visuals ────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", width: "100%", marginBottom: "80px" }}>
          
          {/* Card 1: Features Box */}
          <div style={{ ...bentoStyle, gridColumn: "span 2", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
            <div style={{ position: "absolute", top: "-50%", right: "-20%", width: "400px", height: "400px", background: `radial-gradient(circle, ${accent}20 0%, transparent 60%)`, pointerEvents: "none" }}/>
            <h3 style={{ fontFamily: "Syne", fontSize: "32px", fontWeight: "800", color: T.text, marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}><Target color={accent}/> Built for hyper-efficiency</h3>
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginTop: "auto" }}>
              {[{l: "Smart Pomodoro", i: <Timer size={20} color="#ff6b6b"/>}, {l: "Clean Code", i: <Code2 size={20} color="#00e5ff"/>}, {l: "Locked Vaults", i: <Shield size={20} color="#00ff94"/>}].map((f, idx) => (
                <div key={idx} style={{ background: T.inp, border: `1px solid ${T.border}`, borderRadius: "16px", padding: "16px", display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: "160px" }}>
                  {f.i} <span style={{ color: T.text, fontWeight: "600", fontSize: "14px" }}>{f.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Student Efficiency Picture Placeholder */}
          <div style={{ ...bentoStyle, padding: 0, minHeight: "340px", display: "flex", flexDirection: "column" }}
               onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; }}
               onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
            <div style={{ padding: "24px 24px 0", flexShrink: 0 }}>
              <div style={{ color: T.text, fontFamily: "Syne", fontSize: "22px", fontWeight: "700" }}>Focus mode activated</div>
              <div style={{ color: T.muted, fontSize: "14px", marginTop: "4px" }}>Students in their natural habitat.</div>
            </div>
            <div style={{ flex: 1, padding: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* NOTE: Replace this src with your real pictures later */}
              <img src="/placeholder-student-1.jpg" alt="Student being efficient" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "16px", background: T.inp, border: `1px solid ${T.border}` }} 
                onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}/>
              <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${T.inp}, transparent)`, borderRadius: "16px", border: `2px dashed ${T.border}`, display: "none", alignItems: "center", justifyContent: "center", color: T.muted, flexDirection: "column", gap: "8px" }}>
                <BookOpen size={32} opacity={0.5}/>
                <span>Image Placeholder 1</span>
              </div>
            </div>
          </div>
          
        </div>

        {/* ── Stats & Data Visualization ──────────────────────────────── */}
        <div style={{ marginBottom: "100px", width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontFamily: "Syne", fontSize: "48px", fontWeight: "800", color: T.text }}>The Data Speaks.</h2>
            <p style={{ color: T.muted, fontSize: "18px" }}>FlowSpace users vs Non-users.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            
            {/* Bar Chart: Active Users vs Productivity */}
            <div style={{ ...bentoStyle, background: `linear-gradient(180deg, ${T.card}, transparent)` }}>
              <h4 style={{ color: T.text, fontSize: "18px", fontWeight: "700", marginBottom: "30px", fontFamily: "Syne" }}>Avg Weekly Focus Hours</h4>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "20px", height: "160px", paddingBottom: "10px", borderBottom: `2px solid ${T.border}` }}>
                {/* Non User Bar */}
                <div className="interactive-bar" style={{ flex: 1, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", height: "100%", justifyContent: "flex-end" }}>
                  <div className="tooltip" style={{ position: "absolute", top: "-30px", background: T.sidebar, color: T.text, fontSize: "12px", padding: "4px 8px", borderRadius: "6px", border: `1px solid ${T.border}`, boxShadow: "0 8px 16px rgba(0,0,0,0.1)", zIndex: 10, whiteSpace: "nowrap", pointerEvents: "none" }}>12 Hours/wk</div>
                  <div style={{ width: "100%", background: `${T.border}`, height: mounted ? "35%" : "0%", borderRadius: "8px 8px 0 0", transition: "height 1.2s ease" }}></div>
                  <span style={{ color: T.muted, fontSize: "12px", position: "absolute", bottom: "-30px", whiteSpace: "nowrap" }}>Non-User</span>
                </div>
                {/* FlowSpace User Bar */}
                <div className="interactive-bar" style={{ flex: 1, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", height: "100%", justifyContent: "flex-end" }}>
                  <div className="tooltip" style={{ position: "absolute", top: "-30px", background: `linear-gradient(135deg,${accent},#00e5ff)`, color: "#fff", fontSize: "12px", fontWeight: 700, padding: "4px 8px", borderRadius: "6px", boxShadow: `0 8px 16px ${accent}40`, zIndex: 10, whiteSpace: "nowrap", pointerEvents: "none" }}>32 Hours/wk 🔥</div>
                  <div style={{ width: "100%", background: `linear-gradient(to top, ${accent}, #00e5ff)`, height: mounted ? "90%" : "0%", borderRadius: "8px 8px 0 0", transition: "height 1.5s ease .2s", boxShadow: `0 0 20px ${accent}60` }}></div>
                  <span style={{ color: T.text, fontSize: "13px", fontWeight: "700", position: "absolute", bottom: "-30px", whiteSpace: "nowrap" }}>FlowSpace</span>
                </div>
              </div>
            </div>

            {/* Pie Chart / Progress Ring */}
            <div style={{ ...bentoStyle, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <h4 style={{ color: T.text, fontSize: "18px", fontWeight: "700", marginBottom: "20px", fontFamily: "Syne", width: "100%", alignSelf:"flex-start" }}>Task Completion Rate</h4>
              <div className="interactive-ring" style={{ position: "relative", width: "140px", height: "140px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="tooltip" style={{ position: "absolute", top: "-40px", background: `linear-gradient(135deg,${accent},#00e5ff)`, color: "#fff", fontSize: "12px", fontWeight: 700, padding: "4px 8px", borderRadius: "6px", boxShadow: `0 8px 16px ${accent}40`, zIndex: 10, whiteSpace: "nowrap", pointerEvents: "none" }}>Top 10% Efficiency</div>
                <svg width="140" height="140" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke={T.inp} strokeWidth="12" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="url(#pieGrad)" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset={mounted ? "40" : "251.2"} strokeLinecap="round" style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.2, 0.8, 0.2, 1) .4s" }}/>
                  <defs>
                    <linearGradient id="pieGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00ff94" />
                      <stop offset="100%" stopColor={accent} />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{ position: "absolute", fontFamily: "Syne", fontSize: "28px", fontWeight: "800", color: T.text }}>85%</div>
              </div>
              <p style={{ color: T.muted, fontSize: "13px", marginTop: "20px", textAlign: "center" }}>FlowSpace users finish 85% of their planned daily tasks on average.</p>
            </div>

            {/* Line Chart: Burnout Tracker */}
            <div style={{ ...bentoStyle }}>
              <h4 style={{ color: T.text, fontSize: "18px", fontWeight: "700", marginBottom: "20px", fontFamily: "Syne" }}>Burnout Trajectory</h4>
              <div className="interactive-line" style={{ position: "relative", height: "140px", width: "100%", marginTop: "20px" }}>
                <div className="tooltip" style={{ position: "absolute", top: "30px", left: "20%", background: T.text, color: T.bg, fontSize: "11px", fontWeight: 700, padding: "4px 8px", borderRadius: "4px", pointerEvents: "none", zIndex: 10 }}>Significant Dropout Curve</div>
                <div className="tooltip" style={{ position: "absolute", bottom: "30px", right: "20%", background: `linear-gradient(135deg,${accent},#00e5ff)`, color: "#fff", fontSize: "11px", fontWeight: 700, padding: "4px 8px", borderRadius: "4px", pointerEvents: "none", zIndex: 10 }}>Sustained Flow State</div>
                <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
                  {/* Non-user line */}
                  <path d="M 0 80 Q 25 70, 50 40 T 100 10" fill="transparent" stroke={T.muted} strokeWidth="3" strokeDasharray="6" opacity={0.6}/>
                  {/* FlowSpace line */}
                  <path d="M 0 80 Q 25 85, 50 75 T 100 80" fill="transparent" stroke="#00e5ff" strokeWidth="4" className={mounted ? "line-draw" : ""} strokeLinecap="round" style={{ strokeDasharray: 300, strokeDashoffset: mounted ? 0 : 300, transition: "stroke-dashoffset 2s ease 0.6s" }}/>
                </svg>
                <div style={{ position: "absolute", top: "5px", right: "0", color: T.muted, fontSize: "12px", background: T.bg, padding: "2px 6px", borderRadius: "4px" }}>Non-User</div>
                <div style={{ position: "absolute", bottom: "10px", right: "0", color: "#00e5ff", fontSize: "12px", fontWeight: "600", background: `${accent}20`, padding: "2px 6px", borderRadius: "4px" }}>FlowSpace</div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Additional Image Placeholders Array ───────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", width: "100%", marginBottom: "100px" }}>
          {[2, 3, 4].map(num => (
            <div key={num} style={{ background: T.inp, borderRadius: "24px", border: `1px solid ${T.border}`, padding: "8px", height: "240px", position: "relative", overflow: "hidden" }}>
               {/* Replace src with real images */}
               <img src={`/placeholder-student-${num}.jpg`} alt={`Student efficient ${num}`} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "18px", background: T.card }} 
                 onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}/>
               <div style={{ width: "100%", height: "100%", background: `linear-gradient(to bottom right, ${T.card}, transparent)`, borderRadius: "18px", border: `2px dashed ${T.border}`, display: "none", alignItems: "center", justifyContent: "center", color: T.muted, flexDirection: "column", gap: "10px" }}>
                 <Sparkles size={28} opacity={0.4}/>
                 <span style={{ fontSize: "13px", fontWeight: "600" }}>Image #{num}</span>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Hall of Love (Testimonials Marquee) - Breakout ────────────── */}
      <div style={{ width: "100%", position: "relative", marginBottom: "120px", overflow: "hidden", flexShrink: 0, padding: "20px 0" }}>
        <h2 style={{ fontFamily: "Syne", fontSize: "42px", fontWeight: "800", color: T.text, textAlign: "center", marginBottom: "40px" }}>Hall of Love 🤍</h2>
        
        <div style={{ display: "flex", width: "fit-content", animation: "marquee 40s linear infinite" }}>
          {[
            { text: "Literally carried me through finals week. The auto-locking vault for my study notes is genius.", author: "Sarah J.", role: "CS Student" },
            { text: "My screen time is down 40% and my grades are up. The minimalist focus timer changed Everything.", author: "Michael T.", role: "Med Student" },
            { text: "I can write code snippets effortlessly while tracking my pomodoro sessions. Unbelievably aesthetic.", author: "Elena R.", role: "Software Engineer" },
            { text: "The glassmorphism UI makes me actually Want to sit down and do my work. I'm addicted to flow state.", author: "David K.", role: "Designer" },
            { text: "Replaced 4 different apps (Pomodoro, Notion, Spotify, Calendar) into one beautiful dashboard.", author: "Mia L.", role: "Freelancer" },
            // Duplicate set for seamless looping
            { text: "Literally carried me through finals week. The auto-locking vault for my study notes is genius.", author: "Sarah J.", role: "CS Student" },
            { text: "My screen time is down 40% and my grades are up. The minimalist focus timer changed Everything.", author: "Michael T.", role: "Med Student" },
            { text: "I can write code snippets effortlessly while tracking my pomodoro sessions. Unbelievably aesthetic.", author: "Elena R.", role: "Software Engineer" },
            { text: "The glassmorphism UI makes me actually Want to sit down and do my work. I'm addicted to flow state.", author: "David K.", role: "Designer" },
            { text: "Replaced 4 different apps (Pomodoro, Notion, Spotify, Calendar) into one beautiful dashboard.", author: "Mia L.", role: "Freelancer" }
          ].map((t, i) => (
            <div key={i} style={{ ...bentoStyle, width: "350px", flexShrink: 0, margin: "0 12px", padding: "28px", backdropFilter: "blur(40px)" }}
                 onMouseEnter={e => e.currentTarget.parentElement.style.animationPlayState = 'paused'}
                 onMouseLeave={e => e.currentTarget.parentElement.style.animationPlayState = 'running'}>
              <Quote size={28} color={`${accent}40`} style={{ marginBottom: "16px" }}/>
              <p style={{ color: T.text, fontSize: "16px", lineHeight: "1.6", letterSpacing: "0.2px", marginBottom: "24px" }}>"{t.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "auto" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: `linear-gradient(135deg, ${accent}, #ff6b6b)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>👩‍💻</div>
                <div>
                  <div style={{ color: T.text, fontWeight: "700", fontSize: "14px" }}>{t.author}</div>
                  <div style={{ color: T.muted, fontSize: "12px" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Edge gradients to mask the marquee */}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "15%", background: `linear-gradient(to right, ${T.bg}, transparent)`, pointerEvents: "none" }}/>
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "15%", background: `linear-gradient(to left, ${T.bg}, transparent)`, pointerEvents: "none" }}/>
      </div>

      <div style={{ padding: "0 40px", display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        {/* ── Final CTA ─────────────────────────────────────────────── */}
        <div style={{ ...bentoStyle, background: `radial-gradient(ellipse at center, ${accent}20 0%, ${T.card} 100%)`, width: "100%", textAlign: "center", padding: "80px 40px", border: `1px solid ${accent}50` }}>
          <h2 style={{ fontFamily: "Syne", fontSize: "56px", fontWeight: "800", color: T.text, marginBottom: "20px", letterSpacing: "-1px" }}>Join the cool kids.</h2>
          <p style={{ color: T.muted, fontSize: "20px", marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px" }}>Stop fighting your attention span. Let FlowSpace handle the environment while you handle the work.</p>
          <button onClick={() => setShowAuth(true)} style={{ background: T.text, color: T.bg, border: "none", borderRadius: "100px", padding: "20px 56px", fontSize: "18px", fontWeight: "800", fontFamily: bodyFont, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "12px", transition: "all .2s ease", boxShadow: `0 8px 30px rgba(255,255,255,0.15)` }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 40px rgba(255,255,255,0.25)`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 8px 30px rgba(255,255,255,0.15)`; }}
          >
            Get In The Flow
          </button>
        </div>

      </div>

      {/* ── Global GenZ Footer ────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
