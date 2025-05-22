import React from 'react'
import { doClassnames } from '@a_ng_d/figmug-utils'
import Tooltip from '../tooltip/Tooltip'
import './color-chip.scss'

interface ColorChipProps {
  color: string
  width?: string
  height?: string
  isRounded?: boolean
  helper?: string
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
      >
        {isTooltipVisible && <Tooltip>{helper}</Tooltip>}
      </div>
    )
  }
}
