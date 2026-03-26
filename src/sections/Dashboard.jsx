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
      <div style={{marginBottom:"28px"}}>
        <h1 style={{fontFamily:"Syne",fontWeight:800,fontSize:"52px",color:T.text,margin:0,letterSpacing:"-1px"}}>{greeting[0]} Good {greeting[1]}{user?<span style={{background:`linear-gradient(135deg, ${accent}, #00e5ff)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>, {user.name.split(" ")[0]}</span>:""}!</h1>
        <p style={{color:T.muted,marginTop:"10px",fontSize:"16px"}}>{fmtDate(now)}</p>
      </div>
      <div style={{...glowGlass(accent,{marginBottom:"24px",textAlign:"center",padding:"40px 32px"}), transform: "scale(1)", transition: "transform 0.3s ease"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.02)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
        <div style={{fontSize:"96px",fontFamily:"JetBrains Mono",color:T.text,lineHeight:1,letterSpacing:"-6px",filter:`drop-shadow(0 0 36px ${accent}60)`}}>{now.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false})}</div>
        <div style={{color:T.muted,marginTop:"14px",fontSize:"14px",letterSpacing:"2px",textTransform:"uppercase",fontWeight:"600"}}>{Intl.DateTimeFormat().resolvedOptions().timeZone}</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:"20px",marginBottom:"24px"}}>
        {[["📝","Notes",notes.length,accent,"notes"],["🍅","Sessions",pomHistory.length,"#ff6b6b","focus"],["📂","Files",files.length,"#00e5ff","files"],["🔒","Secrets",vNotes.length,"#00ff94","vault"]].map(([e,l,v,clr,dest],i)=>(
          <div key={i} onClick={()=>setSec(dest)} style={{...glass({padding:"24px",cursor:"pointer",border:`1px solid ${clr}30`,background:`linear-gradient(135deg, ${T.card}, ${clr}05)`})}}
            onMouseEnter={ev=>{ev.currentTarget.style.transform="translateY(-6px)";ev.currentTarget.style.boxShadow=`0 20px 40px ${clr}25`;}}
            onMouseLeave={ev=>{ev.currentTarget.style.transform="";ev.currentTarget.style.boxShadow="";}}>
            <div style={{fontSize:"32px",marginBottom:"12px"}}>{e}</div>
            <div style={{fontSize:"48px",fontWeight:800,fontFamily:"Syne",color:clr,lineHeight:1,letterSpacing:"-1px"}}>{v}</div>
            <div style={{color:T.text,fontSize:"14px",marginTop:"6px",fontWeight:600}}>{l}</div>
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
