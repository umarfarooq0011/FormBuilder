import { Smile, Sparkles } from "lucide-react";
import { Badge, Card, CardContent } from "../App";
import { groupStagger } from "../components/motion";
// import { motion } from "framer-motion";

const quotes = [
  "We replaced our old form tool in a day.",
  "The share link made sign‑ups so easy.",
  "Exporting results saved us hours.",
];

export const TestimonialsSection = () => {
  return (
    <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={groupStagger} className="mx-auto max-w-7xl px-6 pb-20">
      <div className="mb-8 flex items-center gap-2"><Badge className="bg-slate-800 text-slate-300">Loved by teams</Badge><Sparkles className="h-4 w-4 text-emerald-300" /></div>
      <div className="grid gap-4 md:grid-cols-3">
        {quotes.map((quote, i) => (
          <Card key={i} tilt>
            <CardContent className="p-6"><p className="text-slate-200">“{quote}”</p><div className="mt-4 flex items-center gap-2 text-sm text-slate-400"><Smile className="h-4 w-4" /> Happy customer</div></CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}