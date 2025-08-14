import { Textarea } from './../Formbuilder_Ui/Textarea';


export const previewCommon = "w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-neutral-100 placeholder-neutral-500";
export const liveCommon = "w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500";

export const renderPreview = (f) => {
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


export const renderLive = (f) => {
  const { type, config, id } = f;
  const inTypes = ["text","password","email","tel","url","number","date","time","datetime-local","month","week","color"];
  if (inTypes.includes(type)) return <input className={liveCommon} placeholder={config.placeholder || ""} type={type} required={config.required}/>;
  if (type === "Textarea") return <Textarea className={liveCommon} rows={config.rows || 4} placeholder={config.placeholder || ""} required={config.required}/>;
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