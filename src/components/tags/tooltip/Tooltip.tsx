import React, { useEffect, useRef } from 'react'
import texts from '@styles/texts.module.scss'
import { doClassnames } from '@a_ng_d/figmug-utils'
import './tooltip.scss'

export interface TooltipProps {
  children: React.ReactNode
  pin?: 'TOP' | 'BOTTOM'
  type?: 'MULTI_LINE' | 'SINGLE_LINE' | 'WITH_IMAGE'
}

const Tooltip = (props: TooltipProps) => {
  const { children, pin = 'BOTTOM', type = 'SINGLE_LINE' } = props
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
      className={doClassnames([
        'tooltip',
        type === 'SINGLE_LINE' && 'tooltip--singleline',
        type === 'WITH_IMAGE' && 'tooltip--withimage',
        pin === 'TOP' && 'tooltip--top',
        pin === 'BOTTOM' && 'tooltip--bottom',
      ])}
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
        <div className={doClassnames(['tooltip__text', texts.type])}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Tooltip
