/* sections/CodeEditor.jsx */
import { Terminal, Copy, Download, Check, X, Plus, Folder, ChevronDown,
         ChevronRight, AlertCircle } from "lucide-react";
import { useApp } from "../context/AppContext";
import { LANGS } from "../constants";

export default function CodeEditor() {
  const { T, accent, dark, glass, inp, btn, bodyFont,
          tabs, setTabs, activeTabId, setActiveTabId, activeTab, folders, setFolders,
          newFolderName, setNewFolderName, runOutput, runError, showOutput, setShowOutput,
          runKey, iframeLog, setIframeLog, renamingTab, setRenamingTab, renameVal, setRenameVal,
          expandedFolders, setExpandedFolders, copied, showLangMenu, setShowLangMenu, langMenuRef,
          addTab, updateTab, closeTab, changeLang, handleCodeKey, getSrcDoc, runCode,
          downloadFile, downloadAll, copyCode } = useApp();

  const langInfo = LANGS.find(l => l.id === activeTab?.lang) || LANGS[0];
  const srcDoc   = getSrcDoc(activeTab);
  const isJs     = activeTab?.lang === "javascript";
  const tabsByFolder = fid => tabs.filter(t => t.folderId === fid);
  const unassigned   = tabs.filter(t => t.folderId === null);

  return (
    <div style={{height:"calc(100vh - 70px)",display:"flex",flexDirection:"column",gap:0}}>
      <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"16px",flexShrink:0,flexWrap:"wrap"}}>
        <h2 style={{fontFamily:"Syne",fontWeight:800,fontSize:"42px",color:T.text,margin:"0 0 4px",letterSpacing:"-1px"}}>Code Editor 💻</h2>
      </div>
      <div style={{display:"flex",flex:1,gap:"11px",minHeight:0}}>
        {/* File sidebar */}
        <div style={{width:"195px",flexShrink:0,display:"flex",flexDirection:"column",gap:"7px"}}>
          <div style={{display:"flex",gap:"5px"}}>
            <input value={newFolderName} onChange={e=>setNewFolderName(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter"&&newFolderName.trim()){setFolders(fs=>[...fs,{id:Date.now(),name:newFolderName.trim()}]);setNewFolderName("");}}}
              placeholder="New folder..." style={{...inp({flex:1,fontSize:"11px",padding:"6px 9px"})}}/>
            <button onClick={()=>{if(newFolderName.trim()){setFolders(fs=>[...fs,{id:Date.now(),name:newFolderName.trim()}]);setNewFolderName("");}}} style={{...btn(),padding:"6px 9px"}}><Folder size={12}/></button>
          </div>
          <div style={{flex:1,overflowY:"auto"}}>
            {folders.map(folder=>(
              <div key={folder.id} style={{marginBottom:"5px"}}>
                <div onClick={()=>setExpandedFolders(ef=>({...ef,[folder.id]:!ef[folder.id]}))}
                  style={{display:"flex",alignItems:"center",gap:"5px",padding:"6px 8px",borderRadius:"8px",cursor:"pointer",background:T.inp,border:`1px solid ${T.border}`,marginBottom:"3px",fontSize:"11px",color:T.text,fontWeight:500}}>
                  <Folder size={12} color={accent}/><span style={{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{folder.name}</span>
                  {expandedFolders[folder.id]?<ChevronDown size={10}/>:<ChevronRight size={10}/>}
                  <button onClick={e=>{e.stopPropagation();addTab(folder.id);}} style={{background:"none",border:"none",cursor:"pointer",color:T.muted,padding:0}}><Plus size={10}/></button>
                </div>
                {expandedFolders[folder.id]&&tabsByFolder(folder.id).map(t=>(
                  <div key={t.id} onClick={()=>setActiveTabId(t.id)}
                    style={{display:"flex",alignItems:"center",gap:"5px",padding:"4px 8px 4px 18px",borderRadius:"7px",cursor:"pointer",background:activeTabId===t.id?`${accent}18`:T.card,border:`1px solid ${activeTabId===t.id?accent:T.border}`,marginBottom:"2px",fontSize:"11px",color:activeTabId===t.id?accent:T.muted,transition:"all .12s"}}>
                    <div style={{width:"12px",height:"12px",borderRadius:"2px",background:LANGS.find(l=>l.id===t.lang)?.color||"#888",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"6px",color:"#fff",fontWeight:700,flexShrink:0}}>{LANGS.find(l=>l.id===t.lang)?.icon||"?"}</div>
                    <span style={{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.name}</span>
                  </div>
                ))}
              </div>
            ))}
            {unassigned.length>0&&(
              <div>
                <div style={{fontSize:"9px",color:T.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",padding:"3px 8px",marginBottom:"3px"}}>Unsorted</div>
                {unassigned.map(t=>(
                  <div key={t.id} onClick={()=>setActiveTabId(t.id)}
                    style={{display:"flex",alignItems:"center",gap:"5px",padding:"4px 8px",borderRadius:"7px",cursor:"pointer",background:activeTabId===t.id?`${accent}18`:T.card,border:`1px solid ${activeTabId===t.id?accent:T.border}`,marginBottom:"2px",fontSize:"11px",color:activeTabId===t.id?accent:T.muted,transition:"all .12s"}}>
                    <div style={{width:"12px",height:"12px",borderRadius:"2px",background:LANGS.find(l=>l.id===t.lang)?.color||"#888",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"6px",color:"#fff",fontWeight:700,flexShrink:0}}>{LANGS.find(l=>l.id===t.lang)?.icon||"?"}</div>
                    <span style={{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.name}</span>
                  </div>
                ))}
              </div>
            )}
            <button onClick={()=>addTab(null)} style={{...btn(),width:"100%",justifyContent:"center",fontSize:"11px",padding:"5px",marginTop:"5px"}}><Plus size={11}/> New File</button>
          </div>
        </div>

        {/* Editor main */}
        <div style={{flex:1,display:"flex",flexDirection:"column",minWidth:0}}>
          {/* Tabs bar */}
          <div style={{display:"flex",gap:"3px",overflowX:"auto",flexShrink:0,marginBottom:"7px",paddingBottom:"2px",alignItems:"flex-end"}}>
            {tabs.map(t=>{
              const li=LANGS.find(l=>l.id===t.lang)||LANGS[0],isA=activeTabId===t.id;
              return(
                <div key={t.id} onClick={()=>setActiveTabId(t.id)}
                  style={{display:"flex",alignItems:"center",gap:"5px",padding:"5px 11px",borderRadius:"8px 8px 0 0",cursor:"pointer",background:isA?T.codeBg:T.inp,border:`1px solid ${T.border}`,borderBottom:isA?"none":undefined,flexShrink:0,minWidth:"80px",maxWidth:"150px"}}>
                  <div style={{width:"13px",height:"13px",borderRadius:"3px",background:li.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"6px",color:"#fff",fontWeight:700,flexShrink:0}}>{li.icon}</div>
                  {renamingTab===t.id?(
                    <input value={renameVal} onChange={e=>setRenameVal(e.target.value)} autoFocus
                      onBlur={()=>{updateTab(t.id,{name:renameVal||t.name});setRenamingTab(null);}}
                      onKeyDown={e=>{if(e.key==="Enter"){updateTab(t.id,{name:renameVal||t.name});setRenamingTab(null);}if(e.key==="Escape")setRenamingTab(null);}}
                      style={{background:"transparent",border:"none",outline:"none",color:T.text,fontFamily:"JetBrains Mono",fontSize:"11px",width:"70px"}}/>
                  ):(
                    <span onDoubleClick={()=>{setRenamingTab(t.id);setRenameVal(t.name);}}
                      style={{fontSize:"11px",color:isA?T.text:T.muted,fontFamily:"JetBrains Mono",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.name}</span>
                  )}
                  {tabs.length>1&&<button onClick={e=>{e.stopPropagation();closeTab(t.id);}} style={{background:"none",border:"none",cursor:"pointer",color:T.muted,padding:0,marginLeft:"auto",flexShrink:0}}><X size={10}/></button>}
                </div>
              );
            })}
            <button onClick={()=>addTab(null)} style={{padding:"5px 11px",borderRadius:"8px 8px 0 0",border:`1px solid ${T.border}`,background:T.inp,cursor:"pointer",color:T.muted,fontSize:"15px",lineHeight:1,flexShrink:0}}>+</button>
          </div>

          {/* Language dropdown and Tools */}
          <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"7px",flexShrink:0}} ref={langMenuRef}>
            <div style={{position:"relative"}}>
              <button onClick={()=>setShowLangMenu(v=>!v)}
                style={{display:"flex",alignItems:"center",gap:"7px",padding:"6px 12px",borderRadius:"9px",border:`1px solid ${langInfo.color}60`,background:`${langInfo.color}15`,cursor:"pointer",fontSize:"13px",fontFamily:bodyFont,color:langInfo.color,fontWeight:600}}>
                <div style={{width:"16px",height:"16px",borderRadius:"4px",background:langInfo.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"7px",color:"#fff",fontWeight:700}}>{langInfo.icon}</div>
                {langInfo.label}
                <ChevronDown size={12} style={{transform:showLangMenu?"rotate(180deg)":"rotate(0)",transition:"transform .2s"}}/>
              </button>
              {showLangMenu&&(
                <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,zIndex:50,background:dark?"rgba(10,6,26,0.98)":"rgba(252,250,255,0.98)",border:`1px solid ${T.border}`,borderRadius:"14px",padding:"8px",minWidth:"200px",boxShadow:"0 20px 60px rgba(0,0,0,0.4)",backdropFilter:"blur(20px)",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px"}}>
                  {LANGS.map(l=>(
                    <button key={l.id} onClick={()=>changeLang(l.id)}
                      style={{display:"flex",alignItems:"center",gap:"7px",padding:"7px 10px",borderRadius:"9px",border:`1px solid ${activeTab?.lang===l.id?l.color+"80":"transparent"}`,background:activeTab?.lang===l.id?`${l.color}18`:"transparent",cursor:"pointer",fontSize:"12px",color:activeTab?.lang===l.id?l.color:T.text,fontFamily:bodyFont,fontWeight:activeTab?.lang===l.id?700:400,textAlign:"left"}}>
                      <div style={{width:"18px",height:"18px",borderRadius:"4px",background:l.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"8px",color:"#fff",fontWeight:700,flexShrink:0}}>{l.icon}</div>
                      {l.label}
                      {activeTab?.lang===l.id&&<Check size={11} style={{marginLeft:"auto"}}/>}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div style={{marginLeft:"auto",display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
              <button onClick={runCode} style={{...btn(true),padding:"6px 14px",fontSize:"12px",background:`linear-gradient(135deg,${accent},#00e5ff)`,boxShadow:`0 4px 12px ${accent}40`,fontWeight:700}}><Terminal size={12}/> Run</button>
              <button onClick={copyCode} style={{...btn(copied),padding:"6px 12px",fontSize:"12px"}}>{copied?<><Check size={12}/> Copied</>:<><Copy size={12}/> Copy</>}</button>
              <button onClick={downloadFile} style={{...btn(),padding:"6px 12px",fontSize:"12px"}}><Download size={12}/> File</button>
              <button onClick={downloadAll} style={{...btn(),padding:"6px 12px",fontSize:"12px"}}><Download size={12}/> All</button>
            </div>
          </div>

          {/* Editor */}
          <div style={{flex:1,display:"flex",borderRadius:"13px",overflow:"hidden",border:`1px solid ${T.border}`,minHeight:0,background:T.codeBg}}>
            <div style={{padding:"13px 9px",background:T.codeG,borderRight:`1px solid ${T.border}`,userSelect:"none",minWidth:"42px",textAlign:"right",overflowY:"hidden"}}>
              {(activeTab?.code||"").split("\n").map((_,i)=>(
                <div key={i} style={{color:T.muted,fontSize:"12px",fontFamily:"JetBrains Mono",lineHeight:"20px"}}>{i+1}</div>
              ))}
            </div>
            <textarea value={activeTab?.code||""} onChange={e=>updateTab(activeTabId,{code:e.target.value})} spellCheck={false} onKeyDown={handleCodeKey}
              style={{flex:1,background:"transparent",color:T.text,border:"none",padding:"13px",fontFamily:"JetBrains Mono",fontSize:"13px",lineHeight:"20px",resize:"none",outline:"none"}}/>
          </div>

          {/* Output */}
          {showOutput&&(
            <div style={{...glass({padding:"12px",marginTop:"7px",flexShrink:0}),border:`1px solid ${runError?"#f43f5e40":accent+"40"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"7px"}}>
                <div style={{fontFamily:"Syne",fontWeight:700,fontSize:"12px",color:runError?"#f43f5e":accent,display:"flex",alignItems:"center",gap:"4px"}}>
                  {runError?<AlertCircle size={12}/>:<Terminal size={12}/>}
                  {runError?"Error":runOutput==="__IFRAME__"&&isJs?"Console":"Preview"}
                </div>
                <div style={{display:"flex",gap:"6px",alignItems:"center"}}>
                  {runOutput==="__IFRAME__"&&iframeLog.length>0&&<button onClick={()=>setIframeLog([])} style={{background:"none",border:"none",cursor:"pointer",color:T.muted,fontSize:"11px",fontFamily:bodyFont}}>Clear</button>}
                  <button onClick={()=>{setShowOutput(false);setIframeLog([]);}} style={{background:"none",border:"none",cursor:"pointer",color:T.muted,padding:0}}><X size={12}/></button>
                </div>
              </div>
              {runError&&<pre style={{fontFamily:"JetBrains Mono",fontSize:"12px",color:"#f43f5e",margin:0,whiteSpace:"pre-wrap",wordBreak:"break-all",maxHeight:"130px",overflowY:"auto"}}>{runError}</pre>}
              {!runError&&runOutput==="__IFRAME__"&&(
                <div>
                  {isJs&&(
                    <div style={{background:dark?"#0d0d1a":"#fafafa",borderRadius:"9px",border:`1px solid ${T.border}`,padding:"9px 11px",maxHeight:"160px",overflowY:"auto",minHeight:"40px"}}>
                      {iframeLog.length===0&&<div style={{color:T.muted,fontSize:"12px",fontFamily:"JetBrains Mono",opacity:.6}}>Running... console output appears here</div>}
                      {iframeLog.map((l,i)=>(<div key={i} style={{fontFamily:"JetBrains Mono",fontSize:"12px",color:l.isErr?"#f43f5e":T.text,padding:"1px 0",whiteSpace:"pre-wrap",wordBreak:"break-all"}}>{l.text}</div>))}
                    </div>
                  )}
                  <iframe key={runKey} srcDoc={srcDoc} sandbox="allow-scripts" title="Code Runner"
                    style={{width:"100%",height:isJs?"0":"220px",border:isJs?"none":`1px solid ${T.border}`,borderRadius:isJs?"0":"9px",marginTop:isJs?"0":"7px",display:"block",background:"#fff",overflow:"hidden"}}/>
                </div>
              )}
            </div>
          )}

          {/* Status bar */}
          <div style={{display:"flex",gap:"14px",padding:"5px 11px",borderRadius:"9px",background:T.inp,border:`1px solid ${T.border}`,marginTop:"5px",fontSize:"11px",color:T.muted,flexShrink:0,flexWrap:"wrap"}}>
            <span style={{display:"flex",alignItems:"center",gap:"3px"}}><div style={{width:"9px",height:"9px",borderRadius:"2px",background:langInfo.color}}/>{langInfo.label}</span>
            <span>lines: <span style={{color:accent}}>{(activeTab?.code||"").split("\n").length}</span></span>
            <span>chars: <span style={{color:accent}}>{(activeTab?.code||"").length}</span></span>
            <span style={{marginLeft:"auto",cursor:"pointer",color:accent}} onClick={()=>setShowOutput(v=>!v)}>{showOutput?"▼ Hide":"▲ Output"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
