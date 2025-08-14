import { Button } from "../Formbuilder_Ui/Button";


export const TopBar = ({ onPreview, onShare, onPublish }) => (
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
        <Button onClick={onPreview} className="border border-neutral-700 hover:bg-neutral-900">Preview</Button>
        <Button onClick={onShare} className="border border-neutral-700 hover:bg-neutral-900">Share</Button>
        <Button onClick={onPublish} className="bg-indigo-600 text-white hover:bg-indigo-500">Publish</Button>
      </div>
    </div>
  </div>
);