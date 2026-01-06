import React from 'react'
import texts from '@styles/texts/texts.module.scss'
import Icon from '@components/assets/icon/Icon'
import { doClassnames } from '@a_ng_d/figmug-utils'
import type { IconList } from '@tps/icon.types'
import './message.scss'

export interface MessageProps {
  /**
   * Icon to display with the message
   */
  icon: IconList
  /**
   * Array of message strings to display
   */
  messages: Array<string>
  /**
   * Whether the message is blocked
   * @default false
   */
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
        className={doClassnames(['message', isBlocked && 'message--blocked'])}
        role="status"
        aria-live="polite"
      >
        <Icon
          type="PICTO"
          iconName={icon}
          customClassName="icon"
          aria-hidden="true"
        />
        <div
          className={doClassnames([texts.type, 'message__msg'])}
          role="presentation"
        >
          {messages[0]}
        </div>
      </div>
    )
  }

  MultipleMessages = () => {
    const { icon, messages } = this.props

    return (
      <div
        className="message message--multiple"
        role="status"
        aria-live="polite"
      >
        <Icon
          type="PICTO"
          iconName={icon}
          customClassName="icon"
          aria-hidden="true"
        />
        <div
          className="message__ticker"
          role="marquee"
        >
          <div
            className="message__tips"
            style={{
              animation: `ticker ${
                messages.length * 5000
              }ms 0ms linear infinite`,
            }}
            role="presentation"
          >
            {messages.map((message, index) => {
              return (
                <React.Fragment key={`message-${index}`}>
                  <div
                    className={doClassnames([texts.type, 'message__msg'])}
                    role="presentation"
                  >
                    {message}
                  </div>
                  <div
                    className={doClassnames([texts.type, 'message__msg'])}
                    role="presentation"
                    aria-hidden="true"
                  >
                    ﹒
                  </div>
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
            role="presentation"
            aria-hidden="true"
          >
            {messages.map((message, index) => {
              return (
                <React.Fragment key={`message-${index}`}>
                  <div
                    className={doClassnames([texts.type, 'message__msg'])}
                    role="presentation"
                  >
                    {message}
                  </div>
                  <div
                    className={doClassnames([texts.type, 'message__msg'])}
                    role="presentation"
                    aria-hidden="true"
                  >
                    ﹒
                  </div>
                </React.Fragment>
              )
            })}
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
