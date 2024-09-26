import React from 'react'
import './simple-item.scss'

export interface SimpleItemProps {
  id: string
  leftPartSlot: React.ReactNode
  rightPartSlot?: React.ReactNode
  isCompact?: boolean
  isListItem?: boolean
  alignment?: 'DEFAULT' | 'CENTER' | 'BASELINE'
}

export class SimpleItem extends React.Component<SimpleItemProps> {
  static defaultProps: Partial<SimpleItemProps> = {
    isCompact: false,
    isListItem: true,
    alignment: 'DEFAULT',
  }

  // Render
  render() {
    const {
      id,
      leftPartSlot,
      rightPartSlot,
      isCompact,
      isListItem,
      alignment,
    } = this.props

    if (isListItem)
      return (
        <li
          data-id={id}
          className={[
            'simple-item',
            isCompact && 'simple-item--compact',
            `simple-item--${alignment?.toLowerCase()}`,
          ]
            .filter((n) => n)
            .join(' ')}
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
          isCompact && 'simple-item__compact',
          `${alignment?.toLowerCase()}`,
        ]
          .filter((n) => n)
          .join(' ')}
      >
        <div className="simple-item__left-part">{leftPartSlot}</div>
        <div className="simple-item__right-part">{rightPartSlot}</div>
      </div>
    )
  }
}
