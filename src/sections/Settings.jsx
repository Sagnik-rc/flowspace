/* sections/Settings.jsx */
import { X, Check, Crown, LogOut, User } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Settings() {
  const { T, accent, dark, glass, glowGlass, inp, btn, bodyFont, fontSize,
          mode, setMode, setAccent, setBodyFont, setFontSize, bgImage, setBgImage, bgRef, handleBgUpload,
          isPro, subPlan, setShowSubscription, cancelSub, notes, tabs, files, FREE_LIMITS,
          user, logout, setShowAuth } = useApp();

  return (
    <div style={{maxWidth:"620px",margin:"0 auto"}}>
      <h2 style={{fontFamily:"Syne",fontWeight:800,fontSize:"26px",color:T.text,margin:"0 0 4px"}}>Customize ✨</h2>
      <p style={{color:T.muted,fontSize:"13px",marginBottom:"20px"}}>All settings apply instantly.</p>

      {/* Color Mode */}
      <div style={{...glass({marginBottom:"10px"})}}>
        <div style={{color:T.muted,fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"12px"}}>🌓 Color Mode</div>
        <div style={{display:"flex",gap:"8px"}}>
          {[["dark","🌙 Dark"],["light","☀️ Light"]].map(([m,l])=>(
            <button key={m} onClick={()=>setMode(m)} style={{...btn(mode===m),flex:1,justifyContent:"center"}}>{l}</button>
          ))}
        </div>
      </div>

      {/* Accent */}
      <div style={{...glass({marginBottom:"10px"})}}>
        <div style={{color:T.muted,fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"12px"}}>🎨 Accent Color</div>
        <div style={{display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
          {["#7c5cfc","#f43f5e","#00e5ff","#00ff94","#ff9f43","#ffd32a","#5352ed","#ff6b81","#a29bfe","#fd79a8"].map(c2=>(
            <button key={c2} onClick={()=>setAccent(c2)} style={{width:"28px",height:"28px",borderRadius:"50%",background:c2,border:accent===c2?"3px solid white":"3px solid transparent",cursor:"pointer",transform:accent===c2?"scale(1.2)":"scale(1)",boxShadow:accent===c2?`0 0 10px ${c2}`:"none",transition:"all .15s"}}/>
          ))}
          <label style={{position:"relative",cursor:"pointer"}}>
            <div style={{width:"28px",height:"28px",borderRadius:"50%",background:"conic-gradient(red,yellow,lime,cyan,blue,magenta,red)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px"}}>+</div>
            <input type="color" value={accent} onChange={e=>setAccent(e.target.value)} style={{opacity:0,position:"absolute",inset:0,cursor:"pointer"}}/>
          </label>
        </div>
      </div>

      {/* Font */}
      <div style={{...glass({marginBottom:"10px"})}}>
        <div style={{color:T.muted,fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"12px"}}>🔤 Body Font</div>
        <div style={{display:"flex",gap:"7px",flexWrap:"wrap"}}>
          {[["Outfit","Outfit"],["Syne","Syne Bold"],["JetBrains Mono","Mono"]].map(([f,l])=>(
            <button key={f} onClick={()=>setBodyFont(f)} style={{...btn(bodyFont===f),fontFamily:f}}>{l}</button>
          ))}
        </div>
      </div>

      {/* Font size */}
      <div style={{...glass({marginBottom:"10px"})}}>
        <div style={{color:T.muted,fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"12px"}}>📏 Font Size — {fontSize}px</div>
        <div style={{display:"flex",alignItems:"center",gap:"11px"}}>
          <span style={{color:T.muted,fontSize:"12px"}}>12</span>
          <input type="range" min="12" max="20" value={fontSize} onChange={e=>setFontSize(+e.target.value)} style={{flex:1,accentColor:accent,cursor:"pointer"}}/>
          <span style={{color:T.muted,fontSize:"12px"}}>20</span>
          <span style={{fontFamily:bodyFont,fontSize:`${fontSize}px`,color:T.text,background:T.inp,padding:"4px 10px",borderRadius:"8px",border:`1px solid ${T.border}`}}>Aa</span>
        </div>
      </div>

      {/* Background */}
      <div style={{...glass({marginBottom:"10px"})}}>
        <div style={{color:T.muted,fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"12px"}}>🖼️ Custom Background Image</div>
        <div style={{display:"flex",gap:"9px",alignItems:"center",flexWrap:"wrap"}}>
          <label style={{...btn(false),cursor:"pointer",display:"flex",alignItems:"center",gap:"6px"}}>
            📁 Upload Image<input ref={bgRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleBgUpload}/>
          </label>
          {bgImage&&<button onClick={()=>setBgImage(null)} style={{...btn(false),color:"#f43f5e",borderColor:"#f43f5e30"}}><X size={12}/> Remove</button>}
        </div>
        {bgImage&&<div style={{marginTop:"11px",borderRadius:"11px",overflow:"hidden",border:`1px solid ${T.border}`,height:"80px",position:"relative"}}><img src={bgImage} alt="bg" style={{width:"100%",height:"100%",objectFit:"cover"}}/><div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.44)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontSize:"12px",fontWeight:600}}>✅ Background active</span></div></div>}
      </div>

      {/* Subscription */}
      <div style={{...glass({marginBottom:"10px",border:`1px solid ${isPro?"#ffd32a40":accent+"30"}`})}}>
        <div style={{color:T.muted,fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"12px",display:"flex",alignItems:"center",gap:"6px"}}>
          <Crown size={11} color={isPro?"#ffd32a":T.muted}/> Subscription
        </div>
        {isPro?(
          <div>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}>
              <div style={{background:"linear-gradient(135deg,#ffd32a,#ff9f43)",borderRadius:"10px",padding:"8px 14px",fontFamily:"Syne",fontWeight:800,fontSize:"13px",color:"#000"}}>✨ PRO</div>
              <div>
                <div style={{color:T.text,fontWeight:600,fontSize:"14px"}}>FlowSpace Pro — Active</div>
                <div style={{color:T.muted,fontSize:"11px"}}>{subPlan==="monthly"?"Monthly · ₹199/mo":"Annual · ₹1,999/yr"} · Renews automatically</div>
              </div>
            </div>
            <button onClick={cancelSub} style={{...btn(),fontSize:"12px",padding:"7px 14px",color:"#f43f5e",borderColor:"#f43f5e30"}}>Cancel Subscription</button>
          </div>
        ):(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"7px",marginBottom:"13px"}}>
              {[["Notes",notes.length,FREE_LIMITS.notes],["Code Files",tabs.length,FREE_LIMITS.tabs],["File Uploads",files.length,FREE_LIMITS.files]].map(([l,used,max])=>(
                <div key={l} style={{background:T.inp,borderRadius:"9px",padding:"9px 11px",border:`1px solid ${used>=max?"#f43f5e40":T.border}`}}>
                  <div style={{color:used>=max?"#f43f5e":accent,fontFamily:"JetBrains Mono",fontWeight:700,fontSize:"18px"}}>{used}/{max}</div>
                  <div style={{color:T.muted,fontSize:"10px",marginTop:"2px"}}>{l}</div>
                </div>
              ))}
            </div>
            <button onClick={()=>setShowSubscription(true)} style={{...btn(true),justifyContent:"center",width:"100%",background:"linear-gradient(135deg,#ffd32a,#ff9f43)",border:"none",color:"#000",fontWeight:700}}>
              <Crown size={14}/> Upgrade to Pro
            </button>
          </div>
        )}
      </div>

      {/* Account */}
      <div style={{...glass({marginBottom:"10px"})}}>
        <div style={{color:T.muted,fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"12px"}}>👤 Account</div>
        {user?(
          <div style={{display:"flex",alignItems:"center",gap:"12px",padding:"12px 14px",borderRadius:"12px",background:T.inp,border:`1px solid ${T.border}`}}>
            <div style={{width:"38px",height:"38px",borderRadius:"50%",background:`${accent}30`,border:`1px solid ${accent}60`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px"}}>
              {user.provider==="google"?"🔵":user.provider==="github"?"⚫":"👤"}
            </div>
            <div style={{flex:1}}>
              <div style={{color:T.text,fontWeight:600,fontSize:"14px",display:"flex",alignItems:"center",gap:"7px"}}>
                {user.name} {isPro&&<span style={{background:"linear-gradient(135deg,#ffd32a,#ff9f43)",borderRadius:"6px",padding:"1px 7px",fontSize:"10px",color:"#000",fontWeight:800}}>PRO</span>}
              </div>
              <div style={{color:T.muted,fontSize:"12px"}}>{user.email}</div>
            </div>
            <button onClick={logout} style={{...btn(),padding:"7px 13px",fontSize:"12px",color:"#f43f5e",borderColor:"#f43f5e30"}}><LogOut size={12}/> Sign Out</button>
          </div>
        ):(
          <div>
            <p style={{color:T.muted,fontSize:"13px",marginBottom:"10px"}}>Sign in to sync your data across devices.</p>
            <button onClick={()=>setShowAuth(true)} style={{...btn(true)}}><User size={13}/> Sign In / Create Account</button>
          </div>
        )}
      </div>

      {/* Preview */}
      <div style={glowGlass(accent,{padding:"16px"})}>
        <div style={{color:T.muted,fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"9px"}}>👁️ Preview</div>
        <div style={{fontFamily:"Syne",fontWeight:800,fontSize:"19px",color:accent,marginBottom:"5px"}}>FlowSpace Heading</div>
        <div style={{fontFamily:bodyFont,fontSize:`${fontSize}px`,color:T.text,lineHeight:1.7}}>Body text preview in {bodyFont}.</div>
        <div style={{fontFamily:"JetBrains Mono",fontSize:"13px",color:T.muted,marginTop:"5px"}}>const flow = "yours";</div>
      </div>
    </div>
  );
}
