/* ─────────────────────────────────────────────────────────────────────────
   components/DraggableWidget.jsx
   A globally draggable glass widget shell for Spotify, Calendar, etc.
───────────────────────────────────────────────────────────────────────── */
import { useRef, useEffect, useState } from "react";
import { X, GripHorizontal } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function DraggableWidget({ id, title, icon, onClose, children, defaultPos = { x: 50, y: 50 }, width = "340px", height = "400px", color = "#00e5ff" }) {
  const { T, bodyFont, dark } = useApp();
  const [pos, setPos] = useState(defaultPos);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: pos.x,
      initialY: pos.y
    };
  };

  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e) => {
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      setPos({
        x: dragRef.current.initialX + dx,
        y: dragRef.current.initialY + dy
      });
    };
    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div style={{ position: "fixed", left: pos.x, top: pos.y, zIndex: 1000, width, height, background: dark ? "rgba(10,6,26,0.85)" : "rgba(252,250,255,0.85)", border: `1px solid ${color}45`, borderRadius: "24px", overflow: "hidden", boxShadow: `0 32px 80px ${color}25, 0 8px 32px rgba(0,0,0,0.2)`, backdropFilter: "blur(32px)", display: "flex", flexDirection: "column", animation: "floatPopUp .4s cubic-bezier(.34,1.56,.64,1)", transition: isDragging ? "none" : "box-shadow 0.2s" }}>
      
      {/* Draggable Header */}
      <div onMouseDown={handleMouseDown} style={{ padding: "12px 16px", background: `linear-gradient(135deg,${color}25,transparent)`, borderBottom: `1px solid ${color}20`, display: "flex", alignItems: "center", gap: "10px", cursor: isDragging ? "grabbing" : "grab", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", borderRadius: "8px", background: color, fontSize: "12px", boxShadow: `0 0 12px ${color}60` }}>{icon}</div>
        <div style={{ flex: 1, fontFamily: "Syne", fontWeight: 800, fontSize: "14px", color: T.text, userSelect: "none" }}>{title}</div>
        <div style={{ color: T.muted, marginRight: "8px" }}><GripHorizontal size={14}/></div>
        <button onClick={onClose} onMouseDown={e => e.stopPropagation()} style={{ background: `${color}18`, border: `1px solid ${color}30`, borderRadius: "8px", cursor: "pointer", color: T.text, padding: "5px", display: "flex", transition: "all 0.15s" }}><X size={12}/></button>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}>
        {children}
      </div>

    </div>
  );
}
