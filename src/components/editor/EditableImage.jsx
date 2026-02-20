import React, { useState } from 'react'
import { useEditor } from '../../context/EditorContext'
import { Image as ImageIcon, Upload } from 'lucide-react'

const EditableImage = ({ 
  id, 
  src, 
  alt = '', 
  className = '',
  style = {}
}) => {
  const editorContext = useEditor()
  const [showUpload, setShowUpload] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  
  // If editor context is not available, just render image normally
  if (!editorContext) {
    return <img src={src} alt={alt} className={className} style={style} />
  }

  const { 
    isEditMode, 
    selectedElement, 
    setSelectedElement, 
    elements = {},
    updateElement
  } = editorContext

  const elementData = elements[id] || {}
  const currentSrc = elementData.imageSrc || src

  const handleClick = (e) => {
    if (isEditMode) {
      e.stopPropagation()
      setSelectedElement(id)
      setShowUpload(true)
    }
  }

  const handleImageUpdate = () => {
    if (imageUrl.trim()) {
      // Update EditorContext
      updateElement(id, { imageSrc: imageUrl })
      
      // Also update siteContent in localStorage if this is the hero image
      if (id === 'hero-profile-image') {
        const content = JSON.parse(localStorage.getItem('siteContent') || '{}')
        if (!content.hero) {
          content.hero = {}
        }
        content.hero.imageUrl = imageUrl
        localStorage.setItem('siteContent', JSON.stringify(content))
      }
      
      setImageUrl('')
      setShowUpload(false)
      setSelectedElement(null)
      
      // Don't reload - just update the state
      // The component will re-render with the new image
    }
  }

  const isSelected = selectedElement === id && isEditMode

  return (
    <div className="relative">
      <img 
        src={currentSrc} 
        alt={alt} 
        className={`${className} ${isEditMode ? 'cursor-pointer' : ''} ${isSelected ? 'ring-2 ring-accent ring-offset-2 ring-offset-black' : ''}`}
        style={style}
        onClick={handleClick}
      />
      
      {/* Edit Indicator */}
      {isEditMode && isSelected && (
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-accent px-3 py-2 rounded text-sm text-white z-20">
          <ImageIcon className="w-4 h-4" />
          <span>לחץ להחלפת תמונה</span>
        </div>
      )}

      {/* Image Upload Modal */}
      {showUpload && isSelected && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-30 rounded">
          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-700 max-w-md w-full mx-4">
            <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              החלף תמונה
            </h3>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="הכנס URL של תמונה"
              className="w-full px-4 py-3 bg-black border border-zinc-700 text-white rounded focus:border-accent focus:outline-none mb-4"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleImageUpdate()
                }
              }}
            />
            <div className="flex gap-2">
              <button
                onClick={handleImageUpdate}
                className="flex-1 px-4 py-2 bg-accent hover:bg-red-700 text-white font-semibold rounded transition-colors"
              >
                עדכן תמונה
              </button>
              <button
                onClick={() => {
                  setShowUpload(false)
                  setSelectedElement(null)
                  setImageUrl('')
                }}
                className="flex-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded transition-colors"
              >
                ביטול
              </button>
            </div>
            <p className="text-zinc-500 text-xs mt-3">
              💡 טיפ: העלה תמונה לשירות כמו Imgur או השתמש ב-URL ישיר לתמונה
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditableImage
