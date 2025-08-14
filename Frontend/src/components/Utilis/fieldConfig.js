// Unique ID generator and classnames combiner
export const uid = () => Math.random().toString(36).slice(2, 9);

// Palette: visible list on the left

export const PALETTE = [
  { type: "text", label: "Input" },
  { type: "password", label: "Password" },
  { type: "email", label: "Email" },
  { type: "tel", label: "Phone" },
  { type: "url", label: "URL" },
  { type: "number", label: "Number" },
  { type: "date", label: "Date" },
  { type: "time", label: "Time" },
  { type: "datetime-local", label: "Date & Time" },
  { type: "month", label: "Month" },
  { type: "week", label: "Week" },
  { type: "color", label: "Color" },
  { type: "textarea", label: "Textarea" },
  { type: "select", label: "Select" },
  { type: "radio", label: "Radio Group" },
  { type: "checkbox", label: "Checkbox" },
  { type: "checkbox-group", label: "Checkbox Group" },
  { type: "file", label: "File Upload" },
  { type: "range", label: "Range" },
  { type: "switch", label: "Switch" },
];

// Default config per type (use functions to avoid reference sharing)

export const DEFAULTS = {
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


// Helpers to decide which controls to show in PropertiesPanel
export const hasProp = (field, key) => Object.prototype.hasOwnProperty.call(DEFAULTS[field.type](), key);
export const hasOptions = (field) => hasProp(field, "options");
export const hasMinMax = (field) => hasProp(field, "min") && hasProp(field, "max");
