import { groupStagger } from "../components/Motion";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { faqs } from "../content.js";
// import { motion } from "framer-motion";


export const FaqSection = () => {
  return (
    <motion.section id="faq" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={groupStagger} className="mx-auto max-w-7xl px-6 pb-24">
      <div className="mb-8 text-2xl font-semibold sm:text-3xl">FAQs</div>
      <div className="grid gap-4 md:grid-cols-2">
        {faqs.map((f) => (
          <Card key={f.q} tilt>
            <CardHeader><CardTitle>{f.q}</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-slate-300/90">{f.a}</p></CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}