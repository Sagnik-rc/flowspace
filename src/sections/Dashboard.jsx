/* sections/Dashboard.jsx */
import { Check } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const { T, accent, bodyFont, glass, glowGlass, btn, notes, pomHistory, files,
          vNotes, setSec, openNote, now, fmtDate, greeting, user,
          activityLog, setActivityLog } = useApp();
  const lastPom = pomHistory[0] || null;

  return (
    <div>
      <div style={{marginBottom:"18px"}}>
        <h1 style={{fontFamily:"Syne",fontWeight:800,fontSize:"34px",color:T.text,margin:0}}>{greeting[0]} Good {greeting[1]}{user?`, ${user.name.split(" ")[0]}`:""}!</h1>
        <p style={{color:T.muted,marginTop:"6px",fontSize:"14px"}}>{fmtDate(now)}</p>
      </div>
      <div style={{...glowGlass(accent,{marginBottom:"16px",textAlign:"center",padding:"26px 24px"})}}>
        <div style={{fontSize:"68px",fontFamily:"JetBrains Mono",color:T.text,lineHeight:1,letterSpacing:"-4px",filter:`drop-shadow(0 0 26px ${accent}40)`}}>{now.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false})}</div>
        <div style={{color:T.muted,marginTop:"8px",fontSize:"11px",letterSpacing:"1px",textTransform:"uppercase"}}>{Intl.DateTimeFormat().resolvedOptions().timeZone}</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:"11px",marginBottom:"16px"}}>
        {[["📝","Notes",notes.length,accent,"notes"],["🍅","Sessions done",pomHistory.length,"#ff6b6b","focus"],["📂","Files",files.length,"#00e5ff","files"],["🔒","Secrets",vNotes.length,"#00ff94","vault"]].map(([e,l,v,clr,dest],i)=>(
          <div key={i} onClick={()=>setSec(dest)} style={{...glass({border:`1px solid ${clr}28`,padding:"16px",cursor:"pointer",transition:"all .18s"})}}
            onMouseEnter={ev=>{ev.currentTarget.style.transform="translateY(-3px)";ev.currentTarget.style.boxShadow=`0 12px 30px ${clr}20`;}}
            onMouseLeave={ev=>{ev.currentTarget.style.transform="";ev.currentTarget.style.boxShadow="";}}>
            <div style={{fontSize:"22px",marginBottom:"5px"}}>{e}</div>
            <div style={{fontSize:"32px",fontWeight:800,fontFamily:"Syne",color:clr,lineHeight:1}}>{v}</div>
            <div style={{color:T.muted,fontSize:"11px",marginTop:"3px"}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px",marginBottom:"14px"}}>
        <div style={glass({padding:"18px"})}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"13px"}}>
            <h3 style={{fontFamily:"Syne",fontWeight:700,fontSize:"14px",color:T.text,margin:0}}>⚡ Last Activity</h3>
            {activityLog.length>0&&<button onClick={()=>setActivityLog([])} style={{background:"none",border:"none",cursor:"pointer",color:T.muted,fontSize:"11px",fontFamily:bodyFont,padding:0}}>Clear</button>}
          </div>
          {activityLog.length===0
            ? <div style={{color:T.muted,fontSize:"12px",textAlign:"center",padding:"16px 0",lineHeight:1.8}}>No activity yet.<br/>Start a note, pomodoro or save some code 🚀</div>
            : activityLog.slice(0,6).map(a=>(
              <div key={a.id} onClick={()=>setSec(a.section)} style={{display:"flex",alignItems:"flex-start",gap:"9px",padding:"8px 10px",borderRadius:"10px",cursor:"pointer",background:T.inp,border:`1px solid ${T.border}`,marginBottom:"6px",transition:"all .15s"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor=accent+"60"} onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
                <span style={{fontSize:"16px",flexShrink:0}}>{a.icon}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{color:T.text,fontSize:"12px",fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.label}</div>
                  <div style={{color:T.muted,fontSize:"11px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.detail}</div>
                </div>
                <span style={{color:T.muted,fontSize:"10px",flexShrink:0}}>{a.time}</span>
              </div>
            ))
          }
        </div>
        <div style={glass({padding:"18px"})}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"13px"}}>
            <h3 style={{fontFamily:"Syne",fontWeight:700,fontSize:"14px",color:T.text,margin:0}}>🍅 Last Pomodoro</h3>
            <button onClick={()=>setSec("focus")} style={{...btn(),fontSize:"11px",padding:"4px 9px"}}>New →</button>
          </div>
          {!lastPom
            ? <div style={{color:T.muted,fontSize:"12px",textAlign:"center",padding:"16px 0",lineHeight:1.8}}>No sessions yet.<br/>Start your first pomodoro 🍅</div>
            : <div>
                <div style={{...glowGlass("#ff6b6b",{padding:"13px",marginBottom:"10px"})}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div>
                      <div style={{fontFamily:"Syne",fontWeight:700,fontSize:"13px",color:T.text}}>{lastPom.fmtEmoji} {lastPom.fmt}</div>
                      <div style={{color:T.muted,fontSize:"11px",marginTop:"2px"}}>{lastPom.endDate} · {lastPom.endTime}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontFamily:"JetBrains Mono",fontWeight:700,fontSize:"20px",color:"#ff6b6b"}}>{lastPom.sessions}</div>
                      <div style={{color:T.muted,fontSize:"10px"}}>sessions</div>
                    </div>
                  </div>
                  {lastPom.tasks.length>0&&(
                    <div style={{marginTop:"9px",paddingTop:"9px",borderTop:`1px solid ${T.border}`}}>
                      {lastPom.tasks.slice(0,3).map(t=>(
                        <div key={t.id} style={{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",color:t.done?T.muted:T.text,marginBottom:"3px",textDecoration:t.done?"line-through":"none"}}>
                          {t.done?<Check size={10} color="#00ff94"/>:<span style={{width:"10px",height:"10px",border:`1px solid ${T.border}`,borderRadius:"3px",display:"inline-block"}}/>}
                          {t.title}
                        </div>
                      ))}
                      {lastPom.tasks.length>3&&<div style={{color:T.muted,fontSize:"10px"}}>+{lastPom.tasks.length-3} more</div>}
                    </div>
                  )}
                </div>
                {pomHistory.length>1&&<div style={{color:T.muted,fontSize:"11px",textAlign:"center"}}>{pomHistory.length-1} more · <button onClick={()=>setSec("focus")} style={{background:"none",border:"none",color:accent,cursor:"pointer",fontSize:"11px",fontFamily:bodyFont,padding:0}}>View all →</button></div>}
              </div>
          }
        </div>
      </div>
      <div style={glass()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"13px"}}>
          <h3 style={{fontFamily:"Syne",fontWeight:700,fontSize:"15px",color:T.text,margin:0}}>Recent Notes</h3>
          <button onClick={()=>setSec("notes")} style={{...btn(),fontSize:"12px",padding:"5px 11px"}}>See all →</button>
        </div>
        {[...notes].reverse().slice(0,4).map(n=>(
          <div key={n.id} onClick={()=>{setSec("notes");openNote(n);}} style={{padding:"9px 12px",borderRadius:"9px",cursor:"pointer",background:T.inp,border:`1px solid ${T.border}`,marginBottom:"7px",display:"flex",justifyContent:"space-between"}}>
            <span style={{color:T.text,fontSize:"13px",fontWeight:500}}>{n.title}</span>
            <span style={{color:T.muted,fontSize:"11px"}}>{n.date}</span>
          </div>
        ))}
        {notes.length===0&&<div style={{color:T.muted,fontSize:"13px",textAlign:"center",padding:"18px 0"}}>No notes yet. Create one! 📝</div>}
      </div>
    </div>
  );
}
