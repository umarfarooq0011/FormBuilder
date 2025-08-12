import { steps } from "../content.js";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "../components/Badge";
import { LinkIcon } from "lucide-react";
import { groupStagger } from "../components/Motion";
// import { motion } from "framer-motion";

export const HowSection = () => {
  return (
    <motion.section id="how" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={groupStagger} className="mx-auto max-w-7xl px-6 pb-20">
      <div className="mb-8 flex items-center gap-3"><Badge className="bg-cyan-500/15 text-cyan-300 ring-1 ring-inset ring-cyan-400/30">How it works</Badge><span className="text-slate-300">Design → Share → Collect</span></div>
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <Card key={s.num} tilt>
            <CardHeader>
              <div className="flex items-center justify-between"><CardTitle>{s.title}</CardTitle><Badge className="bg-slate-800 text-slate-300">{s.num}</Badge></div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-300/90">{s.desc}</p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/40 px-2 py-1 text-xs text-slate-400"><LinkIcon className="h-3.5 w-3.5" /> Share a link or embed</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}