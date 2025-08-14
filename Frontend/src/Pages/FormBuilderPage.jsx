/* eslint-disable no-unused-vars */
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay } from "@dnd-kit/core";
import { closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { DEFAULTS, uid } from "../components/Utilis/fieldConfig";
import { TopBar } from "../components/FormBuilder/TopBar";
import { CanvasArea } from "../components/FormBuilder/CanvasArea";
import { PropertiesPanel } from "../components/FormBuilder/PropertiesPanel";
import { PalettePanel } from "../components/FormBuilder/PalettePanel";
import { FieldCard } from "../components/FormBuilder/FieldCard";
import { Button } from "../components/Formbuilder_Ui/Button"; 
import { renderLive } from "../components/FormBuilder";






export const FormBuilderPage = ()  => {
  const navigate = useNavigate();
  
  // Sensors: drag starts after 5px for mouse; touch enabled
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor)
  );

  // Core state
  const [fields, setFields] = useState([]); // [{id, type, config}]
  const [activeDrag, setActiveDrag] = useState(null); // {from: 'palette'|'canvas', item}
  const [selectedId, setSelectedId] = useState(null);
  const [showPreview, setShowPreview] = useState(false); // State for preview modal
  const selectedField = useMemo(() => fields.find((f) => f.id === selectedId) || null, [fields, selectedId]);

  // CRUD helpers
  const addField = (type, indexAt = fields.length) => {
    const base = DEFAULTS[type] ? DEFAULTS[type]() : {};
    const item = { id: uid(), type, config: base };
    const next = fields.slice();
    next.splice(indexAt, 0, item);
    setFields(next);
    setSelectedId(item.id);
  };

  const duplicateField = (id) => {
    const idx = fields.findIndex((f) => f.id === id);
    if (idx === -1) return;
    const copy = JSON.parse(JSON.stringify(fields[idx]));
    copy.id = uid();
    const next = fields.slice();
    next.splice(idx + 1, 0, copy);
    setFields(next);
    setSelectedId(copy.id);
  };

  const removeField = (id) => {
    const next = fields.filter((f) => f.id !== id);
    setFields(next);
    if (selectedId === id) setSelectedId(null);
  };

  const updateSelected = (patch) => {
    if (!selectedField) return;
    setFields((prev) => prev.map((f) => (f.id === selectedId ? { ...f, config: { ...f.config, ...patch } } : f)));
  };

  // DnD handlers
  const handleDragStart = (event) => {
    const { active } = event;
    if (String(active.id).startsWith("palette-")) {
      const type = String(active.id).replace("palette-", "");
      setActiveDrag({ from: "palette", item: { type } });
    } else {
      const item = fields.find((f) => f.id === active.id);
      setActiveDrag({ from: "canvas", item });
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveDrag(null);
    if (!over) return;
    const overId = over.id;

    // From palette: insert new field
    if (activeDrag?.from === "palette") {
      if (overId === "canvas-dropzone") {
        addField(activeDrag.item.type);
      } else {
        const idx = fields.findIndex((f) => f.id === overId);
        addField(activeDrag.item.type, idx < 0 ? fields.length : idx + 1);
      }
      return;
    }

    // From canvas: reorder
    if (activeDrag?.from === "canvas") {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = overId === "canvas-dropzone" ? fields.length - 1 : fields.findIndex((f) => f.id === overId);
      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        setFields((items) => arrayMove(items, oldIndex, newIndex));
      }
    }
  };

  // Actions
  const handlePublish = async () => {
    // Later this will save to backend
    // For now just navigate to share page
    navigate('/share');
  };  // Drag overlay for palette items
  const ActiveDragOverlay = activeDrag?.from === "palette" ? (
    <div className="rounded-xl border border-indigo-600/40 bg-indigo-600/20 px-3 py-2 text-sm text-indigo-100 shadow-xl">
      {activeDrag?.item?.type}
    </div>
  ) : null;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-neutral-950 via-neutral-950 to-black text-neutral-100">
      {/* Top bar */}
      <TopBar onPreview={() => setShowPreview(true)} onPublish={handlePublish} />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-12">
          {/* Palette */}
          <div className="md:col-span-3">
            <PalettePanel onAdd={(type) => addField(type)} />
          </div>

          {/* Canvas */}
          <div className="md:col-span-6">
            <CanvasArea
              fields={fields}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onDuplicate={duplicateField}
              onRemove={removeField}
            />
          </div>

          {/* Properties */}
          <div className="md:col-span-3">
            <PropertiesPanel selectedField={selectedField} updateSelected={updateSelected} />
          </div>
        </div>

        <DragOverlay>
          {activeDrag?.from === "palette" ? (
            <div className="rounded-xl border border-indigo-600/40 bg-indigo-600/20 px-3 py-2 text-sm text-indigo-100 shadow-xl">
              {activeDrag.item.type}
            </div>
          ) : activeDrag?.from === "canvas" ? (
            <div className="opacity-75">
              <FieldCard
                field={activeDrag.item}
                selected={false}
                onSelect={() => {}}
                onDuplicate={() => {}}
                onRemove={() => {}}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Preview Modal */}
      <PreviewModal
        open={showPreview}
        onClose={() => setShowPreview(false)}
        fields={fields}
      />
    </div>
  );
}

// Local state for preview modal
import { useState as useReactState } from "react";


function PreviewModal({ open, onClose, fields }) {
  const [show, setShow] = useReactState(open);
  // keep simple: control via props
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/60 p-4" onClick={onClose}>
      <div className="w-full max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-950 p-5" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <div className="text-lg font-semibold">Preview</div>
          <Button onClick={onClose} className="border border-neutral-700 hover:bg-neutral-900">Close</Button>
        </div>
        <form className="space-y-4">
          {fields.map((f) => (
            <div key={f.id}>
              <div className="mb-1 text-sm text-neutral-300">{f.config.label}</div>
              {renderLive(f)}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}