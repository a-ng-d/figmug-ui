import { SyntheticEvent, useEffect } from 'react'
import { doClassnames } from '@unoff/utils'
import PopIn from '@components/slots/popin/Popin'
import './dialog.scss'

export interface DialogProps {
  /**
   * Title of the dialog
   */
  title: string
  /**
   * Optional tag displayed next to the title
   */
  tag?: string
  /**
   * Configuration for action buttons
   */
  actions?: {
    /** Primary action button */
    primary?: {
      label: string
      state?: 'DEFAULT' | 'DISABLED' | 'LOADING'
      feature?: string
      isAutofocus?: boolean
      action: React.ReactEventHandler | (() => void)
    }
    /** Destructive action button */
    destructive?: {
      label: string
      state?: 'DEFAULT' | 'DISABLED' | 'LOADING'
      feature?: string
      isAutofocus?: boolean
      action: React.ReactEventHandler | (() => void)
    }
    /** Secondary action button */
    secondary?: {
      label: string
      state?: 'DEFAULT' | 'DISABLED' | 'LOADING'
      feature?: string
      isAutofocus?: boolean
      action: React.ReactEventHandler | (() => void)
    }
  }
  /**
   * Select/checkbox configuration
   */
  select?: {
    /** Label for the select */
    label: string
    /** Current state */
    state: boolean
    /** Change handler */
    action: React.ChangeEventHandler<HTMLInputElement>
  }
  /**
   * Optional indicator text
   */
  indicator?: string
  /**
   * Position of the dialog
   * @default 'CENTER'
   */
  pin?: 'CENTER' | 'RIGHT'
  /**
   * Whether the dialog is in loading state
   * @default false
   */
  isLoading?: boolean
  /**
   * Whether to use message layout
   * @default false
   */
  isMessage?: boolean
  /**
   * Dialog content
   */
  children?: React.ReactNode
  /**
   * Close handler
   */
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

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) =>
      event.key === 'Escape' && onClose(event as unknown as SyntheticEvent)

    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [onClose])

  const closeHandler = (e: SyntheticEvent) => {
    if (e.currentTarget === e.target) onClose(e)
  }

  return (
    <dialog
      className={doClassnames(['dialog', pin === 'RIGHT' && 'dialog--right'])}
      role="dialog"
      aria-modal="true"
      aria-label={title}
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
    </dialog>
  )
}

export default Dialog
