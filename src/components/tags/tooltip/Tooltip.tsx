import React, { useEffect, useRef } from 'react'
import texts from '../../../styles/texts.module.scss'
import './tooltip.scss'

export interface TooltipProps {
  children: React.ReactNode
}

export const Tooltip = (props: TooltipProps) => {
  const { children } = props
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [shift, setShift] = React.useState(0)

  useEffect(() => {
    const tooltipElement = tooltipRef.current
    if (tooltipElement) {
      const rect = tooltipElement.getBoundingClientRect()
      if (rect.x < 0) setShift(-rect.x + 8)
      if (rect.x + rect.width > window.innerWidth)
        setShift(window.innerWidth - rect.x - rect.width - 8)
    }
  }, [])

  return (
    <div
      className={['tooltip', 'recharged'].filter((n) => n).join(' ')}
      role="tooltip"
      ref={tooltipRef}
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
