import { cx } from "../Utilis/classnames";

export const Textarea = ({ className, ...p }) => (
  <textarea {...p} className={cx("w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-600", className)} />
);