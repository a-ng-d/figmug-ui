import React, { useState } from 'react'
import Icon from '@components/assets/icon/Icon'
import { doClassnames } from '@a_ng_d/figmug-utils'
import './list.scss'

export interface ListProps {
  id?: string
  children?: React.ReactNode
  padding?: string
  isTopBorderEnabled?: boolean
  isLoading?: boolean
  isMessage?: boolean
  isAlternate?: boolean
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
      }}
      className={doClassnames([
        'list',
        isLoading && 'list--loading',
        isMessage && 'list--message',
        hasTopBorder && 'list--top-border',
        isAlternate && 'list--alternate',
      ])}
      onScroll={onScroll}
    >
      {isLoading ? (
        <Icon
          type="PICTO"
          iconName="spinner"
        />
      ) : (
        children
      )}
    </ul>
  )
}
export default List
