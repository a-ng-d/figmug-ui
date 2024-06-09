import React from 'react'
import './bar.scss'

export interface BarProps {
  rightPart?: React.ReactElement
  leftPart?: React.ReactElement
  border?: Array<'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'>
  padding?: string
  isCompact: boolean
  isOnlyText: boolean
}

export class Bar extends React.Component<BarProps> {
  static defaultProps = {
    isCompact: false,
    isOnlyText: false,
    padding: '0 var(--size-xsmall)'
  }

  setBorder = (
    orientation: Array<'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'> | undefined
  ) => {
    const property = '1px solid var(--figma-color-border)' as React.CSSProperties
    const styles: { [key: string]: React.CSSProperties } = {}
    
    if (!orientation) return styles
    orientation.forEach((entry) => {
      if (entry === 'TOP') styles.borderTop = property
      if (entry === 'LEFT') styles.borderLeft = property
      if (entry === 'BOTTOM') styles.borderBottom = property
      if (entry === 'RIGHT') styles.borderRight = property
    })
    return styles
  }

  render() {
    const { isCompact, isOnlyText, border, padding, leftPart, rightPart } = this.props

    return (
      <div
        className={[
          'bar',
          'recharged',
          isCompact ? 'bar--compact' : null,
          isOnlyText ? 'bar--text-only' : null,
        ]
          .filter((n) => n)
          .join(' ')}
        style={{
          ...this.setBorder(border),
          padding: padding
        }}
      >
        <div className="bar__left">{leftPart}</div>
        <div className="bar__right">{rightPart}</div>
      </div>
    )
  }
}
