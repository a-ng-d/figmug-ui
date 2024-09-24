import React from 'react'
import './simple-item.scss'

export interface SimpleItemProps {
  id: string
  index: number
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
    const { id, index, leftPartSlot, rightPartSlot, isCompact } = this.props

    return (
      <li
        data-id={id}
        data-position={index}
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
