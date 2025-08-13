// eslint-disable-next-line no-unused-vars
import {motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { MousePointerClick, LayoutTemplate } from "lucide-react";


export const ParallaxPreview = () => {
  const rm = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useTransform(my, [-40, 40], [6, -6]);
  const rotY = useTransform(mx, [-40, 40], [-6, 6]);

  const onPointerMove = (e) => {
    const r = ref.current?.getBoundingClientRect?.();
    if (!r) return;
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    mx.set(Math.max(-40, Math.min(40, dx * 0.2)));
    my.set(Math.max(-40, Math.min(40, dy * 0.2)));
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      onPointerMove={!rm ? onPointerMove : undefined}
      onPointerLeave={!rm ? onLeave : undefined}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      className="relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-900/70">
        {!rm && (
          <motion.div
            aria-hidden
            animate={{ opacity: [0.25, 0.6, 0.25] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-br from-emerald-400/10 via-cyan-400/10 to-transparent blur-2xl"
          />
        )}
        <div className="p-4">
          <div className="flex items-center gap-2 text-slate-100" style={{ transform: "translateZ(30px)" }}>
            <LayoutTemplate className="h-5 w-5" /> Form Builder Preview
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-5 gap-4" style={{ transform: "translateZ(20px)" }}>
            <div className="col-span-2 rounded-xl border border-slate-800 bg-slate-900 p-3">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Fields</div>
              <div className="space-y-2 text-sm">
                {["Text","Email","Number","Radio","Checkbox","Select","Date","File"].map((f) => (
                  <div key={f} className="flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-900/60 px-3 py-2">
                    <span className="text-slate-100">{f}</span>
                    <MousePointerClick className="h-4 w-4 opacity-70" />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-3 space-y-3">
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Your form</div>
                <div className="space-y-2">
                  {[
                    {label:"Full Name", meta:"required"},
                    {label:"Email", meta:"required"},
                    {label:"Message", meta:"optional"}
                  ].map((x) => (
                    <div key={x.label} className="rounded-lg border border-slate-800/70 bg-slate-900/70 p-3">
                      <div className="text-sm text-slate-100">{x.label}</div>
                      <div className="text-xs text-slate-400">{x.meta}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Instant preview</div>
                <p className="text-xs text-slate-400">What you see is what they fill.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};