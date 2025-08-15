/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from 'react';
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cx, hasProp, hasMinMax, hasOptions, PALETTE } from '../Utilis/CONSTANTS.JS';
import { GripVertical, XIcon, SparklesIcon } from '../Utilis/icons.jsx';






// ATOMIC COMPONENTS
export const Button = ({ className, ...p }) => <button {...p} className={cx("rounded-xl px-3 py-1.5 text-sm transition", className)} />;
export const Card = ({ className, ...p }) => <div {...p} className={cx("rounded-2xl border border-neutral-900 bg-neutral-950/60", className)} />;
export const Label = ({ children }) => <div className="mb-1 text-xs text-neutral-400">{children}</div>;
export const Input = ({ className, ...p }) => <input {...p} className={cx("w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-600", className)} />;
export const Textarea = ({ className, ...p }) => <textarea {...p} className={cx("w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-600", className)} />;
export const Switch = ({ checked, onChange }) => <button type="button" onClick={() => onChange(!checked)} className={cx("relative h-6 w-11 rounded-full transition", checked ? "bg-indigo-600" : "bg-neutral-700")}> <span className={cx("absolute top-0.5 h-5 w-5 rounded-full bg-white transition", checked ? "left-6" : "left-0.5")} /></button>;

// DND HELPERS
export const PaletteDraggable = ({ id, children }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });
  return <div ref={setNodeRef} {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">{children}</div>;
};
export const CanvasDropzone = ({ id, children }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  return <div ref={setNodeRef} id={id} className={cx("min-h-[220px] w-full rounded-xl border border-dashed p-3 transition-colors", isOver ? "border-indigo-500 bg-indigo-500/5" : "border-neutral-800")}>{children}</div>;
};

// RENDER FUNCTIONS
const previewCommon = "w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-neutral-100 placeholder-neutral-500";
const liveCommon = "w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500";

export const renderPreview = (f) => {
  const { type, config } = f;
  const inTypes = ["text","password","email","tel","url","number","date","time","datetime-local","month","week","color"];
  if (inTypes.includes(type)) return <input disabled className={previewCommon} placeholder={config.placeholder || ""} type={type} />;
  if (type === "textarea") return <Textarea disabled className={previewCommon} rows={config.rows || 4} placeholder={config.placeholder || ""} />;
  if (type === "select") return <select disabled className={previewCommon}><option value="">{config.placeholder || "Select..."}</option>{(config.options || []).map((o,i)=>(<option key={i}>{o}</option>))}</select>;
  if (type === "radio") return <div className="flex flex-wrap gap-3">{(config.options||[]).map((o,i)=>(<label key={i} className="inline-flex items-center gap-2 text-neutral-300"><input disabled type="radio" className="h-4 w-4"/> {o}</label>))}</div>;
  if (type === "checkbox") return (<label className="inline-flex items-center gap-2 text-neutral-300"><input disabled type="checkbox" className="h-4 w-4"/> {config.label||"Checkbox"}</label>);
  if (type === "checkbox-group") return <div className="flex flex-col gap-2">{(config.options||[]).map((o,i)=>(<label key={i} className="inline-flex items-center gap-2 text-neutral-300"><input disabled type="checkbox" className="h-4 w-4"/> {o}</label>))}</div>;
  if (type === "file") return <input disabled className={previewCommon} type="file" accept={config.accept} multiple={config.multiple} />;
  if (type === "range") return <input disabled className="w-full" type="range" min={config.min} max={config.max} step={config.step} />;
  return <div className="text-neutral-400">Unsupported</div>;
};

export const renderLive = (f) => {
  const { type, config, id } = f;
  const inTypes = ["text","password","email","tel","url","number","date","time","datetime-local","month","week","color"];
  if (inTypes.includes(type)) return <input className={liveCommon} placeholder={config.placeholder || ""} type={type} required={config.required}/>;
  if (type === "textarea") return <Textarea className={liveCommon} rows={config.rows || 4} placeholder={config.placeholder || ""} required={config.required}/>;
  if (type === "select") return <select className={liveCommon} required={config.required}><option value="">{config.placeholder || "Select..."}</option>{(config.options || []).map((o,i)=>(<option key={i}>{o}</option>))}</select>;
  if (type === "radio") return <div className="flex flex-wrap gap-3">{(config.options||[]).map((o,i)=>(<label key={i} className="inline-flex items-center gap-2 text-neutral-300"><input name={`r-${id}`} type="radio" className="h-4 w-4" required={config.required}/> {o}</label>))}</div>;
  if (type === "checkbox") return (<label className="inline-flex items-center gap-2 text-neutral-300"><input type="checkbox" className="h-4 w-4" required={config.required}/> {config.label||"Checkbox"}</label>);
  if (type === "checkbox-group") return <div className="flex flex-col gap-2">{(config.options||[]).map((o,i)=>(<label key={i} className="inline-flex items-center gap-2 text-neutral-300"><input type="checkbox" className="h-4 w-4" required={config.required}/> {o}</label>))}</div>;
  if (type === "file") return <input className={liveCommon} type="file" accept={config.accept} multiple={config.multiple} required={config.required}/>;
  if (type === "range") return <input className="w-full" type="range" min={config.min} max={config.max} step={config.step}/>;
  return null;
};

