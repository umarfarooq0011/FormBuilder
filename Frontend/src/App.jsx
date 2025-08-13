import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import PublicFormPage from './Pages/PublicFormPage'
import SharePage from './Pages/SharePage'
import NotFoundPage from './Pages/NotFoundPage'
import { Navbar } from './components/layouts/Navbar'
import { Footer } from './components/layouts/Footer'
import FormBuilderPage from './Pages/FormBuilderPage'

const App = () => {
  const location = useLocation()
  const isLandingPage = location.pathname === '/'

  return (
    <div className="">
      {!isLandingPage && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/builder" element={<FormBuilderPage />} />
          <Route path="/builder/:formId" element={<FormBuilderPage />} />
          <Route path="/form/:formId" element={<PublicFormPage />} />
          <Route path="/share/:formId" element={<SharePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!isLandingPage && <Footer />}
    </div>
  )
}

export default App
