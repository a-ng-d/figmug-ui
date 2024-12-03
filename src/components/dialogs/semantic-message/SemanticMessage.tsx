import React from 'react'
import './semantic-message.scss'
import { Message } from '../message/Message'
import { IconList } from 'src/types/icon.types'
import { layouts } from 'src'

export interface SemanticMessageProps {
  type: 'NEUTRAL' | 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR'
  message: string
  isAnchored?: boolean
  orientation?: 'HORIZONTAL' | 'VERTICAL'
  actionsSlot?: React.ReactNode
}

export class SemanticMessage extends React.Component<SemanticMessageProps> {
  static defaultProps: Partial<SemanticMessageProps> = {
    orientation: 'HORIZONTAL',
    isAnchored: false,
  }

  setIcon = (type: string): IconList => {
    if (type === 'SUCCESS') {
      return 'check'
    } else if (type === 'WARNING') {
      return 'warning'
    } else if (type === 'ERROR') {
      return 'alert'
    }
    return 'info'
  }

  // Render
  render() {
    const { type, message, isAnchored, orientation, actionsSlot } = this.props

    return (
      <div
        style={{
          paddingRight:
            orientation === 'HORIZONTAL' && actionsSlot !== undefined
              ? 'var(--size-xxsmall)'
              : '0',
        }}
        className={[
          'semantic-message',
          `semantic-message--${type.toLowerCase()}`,
          orientation === 'VERTICAL' && 'semantic-message--vertical',
          isAnchored && 'semantic-message--anchored',
        ]
          .filter((n) => n)
          .join(' ')}
      >
        <div className="semantic-message__body">
          <Message
            icon={this.setIcon(type)}
            messages={[message]}
          />
        </div>
        {actionsSlot !== undefined && (
          <div
            className={`${layouts['snackbar']} ${layouts['snackbar']} semantic-message__actions`}
          >
            {actionsSlot}
          </div>
        )}
      </div>
    )
  }
}
