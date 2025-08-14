/********************** dnd helpers **********************/
import { useDraggable, useDroppable } from "@dnd-kit/core";

import { cx } from "../Utilis/classnames";



export const PaletteDraggable = ({ id, children }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });
  return (
    <div ref={setNodeRef} {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">{children}</div>
  );
};
export const CanvasDropzone = ({ id, children }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} id={id} className={cx("min-h-[820px] w-full rounded-xl border border-dashed p-3", isOver ? "border-indigo-500 bg-indigo-500/5" : "border-neutral-800")}>{children}</div>
  );
};