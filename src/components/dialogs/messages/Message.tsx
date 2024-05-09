import React from 'react'
import type { IconList } from '../../../types/icon.types'
import { Icon } from 'src/components/icon/Icon'
import texts from '../../../styles/texts.module.scss'
import './message.scss'

export interface MessageProps {
  icon: IconList
  messages: Array<string>
  isBlocked?: boolean
}

export class Message extends React.Component<MessageProps> {
  static defaultProps = {
    isBlocked: false,
  }

  // Templates
  SingleMessage = () => {
    const { icon, messages, isBlocked } = this.props

    return (
      <div
        className={[
          'onboarding-tip',
          isBlocked ? 'onboarding-tip--blocked' : null,
        ]
          .filter((n) => n)
          .join(' ')}
      >
        <Icon
          type="PICTO"
          iconName={icon}
        />
        <div className="onboarding-tip__msg">{messages[0]}</div>
      </div>
    )
  }

  MultipleMessages = () => {
    const { icon, messages } = this.props

    return (
      <div className="callout">
        <div>
          <div className="onboarding-tip">
            <Icon
              type="PICTO"
              iconName={icon}
            />
            <div className="onboarding-tip__ticker">
              <div
                className="onboarding-tip__tips"
                style={{
                  animation: `ticker ${
                    messages.length * 5000
                  }ms 0ms linear infinite`,
                }}
              >
                {messages.map((message, index) => {
                  return (
                    <React.Fragment key={`message-${index}`}>
                      <div className="onboarding-tip__msg">{message}</div>
                      <div className={`type ${texts.type}`}>﹒</div>
                    </React.Fragment>
                  )
                })}
              </div>
              <div
                className="onboarding-tip__tips"
                style={{
                  animation: `ticker ${
                    messages.length * 5000
                  }ms 0ms linear infinite`,
                }}
              >
                {messages.map((message, index) => {
                  return (
                    <React.Fragment key={`message-${index}`}>
                      <div className="onboarding-tip__msg">{message}</div>
                      <div className={`type ${texts.type}`}>﹒</div>
                    </React.Fragment>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render
  render() {
    const { messages } = this.props

    if (messages.length > 1) return this.MultipleMessages()
    return this.SingleMessage()
  }
}
