import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { EditorProvider } from './context/EditorContext'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import VisualEditor from './pages/VisualEditor'

function App() {
  return (
    <AuthProvider>
      <EditorProvider>
        <Router>
          <div className="min-h-screen bg-black text-white">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/visual-editor" element={<VisualEditor />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </EditorProvider>
    </AuthProvider>
  )
}

export default App
