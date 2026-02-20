import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEditor } from '../context/EditorContext'
import EditorPanel from '../components/editor/EditorPanel'
import EditorToolbar from '../components/editor/EditorToolbar'
import Home from './Home'

const VisualEditor = () => {
  const { isAuthenticated } = useAuth()
  const { setIsEditMode } = useEditor()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login')
    } else {
      // Enable edit mode when entering visual editor
      setIsEditMode(true)
    }

    // Cleanup: disable edit mode when leaving
    return () => {
      setIsEditMode(false)
    }
  }, [isAuthenticated, navigate, setIsEditMode])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Editor Control Panel */}
      <EditorPanel />
      
      {/* Style Toolbar (appears when element is selected) */}
      <EditorToolbar />
      
      {/* The actual website content in edit mode */}
      <div className="pt-24">
        <Home />
      </div>
    </div>
  )
}

export default VisualEditor
