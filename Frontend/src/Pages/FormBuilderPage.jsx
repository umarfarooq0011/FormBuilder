import React, { useMemo, useState } from "react";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  closestCenter,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/* =========================================================
   FormBuilderPage — concise & modular (<500 lines)
   - Palette: search + drag/click add
   - Canvas: droppable + sortable, duplicate/remove, select
   - Properties: context aware controls
   - Top bar: Preview, Share, Publish (Save removed)
   - No extra state libs (no redux/zustand). Only dnd-kit.
   - Small helpers + maps to reduce switch/boilerplate.
   ========================================================= */

/********************** setup **********************/
const uid = () => Math.random().toString(36).slice(2, 9);
const cx = (...a) => a.filter(Boolean).join(" ");

const PALETTE = [
  { type: "text", label: "Input" },
  { type: "password", label: "Password" },
  { type: "email", label: "Email" },
  { type: "tel", label: "Phone" },
  { type: "url", label: "URL" },
  { type: "number", label: "Number" },
  { type: "range", label: "Range" },
  { type: "color", label: "Color" },
  { type: "date", label: "Date" },
  { type: "time", label: "Time" },
  { type: "datetime-local", label: "DateTime" },
  { type: "month", label: "Month" },
  { type: "week", label: "Week" },
  { type: "textarea", label: "Textarea" },
  { type: "select", label: "Select" },
  { type: "radio", label: "Radio" },
  { type: "checkbox", label: "Checkbox" },
  { type: "checkbox-group", label: "Checkbox Group" },
  { type: "file", label: "File" },
  { type: "switch", label: "Switch" },
];

const DEFAULTS = {
  text: () => ({ label: "Input", placeholder: "Enter text", required: false }),
  password: () => ({ label: "Password", placeholder: "••••••••", required: false }),
  email: () => ({ label: "Email", placeholder: "you@example.com", required: false }),
  tel: () => ({ label: "Phone", placeholder: "+92 3xx xxxxxxx", required: false }),
  url: () => ({ label: "URL", placeholder: "https://", required: false }),
  number: () => ({ label: "Number", min: "", max: "", step: 1, placeholder: "0", required: false }),
  range: () => ({ label: "Range", min: 0, max: 100, step: 1, required: false }),
  color: () => ({ label: "Color", required: false }),
  date: () => ({ label: "Date", min: "", max: "", required: false }),
  time: () => ({ label: "Time", required: false }),
  "datetime-local": () => ({ label: "DateTime", required: false }),
  month: () => ({ label: "Month", required: false }),
  week: () => ({ label: "Week", required: false }),
  textarea: () => ({ label: "Textarea", placeholder: "Write something", rows: 4, required: false }),
  select: () => ({ label: "Select", options: ["Option 1", "Option 2"], placeholder: "Choose...", required: false }),
  radio: () => ({ label: "Radio", options: ["Option A", "Option B"], required: false }),
  checkbox: () => ({ label: "Checkbox", required: false }),
  "checkbox-group": () => ({ label: "Checkbox Group", options: ["One", "Two", "Three"], required: false }),
  file: () => ({ label: "File", accept: ".pdf,.jpg", required: false, multiple: false }),
  switch: () => ({ label: "Enable feature", required: false }),
};

const hasProp = (field, key) => Object.prototype.hasOwnProperty.call(DEFAULTS[field.type](), key);
const hasOptions = (field) => hasProp(field, "options");
const hasMinMax = (field) => hasProp(field, "min") && hasProp(field, "max");

/********************** atoms **********************/
const Button = ({ className, ...p }) => (
  <button {...p} className={cx("rounded-xl px-3 py-1.5 text-sm transition", className)} />
);
const Card = ({ className, ...p }) => (
  <div {...p} className={cx("rounded-2xl border border-neutral-900 bg-neutral-950/60 p-3", className)} />
);
const Label = ({ children }) => <div className="mb-1 text-xs text-neutral-400">{children}</div>;
const Input = ({ className, ...p }) => (
  <input {...p} className={cx("w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-600", className)} />
);
const Textarea = ({ className, ...p }) => (
  <textarea {...p} className={cx("w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-600", className)} />
);
const Switch = ({ checked, onChange }) => (
  <button type="button" onClick={() => onChange(!checked)} className={cx("relative h-6 w-11 rounded-full transition", checked ? "bg-indigo-600" : "bg-neutral-700")}> <span className={cx("absolute top-0.5 h-5 w-5 rounded-full bg-white transition", checked ? "left-6" : "left-0.5")} /></button>
);

