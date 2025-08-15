import { Card } from "../Formbuilder_Ui/Card";
import { Switch } from "../Formbuilder_Ui/Switch";
import { hasMinMax, hasOptions, hasProp } from "../Utilis/fieldConfig";
import { Input, Label } from './../Formbuilder_Ui/Input';
import { OptionsEditor } from './OptionsEditor';


export const PropertiesPanel = ({ selectedField, updateSelected }) => (
  <Card className="overflow-visible">
    <div className="mb-2 text-sm font-semibold text-neutral-300">Field Properties</div>
    {!selectedField ? (
      <div className="rounded-xl border border-neutral-800 p-3 text-sm text-neutral-500">
        Select a field to edit label, placeholder, required, options, rows, min/max, accept, etc.
      </div>
    ) : (
      <div className="space-y-3 overflow-visible">
        <label className="block">
          <Label>Label</Label>
          <Input
            value={selectedField.config.label || ""}
            onChange={(e) => updateSelected({ label: e.target.value })}
          />
        </label>

        {hasProp(selectedField, "placeholder") && (
          <label className="block">
            <Label>Placeholder</Label>
            <Input
              value={selectedField.config.placeholder || ""}
              onChange={(e) => updateSelected({ placeholder: e.target.value })}
            />
          </label>
        )}

        {hasProp(selectedField, "rows") && (
          <label className="block">
            <Label>Rows</Label>
            <Input
              type="number"
              value={selectedField.config.rows}
              onChange={(e) => updateSelected({ rows: Number(e.target.value) || 1 })}
            />
          </label>
        )}

        {hasMinMax(selectedField) && (
          <div className="grid grid-cols-2 gap-2">
            <label className="block">
              <Label>Min</Label>
              <Input
                value={selectedField.config.min}
                onChange={(e) => updateSelected({ min: e.target.value })}
              />
            </label>
            <label className="block">
              <Label>Max</Label>
              <Input
                value={selectedField.config.max}
                onChange={(e) => updateSelected({ max: e.target.value })}
              />
            </label>
          </div>
        )}

        {hasProp(selectedField, "step") && (
          <label className="block">
            <Label>Step</Label>
            <Input
              type="number"
              value={selectedField.config.step}
              onChange={(e) => updateSelected({ step: Number(e.target.value) || 1 })}
            />
          </label>
        )}

        {hasProp(selectedField, "accept") && (
          <label className="block">
            <Label>Accept (e.g. .pdf,.jpg)</Label>
            <Input
              value={selectedField.config.accept}
              onChange={(e) => updateSelected({ accept: e.target.value })}
            />
          </label>
        )}

        {hasProp(selectedField, "multiple") && (
          <label className="flex items-center justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2">
            <span className="text-sm text-neutral-200">Allow multiple files</span>
            <Switch
              checked={!!selectedField.config.multiple}
              onChange={(v) => updateSelected({ multiple: v })}
            />
          </label>
        )}

        {hasOptions(selectedField) && (
          <div>
            <Label>Options (one per line)</Label>
            <OptionsEditor
              options={selectedField.config.options || []}
              onChange={(opts) => updateSelected({ options: opts })}
            />
          </div>
        )}

        {hasProp(selectedField, "required") && (
          <label className="flex items-center justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2">
            <span className="text-sm text-neutral-200">Required</span>
            <Switch
              checked={!!selectedField.config.required}
              onChange={(v) => updateSelected({ required: v })}
            />
          </label>
        )}
      </div>
    )}
  </Card>
);