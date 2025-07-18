import React from 'react'
import { IconList } from '@tps/icon.types'
import Icon from '@components/assets/icon/Icon'
import { doClassnames } from '@a_ng_d/figmug-utils'
import Tooltip from '../tooltip/Tooltip'
import './icon-chip.scss'

interface IconChipProps {
  iconType: 'PICTO' | 'LETTER'
  iconName?: IconList
  iconLetter?: string
  text: string
  pin?: 'TOP' | 'BOTTOM'
  type?: 'MULTI_LINE' | 'SINGLE_LINE' | 'WITH_IMAGE'
}

interface IconChipStates {
  isTooltipVisible: boolean
}

export default class IconChip extends React.Component<
  IconChipProps,
  IconChipStates
> {
  static defaultProps: Partial<IconChipProps> = {
    pin: 'BOTTOM',
    type: 'SINGLE_LINE',
    iconName: 'adjust',
  }

  constructor(props: IconChipProps) {
    super(props)
    this.state = {
      isTooltipVisible: false,
    }
  }

  render() {
    const { iconType, iconName, iconLetter, text, pin, type } = this.props
    const { isTooltipVisible } = this.state

    return (
      <div
        className={doClassnames(['icon-chip'])}
        onMouseEnter={() => {
          this.setState({ isTooltipVisible: true })
        }}
        onMouseLeave={() => this.setState({ isTooltipVisible: false })}
        role="icon"
      >
        <Icon
          type={iconType}
          iconName={iconName}
          iconLetter={iconLetter}
        />
        {isTooltipVisible && (
          <Tooltip
            pin={pin}
            type={type}
          >
            {text}
          </Tooltip>
        )}
      </div>
    )
  }
}
