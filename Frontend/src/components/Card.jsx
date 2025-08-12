import { reveal } from "./Motion";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';


export const Card = ({ className = "", children, tilt = false, ...props }) => {
  if (tilt) return (
    <TiltCard className={className} {...props}>{children}</TiltCard>
  );
  return (
    <motion.div variants={reveal} className={`rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur ${className}`} {...props}>
      {children}
    </motion.div>
  );
}


export const CardHeader = ({ className = "", children, ...props }) => {
  return <div className={`p-4 pb-2 ${className}`} {...props}>{children}</div>;
}
export const CardTitle = ({ className = "", children, ...props }) => {
  return <h3 className={`text-lg font-semibold tracking-tight text-slate-100 ${className}`} {...props}>{children}</h3>;
}
export const CardContent = ({ className = "", children, ...props }) => {
  return <div className={`p-4 pt-0 ${className}`} {...props}>{children}</div>;
}