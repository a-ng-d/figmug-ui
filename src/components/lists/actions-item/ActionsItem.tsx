import React from 'react'
import texts from '@styles/texts/texts.module.scss'
import layouts from '@styles/layouts.module.scss'
import Chip from '@components/tags/chip/Chip'
import Thumbnail from '@components/assets/thumbnail/Thumbnail'
import Avatar from '@components/assets/avatar/Avatar'
import { doClassnames } from '@a_ng_d/figmug-utils'
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

export default class ActionsItem extends React.Component<ActionsItemProps> {
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
        className={doClassnames([
          'actions-item',
          isInteractive && 'actions-item--interactive',
        ])}
        data-id={id}
        role="listitem"
        aria-label={name}
        tabIndex={isInteractive ? 0 : -1}
        onMouseDown={isInteractive ? action : undefined}
        onKeyDown={(e) => {
          if ((e.key === ' ' || e.key === 'Enter') && isInteractive) action?.(e)
          if (e.key === 'Escape' && isInteractive)
            (e.target as HTMLElement).blur()
        }}
      >
        {src !== undefined && (
          <div
            className="actions-item__asset"
            role="presentation"
          >
            <Thumbnail src={src} />
          </div>
        )}
        <div
          className="actions-item__content"
          role="group"
        >
          <div>
            <div
              className={doClassnames([texts.type, texts['type--large']])}
              role="heading"
              aria-level={2}
            >
              {name}
              {indicator !== undefined && (
                <Chip state={indicator.status}>{indicator.label}</Chip>
              )}
            </div>
            <div className={texts.type}>{description}</div>
            <div
              className={doClassnames([texts.type, texts['type--secondary']])}
              style={{
                marginTop: '2px',
              }}
            >
              {subdescription}
            </div>
          </div>
          {complementSlot !== undefined && (
            <div
              className="actions-item__complement"
              role="complementary"
            >
              {complementSlot}
            </div>
          )}
          {user !== undefined && (
            <Avatar
              avatar={user.avatar}
              fullName={user.name}
            />
          )}
        </div>
        {actionsSlot !== undefined && (
          <div
            className={layouts['snackbar--medium']}
            role="group"
          >
            {actionsSlot}
          </div>
        )}
      </li>
    )
  }
}
