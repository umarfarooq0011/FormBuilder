import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { Card } from "../Formbuilder_Ui/Card";
import { CanvasDropzone } from "./dnd";
import { FieldCard } from "./FieldCard";


export const CanvasArea = ({ fields, selectedId, onSelect, onDuplicate, onRemove }) => (
  <Card className="overflow-visible">
    <div className="mb-2 text-sm font-semibold text-neutral-300">Drag and drop fields here</div>
    <CanvasDropzone id="canvas-dropzone">
      {fields.length === 0 ? (
        <div className="grid h-[720px] place-items-center text-neutral-500">Drag fields here or click from the left</div>
      ) : (
        <SortableContext items={fields.map((f) => f.id)} strategy={rectSortingStrategy}>
          <div className="flex flex-col gap-3 overflow-visible">
            {fields.map((f) => (
              <FieldCard
                key={f.id}
                field={f}
                selected={selectedId === f.id}
                onSelect={onSelect}
                onDuplicate={onDuplicate}
                onRemove={onRemove}
              />
            ))}
          </div>
        </SortableContext>
      )}
    </CanvasDropzone>
  </Card>
);