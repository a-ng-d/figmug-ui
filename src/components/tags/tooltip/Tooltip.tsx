import React from 'react'
import texts from '../../../styles/texts.module.scss'
import './tooltip.scss'

export interface TooltipProps {
  children: React.ReactNode
}

export const Tooltip = (props: TooltipProps) => {
  const { children } = props

  return (
    <div className={['tooltip', 'recharged'].filter((n) => n).join(' ')}>
      <div className="tooltip__block">
        <div
          className={['tooltip__text', texts.type, 'type']
            .filter((n) => n)
            .join(' ')}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
