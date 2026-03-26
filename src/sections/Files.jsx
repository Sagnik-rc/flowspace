/* sections/Files.jsx */
import { X } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Files() {
  const { T, accent, glass, btn, files, setFiles, dragOver, setDragOver, fileDropRef, addFiles } = useApp();
  return (
    <div>
      <h2 style={{fontFamily:"Syne",fontWeight:800,fontSize:"42px",color:T.text,margin:"0 0 8px",letterSpacing:"-1px"}}>Files 📂</h2>
      <p style={{color:T.muted,fontSize:"16px",marginBottom:"24px"}}>Drag & drop or click to upload securely.</p>
      <div onDragOver={e=>{e.preventDefault();setDragOver(true);}} onDragLeave={()=>setDragOver(false)}
        onDrop={e=>{e.preventDefault();setDragOver(false);addFiles(e.dataTransfer.files);}} onClick={()=>fileDropRef.current?.click()}
        style={{...glass({border:`3px dashed ${dragOver?accent:T.border}`,background:dragOver?`${accent}10`:T.card,textAlign:"center",cursor:"pointer",padding:"80px 40px",marginBottom:"24px",transition:"all .2s",borderRadius:"32px"})}}>
        <input ref={fileDropRef} type="file" multiple style={{display:"none"}} onChange={e=>addFiles(e.target.files)}/>
        <div style={{fontSize:"72px",marginBottom:"16px",filter:`drop-shadow(0 10px 20px rgba(0,0,0,0.1))`}}>📤</div>
        <div style={{color:T.text,fontSize:"20px",fontWeight:700,fontFamily:"Syne"}}>Drop files into the void</div>
        <div style={{color:T.muted,fontSize:"14px",marginTop:"6px"}}>PDFs, images, docs, videos — anything goes</div>
      </div>
      {files.length>0?(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:"10px"}}>
          {files.map(f=>(
            <div key={f.id} style={{...glass({padding:"14px",position:"relative"})}}>
              <div style={{fontSize:"28px",marginBottom:"6px"}}>{f.emoji}</div>
              <div style={{color:T.text,fontSize:"12px",fontWeight:500,wordBreak:"break-all",marginBottom:"2px"}}>{f.name}</div>
              <div style={{color:T.muted,fontSize:"11px"}}>{f.size}</div>
              <button onClick={()=>setFiles(fs=>fs.filter(x=>x.id!==f.id))} style={{position:"absolute",top:"9px",right:"9px",background:"none",border:"none",cursor:"pointer",color:T.muted,padding:0}}><X size={11}/></button>
            </div>
          ))}
        </div>
      ):<div style={{...glass({textAlign:"center",padding:"40px"})}}>
          <div style={{fontSize:"40px",marginBottom:"9px"}}>📂</div><div style={{color:T.muted}}>No files yet</div>
        </div>}
    </div>
  );
}
