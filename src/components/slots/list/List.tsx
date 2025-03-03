import React from 'react'
import Icon from '@components/assets/icon/Icon'
import './list.scss'

export interface ListProps {
  id?: string
  children?: React.ReactNode
  isLoading?: boolean
  isMessage?: boolean
  padding?: string
}

export const List = (props: ListProps) => {
  const { id, children, isLoading = false, isMessage = false, padding } = props

  return (
    <ul
      id={id}
      style={{
        padding: padding,
      }}
      className={[
        'list',
        isLoading && 'list--loading',
        isMessage && 'list--message',
      ]
        .filter((n) => n)
        .join(' ')}
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
