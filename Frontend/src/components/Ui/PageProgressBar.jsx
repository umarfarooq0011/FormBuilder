// eslint-disable-next-line no-unused-vars
import {motion, useScroll, useSpring } from 'framer-motion';

export const PageProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-emerald-400 via-cyan-400 to-white/70"
    />
  );
};