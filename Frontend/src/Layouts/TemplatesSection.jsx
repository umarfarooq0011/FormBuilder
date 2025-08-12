import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { groupStagger } from "../components/Motion";
import { templates } from "../content.js";
// import { motion } from "framer-motion";

export const TemplatesSection = () => {
  return (
    <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={groupStagger} className="mx-auto max-w-7xl px-6 pb-20">
      <div className="mb-8 flex items-center gap-2"><Badge className="bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-400/30">Templates</Badge><span className="text-slate-300">Start faster</span></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {templates.map((t) => (
          <Card key={t.name} tilt>
            <CardHeader><CardTitle>{t.name}</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-slate-300/90">{t.blurb}</p><div className="mt-3"><Button variant="secondary" magnetic className="rounded-xl">Use this template</Button></div></CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}