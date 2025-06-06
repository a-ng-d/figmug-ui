import React from 'react'
import Chip from '@components/tags/chip/Chip'
import { doClassnames } from '@a_ng_d/figmug-utils'
import './select.scss'

export interface SelectProps {
  id: string
  type: 'CHECK_BOX' | 'RADIO_BUTTON' | 'SWITCH_BUTTON'
  label?: string
  name?: string
  value?: string
  preview?: {
    image: string
    text: string
    pin?: 'TOP' | 'BOTTOM'
  }
  feature?: string
  isChecked?: boolean
  isDisabled?: boolean
  isBlocked?: boolean
  isNew?: boolean
  action: React.ChangeEventHandler<HTMLInputElement>
}

export default class Select extends React.Component<SelectProps> {
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
      preview,
      feature,
      isChecked,
      isDisabled,
      isBlocked,
      isNew,
      action,
    } = this.props

    return (
      <div
        className={doClassnames(['checkbox', isBlocked && 'checkbox--blocked'])}
        role="checkbox"
        aria-checked={isChecked}
        aria-disabled={isDisabled || isBlocked}
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
          aria-label={label}
        />
        <label
          className="checkbox__label"
          htmlFor={id}
        >
          {label}
          {(isBlocked || isNew) && (
            <Chip preview={preview}>{isNew ? 'New' : 'Pro'}</Chip>
          )}
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
      preview,
      feature,
      isChecked,
      isDisabled,
      isBlocked,
      isNew,
      action,
    } = this.props

    return (
      <div
        className={doClassnames(['radio', isBlocked && 'radio--blocked'])}
        role="radio"
        aria-checked={isChecked}
        aria-disabled={isDisabled || isBlocked}
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
          aria-label={label}
        />
        <label
          className="radio__label"
          htmlFor={id}
        >
          {label}
          {(isBlocked || isNew) && (
            <Chip preview={preview}>{isNew ? 'New' : 'Pro'}</Chip>
          )}
        </label>
      </div>
    )
  }

  SwitchButton = () => {
    const {
      id,
      label,
      name,
      preview,
      feature,
      isChecked,
      isDisabled,
      isBlocked,
      isNew,
      action,
    } = this.props

    return (
      <div
        className={doClassnames(['switch', isBlocked && 'switch--blocked'])}
        role="switch"
        aria-checked={isChecked}
        aria-disabled={isDisabled || isBlocked}
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
          aria-label={label}
        />
        <label
          className="switch__label"
          htmlFor={id}
        >
          {label}
          {(isBlocked || isNew) && (
            <Chip preview={preview}>{isNew ? 'New' : 'Pro'}</Chip>
          )}
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
