import { Card, CardContent } from "../components/Card";
import { groupStagger, reveal } from "../components/Motion";
// import { motion } from "framer-motion";

export const WhatItIsSection = ()  => {
  return (
    <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={groupStagger} className="mx-auto max-w-7xl px-6 pb-16">
      <Card className="border-emerald-500/20 bg-slate-900/70">
        <CardContent className="p-6 sm:p-8">
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div variants={reveal}><h3 className="text-xl font-semibold">What it is</h3><p className="mt-2 text-slate-300">A drag‑and‑drop form designer that lets you share a link to collect answers and download results.</p></motion.div>
            <motion.div variants={reveal}><h3 className="text-xl font-semibold">Where things live</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300"><li><strong>Sidebar:</strong> field types (text, number, radio, checkbox, select, date, file)</li><li><strong>Canvas:</strong> drop zone where you arrange and edit fields</li><li><strong>List:</strong> your saved forms you can open, edit, or delete</li></ul></motion.div>
            <motion.div variants={reveal}><h3 className="text-xl font-semibold">A helpful extra</h3><p className="mt-2 text-slate-300">Publish a shareable link to collect submissions, then view or export the results anytime.</p></motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}