// FIELD CARD
export const FieldCard = ({ rowId, field, selected, onSelect, onDuplicate, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id, data: { rowId } });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cx("group relative rounded-2xl border bg-neutral-900/60 p-4 transition-all hover:border-neutral-600", selected && "ring-2 ring-indigo-500 border-indigo-500", isDragging && "opacity-50 z-10")}
      onClick={() => onSelect(field.id)}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-medium text-neutral-300 truncate pr-16">{field.config.label || field.type}</div>
        <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button className="border border-neutral-700 text-neutral-300 !px-2 !py-1 text-xs" onClick={(e)=>{e.stopPropagation(); onDuplicate(field.id);}}>Duplicate</Button>
          <Button className="border border-red-800/70 text-red-300 !px-2 !py-1 text-xs" onClick={(e)=>{e.stopPropagation(); onRemove(field.id);}}>Remove</Button>
          <button {...attributes} {...listeners} className="cursor-grab rounded-lg p-1 text-neutral-400 active:cursor-grabbing" title="Drag to reorder"><GripVertical /></button>
        </div>
      </div>
      {renderPreview(field)}
    </div>
  );
};

// OPTIONS EDITOR
export const OptionsEditor = ({ options, onChange }) => {
  const [text, setText] = useState(options.join("\n"));
  useEffect(() => {
    setText(options.join('\n'));
  }, [options]);
  return (
    <Textarea rows={5} value={text} onChange={(e)=>setText(e.target.value)} onBlur={()=>onChange(text.split(/\n+/).map(s=>s.trim()).filter(Boolean))} placeholder={"Option 1\nOption 2\nOption 3"} />
  );
};

// PROPERTIES PANEL
export const PropertiesPanel = ({ selectedField, onUpdate }) => {
    const [config, setConfig] = useState(null);

    useEffect(() => {
        setConfig(selectedField ? { ...selectedField.config } : null);
    }, [selectedField]);

    const handleChange = (e) => {
        if (!config) return;
        const { name, value, type } = e.target;
        const val = type === 'number' ? (Number(value) || '') : value;
        setConfig(prev => ({ ...prev, [name]: val }));
    };
    
    const handleBlur = (e) => {
        if (!config) return;
        const { name, value, type } = e.target;
        const val = type === 'number' ? (Number(value) || '') : value;
        onUpdate({ [name]: val });
    };

    const handleImmediateUpdate = (patch) => {
        if (!config) return;
        setConfig(prev => ({ ...prev, ...patch }));
        onUpdate(patch);
    };

    if (!selectedField || !config) {
        return <div className="rounded-xl border border-neutral-800 p-3 text-sm text-neutral-500">Select a field to edit.</div>;
    }

    return (
        <div className="space-y-3">
            <label className="block">
                <Label>Label</Label>
                <Input name="label" value={config.label || ""} onChange={handleChange} onBlur={handleBlur} />
            </label>
            {hasProp(selectedField, "placeholder") && (
                <label className="block">
                    <Label>Placeholder</Label>
                    <Input name="placeholder" value={config.placeholder || ""} onChange={handleChange} onBlur={handleBlur} />
                </label>
            )}
            {hasProp(selectedField, "rows") && (
                <label className="block">
                    <Label>Rows</Label>
                    <Input name="rows" type="number" value={config.rows || ''} onChange={handleChange} onBlur={handleBlur} />
                </label>
            )}
            {hasMinMax(selectedField) && (
                <div className="grid grid-cols-2 gap-2">
                    <label className="block"><Label>Min</Label><Input name="min" value={config.min || ''} onChange={handleChange} onBlur={handleBlur} /></label>
                    <label className="block"><Label>Max</Label><Input name="max" value={config.max || ''} onChange={handleChange} onBlur={handleBlur} /></label>
                </div>
            )}
            {hasProp(selectedField, "step") && (
                <label className="block">
                    <Label>Step</Label>
                    <Input name="step" type="number" value={config.step || ''} onChange={handleChange} onBlur={handleBlur} />
                </label>
            )}
            {hasProp(selectedField, "accept") && (
                <label className="block">
                    <Label>Accept</Label>
                    <Input name="accept" value={config.accept || ''} onChange={handleChange} onBlur={handleBlur} />
                </label>
            )}
            {hasProp(selectedField, "multiple") && (
                <label className="flex items-center justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2">
                    <span className="text-sm text-neutral-200">Allow multiple</span>
                    <Switch checked={!!config.multiple} onChange={(v) => handleImmediateUpdate({ multiple: v })} />
                </label>
            )}
            {hasOptions(selectedField) && (
                <div>
                    <Label>Options (one per line)</Label>
                    <OptionsEditor 
                        options={config.options || []} 
                        onChange={(opts) => handleImmediateUpdate({ options: opts })} 
                    />
                </div>
            )}
            {hasProp(selectedField, "required") && (
                <label className="flex items-center justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2">
                    <span className="text-sm text-neutral-200">Required</span>
                    <Switch checked={!!config.required} onChange={(v) => handleImmediateUpdate({ required: v })} />
                </label>
            )}
        </div>
    );
};

