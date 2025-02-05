import { SyntheticEvent } from 'react'
import { PopIn } from '../../slots/popin/Popin'
import './dialog.scss'

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
  children: React.ReactNode
  onClose: React.ReactEventHandler
}

export const Dialog = (props: DialogProps) => {
  const { title, actions, select, indicator, tag, children, onClose } = props

  const closeHandler = (e: SyntheticEvent) => {
    if (e.currentTarget === e.target) onClose(e)
  }

  return (
    <div
      className="dialog recharged"
      role="button"
      tabIndex={-1}
      onMouseDown={closeHandler}
    >
      <PopIn
        title={title}
        actions={actions}
        select={select}
        indicator={indicator}
        tag={tag}
        onClose={onClose}
      >
        {children}
      </PopIn>
    </div>
  )
}
