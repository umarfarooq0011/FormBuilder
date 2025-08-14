import { cx } from "../Utilis/classnames";

export const Label = ({ children }) => <div className="mb-1 text-xs text-neutral-400">{children}</div>;
export const Input = ({ className, ...p }) => (
  <input {...p} className={cx("w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-600", className)} />
);