// AI MODAL
export const GenerateWithAIModal = ({ onClose, onGenerate }) => {
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerate = async () => {
        if (!prompt) return;
        setIsLoading(true);
        setError(null);

        const schema = {
            type: "OBJECT",
            properties: {
                title: { type: "STRING" },
                description: { type: "STRING" },
                rows: {
                    type: "ARRAY",
                    items: {
                        type: "OBJECT",
                        properties: {
                            fields: {
                                type: "ARRAY",
                                items: {
                                    type: "OBJECT",
                                    properties: {
                                        type: { type: "STRING" },
                                        config: {
                                            type: "OBJECT",
                                            properties: {
                                                label: { type: "STRING" },
                                                placeholder: { type: "STRING" },
                                                required: { type: "BOOLEAN" },
                                                options: { type: "ARRAY", items: { type: "STRING" } },
                                                rows: { type: "NUMBER" },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        };

        try {
            const fullPrompt = `Based on the following description, generate a web form. Description: "${prompt}". The form should have a title, a description, and a series of rows, where each row can contain one or two fields. Adhere strictly to the provided JSON schema. The "type" property for each field must be one of the following values: ${PALETTE.map(p => `"${p.type}"`).join(', ')}.`;

            const payload = {
                contents: [{ parts: [{ text: fullPrompt }] }],
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: schema,
                },
            };
            
            const apiKey = "AIzaSyAgs-ybnXTHD2yWNpYFvGzKVLTFbbrqU5o"; // API key will be injected by the environment
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const result = await response.json();
            
            if (!result?.candidates?.[0]?.content?.parts?.[0]?.text) {
                throw new Error('Invalid API response format');
            }

            const jsonText = result.candidates[0].content.parts[0].text;
            try {
                // Try to parse the original text first
                const generatedForm = JSON.parse(jsonText);
                
                // Validate and ensure required properties exist
                if (!generatedForm || typeof generatedForm !== 'object') {
                    throw new Error('Invalid form data format');
                }
                
                const sanitizedForm = {
                    title: generatedForm.title || 'Generated Form',
                    description: generatedForm.description || '',
                    rows: Array.isArray(generatedForm.rows) ? generatedForm.rows.map(row => ({
                        fields: Array.isArray(row?.fields) ? row.fields.map(field => ({
                            type: field?.type || 'text',
                            config: field?.config || {}
                        })) : []
                    })) : []
                };
                
                onGenerate(sanitizedForm);
            } catch (parseError) {
                console.error('JSON Parse Error:', parseError);
                throw new Error('Failed to parse generated form data');
            }

        } catch (err) {
            console.error("Error generating form:", err);
            setError("Sorry, something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={onClose}>
            <div className="w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2"><SparklesIcon /> Generate Form with AI</h2>
                    <button onClick={onClose} className="text-neutral-400 hover:text-white"><XIcon /></button>
                </div>
                <p className="text-sm text-neutral-400 mb-4">Describe the form you want to create. For example, "a contact form for a photography business" or "a t-shirt order form with size and color options."</p>
                
                <Textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., A customer feedback survey for a coffee shop"
                    rows={4}
                    disabled={isLoading}
                />

                {error && <p className="mt-2 text-sm text-red-400">{error}</p>}

                <div className="mt-4 flex justify-end">
                    <Button 
                        onClick={handleGenerate} 
                        className="bg-indigo-600 text-white hover:bg-indigo-500 disabled:bg-indigo-800/50 disabled:cursor-not-allowed flex items-center gap-2"
                        disabled={isLoading || !prompt}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating...
                            </>
                        ) : (
                            "Generate"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};