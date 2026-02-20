import React, { useState } from 'react'
import { useEditor } from '../../context/EditorContext'
import { 
  Type, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Bold, 
  Italic, 
  Underline,
  Palette,
  Image,
  Video,
  Trash2,
  Move,
  Undo,
  Redo,
  Save,
  X
} from 'lucide-react'

const EditorToolbar = () => {
  const { 
    selectedElement, 
    elements, 
    updateElementStyle,
    undo,
    redo,
    canUndo,
    canRedo,
    saveChanges,
    setSelectedElement
  } = useEditor()

  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)

  if (!selectedElement) return null

  const elementData = elements[selectedElement] || {}
  const currentStyles = elementData.styles || {}

  const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96]
  const fontFamilies = [
    { name: 'Default', value: 'inherit' },
    { name: 'Arial', value: 'Arial, sans-serif' },
    { name: 'Helvetica', value: 'Helvetica, sans-serif' },
    { name: 'Times New Roman', value: '"Times New Roman", serif' },
    { name: 'Georgia', value: 'Georgia, serif' },
    { name: 'Courier', value: '"Courier New", monospace' },
    { name: 'Verdana', value: 'Verdana, sans-serif' },
    { name: 'Tahoma', value: 'Tahoma, sans-serif' },
    { name: 'Trebuchet', value: '"Trebuchet MS", sans-serif' },
    { name: 'Impact', value: 'Impact, sans-serif' }
  ]

  const handleStyleChange = (property, value) => {
    updateElementStyle(selectedElement, { [property]: value })
  }

  const handleImageUpload = (url) => {
    updateElementStyle(selectedElement, { backgroundImage: `url(${url})` })
    setShowImageUpload(false)
  }

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-zinc-900 border border-zinc-700 shadow-2xl rounded-lg p-4 min-w-[800px] max-h-[80vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Move className="w-5 h-5 text-accent" />
          <span className="text-white font-semibold">עורך עיצוב</span>
        </div>
        <button
          onClick={() => setSelectedElement(null)}
          className="p-2 hover:bg-zinc-800 rounded transition-colors"
        >
          <X className="w-5 h-5 text-zinc-400" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {/* Font Family */}
        <div className="col-span-2">
          <label className="block text-zinc-400 text-xs mb-2">משפחת פונט</label>
          <select
            value={currentStyles.fontFamily || 'inherit'}
            onChange={(e) => handleStyleChange('fontFamily', e.target.value)}
            className="w-full px-3 py-2 bg-black border border-zinc-700 text-white rounded focus:border-accent focus:outline-none"
          >
            {fontFamilies.map(font => (
              <option key={font.value} value={font.value}>
                {font.name}
              </option>
            ))}
          </select>
        </div>

        {/* Font Size */}
        <div>
          <label className="block text-zinc-400 text-xs mb-2">גודל</label>
          <select
            value={parseInt(currentStyles.fontSize) || 16}
            onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
            className="w-full px-3 py-2 bg-black border border-zinc-700 text-white rounded focus:border-accent focus:outline-none"
          >
            {fontSizes.map(size => (
              <option key={size} value={size}>
                {size}px
              </option>
            ))}
          </select>
        </div>

        {/* Font Weight */}
        <div>
          <label className="block text-zinc-400 text-xs mb-2">עובי</label>
          <select
            value={currentStyles.fontWeight || 'normal'}
            onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
            className="w-full px-3 py-2 bg-black border border-zinc-700 text-white rounded focus:border-accent focus:outline-none"
          >
            <option value="300">Light</option>
            <option value="normal">Normal</option>
            <option value="600">Semi Bold</option>
            <option value="bold">Bold</option>
            <option value="900">Black</option>
          </select>
        </div>

        {/* Text Alignment */}
        <div className="col-span-4">
          <label className="block text-zinc-400 text-xs mb-2">יישור טקסט</label>
          <div className="flex gap-2">
            <button
              onClick={() => handleStyleChange('textAlign', 'left')}
              className={`flex-1 p-2 border rounded transition-colors ${
                currentStyles.textAlign === 'left'
                  ? 'bg-accent border-accent text-white'
                  : 'bg-black border-zinc-700 text-zinc-400 hover:border-zinc-600'
              }`}
            >
              <AlignLeft className="w-5 h-5 mx-auto" />
            </button>
            <button
              onClick={() => handleStyleChange('textAlign', 'center')}
              className={`flex-1 p-2 border rounded transition-colors ${
                currentStyles.textAlign === 'center'
                  ? 'bg-accent border-accent text-white'
                  : 'bg-black border-zinc-700 text-zinc-400 hover:border-zinc-600'
              }`}
            >
              <AlignCenter className="w-5 h-5 mx-auto" />
            </button>
            <button
              onClick={() => handleStyleChange('textAlign', 'right')}
              className={`flex-1 p-2 border rounded transition-colors ${
                currentStyles.textAlign === 'right'
                  ? 'bg-accent border-accent text-white'
                  : 'bg-black border-zinc-700 text-zinc-400 hover:border-zinc-600'
              }`}
            >
              <AlignRight className="w-5 h-5 mx-auto" />
            </button>
          </div>
        </div>

        {/* Text Style */}
        <div className="col-span-4">
          <label className="block text-zinc-400 text-xs mb-2">סגנון טקסט</label>
          <div className="flex gap-2">
            <button
              onClick={() => handleStyleChange('fontWeight', currentStyles.fontWeight === 'bold' ? 'normal' : 'bold')}
              className={`flex-1 p-2 border rounded transition-colors ${
                currentStyles.fontWeight === 'bold'
                  ? 'bg-accent border-accent text-white'
                  : 'bg-black border-zinc-700 text-zinc-400 hover:border-zinc-600'
              }`}
            >
              <Bold className="w-5 h-5 mx-auto" />
            </button>
            <button
              onClick={() => handleStyleChange('fontStyle', currentStyles.fontStyle === 'italic' ? 'normal' : 'italic')}
              className={`flex-1 p-2 border rounded transition-colors ${
                currentStyles.fontStyle === 'italic'
                  ? 'bg-accent border-accent text-white'
                  : 'bg-black border-zinc-700 text-zinc-400 hover:border-zinc-600'
              }`}
            >
              <Italic className="w-5 h-5 mx-auto" />
            </button>
            <button
              onClick={() => handleStyleChange('textDecoration', currentStyles.textDecoration === 'underline' ? 'none' : 'underline')}
              className={`flex-1 p-2 border rounded transition-colors ${
                currentStyles.textDecoration === 'underline'
                  ? 'bg-accent border-accent text-white'
                  : 'bg-black border-zinc-700 text-zinc-400 hover:border-zinc-600'
              }`}
            >
              <Underline className="w-5 h-5 mx-auto" />
            </button>
          </div>
        </div>

        {/* Color Picker */}
        <div className="col-span-2">
          <label className="block text-zinc-400 text-xs mb-2">צבע טקסט</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={currentStyles.color || '#ffffff'}
              onChange={(e) => handleStyleChange('color', e.target.value)}
              className="w-12 h-10 bg-black border border-zinc-700 rounded cursor-pointer"
            />
            <input
              type="text"
              value={currentStyles.color || '#ffffff'}
              onChange={(e) => handleStyleChange('color', e.target.value)}
              className="flex-1 px-3 py-2 bg-black border border-zinc-700 text-white rounded focus:border-accent focus:outline-none"
              placeholder="#ffffff"
            />
          </div>
        </div>

        {/* Background Color */}
        <div className="col-span-2">
          <label className="block text-zinc-400 text-xs mb-2">צבע רקע</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={currentStyles.backgroundColor || '#000000'}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              className="w-12 h-10 bg-black border border-zinc-700 rounded cursor-pointer"
            />
            <input
              type="text"
              value={currentStyles.backgroundColor || 'transparent'}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              className="flex-1 px-3 py-2 bg-black border border-zinc-700 text-white rounded focus:border-accent focus:outline-none"
              placeholder="transparent"
            />
          </div>
        </div>

        {/* Image/Video Upload */}
        <div className="col-span-4">
          <label className="block text-zinc-400 text-xs mb-2">תמונה / וידאו</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="הכנס URL של תמונה או וידאו"
              className="flex-1 px-3 py-2 bg-black border border-zinc-700 text-white rounded focus:border-accent focus:outline-none"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleImageUpload(e.target.value)
                  e.target.value = ''
                }
              }}
            />
            <button
              className="px-4 py-2 bg-accent hover:bg-red-700 text-white rounded transition-colors"
              onClick={() => {
                const input = document.querySelector('input[placeholder="הכנס URL של תמונה או וידאו"]')
                if (input.value) {
                  handleImageUpload(input.value)
                  input.value = ''
                }
              }}
            >
              <Image className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-700">
        <div className="flex gap-2">
          <button
            onClick={undo}
            disabled={!canUndo}
            className={`p-2 rounded transition-colors ${
              canUndo
                ? 'bg-zinc-800 hover:bg-zinc-700 text-white'
                : 'bg-zinc-900 text-zinc-600 cursor-not-allowed'
            }`}
            title="ביטול"
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
            title="חזרה"
          >
            <Redo className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={() => {
            saveChanges()
            setSelectedElement(null)
          }}
          className="flex items-center gap-2 px-6 py-2 bg-accent hover:bg-red-700 text-white rounded transition-colors"
        >
          <Save className="w-5 h-5" />
          <span>שמור שינויים</span>
        </button>
      </div>
    </div>
  )
}

export default EditorToolbar
