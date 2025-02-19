import { IconList } from '@tps/icon.types'
import SectionTitle from '@components/assets/section-title/SectionTitle'
import Chip from '@components/tags/chip/Chip'
import Button from '../button/Button'
import './accordion.scss'

export interface AccordionProps {
  label: string
  indicator?: string | number
  icon?: IconList
  helper?: string
  isExpanded: boolean
  isBlocked?: boolean
  isNew?: boolean
  children?: React.ReactNode
  onAdd: (
    event: React.MouseEvent<Element> | React.KeyboardEvent<Element>
  ) => void
  onEmpty: (
    event: React.MouseEvent<Element> | React.KeyboardEvent<Element>
  ) => void
}

const Accordion = (props: AccordionProps) => {
  const {
    label,
    indicator,
    icon = 'plus',
    helper,
    isExpanded,
    isBlocked = false,
    isNew = false,
    children,
    onAdd,
    onEmpty,
  } = props

  const handleAdd = (
    event: React.MouseEvent<Element> | React.KeyboardEvent<Element>
  ) => {
    event.stopPropagation()
    onAdd(event)
  }

  const handleEmpty = (
    event: React.MouseEvent<Element> | React.KeyboardEvent<Element>
  ) => {
    event.stopPropagation()
    onEmpty(event)
  }

  return (
    <div
      role="row"
      className={[
        'accordion',
        'recharged',
        isExpanded && 'accordion--expanded',
        isBlocked && 'accordion--blocked',
      ]
        .filter((n) => n)
        .join(' ')}
      tabIndex={-1}
      onMouseDown={(e) => {
        if (
          (e.target as HTMLElement).dataset.feature === undefined &&
          !isExpanded &&
          !isBlocked
        )
          onAdd(e as React.MouseEvent<HTMLDivElement, MouseEvent>)
      }}
    >
      <div className="accordion__row">
        <div className="accordion__row__left-part">
          <SectionTitle
            label={label}
            indicator={indicator}
            helper={helper}
          />
        </div>
        <div className="accordion__row__right-part">
          {isExpanded ? (
            <Button
              type="icon"
              icon="minus"
              iconClassName="accordion__row__icon"
              isDisabled={isBlocked}
              isBlocked={isBlocked}
              action={(e) => handleEmpty(e)}
            />
          ) : (
            <Button
              type="icon"
              icon={icon}
              iconClassName="accordion__row__icon"
              isDisabled={isBlocked}
              isBlocked={isBlocked}
              action={(e) => handleAdd(e)}
            />
          )}
          {(isBlocked || isNew) && <Chip>{isNew ? 'New' : 'Pro'}</Chip>}
        </div>
      </div>
      {isExpanded && <div>{children}</div>}
    </div>
  )
}

export default Accordion
