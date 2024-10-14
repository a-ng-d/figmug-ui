import React from 'react'
import './semantic-message.scss'
import { Message } from '../message/Message'
import { IconList } from 'src/types/icon.types'

export interface SemanticMessageProps {
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR'
  message: string
  action?: React.ReactNode
}

export class SemanticMessage extends React.Component<SemanticMessageProps> {
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
    const { type, message, action } = this.props

    return (
      <div
        className={`semantic-message semantic-message--${type.toLowerCase()}`}
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
