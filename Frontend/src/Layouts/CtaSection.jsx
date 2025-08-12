import { Button } from "../components/Button";
import { Card, CardContent } from "../components/Card";
import { groupStagger } from "../components/Motion";


export const CtaSection = () => {
  return (
    <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={groupStagger} className="mx-auto max-w-7xl px-6 pb-24">
      <Card className="overflow-hidden border-emerald-500/20 bg-gradient-to-br from-slate-900 to-slate-950" tilt>
        <CardContent className="p-8 sm:p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h3 className="text-2xl font-semibold sm:text-3xl">Design once. Share everywhere.</h3>
              <p className="mt-2 max-w-2xl text-slate-300">Make a form today, collect answers today. It’s that simple.</p>
            </div>
            <div className="flex gap-3">
              <Button size="lg" magnetic className="rounded-2xl">Start building</Button>
              <Button size="lg" variant="secondary" magnetic className="rounded-2xl">View a sample form</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}