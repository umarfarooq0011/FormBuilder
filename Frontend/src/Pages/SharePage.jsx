import { useParams, Link } from 'react-router-dom'
import { Button } from '../components/Ui/Button'

const SharePage = () => {
  const { formId } = useParams()
  const formUrl = `${window.location.origin}/form/${formId}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formUrl)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8">
        <h1 className="mb-6 text-2xl font-bold">Your form is ready to share!</h1>
        
        <div className="mb-8">
          <label className="mb-2 block text-sm text-slate-400">Share Link</label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={formUrl}
              className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2"
            />
            <Button onClick={copyToClipboard}>Copy</Button>
          </div>
        </div>

        <div className="flex gap-4">
          <Link to={`/form/${formId}`} target="_blank">
            <Button variant="ghost">Preview Form</Button>
          </Link>
          <Link to={`/builder/${formId}`}>
            <Button>Continue Editing</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SharePage
