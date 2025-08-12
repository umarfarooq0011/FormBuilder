import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { groupStagger } from "../components/Motion";
import { features } from "../content.js";
// import { motion } from "framer-motion";

export const FeaturesSection = () => {
  return (
    <motion.section id="features" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={groupStagger} className="mx-auto max-w-7xl px-6 pb-20">
      <div className="mb-10 flex items-end justify-between"><h2 className="text-2xl font-semibold sm:text-3xl">Everything you need to collect answers</h2><div className="text-sm text-slate-300">Fast · friendly · flexible</div></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title} tilt>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-400/30">{f.icon}</div>
                {f.title}
              </CardTitle>
            </CardHeader>
            <CardContent><p className="text-sm text-slate-300/90">{f.desc}</p></CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}