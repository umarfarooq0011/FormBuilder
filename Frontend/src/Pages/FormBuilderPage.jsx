import { useMemo, useState, useEffect } from "react";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay, closestCenter } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { PALETTE, uid, cx, DEFAULTS } from "../components/Utilis/CONSTANTS.JS";
import { ChevronLeft, ChevronRight, MenuIcon, SettingsIcon, XIcon } from "../components/Utilis/icons.jsx";
import { Button, Card, Label, Input, Textarea,
    PaletteDraggable, CanvasDropzone,
    renderLive, FieldCard,
    PropertiesPanel, GenerateWithAIModal } from "../components/FormBuilder/FormBuilderComponent";




export const FormBuilderPage = () => {
  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 8 } }), useSensor(TouchSensor));

  const [rows, setRows] = useState([]);
  const [activeDrag, setActiveDrag] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [formTitle, setFormTitle] = useState("My Awesome Form");
  const [formDescription, setFormDescription] = useState("");
  
  const [isPaletteOpen, setPaletteOpen] = useState(true);
  const [isPropertiesOpen, setPropertiesOpen] = useState(true);
  const [mobileSheet, setMobileSheet] = useState(null);
  const [showAIModal, setShowAIModal] = useState(false);

  const fields = useMemo(() => rows.flatMap(row => row.fields), [rows]);
  const selectedField = useMemo(() => fields.find(f => f.id === selectedId) || null, [fields, selectedId]);

  const [q, setQ] = useState("");
  const filteredPalette = useMemo(() => PALETTE.filter(p => (p.label + p.type).toLowerCase().includes(q.toLowerCase())), [q]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const isModalOpen = mobileSheet || showAIModal || showPreview;
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [mobileSheet, showAIModal, showPreview]);

  const findFieldLocation = (id) => {
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const fieldIndex = rows[rowIndex].fields.findIndex(f => f.id === id);
      if (fieldIndex !== -1) {
        return { rowIndex, fieldIndex, row: rows[rowIndex] };
      }
    }
    return null;
  };

  const addField = (type, rowIndex = rows.length) => {
    const newField = { id: uid(), type, config: DEFAULTS[type]?.() || {} };
    const newRow = { id: uid(), fields: [newField] };
    setRows(prev => [...prev.slice(0, rowIndex), newRow, ...prev.slice(rowIndex)]);
    setSelectedId(newField.id);
  };

  const duplicateField = (id) => {
    const location = findFieldLocation(id);
    if (!location) return;
    const { rowIndex } = location;
    const fieldToCopy = rows[rowIndex].fields.find(f => f.id === id);
    const newField = { ...JSON.parse(JSON.stringify(fieldToCopy)), id: uid() };
    const newRow = { id: uid(), fields: [newField] };
    setRows(prev => [...prev.slice(0, rowIndex + 1), newRow, ...prev.slice(rowIndex + 1)]);
    setSelectedId(newField.id);
  };

  const removeField = (id) => {
    setRows(prev => {
        const next = JSON.parse(JSON.stringify(prev));
        const location = findFieldLocation(id);
        if(!location) return next;
        const { rowIndex, fieldIndex } = location;
        next[rowIndex].fields.splice(fieldIndex, 1);
        return next.filter(row => row.fields.length > 0);
    });
    if (selectedId === id) setSelectedId(null);
  };

  const updateSelected = (patch) => {
    if (!selectedId) return;
    setRows(prev => {
        const next = JSON.parse(JSON.stringify(prev));
        const location = findFieldLocation(selectedId);
        if(!location) return next;
        const { rowIndex, fieldIndex } = location;
        const currentConfig = next[rowIndex].fields[fieldIndex].config;
        next[rowIndex].fields[fieldIndex].config = { ...currentConfig, ...patch };
        return next;
    });
  };

  const handleDragStart = ({ active }) => {
    if (String(active.id).startsWith("palette-")) {
      const type = String(active.id).replace("palette-", "");
      setActiveDrag({ from: "palette", item: PALETTE.find(p => p.type === type) });
    } else {
      setActiveDrag({ from: "canvas", item: fields.find(f => f.id === active.id) });
    }
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveDrag(null);
    if (!over || active.id === over.id) return;

    const isFromPalette = active.id.toString().startsWith('palette-');
    const overId = over.id.toString();

    if (isFromPalette) {
        const type = active.id.toString().replace('palette-', '');
        const newField = { id: uid(), type, config: DEFAULTS[type]?.() || {} };

        if (overId === 'canvas-dropzone') {
            setRows(prev => [...prev, { id: uid(), fields: [newField] }]);
        } else {
            const overLocation = findFieldLocation(overId);
            if (overLocation) {
                const { rowIndex, row } = overLocation;
                setRows(prev => {
                    const next = [...prev];
                    if (row.fields.length < 2) {
                        next[rowIndex].fields.push(newField);
                    } else {
                        next.splice(rowIndex + 1, 0, { id: uid(), fields: [newField] });
                    }
                    return next;
                });
            }
        }
        setSelectedId(newField.id);
    } else {
        const activeLocation = findFieldLocation(active.id);
        const overLocation = findFieldLocation(over.id);
        if (!activeLocation || !overLocation) return;

        setRows(prev => {
            const next = JSON.parse(JSON.stringify(prev));
            const activeField = next[activeLocation.rowIndex].fields.splice(activeLocation.fieldIndex, 1)[0];

            if (activeLocation.rowIndex === overLocation.rowIndex) {
                next[overLocation.rowIndex].fields.splice(overLocation.fieldIndex, 0, activeField);
            } else {
                if (next[overLocation.rowIndex].fields.length < 2) {
                    next[overLocation.rowIndex].fields.push(activeField);
                } else {
                    next.splice(overLocation.rowIndex + 1, 0, { id: uid(), fields: [activeField] });
                }
            }
            return next.filter(row => row.fields.length > 0);
        });
    }
  };

  const handleShare = () => {
    const payload = { title: formTitle, description: formDescription, rows };
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2))
      .then(() => alert("Form JSON copied to clipboard."))
      .catch(() => alert("Failed to copy."));
  };
  const handlePublish = () => alert("Publish clicked! Replace with API call.");

  const getGridLayoutClasses = () => {
    if (isPaletteOpen && isPropertiesOpen) return "md:grid-cols-[minmax(280px,280px)_minmax(0,1fr)_minmax(280px,280px)]";
    if (isPaletteOpen) return "md:grid-cols-[minmax(280px,280px)_minmax(0,1fr)_auto]";
    if (isPropertiesOpen) return "md:grid-cols-[auto_minmax(0,1fr)_minmax(280px,280px)]";
    return "md:grid-cols-[auto_minmax(0,1fr)_auto]";
  };

  const PalettePanelContent = () => (
      <>
        <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search..." className="mb-3" />
        <div className="grid grid-cols-1 gap-2">
          {filteredPalette.map((p)=>(
            <PaletteDraggable key={p.type} id={`palette-${p.type}`}>
              <button type="button" onClick={()=> { addField(p.type); setMobileSheet(null); }} className="w-full text-left rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-200 hover:bg-neutral-900">{p.label}</button>
            </PaletteDraggable>
          ))}
        </div>
      </>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-neutral-950 via-neutral-950 to-black text-neutral-100">
      <header className="sticky top-0 z-30 border-b border-neutral-900/80 bg-black/60 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-xl bg-indigo-600/20 ring-1 ring-indigo-600/50" />
            <div>
              <div className="text-sm text-neutral-400">Builder</div>
              <div className="-mt-1 text-base font-semibold">Create your form</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <Button onClick={()=>setShowPreview(true)} className="border border-neutral-700 hover:bg-neutral-900">Preview</Button>
              <Button onClick={handleShare} className="border border-neutral-700 hover:bg-neutral-900">Share</Button>
              <Button onClick={handlePublish} className="bg-indigo-600 text-white hover:bg-indigo-500">Publish</Button>
            </div>
            <div className="md:hidden flex items-center gap-2">
                <Button onClick={() => setMobileSheet('palette')} className="!px-2 border border-neutral-700"><MenuIcon /></Button>
                <Button onClick={() => setMobileSheet('properties')} className="!px-2 border border-neutral-700"><SettingsIcon /></Button>
            </div>
          </div>
        </div>
      </header>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className={cx("mx-auto grid max-w-screen-2xl gap-4 p-4 transition-all duration-300 grid-cols-1", getGridLayoutClasses())}>
          
          <aside className={cx("hidden md:block transition-all duration-300", isPaletteOpen ? "w-[280px]" : "w-12")}>
            <Card className="h-full overflow-y-auto p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className={cx("text-sm font-semibold text-neutral-300", !isPaletteOpen && "hidden")}>Components</div>
                <button onClick={() => setPaletteOpen(!isPaletteOpen)} className="text-neutral-400 hover:text-white">
                  {isPaletteOpen ? <ChevronLeft /> : <ChevronRight />}
                </button>
              </div>
              <div className={cx(!isPaletteOpen && "hidden")}><PalettePanelContent /></div>
            </Card>
          </aside>

          <main className="min-w-0 w-full">
            <Card className="p-4 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-grow w-full">
                      <Label>Form Title</Label>
                      <Input value={formTitle} onChange={e => setFormTitle(e.target.value)} placeholder="Enter form title" />
                  </div>
                  <Button onClick={() => setShowAIModal(true)} className="border border-indigo-500/50 bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 sm:mt-5 flex items-center gap-2 w-full sm:w-auto justify-center">
                      ✨ Generate with AI
                  </Button>
              </div>
              <div>
                  <Label>Description (Optional)</Label>
                  <Textarea value={formDescription} onChange={e => setFormDescription(e.target.value)} placeholder="Describe your form" rows={2} />
              </div>
            </Card>
            <Card className="p-3 mt-4">
              <div className="mb-2 text-sm font-semibold text-neutral-300">Canvas</div>
              <CanvasDropzone id="canvas-dropzone">
                {rows.length === 0 ? (
                  <div className="grid h-full min-h-[220px] place-items-center text-neutral-500">Drag components here</div>
                ) : (
                  <SortableContext items={fields.map(f => f.id)}>
                    <div className="flex flex-col gap-4">
                      {rows.map(row => (
                        <div key={row.id} className="flex flex-col lg:flex-row gap-4">
                          {row.fields.map(field => (
                            <div key={field.id} className="flex-1 min-w-0 w-full">
                                <FieldCard rowId={row.id} field={field} selected={selectedId === field.id} onSelect={setSelectedId} onDuplicate={duplicateField} onRemove={removeField} />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </SortableContext>
                )}
              </CanvasDropzone>
            </Card>
          </main>

          <aside className={cx("hidden md:block transition-all duration-300", isPropertiesOpen ? "w-[280px]" : "w-12")}>
            <Card className="h-full overflow-y-auto p-3">
              <div className="mb-2 flex items-center justify-between">
                <button onClick={() => setPropertiesOpen(!isPropertiesOpen)} className="text-neutral-400 hover:text-white">
                  {isPropertiesOpen ? <ChevronRight /> : <ChevronLeft />}
                </button>
                <div className={cx("text-sm font-semibold text-neutral-300", !isPropertiesOpen && "hidden")}>Properties</div>
              </div>
              <div className={cx(!isPropertiesOpen && "hidden")}>
                <PropertiesPanel selectedField={selectedField} onUpdate={updateSelected} />
              </div>
            </Card>
          </aside>
        </div>
        <DragOverlay>
            {activeDrag && (
                activeDrag.from === 'palette' ? 
                <div className="rounded-xl border border-indigo-600/40 bg-indigo-600/20 px-3 py-2 text-sm text-indigo-100 shadow-xl">{activeDrag.item?.label}</div>
                : <FieldCard field={activeDrag.item} selected={false} onSelect={()=>{}} onDuplicate={()=>{}} onRemove={()=>{}} />
            )}
        </DragOverlay>
      </DndContext>

      {mobileSheet && (
          <div className="md:hidden fixed inset-0 z-40">
              <div className="absolute inset-0 bg-black/60" onClick={() => setMobileSheet(null)}></div>
              <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] bg-neutral-950 rounded-t-2xl border-t border-neutral-800 p-4 overflow-y-auto">
                  <div className="mb-4 flex items-center justify-between">
                      <div className="text-lg font-semibold">{mobileSheet === 'palette' ? 'Components' : 'Properties'}</div>
                      <button onClick={() => setMobileSheet(null)} className="text-neutral-400 hover:text-white"><XIcon /></button>
                  </div>
                  {mobileSheet === 'palette' ? <PalettePanelContent /> : <PropertiesPanel selectedField={selectedField} onUpdate={updateSelected} />}
              </div>
          </div>
      )}

      {showPreview && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60" onClick={()=>setShowPreview(false)}>
          <div className="min-h-full px-4 py-6 md:py-12 flex items-center justify-center">
            <div className="w-full max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl" onClick={(e)=>e.stopPropagation()}>
              {/* Header with close button */}
              <div className="sticky top-0 z-10 bg-neutral-950 rounded-t-2xl border-b border-neutral-800 p-6">
                <button 
                  onClick={() => setShowPreview(false)}
                  className="absolute right-4 top-4 p-2 text-neutral-400 hover:text-white"
                >
                  <XIcon />
                </button>
                <div className="pr-8 text-center">
                  <h2 className="text-2xl font-bold text-white">{formTitle}</h2>
                  {formDescription && <p className="mt-2 text-neutral-400">{formDescription}</p>}
                </div>
              </div>

              {/* Scrollable form content */}
              <div className="max-h-[calc(85vh-8rem)] overflow-y-auto p-6">
                <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                  {rows.map(row => (
                    <div key={row.id} className="flex flex-col md:flex-row gap-4">
                      {row.fields.map(f => (
                        <div key={f.id} className="flex-1 min-w-0">
                          <label className="block mb-1.5 text-sm font-medium text-neutral-300" htmlFor={f.id}>
                            {f.config.label}
                            {f.config.required && <span className="text-red-400 ml-1">*</span>}
                          </label>
                          {renderLive(f)}
                        </div>
                      ))}
                    </div>
                  ))}
                </form>
              </div>

              {/* Fixed footer with buttons */}
              <div className="sticky bottom-0 z-10 bg-neutral-950 rounded-b-2xl border-t border-neutral-800 p-4">
                <div className="flex justify-end gap-3">
                  <Button type="button" onClick={()=>setShowPreview(false)} className="border border-neutral-700 hover:bg-neutral-900">Close</Button>
                  <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-500">Submit</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAIModal && (
        <GenerateWithAIModal 
            onClose={() => setShowAIModal(false)}
            onGenerate={(generatedForm) => {
                try {
                    if (!generatedForm || !Array.isArray(generatedForm.rows)) {
                        throw new Error('Invalid form data structure');
                    }

                    setFormTitle(generatedForm.title || 'Generated Form');
                    setFormDescription(generatedForm.description || '');
                    
                    const newRows = generatedForm.rows.map(row => ({
                        id: uid(),
                        fields: Array.isArray(row?.fields) ? row.fields.map(field => ({
                            id: uid(),
                            type: field?.type || 'text',
                            config: field?.config || DEFAULTS[field?.type || 'text']?.() || {}
                        })) : []
                    })).filter(row => row.fields.length > 0);
                    
                    setRows(newRows);
                    setShowAIModal(false);
                } catch (error) {
                    console.error('Error processing generated form:', error);
                    alert('Failed to process the generated form. Please try again.');
                }
            }}
        />
      )}
    </div>
  );
};