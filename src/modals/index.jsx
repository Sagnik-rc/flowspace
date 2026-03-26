/* ─────────────────────────────────────────────────────────────────────────
   modals/index.jsx   —   All overlay modals exported from one place.
   Import:  import { AuthModal, SpotifyModal, CalendarModal,
                     PomPopup, SubscriptionModal, SessionCompleteModal } from "../modals";
───────────────────────────────────────────────────────────────────────── */
import { X, Play, Pause, RotateCcw, SkipForward, Check, CheckSquare, Square, Crown } from "lucide-react";
import { useApp } from "../context/AppContext";
import DraggableWidget from "../components/DraggableWidget";

/* ── AUTH MODAL ──────────────────────────────────────────────────────── */
export function AuthModal() {
  const { T, accent, bodyFont, dark, glass, inp, btn, showAuth, setShowAuth,
          authTab, setAuthTab, authEmail, setAuthEmail, authPass, setAuthPass,
          authName, setAuthName, authErr, authBusy, handleEmailAuth, handleSocial } = useApp();
  if (!showAuth) return null;
  return (
    <div style={{position:"fixed",inset:0,zIndex:900,background:"rgba(5,5,14,0.93)",backdropFilter:"blur(18px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
      <div style={{width:"100%",maxWidth:"400px",background:dark?"rgba(12,8,30,0.99)":"rgba(252,250,255,0.99)",border:`1px solid ${accent}45`,borderRadius:"26px",overflow:"hidden",boxShadow:`0 40px 120px ${accent}25`,animation:"authPop .4s cubic-bezier(.34,1.56,.64,1)"}}>
        <div style={{height:"3px",background:`linear-gradient(90deg,${accent},#00e5ff,#00ff94)`}}/>
        <div style={{padding:"30px"}}>
          <div style={{textAlign:"center",marginBottom:"24px"}}>
            <div style={{width:"52px",height:"52px",borderRadius:"16px",background:`linear-gradient(135deg,${accent},#00e5ff)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"24px",margin:"0 auto 10px",boxShadow:`0 0 28px ${accent}50`}}>🌊</div>
            <div style={{fontFamily:"Syne",fontWeight:800,fontSize:"20px",color:T.text,marginBottom:"3px"}}>FlowSpace</div>
            <div style={{color:T.muted,fontSize:"13px"}}>{authTab==="login"?"Welcome back! 👋":"Create your account 🌊"}</div>
          </div>
          <div style={{display:"flex",gap:"4px",background:T.inp,borderRadius:"12px",padding:"4px",marginBottom:"20px"}}>
            {[["login","Sign In"],["signup","Sign Up"]].map(([t,l])=>(
              <button key={t} onClick={()=>setAuthTab(t)} style={{flex:1,padding:"8px",borderRadius:"9px",border:"none",cursor:"pointer",background:authTab===t?accent:"transparent",color:authTab===t?"#fff":T.muted,fontFamily:"Syne",fontWeight:authTab===t?700:400,fontSize:"13px",transition:"all .2s"}}>{l}</button>
            ))}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"16px"}}>
            {[{p:"google",icon:"🔵",label:"Continue with Google"},{p:"github",icon:"⚫",label:"Continue with GitHub"}].map(({p,icon,label})=>(
              <button key={p} onClick={()=>handleSocial(p)} disabled={authBusy} style={{display:"flex",alignItems:"center",gap:"10px",padding:"11px 15px",borderRadius:"12px",border:`1px solid ${T.border}`,background:T.inp,cursor:"pointer",color:T.text,fontFamily:bodyFont,fontSize:"14px",fontWeight:500,opacity:authBusy?.5:1}}>
                <span style={{fontSize:"17px"}}>{icon}</span><span style={{flex:1,textAlign:"left"}}>{label}</span>
                {authBusy&&<div style={{width:"12px",height:"12px",borderRadius:"50%",border:"2px solid "+accent,borderTopColor:"transparent",animation:"spin .7s linear infinite"}}/>}
              </button>
            ))}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"11px",marginBottom:"16px"}}>
            <div style={{flex:1,height:"1px",background:T.border}}/><span style={{color:T.muted,fontSize:"11px"}}>or email</span><div style={{flex:1,height:"1px",background:T.border}}/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
            {authTab==="signup"&&<input value={authName} onChange={e=>setAuthName(e.target.value)} placeholder="Your name" style={{...inp()}}/>}
            <input type="email" value={authEmail} onChange={e=>setAuthEmail(e.target.value)} placeholder="Email address" style={{...inp()}}/>
            <input type="password" value={authPass} onChange={e=>setAuthPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleEmailAuth()} placeholder="Password" style={{...inp()}}/>
            {authErr&&<div style={{color:"#f43f5e",fontSize:"12px",padding:"7px 11px",borderRadius:"8px",background:"#f43f5e15",border:"1px solid #f43f5e30"}}>{authErr}</div>}
            <button onClick={handleEmailAuth} disabled={authBusy} style={{...btn(true),justifyContent:"center",padding:"12px",fontSize:"14px",fontWeight:700,borderRadius:"12px",opacity:authBusy?.6:1,marginTop:"2px"}}>
              {authBusy?"Please wait...":authTab==="login"?"Sign In 🚀":"Create Account 🌊"}
            </button>
          </div>
          <button onClick={()=>setShowAuth(false)} style={{display:"block",width:"100%",background:"none",border:"none",cursor:"pointer",color:T.muted,fontSize:"12px",marginTop:"14px",textDecoration:"underline",fontFamily:bodyFont}}>Skip for now</button>
        </div>
      </div>
    </div>
  );
}

/* ── SPOTIFY MODAL ───────────────────────────────────────────────────── */
export function SpotifyModal() {
  const { T, glass, inp, btn, dark, spotOpen, setSpotOpen, spotConnected, setSpotConnected,
          spotUrl, setSpotUrl, spotEmbed, setSpotEmbed, connectSpotify, loadSpot, user } = useApp();
  if (!spotOpen) return null;
  return (
    <DraggableWidget id="spotify" title="Spotify Web Player" icon="🎵" color="#1ed760" onClose={() => setSpotOpen(false)} defaultPos={{ x: window.innerWidth - 380, y: window.innerHeight - 560 }} width="340px" height="440px">
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", height: "100%" }}>
        {!spotConnected ? (
          <div style={{ textAlign: "center", margin: "auto" }}>
            <div style={{ fontSize: "56px", marginBottom: "16px", filter: "drop-shadow(0 8px 16px rgba(30,215,96,0.4))" }}>🎵</div>
            <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "18px", color: T.text, marginBottom: "8px" }}>Connect Spotify</div>
            <div style={{ color: T.muted, fontSize: "13px", marginBottom: "24px", lineHeight: 1.5 }}>Log in to access your playlists and control playback seamlessly.</div>
            <button onClick={connectSpotify} style={{ ...btn(true, "#1ed760"), width: "100%", justifyContent: "center" }}>Link Account</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
              <input value={spotUrl} onChange={e=>setSpotUrl(e.target.value)} onKeyDown={e=>e.key==="Enter"&&loadSpot()} placeholder="Paste Spotify link..." style={{...inp({flex:1, fontSize:"12px", padding:"10px 14px"})}}/>
              <button onClick={loadSpot} style={{...btn(true,"#1ed760"), padding:"10px 16px"}}>Load</button>
            </div>
            <div style={{ flex: 1, minHeight: 0, borderRadius: "16px", overflow: "hidden", border: `1px solid ${T.border}`, background: "rgba(0,0,0,0.2)" }}>
              {spotEmbed ? <iframe src={spotEmbed} width="100%" height="100%" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style={{display:"block"}} title="Spotify"/> : <div style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: T.muted, fontSize: "13px"}}>Paste link above 👆</div>}
            </div>
            <button onClick={()=>{setSpotConnected(false);setSpotEmbed("");setSpotUrl("");}} style={{...btn(), justifyContent:"center", width:"100%", marginTop:"12px", fontSize:"12px", color:T.muted, padding: "10px"}}>Disconnect Spotify</button>
          </div>
        )}
      </div>
    </DraggableWidget>
  );
}

/* ── CALENDAR MODAL ──────────────────────────────────────────────────── */
export function CalendarModal() {
  const { T, glass, inp, btn, dark, calOpen, setCalOpen, calConnected, setCalConnected,
          calUrl, setCalUrl, calEmbed, setCalEmbed, connectCal, user } = useApp();
  if (!calOpen) return null;
  return (
    <DraggableWidget id="calendar" title="Google Calendar" icon="📅" color="#4285f4" onClose={() => setCalOpen(false)} defaultPos={{ x: 40, y: window.innerHeight - 560 }} width="380px" height="460px">
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", height: "100%" }}>
        {!calConnected ? (
          <div style={{ textAlign: "center", margin: "auto" }}>
            <div style={{ fontSize: "56px", marginBottom: "16px", filter: "drop-shadow(0 8px 16px rgba(66,133,244,0.4))" }}>📅</div>
            <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "18px", color: T.text, marginBottom: "8px" }}>Link Calendar</div>
            <div style={{ color: T.muted, fontSize: "13px", marginBottom: "24px", lineHeight: 1.5 }}>Sync Google Calendar to view and edit your upcoming events directly.</div>
            <button onClick={connectCal} style={{ ...btn(true, "#4285f4"), width: "100%", justifyContent: "center" }}>Sign In with Google</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
              <input value={calUrl} onChange={e=>setCalUrl(e.target.value)} onKeyDown={e=>e.key==="Enter"&&setCalEmbed(calUrl.trim())} placeholder="Paste embed URL..." style={{...inp({flex:1, fontSize:"12px", padding:"10px 14px"})}}/>
              <button onClick={()=>setCalEmbed(calUrl.trim())} style={{...btn(true,"#4285f4"), padding:"10px 16px"}}>Load</button>
            </div>
            <div style={{ flex: 1, minHeight: 0, borderRadius: "16px", overflow: "hidden", border: `1px solid ${T.border}`, background: "rgba(255,255,255,0.02)" }}>
              {calEmbed ? <iframe src={calEmbed} width="100%" height="100%" frameBorder="0" style={{display:"block"}} title="Google Calendar"/> : <div style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: T.muted, fontSize: "13px"}}>Paste embed URL above 👆</div>}
            </div>
            <button onClick={()=>{setCalConnected(false);setCalEmbed("");setCalUrl("");}} style={{...btn(), justifyContent:"center", width:"100%", marginTop:"12px", fontSize:"12px", color:T.muted, padding: "10px"}}>Disconnect Calendar</button>
          </div>
        )}
      </div>
    </DraggableWidget>
  );
}

/* ── POMODORO POPUP ──────────────────────────────────────────────────── */
export function PomPopup() {
  const { T, accent, btn, bodyFont, dark, pomPopup, setPomPopup,
          pomPhase, pomTime, pomRunning, pomSessions, desired, showDone,
          flowtimeEl, flowtimeRun, pomFmtId, fmtSecs, phaseColor, pomPct,
          tasks, setTasks, showTasksPopup, setShowTasksPopup,
          spotConnected, spotEmbed, spotUrl, setSpotUrl, loadSpot,
          POM_FORMATS, startPom, pausePom, resetPom, skipPhase } = useApp();
  if (!pomPopup) return null;

  const r = 88, circ = 2 * Math.PI * r;
  return (
    <div style={{position:"fixed",inset:0,zIndex:800,background:"rgba(5,5,14,0.92)",backdropFilter:"blur(20px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
      <div style={{width:"100%",maxWidth:"480px",background:dark?"rgba(10,6,26,0.99)":"rgba(252,250,255,0.99)",border:`1px solid ${phaseColor[pomPhase]}35`,borderRadius:"28px",overflow:"hidden",boxShadow:`0 40px 100px ${phaseColor[pomPhase]}20`}}>
        <div style={{height:"4px",background:`linear-gradient(90deg,${phaseColor[pomPhase]},${phaseColor[pomPhase]}80)`}}/>
        <div style={{padding:"26px 26px 22px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"}}>
            <div>
              <div style={{fontFamily:"Syne",fontWeight:800,fontSize:"17px",color:T.text}}>
                {showDone?"🎉 Session Done!":pomPhase==="work"?"🧠 Deep Focus":pomPhase==="break"?"☕ Short Break":"🌿 Long Break"}
              </div>
              <div style={{color:T.muted,fontSize:"12px",marginTop:"2px"}}>Session {pomSessions+1} of {desired} · {POM_FORMATS.find(f=>f.id===pomFmtId)?.name}</div>
            </div>
            <button onClick={()=>{setPomPopup(false);pausePom();}} style={{...btn(),padding:"7px 12px",fontSize:"12px"}}>Minimise ↙</button>
          </div>
          {showDone&&<div style={{textAlign:"center",marginBottom:"16px"}}><div style={{fontSize:"52px",animation:"donePulse .5s ease-out"}}>🎵</div><div style={{color:phaseColor[pomPhase],fontFamily:"Syne",fontWeight:700,fontSize:"15px",marginTop:"7px"}}>Time's up! Starting break...</div></div>}
          {!showDone&&(
            <div style={{display:"flex",justifyContent:"center",marginBottom:"20px"}}>
              <div style={{position:"relative",width:"200px",height:"200px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <svg style={{position:"absolute",inset:0,transform:"rotate(-90deg)"}} width="200" height="200">
                  <circle cx="100" cy="100" r={r} fill="none" stroke={T.border} strokeWidth="8"/>
                  <circle cx="100" cy="100" r={r} fill="none" stroke={phaseColor[pomPhase]} strokeWidth="8"
                    strokeDasharray={circ} strokeDashoffset={circ*(1-pomPct()/100)}
                    strokeLinecap="round" style={{transition:"stroke-dashoffset .9s linear",filter:`drop-shadow(0 0 10px ${phaseColor[pomPhase]})`}}/>
                </svg>
                <div style={{zIndex:1,textAlign:"center"}}>
                  <div style={{fontSize:"48px",fontFamily:"JetBrains Mono",color:phaseColor[pomPhase],letterSpacing:"-2px",lineHeight:1,filter:`drop-shadow(0 0 20px ${phaseColor[pomPhase]}60)`}}>
                    {pomFmtId==="flowtime"?fmtSecs(flowtimeEl):fmtSecs(pomTime||0)}
                  </div>
                  <div style={{color:T.muted,fontSize:"11px",marginTop:"5px"}}>{pomFmtId==="flowtime"?"elapsed":"remaining"}</div>
                </div>
              </div>
            </div>
          )}
          <div style={{display:"flex",justifyContent:"center",gap:"7px",marginBottom:"18px",flexWrap:"wrap"}}>
            {Array.from({length:desired},(_,i)=>(
              <div key={i} style={{width:"26px",height:"26px",borderRadius:"50%",background:i<pomSessions?`${accent}22`:T.inp,border:`2px solid ${i<pomSessions?accent:T.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",transition:"all .3s"}}>
                {i<pomSessions?"✓":""}
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:"9px",justifyContent:"center",marginBottom:"18px"}}>
            <button onClick={resetPom} style={{...btn(),padding:"9px 15px",fontSize:"13px"}}><RotateCcw size={13}/> Reset</button>
            <button onClick={pomRunning||flowtimeRun?pausePom:startPom} style={{...btn(true,phaseColor[pomPhase]),padding:"9px 24px",fontSize:"15px"}}>
              {pomRunning||flowtimeRun?<><Pause size={15}/>Pause</>:<><Play size={15}/>Resume</>}
            </button>
            <button onClick={skipPhase} style={{...btn(),padding:"9px 15px",fontSize:"13px"}}><SkipForward size={13}/> Skip</button>
          </div>
          {spotConnected&&spotEmbed&&(
            <div style={{marginBottom:"14px"}}>
              <div style={{color:T.muted,fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"8px",display:"flex",alignItems:"center",gap:"5px"}}><span style={{width:"7px",height:"7px",borderRadius:"50%",background:"#1ed760",display:"inline-block"}}/>🎵 Now Playing</div>
              <iframe src={spotEmbed} width="100%" height="80" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style={{borderRadius:"12px",display:"block"}} title="Spotify"/>
            </div>
          )}
          {spotConnected&&!spotEmbed&&(
            <div style={{marginBottom:"14px",background:"#1ed76012",border:"1px solid #1ed76035",borderRadius:"14px",padding:"12px 14px"}}>
              <div style={{color:"#1ed760",fontSize:"11px",fontWeight:700,marginBottom:"8px"}}>🎵 Spotify Connected — load a track</div>
              <div style={{display:"flex",gap:"6px"}}>
                <input value={spotUrl} onChange={e=>setSpotUrl(e.target.value)} onKeyDown={e=>e.key==="Enter"&&loadSpot()} placeholder="Paste Spotify link..."
                  style={{flex:1,background:"rgba(255,255,255,0.08)",border:"1px solid #1ed76040",borderRadius:"8px",padding:"7px 10px",color:T.text,fontSize:"12px",outline:"none"}}/>
                <button onClick={loadSpot} style={{padding:"7px 12px",borderRadius:"8px",border:"none",background:"#1ed760",color:"#000",fontWeight:700,fontSize:"12px",cursor:"pointer"}}>▶ Play</button>
              </div>
            </div>
          )}
          {tasks.length>0&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
                <div style={{color:T.muted,fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px"}}>📋 Tasks</div>
                <button onClick={()=>setShowTasksPopup(v=>!v)} style={{background:"none",border:"none",cursor:"pointer",color:T.muted,fontSize:"11px",fontFamily:bodyFont}}>{showTasksPopup?"Hide":"Show"}</button>
              </div>
              {showTasksPopup&&tasks.map(t=>(
                <div key={t.id} style={{display:"flex",alignItems:"center",gap:"9px",padding:"7px 11px",borderRadius:"9px",background:T.inp,border:`1px solid ${T.border}`,marginBottom:"5px"}}>
                  <button onClick={()=>setTasks(ts=>ts.map(x=>x.id===t.id?{...x,done:!x.done}:x))} style={{background:"none",border:"none",cursor:"pointer",color:t.done?accent:T.muted,padding:0,flexShrink:0}}>
                    {t.done?<CheckSquare size={15} color={accent}/>:<Square size={15}/>}
                  </button>
                  <span style={{color:T.text,fontSize:"12px",flex:1,textDecoration:t.done?"line-through":"none",opacity:t.done?.5:1}}>{t.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── SUBSCRIPTION MODAL ──────────────────────────────────────────────── */
export function SubscriptionModal() {
  const { T, accent, dark, glass, glowGlass, inp, btn, bodyFont,
          showSubscription, setShowSubscription, subTab, setSubTab,
          isPro, subPlan, cancelSub, startRazorpay, subLoading,
          notes, tabs, files, FREE_LIMITS } = useApp();
  if (!showSubscription) return null;
  return (
    <div style={{position:"fixed",inset:0,zIndex:950,background:"rgba(5,5,14,0.93)",backdropFilter:"blur(20px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}} onClick={e=>e.target===e.currentTarget&&setShowSubscription(false)}>
      <div style={{width:"100%",maxWidth:"540px",background:dark?"rgba(10,6,26,0.99)":"rgba(252,250,255,0.99)",border:"1px solid #ffd32a40",borderRadius:"28px",overflow:"hidden",boxShadow:"0 40px 120px #ffd32a20",animation:"authPop .4s cubic-bezier(.34,1.56,.64,1)"}}>
        <div style={{height:"3px",background:"linear-gradient(90deg,#ffd32a,#ff9f43,#f43f5e)"}}/>
        <div style={{padding:"26px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"22px"}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:"9px",marginBottom:"5px"}}>
                <div style={{width:"38px",height:"38px",borderRadius:"12px",background:"linear-gradient(135deg,#ffd32a,#ff9f43)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px"}}>👑</div>
                <div style={{fontFamily:"Syne",fontWeight:800,fontSize:"20px",color:T.text}}>FlowSpace Pro</div>
              </div>
              <div style={{color:T.muted,fontSize:"13px"}}>Unlock your full flow potential ✨</div>
            </div>
            <button onClick={()=>setShowSubscription(false)} style={{background:"none",border:"none",cursor:"pointer",color:T.muted}}><X size={18}/></button>
          </div>
          <div style={{display:"flex",gap:"4px",background:T.inp,borderRadius:"12px",padding:"4px",marginBottom:"20px"}}>
            {[["plans","📊 Plans"],["manage","⚙️ Manage"]].map(([t,l])=>(
              <button key={t} onClick={()=>setSubTab(t)} style={{flex:1,padding:"8px",borderRadius:"9px",border:"none",cursor:"pointer",background:subTab===t?"#ffd32a":"transparent",color:subTab===t?"#000":T.muted,fontFamily:"Syne",fontWeight:subTab===t?700:400,fontSize:"13px",transition:"all .2s"}}>{l}</button>
            ))}
          </div>
          {subTab==="plans"&&(
            <div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"18px"}}>
                <div style={{...glass({padding:"16px",border:`1px solid ${T.border}`})}}>
                  <div style={{fontFamily:"Syne",fontWeight:700,fontSize:"14px",color:T.muted,marginBottom:"10px"}}>🆓 Free</div>
                  <div style={{color:T.text,fontFamily:"JetBrains Mono",fontSize:"22px",fontWeight:700,marginBottom:"12px"}}>₹0</div>
                  {[["10 notes","📝"],["10 code files","💻"],["10 file uploads","📂"],["3 vault notes","🔐"],["Basic FlowAI","🤖"]].map(([f,e])=>(
                    <div key={f} style={{display:"flex",alignItems:"center",gap:"7px",fontSize:"12px",color:T.muted,marginBottom:"5px"}}><span>{e}</span>{f}</div>
                  ))}
                  {!isPro&&<div style={{marginTop:"12px",padding:"7px",background:T.border,borderRadius:"8px",textAlign:"center",fontSize:"11px",color:T.muted}}>Current Plan</div>}
                </div>
                <div style={{...glass({padding:"16px",border:"2px solid #ffd32a60",background:dark?"#ffd32a08":"#ffd32a05"})}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}>
                    <div style={{fontFamily:"Syne",fontWeight:800,fontSize:"14px",color:"#ffd32a"}}>✨ Pro</div>
                    <div style={{background:"#f43f5e",borderRadius:"6px",padding:"2px 7px",fontSize:"10px",color:"#fff",fontWeight:700}}>POPULAR</div>
                  </div>
                  {[["Unlimited notes","📝"],["Unlimited code","💻"],["Unlimited uploads","📂"],["Unlimited vault","🔐"],["Priority FlowAI","🤖"],["Early features","⚡"]].map(([f,e])=>(
                    <div key={f} style={{display:"flex",alignItems:"center",gap:"7px",fontSize:"12px",color:T.text,marginBottom:"5px"}}><Check size={11} color="#00ff94"/> {f}</div>
                  ))}
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"14px"}}>
                <button onClick={()=>startRazorpay("monthly")} disabled={subLoading||isPro}
                  style={{padding:"14px",borderRadius:"14px",border:"1px solid #ffd32a50",background:"transparent",cursor:isPro?"default":"pointer",color:T.text,fontFamily:bodyFont,textAlign:"center",opacity:isPro?.5:1}}>
                  <div style={{fontFamily:"Syne",fontWeight:800,fontSize:"22px",color:"#ffd32a"}}>₹199</div>
                  <div style={{fontSize:"12px",color:T.muted}}>per month</div>
                  <div style={{marginTop:"8px",padding:"6px 12px",background:"#ffd32a",borderRadius:"8px",fontWeight:700,fontSize:"12px",color:"#000"}}>{subLoading?"Loading...":"Start Monthly"}</div>
                </button>
                <button onClick={()=>startRazorpay("annual")} disabled={subLoading||isPro}
                  style={{padding:"14px",borderRadius:"14px",border:"2px solid #ffd32a",background:"linear-gradient(135deg,#ffd32a15,#ff9f4315)",cursor:isPro?"default":"pointer",color:T.text,fontFamily:bodyFont,textAlign:"center",position:"relative",opacity:isPro?.5:1}}>
                  <div style={{position:"absolute",top:"-10px",right:"12px",background:"#00ff94",borderRadius:"6px",padding:"2px 8px",fontSize:"10px",color:"#000",fontWeight:800}}>SAVE 16%</div>
                  <div style={{fontFamily:"Syne",fontWeight:800,fontSize:"22px",color:"#ffd32a"}}>₹1,999</div>
                  <div style={{fontSize:"12px",color:T.muted}}>per year · ₹166/mo</div>
                  <div style={{marginTop:"8px",padding:"6px 12px",background:"linear-gradient(135deg,#ffd32a,#ff9f43)",borderRadius:"8px",fontWeight:700,fontSize:"12px",color:"#000"}}>{subLoading?"Loading...":"Start Annual"}</div>
                </button>
              </div>
              <div style={{textAlign:"center",color:T.muted,fontSize:"11px"}}>Secured by Razorpay · Cancel anytime · No hidden charges</div>
            </div>
          )}
          {subTab==="manage"&&(
            <div>
              {isPro?(
                <div>
                  <div style={{...glowGlass("#ffd32a",{padding:"18px",marginBottom:"14px"})}}>
                    <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
                      <div style={{background:"linear-gradient(135deg,#ffd32a,#ff9f43)",borderRadius:"12px",padding:"10px 16px",fontFamily:"Syne",fontWeight:800,fontSize:"16px",color:"#000"}}>👑 PRO</div>
                      <div>
                        <div style={{color:T.text,fontWeight:700,fontSize:"15px"}}>FlowSpace Pro</div>
                        <div style={{color:T.muted,fontSize:"12px"}}>{subPlan==="monthly"?"Monthly Plan · ₹199/month":"Annual Plan · ₹1,999/year"}</div>
                        <div style={{color:"#00ff94",fontSize:"11px",marginTop:"2px"}}>✓ Active — renews automatically</div>
                      </div>
                    </div>
                  </div>
                  <button onClick={cancelSub} style={{...btn(),justifyContent:"center",width:"100%",color:"#f43f5e",borderColor:"#f43f5e30",fontSize:"13px"}}><X size={12}/> Cancel Subscription</button>
                </div>
              ):(
                <div style={{textAlign:"center",padding:"24px 0"}}>
                  <div style={{fontSize:"48px",marginBottom:"12px"}}>🆓</div>
                  <p style={{color:T.muted,fontSize:"13px",lineHeight:1.6,marginBottom:"18px"}}>Upgrade to Pro for unlimited notes, code files, and uploads.</p>
                  <button onClick={()=>setSubTab("plans")} style={{...btn(true),justifyContent:"center",background:"linear-gradient(135deg,#ffd32a,#ff9f43)",border:"none",color:"#000",fontWeight:700}}><Crown size={13}/> View Plans</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── SESSION COMPLETE MODAL ──────────────────────────────────────────── */
export function SessionCompleteModal() {
  const { T, accent, dark, glass, glowGlass, btn,
          showSessionEnd, setShowSessionEnd, desired, setDesired,
          pomFmtId, setPomFmtId, tasks, cWork, POM_FORMATS, bodyFont,
          resetPom, startPom, setSec } = useApp();
  if (!showSessionEnd) return null;
  const currentFmt = POM_FORMATS.find(f=>f.id===pomFmtId);
  return (
    <div style={{position:"fixed",inset:0,zIndex:810,background:"rgba(5,5,14,0.88)",backdropFilter:"blur(24px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",animation:"authPop .4s cubic-bezier(.34,1.56,.64,1)"}}>
      <div style={{width:"100%",maxWidth:"460px",background:dark?"rgba(8,5,20,0.99)":"rgba(252,250,255,0.99)",border:`2px solid ${accent}50`,borderRadius:"28px",overflow:"hidden",boxShadow:`0 40px 100px ${accent}30`}}>
        <div style={{height:"4px",background:`linear-gradient(90deg,${accent},#00e5ff,#00ff94)`}}/>
        <div style={{padding:"34px 30px",textAlign:"center"}}>
          <div style={{fontSize:"64px",marginBottom:"8px",animation:"donePulse .6s ease-out"}}>🏆</div>
          <div style={{fontFamily:"Syne",fontWeight:800,fontSize:"24px",color:T.text,marginBottom:"6px"}}>Session Complete!</div>
          <div style={{color:T.muted,fontSize:"14px",marginBottom:"24px",lineHeight:1.6}}>
            You crushed <span style={{color:accent,fontWeight:700}}>{desired} session{desired>1?"s":""}</span> of{" "}
            <span style={{color:accent,fontWeight:700}}>{currentFmt?.name||"Custom"}</span> 🔥
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"10px",marginBottom:"26px"}}>
            {[["🍅","Sessions",desired],["✅","Tasks done",tasks.filter(t=>t.done).length+"/"+tasks.length],["⏱️","Focus time",`${desired*(currentFmt?.work||cWork)}m`]].map(([e,l,v])=>(
              <div key={l} style={{background:T.inp,borderRadius:"12px",padding:"12px 8px",border:`1px solid ${T.border}`}}>
                <div style={{fontSize:"20px",marginBottom:"4px"}}>{e}</div>
                <div style={{color:accent,fontFamily:"JetBrains Mono",fontWeight:700,fontSize:"17px"}}>{v}</div>
                <div style={{color:T.muted,fontSize:"10px",marginTop:"2px"}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{...glowGlass(accent,{padding:"18px",marginBottom:"18px",textAlign:"left"})}}>
            <div style={{color:T.muted,fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"12px"}}>🎯 Start a New Session</div>
            <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px"}}>
              <span style={{color:T.text,fontSize:"13px",whiteSpace:"nowrap"}}>Sessions:</span>
              <button onClick={()=>setDesired(v=>Math.max(1,v-1))} style={{...btn(),width:"30px",height:"30px",padding:0,justifyContent:"center",fontSize:"18px",flexShrink:0}}>−</button>
              <span style={{fontFamily:"JetBrains Mono",fontSize:"22px",color:accent,minWidth:"30px",textAlign:"center"}}>{desired}</span>
              <button onClick={()=>setDesired(v=>Math.min(20,v+1))} style={{...btn(),width:"30px",height:"30px",padding:0,justifyContent:"center",fontSize:"18px",flexShrink:0}}>+</button>
              <div style={{flex:1}}/>
              <span style={{color:T.muted,fontSize:"11px"}}>{desired*(currentFmt?.work||cWork)} min total</span>
            </div>
            <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
              {POM_FORMATS.filter(f=>f.id!=="flowtime"&&f.id!=="custom").map(f=>(
                <button key={f.id} onClick={()=>setPomFmtId(f.id)}
                  style={{fontSize:"11px",padding:"4px 9px",borderRadius:"8px",border:`1px solid ${pomFmtId===f.id?accent:T.border}`,background:pomFmtId===f.id?`${accent}22`:"transparent",color:pomFmtId===f.id?accent:T.muted,cursor:"pointer",fontFamily:bodyFont}}>
                  {f.emoji} {f.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
          <div style={{display:"flex",gap:"10px"}}>
            <button onClick={()=>{ resetPom(); setShowSessionEnd(false); setSec("focus"); }} style={{...btn(),flex:1,justifyContent:"center",padding:"12px"}}>
              <X size={14}/> Done for now
            </button>
            <button onClick={()=>{ resetPom(); setShowSessionEnd(false); setTimeout(startPom,100); }} style={{...btn(true),flex:1,justifyContent:"center",padding:"12px",fontSize:"14px",fontWeight:700}}>
              <Play size={14}/> Start New Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
