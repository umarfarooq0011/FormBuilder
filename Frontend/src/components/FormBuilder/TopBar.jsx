import { Button } from "../Formbuilder_Ui/Button";


export const TopBar = ({ onPreview, onPublish, title, description, onTitleChange, onDescriptionChange }) => (
  <div className="sticky top-0 z-30 border-b border-neutral-900/80 bg-black/60 backdrop-blur">
    <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 shrink-0 rounded-xl bg-indigo-600/20 ring-1 ring-indigo-600/50" />
          <div className="flex-1">
            <input
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Form Title"
              className="block w-full bg-transparent text-lg font-semibold text-white placeholder-neutral-500 outline-none hover:opacity-80 focus:opacity-100"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="Add a description (optional)"
              className="mt-1 block w-full bg-transparent text-sm text-neutral-400 placeholder-neutral-600 outline-none hover:opacity-80 focus:opacity-100"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={onPreview} className="border border-neutral-700 hover:bg-neutral-900">
            Preview
          </Button>
          <Button onClick={onPublish} className="bg-indigo-600 text-white hover:bg-indigo-500">
            Publish
          </Button>
        </div>
      </div>
    </div>
  </div>
);