/* eslint-disable no-unused-vars */
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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


// ... other imports
import { Input } from "../components/Formbuilder_Ui/Input"; 






export const FormBuilderPage = ()  => {
  const navigate = useNavigate();
  const { formId } = useParams();

  


  // Sensors: drag starts after 5px for mouse; touch enabled
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor)
  );

  // Core state
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formDescription, setFormDescription] = useState("");
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
      <TopBar 
        onPreview={() => setShowPreview(true)} 
        onPublish={handlePublish}
        title={formTitle}
        description={formDescription}
        onTitleChange={setFormTitle}
        onDescriptionChange={setFormDescription}
      />

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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 px-4 py-6 sm:p-6 md:p-8 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="relative w-full max-w-3xl rounded-2xl border border-neutral-700/50 bg-neutral-950 shadow-2xl ring-1 ring-white/10" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-neutral-800 bg-neutral-950/90 px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/50">
          <div>
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-indigo-400">
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
              </svg>
              Form Preview
            </h3>
            <p className="mt-1 text-sm text-neutral-400">This is how your form will appear to users</p>
          </div>
          <Button onClick={onClose} className="border border-neutral-700/50 hover:bg-neutral-800/50 hover:border-neutral-600 transition-all duration-200 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
            Close
          </Button>
        </div>

        {/* Form Content */}
        <div className="max-h-[calc(100vh-14rem)] overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-track-neutral-900 scrollbar-thumb-neutral-700">
          <form className="space-y-6">
            {fields.map((f, index) => (
              <div key={f.id} className="group rounded-lg border border-neutral-800/50 bg-gradient-to-b from-neutral-900/50 to-neutral-900/30 p-5 transition-all duration-200 hover:border-neutral-700/50">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-medium text-neutral-200">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-800 text-xs font-semibold text-neutral-400">
                      {index + 1}
                    </span>
                    {f.config.label}
                    {f.config.required && (
                      <span className="ml-1 text-red-500" title="Required field">*</span>
                    )}
                  </span>
                  {f.config.description && (
                    <p className="mb-3 text-sm text-neutral-500">{f.config.description}</p>
                  )}
                  <div className="relative">
                    {renderLive(f)}
                    <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10 transition-opacity group-hover:ring-white/20" />
                  </div>
                </label>
              </div>
            ))}

            {fields.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-800 p-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-12 w-12 text-neutral-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <p className="mt-4 text-neutral-400">No fields added yet. Add some fields to preview your form.</p>
                <p className="mt-2 text-sm text-neutral-600">Fields will appear here as you add them</p>
              </div>
            )}

            {fields.length > 0 && (
              <div className="sticky bottom-0 flex items-center justify-between gap-4 border-t border-neutral-800 bg-neutral-950/90 pt-4 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/50">
                <p className="text-sm text-neutral-500">{fields.length} field{fields.length !== 1 ? 's' : ''} in total</p>
                <Button className="bg-indigo-600 hover:bg-indigo-500 transition-colors duration-200">
                  Submit Form
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}