import React from 'react'
import Icon from '@components/assets/icon/Icon'
import { doClassnames } from '@a_ng_d/figmug-utils'
import './list.scss'

export interface ListProps {
  id?: string
  children?: React.ReactNode
  hasTopBorder?: boolean
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
      className={doClassnames([
        'list',
        isLoading && 'list--loading',
        isMessage && 'list--message',
      ])}
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
