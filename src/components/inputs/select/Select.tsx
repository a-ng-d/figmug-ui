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
  isChecked: boolean
  isDisabled: boolean
  isBlocked: boolean
  isNew: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export class Select extends React.Component<SelectProps> {
  inputRef: React.RefObject<HTMLInputElement>;

  static defaultProps: Partial<SelectProps> = {
    isChecked: false,
    isDisabled: false,
    isBlocked: false,
    isNew: false,
  }

  constructor(props: SelectProps) {
    super(props),
    this.inputRef = React.createRef();
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
      onChange,
    } = this.props

    return (
      <div
        className={['checkbox', isBlocked ? 'checkbox--blocked' : null]
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
          onChange={onChange}
          ref={this.inputRef}
        />
        <label
          className="checkbox__label"
          htmlFor={id}
        >
          {label}
        </label>
        {isBlocked || isNew ? <Chip>{isNew ? 'New' : 'Pro'}</Chip> : null}
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
      onChange,
    } = this.props

    return (
      <div
        className={['radio', isBlocked ? 'radio--blocked' : null]
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
          onChange={onChange}
          ref={this.inputRef}
        />
        <label
          className="radio__label"
          htmlFor={id}
        >
          {label}
        </label>
        {isBlocked || isNew ? <Chip>{isNew ? 'New' : 'Pro'}</Chip> : null}
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
      onChange,
    } = this.props

    return (
      <div
        className={['switch', isBlocked ? 'switch--blocked' : null]
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
          onChange={onChange}
          ref={this.inputRef}
        />
        <label
          className="switch__label"
          htmlFor={id}
        >
          {label}
        </label>
        {isBlocked || isNew ? <Chip>{isNew ? 'New' : 'Pro'}</Chip> : null}
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
