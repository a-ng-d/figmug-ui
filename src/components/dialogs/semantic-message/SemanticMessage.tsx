import React from 'react'
import './semantic-message.scss'
import { Message } from '../message/Message'
import { IconList } from 'src/types/icon.types'

export interface SemanticMessageProps {
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR'
  message: string
  isAnchored?: boolean
  action?: React.ReactNode
}

export class SemanticMessage extends React.Component<SemanticMessageProps> {
  static defaultProps: Partial<SemanticMessageProps> = {
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
    const { type, message, isAnchored, action } = this.props

    return (
      <div
        className={[
          'semantic-message',
          `semantic-message--${type.toLowerCase()}`,
          isAnchored && 'semantic-message--anchored',
        ]
          .filter((n) => n)
          .join(' ')}
      >
        <Message
          icon={this.setIcon(type)}
          messages={[message]}
        />
        {action}
      </div>
    )
  }
}
