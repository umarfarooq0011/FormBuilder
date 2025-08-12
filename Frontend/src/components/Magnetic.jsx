/* eslint-disable no-unused-vars */
import { useMotionValue, motion } from "framer-motion";
import { useRef } from "react";

export const Magnetic = ({ strength = 20, children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const reset = () => { x.set(0); y.set(0); };
  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect?.();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set((dx / rect.width) * strength);
    y.set((dy / rect.height) * strength);
  };
  return (
    <motion.div ref={ref} style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset} className="inline-block will-change-transform">
      {children}
    </motion.div>
  );
}