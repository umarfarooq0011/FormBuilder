import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '../components/Ui/Button'

const PublicFormPage = () => {
  const { formId } = useParams()
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Later this will be replaced with an API call to fetch form data
  // For now using static data to demonstrate the flow
  const [formData, setFormData] = useState(null)

  useEffect(() => {
    // Simulate API call to fetch form data
    const fetchForm = async () => {
      try {
        // This is where we'll make the actual API call later
        // For now, simulate an API delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Simulate form data from backend
        if (formId === 'form-1') {
          setFormData({
            id: formId,
            title: 'Customer Feedback Form',
            description: 'We value your feedback! Please help us improve our services.',
            createdBy: 'FormForge Team',
            fields: [
              { id: 'name', type: 'text', label: 'Your Name', required: true },
              { id: 'email', type: 'email', label: 'Email Address', required: true },
              { id: 'feedback', type: 'textarea', label: 'Your Feedback', required: true },
              { id: 'rating', type: 'select', label: 'Rating', 
                options: ['Excellent', 'Good', 'Fair', 'Poor'], required: true }
            ]
          })
        } else if (formId === 'form-2') {
          setFormData({
            id: formId,
            title: 'Event Registration',
            description: 'Register for our upcoming event.',
            createdBy: 'Event Team',
            fields: [
              { id: 'fullName', type: 'text', label: 'Full Name', required: true },
              { id: 'email', type: 'email', label: 'Email Address', required: true },
              { id: 'phone', type: 'text', label: 'Phone Number', required: true },
              { id: 'ticketType', type: 'select', label: 'Ticket Type', 
                options: ['VIP', 'Regular', 'Student'], required: true }
            ]
          })
        } else {
          // If form doesn't exist
          setError('Form not found')
        }
        setLoading(false)
      } catch (err) {
        setError('Failed to load form', err.message)
        setLoading(false)
      }
    }

    fetchForm()
  }, [formId])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here we would submit to backend
    // For now just show success message
    setSubmitted(true)
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-neutral-950 via-neutral-950 to-black px-4">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-neutral-800 border-t-indigo-600"></div>
          <p className="text-slate-400">Loading form...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-neutral-950 via-neutral-950 to-black px-4">
        <div className="text-center">
          <div className="mb-4 rounded-full bg-red-500/10 p-3 text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-bold text-white">{error}</h2>
          <p className="text-slate-400">This form may have been deleted or is no longer available.</p>
          <Button onClick={() => navigate('/')} className="mt-4">Go Home</Button>
        </div>
      </div>
    )
  }

  // Success state after submission
  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-neutral-950 via-neutral-950 to-black px-4">
        <div className="text-center">
          <div className="mb-4 rounded-full bg-green-500/10 p-3 text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-white">Thank You!</h2>
          <p className="text-slate-400">Your response has been recorded.</p>
        </div>
      </div>
    )
  }

  // No form data
  if (!formData) {
    return null
  }

  // Form view
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-950 to-black px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">{formData.title}</h1>
          {formData.description && (
            <p className="mt-2 text-slate-400">{formData.description}</p>
          )}
          <div className="mt-4 text-sm text-slate-500">
            Created by {formData.createdBy}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {formData.fields.map(field => (
            <div key={field.id}>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              
              {field.type === 'textarea' ? (
                <textarea
                  required={field.required}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-2 text-white"
                  rows={4}
                />
              ) : field.type === 'select' ? (
                <select 
                  required={field.required}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-2 text-white"
                >
                  <option value="">Select an option</option>
                  {field.options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  required={field.required}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-2 text-white"
                />
              )}
            </div>
          ))}

          <div className="pt-4">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PublicFormPage
