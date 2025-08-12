import { useMotionValue } from "framer-motion";
import { useRef } from "react";
import { rm } from "./motion";

export const TiltCard = ({ className = "", children, ...props }) => {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const t = 10;
  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect?.();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * t);
    rx.set((0.5 - py) * t);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div
      ref={ref}
      onPointerMove={!rm ? onMove : undefined}
      onPointerLeave={!rm ? onLeave : undefined}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className={`rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur will-change-transform ${className}`}
      {...props}
    >
      {!rm && (
        <motion.div
          style={{ rotateX: rx, rotateY: ry, transform: "translateZ(30px)", pointerEvents: "none" }}
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-30 [mask-image:radial-gradient(400px_200px_at_20%_0%,black,transparent)]"
        />
      )}
      {children}
    </motion.div>
  );
}