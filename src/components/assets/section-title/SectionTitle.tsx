import { Icon } from '../icon/Icon'
import texts from '../../../styles/texts.module.scss'
import './section-title.scss'

export type SectionTitleProps = {
  label: string
  indicator?: string | number
  helper?: string
}

export const SectionTitle = (props: SectionTitleProps) => {
  const { label, indicator, helper } = props

  return (
    <div className="section-title recharged">
      <div className={`section-title__title ${texts['section-title']}`}>
        {label}
      </div>
      {indicator !== undefined ? (
        <div
          className={`section-title__indicator type ${texts.type}`}
        >{`(${indicator})`}</div>
      ) : null}
      {helper !== undefined ? (
        <div className="section-title__tooltip">
          <Icon
            type="PICTO"
            iconName="info"
            customClassName="tooltip__icon"
          />
          <div className={`tooltip__block type ${texts.type}`}>{helper}</div>
        </div>
      ) : null}
    </div>
  )
}
