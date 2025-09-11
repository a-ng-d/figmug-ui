import { SyntheticEvent, useEffect, useRef, useCallback } from 'react'
import PopIn from '@components/slots/popin/Popin'
import './dialog.scss'
import { doClassnames } from '@a_ng_d/figmug-utils'

export interface DialogProps {
  title: string
  tag?: string
  actions?: {
    primary?: {
      label: string
      state?: 'DEFAULT' | 'DISABLED' | 'LOADING'
      feature?: string
      action: React.ReactEventHandler | (() => void)
    }
    destructive?: {
      label: string
      state?: 'DEFAULT' | 'DISABLED' | 'LOADING'
      feature?: string
      action: React.ReactEventHandler | (() => void)
    }
    secondary?: {
      label: string
      state?: 'DEFAULT' | 'DISABLED' | 'LOADING'
      feature?: string
      action: React.ReactEventHandler | (() => void)
    }
  }
  select?: {
    label: string
    state: boolean
    action: React.ChangeEventHandler<HTMLInputElement>
  }
  indicator?: string
  pin?: 'CENTER' | 'RIGHT'
  isLoading?: boolean
  isMessage?: boolean
  children?: React.ReactNode
  onClose: React.ReactEventHandler
}

const Dialog = (props: DialogProps) => {
  const {
    title,
    actions,
    select,
    indicator,
    tag,
    pin = 'CENTER',
    isLoading = false,
    isMessage = false,
    children,
    onClose,
  } = props

  const dialogRef = useRef<HTMLDivElement>(null)

  const getFocusableElements = useCallback(() => {
    if (!dialogRef.current) return []

    return Array.from(
      dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[]
  }, [])

  const handleTabKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const focusableElements = getFocusableElements()
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    },
    [getFocusableElements]
  )

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) =>
      event.key === 'Escape' && onClose(event as unknown as SyntheticEvent)

    document.addEventListener('keydown', handleEscapeKey)
    document.addEventListener('keydown', handleTabKey)

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
      document.removeEventListener('keydown', handleTabKey)
    }
  }, [onClose, handleTabKey])

  useEffect(() => {
    const previouslyFocusedElement = document.activeElement as HTMLElement

    dialogRef.current?.focus()

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''

      previouslyFocusedElement?.focus()
    }
  }, [])

  const closeHandler = (e: SyntheticEvent) => {
    if (e.currentTarget === e.target) onClose(e)
  }

  return (
    <div
      ref={dialogRef}
      className={doClassnames(['dialog', pin === 'RIGHT' && 'dialog--right'])}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onMouseDown={closeHandler}
    >
      <PopIn
        type={pin === 'RIGHT' ? 'PANEL' : 'POPIN'}
        title={title}
        actions={actions}
        select={select}
        indicator={indicator}
        tag={tag}
        isLoading={isLoading}
        isMessage={isMessage}
        onClose={onClose}
      >
        {children}
      </PopIn>
    </div>
  )
}

export default Dialog
