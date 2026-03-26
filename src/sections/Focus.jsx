/* sections/Focus.jsx */
import { Play, RotateCcw, SkipForward, Plus, X, CheckSquare, Square, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Focus() {
  const { T, accent, glass, glowGlass, inp, btn,
          POM_FORMATS, pomFmtId, setPomFmtId, desired, setDesired,
          cWork, setCWork, cBrk, setCBrk, cLong, setCLong, cLongAfter, setCLongAfter,
          pomPhase, pomTime, pomSessions, fmtSecs, flowtimeEl, phaseColor,
          tasks, setTasks, newTask, setNewTask, pomHistory, setPomHistory,
          startPom, resetPom, skipPhase, getPomFmt } = useApp();

  const fmt = POM_FORMATS.find(f => f.id === pomFmtId);

  return (
    <div style={{maxWidth:"960px",margin:"0 auto",paddingBottom:"40px"}}>
      <h2 style={{fontFamily:"Syne",fontWeight:800,fontSize:"42px",color:T.text,margin:"0 0 8px",letterSpacing:"-1px"}}>Focus Mode 🍅</h2>
      <p style={{color:T.muted,fontSize:"16px",marginBottom:"32px"}}>Pick a format, set your sessions, then enter the zone.</p>

      {/* Format grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"11px",marginBottom:"22px"}}>
        {POM_FORMATS.map(f=>(
          <div key={f.id} onClick={()=>{setPomFmtId(f.id);resetPom();}}
            style={{...glass({padding:"15px",cursor:"pointer",border:`1px solid ${pomFmtId===f.id?accent:T.border}`,background:pomFmtId===f.id?`${accent}15`:T.card,transition:"all .18s"})}}
            onMouseEnter={ev=>ev.currentTarget.style.borderColor=accent}
            onMouseLeave={ev=>ev.currentTarget.style.borderColor=pomFmtId===f.id?accent:T.border}>
            <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px"}}>
              <span style={{fontSize:"28px"}}>{f.emoji}</span>
              <div style={{fontFamily:"Syne",fontWeight:800,fontSize:"16px",color:T.text,flex:1}}>{f.name}</div>
              {pomFmtId===f.id&&<div style={{width:"10px",height:"10px",borderRadius:"50%",background:accent,boxShadow:`0 0 10px ${accent}`}}/>}
            </div>
            {f.id!=="flowtime"&&f.id!=="custom"&&(
              <div style={{display:"flex",gap:"5px",marginBottom:"6px",flexWrap:"wrap"}}>
                <span style={{fontSize:"10px",padding:"2px 7px",borderRadius:"20px",background:`${accent}18`,color:accent,fontWeight:600}}>⏱ {f.work}m</span>
                <span style={{fontSize:"10px",padding:"2px 7px",borderRadius:"20px",background:"#00ff9415",color:"#00ff94",fontWeight:600}}>☕ {f.brk}m</span>
              </div>
            )}
            <div style={{color:T.muted,fontSize:"11px",lineHeight:1.5}}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Custom timings */}
      {pomFmtId==="custom"&&(
        <div style={{...glass({marginBottom:"18px",padding:"18px"})}}>
          <div style={{color:T.muted,fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"13px"}}>⚙️ Custom Timings (minutes)</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))",gap:"13px"}}>
            {[["Work",cWork,setCWork],["Break",cBrk,setCBrk],["Long Break",cLong,setCLong],["Long after (sessions)",cLongAfter,setCLongAfter]].map(([label,val,setter])=>(
              <div key={label}>
                <div style={{color:T.muted,fontSize:"11px",marginBottom:"5px"}}>{label}</div>
                <input type="number" value={val} min={1} max={300} onChange={e=>setter(+e.target.value)} style={{...inp({fontSize:"16px",fontFamily:"JetBrains Mono",textAlign:"center"})}}/>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}}>
        <div>
          {/* Session goal */}
          <div style={{...glass({padding:"18px",marginBottom:"12px"})}}>
            <div style={{color:T.muted,fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"12px"}}>🎯 Session Goal</div>
            <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"14px"}}>
              <span style={{color:T.text,fontSize:"13px"}}>Sessions:</span>
              <button onClick={()=>setDesired(v=>Math.max(1,v-1))} style={{...btn(),width:"30px",height:"30px",padding:0,justifyContent:"center",fontSize:"18px"}}>−</button>
              <span style={{fontFamily:"JetBrains Mono",fontSize:"22px",color:accent,minWidth:"30px",textAlign:"center"}}>{desired}</span>
              <button onClick={()=>setDesired(v=>Math.min(20,v+1))} style={{...btn(),width:"30px",height:"30px",padding:0,justifyContent:"center",fontSize:"18px"}}>+</button>
            </div>
            {fmt&&fmt.work&&<div style={{color:T.muted,fontSize:"12px",padding:"9px 11px",borderRadius:"9px",background:T.inp,border:`1px solid ${T.border}`}}>Total: <span style={{color:accent,fontWeight:600}}>{desired*(fmt.work||cWork)} min focus</span></div>}
          </div>
          {/* Mini timer */}
          <div style={{...glowGlass(phaseColor[pomPhase],{padding:"40px",textAlign:"center"})}}>
            <div style={{color:T.muted,fontSize:"12px",fontWeight:800,textTransform:"uppercase",letterSpacing:"2px",marginBottom:"16px"}}>{pomPhase==="work"?"🧠 Deep Work":"☕ Recovery Break"}</div>
            <div style={{fontSize:"86px",fontFamily:"JetBrains Mono",color:phaseColor[pomPhase],letterSpacing:"-4px",lineHeight:1,filter:`drop-shadow(0 0 30px ${phaseColor[pomPhase]}60)`,fontWeight:700}}>
              {pomFmtId==="flowtime"?fmtSecs(flowtimeEl):fmtSecs(pomTime||0)}
            </div>
            <div style={{display:"flex",gap:"12px",justifyContent:"center",marginTop:"24px"}}>
              <button onClick={resetPom} style={{...btn(),padding:"10px 16px",fontSize:"14px"}}><RotateCcw size={16}/></button>
              <button onClick={startPom} style={{...btn(true,phaseColor[pomPhase]),padding:"12px 24px",fontSize:"16px",boxShadow:`0 12px 30px ${phaseColor[pomPhase]}50`}}><Play size={16}/> Start Flow</button>
              <button onClick={skipPhase} style={{...btn(),padding:"10px 16px",fontSize:"14px"}}><SkipForward size={16}/></button>
            </div>
          </div>
          {/* Progress dots */}
          <div style={{...glass({padding:"14px",marginTop:"12px"})}}>
            <div style={{color:T.muted,fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",marginBottom:"10px"}}>Progress</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
              {Array.from({length:desired},(_,i)=>(
                <div key={i} style={{width:"26px",height:"26px",borderRadius:"50%",background:i<pomSessions?`${accent}20`:T.inp,border:`2px solid ${i<pomSessions?accent:T.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",transition:"all .3s"}}>
                  {i<pomSessions?"🍅":""}
                </div>
              ))}
            </div>
            <div style={{fontFamily:"Syne",fontWeight:700,fontSize:"14px",color:T.text,marginTop:"9px"}}>{pomSessions}/{desired} <span style={{color:T.muted,fontWeight:400,fontSize:"12px"}}>sessions done</span></div>
          </div>
        </div>

        {/* Tasks */}
        <div style={{...glass({padding:"18px",display:"flex",flexDirection:"column",gap:"10px"})}}>
          <div style={{color:T.muted,fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px"}}>📋 Session Tasks</div>
          <div style={{display:"flex",gap:"7px"}}>
            <input value={newTask} onChange={e=>setNewTask(e.target.value)} onKeyDown={e=>e.key==="Enter"&&newTask.trim()&&(setTasks(ts=>[...ts,{id:Date.now(),title:newTask.trim(),done:false}]),setNewTask(""))} placeholder="Add a task..." style={{...inp({flex:1,fontSize:"13px",padding:"8px 11px"})}}/>
            <button onClick={()=>newTask.trim()&&(setTasks(ts=>[...ts,{id:Date.now(),title:newTask.trim(),done:false}]),setNewTask(""))} style={{...btn(true),padding:"8px 12px"}}><Plus size={13}/></button>
          </div>
          <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:"6px"}}>
            {tasks.length===0&&<div style={{color:T.muted,fontSize:"12px",textAlign:"center",padding:"18px 0"}}>No tasks yet 🎯</div>}
            {tasks.map(t=>(
              <div key={t.id} style={{display:"flex",alignItems:"center",gap:"9px",padding:"9px 11px",borderRadius:"10px",background:T.inp,border:`1px solid ${t.done?accent+"40":T.border}`,transition:"all .15s"}}>
                <button onClick={()=>setTasks(ts=>ts.map(x=>x.id===t.id?{...x,done:!x.done}:x))} style={{background:"none",border:"none",cursor:"pointer",color:t.done?accent:T.muted,padding:0,flexShrink:0}}>
                  {t.done?<CheckSquare size={15} color={accent}/>:<Square size={15}/>}
                </button>
                <span style={{color:T.text,fontSize:"12px",flex:1,textDecoration:t.done?"line-through":"none",opacity:t.done?.55:1}}>{t.title}</span>
                <button onClick={()=>setTasks(ts=>ts.filter(x=>x.id!==t.id))} style={{background:"none",border:"none",cursor:"pointer",color:T.muted,padding:0}}><X size={11}/></button>
              </div>
            ))}
          </div>
          {tasks.length>0&&<div style={{padding:"7px 11px",borderRadius:"9px",background:`${accent}10`,border:`1px solid ${accent}25`,fontSize:"12px",color:T.muted}}>{tasks.filter(t=>t.done).length}/{tasks.length} done · <span style={{color:accent}}>{Math.round(tasks.filter(t=>t.done).length/tasks.length*100)}%</span></div>}
        </div>
      </div>

      {/* Session History */}
      {pomHistory.length>0&&(
        <div style={{...glass({marginTop:"22px",padding:"20px"})}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"}}>
            <div>
              <h3 style={{fontFamily:"Syne",fontWeight:800,fontSize:"17px",color:T.text,margin:"0 0 3px"}}>🍅 Session History</h3>
              <div style={{color:T.muted,fontSize:"12px"}}>{pomHistory.length} completed session{pomHistory.length>1?"s":""}</div>
            </div>
            <button onClick={()=>setPomHistory([])} style={{...btn(),fontSize:"12px",padding:"6px 12px",color:"#f43f5e",borderColor:"#f43f5e30"}}><Trash2 size={11}/> Clear</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:"10px"}}>
            {pomHistory.map((p,i)=>(
              <div key={p.id} style={{...glass({padding:"14px",border:`1px solid ${i===0?"#ff6b6b40":T.border}`,background:i===0?"#ff6b6b08":T.card})}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"}}>
                  <div>
                    <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                      <span style={{fontSize:"16px"}}>{p.fmtEmoji}</span>
                      <span style={{fontFamily:"Syne",fontWeight:700,fontSize:"13px",color:T.text}}>{p.fmt}</span>
                      {i===0&&<span style={{background:"#ff6b6b",borderRadius:"5px",padding:"1px 6px",fontSize:"9px",color:"#fff",fontWeight:700}}>LATEST</span>}
                    </div>
                    <div style={{color:T.muted,fontSize:"10px",marginTop:"2px"}}>{p.endDate} at {p.endTime}</div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{fontFamily:"JetBrains Mono",fontWeight:700,fontSize:"22px",color:"#ff6b6b",lineHeight:1}}>{p.sessions}</div>
                    <div style={{color:T.muted,fontSize:"9px"}}>sessions</div>
                  </div>
                </div>
                {p.tasks.length>0?(
                  <div style={{paddingTop:"8px",borderTop:`1px solid ${T.border}`}}>
                    <div style={{color:T.muted,fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",marginBottom:"5px"}}>Tasks · {p.tasks.filter(t=>t.done).length}/{p.tasks.length} done</div>
                    {p.tasks.slice(0,3).map(t=>(
                      <div key={t.id} style={{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",color:t.done?T.muted:T.text,marginBottom:"3px",opacity:t.done?.7:1}}>
                        <span style={{fontSize:"10px"}}>{t.done?"✅":"⬜"}</span>
                        <span style={{textDecoration:t.done?"line-through":"none",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.title}</span>
                      </div>
                    ))}
                    {p.tasks.length>3&&<div style={{color:T.muted,fontSize:"10px",marginTop:"2px"}}>+{p.tasks.length-3} more tasks</div>}
                  </div>
                ):<div style={{color:T.muted,fontSize:"11px",fontStyle:"italic"}}>No tasks tracked</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
