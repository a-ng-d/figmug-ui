import React from 'react'
import Icon from '@components/assets/icon/Icon'
import './list.scss'

export interface ListProps {
  id?: string
  children?: React.ReactNode
  isLoading?: boolean
  isMessage?: boolean
}

export const List = (props: ListProps) => {
  const { id, children, isLoading = false, isMessage = false } = props

  return (
    <ul
      id={id}
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
