import { useEffect, useState } from "react";
import { rm } from "./Motion";


export const CursorGlow = ()  => {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  if (rm) return null;
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <motion.div
        animate={{ x: pos.x - 150, y: pos.y - 150 }}
        transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.4 }}
        className="h-[300px] w-[300px] rounded-full"
        style={{ background: "radial-gradient(180px 180px at center, rgba(34,211,238,0.20), transparent 70%)", filter: "blur(20px)" }}
      />
    </div>
  );
}