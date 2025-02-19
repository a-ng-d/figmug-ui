import React from 'react'
import layouts from '../../../styles/layouts.module.scss'
import texts from '../../../styles/texts.module.scss'
import Thumbnail from '../../assets/thumbnail/Thumbnail'
import { Chip } from '../../tags/chip/Chip'
import './actions-item.scss'
import Avatar from '../../../components/assets/avatar/Avatar'

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
  complementSlot?: React.ReactNode
  user?: {
    avatar?: string
    name: string
  }
  actionsSlot?: React.ReactNode
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
      complementSlot,
      user,
      actionsSlot,
      isInteractive,
      action,
    } = this.props
    return (
      <li
        className={[
          'actions-item',
          isInteractive && 'actions-item--interactive',
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
          {complementSlot !== undefined && (
            <div className="actions-item__complement">{complementSlot}</div>
          )}
          {user !== undefined && (
            <Avatar
              avatar={user.avatar}
              fullName={user.name}
            />
          )}
        </div>
        {actionsSlot !== undefined && (
          <div className={layouts['snackbar--medium']}>{actionsSlot}</div>
        )}
      </li>
    )
  }
}
