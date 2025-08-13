export const Glow = ({ className = "" }) => (
  <div className={`pointer-events-none absolute -inset-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${className}`}>
    <div className="absolute -inset-24 rounded-[3rem] bg-[conic-gradient(at_20%_10%,rgba(16,185,129,.18),transparent_40%)] blur-2xl" />
  </div>
);