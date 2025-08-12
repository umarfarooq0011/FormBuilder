// Centralized content & icon wiring
import {
  MousePointerClick,
  LayoutTemplate,
  Share2,
  FileSpreadsheet,
  BarChart3,
  Link as LinkIcon,
  CalendarCheck2,
  Smile,
  Sparkles,
  Layers3,
  Megaphone,
  Users,
  Handshake,
  Inbox,
  ShieldCheck,
} from "lucide-react";

export const features = [
  { icon: <MousePointerClick className="h-6 w-6" />, title: "Drag & drop, no code", desc: "Pick fields from the sidebar and arrange them like blocks." },
  { icon: <Layers3 className="h-6 w-6" />, title: "Tweak anything", desc: "Rename, mark required, add help text — fast." },
  { icon: <Share2 className="h-6 w-6" />, title: "Share with a link", desc: "Publish instantly and send a clean link to anyone." },
  { icon: <Inbox className="h-6 w-6" />, title: "All replies in one place", desc: "See every submission at a glance and search when you need." },
  { icon: <FileSpreadsheet className="h-6 w-6" />, title: "Export anytime", desc: "Download your results to a spreadsheet with one click." },
  { icon: <ShieldCheck className="h-6 w-6" />, title: "Private by default", desc: "You choose who can view and edit forms." },
];

export const steps = [
  { num: 1, title: "Design", desc: "Drag fields onto the page and tweak the details." },
  { num: 2, title: "Share", desc: "Publish and send a link or embed on your site." },
  { num: 3, title: "Collect", desc: "Watch responses roll in and export when you’re ready." },
];

export const templates = [
  { name: "Contact Form", blurb: "Simple way for people to reach you." },
  { name: "Event RSVP", blurb: "Track attendees and meal choices." },
  { name: "Job Application", blurb: "Collect resumes and key details." },
  { name: "Bug Report", blurb: "Let users flag issues with context." },
];

export const faqs = [
  { q: "Do I need to code?", a: "Nope. Just drag, drop, and share the link." },
  { q: "Can I embed the form on my website?", a: "Yes. Paste a tiny embed and it works anywhere." },
  { q: "Where do my responses go?", a: "They appear in your dashboard, ready to review and export." },
  { q: "Is it safe?", a: "Your forms are private to you. You control who can view and edit." },
];

export const useCases = [
  { icon: <Megaphone className="h-5 w-5" />, title: "Marketing", desc: "Run surveys and giveaways." },
  { icon: <Users className="h-5 w-5" />, title: "HR", desc: "Job applications and onboarding." },
  { icon: <Handshake className="h-5 w-5" />, title: "Support", desc: "Bug reports and feedback." },
  { icon: <BarChart3 className="h-5 w-5" />, title: "Ops", desc: "Requests and approvals." },
];

export { CalendarCheck2, Smile, Sparkles, LinkIcon, LayoutTemplate };