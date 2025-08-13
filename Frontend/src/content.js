import {
  MousePointerClick,
  LayoutTemplate,
  Share2,
  FileSpreadsheet,
  BarChart3,
  Link as LinkIcon,
  CalendarCheck2,
  CheckCircle2,
  Sparkles,
  Layers3,
  Inbox,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";

export const FEATURES_BIG = [
  { icon: Layers3, title: "Design with blocks", desc: "Drag fields onto a canvas and fine‑tune labels, help text, and validation — all live.", accent: "from-emerald-500/10 to-transparent" },
  { icon: Share2, title: "Share in one click", desc: "Publish a clean link or embed the form on any site. No hosting drama.", accent: "from-cyan-500/10 to-transparent" },
  { icon: Inbox, title: "See every reply", desc: "A single inbox for submissions with filters, search, and instant export.", accent: "from-amber-400/10 to-transparent" },
];

export const MINI_FEATURES = [
  { icon: MousePointerClick, label: "Drag & drop" },
  { icon: ShieldCheck, label: "Private by default" },
  { icon: FileSpreadsheet, label: "CSV/XLSX export" },
  { icon: LinkIcon, label: "Embeds" },
  { icon: BarChart3, label: "Insights" },
  { icon: CalendarCheck2, label: "Quick to launch" },
];

export const STEPS = [
  { title: "Design", desc: "Arrange fields and set rules.", hint: "WYSIWYG" },
  { title: "Share", desc: "Publish a link or embed.", hint: "One click" },
  { title: "Collect", desc: "Track results in one place.", hint: "Export anytime" },
];

// Useful re-exports for icons used inline in App sections
export { CheckCircle2, ShieldCheck, CalendarCheck2, LinkIcon, Sparkles, Layers3, Share2, Inbox, UploadCloud, LayoutTemplate, MousePointerClick };