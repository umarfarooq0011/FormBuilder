export const Footer = () => {
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