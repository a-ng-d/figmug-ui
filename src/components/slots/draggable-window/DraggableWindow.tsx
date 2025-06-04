import React, { useState, useRef, useEffect } from 'react'
import SectionTitle from '@components/assets/section-title/SectionTitle'
import Button from '@components/actions/button/Button'
import { doClassnames } from '@a_ng_d/figmug-utils'
import Bar from '../bar/Bar'

import './draggable-window.scss'

export interface DraggableWindowProps {
  title?: string
  children: React.ReactNode
  triggerRef: React.RefObject<Button>
  onClose: () => void
}

const DraggableWindow = (props: DraggableWindowProps) => {
  const { title = 'Options', children, triggerRef, onClose } = props
  const [isDragging, setIsDragging] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (triggerRef.current?.buttonRef?.current && windowRef.current) {
      const windowRect = windowRef.current.getBoundingClientRect()
      const triggerRect =
        triggerRef.current.buttonRef.current.getBoundingClientRect()

      setPosition({
        x: triggerRect.left - windowRect.width - 8,
        y: 0,
      })
      setIsOpen(true)
    }
  }, [triggerRef])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      e.target instanceof HTMLElement &&
      e.target.closest('.draggable-window__header')
    ) {
      setIsDragging(true)
      setOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging)
        setPosition({
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        })
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, offset])

  return (
    <div
      className={doClassnames([
        'draggable-window',
        isDragging && 'draggable-window--dragging',
      ])}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        visibility: isOpen ? 'visible' : 'hidden',
      }}
      onMouseDown={handleMouseDown}
      ref={windowRef}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      <div
        className="draggable-window__header"
        role="presentation"
      >
        <Bar
          leftPartSlot={
            <SectionTitle
              label={title}
              id={`draggable-window-title-${title}`}
            />
          }
          rightPartSlot={
            <Button
              type="icon"
              icon="close"
              action={onClose}
            />
          }
          padding="0 var(--size-xxsmall)"
          isCompact
          shouldReflow={false}
          border={['BOTTOM']}
        />
      </div>
      <div
        className="draggable-window__content"
        role="document"
      >
        {children}
      </div>
    </div>
  )
}

export default DraggableWindow
