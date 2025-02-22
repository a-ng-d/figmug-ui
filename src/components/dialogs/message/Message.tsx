import React from 'react'
import texts from '@styles/texts.module.scss'
import type { IconList } from '@tps/icon.types'
import Icon from '@components/assets/icon/Icon'
import './message.scss'

export interface MessageProps {
  icon: IconList
  messages: Array<string>
  isBlocked?: boolean
}

export default class Message extends React.Component<MessageProps> {
  static defaultProps: Partial<MessageProps> = {
    isBlocked: false,
  }

  // Templates
  SingleMessage = () => {
    const { icon, messages, isBlocked } = this.props

    return (
      <div
        className={[
          'onboarding-tip',
          'recharged',
          isBlocked && 'onboarding-tip--blocked',
        ]
          .filter((n) => n)
          .join(' ')}
      >
        <Icon
          type="PICTO"
          iconName={icon}
          iconColor={
            isBlocked
              ? 'var(--figma-color-icon-disabled)'
              : 'var(--figma-color-icon)'
          }
          customClassName="icon"
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
          <div className="onboarding-tip recharged">
            <Icon
              type="PICTO"
              iconName={icon}
              customClassName="icon"
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
