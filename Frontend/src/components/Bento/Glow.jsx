
import { Glow } from './BentoCard';

export const BentoCard = ({ title, subtitle, icon: Icon, children, className = "" }) => (
  <div className={`group relative overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] ${className}`}>
    <Glow />
    <div className="flex items-start gap-3">
      {Icon && (
        <div className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-700/70 bg-slate-900/80 ring-1 ring-inset ring-slate-700/30">
          <Icon className="h-5 w-5 text-emerald-300" />
        </div>
      )}
      <div className="min-w-0">
        <h4 className="truncate text-lg font-semibold text-slate-100">{title}</h4>
        {subtitle && <p className="mt-1 text-sm text-slate-300/90">{subtitle}</p>}
      </div>
    </div>
    {children}
  </div>
);