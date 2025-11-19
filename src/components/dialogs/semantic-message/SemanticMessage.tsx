import React from 'react'
import { IconList } from '@tps/icon.types'
import layouts from '@styles/layouts.module.scss'
import { doClassnames } from '@a_ng_d/figmug-utils'
import Message from '../message/Message'
import './semantic-message.scss'

export interface SemanticMessageProps {
  type: 'NEUTRAL' | 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR'
  message: string
  isAnchored?: boolean
  orientation?: 'HORIZONTAL' | 'VERTICAL'
  actionsSlot?: React.ReactNode
}

export interface SemanticMessageStates {
  documentWidth: number
}

export default class SemanticMessage extends React.Component<
  SemanticMessageProps,
  SemanticMessageStates
> {
  static defaultProps: Partial<SemanticMessageProps> = {
    orientation: 'HORIZONTAL',
    isAnchored: false,
  }

  constructor(props: SemanticMessageProps) {
    super(props)
    this.state = {
      documentWidth:
        typeof document !== 'undefined'
          ? document.documentElement.clientWidth
          : 1024,
    }
  }

  // Lifecycle
  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize)
  }

  // Handlers
  handleResize = () => {
    this.setState({ documentWidth: document.documentElement.clientWidth })
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
    const { documentWidth } = this.state

    const isResponsiveVertical = documentWidth <= 460
    const effectiveOrientation = isResponsiveVertical ? 'VERTICAL' : orientation

    return (
      <div
        className={doClassnames([
          'semantic-message',
          `semantic-message--${type.toLowerCase()}`,
          effectiveOrientation === 'VERTICAL' && 'semantic-message--vertical',
          isAnchored && 'semantic-message--anchored',
        ])}
        role="status"
      >
        <div className="semantic-message__body">
          <Message
            icon={this.setIcon(type)}
            messages={[message]}
          />
        </div>
        {actionsSlot !== undefined && (
          <div
            className={doClassnames([
              layouts['snackbar--medium'],
              'semantic-message__actions',
            ])}
            role="toolbar"
          >
            {actionsSlot}
          </div>
        )}
      </div>
    )
  }
}
