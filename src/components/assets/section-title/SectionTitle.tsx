import { useState } from 'react'
import texts from '@styles/texts/texts.module.scss'
import Tooltip from '@components/tags/tooltip/Tooltip'
import { doClassnames } from '@a_ng_d/figmug-utils'
import Icon from '../icon/Icon'
import './section-title.scss'

export type SectionTitleProps = {
  label: string
  indicator?: string | number
  helper?: string
  id?: string
}

const SectionTitle = (props: SectionTitleProps) => {
  const [isTooltipVisible, setTooltipState] = useState(false)

  const { label, indicator, helper, id } = props

  return (
    <div className="section-title">
      <div
        className={doClassnames([
          'section-title__title',
          texts['section-title'],
          texts['type--truncated'],
        ])}
        id={id}
      >
        {label}
      </div>
      {indicator !== undefined && (
        <div
          className={doClassnames(['section-title__indicator', texts.type])}
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
          {isTooltipVisible && <Tooltip type="MULTI_LINE">{helper}</Tooltip>}
        </div>
      )}
    </div>
  )
}
export default SectionTitle
