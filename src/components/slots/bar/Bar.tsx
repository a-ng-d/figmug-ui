import React from 'react'
import './bar.scss'

export interface BarProps {
  rightPart?: React.ReactElement
  leftPart?: React.ReactElement
  border: Array<'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'>
  isCompact: boolean
  isOnlyText: boolean
}

export class Bar extends React.Component<BarProps> {
  static defaultProps = {
    isCompact: false,
    isOnlyText: false,
  }

  setBorder = (orientation: Array<'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'>) => {
    const property = '1px solid var(--figma-color-border)'
    const styles: { [key: string]: React.CSSProperties } = {
      container: {},
    }

    orientation.forEach((entry) => {
      if (entry === 'TOP') styles.container.borderTop = property
      if (entry === 'LEFT') styles.container.borderLeft = property
      if (entry === 'BOTTOM') styles.container.borderBottom = property
      if (entry === 'RIGHT') styles.container.borderRight = property
    })
    return styles
  }

  render() {
    const { isCompact, isOnlyText, border, leftPart, rightPart } = this.props

    return (
      <div
        className={[
          'bar',
          isCompact ? 'bar--compact' : null,
          isOnlyText ? 'bar--text-only' : null,
        ]
          .filter((n) => n)
          .join(' ')}
        style={this.setBorder(border).container}
      >
        <div className="bar__left">{leftPart}</div>
        <div className="bar__right">{rightPart}</div>
      </div>
    )
  }
}
