import React from 'react'
import { doClassnames } from '@a_ng_d/figmug-utils'
import './simple-item.scss'

export interface SimpleItemProps {
  id?: string
  leftPartSlot: React.ReactNode
  rightPartSlot?: React.ReactNode
  isListItem?: boolean
  isInteractive?: boolean
  isTransparent?: boolean
  alignment?: 'DEFAULT' | 'CENTER' | 'BASELINE'
  action?: React.MouseEventHandler<HTMLLIElement | HTMLElement> &
    React.KeyboardEventHandler<HTMLLIElement | HTMLElement>
}

export default class SimpleItem extends React.Component<SimpleItemProps> {
  static defaultProps: Partial<SimpleItemProps> = {
    isListItem: true,
    isInteractive: false,
    isTransparent: false,
    alignment: 'DEFAULT',
  }

  render() {
    const {
      id,
      leftPartSlot,
      rightPartSlot,
      isListItem,
      isInteractive,
      isTransparent,
      alignment,
      action,
    } = this.props

    if (isListItem)
      return (
        <li
          data-id={id}
          className={doClassnames([
            'simple-item',
            alignment === 'CENTER' && 'simple-item--centered',
            alignment === 'BASELINE' && 'simple-item--baseline',
            isInteractive && 'simple-item--interactive',
            isTransparent && 'simple-item--transparent',
          ])}
          tabIndex={isInteractive ? 0 : -1}
          onMouseDown={isInteractive ? action : undefined}
          onKeyDown={(e) => {
            if ((e.key === ' ' || e.key === 'Enter') && isInteractive)
              action?.(e)
            if (e.key === 'Escape' && isInteractive)
              (e.target as HTMLElement).blur()
          }}
          role={isInteractive ? 'button' : 'listitem'}
        >
          <div
            className="simple-item__left"
            role="presentation"
          >
            {leftPartSlot}
          </div>
          <div
            className="simple-item__right"
            role="presentation"
          >
            {rightPartSlot}
          </div>
        </li>
      )
    return (
      <div
        data-id={id}
        className={doClassnames([
          'simple-item',
          alignment === 'CENTER' && 'simple-item--centered',
          alignment === 'BASELINE' && 'simple-item--baseline',
          isInteractive && 'simple-item--interactive',
        ])}
        tabIndex={isInteractive ? 0 : -1}
        onMouseDown={isInteractive ? action : undefined}
        onKeyDown={(e) => {
          if ((e.key === ' ' || e.key === 'Enter') && isInteractive) action?.(e)
          if (e.key === 'Escape' && isInteractive)
            (e.target as HTMLElement).blur()
        }}
        role={isInteractive ? 'button' : 'group'}
      >
        <div
          className="simple-item__left"
          role="presentation"
        >
          {leftPartSlot}
        </div>
        <div
          className="simple-item__right"
          role="presentation"
        >
          {rightPartSlot}
        </div>
      </div>
    )
  }
}
