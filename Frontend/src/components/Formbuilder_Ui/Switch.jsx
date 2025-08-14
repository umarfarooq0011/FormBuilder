import { cx } from "../Utilis/classnames";

export const Switch = ({ checked, onChange }) => (
  <button type="button" onClick={() => onChange(!checked)} className={cx("relative h-6 w-11 rounded-full transition", checked ? "bg-indigo-600" : "bg-neutral-700")}> <span className={cx("absolute top-0.5 h-5 w-5 rounded-full bg-white transition", checked ? "left-6" : "left-0.5")} /></button>
);