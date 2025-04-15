import React from 'react'
import { doClassnames } from '@a_ng_d/figmug-utils'
import texts from '@styles/texts/texts.module.scss'
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
        className={doClassnames(['message', isBlocked && 'message--blocked'])}
      >
        <Icon
          type="PICTO"
          iconName={icon}
          customClassName="icon"
        />
        <div className={doClassnames([texts.type, 'message__msg'])}>
          {messages[0]}
        </div>
      </div>
    )
  }

  MultipleMessages = () => {
    const { icon, messages } = this.props

    return (
      <div className="callout">
        <div className="message message--multiple">
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
                    <div className={doClassnames([texts.type, 'message__msg'])}>
                      {message}
                    </div>
                    <div className={doClassnames([texts.type, 'message__msg'])}>
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
            >
              {messages.map((message, index) => {
                return (
                  <React.Fragment key={`message-${index}`}>
                    <div className={doClassnames([texts.type, 'message__msg'])}>
                      {message}
                    </div>
                    <div className={doClassnames([texts.type, 'message__msg'])}>
                      ﹒
                    </div>
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
