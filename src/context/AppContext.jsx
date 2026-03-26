/* ─────────────────────────────────────────────────────────────────────────
   context/AppContext.jsx
   Single source of truth for ALL FlowSpace state and logic.
   Every section/modal imports  useApp()  from here — zero prop drilling.
───────────────────────────────────────────────────────────────────────── */
import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { POM_FORMATS, LANGS, FREE_LIMITS, RAZORPAY_KEY, GEMINI_API_KEY, AUTO_LOCK_OPTIONS, getStarter } from "../constants";

const AppContext = createContext(null);

export function AppProvider({ children }) {

  /* ── AUTH ──────────────────────────────────────────────────────────── */
  const [user, setUser]           = useState(null);
  const [showAuth, setShowAuth]   = useState(false);
  const [authTab, setAuthTab]     = useState("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPass, setAuthPass]   = useState("");
  const [authName, setAuthName]   = useState("");
  const [authErr, setAuthErr]     = useState("");
  const [authBusy, setAuthBusy]   = useState(false);
  const [pendingCb, setPendingCb] = useState(null);
  const [authDone, setAuthDone]   = useState(false);

  // Auto-login popup removed to let users manually decide when to sign in.

  const requireAuth = cb => { if (user) cb(); else { setPendingCb(() => cb); setShowAuth(true); } };
  const doLogin = u => {
    setUser(u); setShowAuth(false); setAuthBusy(false); setAuthDone(true);
    if (pendingCb) { pendingCb(); setPendingCb(null); }
  };
  const handleEmailAuth = () => {
    setAuthErr("");
    if (!authEmail || !authPass) return setAuthErr("Please fill all fields 👀");
    if (authTab === "signup" && !authName) return setAuthErr("Enter your name ✍️");
    setAuthBusy(true);
    setTimeout(() => doLogin({ name: authName || authEmail.split("@")[0], email: authEmail, provider: "email" }), 900);
  };
  const handleSocial = p => {
    setAuthBusy(true);
    const names = { google: "Alex Flow", github: "dev_user" };
    const emails = { google: "alex@gmail.com", github: "dev@github.com" };
    setTimeout(() => doLogin({ name: names[p], email: emails[p], provider: p }), 900);
  };
  const logout = () => { setUser(null); setAuthDone(false); setSpotConnected(false); setCalConnected(false); };

  /* ── SUBSCRIPTION ──────────────────────────────────────────────────── */
  const [isPro, setIsPro]                       = useState(false);
  const [subPlan, setSubPlan]                   = useState(null);
  const [showSubscription, setShowSubscription] = useState(false);
  const [subTab, setSubTab]                     = useState("plans");
  const [subLoading, setSubLoading]             = useState(false);

  const loadRazorpay = () => new Promise(resolve => {
    if (window.Razorpay) { resolve(true); return; }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true); s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

  const startRazorpay = async (plan) => {
    if (!user) { setShowAuth(true); return; }
    setSubLoading(true);
    const loaded = await loadRazorpay();
    setSubLoading(false);
    if (!loaded) { alert("Payment SDK failed to load."); return; }
    const options = {
      key: RAZORPAY_KEY,
      amount: plan === "monthly" ? 19900 : 199900,
      currency: "INR",
      name: "FlowSpace",
      description: `FlowSpace Pro — ${plan === "monthly" ? "Monthly" : "Annual"}`,
      handler: () => { setIsPro(true); setSubPlan(plan); setShowSubscription(false); },
      prefill: { name: user?.name || "", email: user?.email || "" },
      theme: { color: "#7c5cfc" },
    };
    try { new window.Razorpay(options).open(); }
    catch (e) { alert("Add your Razorpay key to constants/index.js (RAZORPAY_KEY)."); }
  };

  const cancelSub = () => { setIsPro(false); setSubPlan(null); };
  const checkLimit = (type, count) => isPro || count < FREE_LIMITS[type];

  /* ── THEME ─────────────────────────────────────────────────────────── */
  const [mode, setMode]         = useState("dark");
  const [accent, setAccent]     = useState("#7c5cfc");
  const [bodyFont, setBodyFont] = useState("Outfit");
  const [fontSize, setFontSize] = useState(15);
  const [bgImage, setBgImage]   = useState(null);
  const dark = mode === "dark";
  const T = {
    bg:      dark ? "#05050e"                     : "#f4f1ff",
    card:    dark ? "rgba(255,255,255,0.05)"       : "rgba(0,0,0,0.04)",
    border:  dark ? "rgba(255,255,255,0.09)"       : "rgba(0,0,0,0.1)",
    text:    dark ? "#eef2ff"                      : "#150a30",
    muted:   dark ? "rgba(238,242,255,0.42)"       : "rgba(21,10,48,0.46)",
    sidebar: dark ? "rgba(8,5,22,0.97)"            : "rgba(248,245,255,0.98)",
    inp:     dark ? "rgba(255,255,255,0.06)"       : "rgba(0,0,0,0.055)",
    codeBg:  dark ? "#0d0d1a"                      : "#f8f8ff",
    codeG:   dark ? "rgba(0,0,0,0.3)"             : "rgba(0,0,0,0.06)",
  };

  /* ── STYLE HELPERS (depend on theme — live here, not in utils) ─────── */
  const glass     = (ex = {}) => ({ background: T.card, border: `1px solid ${T.border}`, borderRadius: "28px", padding: "28px", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", boxShadow: `0 16px 40px rgba(0,0,0,0.06)`, transition: "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease", ...ex });
  const glowGlass = (color = accent, ex = {}) => ({ ...glass(), border: `1px solid ${color}35`, background: dark ? `${color}12` : `${color}08`, boxShadow: `0 20px 50px ${color}25`, ...ex });
  const inp       = (ex = {}) => ({ background: T.inp, border: `1px solid ${T.border}`, borderRadius: "16px", padding: "14px 20px", color: T.text, fontSize: `${fontSize}px`, fontFamily: bodyFont, outline: "none", width: "100%", boxSizing: "border-box", transition: "all 0.2s ease", ...ex });
  const btn       = (primary = false, color = accent, ex = {}) => ({ background: primary ? `linear-gradient(135deg, ${color}, #00e5ff)` : T.card, color: primary ? "#fff" : T.text, border: primary ? "none" : `1px solid ${T.border}`, borderRadius: "100px", padding: "14px 28px", cursor: "pointer", fontSize: "15px", fontFamily: bodyFont, fontWeight: primary ? 700 : 500, transition: "all 0.25s ease", display: "flex", alignItems: "center", gap: "10px", whiteSpace: "nowrap", boxSizing: "border-box", boxShadow: primary ? `0 12px 32px ${color}45` : "none", ...ex });

  /* ── NAVIGATION ────────────────────────────────────────────────────── */
  const [sec, setSec]           = useState("dashboard");
  const [sideOpen, setSideOpen] = useState(false);
  const sideTimer = useRef(null);
  const onSideEnter = () => { clearTimeout(sideTimer.current); setSideOpen(true); };
  const onSideLeave = () => { sideTimer.current = setTimeout(() => setSideOpen(false), 300); };

  /* ── CLOCK ─────────────────────────────────────────────────────────── */
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);
  const fmtDate   = d => d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const fmtSecs   = s => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
  
  const getDynamicGreeting = () => {
    const hr = now.getHours();
    if (hr >= 6 && hr < 12) return ["🌅", "Morning"];
    if (hr >= 12 && hr < 17) return ["🌤️", "Afternoon"];
    if (hr >= 17 && hr < 22) return ["🌙", "Evening"];
    return ["🌃", "Night"];
  };
  const greeting = getDynamicGreeting();

  /* ── ACTIVITY LOG ──────────────────────────────────────────────────── */
  const [activityLog, setActivityLog] = useState([]);
  const addActivity = (icon, label, detail, section) =>
    setActivityLog(log => [{ id: Date.now(), icon, label, detail, time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }), section }, ...log.slice(0, 19)]);

  /* ── NOTES ─────────────────────────────────────────────────────────── */
  const [notes, setNotes]           = useState([{ id: 1, title: "🌊 Welcome to FlowSpace", blocks: [{ id: 1, type: "text", content: "Your productivity hub. Hover the left edge for the sidebar.\n\nLet's get into the flow 🌊" }], date: new Date().toLocaleDateString() }]);
  const [activeNote, setActiveNote] = useState(null);
  const [nTitle, setNTitle]         = useState("");
  const [nBlocks, setNBlocks]       = useState([]);
  const [nSaved, setNSaved]         = useState(false);

  const openNote    = n => { setActiveNote(n.id); setNTitle(n.title); setNBlocks(n.blocks || []); setNSaved(false); };
  const saveNote    = () => {
    setNotes(ns => ns.map(n => n.id === activeNote ? { ...n, title: nTitle, blocks: nBlocks, date: new Date().toLocaleDateString() } : n));
    setNSaved(true); setTimeout(() => setNSaved(false), 2000);
    addActivity("📝", "Note saved", nTitle || "Untitled", "notes");
  };
  const newNote     = () => {
    if (!checkLimit("notes", notes.length)) { setShowSubscription(true); setSubTab("plans"); return; }
    const n = { id: Date.now(), title: "Untitled Note", blocks: [{ id: Date.now(), type: "text", content: "" }], date: new Date().toLocaleDateString() };
    setNotes(ns => [...ns, n]); openNote(n);
  };
  const delNote     = id => { setNotes(ns => ns.filter(n => n.id !== id)); if (activeNote === id) setActiveNote(null); };
  const addBlock    = type => setNBlocks(bs => [...bs, { id: Date.now(), type, content: "", checked: false, src: null }]);
  const updateBlock = (id, patch) => setNBlocks(bs => bs.map(b => b.id === id ? { ...b, ...patch } : b));
  const delBlock    = id => setNBlocks(bs => bs.filter(b => b.id !== id));
  const handleNoteImage = (e, blockId) => { const f = e.target.files?.[0]; if (!f) return; const r = new FileReader(); r.onload = ev => updateBlock(blockId, { src: ev.target.result, content: f.name }); r.readAsDataURL(f); };
  const handleNoteFile  = (e, blockId) => { const f = e.target.files?.[0]; if (!f) return; updateBlock(blockId, { content: f.name, fileSize: `${(f.size / 1024).toFixed(1)} KB`, fileType: f.type }); };

  /* ── POMODORO ──────────────────────────────────────────────────────── */
  const [pomFmtId, setPomFmtId]           = useState("classic");
  const [desired, setDesired]             = useState(4);
  const [cWork, setCWork]                 = useState(25);
  const [cBrk, setCBrk]                   = useState(5);
  const [cLong, setCLong]                 = useState(15);
  const [cLongAfter, setCLongAfter]       = useState(4);
  const [pomPhase, setPomPhase]           = useState("work");
  const [pomTime, setPomTime]             = useState(25 * 60);
  const [pomRunning, setPomRunning]       = useState(false);
  const [pomSessions, setPomSessions]     = useState(0);
  const [pomPopup, setPomPopup]           = useState(false);
  const [showDone, setShowDone]           = useState(false);
  const [flowtimeEl, setFlowtimeEl]       = useState(0);
  const [flowtimeRun, setFlowtimeRun]     = useState(false);
  const [tasks, setTasks]                 = useState([]);
  const [newTask, setNewTask]             = useState("");
  const [showTasksPopup, setShowTasksPopup] = useState(true);
  const [pomHistory, setPomHistory]       = useState([]);
  const [showSessionEnd, setShowSessionEnd] = useState(false);
  const pomPhaseRef = useRef("work");
  const pomSessRef  = useRef(0);
  const pomIv = useRef(null);
  const ftIv  = useRef(null);

  const getPomFmt  = useCallback(() => {
    if (pomFmtId === "custom") return { work: cWork, brk: cBrk, longBrk: cLong, longAfter: cLongAfter };
    return POM_FORMATS.find(f => f.id === pomFmtId) || POM_FORMATS[0];
  }, [pomFmtId, cWork, cBrk, cLong, cLongAfter]);
  const getWorkS   = () => (getPomFmt().work    || cWork)       * 60;
  const getBrkS    = () => (getPomFmt().brk     || cBrk)        * 60;
  const getLongS   = () => (getPomFmt().longBrk || cLong)       * 60;

  const playChime = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [[523, 0], [659, 0.18], [784, 0.36], [1047, 0.54]].forEach(([f, w]) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination); o.type = "sine"; o.frequency.value = f;
        g.gain.setValueAtTime(0.28, ctx.currentTime + w);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + w + 0.9);
        o.start(ctx.currentTime + w); o.stop(ctx.currentTime + w + 1);
      });
    } catch (e) { }
  }, []);

  useEffect(() => { pomPhaseRef.current = pomPhase; }, [pomPhase]);
  useEffect(() => {
    if (pomFmtId !== "flowtime") { const s = pomPhase === "work" ? getWorkS() : pomPhase === "break" ? getBrkS() : getLongS(); setPomTime(s); }
    // eslint-disable-next-line
  }, [pomFmtId, pomPhase, cWork, cBrk, cLong]);
  useEffect(() => {
    if (!pomRunning) { clearInterval(pomIv.current); return; }
    pomIv.current = setInterval(() => setPomTime(t => { if (t <= 1) { clearInterval(pomIv.current); setPomRunning(false); return 0; } return t - 1; }), 1000);
    return () => clearInterval(pomIv.current);
  }, [pomRunning]);
  useEffect(() => {
    if (flowtimeRun) ftIv.current = setInterval(() => setFlowtimeEl(e => e + 1), 1000);
    else clearInterval(ftIv.current);
    return () => clearInterval(ftIv.current);
  }, [flowtimeRun]);
  useEffect(() => {
    if (pomTime !== 0 || pomRunning || pomFmtId === "flowtime") return;
    playChime(); setShowDone(true); setTimeout(() => setShowDone(false), 2200);
    if (pomPhaseRef.current === "work") {
      const nx = pomSessRef.current + 1; pomSessRef.current = nx; setPomSessions(nx);
      const la = getPomFmt().longAfter || cLongAfter;
      const nm = nx % la === 0 ? "longBreak" : "break"; pomPhaseRef.current = nm; setPomPhase(nm);
      if (nx >= desired) {
        const fmt = POM_FORMATS.find(f => f.id === pomFmtId) || { name: "Custom", emoji: "🍅" };
        const entry = { id: Date.now(), fmt: fmt.name, fmtEmoji: fmt.emoji || "🍅", sessions: nx, tasks: [...tasks], endTime: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }), endDate: new Date().toLocaleDateString() };
        setPomHistory(h => [entry, ...h.slice(0, 19)]);
        addActivity("🍅", "Pomodoro complete", `${nx} session${nx > 1 ? "s" : ""} · ${fmt.name}`, "focus");
        setTimeout(() => setShowSessionEnd(true), 600);
      }
    } else { pomPhaseRef.current = "work"; setPomPhase("work"); }
    // eslint-disable-next-line
  }, [pomTime, pomRunning]);

  const startPom  = () => { setPomPopup(true); setPomRunning(true); if (pomFmtId === "flowtime") setFlowtimeRun(true); };
  const pausePom  = () => { setPomRunning(false); setFlowtimeRun(false); };
  const resetPom  = () => { clearInterval(pomIv.current); clearInterval(ftIv.current); setPomRunning(false); setFlowtimeRun(false); setFlowtimeEl(0); setPomPhase("work"); pomPhaseRef.current = "work"; setPomSessions(0); pomSessRef.current = 0; setPomTime(getWorkS()); setShowSessionEnd(false); setPomPopup(false); };
  const skipPhase = () => { clearInterval(pomIv.current); setPomRunning(false); if (pomPhaseRef.current === "work") { const nx = pomSessRef.current + 1; pomSessRef.current = nx; setPomSessions(nx); const la = getPomFmt().longAfter || cLongAfter; const nm = nx % la === 0 ? "longBreak" : "break"; pomPhaseRef.current = nm; setPomPhase(nm); } else { pomPhaseRef.current = "work"; setPomPhase("work"); } };
  const pomPct = () => {
    if (pomTime === null) return 0;
    if (pomPhase === "work")       return ((getWorkS() - pomTime) / getWorkS()) * 100;
    if (pomPhase === "break")      return ((getBrkS()  - pomTime) / getBrkS())  * 100;
    return ((getLongS() - pomTime) / getLongS()) * 100;
  };
  const phaseColor = { work: accent, break: "#00ff94", longBreak: "#00e5ff" };

  /* ── CODE EDITOR ───────────────────────────────────────────────────── */
  const [tabs, setTabs]           = useState([{ id: 1, name: "main.js", code: getStarter("javascript"), lang: "javascript", folderId: null }]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [folders, setFolders]     = useState([{ id: 1, name: "My Project" }]);
  const [newFolderName, setNewFolderName] = useState("");
  const [runOutput, setRunOutput] = useState("");
  const [runError, setRunError]   = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [runKey, setRunKey]       = useState(0);
  const [iframeLog, setIframeLog] = useState([]);
  const [renamingTab, setRenamingTab] = useState(null);
  const [renameVal, setRenameVal] = useState("");
  const [expandedFolders, setExpandedFolders] = useState({ 1: true });
  const [copied, setCopied]       = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const langMenuRef = useRef(null);
  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  useEffect(() => {
    const handler = e => { if (langMenuRef.current && !langMenuRef.current.contains(e.target)) setShowLangMenu(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const addTab = (folderId = null) => {
    if (!checkLimit("tabs", tabs.length)) { setShowSubscription(true); setSubTab("plans"); return; }
    const id = Date.now(); setTabs(ts => [...ts, { id, name: `file${ts.length + 1}.js`, code: getStarter("javascript"), lang: "javascript", folderId }]); setActiveTabId(id);
  };
  const updateTab = (id, patch) => setTabs(ts => ts.map(t => t.id === id ? { ...t, ...patch } : t));
  const closeTab  = id => {
    if (tabs.length === 1) return;
    const idx = tabs.findIndex(t => t.id === id);
    const remaining = tabs.filter(t => t.id !== id);
    setTabs(remaining); setActiveTabId(remaining[Math.max(0, idx - 1)].id);
  };
  const changeLang = lang => {
    const ext = LANGS.find(l => l.id === lang)?.ext || "txt";
    const base = activeTab.name.replace(/\.[^.]+$/, "");
    updateTab(activeTabId, { lang, name: `${base}.${ext}`, code: getStarter(lang) });
    setShowLangMenu(false);
  };
  const handleCodeKey = e => {
    if (e.key === "Tab") { e.preventDefault(); const s = e.target.selectionStart, en = e.target.selectionEnd; const v = activeTab.code.slice(0, s) + "  " + activeTab.code.slice(en); updateTab(activeTabId, { code: v }); requestAnimationFrame(() => { e.target.selectionStart = e.target.selectionEnd = s + 2; }); }
  };

  const getSrcDoc = useCallback(tab => {
    if (!tab) return "";
    const { code, lang } = tab;
    if (lang === "html") return code;
    if (lang === "css") return ['<!DOCTYPE html><html><head>', '<style>body{font-family:system-ui,sans-serif;padding:28px;margin:0;}h1{font-size:28px;}p{line-height:1.6;}button{padding:8px 16px;border-radius:6px;border:1px solid #ccc;cursor:pointer;margin:4px;}ul{padding-left:20px;}</style>', '<style>' + code + '</style></head>', '<body><h1>Heading 1</h1><p>Sample paragraph text.</p><button>Button</button><ul><li>Item one</li><li>Item two</li></ul></body></html>'].join('');
    if (lang === "javascript") {
      const safeCode = JSON.stringify(code);
      const cs = '<' + '/script>';
      return '<!DOCTYPE html><html><body><script>(function(){var _f=function(){return Array.prototype.slice.call(arguments).map(function(x){if(x===null)return"null";if(x===undefined)return"undefined";if(typeof x==="object"){try{return JSON.stringify(x,null,2);}catch(e){return String(x);}}return String(x);}).join(" ");};window.console={log:function(){parent.postMessage({t:"log",d:_f.apply(null,arguments)},"*");},error:function(){parent.postMessage({t:"err",d:_f.apply(null,arguments)},"*");},warn:function(){parent.postMessage({t:"warn",d:_f.apply(null,arguments)},"*");},info:function(){parent.postMessage({t:"info",d:_f.apply(null,arguments)},"*");},clear:function(){parent.postMessage({t:"clear"},"*");}};window.onerror=function(m,s,l,c,e){parent.postMessage({t:"err",d:e?e.stack:m},"*");return true;};window.addEventListener("unhandledrejection",function(e){parent.postMessage({t:"err",d:"Unhandled Promise: "+(e.reason&&e.reason.stack||String(e.reason))},"*");});})();' + cs + '<script>try{eval(' + safeCode + ');}catch(e){parent.postMessage({t:"err",d:e.stack||e.toString()},"*");}parent.postMessage({t:"done"},"*");' + cs + '</body></html>';
    }
    return null;
  }, []);

  useEffect(() => {
    const h = e => {
      if (!e.data || typeof e.data.t !== "string") return;
      const { t, d } = e.data;
      if (t === "clear") { setIframeLog([]); return; }
      if (t === "done") return;
      const p = t === "err" ? "❌ " : t === "warn" ? "⚠️  " : t === "info" ? "ℹ️  " : "";
      setIframeLog(prev => [...prev, { text: p + (d || ""), isErr: t === "err" }]);
    };
    window.addEventListener("message", h);
    return () => window.removeEventListener("message", h);
  }, []);

  const runCode = useCallback(() => {
    const tab = tabs.find(t => t.id === activeTabId) || tabs[0];
    if (!tab) return;
    const { lang } = tab;
    const label = LANGS.find(l => l.id === lang)?.label || lang;
    const runnable = ["javascript", "html", "css"].includes(lang);
    setIframeLog([]); setRunError(""); setRunOutput(""); setShowOutput(true);
    if (runnable) { setRunOutput("__IFRAME__"); setRunKey(k => k + 1); addActivity("💻", "Code executed", `${label} · ${tab.name}`, "code"); }
    else setRunError(`${label} runs server-side.\n\nRun locally:\n` + (lang === "python" ? "  python3 file.py" : lang === "c" ? "  gcc main.c -o main && ./main" : lang === "cpp" ? "  g++ main.cpp -o main && ./main" : lang === "java" ? "  javac Main.java && java Main" : lang === "rust" ? "  rustc main.rs && ./main" : lang === "go" ? "  go run main.go" : lang === "bash" ? "  bash script.sh" : lang === "typescript" ? "  npx ts-node file.ts" : "  Use the appropriate runtime."));
  }, [tabs, activeTabId]);

  const downloadFile = () => { const { code, name } = activeTab; const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([code], { type: "text/plain" })); a.download = name; a.click(); };
  const downloadAll  = () => { tabs.forEach(tab => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([tab.code], { type: "text/plain" })); a.download = tab.name; a.click(); }); };
  const copyCode     = () => { navigator.clipboard?.writeText(activeTab?.code); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  /* ── FILES ─────────────────────────────────────────────────────────── */
  const [files, setFiles]     = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const fileDropRef = useRef(null);
  const bgRef       = useRef(null);
  const handleBgUpload = e => { const f = e.target.files?.[0]; if (!f) return; const r = new FileReader(); r.onload = ev => setBgImage(ev.target.result); r.readAsDataURL(f); };
  const fileEmoji = t => t.includes("image") ? "🖼️" : t.includes("pdf") ? "📄" : t.includes("video") ? "🎬" : t.includes("audio") ? "🎵" : t.includes("text") ? "📝" : "📁";
  const addFiles = list => {
    const incoming = Array.from(list);
    if (!isPro && files.length + incoming.length > FREE_LIMITS.files) { setShowSubscription(true); setSubTab("plans"); return; }
    setFiles(fs => [...fs, ...incoming.map(f => ({ id: Date.now() + Math.random(), name: f.name, size: f.size > 1048576 ? (f.size / 1048576).toFixed(1) + " MB" : (f.size / 1024).toFixed(1) + " KB", type: f.type, date: new Date().toLocaleDateString(), emoji: fileEmoji(f.type), src: null }))]);
    if (incoming.length > 0) addActivity("📂", "File uploaded", incoming.length > 1 ? `${incoming.length} files` : incoming[0].name, "files");
  };

  /* ── VAULT ─────────────────────────────────────────────────────────── */
  const [vLocked, setVLocked]           = useState(true);
  const [vPin, setVPin]                 = useState("1234");
  const [pinIn, setPinIn]               = useState("");
  const [showPinInput, setShowPinInput] = useState(false);
  const [pinErr, setPinErr]             = useState("");
  const [vNotes, setVNotes]             = useState([]);
  const [vActive, setVActive]           = useState(null);
  const [vT, setVT]                     = useState("");
  const [vBlocks, setVBlocks]           = useState([]);
  const [vSaved, setVSaved]             = useState(false);
  const [showPinChange, setShowPinChange] = useState(false);
  const [newPin, setNewPin]             = useState("");
  const [confirmPin, setConfirmPin]     = useState("");
  const [pinChangeErr, setPinChangeErr] = useState("");
  const [autoLockSecs, setAutoLockSecs] = useState(0);
  const [autoLockDropdown, setAutoLockDropdown] = useState(false);
  const vaultLockTimer = useRef(null);
  const lastActivity   = useRef(Date.now());

  useEffect(() => {
    clearInterval(vaultLockTimer.current);
    if (!vLocked && autoLockSecs > 0) {
      vaultLockTimer.current = setInterval(() => {
        if (Date.now() - lastActivity.current >= autoLockSecs * 1000) { setVLocked(true); setVActive(null); clearInterval(vaultLockTimer.current); }
      }, 5000);
    }
    return () => clearInterval(vaultLockTimer.current);
  }, [vLocked, autoLockSecs]);

  useEffect(() => {
    if (sec !== "vault" && !vLocked) { setVLocked(true); setVActive(null); clearInterval(vaultLockTimer.current); }
    // eslint-disable-next-line
  }, [sec]);

  const vaultActivity = () => { lastActivity.current = Date.now(); };
  const tryUnlock     = () => { if (pinIn === vPin) { setVLocked(false); setPinIn(""); setPinErr(""); lastActivity.current = Date.now(); } else { setPinErr("Wrong PIN! 🚫"); setPinIn(""); } };
  const changePin     = () => { setPinChangeErr(""); if (!newPin) return setPinChangeErr("Enter new PIN"); if (newPin !== confirmPin) return setPinChangeErr("PINs don't match"); setVPin(newPin); setNewPin(""); setConfirmPin(""); setShowPinChange(false); setPinChangeErr(""); };
  const openVNote     = n => { setVActive(n.id); setVT(n.title); setVBlocks(n.blocks || []); vaultActivity(); };
  const newVNote      = () => { const n = { id: Date.now(), title: "🔒 Secret", blocks: [{ id: Date.now(), type: "text", content: "" }] }; setVNotes(ns => [...ns, n]); openVNote(n); };
  const saveVNote     = () => { setVNotes(ns => ns.map(n => n.id === vActive ? { ...n, title: vT, blocks: vBlocks } : n)); setVSaved(true); setTimeout(() => setVSaved(false), 2000); vaultActivity(); addActivity("🔐", "Vault saved", vT || "Secret", "vault"); };
  const addVBlock     = type => { setVBlocks(bs => [...bs, { id: Date.now(), type, content: "", src: null }]); vaultActivity(); };
  const updateVBlock  = (id, patch) => { setVBlocks(bs => bs.map(b => b.id === id ? { ...b, ...patch } : b)); vaultActivity(); };
  const delVBlock     = id => { setVBlocks(bs => bs.filter(b => b.id !== id)); vaultActivity(); };
  const handleVImage  = (e, blockId) => { const f = e.target.files?.[0]; if (!f) return; const r = new FileReader(); r.onload = ev => updateVBlock(blockId, { src: ev.target.result, content: f.name }); r.readAsDataURL(f); vaultActivity(); };
  const handleVFile   = (e, blockId) => { const f = e.target.files?.[0]; if (!f) return; updateVBlock(blockId, { content: f.name, fileSize: `${(f.size / 1024).toFixed(1)} KB` }); vaultActivity(); };

  /* ── SPOTIFY ───────────────────────────────────────────────────────── */
  const [spotOpen, setSpotOpen]           = useState(false);
  const [spotConnected, setSpotConnected] = useState(false);
  const [spotUrl, setSpotUrl]             = useState("");
  const [spotEmbed, setSpotEmbed]         = useState("");
  const connectSpotify = () => requireAuth(() => setSpotConnected(true));
  const loadSpot = () => { if (!spotUrl.trim()) return; setSpotEmbed(spotUrl.trim().replace("open.spotify.com/", "open.spotify.com/embed/").split("?")[0]); };

  /* ── CALENDAR ──────────────────────────────────────────────────────── */
  const [calOpen, setCalOpen]           = useState(false);
  const [calConnected, setCalConnected] = useState(false);
  const [calUrl, setCalUrl]             = useState("");
  const [calEmbed, setCalEmbed]         = useState("");
  const connectCal = () => requireAuth(() => setCalConnected(true));

  /* ── FLOATING AI ───────────────────────────────────────────────────── */
  const [floatOpen, setFloatOpen] = useState(false);
  const [showGreet, setShowGreet] = useState(true);
  const [floatMsgs, setFloatMsgs] = useState([{ role: "assistant", content: "Hey! 👋 I'm FlowAI.\nHow can I help you today? ✨" }]);
  const [floatIn, setFloatIn]     = useState("");
  const [floatBusy, setFloatBusy] = useState(false);
  const floatEndRef = useRef(null);
  useEffect(() => { const t = setTimeout(() => setShowGreet(false), 5000); return () => clearTimeout(t); }, []);
  useEffect(() => { floatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [floatMsgs, floatOpen]);

  const sendFloat = async () => {
    if (!floatIn.trim() || floatBusy) return;
    const um = { role: "user", content: floatIn.trim() }, hist = [...floatMsgs, um];
    setFloatMsgs(hist); setFloatIn(""); setFloatBusy(true);
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: "You are FlowAI, a GenZ AI assistant in FlowSpace productivity app. Be warm, concise, helpful. Use emojis naturally." }]
          },
          contents: hist.map(m => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }]
          }))
        })
      });
      const d = await res.json();
      const text = d.candidates?.[0]?.content?.parts?.[0]?.text ?? "Oops, try again 🔄";
      setFloatMsgs([...hist, { role: "assistant", content: text }]);
    } catch { setFloatMsgs([...hist, { role: "assistant", content: "Network issue 🌐 Check connection." }]); }
    finally { setFloatBusy(false); }
  };

  /* ── FOOTER MODALS ─────────────────────────────────────────────────── */
  const [showLegal, setShowLegal] = useState(false);
  const [legalTab, setLegalTab]   = useState("privacy"); // privacy, terms
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackTab, setFeedbackTab]   = useState("issue"); // issue, feature, general

  /* ── EXPOSE EVERYTHING ─────────────────────────────────────────────── */
  const value = {
    // Auth
    user, showAuth, setShowAuth, authTab, setAuthTab, authEmail, setAuthEmail,
    authPass, setAuthPass, authName, setAuthName, authErr, authBusy,
    handleEmailAuth, handleSocial, logout, requireAuth,
    // Subscription
    isPro, subPlan, showSubscription, setShowSubscription, subTab, setSubTab,
    subLoading, startRazorpay, cancelSub, checkLimit,
    // Theme
    mode, setMode, accent, setAccent, bodyFont, setBodyFont, fontSize, setFontSize,
    bgImage, setBgImage, dark, T, glass, glowGlass, inp, btn,
    // Nav
    sec, setSec, sideOpen, onSideEnter, onSideLeave,
    // Clock
    now, fmtDate, fmtSecs, greeting,
    // Activity
    activityLog, setActivityLog, addActivity,
    // Notes
    notes, activeNote, nTitle, setNTitle, nBlocks, nSaved,
    openNote, saveNote, newNote, delNote, addBlock, updateBlock, delBlock,
    handleNoteImage, handleNoteFile,
    // Pomodoro
    pomFmtId, setPomFmtId, desired, setDesired, cWork, setCWork, cBrk, setCBrk,
    cLong, setCLong, cLongAfter, setCLongAfter, pomPhase, pomTime, pomRunning,
    pomSessions, pomPopup, setPomPopup, showDone, flowtimeEl, flowtimeRun,
    tasks, setTasks, newTask, setNewTask, showTasksPopup, setShowTasksPopup,
    pomHistory, setPomHistory, showSessionEnd, setShowSessionEnd,
    startPom, pausePom, resetPom, skipPhase, pomPct, phaseColor, getPomFmt,
    // Code
    tabs, setTabs, activeTabId, setActiveTabId, activeTab, folders, setFolders,
    newFolderName, setNewFolderName, runOutput, runError, showOutput, setShowOutput,
    runKey, iframeLog, setIframeLog, renamingTab, setRenamingTab, renameVal, setRenameVal,
    expandedFolders, setExpandedFolders, copied, showLangMenu, setShowLangMenu, langMenuRef,
    addTab, updateTab, closeTab, changeLang, handleCodeKey, getSrcDoc, runCode,
    downloadFile, downloadAll, copyCode,
    // Files
    files, setFiles, dragOver, setDragOver, fileDropRef, bgRef,
    handleBgUpload, addFiles,
    // Vault
    vLocked, setVLocked, vPin, pinIn, setPinIn, showPinInput, setShowPinInput,
    pinErr, vNotes, setVNotes, vActive, setVActive, vT, setVT, vBlocks, vSaved,
    showPinChange, setShowPinChange, newPin, setNewPin, confirmPin, setConfirmPin,
    pinChangeErr, autoLockSecs, setAutoLockSecs, autoLockDropdown, setAutoLockDropdown,
    vaultLockTimer, tryUnlock, changePin, openVNote, newVNote, saveVNote,
    addVBlock, updateVBlock, delVBlock, handleVImage, handleVFile, vaultActivity,
    // Spotify
    spotOpen, setSpotOpen, spotConnected, setSpotConnected, spotUrl, setSpotUrl,
    spotEmbed, setSpotEmbed, connectSpotify, loadSpot,
    // Calendar
    calOpen, setCalOpen, calConnected, setCalConnected, calUrl, setCalUrl,
    calEmbed, setCalEmbed, connectCal,
    // FloatingAI
    floatOpen, setFloatOpen, showGreet, setShowGreet, floatMsgs, floatIn, setFloatIn,
    floatBusy, floatEndRef, sendFloat,
    // Footer Modals
    showLegal, setShowLegal, legalTab, setLegalTab,
    showFeedback, setShowFeedback, feedbackTab, setFeedbackTab,
    // Extra refs
    FREE_LIMITS, POM_FORMATS, LANGS, AUTO_LOCK_OPTIONS,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/** Call this inside any component to access all FlowSpace state & actions */
export const useApp = () => useContext(AppContext);
