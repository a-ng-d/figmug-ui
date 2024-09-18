import React from 'react'
import texts from '../../../styles/texts.module.scss'
import layouts from '../../../styles/layouts.module.scss'
import Thumbnail from '../../assets/thumbnail/Thumbnail'
import { Chip } from '../../tags/chip/Chip'
import './actions-item.scss'

export interface ActionsItemProps {
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

export class ActionsItem extends React.Component<ActionsItemProps> {
  static defaultProps: Partial<ActionsItemProps> = {
    isInteractive: false,
  }

  render() {
    const {
      id,
      src,
      name,
      indicator,
      description,
      subdescription,
      complement,
      user,
      actions,
      isInteractive,
      action,
    } = this.props
    return (
      <li
        className={[
          'actions-item',
          isInteractive ? 'actions-item--interactive' : null,
        ]
          .filter((n) => n)
          .join(' ')}
        data-id={id}
        tabIndex={isInteractive ? 0 : -1}
        onMouseDown={isInteractive ? action : undefined}
        onKeyDown={(e) => {
          if ((e.key === ' ' || e.key === 'Enter') && isInteractive) action?.(e)
          if (e.key === 'Escape' && isInteractive)
            (e.target as HTMLElement).blur()
        }}
      >
        {src !== undefined && (
          <div className="actions-item__asset">
            <Thumbnail src={src} />
          </div>
        )}
        <div className="actions-item__content">
          <div>
            <div className={`${texts.type} type--large`}>
              {name}
              {indicator !== undefined && (
                <Chip state={indicator.status}>{indicator.label}</Chip>
              )}
            </div>
            <div className={`${texts.type} type`}>{description}</div>
            <div
              className={`${texts.type} ${texts['type--secondary']} type`}
              style={{
                marginTop: '2px',
              }}
            >
              {subdescription}
            </div>
          </div>
          {complement !== undefined && (
            <div className="actions-item__complement">{complement}</div>
          )}
          {user !== undefined && (
            <div className="actions-item__user">
              {user.avatar !== undefined && (
                <div className="actions-item__user__avatar">
                  <img src={user.avatar} />
                </div>
              )}
              <div className={`${texts.type} ${texts['type--secondary']} type`}>
                {user.name}
              </div>
            </div>
          )}
        </div>
        <div className={layouts['snackbar']}>
          {actions !== undefined && actions}
        </div>
      </li>
    )
  }
}
