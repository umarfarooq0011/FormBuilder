/* eslint-disable no-unused-vars */
import React from 'react'
import { useParams } from 'react-router-dom'

const SubmissionsPage = () => {
  const { formId } = useParams()
  
  // Hardcoded submissions data - would come from API later
  const submissions = [
    {
      id: 'sub-1',
      date: '2025-08-14',
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        feedback: 'Great service!',
        rating: 'Excellent'
      }
    },
    {
      id: 'sub-2',
      date: '2025-08-13',
      data: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        feedback: 'Very helpful team',
        rating: 'Good'
      }
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-950 to-black">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Form Submissions</h1>
          <p className="mt-2 text-slate-400">View all submissions for this form</p>
        </div>

        <div className="grid gap-4">
          {submissions.map(submission => (
            <div key={submission.id} className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
              <div className="mb-3 flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="text-sm text-slate-400">
                  Submitted on {submission.date}
                </div>
                <div className="text-sm text-slate-400">
                  ID: {submission.id}
                </div>
              </div>
              
              <div className="grid gap-3">
                {Object.entries(submission.data).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-3 gap-4">
                    <div className="text-sm font-medium text-slate-300">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </div>
                    <div className="col-span-2 text-sm text-white">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SubmissionsPage
