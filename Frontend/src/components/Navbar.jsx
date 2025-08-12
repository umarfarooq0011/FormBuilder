import { Badge, Button } from "../App";
import { rm } from "./Motion";

export const Navbar = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="sticky top-0 z-50 w-full border-b border-slate-800/70 bg-black/50 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <motion.div animate={!rm && { y: [0, -4, 0] }} transition={!rm && { duration: 4, repeat: Infinity, ease: "easeInOut" }} className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 text-black font-bold shadow-[0_8px_20px_rgba(34,211,238,0.35)]">F</motion.div>
          <span className="text-sm font-semibold tracking-wide text-slate-100">FormForge</span>
          <Badge className="ml-2 hidden bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-500/30 sm:inline">New</Badge>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#how" className="hover:text-white">How it works</a>
          <a href="#flow" className="hover:text-white">End‑to‑end flow</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden md:inline">Try demo</Button>
          <Button magnetic className="rounded-2xl">Start building</Button>
        </div>
      </div>
    </motion.div>
  );
}