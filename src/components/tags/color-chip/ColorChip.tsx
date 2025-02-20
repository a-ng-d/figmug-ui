import React from 'react'
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
    return (
      <div
        className={['color-chip', isRounded && 'color-chip--rounded']
          .filter((n) => n)
          .join(' ')}
        style={{ backgroundColor: color, width: w, height: h }}
        onMouseEnter={() => {
          if (helper !== undefined) this.setState({ isTooltipVisible: true })
        }}
        onMouseLeave={() => this.setState({ isTooltipVisible: false })}
      >
        {this.state.isTooltipVisible && (
          <Tooltip isSingleLine>{helper}</Tooltip>
        )}
      </div>
    )
  }
}
