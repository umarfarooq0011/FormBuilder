import React, { useRef, useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import {
  MousePointerClick,
  LayoutTemplate,
  Share2,
  FileSpreadsheet,
  BarChart3,
  Link as LinkIcon,
  CalendarCheck2,
  Smile,
  CheckCircle2,
  Sparkles,
  Layers3,
  Megaphone,
  Users,
  Handshake,
  Inbox,
  ShieldCheck,
} from "lucide-react";

// =====================================================
// ADVANCED MOTION PLAYGROUND — one file, paste & run
// Upgrades over previous version:
// 1) Scroll progress bar
// 2) Cursor-follow glow layer (GPU-friendly)
// 3) Magnetic buttons (attract to cursor)
// 4) True parallax preview card with depth
// 5) Section reveals with springy timing + reduced-motion respect
// 6) Tilt cards with pointer-based 3D
// =====================================================

// ------------- Utilities -------------
const rm = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Global reveal variants
const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: rm ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const groupStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

// ------------- UI Primitives -------------
export function Button({ variant = "primary", size = "md", className = "", children, magnetic = false, ...props }) {
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2.5 text-sm", lg: "px-6 py-3 text-base h-12" };
  const variants = {
    primary: "bg-emerald-500 text-white shadow-[0_8px_24px_rgba(16,185,129,0.25)] hover:bg-emerald-600 active:bg-emerald-700",
    secondary: "bg-slate-800 text-slate-200 hover:bg-slate-700 active:bg-slate-600",
    ghost: "bg-transparent text-slate-200 hover:bg-slate-800/60",
    outline: "border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10",
  };

  const core = (
    <motion.button
      whileTap={!rm && { scale: 0.98 }}
      className={`rounded-2xl font-medium transition will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );

  return magnetic && !rm ? <Magnetic>{core}</Magnetic> : core;
}

export function Card({ className = "", children, tilt = false, ...props }) {
  if (tilt && !rm) return <TiltCard className={className} {...props}>{children}</TiltCard>;
  return (
    <motion.div
      variants={reveal}
      className={`rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
export function CardHeader({ className = "", children, ...props }) { return <div className={`p-4 pb-2 ${className}`} {...props}>{children}</div>; }
export function CardTitle({ className = "", children, ...props }) { return <h3 className={`text-lg font-semibold tracking-tight text-slate-100 ${className}`} {...props}>{children}</h3>; }
export function CardContent({ className = "", children, ...props }) { return <div className={`p-4 pt-0 ${className}`} {...props}>{children}</div>; }
export function Badge({ className = "", children, ...props }) { return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`} {...props}>{children}</span>; }

// ------------- Motion Helpers -------------
function PageProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-emerald-400 via-cyan-400 to-white/70"
    />
  );
}

function CursorGlow() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  if (rm) return null;
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <motion.div
        animate={{ x: pos.x - 150, y: pos.y - 150 }}
        transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.4 }}
        className="h-[300px] w-[300px] rounded-full"
        style={{
          background: "radial-gradient(180px 180px at center, rgba(34,211,238,0.20), transparent 70%)",
          filter: "blur(20px)",
        }}
      />
    </div>
  );
}

function Magnetic({ strength = 20, children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const reset = () => { x.set(0); y.set(0); };
  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect?.();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set((dx / rect.width) * strength);
    y.set((dy / rect.height) * strength);
  };
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-block will-change-transform"
    >
      {children}
    </motion.div>
  );
}

function TiltCard({ className = "", children, ...props }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const t = 10; // max tilt
  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect?.();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * t);
    rx.set((0.5 - py) * t);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div
      ref={ref}
      onPointerMove={!rm ? onMove : undefined}
      onPointerLeave={!rm ? onLeave : undefined}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className={`rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur will-change-transform ${className}`}
      {...props}
    >
      {/* subtle inner glare */}
      {!rm && (
        <motion.div
          style={{ rotateX: rx, rotateY: ry, transform: "translateZ(30px)", pointerEvents: "none" }}
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-30 [mask-image:radial-gradient(400px_200px_at_20%_0%,black,transparent)]"
        />
      )}
      {children}
    </motion.div>
  );
}

// ------------- Content data (plain English) -------------
const features = [
  { icon: <MousePointerClick className="h-6 w-6" />, title: "Drag & drop, no code", desc: "Pick fields from the sidebar and arrange them like blocks." },
  { icon: <Layers3 className="h-6 w-6" />, title: "Tweak anything", desc: "Rename, mark required, add help text — fast." },
  { icon: <Share2 className="h-6 w-6" />, title: "Share with a link", desc: "Publish instantly and send a clean link to anyone." },
  { icon: <Inbox className="h-6 w-6" />, title: "All replies in one place", desc: "See every submission at a glance and search when you need." },
  { icon: <FileSpreadsheet className="h-6 w-6" />, title: "Export anytime", desc: "Download your results to a spreadsheet with one click." },
  { icon: <ShieldCheck className="h-6 w-6" />, title: "Private by default", desc: "You choose who can view and edit forms." },
];

const steps = [
  { num: 1, title: "Design", desc: "Drag fields onto the page and tweak the details." },
  { num: 2, title: "Share", desc: "Publish and send a link or embed on your site." },
  { num: 3, title: "Collect", desc: "Watch responses roll in and export when you’re ready." },
];

const templates = [
  { name: "Contact Form", blurb: "Simple way for people to reach you." },
  { name: "Event RSVP", blurb: "Track attendees and meal choices." },
  { name: "Job Application", blurb: "Collect resumes and key details." },
  { name: "Bug Report", blurb: "Let users flag issues with context." },
];

const faqs = [
  { q: "Do I need to code?", a: "Nope. Just drag, drop, and share the link." },
  { q: "Can I embed the form on my website?", a: "Yes. Paste a tiny embed and it works anywhere." },
  { q: "Where do my responses go?", a: "They appear in your dashboard, ready to review and export." },
  { q: "Is it safe?", a: "Your forms are private to you. You control who can view and edit." },
];

// ------------- Layout bits -------------
function Navbar() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="sticky top-0 z-50 w-full border-b border-slate-800/70 bg-black/50 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <motion.div animate={!rm && { y: [0, -4, 0] }} transition={!rm && { duration: 4, repeat: Infinity, ease: "easeInOut" }} className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 text-black font-bold shadow-[0_8px_20px_rgba(34,211,238,0.35)]">F</motion.div>
          <span className="text-sm font-semibold tracking-wide text-slate-100">FormForge</span>
          <Badge className="ml-2 hidden bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-500/30 sm:inline">New</Badge>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#how" className="hover:text-white">How it works</a>
          <a href="#flow" className="hover:text-white">End‑to‑end flow</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden md:inline">Try demo</Button>
          <Button magnetic className="rounded-2xl">Start building</Button>
        </div>
      </div>
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-800/70 bg-black/50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 text-black font-bold">F</div>
              <span className="text-sm font-semibold tracking-wide text-slate-100">FormForge</span>
            </div>
            <p className="text-sm text-slate-400">Build forms the easy way. Share a link, collect answers, export results.</p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-200">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#features" className="hover:text-white">Builder</a></li>
              <li><a href="#features" className="hover:text-white">Templates</a></li>
              <li><a href="#how" className="hover:text-white">Submissions</a></li>
              <li><a href="#how" className="hover:text-white">Embeds</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-200">Use cases</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#how" className="hover:text-white">Surveys</a></li>
              <li><a href="#how" className="hover:text-white">Contact</a></li>
              <li><a href="#how" className="hover:text-white">Events</a></li>
              <li><a href="#how" className="hover:text-white">Hiring</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-200">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-800/70 pt-6 text-xs text-slate-500 sm:flex-row">
          <div>© {new Date().getFullYear()} FormForge, Inc. All rights reserved.</div>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-slate-300">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ------------- Main Page -------------
export const App = () => {
  return (
    <div className="min-h-screen text-slate-100 [--bg1:#0b1220] [--bg2:#030711] [--ring:#20e3b2]">
      <PageProgressBar />
      <CursorGlow />

      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 0.8 }} className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,#0ea5e9,transparent_40%),radial-gradient(900px_500px_at_90%_10%,#10b981,transparent_40%),linear-gradient(180deg,var(--bg1),var(--bg2))]" />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 1 }} className="absolute inset-0 bg-[linear-gradient(transparent,rgba(0,0,0,0.6)),url('https://www.transparenttextures.com/patterns/cubes.png')] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]" />
      </div>

      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pt-24 pb-16 sm:pt-28 lg:pt-32">
          <motion.div variants={groupStagger} initial="hidden" animate="show" className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div variants={reveal}>
              <Badge className="mb-4 bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-400/30">No‑code form builder</Badge>
              <motion.h1 variants={reveal} className="text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl" style={{ textShadow: "0 1px 0 rgba(0,0,0,0.6)" }}>
                Build forms in minutes.
                <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-white/90 bg-clip-text text-transparent">Share a link. Get answers.</span>
              </motion.h1>
              <motion.p variants={reveal} className="mt-6 max-w-xl text-lg text-slate-200/90">Drag fields into place, share your form, and watch responses roll in — all in one simple workspace.</motion.p>
              <motion.div variants={reveal} className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" magnetic className="rounded-2xl">Start building</Button>
                <Button size="lg" variant="outline" magnetic className="rounded-2xl">See a live demo</Button>
                <div className="flex items-center gap-2 text-sm text-emerald-300"><CheckCircle2 className="h-4 w-4" /> No sign‑up for demo</div>
              </motion.div>
              <motion.div variants={reveal} className="mt-10 flex flex-wrap items-center gap-6">
                <span className="text-xs uppercase tracking-widest text-slate-400">Built for teams</span>
                <div className="h-px flex-1 bg-slate-800/70" />
                <div className="flex items-center gap-4 text-slate-300"><ShieldCheck className="h-4 w-4" /> <span className="text-xs">Private by default</span><span>•</span><CalendarCheck2 className="h-4 w-4" /> <span className="text-xs">Quick to launch</span></div>
              </motion.div>
            </motion.div>

            {/* Visual preview with true parallax */}
            <motion.div variants={reveal}>
              <ParallaxPreview />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What it is */}
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

      {/* Features */}
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

      {/* How it works */}
      <motion.section id="how" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={groupStagger} className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 flex items-center gap-3"><Badge className="bg-cyan-500/15 text-cyan-300 ring-1 ring-inset ring-cyan-400/30">How it works</Badge><span className="text-slate-300">Design → Share → Collect</span></div>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <Card key={s.num} tilt>
              <CardHeader>
                <div className="flex items-center justify-between"><CardTitle>{s.title}</CardTitle><Badge className="bg-slate-800 text-slate-300">{s.num}</Badge></div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-300/90">{s.desc}</p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/40 px-2 py-1 text-xs text-slate-400"><LinkIcon className="h-3.5 w-3.5" /> Share a link or embed</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* End‑to‑end flow */}
      <motion.section id="flow" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={groupStagger} className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-6 flex items-center gap-2"><Badge className="bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-400/30">End‑to‑end flow</Badge><span className="text-slate-300">All the way from idea to answers</span></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[{ t:"Drag from sidebar → canvas", d:"Pick a field and drop it where you want." },{ t:"Edit field settings", d:"Change labels, set required, add help text." },{ t:"Click Save", d:"We keep your form so you can come back anytime." },{ t:"Publish & share", d:"Get a clean link like /f/your-form to collect responses." }].map((x,i)=> (
            <Card key={i} tilt>
              <CardContent className="p-6"><h4 className="text-base font-semibold text-slate-100">{x.t}</h4><p className="mt-2 text-sm text-slate-300">{x.d}</p></CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Templates */}
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

      {/* Who uses it */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={groupStagger} className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 text-2xl font-semibold sm:text-3xl">Great for any team</div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <Megaphone className="h-5 w-5" />, title: "Marketing", desc: "Run surveys and giveaways." },
            { icon: <Users className="h-5 w-5" />, title: "HR", desc: "Job applications and onboarding." },
            { icon: <Handshake className="h-5 w-5" />, title: "Support", desc: "Bug reports and feedback." },
            { icon: <BarChart3 className="h-5 w-5" />, title: "Ops", desc: "Requests and approvals." },
          ].map((u) => (
            <Card key={u.title} tilt>
              <CardHeader><CardTitle className="flex items-center gap-2">{u.icon}{u.title}</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-slate-300/90">{u.desc}</p></CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={groupStagger} className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 flex items-center gap-2"><Badge className="bg-slate-800 text-slate-300">Loved by teams</Badge><Sparkles className="h-4 w-4 text-emerald-300" /></div>
        <div className="grid gap-4 md:grid-cols-3">
          {["We replaced our old form tool in a day.", "The share link made sign‑ups so easy.", "Exporting results saved us hours."].map((quote, i) => (
            <Card key={i} tilt>
              <CardContent className="p-6"><p className="text-slate-200">“{quote}”</p><div className="mt-4 flex items-center gap-2 text-sm text-slate-400"><Smile className="h-4 w-4" /> Happy customer</div></CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* FAQ */}
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

      {/* CTA */}
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

      <Footer />
    </div>
  );
};

// ------------- Parallax Preview (hero right) -------------
function ParallaxPreview() {
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
      <Card className="relative overflow-hidden border-slate-800/70 bg-slate-900/70" tilt={false}>
        {/* animated glow */}
        {!rm && (
          <motion.div
            aria-hidden
            animate={{ opacity: [0.25, 0.6, 0.25] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-br from-emerald-400/10 via-cyan-400/10 to-transparent blur-2xl"
          />
        )}
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-100" style={{ transform: "translateZ(30px)" }}>
            <LayoutTemplate className="h-5 w-5" /> Form Builder Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4" style={{ transform: "translateZ(20px)" }}>
            {/* Sidebar */}
            <div className="col-span-2 rounded-xl border border-slate-800 bg-slate-900 p-3">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Fields</div>
              <div className="space-y-2 text-sm">
                {["Text","Email","Number","Radio","Checkbox","Select","Date","File"].map((f) => (
                  <div key={f} className="flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-900/60 px-3 py-2 hover:border-emerald-500/50">
                    <span className="text-slate-100">{f}</span>
                    <MousePointerClick className="h-4 w-4 opacity-70" />
                  </div>
                ))}
              </div>
            </div>
            {/* Canvas */}
            <div className="col-span-3 space-y-3">
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Your form</div>
                <div className="space-y-2">
                  {[{label:"Full Name", meta:"required"},{label:"Email", meta:"required"},{label:"Message", meta:"optional"}].map((x) => (
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
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default App;
