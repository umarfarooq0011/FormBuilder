export const Button = ({ variant = "primary", size = "md", className = "", children, ...props }) => {
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2.5 text-sm", lg: "px-6 py-3 text-base h-12" };
  const variants = {
    primary: "bg-emerald-500 text-white shadow-[0_8px_24px_rgba(16,185,129,0.25)] hover:bg-emerald-600 active:bg-emerald-700",
    secondary: "bg-slate-800 text-slate-200 hover:bg-slate-700 active:bg-slate-600",
    ghost: "bg-transparent text-slate-200 hover:bg-slate-800/60",
    outline: "border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10",
  };
  return (
    <button
      className={`rounded-2xl font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};