import React from 'react'
import { doClassnames } from '@a_ng_d/figmug-utils'
import Tooltip from '../tooltip/Tooltip'
import './color-chip.scss'

interface ColorChipProps {
  color: string
  w?: string
  h?: string
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
    w: '16px',
    h: '16px',
  }

  constructor(props: ColorChipProps) {
    super(props)
    this.state = {
      isTooltipVisible: false,
    }
  }

  render() {
    const { color, w, h, isRounded, helper } = this.props
    const { isTooltipVisible } = this.state

    return (
      <div
        className={doClassnames([
          'color-chip',
          isRounded && 'color-chip--rounded',
        ])}
        style={{ backgroundColor: color, width: w, height: h }}
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
