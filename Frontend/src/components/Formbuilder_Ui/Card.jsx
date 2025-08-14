import { cx } from "../Utilis/classnames";

export const Card = ({ className, ...p }) => (
  <div {...p} className={cx("rounded-2xl border border-neutral-900 bg-neutral-950/60 p-3", className)} />
);