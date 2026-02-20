import React from 'react'
import { useEditor } from '../../context/EditorContext'
import { useNavigate } from 'react-router-dom'
import { 
  Edit3, 
  Eye, 
  Save, 
  Undo, 
  Redo, 
  RotateCcw,
  Home,
  X
} from 'lucide-react'

const EditorPanel = () => {
  const { 
    isEditMode, 
    toggleEditMode, 
    saveChanges,
    undo,
    redo,
    canUndo,
    canRedo,
    resetElements,
    selectedElement
  } = useEditor()

  const navigate = useNavigate()
  const [saveMessage, setSaveMessage] = React.useState('')

  const handleSave = () => {
    saveChanges()
    setSaveMessage('השינויים נשמרו בהצלחה!')
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const handleReset = () => {
    if (window.confirm('האם אתה בטוח שברצונך לאפס את כל העיצובים למצב ברירת המחדל?')) {
      resetElements()
      setSaveMessage('העיצובים אופסו למצב ברירת המחדל')
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  const handleBackToDashboard = () => {
    if (isEditMode) {
      if (window.confirm('יש לך שינויים שלא נשמרו. האם אתה בטוח שברצונך לצאת?')) {
        navigate('/admin/dashboard')
      }
    } else {
      navigate('/admin/dashboard')
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-900 border-b border-zinc-800 shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Side - Mode Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleEditMode}
              className={`flex items-center gap-2 px-6 py-2 font-semibold transition-all ${
                isEditMode
                  ? 'bg-accent text-white'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {isEditMode ? (
                <>
                  <Edit3 className="w-5 h-5" />
                  <span>מצב עריכה פעיל</span>
                </>
              ) : (
                <>
                  <Eye className="w-5 h-5" />
                  <span>מצב תצוגה</span>
                </>
              )}
            </button>

            {isEditMode && (
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <span>לחץ על אלמנט כדי לערוך אותו</span>
              </div>
            )}

            {selectedElement && (
              <div className="px-3 py-1 bg-accent/20 border border-accent/50 text-accent text-sm rounded">
                אלמנט נבחר: {selectedElement}
              </div>
            )}
          </div>

          {/* Center - Actions */}
          <div className="flex items-center gap-2">
            {saveMessage && (
              <span className="text-green-400 text-sm font-medium">
                {saveMessage}
              </span>
            )}

            {isEditMode && (
              <>
                <button
                  onClick={undo}
                  disabled={!canUndo}
                  className={`p-2 rounded transition-colors ${
                    canUndo
                      ? 'bg-zinc-800 hover:bg-zinc-700 text-white'
                      : 'bg-zinc-900 text-zinc-600 cursor-not-allowed'
                  }`}
                  title="ביטול (Ctrl+Z)"
                >
                  <Undo className="w-5 h-5" />
                </button>

                <button
                  onClick={redo}
                  disabled={!canRedo}
                  className={`p-2 rounded transition-colors ${
                    canRedo
                      ? 'bg-zinc-800 hover:bg-zinc-700 text-white'
                      : 'bg-zinc-900 text-zinc-600 cursor-not-allowed'
                  }`}
                  title="חזרה (Ctrl+Y)"
                >
                  <Redo className="w-5 h-5" />
                </button>

                <div className="w-px h-6 bg-zinc-700 mx-2" />

                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2 bg-accent hover:bg-red-700 text-white font-semibold transition-colors"
                >
                  <Save className="w-5 h-5" />
                  <span>שמור שינויים</span>
                </button>

                <button
                  onClick={handleReset}
                  className="p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded transition-colors"
                  title="אפס הכל"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Right Side - Navigation */}
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>צפה באתר</span>
            </a>

            <button
              onClick={handleBackToDashboard}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
            >
              <X className="w-4 h-4" />
              <span>חזור ללוח בקרה</span>
            </button>
          </div>
        </div>
      </div>

      {/* Help Bar */}
      {isEditMode && (
        <div className="bg-zinc-950 border-t border-zinc-800 py-2">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center gap-8 text-xs text-zinc-500">
              <span>💡 טיפ: לחץ על טקסט כדי לערוך אותו ישירות</span>
              <span>•</span>
              <span>🎨 בחר אלמנט כדי לפתוח את סרגל העיצוב</span>
              <span>•</span>
              <span>🖼️ הוסף תמונות דרך URL בסרגל העיצוב</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditorPanel
