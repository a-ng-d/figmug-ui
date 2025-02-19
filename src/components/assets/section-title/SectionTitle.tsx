import { useState } from 'react'
import texts from '@styles/texts.module.scss'
import Tooltip from '@components/tags/tooltip/Tooltip'
import Icon from '../icon/Icon'
import './section-title.scss'

export type SectionTitleProps = {
  label: string
  indicator?: string | number
  helper?: string
}

const SectionTitle = (props: SectionTitleProps) => {
  const [isTooltipVisible, setTooltipState] = useState(false)

  const { label, indicator, helper } = props

  return (
    <div className="section-title recharged">
      <div className={`section-title__title ${texts['section-title']}`}>
        {label}
      </div>
      {indicator !== undefined && (
        <div
          className={`section-title__indicator type ${texts.type}`}
        >{`(${indicator})`}</div>
      )}
      {helper !== undefined && (
        <div
          className="section-title__tooltip"
          onMouseEnter={() => setTooltipState(true)}
          onMouseLeave={() => setTooltipState(false)}
        >
          <Icon
            type="PICTO"
            iconName="info"
            customClassName="tooltip__icon"
          />
          {isTooltipVisible && <Tooltip>{helper}</Tooltip>}
        </div>
      )}
    </div>
  )
}
export default SectionTitle
