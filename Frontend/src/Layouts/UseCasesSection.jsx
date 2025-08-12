import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { groupStagger } from "../components/Motion";
import { useCases } from "../content.js";
// import { motion } from "framer-motion";

export const UseCasesSection = () => {
  return (
    <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={groupStagger} className="mx-auto max-w-7xl px-6 pb-20">
      <div className="mb-10 text-2xl font-semibold sm:text-3xl">Great for any team</div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {useCases.map((u) => (
          <Card key={u.title} tilt>
            <CardHeader><CardTitle className="flex items-center gap-2">{u.icon}{u.title}</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-slate-300/90">{u.desc}</p></CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}