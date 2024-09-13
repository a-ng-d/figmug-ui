import React from 'react'
import texts from '../../../styles/texts.module.scss'
import Thumbnail from '../../assets/thumbnail/Thumbnail'
import { Chip } from '../../tags/chip/Chip'
import './actions-item.scss'

interface ActionsItemProps {
  id: string
  src?: string
  name: string
  indicator?: {
    label: string
    status: 'ACTIVE' | 'INACTIVE'
  }
  description: string
  subdescription: string
  complement?: React.ReactNode
  user?: {
    avatar?: string
    name: string
  }
  actions?: React.ReactNode
  isInteractive?: boolean
  action?: React.MouseEventHandler<HTMLLIElement> &
    React.KeyboardEventHandler<HTMLLIElement>
}

interface ActionsItemStates {
  backgroundStyle: string
}

export default class ActionsItem extends React.Component<
  ActionsItemProps,
  ActionsItemStates
> {
  static defaultProps: Partial<ActionsItemProps> = {
    isInteractive: false,
  }

  render() {
    return (
      <li
        className={[
          'actions-item',
          this.props.isInteractive ? 'actions-item--interactive' : null,
        ]
          .filter((n) => n)
          .join(' ')}
        data-id={this.props.id}
        tabIndex={this.props.isInteractive ? 0 : -1}
        onMouseDown={this.props.isInteractive ? this.props.action : undefined}
        onKeyDown={(e) => {
          if ((e.key === ' ' || e.key === 'Enter') && this.props.isInteractive)
            this.props.action?.(e)
          if (e.key === 'Escape' && this.props.isInteractive)
            (e.target as HTMLElement).blur()
        }}
      >
        {this.props.src !== undefined && (
          <div className="actions-item__asset">
            <Thumbnail src={this.props.src} />
          </div>
        )}
        <div className="actions-item__content">
          <div>
            <div className={`${texts.type} type--large`}>
              {this.props.name}
              {this.props.indicator !== undefined && (
                <Chip state={this.props.indicator.status}>
                  {this.props.indicator.label}
                </Chip>
              )}
            </div>
            <div className={`${texts.type} type`}>{this.props.description}</div>
            <div
              className={`${texts.type} ${texts['type--secondary']} type`}
              style={{
                marginTop: '2px',
              }}
            >
              {this.props.subdescription}
            </div>
          </div>
          {this.props.complement !== undefined && this.props.complement}
          {this.props.user !== undefined && (
            <div className="actions-item__user">
              {this.props.user.avatar !== undefined && (
                <div className="actions-item__user__avatar">
                  <img src={this.props.user.avatar} />
                </div>
              )}
              <div className={`${texts.type} ${texts['type--secondary']} type`}>
                {this.props.user.name}
              </div>
            </div>
          )}
        </div>
        <div className="actions-item__actions">
          {this.props.actions !== undefined && this.props.actions}
        </div>
      </li>
    )
  }
}
