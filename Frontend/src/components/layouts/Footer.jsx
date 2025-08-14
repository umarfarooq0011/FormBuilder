import logoForm from "../../assets/logoform.webp";
import { Link } from "react-router-dom";


export const Footer = () => (
  <footer className="border-t border-slate-800/70 bg-black/80">
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <img src={logoForm} alt="FormForge Logo" className="h-12 w-12 rounded-xl" />

            <span className="text-sm font-semibold tracking-wide text-slate-100">FormForge</span>
          </div>
          <p className="text-sm text-slate-400">Build forms the easy way. Share a link, collect answers, export results.</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-200">Product</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/builder" className="hover:text-white">Builder</Link></li>
            <li><Link to="/share" className="hover:text-white">My Forms</Link></li>
            <li><Link to="/" className="hover:text-white">Embeds</Link></li>
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
      <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-800/70 pt-6 text-md font-medium text-slate-500 sm:flex-row">
        <div className="" >© {new Date().getFullYear()}  FormForge, Inc. All rights reserved.</div>
        <div className="flex items-center gap-3">
          <a href="#" className="hover:text-slate-300">Terms</a>
          <span>•</span>
          <a href="#" className="hover:text-slate-300">Privacy</a>
        </div>
      </div>
    </div>
  </footer>
);