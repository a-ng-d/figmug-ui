import texts from '@styles/texts/texts.module.scss'
import IconChip from '@components/tags/icon-chip/IconChip'
import { doClassnames } from '@unoff/utils'
import './section-title.scss'

export type SectionTitleProps = {
  /**
   * Text label of the section title
   */
  label: string
  /**
   * Optional indicator (number or text) displayed in parentheses
   */
  indicator?: string | number
  /**
   * Helper content displayed in a tooltip icon
   */
  helper?: string | React.ReactNode
  /**
   * HTML id attribute for the title
   */
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
