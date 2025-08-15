import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/Ui/Button'

const SharePage = () => {
  // This would come from backend later, for now using hardcoded data
  const [publishedForms, setPublishedForms] = useState([
    {
      id: 'form-1',
      title: 'Customer Feedback Form',
      submissions: 12,
      created: '2025-08-10',
    },
    {
      id: 'form-2', 
      title: 'Event Registration',
      submissions: 5,
      created: '2025-08-12',
    }
  ])

  const handleShare = (slug) => {
    // For now just copy the form URL to clipboard
    const formUrl = `${window.location.origin}/form/${slug}`;
    navigator.clipboard.writeText(formUrl)
    alert('Form URL copied to clipboard!')
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-950 to-black">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Published Forms</h1>
          <p className="mt-2 text-slate-400">View and share your published forms</p>
        </div>

        <div className="grid gap-4">
          {publishedForms.map(form => (
            <div key={form.id} className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-white">{form.title}</h3>
                  <div className="mt-1 flex items-center gap-4 text-sm text-slate-400">
                    <span>{form.submissions} submissions</span>
                    <span>Created {form.created}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link to={`/submissions/${form.id}`}>
                    <Button variant="ghost">View Submissions</Button>
                  </Link>
                  <Button onClick={() => handleShare(form.id)}>Share</Button>
                  <Button 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this form? This action cannot be undone.')) {
                        // TODO: Connect to backend
                        setPublishedForms(forms => forms.filter(f => f.id !== form.id));
                      }
                    }}
                    className="bg-red-950/50 text-red-400 hover:bg-red-900/30 hover:text-red-300"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SharePage
