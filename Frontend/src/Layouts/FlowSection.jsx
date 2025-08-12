import { Badge, Card, CardContent } from "../App";
import { groupStagger } from "../components/motion";
// import { motion } from "framer-motion";

const flow = [
  { t: "Drag from sidebar → canvas", d: "Pick a field and drop it where you want." },
  { t: "Edit field settings", d: "Change labels, set required, add help text." },
  { t: "Click Save", d: "We keep your form so you can come back anytime." },
  { t: "Publish & share", d: "Get a clean link like /f/your-form to collect responses." },
];

export const FlowSection = () => {
  return (
    <motion.section id="flow" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={groupStagger} className="mx-auto max-w-7xl px-6 pb-20">
      <div className="mb-6 flex items-center gap-2"><Badge className="bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-400/30">End‑to‑end flow</Badge><span className="text-slate-300">All the way from idea to answers</span></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {flow.map((x, i) => (
          <Card key={i} tilt>
            <CardContent className="p-6"><h4 className="text-base font-semibold text-slate-100">{x.t}</h4><p className="mt-2 text-sm text-slate-300">{x.d}</p></CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}