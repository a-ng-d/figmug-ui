import { doClassnames } from '@a_ng_d/figmug-utils'
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
  helpers?: {
    add?: string
    empty?: string
  }
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
    helpers,
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
      className={doClassnames([
        'accordion',
        isExpanded && 'accordion--expanded',
        isBlocked && 'accordion--blocked',
      ])}
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
              helper={
                helpers?.empty !== undefined
                  ? {
                      label: helpers.empty,
                      isSingleLine: true,
                    }
                  : undefined
              }
              isDisabled={isBlocked}
              isBlocked={isBlocked}
              action={(e) => handleEmpty(e)}
            />
          ) : (
            <Button
              type="icon"
              icon={icon}
              iconClassName="accordion__row__icon"
              helper={
                helpers?.add !== undefined
                  ? {
                      label: helpers.add,
                      isSingleLine: true,
                    }
                  : undefined
              }
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
