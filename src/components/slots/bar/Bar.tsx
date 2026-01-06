import React from 'react'
import { doClassnames } from '@a_ng_d/figmug-utils'
import './bar.scss'

export interface BarProps {
  /**
   * HTML id attribute
   */
  id?: string
  /**
   * Content for the left section
   */
  leftPartSlot?: React.ReactElement | null
  /**
   * Content for the center section (when used alone)
   */
  soloPartSlot?: React.ReactElement | null
  /**
   * Content for the right section
   */
  rightPartSlot?: React.ReactElement | null
  /**
   * Array of border positions
   */
  border?: Array<'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'>
  /**
   * Array of clip positions (for visual effects)
   */
  clip?: Array<'LEFT' | 'RIGHT' | 'SOLO'>
  /**
   * Custom padding value
   */
  padding?: string
  /**
   * Whether to use compact spacing
   * @default false
   */
  isCompact?: boolean
  /**
   * Whether the bar contains only text
   * @default false
   */
  isOnlyText?: boolean
  /**
   * Whether to use inverted color scheme
   * @default false
   */
  isInverted?: boolean
  /**
   * Whether to center the content
   * @default false
   */
  isCentered?: boolean
  /**
   * Whether to reflow on small screens
   * @default false
   */
  shouldReflow?: boolean
}

export default class Bar extends React.Component<BarProps> {
  static defaultProps: Partial<BarProps> = {
    isCompact: false,
    isOnlyText: false,
    isInverted: false,
    isCentered: false,
    shouldReflow: false,
  }

  setBorder = (
    orientation: Array<'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'> | undefined
  ) => {
    const property =
      'var(--bar-border-width) solid var(--bar-border-color)' as React.CSSProperties
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
      isInverted,
      isCentered,
      shouldReflow,
      border,
      padding,
      clip,
      leftPartSlot,
      soloPartSlot,
      rightPartSlot,
    } = this.props

    const hasValidSolo = soloPartSlot !== undefined && soloPartSlot !== null
    const hasValidLeft = leftPartSlot !== undefined && leftPartSlot !== null
    const hasValidRight = rightPartSlot !== undefined && rightPartSlot !== null

    if (!hasValidSolo && !hasValidLeft && !hasValidRight) return null

    const barClassName = doClassnames([
      'bar',
      isCompact && 'bar--compact',
      isOnlyText && 'bar--text-only',
      isInverted && 'bar--inverted',
      isCentered && 'bar--centered',
      shouldReflow && 'bar--reflow',
      clip && clip.includes('LEFT') && 'bar--clip-left',
      clip && clip.includes('RIGHT') && 'bar--clip-right',
      clip && clip.includes('SOLO') && 'bar--clip-solo',
    ])

    if (hasValidSolo)
      return (
        <div
          id={id}
          className={barClassName}
          style={{
            ...this.setBorder(border),
            padding: padding,
          }}
          role="toolbar"
        >
          <div
            className="bar__solo"
            role="group"
          >
            {soloPartSlot}
          </div>
        </div>
      )

    return (
      <div
        id={id}
        className={barClassName}
        style={{
          ...this.setBorder(border),
          padding: padding,
        }}
        role="toolbar"
      >
        <div
          className="bar__left"
          role="group"
        >
          {leftPartSlot}
        </div>
        <div
          className="bar__right"
          role="group"
        >
          {rightPartSlot}
        </div>
      </div>
    )
  }
}
