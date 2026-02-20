import React, { useRef, useEffect, useState } from 'react'
import { Rnd } from 'react-rnd'
import ContentEditable from 'react-contenteditable'
import { useEditor } from '../../context/EditorContext'
import { Move, Trash2 } from 'lucide-react'

const EditableElement = ({ 
  id, 
  children, 
  className = '', 
  style = {},
  editable = true,
  draggable = false,
  as: Component = 'div'
}) => {
  const editorContext = useEditor()
  
  // If editor context is not available, just render children normally
  if (!editorContext) {
    return (
      <Component className={className} style={style}>
        {children}
      </Component>
    )
  }

  const { 
    isEditMode, 
    selectedElement, 
    setSelectedElement, 
    elements = {},
    updateElementContent,
    updateElementPosition,
    updateElement
  } = editorContext || {}

  const elementData = elements[id] || {}
  const contentRef = useRef(elementData.content || '')
  const [isHovered, setIsHovered] = useState(false)

  // Merge styles from editor with component styles
  const mergedStyles = {
    ...style,
    ...elementData.styles,
    position: draggable && isEditMode ? 'relative' : style.position,
    cursor: isEditMode ? 'pointer' : style.cursor
  }

  const handleClick = (e) => {
    if (isEditMode) {
      e.stopPropagation()
      setSelectedElement(id)
    }
  }

  const handleContentChange = (e) => {
    contentRef.current = e.target.value
  }

  const handleBlur = () => {
    if (contentRef.current !== elementData.content) {
      updateElementContent(id, contentRef.current)
    }
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    if (window.confirm('האם אתה בטוח שברצונך למחוק אלמנט זה?')) {
      updateElement(id, { deleted: true })
      setSelectedElement(null)
    }
  }

  // If element is deleted, don't render it
  if (elementData.deleted) {
    return null
  }

  const isSelected = selectedElement === id && isEditMode

  // Update contentRef when children change
  useEffect(() => {
    if (!elementData.content && typeof children === 'string') {
      contentRef.current = children
    } else if (elementData.content) {
      contentRef.current = elementData.content
    }
  }, [children, elementData.content])

  // Render editable content
  const renderContent = () => {
    // Apply custom styles to children if they exist
    if (elementData.content) {
      if (editable && isEditMode) {
        return (
          <ContentEditable
            html={contentRef.current}
            onChange={handleContentChange}
            onBlur={handleBlur}
            disabled={false}
            className={className}
            style={mergedStyles}
          />
        )
      }
      return (
        <Component 
          className={className} 
          style={mergedStyles}
          dangerouslySetInnerHTML={{ __html: elementData.content }}
        />
      )
    }

    // First time - no saved content yet
    if (editable && isEditMode) {
      const initialContent = typeof children === 'string' ? children : 
                            (children?.props?.children || '')
      return (
        <ContentEditable
          html={initialContent}
          onChange={handleContentChange}
          onBlur={handleBlur}
          disabled={false}
          className={className}
          style={mergedStyles}
        />
      )
    }

    return (
      <Component className={className} style={mergedStyles}>
        {children}
      </Component>
    )
  }

  // If draggable and in edit mode, wrap with Rnd
  if (draggable && isEditMode && elementData.position) {
    return (
      <Rnd
        position={elementData.position}
        onDragStop={(e, d) => {
          updateElementPosition(id, { x: d.x, y: d.y })
        }}
        enableResizing={false}
        bounds="parent"
        className={isSelected ? 'ring-2 ring-accent' : ''}
      >
        <div
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative"
        >
          {renderContent()}
          
          {/* Edit Overlay */}
          {(isSelected || isHovered) && (
            <div className="absolute -top-8 left-0 flex items-center gap-2 bg-accent px-2 py-1 rounded text-xs text-white">
              <Move className="w-3 h-3" />
              <span>גרור לשינוי מיקום</span>
              <button
                onClick={handleDelete}
                className="ml-2 p-1 hover:bg-red-700 rounded"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </Rnd>
    )
  }

  // Regular element with edit mode styling
  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => isEditMode && setIsHovered(true)}
      onMouseLeave={() => isEditMode && setIsHovered(false)}
      className={`relative ${isSelected ? 'ring-2 ring-accent ring-offset-2 ring-offset-black' : ''} ${isHovered && isEditMode ? 'ring-1 ring-zinc-600' : ''}`}
    >
      {renderContent()}
      
      {/* Edit Indicator */}
      {isEditMode && (isSelected || isHovered) && (
        <div className="absolute -top-8 left-0 flex items-center gap-2 bg-accent px-2 py-1 rounded text-xs text-white z-10">
          <span>לחץ לעריכה</span>
          {isSelected && (
            <button
              onClick={handleDelete}
              className="ml-2 p-1 hover:bg-red-700 rounded"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default EditableElement
