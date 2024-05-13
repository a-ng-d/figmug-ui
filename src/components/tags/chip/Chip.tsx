import React from 'react'
import texts from '../../../styles/texts.module.scss'
import './chip.scss'

export interface ChipProps {
  state?: 'ACTIVE' | 'INACTIVE'
  children: React.ReactNode
}

export const Chip = (props: ChipProps) => {
  const { children, state = 'ACTIVE' } = props

  return (
    <div className={[
      'chip',
      'recharged',
      state === 'INACTIVE' ? 'chip--inactive' : null
    ]
      .filter((n) => n)
      .join(' ')
    }>
      <div className={['chip__text', texts.type].filter((n) => n).join(' ')}>
        {children}
      </div>
    </div>
  )
}
