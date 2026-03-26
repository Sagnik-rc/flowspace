/* ─────────────────────────────────────────────────────────────────────────
   components/BlockEditor.jsx
   Shared between Notes and Vault.
   Exports:  renderBlocks(blocks, updateFn, delFn, imgHandler, fileHandler)
             <BlockToolbar addFn={fn} />
───────────────────────────────────────────────────────────────────────── */
import { CheckSquare, Square, Image, Download, X, AlignLeft, Type, List,
         Code, FileCode, Hash } from "lucide-react";
import { useApp } from "../context/AppContext";

/** Renders an array of content blocks (text, heading, bullet, etc.) */
export function renderBlocks(blocks, updateFn, delFn, addImgHandler, addFileHandler) {
  const { T, accent, inp, btn, fontSize } = useApp();   // ← called in the parent component, not here
  // NOTE: this is a plain function, not a hook — the calling component
  // must pass in the style helpers, or we call useApp() in the parent.
  // Keeping it as a JSX-returning function that is called (not rendered as <Component/>).
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {blocks.map(b => (
        <div key={b.id} style={{ position: "relative", display: "flex", gap: "8px", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            {b.type === "text" && (
              <textarea value={b.content} onChange={e => updateFn(b.id, { content: e.target.value })} placeholder="Type something..." rows={3}
                style={{ ...inp({ resize: "vertical", lineHeight: 1.7, fontSize: `${fontSize}px` })} }/>
            )}
            {b.type === "heading" && (
              <input value={b.content} onChange={e => updateFn(b.id, { content: e.target.value })} placeholder="Heading..."
                style={{ ...inp({ fontFamily: "Syne", fontWeight: 700, fontSize: "20px", padding: "8px 14px" })} }/>
            )}
            {b.type === "bullet" && (
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span style={{ color: accent, fontSize: "18px", lineHeight: 1 }}>•</span>
                <input value={b.content} onChange={e => updateFn(b.id, { content: e.target.value })} placeholder="Bullet point..."
                  style={{ ...inp({ flex: 1 })} }/>
              </div>
            )}
            {b.type === "checkbox" && (
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <button onClick={() => updateFn(b.id, { checked: !b.checked })} style={{ background: "none", border: "none", cursor: "pointer", color: b.checked ? accent : T.muted, padding: 0, flexShrink: 0 }}>
                  {b.checked ? <CheckSquare size={18} color={accent}/> : <Square size={18}/>}
                </button>
                <input value={b.content} onChange={e => updateFn(b.id, { content: e.target.value })} placeholder="To-do item..."
                  style={{ ...inp({ flex: 1, textDecoration: b.checked ? "line-through" : "none", opacity: b.checked ? 0.5 : 1 })} }/>
              </div>
            )}
            {b.type === "code" && (
              <div style={{ background: T.codeBg, border: `1px solid ${T.border}`, borderRadius: "10px", padding: "12px", fontFamily: "JetBrains Mono" }}>
                <textarea value={b.content} onChange={e => updateFn(b.id, { content: e.target.value })} placeholder="// code block..." rows={4}
                  style={{ width: "100%", background: "transparent", border: "none", outline: "none", color: T.text, fontFamily: "JetBrains Mono", fontSize: "13px", resize: "vertical", lineHeight: 1.65 }}/>
              </div>
            )}
            {b.type === "bash" && (
              <div style={{ background: "#0d1117", border: "1px solid #30363d", borderRadius: "10px", padding: "12px", fontFamily: "JetBrains Mono" }}>
                <div style={{ color: "#89e051", fontSize: "10px", fontWeight: 700, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>$ bash</div>
                <textarea value={b.content} onChange={e => updateFn(b.id, { content: e.target.value })} placeholder="#!/bin/bash" rows={3}
                  style={{ width: "100%", background: "transparent", border: "none", outline: "none", color: "#e6edf3", fontFamily: "JetBrains Mono", fontSize: "13px", resize: "vertical", lineHeight: 1.65 }}/>
              </div>
            )}
            {b.type === "divider" && <div style={{ height: "1px", background: T.border, margin: "8px 0" }}/>}
            {b.type === "image" && (
              b.src ? (
                <div style={{ position: "relative" }}>
                  <img src={b.src} alt={b.content} style={{ maxWidth: "100%", borderRadius: "12px", border: `1px solid ${T.border}` }}/>
                  <div style={{ color: T.muted, fontSize: "11px", marginTop: "4px" }}>{b.content}</div>
                </div>
              ) : (
                <label style={{ ...btn(), cursor: "pointer", justifyContent: "center", width: "100%", border: `2px dashed ${T.border}`, padding: "20px", borderRadius: "12px", flexDirection: "column", gap: "6px" }}>
                  <Image size={22} color={T.muted}/>
                  <span style={{ color: T.muted, fontSize: "12px" }}>Click to upload image</span>
                  <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => addImgHandler(e, b.id)}/>
                </label>
              )
            )}
            {b.type === "file" && (
              b.content ? (
                <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px", borderRadius: "10px", background: T.inp, border: `1px solid ${T.border}` }}>
                  <span style={{ fontSize: "22px" }}>📎</span>
                  <div><div style={{ color: T.text, fontSize: "13px", fontWeight: 500 }}>{b.content}</div><div style={{ color: T.muted, fontSize: "11px" }}>{b.fileSize}</div></div>
                </div>
              ) : (
                <label style={{ ...btn(), cursor: "pointer", justifyContent: "center", width: "100%", border: `2px dashed ${T.border}`, padding: "16px", borderRadius: "12px", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "22px" }}>📎</span>
                  <span style={{ color: T.muted, fontSize: "12px" }}>Click to attach file</span>
                  <input type="file" style={{ display: "none" }} onChange={e => addFileHandler(e, b.id)}/>
                </label>
              )
            )}
          </div>
          {b.type !== "divider" && (
            <button onClick={() => delFn(b.id)} style={{ background: "none", border: "none", cursor: "pointer", color: T.muted, padding: "4px", flexShrink: 0, opacity: 0.6 }}><X size={13}/></button>
          )}
        </div>
      ))}
    </div>
  );
}

/** Toolbar that adds new blocks */
export function BlockToolbar({ addFn }) {
  const { T, btn, bodyFont } = useApp();
  return (
    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", padding: "10px 12px", background: T.inp, border: `1px solid ${T.border}`, borderRadius: "12px" }}>
      <span style={{ color: T.muted, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", alignSelf: "center", marginRight: "4px" }}>Add:</span>
      {[
        ["text",     <AlignLeft size={13}/>,   "Text"],
        ["heading",  <Type size={13}/>,        "Heading"],
        ["bullet",   <List size={13}/>,        "Bullet"],
        ["checkbox", <CheckSquare size={13}/>, "Checkbox"],
        ["code",     <Code size={13}/>,        "Code"],
        ["bash",     <FileCode size={13}/>,    "Bash"],
        ["image",    <Image size={13}/>,       "Image"],
        ["file",     <Download size={13}/>,    "File"],
        ["divider",  <Hash size={13}/>,        "Divider"],
      ].map(([type, icon, label]) => (
        <button key={type} onClick={() => addFn(type)} style={{ ...btn(), padding: "5px 10px", fontSize: "12px", gap: "4px" }}>
          {icon}{label}
        </button>
      ))}
    </div>
  );
}
