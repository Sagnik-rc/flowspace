/* sections/Notes.jsx */
import { Plus, Trash2, Check, Copy } from "lucide-react";
import { useApp } from "../context/AppContext";
import { BlockToolbar, renderBlocks } from "../components/BlockEditor";

export default function Notes() {
  const { T, accent, glass, glowGlass, inp, btn, notes, activeNote, nTitle, setNTitle,
          nBlocks, nSaved, openNote, saveNote, newNote, delNote,
          addBlock, updateBlock, delBlock, handleNoteImage, handleNoteFile } = useApp();
  return (
    <div style={{display:"flex",height:"calc(100vh - 82px)",gap:"16px"}}>
      <div style={{width:"245px",flexShrink:0,display:"flex",flexDirection:"column",gap:"8px"}}>
        <button onClick={newNote} style={{...btn(true),justifyContent:"center",width:"100%",padding:"10px"}}><Plus size={14}/> New Note</button>
        <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:"6px"}}>
          {notes.map(n=>(
            <div key={n.id} onClick={()=>openNote(n)} style={{...glass({padding:"11px",cursor:"pointer",border:`1px solid ${activeNote===n.id?accent:T.border}`,background:activeNote===n.id?`${accent}15`:T.card,position:"relative",transition:"all .15s"})}}>
              <div style={{color:T.text,fontWeight:500,fontSize:"12px",paddingRight:"16px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{n.title}</div>
              <div style={{color:T.muted,fontSize:"10px",marginTop:"3px"}}>{n.date}</div>
              <button onClick={e=>{e.stopPropagation();delNote(n.id);}} style={{position:"absolute",top:"9px",right:"7px",background:"none",border:"none",cursor:"pointer",color:T.muted,padding:0}}><Trash2 size={11}/></button>
            </div>
          ))}
        </div>
      </div>
      <div style={{flex:1,display:"flex",flexDirection:"column",gap:"10px",minWidth:0}}>
        {activeNote!=null?(
          <>
            <div style={{display:"flex",gap:"9px",flexShrink:0}}>
              <input value={nTitle} onChange={e=>setNTitle(e.target.value)} style={{...inp({fontFamily:"Syne",fontWeight:700,fontSize:"18px",flex:1})}} placeholder="Note title..."/>
              <button onClick={saveNote} style={btn(true)}>{nSaved?<><Check size={13}/> Saved!</>:<><Copy size={13}/> Save</>}</button>
            </div>
            <BlockToolbar addFn={addBlock}/>
            <div style={{flex:1,overflowY:"auto",paddingRight:"4px"}}>
              {renderBlocks(nBlocks,updateBlock,delBlock,handleNoteImage,handleNoteFile)}
              {nBlocks.length===0&&<div style={{color:T.muted,fontSize:"13px",textAlign:"center",padding:"32px 0"}}>Use the toolbar above to add content 👆</div>}
            </div>
          </>
        ):(
          <div style={{...glowGlass(accent),flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"12px",textAlign:"center"}}>
            <div style={{fontSize:"48px"}}>📝</div>
            <div style={{fontFamily:"Syne",fontSize:"18px",fontWeight:700,color:T.text}}>Select or create a note</div>
            <button onClick={newNote} style={btn(true)}><Plus size={13}/> New Note</button>
          </div>
        )}
      </div>
    </div>
  );
}