/********************** dnd helpers **********************/
const PaletteDraggable = ({ id, children }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });
  return (
    <div ref={setNodeRef} {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">{children}</div>
  );
};
const CanvasDropzone = ({ id, children }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} id={id} className={cx("min-h-[220px] w-full rounded-xl border border-dashed p-3", isOver ? "border-indigo-500 bg-indigo-500/5" : "border-neutral-800")}>{children}</div>
  );
};

/********************** preview/live render **********************/
const previewCommon = "w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-neutral-100 placeholder-neutral-500";
const liveCommon = "w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500";

const renderPreview = (f) => {
  const { type, config } = f;
  const inTypes = ["text","password","email","tel","url","number","date","time","datetime-local","month","week","color"];
  if (inTypes.includes(type)) return <input disabled className={previewCommon} placeholder={config.placeholder || ""} type={type} />;
  if (type === "textarea") return <Textarea disabled className={previewCommon} rows={config.rows || 4} placeholder={config.placeholder || ""} />;
  if (type === "select") return (
    <select disabled className={previewCommon}>
      <option value="">{config.placeholder || "Select..."}</option>
      {(config.options || []).map((o,i)=>(<option key={i}>{o}</option>))}
    </select>
  );
  if (type === "radio") return (
    <div className="flex flex-wrap gap-3">{(config.options||[]).map((o,i)=>(<label key={i} className="inline-flex items-center gap-2 text-neutral-300"><input disabled type="radio" className="h-4 w-4"/> {o}</label>))}</div>
  );
  if (type === "checkbox") return (<label className="inline-flex items-center gap-2 text-neutral-300"><input disabled type="checkbox" className="h-4 w-4"/> {config.label||"Checkbox"}</label>);
  if (type === "checkbox-group") return (
    <div className="flex flex-col gap-2">{(config.options||[]).map((o,i)=>(<label key={i} className="inline-flex items-center gap-2 text-neutral-300"><input disabled type="checkbox" className="h-4 w-4"/> {o}</label>))}</div>
  );
  if (type === "file") return <input disabled className={previewCommon} type="file" accept={config.accept} multiple={config.multiple} />;
  if (type === "range") return <input disabled className="w-full" type="range" min={config.min} max={config.max} step={config.step} />;
  return <div className="text-neutral-400">Unsupported</div>;
};

const renderLive = (f) => {
  const { type, config, id } = f;
  const inTypes = ["text","password","email","tel","url","number","date","time","datetime-local","month","week","color"];
  if (inTypes.includes(type)) return <input className={liveCommon} placeholder={config.placeholder || ""} type={type} required={config.required}/>;
  if (type === "textarea") return <Textarea className={liveCommon} rows={config.rows || 4} placeholder={config.placeholder || ""} required={config.required}/>;
  if (type === "select") return (
    <select className={liveCommon} required={config.required}>
      <option value="">{config.placeholder || "Select..."}</option>
      {(config.options || []).map((o,i)=>(<option key={i}>{o}</option>))}
    </select>
  );
  if (type === "radio") return (
    <div className="flex flex-wrap gap-3">{(config.options||[]).map((o,i)=>(<label key={i} className="inline-flex items-center gap-2 text-neutral-300"><input name={`r-${id}`} type="radio" className="h-4 w-4" required={config.required}/> {o}</label>))}</div>
  );
  if (type === "checkbox") return (<label className="inline-flex items-center gap-2 text-neutral-300"><input type="checkbox" className="h-4 w-4" required={config.required}/> {config.label||"Checkbox"}</label>);
  if (type === "checkbox-group") return (
    <div className="flex flex-col gap-2">{(config.options||[]).map((o,i)=>(<label key={i} className="inline-flex items-center gap-2 text-neutral-300"><input type="checkbox" className="h-4 w-4" required={config.required}/> {o}</label>))}</div>
  );
  if (type === "file") return <input className={liveCommon} type="file" accept={config.accept} multiple={config.multiple} required={config.required}/>;
  if (type === "range") return <input className="w-full" type="range" min={config.min} max={config.max} step={config.step}/>;
  return null;
};

/********************** field card **********************/
const FieldCard = ({ field, selected, onSelect, onDuplicate, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cx("group rounded-2xl border bg-neutral-900/60 border-neutral-800 p-4 hover:border-neutral-600", selected && "ring-2 ring-indigo-500 border-indigo-500", isDragging && "opacity-50")}
      onClick={() => onSelect(field.id)}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-medium text-neutral-300">{field.config.label || field.type}</div>
        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button className="border border-neutral-700 text-neutral-300" onClick={(e)=>{e.stopPropagation(); onDuplicate(field.id);}}>Duplicate</Button>
          <Button className="border border-red-800/70 text-red-300" onClick={(e)=>{e.stopPropagation(); onRemove(field.id);}}>Remove</Button>
          <button {...attributes} {...listeners} className="cursor-grab rounded-lg border border-neutral-700 px-2 py-1 text-xs text-neutral-400 active:cursor-grabbing" title="Drag to reorder">Drag</button>
        </div>
      </div>
      {renderPreview(field)}
    </div>
  );
};

