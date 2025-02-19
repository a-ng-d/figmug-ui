import React from 'react'
import './list.scss'
import { Icon } from '../../../components/assets/icon/Icon'

export interface ListProps {
  children?: React.ReactNode
  isLoading?: boolean
  isMessage?: boolean
}

export const List = (props: ListProps) => {
  const { children, isLoading = false, isMessage = false } = props

  return (
    <ul
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
