import React from 'react'
import layouts from '@styles/layouts.module.scss'
import { IconList } from '@tps/icon.types'
import Message from '../message/Message'
import './semantic-message.scss'

export interface SemanticMessageProps {
  type: 'NEUTRAL' | 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR'
  message: string
  isAnchored?: boolean
  orientation?: 'HORIZONTAL' | 'VERTICAL'
  actionsSlot?: React.ReactNode
}

export default class SemanticMessage extends React.Component<SemanticMessageProps> {
  static defaultProps: Partial<SemanticMessageProps> = {
    orientation: 'HORIZONTAL',
    isAnchored: false,
  }

  setIcon = (type: string): IconList => {
    if (type === 'SUCCESS') return 'check'
    else if (type === 'WARNING') return 'warning'
    else if (type === 'ERROR') return 'alert'

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
            className={`${layouts['snackbar--medium']} semantic-message__actions`}
          >
            {actionsSlot}
          </div>
        )}
      </div>
    )
  }
}
