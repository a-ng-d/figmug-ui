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
        className={['message', isBlocked && 'message--blocked']
          .filter((n) => n)
          .join(' ')}
      >
        <Icon
          type="PICTO"
          iconName={icon}
          customClassName="icon"
        />
        <div className={`${texts.type} message__msg`}>{messages[0]}</div>
      </div>
    )
  }

  MultipleMessages = () => {
    const { icon, messages } = this.props

    return (
      <div className="callout">
        <div className="message">
          <Icon
            type="PICTO"
            iconName={icon}
            customClassName="icon"
          />
          <div className="message__ticker">
            <div
              className="message__tips"
              style={{
                animation: `ticker ${
                  messages.length * 5000
                }ms 0ms linear infinite`,
              }}
            >
              {messages.map((message, index) => {
                return (
                  <React.Fragment key={`message-${index}`}>
                    <div className={`${texts.type} message__msg`}>
                      {message}
                    </div>
                    <div className={`${texts.type} message__msg`}>﹒</div>
                  </React.Fragment>
                )
              })}
            </div>
            <div
              className="message__tips"
              style={{
                animation: `ticker ${
                  messages.length * 5000
                }ms 0ms linear infinite`,
              }}
            >
              {messages.map((message, index) => {
                return (
                  <React.Fragment key={`message-${index}`}>
                    <div className={`${texts.type} message__msg`}>
                      {message}
                    </div>
                    <div className={`${texts.type} message__msg`}>﹒</div>
                  </React.Fragment>
                )
              })}
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
