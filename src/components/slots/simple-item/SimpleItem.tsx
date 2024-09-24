import React from 'react'
import './simple-item.scss'

export interface SimpleItemProps {
  id: string
  leftPartSlot: React.ReactNode
  rightPartSlot?: React.ReactNode
  isCompact?: boolean
}

export class SimpleItem extends React.Component<SimpleItemProps> {
  static defaultProps: Partial<SimpleItemProps> = {
    isCompact: false,
  }

  // Render
  render() {
    const { id, leftPartSlot, rightPartSlot, isCompact } = this.props

    return (
      <li
        data-id={id}
        className={['simple-item', isCompact && 'simple-item__compact']
          .filter((n) => n)
          .join(' ')}
      >
        <div className="simple-item__left-part">{leftPartSlot}</div>
        <div className="simple-item__right-part">{rightPartSlot}</div>
      </li>
    )
  }
}
