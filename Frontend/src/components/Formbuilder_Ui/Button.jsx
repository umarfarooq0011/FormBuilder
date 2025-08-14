import { cx } from "../Utilis/classnames";

export const Button = ({ className, ...p }) => (
  <button {...p} className={cx("rounded-xl px-3 py-1.5 text-sm transition", className)} />
);