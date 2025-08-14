import { Link } from "react-router-dom";
import {
  Badge,
  CalendarCheck2,
  CheckCircle2,
  Inbox,
  Layers3,
  LinkIcon,
  MousePointerClick,
  Share2,
  ShieldCheck,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { Footer } from "../components/layouts/Footer";
import { Navbar } from "../components/layouts/Navbar";
import { CursorGlow } from "../components/Ui/CursorGlow";
import { PageProgressBar } from "../components/Ui/PageProgressBar";
import { useAOS } from "../hooks/useAOS";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Button } from "../components/Ui/Button";
import { ParallaxPreview } from "../components/ParallaxPreview";
import { FEATURES_BIG, MINI_FEATURES, STEPS } from "../content";
import React, { useState } from "react";
import { BentoCard } from "../components/Bento/Glow";
import { Modal } from "../components/Ui/Modal";
import demoVideo from "../assets/live-demo_video.mp4";

const LandingPage = () => {
  useAOS();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const rm =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveal = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: rm ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const groupStagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
  };

  return (
    <>
      <div className="min-h-screen text-slate-100  [--bg1:#0b1220] [--bg2:#030711]">
        <PageProgressBar />
        <CursorGlow />

        {/* Background */}

        <div className="fixed inset-0 -z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,#0ea5e9,transparent_40%),radial-gradient(900px_500px_at_90%_10%,#10b981,transparent_40%),linear-gradient(180deg,var(--bg1),var(--bg2))]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-[linear-gradient(transparent,rgba(0,0,0,0.6)),url('https://www.transparenttextures.com/patterns/cubes.png')] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"
          />
        </div>
        <Navbar />

        {/* hero section */}

        <main className="overflow-x-hidden">
          <section className="relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pt-24 pb-16 sm:pt-28 lg:pt-32">
              <motion.div
                variants={groupStagger}
                initial="hidden"
                animate="show"
                className="grid items-center gap-12  sm:grid-cols-1 lg:grid-cols-2"
              >
                <motion.div variants={reveal}>
                  <Badge className="mb-4 bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-400/30">
                    No‑code form builder
                  </Badge>
                  <motion.h1
                    variants={reveal}
                    className="text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl"
                    style={{ textShadow: "0 1px 0 rgba(0,0,0,0.6)" }}
                  >
                    Build forms in minutes.
                    <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-white/90 bg-clip-text text-transparent">
                      Share a link. Get answers.
                    </span>
                  </motion.h1>
                  <motion.p
                    variants={reveal}
                    className="mt-6 max-w-xl text-lg text-slate-200/90"
                  >
                    Drag fields into place, share your form, and watch responses
                    roll in — all in one simple workspace.
                  </motion.p>
                  <motion.div
                    variants={reveal}
                    className="mt-8 flex flex-wrap items-center gap-3"
                  >
                   <Link to="/builder">
                     <Button size="lg" className="rounded-2xl">
                       Start building
                     </Button>
                   </Link>


                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="rounded-2xl"
                      onClick={() => setIsModalOpen(true)}
                    >
                      See a live demo
                    </Button>

                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                      <div className="aspect-video w-full overflow-hidden rounded-xl">
                        <video 
                          src={demoVideo} 
                          className="h-full w-full object-cover" 
                          controls 
                          autoPlay 
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </Modal>
                    
                    <div className="flex items-center gap-2 text-sm text-emerald-300">
                      <CheckCircle2 className="h-4 w-4" /> No sign‑up for demo
                    </div>
                  </motion.div>
                  <motion.div
                    variants={reveal}
                    className="mt-10 flex flex-wrap items-center gap-6"
                  >
                    <span className="text-xs uppercase tracking-widest text-slate-400">
                      Built for teams
                    </span>
                    <div className="h-px flex-1 bg-slate-800/70" />
                    <div className="flex items-center gap-4 text-slate-300">
                      <ShieldCheck className="h-4 w-4" />{" "}
                      <span className="text-xs">Private by default</span>
                      <span>•</span>
                      <CalendarCheck2 className="h-4 w-4" />{" "}
                      <span className="text-xs">Quick to launch</span>
                    </div>
                  </motion.div>
                </motion.div>
                <motion.div variants={reveal}>
                  <ParallaxPreview />
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* FEATURES headline */}
          <section id="features" className="mx-auto max-w-7xl px-6 pb-10">
            <div className="mb-8 flex items-end justify-between">
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Everything you need to collect answers
              </h2>
              <div className="text-sm text-slate-300">
                Fast · friendly · flexible
              </div>
            </div>
          </section>

          <div className="space-y-6 px-0">
            {FEATURES_BIG.map((f, index) => (
              <div
                key={f.title}
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                className={`relative isolate overflow-hidden py-12 sm:py-16`}
              >
                <div
                  className={`absolute inset-0 -z-10 bg-gradient-to-br ${f.accent}`}
                />
                <div className="mx-auto flex max-w-7xl items-center gap-8 px-6">
                  <div className="shrink-0">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-900/60 ring-1 ring-inset ring-slate-700">
                      {React.createElement(f.icon, {
                        className: "h-7 w-7 text-emerald-300",
                      })}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-100">
                      {f.title}
                    </h3>
                    <p className="mt-2 max-w-3xl text-slate-300">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MINI FEATURE rail */}
          <section className="mx-auto max-w-7xl px-6 py-12" data-aos="fade-up">
            <div className="mb-4 flex items-center gap-2">
              <Badge className="bg-slate-800 text-slate-300">Highlights</Badge>
              <span className="text-slate-400 text-sm">Swipe →</span>
            </div>
            <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto rounded-2xl border border-slate-800/70 bg-slate-950/40 p-3">
              {MINI_FEATURES.map((mf) => (
                <div
                  key={mf.label}
                  className="snap-start shrink-0 rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm text-slate-200 inline-flex items-center gap-2"
                >
                  {React.createElement(mf.icon, {
                    className: "h-4 w-4 text-emerald-300",
                  })}
                  {mf.label}
                </div>
              ))}
            </div>
          </section>

          {/* TIMELINE */}
          <section
            id="how"
            className="mx-auto max-w-7xl px-6 py-12"
            data-aos="fade-up"
          >
            <div className="mb-6 flex items-center gap-3">
              <Badge className="bg-cyan-500/15 text-cyan-300 ring-1 ring-inset ring-cyan-400/30">
                How it works
              </Badge>
              <span className="text-slate-300">Design → Share → Collect</span>
            </div>
            <ol className="relative ml-2 border-l border-slate-800 pl-6">
              {STEPS.map((s, idx) => (
                <li
                  key={s.title}
                  className="mb-10"
                  data-aos="fade-up"
                  data-aos-delay={idx * 80}
                >
                  <span className="absolute -left-[9px] mt-1 grid h-4 w-4 place-items-center rounded-full border border-emerald-400/40 bg-emerald-500/20"></span>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-100">
                      {s.title}
                    </h3>
                    <Badge className="bg-slate-800 text-slate-300">
                      {idx + 1}
                    </Badge>
                  </div>
                  <p className="mt-1 text-slate-300">{s.desc}</p>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/40 px-2 py-1 text-xs text-slate-400">
                    <LinkIcon className="h-3.5 w-3.5" /> {s.hint}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* End‑to‑End Bento */}
          <section className="mx-auto max-w-7xl px-6" id="end-to-end">
            <div className="mb-6 flex items-center gap-2">
              <Badge className="bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-400/30">
                End‑to‑end flow
              </Badge>
              <span className="text-slate-300">
                All the way from idea to answers
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 lg:grid-cols-12">
              {/* Tall Steps (left) */}
              <BentoCard
                title="Steps"
                subtitle="From idea to publish"
                icon={CalendarCheck2}
                className="sm:col-span-6 lg:col-span-4 lg:row-span-2"
              >
                <ol className="mt-4 space-y-3">
                  {[
                    { t: "Drag from sidebar → canvas", i: MousePointerClick },
                    { t: "Edit field settings", i: Layers3 },
                    { t: "Click Save", i: Inbox },
                    { t: "Publish & share", i: Share2 },
                  ].map((x, idx) => (
                    <li
                      key={x.t}
                      className="flex items-center gap-2 rounded-xl border border-slate-800/70 bg-slate-950/40 px-3 py-2 text-sm text-slate-200"
                    >
                      {React.createElement(x.i, {
                        className: "h-4 w-4 text-emerald-300",
                      })}
                      <span className="truncate">{x.t}</span>
                      <span className="ml-auto rounded-full border border-slate-800/60 bg-slate-900/60 px-2 py-0.5 text-[10px] text-slate-400">
                        {idx + 1}
                      </span>
                    </li>
                  ))}
                </ol>
              </BentoCard>

              {/* Big Visual (center) */}
              <BentoCard
                title="Design visually"
                subtitle="Live preview • Drag to reorder"
                icon={Layers3}
                className="sm:col-span-6 lg:col-span-5"
              >
                <div className="relative mt-5 rounded-2xl border border-slate-800/70 bg-slate-950/40 p-4">
                  <div className="grid grid-cols-3 gap-3">
                    {["Text", "Email", "Select", "Date", "File", "Radio"].map(
                      (f) => (
                        <div
                          key={f}
                          className="rounded-xl border border-slate-800/80 bg-slate-900/70 px-3 py-2 text-center text-xs text-slate-200"
                        >
                          {f}
                        </div>
                      )
                    )}
                  </div>
                  <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-400/0 via-emerald-400/10 to-transparent blur-xl" />
                </div>
              </BentoCard>

              {/* Save (top-right) */}
              <BentoCard
                title="Auto‑save"
                subtitle="Your work is safe"
                icon={UploadCloud}
                className="sm:col-span-3 lg:col-span-3"
              >
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-slate-800/70 bg-slate-950/40 p-3 text-sm text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" /> Saved a
                  few seconds ago
                </div>
              </BentoCard>

              {/* Share (bottom-right) */}
              <BentoCard
                title="Share with a link"
                subtitle="/f/team-survey"
                icon={LinkIcon}
                className="sm:col-span-3 lg:col-span-3"
              >
                <div className="mt-4 rounded-xl border border-slate-800/70 bg-slate-950/40 p-4">
                  <div className="text-sm text-slate-300">
                    One click publish
                  </div>
                  <div className="mt-2 text-xs text-slate-400">
                    Embed anywhere or copy the URL.
                  </div>
                </div>
              </BentoCard>
            </div>
          </section>

          {/* Testimonials */}
          <section className="mx-auto max-w-7xl px-6 py-12" data-aos="fade-up">
            <div className="mb-4 flex items-center gap-2">
              <Badge className="bg-slate-800 text-slate-300">
                Loved by teams
              </Badge>
              <Sparkles className="h-4 w-4 text-emerald-300" />
            </div>
            <div className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-900 to-slate-950 p-6">
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  "We replaced our old form tool in a day.",
                  "The share link made sign‑ups so easy.",
                  "Exporting results saved us hours.",
                ].map((q) => (
                  <blockquote key={q} className="text-slate-200">
                    “{q}”
                  </blockquote>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mx-auto max-w-7xl px-6 pb-24" data-aos="fade-up">
            <div className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 sm:p-10">
              <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <h3 className="text-2xl font-semibold sm:text-3xl">
                    Design once. Share everywhere.
                  </h3>
                  <p className="mt-2 max-w-2xl text-slate-300">
                    Make a form today, collect answers today. It’s that simple.
                  </p>
                </div>
                <div className="flex gap-3">
                   <Link to="/builder">
                   <Button size="lg" className="rounded-2xl">
                     Start building
                   </Button>
                   </Link>

                  <Link to="/form/sample-demo">
                  <Button size="lg" variant="secondary" className="rounded-2xl">
                    View a sample form
                  </Button>
                  </Link>
                  
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
