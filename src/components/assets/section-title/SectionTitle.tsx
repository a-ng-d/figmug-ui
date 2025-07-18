import texts from '@styles/texts/texts.module.scss'
import IconChip from '@components/tags/icon-chip/IconChip'
import { doClassnames } from '@a_ng_d/figmug-utils'
import './section-title.scss'

export type SectionTitleProps = {
  label: string
  indicator?: string | number
  helper?: string
  id?: string
}

const SectionTitle = (props: SectionTitleProps) => {
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
        <IconChip
          iconType="PICTO"
          iconName="info"
          text={helper}
          type="MULTI_LINE"
        />
      )}
    </div>
  )
}
export default SectionTitle
