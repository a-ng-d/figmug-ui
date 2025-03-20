import React from 'react'
import { doClassnames } from '@a_ng_d/figmug-utils'
import './bar.scss'

export interface BarProps {
  id?: string
  rightPartSlot?: React.ReactElement
  soloPartSlot?: React.ReactElement
  leftPartSlot?: React.ReactElement
  border?: Array<'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'>
  padding?: string
  isCompact: boolean
  isOnlyText: boolean
  isFullWidth?: boolean
  shouldReflow?: boolean
}

export default class Bar extends React.Component<BarProps> {
  static defaultProps: Partial<BarProps> = {
    isCompact: false,
    isOnlyText: false,
    isFullWidth: false,
    shouldReflow: false,
  }

  setBorder = (
    orientation: Array<'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'> | undefined
  ) => {
    const property =
      '1px solid var(--figma-color-border)' as React.CSSProperties
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
    const {
      id,
      isCompact,
      isOnlyText,
      isFullWidth,
      shouldReflow,
      border,
      padding,
      leftPartSlot,
      soloPartSlot,
      rightPartSlot,
    } = this.props

    return (
      <div
        id={id}
        className={doClassnames([
          'bar',
          isCompact && 'bar--compact',
          isOnlyText && 'bar--text-only',
          shouldReflow && 'bar--reflow',
        ])}
        style={{
          ...this.setBorder(border),
          padding: padding,
        }}
      >
        <div className="bar__left">{leftPartSlot}</div>
        {soloPartSlot !== undefined && (
          <div
            className={doClassnames([
              'bar__solo',
              isFullWidth && 'bar__solo--full',
            ])}
          >
            {soloPartSlot}
          </div>
        )}
        <div className="bar__right">{rightPartSlot}</div>
      </div>
    )
  }
}
