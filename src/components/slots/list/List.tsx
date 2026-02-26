import React, { useState } from 'react'
import { doClassnames } from '@unoff/utils'
import Icon from '@components/assets/icon/Icon'
import './list.scss'

export interface ListProps {
  /**
   * HTML id attribute
   */
  id?: string
  /**
   * List item elements
   */
  children?: React.ReactNode
  /**
   * Custom padding value
   */
  padding?: string
  /**
   * Whether to show a border on scroll
   * @default false
   */
  isTopBorderEnabled?: boolean
  /**
   * Whether to show loading state
   * @default false
   */
  isLoading?: boolean
  /**
   * Whether the list contains message items
   * @default false
   */
  isMessage?: boolean
  /**
   * Whether to use alternate styling
   * @default false
   */
  isAlternate?: boolean
  /**
   * Whether to use full width
   * @default false
   */
  isFullWidth?: boolean
  /**
   * Whether to use full height
   * @default false
   */
  isFullHeight?: boolean
}

export const List = (props: ListProps) => {
  const {
    id,
    children,
    isLoading = false,
    isMessage = false,
    padding,
    isTopBorderEnabled = false,
    isAlternate = false,
    isFullWidth = false,
    isFullHeight = false,
  } = props
  const [hasTopBorder, setTopBorder] = useState(false)

  const onScroll = (e: React.UIEvent<HTMLUListElement>) => {
    e.preventDefault()
    if (e.currentTarget.scrollTop > 0 && isTopBorderEnabled) setTopBorder(true)
    else setTopBorder(false)
  }

  return (
    <ul
      id={id}
      style={{
        padding: padding,
        listStyleType: 'none',
      }}
      className={doClassnames([
        'list',
        isLoading && 'list--loading',
        isMessage && 'list--message',
        hasTopBorder && 'list--top-border',
        isAlternate && 'list--alternate',
        isFullWidth && 'list--full-width',
        isFullHeight && 'list--full-height',
      ])}
      onScroll={onScroll}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <li>
          <Icon
            type="PICTO"
            iconName="spinner"
            role="status"
            aria-hidden="true"
          />
        </li>
      ) : (
        children
      )}
    </ul>
  )
}
export default List