/********************** main **********************/
const FormBuilderPage = () => {
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor)
  );

  const [fields, setFields] = useState([]);
  const [activeDrag, setActiveDrag] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const selectedField = useMemo(() => fields.find(f => f.id === selectedId) || null, [fields, selectedId]);

  const [q, setQ] = useState("");
  const filtered = useMemo(() => PALETTE.filter(p => (p.label + p.type).toLowerCase().includes(q.toLowerCase())), [q]);
  const [showPreview, setShowPreview] = useState(false);

  const addField = (type, indexAt = fields.length) => {
    const base = DEFAULTS[type] ? DEFAULTS[type]() : {};
    const item = { id: uid(), type, config: base };
    const next = fields.slice(); next.splice(indexAt, 0, item);
    setFields(next); setSelectedId(item.id);
  };
  const duplicateField = (id) => {
    const idx = fields.findIndex(f => f.id === id); if (idx === -1) return;
    const copy = JSON.parse(JSON.stringify(fields[idx])); copy.id = uid();
    const next = fields.slice(); next.splice(idx + 1, 0, copy); setFields(next); setSelectedId(copy.id);
  };
  const removeField = (id) => { const next = fields.filter(f => f.id !== id); setFields(next); if (selectedId === id) setSelectedId(null); };
  const updateSelected = (patch) => { if (!selectedField) return; setFields(prev => prev.map(f => f.id === selectedId ? { ...f, config: { ...f.config, ...patch } } : f)); };

  const handleDragStart = (event) => {
    const { active } = event;
    if (String(active.id).startsWith("palette-")) {
      const type = String(active.id).replace("palette-", "");
      const item = PALETTE.find(p => p.type === type);
      setActiveDrag({ from: "palette", item });
    } else {
      const item = fields.find(f => f.id === active.id);
      setActiveDrag({ from: "canvas", item });
    }
  };
  const handleDragEnd = (event) => {
    const { active, over } = event; setActiveDrag(null); if (!over) return; const overId = over.id;
    if (activeDrag?.from === "palette") {
      if (overId === "canvas-dropzone") addField(activeDrag.item.type);
      else { const idx = fields.findIndex(f => f.id === overId); addField(activeDrag.item.type, idx < 0 ? fields.length : idx + 1); }
    } else if (activeDrag?.from === "canvas") {
      const oldIndex = fields.findIndex(f => f.id === active.id);
      const newIndex = overId === "canvas-dropzone" ? fields.length - 1 : fields.findIndex(f => f.id === overId);
      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) setFields((items)=>arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleShare = () => {
    const payload = { fields };
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2)).then(() => alert("Form JSON copied to clipboard."));
  };
  const handlePublish = async () => {
    // Replace with API call to freeze a snapshot and return public URL
    alert("Publish clicked! Replace with API call to get a public URL.");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-neutral-950 via-neutral-950 to-black text-neutral-100">
      {/* Top bar */}
      <div className="sticky top-0 z-30 border-b border-neutral-900/80 bg-black/60 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-xl bg-indigo-600/20 ring-1 ring-indigo-600/50" />
            <div>
              <div className="text-sm text-neutral-400">Builder</div>
              <div className="-mt-1 text-base font-semibold">Create your form</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={()=>setShowPreview(true)} className="border border-neutral-700 hover:bg-neutral-900">Preview</Button>
            <Button onClick={handleShare} className="border border-neutral-700 hover:bg-neutral-900">Share</Button>
            <Button onClick={handlePublish} className="bg-indigo-600 text-white hover:bg-indigo-500">Publish</Button>
          </div>
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-12">
          {/* Palette */}
          <div className="md:col-span-3">
            <Card className="overflow-visible">
              <div className="mb-2 text-sm font-semibold text-neutral-300">Components</div>
              <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search components" className="mb-3" />
              <div className="grid grid-cols-1 gap-2 overflow-visible">
                {filtered.map((p)=>(
                  <PaletteDraggable key={p.type} id={`palette-${p.type}`}>
                    <button type="button" onClick={()=>addField(p.type)} className="w-full text-left rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-200 hover:bg-neutral-900">{p.label}<span className="float-right text-neutral-500">Drag or click</span></button>
                  </PaletteDraggable>
                ))}
              </div>
              <DragOverlay>{activeDrag?.from === "palette" ? <div className="rounded-xl border border-indigo-600/40 bg-indigo-600/20 px-3 py-2 text-sm text-indigo-100 shadow-xl">{activeDrag?.item?.label}</div> : null}</DragOverlay>
            </Card>
          </div>

          {/* Canvas */}
          <div className="md:col-span-6">
            <Card className="overflow-visible">
              <div className="mb-2 text-sm font-semibold text-neutral-300">Drag and drop fields here</div>
              <CanvasDropzone id="canvas-dropzone">
                {fields.length === 0 ? (
                  <div className="grid h-[220px] place-items-center text-neutral-500">Drag components here or click from the left</div>
                ) : (
                  <SortableContext items={fields.map(f=>f.id)} strategy={rectSortingStrategy}>
                    <div className="flex flex-col gap-3 overflow-visible">
                      {fields.map((f)=> (
                        <FieldCard key={f.id} field={f} selected={selectedId===f.id} onSelect={setSelectedId} onDuplicate={duplicateField} onRemove={removeField} />
                      ))}
                    </div>
                  </SortableContext>
                )}
              </CanvasDropzone>
            </Card>
          </div>

          {/* Properties */}
          <div className="md:col-span-3">
            <Card className="overflow-visible">
              <div className="mb-2 text-sm font-semibold text-neutral-300">Field Properties</div>
              {!selectedField ? (
                <div className="rounded-xl border border-neutral-800 p-3 text-sm text-neutral-500">Select a field to edit label, placeholder, required, options, rows, min/max, accept, etc.</div>
              ) : (
                <div className="space-y-3 overflow-visible">
                  <label className="block"><Label>Label</Label><Input value={selectedField.config.label||""} onChange={(e)=>updateSelected({label:e.target.value})} /></label>
                  {hasProp(selectedField, "placeholder") && (
                    <label className="block"><Label>Placeholder</Label><Input value={selectedField.config.placeholder||""} onChange={(e)=>updateSelected({placeholder:e.target.value})} /></label>
                  )}
                  {hasProp(selectedField, "rows") && (
                    <label className="block"><Label>Rows</Label><Input type="number" value={selectedField.config.rows} onChange={(e)=>updateSelected({rows:Number(e.target.value)||1})} /></label>
                  )}
                  {hasMinMax(selectedField) && (
                    <div className="grid grid-cols-2 gap-2">
                      <label className="block"><Label>Min</Label><Input value={selectedField.config.min} onChange={(e)=>updateSelected({min:e.target.value})} /></label>
                      <label className="block"><Label>Max</Label><Input value={selectedField.config.max} onChange={(e)=>updateSelected({max:e.target.value})} /></label>
                    </div>
                  )}
                  {hasProp(selectedField, "step") && (
                    <label className="block"><Label>Step</Label><Input type="number" value={selectedField.config.step} onChange={(e)=>updateSelected({step:Number(e.target.value)||1})} /></label>
                  )}
                  {hasProp(selectedField, "accept") && (
                    <label className="block"><Label>Accept (e.g. .pdf,.jpg)</Label><Input value={selectedField.config.accept} onChange={(e)=>updateSelected({accept:e.target.value})} /></label>
                  )}
                  {hasProp(selectedField, "multiple") && (
                    <label className="flex items-center justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2"><span className="text-sm text-neutral-200">Allow multiple files</span><Switch checked={!!selectedField.config.multiple} onChange={(v)=>updateSelected({multiple:v})} /></label>
                  )}
                  {hasOptions(selectedField) && (
                    <div>
                      <Label>Options (one per line)</Label>
                      <OptionsEditor options={selectedField.config.options||[]} onChange={(opts)=>updateSelected({options:opts})} />
                    </div>
                  )}
                  {hasProp(selectedField, "required") && (
                    <label className="flex items-center justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2"><span className="text-sm text-neutral-200">Required</span><Switch checked={!!selectedField.config.required} onChange={(v)=>updateSelected({required:v})} /></label>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>
      </DndContext>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/60 p-4" onClick={()=>setShowPreview(false)}>
          <div className="w-full max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-950 p-5" onClick={(e)=>e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <div className="text-lg font-semibold">Preview</div>
              <Button onClick={()=>setShowPreview(false)} className="border border-neutral-700 hover:bg-neutral-900">Close</Button>
            </div>
            <form className="space-y-4">
              {fields.map((f)=> (
                <div key={f.id}>
                  <div className="mb-1 text-sm text-neutral-300">{f.config.label}</div>
                  {renderLive(f)}
                </div>
              ))}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/********************** options editor **********************/
const OptionsEditor = ({ options, onChange }) => {
  const [text, setText] = useState(options.join("\n"));
  return (
    <Textarea rows={5} value={text} onChange={(e)=>setText(e.target.value)} onBlur={()=>onChange(text.split(/\n+/).map(s=>s.trim()).filter(Boolean))} placeholder={"Option 1\nOption 2\nOption 3"} />
  );
};

export default FormBuilderPage;
