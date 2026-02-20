import React, { createContext, useContext, useState, useCallback } from 'react'

const EditorContext = createContext()

export const useEditor = () => {
  const context = useContext(EditorContext)
  // Return null if no context instead of throwing error
  // This allows components to work outside of EditorProvider
  return context
}

export const EditorProvider = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedElement, setSelectedElement] = useState(null)
  const [elements, setElements] = useState({})
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  // Load elements from localStorage on mount
  React.useEffect(() => {
    const savedElements = localStorage.getItem('editorElements')
    if (savedElements) {
      try {
        setElements(JSON.parse(savedElements))
      } catch (e) {
        console.error('Failed to load editor elements:', e)
      }
    }
  }, [])

  // Save to history for undo/redo
  const saveToHistory = useCallback((newElements) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1)
      return [...newHistory, newElements]
    })
    setHistoryIndex(prev => prev + 1)
  }, [historyIndex])

  // Update element styles
  const updateElement = useCallback((elementId, updates) => {
    setElements(prev => {
      const newElements = {
        ...prev,
        [elementId]: {
          ...prev[elementId],
          ...updates
        }
      }
      saveToHistory(newElements)
      return newElements
    })
  }, [saveToHistory])

  // Update element position
  const updateElementPosition = useCallback((elementId, position) => {
    updateElement(elementId, { position })
  }, [updateElement])

  // Update element content
  const updateElementContent = useCallback((elementId, content) => {
    updateElement(elementId, { content })
  }, [updateElement])

  // Update element styles (font, size, color, etc.)
  const updateElementStyle = useCallback((elementId, styles) => {
    updateElement(elementId, { 
      styles: {
        ...elements[elementId]?.styles,
        ...styles
      }
    })
  }, [elements, updateElement])

  // Undo
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1)
      setElements(history[historyIndex - 1])
    }
  }, [history, historyIndex])

  // Redo
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1)
      setElements(history[historyIndex + 1])
    }
  }, [history, historyIndex])

  // Save all changes
  const saveChanges = useCallback(() => {
    localStorage.setItem('editorElements', JSON.stringify(elements))
    // Also save to siteContent for backward compatibility
    const siteContent = JSON.parse(localStorage.getItem('siteContent') || '{}')
    localStorage.setItem('siteContent', JSON.stringify(siteContent))
    return true
  }, [elements])

  // Reset to default
  const resetElements = useCallback(() => {
    setElements({})
    setHistory([])
    setHistoryIndex(-1)
    localStorage.removeItem('editorElements')
  }, [])

  // Toggle edit mode
  const toggleEditMode = useCallback(() => {
    setIsEditMode(prev => !prev)
    setSelectedElement(null)
  }, [])

  const value = {
    isEditMode,
    setIsEditMode,
    toggleEditMode,
    selectedElement,
    setSelectedElement,
    elements,
    updateElement,
    updateElementPosition,
    updateElementContent,
    updateElementStyle,
    undo,
    redo,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    saveChanges,
    resetElements
  }

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  )
}
