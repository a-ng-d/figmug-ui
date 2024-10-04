import React from 'react'
import './simple-item.scss'

export interface SimpleItemProps {
  id: string
  leftPartSlot: React.ReactNode
  rightPartSlot?: React.ReactNode
  isListItem?: boolean
  isInteractive?: boolean
  alignment?: 'DEFAULT' | 'CENTER' | 'BASELINE'
  action?: React.MouseEventHandler<HTMLLIElement | HTMLElement> &
    React.KeyboardEventHandler<HTMLLIElement | HTMLElement>
}

export class SimpleItem extends React.Component<SimpleItemProps> {
  static defaultProps: Partial<SimpleItemProps> = {
    isListItem: true,
    isInteractive: false,
    alignment: 'DEFAULT',
  }

  // Render
  render() {
    const {
      id,
      leftPartSlot,
      rightPartSlot,
      isListItem,
      isInteractive,
      alignment,
      action,
    } = this.props

    if (isListItem)
      return (
        <li
          data-id={id}
          className={[
            'simple-item',
            `simple-item--${alignment?.toLowerCase()}`,
            isInteractive && 'simple-item--interactive',
          ]
            .filter((n) => n)
            .join(' ')}
          tabIndex={isInteractive ? 0 : -1}
          onMouseDown={isInteractive ? action : undefined}
          onKeyDown={(e) => {
            if ((e.key === ' ' || e.key === 'Enter') && isInteractive)
              action?.(e)
            if (e.key === 'Escape' && isInteractive)
              (e.target as HTMLElement).blur()
          }}
        >
          <div className="simple-item__left-part">{leftPartSlot}</div>
          <div className="simple-item__right-part">{rightPartSlot}</div>
        </li>
      )
    return (
      <div
        data-id={id}
        className={[
          'simple-item',
          `${alignment?.toLowerCase()}`,
          isInteractive && 'simple-item--interactive',
        ]
          .filter((n) => n)
          .join(' ')}
        tabIndex={isInteractive ? 0 : -1}
        onMouseDown={isInteractive ? action : undefined}
        onKeyDown={(e) => {
          if ((e.key === ' ' || e.key === 'Enter') && isInteractive) action?.(e)
          if (e.key === 'Escape' && isInteractive)
            (e.target as HTMLElement).blur()
        }}
      >
        <div className="simple-item__left-part">{leftPartSlot}</div>
        <div className="simple-item__right-part">{rightPartSlot}</div>
      </div>
    )
  }
}
