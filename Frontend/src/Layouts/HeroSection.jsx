import { CalendarCheck2, CheckCircle2, ShieldCheck } from "lucide-react";
import { Badge, Button } from "../components/Badge";
import { ParallaxPreview } from "../components/ParallaxPreview";
import { groupStagger, reveal } from '../components/Motion';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';



export const HeroSection = ()  => {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-16 sm:pt-28 lg:pt-32">
        <motion.div variants={groupStagger} initial="hidden" animate="show" className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div variants={reveal}>
            <Badge className="mb-4 bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-400/30">No‑code form builder</Badge>
            <motion.h1 variants={reveal} className="text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl" style={{ textShadow: "0 1px 0 rgba(0,0,0,0.6)" }}>
              Build forms in minutes.
              <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-white/90 bg-clip-text text-transparent">Share a link. Get answers.</span>
            </motion.h1>
            <motion.p variants={reveal} className="mt-6 max-w-xl text-lg text-slate-200/90">Drag fields into place, share your form, and watch responses roll in — all in one simple workspace.</motion.p>
            <motion.div variants={reveal} className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" magnetic className="rounded-2xl">Start building</Button>
              <Button size="lg" variant="outline" magnetic className="rounded-2xl">See a live demo</Button>
              <div className="flex items-center gap-2 text-sm text-emerald-300"><CheckCircle2 className="h-4 w-4" /> No sign‑up for demo</div>
            </motion.div>
            <motion.div variants={reveal} className="mt-10 flex flex-wrap items-center gap-6">
              <span className="text-xs uppercase tracking-widest text-slate-400">Built for teams</span>
              <div className="h-px flex-1 bg-slate-800/70" />
              <div className="flex items-center gap-4 text-slate-300"><ShieldCheck className="h-4 w-4" /> <span className="text-xs">Private by default</span><span>•</span><CalendarCheck2 className="h-4 w-4" /> <span className="text-xs">Quick to launch</span></div>
            </motion.div>
          </motion.div>
          <motion.div variants={reveal}>
            <ParallaxPreview />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}