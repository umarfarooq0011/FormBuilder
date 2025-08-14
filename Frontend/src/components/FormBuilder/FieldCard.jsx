// eslint-disable-next-line no-unused-vars
import { useSortable, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cx } from "../Utilis/classnames";
import { Button } from "../Formbuilder_Ui/Button";
import { renderPreview } from "./previewRenderers";



export const FieldCard = ({ field, selected, onSelect, onDuplicate, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cx(
        "group rounded-2xl border bg-neutral-900/60 border-neutral-800 p-4 hover:border-neutral-600",
        selected && "ring-2 ring-indigo-500 border-indigo-500",
        isDragging && "opacity-50"
      )}
      onClick={() => onSelect(field.id)}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-medium text-neutral-300">{field.config.label || field.type}</div>
        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            className="border border-neutral-700 text-neutral-300"
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate(field.id);
            }}
          >
            Duplicate
          </Button>
          <Button
            className="border border-red-800/70 text-red-300"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(field.id);
            }}
          >
            Remove
          </Button>
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab rounded-lg border border-neutral-700 px-2 py-1 text-xs text-neutral-400 active:cursor-grabbing"
            title="Drag to reorder"
          >
            Drag
          </button>
        </div>
      </div>
      {renderPreview(field)}
    </div>
  );
};