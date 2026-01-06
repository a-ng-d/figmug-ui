import React from 'react'
import { doClassnames } from '@a_ng_d/figmug-utils'
import Tooltip from '../tooltip/Tooltip'
import './color-chip.scss'

interface ColorChipProps {
  /**
   * Color value (hex, rgb, etc.)
   */
  color: string
  /**
   * Width of the chip
   * @default '16px'
   */
  width?: string
  /**
   * Height of the chip
   * @default '16px'
   */
  height?: string
  /**
   * Whether to use rounded corners
   */
  isRounded?: boolean
  /**
   * Helper tooltip content
   */
  helper?: string | React.ReactNode
}

interface ColorChipStates {
  isTooltipVisible: boolean
}

export default class ColorChip extends React.Component<
  ColorChipProps,
  ColorChipStates
> {
  static defaultProps: Partial<ColorChipProps> = {
    width: '16px',
    height: '16px',
  }

  constructor(props: ColorChipProps) {
    super(props)
    this.state = {
      isTooltipVisible: false,
    }
  }

  render() {
    const { color, width, height, isRounded, helper } = this.props
    const { isTooltipVisible } = this.state

    return (
      <div
        className={doClassnames([
          'color-chip',
          isRounded && 'color-chip--rounded',
        ])}
        style={{ backgroundColor: color, width: width, height: height }}
        onMouseEnter={() => {
          if (helper !== undefined) this.setState({ isTooltipVisible: true })
        }}
        onMouseLeave={() => this.setState({ isTooltipVisible: false })}
        role="img"
      >
        {isTooltipVisible && <Tooltip>{helper}</Tooltip>}
      </div>
    )
  }
}
