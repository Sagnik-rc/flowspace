/* ─────────────────────────────────────────────────────────────────────────
   constants/index.js
   All static data lives here. Import from anywhere — no React needed.
───────────────────────────────────────────────────────────────────────── */

export const GFONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');`;

// ── Pomodoro formats ────────────────────────────────────────────────────
export const POM_FORMATS = [
  { id:"classic",  name:"Classic Pomodoro",   emoji:"🍅", work:25,  brk:5,   longBrk:15, longAfter:4, desc:"Most popular · Studying · Coding" },
  { id:"extended", name:"Extended Focus",     emoji:"⚡", work:50,  brk:10,  longBrk:20, longAfter:4, desc:"Deep coding · Reports · Research" },
  { id:"ultra",    name:"Ultra-Deep Work",    emoji:"🧠", work:90,  brk:25,  longBrk:30, longAfter:2, desc:"Ultradian rhythm · Complex projects" },
  { id:"beginner", name:"Beginner Friendly",  emoji:"🌱", work:15,  brk:5,   longBrk:10, longAfter:4, desc:"Easy start · Beat distraction" },
  { id:"rule5217", name:"52–17 Rule",         emoji:"📊", work:52,  brk:17,  longBrk:30, longAfter:3, desc:"Productivity research proven" },
  { id:"flowtime", name:"Flowtime (Flexible)",emoji:"🌊", work:null,brk:null,longBrk:null,longAfter:null,desc:"Work until you lose focus" },
  { id:"custom",   name:"Custom Pomodoro",    emoji:"⚙️", work:null,brk:null,longBrk:null,longAfter:null,desc:"Set your own timings" },
];

// ── Code editor languages ───────────────────────────────────────────────
export const LANGS = [
  { id:"javascript", label:"JavaScript", ext:"js",   color:"#f7df1e", icon:"JS" },
  { id:"typescript", label:"TypeScript", ext:"ts",   color:"#3178c6", icon:"TS" },
  { id:"python",     label:"Python",     ext:"py",   color:"#3572a5", icon:"PY" },
  { id:"c",          label:"C",          ext:"c",    color:"#555599", icon:"C"  },
  { id:"cpp",        label:"C++",        ext:"cpp",  color:"#f34b7d", icon:"C+" },
  { id:"java",       label:"Java",       ext:"java", color:"#b07219", icon:"JV" },
  { id:"rust",       label:"Rust",       ext:"rs",   color:"#dea584", icon:"RS" },
  { id:"go",         label:"Go",         ext:"go",   color:"#00add8", icon:"GO" },
  { id:"html",       label:"HTML",       ext:"html", color:"#e34c26", icon:"HT" },
  { id:"css",        label:"CSS",        ext:"css",  color:"#563d7c", icon:"CS" },
  { id:"sql",        label:"SQL",        ext:"sql",  color:"#e38c00", icon:"SQ" },
  { id:"bash",       label:"Bash",       ext:"sh",   color:"#89e051", icon:"SH" },
  { id:"json",       label:"JSON",       ext:"json", color:"#292929", icon:"{}" },
];

// ── Code starter templates ──────────────────────────────────────────────
export const STARTERS = {
  javascript:`// ✨ FlowSpace Code Editor\nconsole.log("Hello, FlowSpace! 🌊");\n\nconst greet = name => \`Hey \${name}! Ready to flow?\`;\nconsole.log(greet("World"));\nconsole.log([1,2,3,4,5].map(n => n * n));`,
  python:`# Python Starter\nprint("Hello, FlowSpace! 🌊")\n\ndef fib(n):\n    a, b = 0, 1\n    for _ in range(n):\n        print(a, end=" ")\n        a, b = b, a+b\n\nfib(10)`,
  c:`#include <stdio.h>\n\nint main() {\n    printf("Hello, FlowSpace! 🌊\\n");\n    for (int i = 1; i <= 5; i++) {\n        printf("i = %d\\n", i);\n    }\n    return 0;\n}`,
  cpp:`#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, FlowSpace! 🌊" << endl;\n    for (int i = 1; i <= 5; i++) {\n        cout << "i = " << i << endl;\n    }\n    return 0;\n}`,
  html:`<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>FlowSpace</title>\n  <style>\n    body { font-family: system-ui; padding: 32px; background: #0f0f1a; color: #eef2ff; }\n    h1 { color: #7c5cfc; }\n  </style>\n</head>\n<body>\n  <h1>Hello, FlowSpace! 🌊</h1>\n  <p>Edit this HTML to get started.</p>\n</body>\n</html>`,
  css:`/* CSS Starter */\nbody {\n  font-family: 'Outfit', system-ui, sans-serif;\n  background: #0f0f1a;\n  color: #eef2ff;\n  padding: 32px;\n}\n\nh1 { color: #7c5cfc; }\n.card {\n  background: rgba(255,255,255,0.05);\n  border: 1px solid rgba(255,255,255,0.1);\n  border-radius: 16px;\n  padding: 24px;\n}`,
  default:`// Start coding...\n`,
};
export const getStarter = l => STARTERS[l] || STARTERS.default;

// ── Subscription & limits ───────────────────────────────────────────────
export const FREE_LIMITS   = { notes:10, tabs:10, files:10, vaultNotes:3 };
export const RAZORPAY_KEY  = "rzp_test_YOUR_KEY_HERE"; // 🔑 Replace with real key
export const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE"; // 🔑 Replace with your actual Gemini API key

// ── Vault auto-lock options ─────────────────────────────────────────────
export const AUTO_LOCK_OPTIONS = [
  { label:"Never",     value:0    },
  { label:"1 minute",  value:60   },
  { label:"5 minutes", value:300  },
  { label:"15 minutes",value:900  },
  { label:"30 minutes",value:1800 },
  { label:"1 hour",    value:3600 },
];

// ── Sidebar navigation items ────────────────────────────────────────────
// Icons are imported in Sidebar.jsx to keep this file icon-free
export const NAV_IDS = [
  { id:"dashboard", label:"Dashboard" },
  { id:"notes",     label:"Notes"     },
  { id:"focus",     label:"Focus"     },
  { id:"code",      label:"Code"      },
  { id:"files",     label:"Files"     },
  { id:"vault",     label:"Vault"     },
  { id:"settings",  label:"Settings"  },
];

// ── Social links (footer) ───────────────────────────────────────────────
export const SOCIALS = [
  { href:"https://instagram.com/flowspace.app", icon:"📸", label:"Instagram",   color:"#e1306c" },
  { href:"https://twitter.com/flowspaceapp",    icon:"𝕏",  label:"Twitter/X",   color:"#1da1f2" },
  { href:"https://facebook.com/flowspaceapp",   icon:"📘", label:"Facebook",    color:"#1877f2" },
  { href:"https://github.com/flowspace",        icon:"🐙", label:"GitHub",      color:"#fff"    },
  { href:"https://buymeacoffee.com/flowspace",  icon:"☕", label:"Buy a Coffee",color:"#ffdd00" },
];
