import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/Ui/Button'

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-4xl font-bold text-white">404 - Page Not Found</h1>
      <p className="mb-8 text-slate-400">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  )
}

export default NotFoundPage
