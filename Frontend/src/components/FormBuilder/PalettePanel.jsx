import { useMemo, useState } from "react";
import { PALETTE } from "../Utilis/fieldConfig";
import { Card } from "../Formbuilder_Ui/Card";
import { Input } from "../Formbuilder_Ui/Input";
import { PaletteDraggable } from "./dnd";


export const PalettePanel = ({ onAdd, activeDragOverlay }) => {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => PALETTE.filter(p => (p.label + p.type).toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  return (
    <Card className="overflow-visible">
      <div className="mb-2 text-sm font-semibold text-neutral-300">Fields</div>
      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Fields" className="mb-3" />
      <div className="grid grid-cols-1 gap-2 overflow-visible">
        {filtered.map((p) => (
          <PaletteDraggable key={p.type} id={`palette-${p.type}`}>
            <button
              type="button"
              onClick={() => onAdd(p.type)}
              className="w-full text-left rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-200 hover:bg-neutral-900"
            >
              {p.label}
              <span className="float-right text-neutral-500">Drag or click</span>
            </button>
          </PaletteDraggable>
        ))}
      </div>
      {activeDragOverlay}
    </Card>
  );
};