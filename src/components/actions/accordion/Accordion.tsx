import { Button } from '../button/Button'
import { Chip } from '../../tags/chip/Chip'
import { SectionTitle } from '../../assets/section-title/SectionTitle'
import './accordion.scss'

export interface AccordionProps {
  label: string
  indicator?: string | number
  helper?: string
  isExpanded: boolean
  isBlocked?: boolean
  isNew?: boolean
  children?: React.ReactNode
  onAdd: React.MouseEventHandler<Element> & React.KeyboardEventHandler<Element>
  onEmpty: React.MouseEventHandler<Element> &
    React.KeyboardEventHandler<Element>
}

export const Accordion = (props: AccordionProps) => {
  const {
    label,
    indicator,
    helper,
    isExpanded,
    isBlocked = false,
    isNew = false,
    children,
    onAdd,
    onEmpty,
  } = props

  return (
    <div
      role="row"
      className={[
        'accordion',
        'recharged',
        isExpanded ? 'accordion--expanded' : null,
        isBlocked ? 'accordion--blocked' : null,
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
              iconClassName='accordion__row__icon'
              isDisabled={isBlocked}
              isBlocked={isBlocked}
              action={onEmpty}
            />
          ) : (
            <Button
              type="icon"
              icon="plus"
              iconClassName='accordion__row__icon'
              isDisabled={isBlocked}
              isBlocked={isBlocked}
              action={onAdd}
            />
          )}
          {isBlocked || isNew ? <Chip>{isNew ? 'New' : 'Pro'}</Chip> : null}
        </div>
      </div>
      {isExpanded ? <div>{children}</div> : null}
    </div>
  )
}
