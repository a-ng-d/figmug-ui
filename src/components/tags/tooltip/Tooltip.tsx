import React, { useEffect, useRef } from 'react'
import texts from '@styles/texts.module.scss'
import './tooltip.scss'

export interface TooltipProps {
  children: React.ReactNode
  pin?: 'TOP' | 'BOTTOM'
  isSingleLine?: boolean
}

const Tooltip = (props: TooltipProps) => {
  const { children, pin = 'BOTTOM', isSingleLine = false } = props
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [shift, setShift] = React.useState(0)

  useEffect(() => {
    const tooltipElement = tooltipRef.current
    if (tooltipElement) {
      const rect = tooltipElement.getBoundingClientRect()
      if (rect.x < 0) setShift(-rect.x + 8)
      if (rect.x + rect.width > window.innerWidth)
        setShift(window.innerWidth - rect.x - rect.width - 8)
      tooltipElement.style.visibility = 'visible'
    }
  }, [])

  return (
    <div
      className={[
        'tooltip',
        'recharged',
        isSingleLine && 'tooltip--singleline',
        pin === 'TOP' && 'tooltip--top',
        pin === 'BOTTOM' && 'tooltip--bottom',
      ]
        .filter((n) => n)
        .join(' ')}
      role="tooltip"
      ref={tooltipRef}
      style={{
        visibility: 'hidden',
      }}
    >
      <div
        className="tooltip__block"
        style={{
          transform: `translateX(${shift}px)`,
        }}
      >
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

export default Tooltip
