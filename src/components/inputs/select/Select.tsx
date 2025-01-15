import React from 'react'
import { Chip } from '../../tags/chip/Chip'
import './select.scss'

export interface SelectProps {
  id: string
  type: 'CHECK_BOX' | 'RADIO_BUTTON' | 'SWITCH_BUTTON'
  label?: string
  name?: string
  value?: string
  feature?: string
  isChecked?: boolean
  isDisabled?: boolean
  isBlocked?: boolean
  isNew?: boolean
  action: React.ChangeEventHandler<HTMLInputElement>
}

export class Select extends React.Component<SelectProps> {
  private inputRef: React.RefObject<HTMLInputElement> = React.createRef()

  static defaultProps: Partial<SelectProps> = {
    isChecked: false,
    isDisabled: false,
    isBlocked: false,
    isNew: false,
  }

  CheckBox = () => {
    const {
      id,
      label,
      name,
      feature,
      isChecked,
      isDisabled,
      isBlocked,
      isNew,
      action,
    } = this.props

    return (
      <div
        className={['checkbox', 'recharged', isBlocked && 'checkbox--blocked']
          .filter((n) => n)
          .join(' ')}
      >
        <input
          data-feature={feature}
          id={id}
          className="checkbox__box"
          type="checkbox"
          name={name}
          checked={isChecked}
          disabled={isDisabled || isBlocked}
          onChange={action}
          ref={this.inputRef}
        />
        <label
          className="checkbox__label"
          htmlFor={id}
        >
          {label}
          {(isBlocked || isNew) && <Chip>{isNew ? 'New' : 'Pro'}</Chip>}
        </label>
      </div>
    )
  }

  RadioButton = () => {
    const {
      id,
      label,
      name,
      value,
      feature,
      isChecked,
      isDisabled,
      isBlocked,
      isNew,
      action,
    } = this.props

    return (
      <div
        className={['radio', 'recharged', isBlocked && 'radio--blocked']
          .filter((n) => n)
          .join(' ')}
      >
        <input
          data-feature={feature}
          id={id}
          className="radio__button"
          type="radio"
          name={name}
          value={value}
          checked={isChecked}
          disabled={isDisabled || isBlocked}
          onChange={action}
          ref={this.inputRef}
        />
        <label
          className="radio__label"
          htmlFor={id}
        >
          {label}
          {(isBlocked || isNew) && <Chip>{isNew ? 'New' : 'Pro'}</Chip>}
        </label>
      </div>
    )
  }

  SwitchButton = () => {
    const {
      id,
      label,
      name,
      feature,
      isChecked,
      isDisabled,
      isBlocked,
      isNew,
      action,
    } = this.props

    return (
      <div
        className={['switch', 'recharged', isBlocked && 'switch--blocked']
          .filter((n) => n)
          .join(' ')}
      >
        <input
          data-feature={feature}
          id={id}
          className="switch__toggle"
          type="checkbox"
          name={name}
          checked={isChecked}
          disabled={isDisabled || isBlocked}
          onChange={action}
          ref={this.inputRef}
        />
        <label
          className="switch__label"
          htmlFor={id}
        >
          {label}
          {(isBlocked || isNew) && <Chip>{isNew ? 'New' : 'Pro'}</Chip>}
        </label>
      </div>
    )
  }

  // Render
  render() {
    const { type } = this.props

    if (type === 'RADIO_BUTTON') return this.RadioButton()
    if (type === 'SWITCH_BUTTON') return this.SwitchButton()
    return this.CheckBox()
  }
}
