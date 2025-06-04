import { IconList } from '@tps/icon.types'
import Chip from '@components/tags/chip/Chip'
import SectionTitle from '@components/assets/section-title/SectionTitle'
import { doClassnames } from '@a_ng_d/figmug-utils'
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
      role="region"
      aria-expanded={isExpanded}
      aria-label={label}
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
      <div
        className="accordion__row"
        role="button"
        aria-expanded={isExpanded}
        aria-controls={`accordion-content-${label}`}
        aria-disabled={isBlocked}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            if (!isExpanded && !isBlocked) 
              onAdd(e)
            
          }
        }}
      >
        <div
          className="accordion__row__left-part"
          role="presentation"
        >
          <SectionTitle
            label={label}
            indicator={indicator}
            helper={helper}
          />
        </div>
        <div
          className="accordion__row__right-part"
          role="group"
        >
          {isExpanded ? (
            <Button
              type="icon"
              icon="minus"
              iconClassName="accordion__row__icon"
              helper={
                helpers?.empty !== undefined
                  ? {
                      label: helpers.empty,
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
      {isExpanded && (
        <div
          id={`accordion-content-${label}`}
          role="region"
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default Accordion

