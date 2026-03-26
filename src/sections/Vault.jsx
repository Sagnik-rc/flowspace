/* sections/Vault.jsx */
import { Plus, X, Check, Copy, Eye, EyeOff, Unlock, Lock, Key, Clock, ChevronDown } from "lucide-react";
import { useApp } from "../context/AppContext";
import { BlockToolbar, renderBlocks } from "../components/BlockEditor";

export default function Vault() {
  const { T, accent, glass, glowGlass, inp, btn, stitle,
          vLocked, setVLocked, pinIn, setPinIn, showPinInput, setShowPinInput, pinErr,
          vNotes, setVNotes, vActive, setVActive, vT, setVT, vBlocks, vSaved,
          showPinChange, setShowPinChange, newPin, setNewPin, confirmPin, setConfirmPin, pinChangeErr,
          autoLockSecs, setAutoLockSecs, autoLockDropdown, setAutoLockDropdown, vaultLockTimer,
          AUTO_LOCK_OPTIONS, tryUnlock, changePin, openVNote, newVNote, saveVNote,
          addVBlock, updateVBlock, delVBlock, handleVImage, handleVFile, vaultActivity } = useApp();

  return (
    <div style={{maxWidth:"760px",margin:"0 auto"}} onClick={vaultActivity}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"12px"}}>
        <h2 style={{fontFamily:"Syne",fontWeight:800,fontSize:"42px",color:T.text,margin:"0 0 4px",letterSpacing:"-1px"}}>Private Vault 🔐</h2>
        {!vLocked&&(
          <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
            <div style={{position:"relative"}}>
              <button onClick={()=>setAutoLockDropdown(v=>!v)} style={{...btn(),padding:"7px 12px",fontSize:"12px",display:"flex",alignItems:"center",gap:"6px"}}>
                <Clock size={12}/> Auto-lock: {AUTO_LOCK_OPTIONS.find(o=>o.value===autoLockSecs)?.label||"Never"} <ChevronDown size={11}/>
              </button>
              {autoLockDropdown&&(
                <div style={{position:"absolute",top:"calc(100% + 6px)",right:0,zIndex:50,background:T.sidebar,border:`1px solid ${T.border}`,borderRadius:"12px",padding:"6px",minWidth:"165px",boxShadow:"0 16px 48px rgba(0,0,0,.4)",backdropFilter:"blur(20px)"}}>
                  {AUTO_LOCK_OPTIONS.map(o=>(
                    <button key={o.value} onClick={()=>{setAutoLockSecs(o.value);setAutoLockDropdown(false);}} style={{display:"block",width:"100%",padding:"8px 12px",borderRadius:"8px",border:"none",background:autoLockSecs===o.value?`${accent}20`:"transparent",color:autoLockSecs===o.value?accent:T.text,cursor:"pointer",fontSize:"13px",textAlign:"left"}}>
                      {autoLockSecs===o.value&&<Check size={11} style={{marginRight:"6px"}}/>}{o.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={()=>setShowPinChange(v=>!v)} style={{...btn(),padding:"7px 13px",fontSize:"12px"}}><Key size={12}/> Change PIN</button>
            <button onClick={()=>{setVLocked(true);setVActive(null);clearInterval(vaultLockTimer.current);}} style={{...btn(),fontSize:"12px",padding:"7px 13px"}}><Lock size={12}/> Lock</button>
          </div>
        )}
      </div>
      <p style={{color:T.muted,fontSize:"13px",marginBottom:"20px"}}>PIN-locked private notes, images & files.</p>

      {!vLocked&&showPinChange&&(
        <div style={{...glowGlass("#f43f5e",{padding:"18px",marginBottom:"18px"})}}>
          <div style={{fontFamily:"Syne",fontWeight:700,fontSize:"14px",color:T.text,marginBottom:"12px"}}>🔑 Change Vault PIN</div>
          <div style={{display:"flex",gap:"10px",flexWrap:"wrap",alignItems:"center"}}>
            <input type="password" value={newPin} onChange={e=>setNewPin(e.target.value)} placeholder="New PIN" maxLength={8} style={{...inp({width:"140px",letterSpacing:"4px",textAlign:"center"})}}/>
            <input type="password" value={confirmPin} onChange={e=>setConfirmPin(e.target.value)} placeholder="Confirm PIN" maxLength={8} style={{...inp({width:"140px",letterSpacing:"4px",textAlign:"center"})}} onKeyDown={e=>e.key==="Enter"&&changePin()}/>
            <button onClick={changePin} style={{...btn(true,"#f43f5e")}}><Check size={13}/> Save PIN</button>
            <button onClick={()=>{setShowPinChange(false);}} style={{...btn()}}><X size={13}/></button>
          </div>
          {pinChangeErr&&<div style={{color:"#f43f5e",fontSize:"12px",marginTop:"9px"}}>{pinChangeErr}</div>}
        </div>
      )}

      {vLocked?(
        <div style={{...glowGlass("#f43f5e",{textAlign:"center",padding:"80px 40px",borderRadius:"36px",marginTop:"40px"})}}>
          <div style={{fontSize:"82px",marginBottom:"20px",filter:`drop-shadow(0 12px 24px #f43f5e40)`}}>🔒</div>
          <h3 style={{fontFamily:"Syne",fontWeight:800,fontSize:"32px",color:T.text,margin:"0 0 10px",letterSpacing:"-1px"}}>Vault Locked</h3>
          <p style={{color:T.muted,fontSize:"16px",marginBottom:"32px"}}>Enter your PIN to access classified content</p>
          <div style={{display:"flex",gap:"12px",maxWidth:"300px",margin:"0 auto"}}>
            <div style={{position:"relative",flex:1}}>
              <input type={showPinInput?"text":"password"} value={pinIn} onChange={e=>{setPinIn(e.target.value);}} onKeyDown={e=>e.key==="Enter"&&tryUnlock()} placeholder="Enter PIN" maxLength={8} style={{...inp({letterSpacing:"5px",textAlign:"center",paddingRight:"36px"})}}/>
              <button onClick={()=>setShowPinInput(v=>!v)} style={{position:"absolute",right:"9px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:T.muted,padding:0}}>{showPinInput?<EyeOff size={13}/>:<Eye size={13}/>}</button>
            </div>
            <button onClick={tryUnlock} style={{...btn(true,"#f43f5e")}}><Unlock size={13}/> Open</button>
          </div>
          {pinErr&&<p style={{color:"#f43f5e",fontSize:"13px",marginTop:"9px"}}>{pinErr}</p>}
          <p style={{color:T.muted,fontSize:"11px",marginTop:"12px",opacity:.6}}>Default PIN: 1234</p>
        </div>
      ):(
        <div style={{display:"flex",gap:"14px",height:"calc(100vh - 280px)"}}>
          <div style={{width:"215px",flexShrink:0,display:"flex",flexDirection:"column",gap:"7px"}}>
            <button onClick={newVNote} style={{...btn(true,"#f43f5e"),justifyContent:"center"}}><Plus size={12}/> Add Secret</button>
            <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:"5px"}}>
              {vNotes.map(n=>(
                <div key={n.id} onClick={()=>openVNote(n)} style={{...glass({padding:"10px",cursor:"pointer",border:`1px solid ${vActive===n.id?"#f43f5e":T.border}`,background:vActive===n.id?"#f43f5e20":T.card,position:"relative",transition:"all .15s"})}}>
                  <div style={{color:T.text,fontSize:"12px",fontWeight:500,paddingRight:"15px"}}>{n.title}</div>
                  <button onClick={e=>{e.stopPropagation();setVNotes(ns=>ns.filter(x=>x.id!==n.id));if(vActive===n.id)setVActive(null);}} style={{position:"absolute",top:"7px",right:"6px",background:"none",border:"none",cursor:"pointer",color:T.muted,padding:0}}><X size={10}/></button>
                </div>
              ))}
              {vNotes.length===0&&<div style={{color:T.muted,fontSize:"12px",textAlign:"center",padding:"16px 0"}}>No secrets yet 🔒</div>}
            </div>
          </div>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:"9px"}}>
            {vActive!=null?(
              <>
                <div style={{display:"flex",gap:"10px",flexShrink:0}}>
                  <input value={vT} onChange={e=>setVT(e.target.value)} style={{...inp({fontFamily:"Syne",fontWeight:800,fontSize:"28px",flex:1,background:"transparent",border:"none",padding:"0 10px"})}} placeholder="Secret title..."/>
                  <button onClick={saveVNote} style={{...btn(true,"#f43f5e"),padding:"10px 20px"}}>{vSaved?<><Check size={15}/> Saved!</>:<><Copy size={15}/> Save</>}</button>
                </div>
                <BlockToolbar addFn={addVBlock}/>
                <div style={{flex:1,overflowY:"auto",paddingRight:"4px"}}>
                  {renderBlocks(vBlocks,updateVBlock,delVBlock,handleVImage,handleVFile)}
                  {vBlocks.length===0&&<div style={{color:T.muted,fontSize:"14px",textAlign:"center",padding:"36px 0"}}>Use the toolbar above to inject classified intelligence 👆</div>}
                </div>
              </>
            ):<div style={{...glowGlass("#f43f5e",{borderRadius:"32px"}),flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:T.muted,fontSize:"18px",fontFamily:"Syne",fontWeight:700}}><div style={{fontSize:"64px",marginBottom:"16px",filter:"drop-shadow(0 8px 16px #f43f5e40)"}}>🔒</div>Select or create a secret</div>}
          </div>
        </div>
      )}
    </div>
  );
}
