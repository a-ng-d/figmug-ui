import React from 'react'
import Tooltip from '@components/tags/tooltip/Tooltip'
import Chip from '@components/tags/chip/Chip'
import Icon from '@components/assets/icon/Icon'
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
  warning?: {
    label: string
    pin?: 'TOP' | 'BOTTOM'
    type?: 'MULTI_LINE' | 'SINGLE_LINE' | 'WITH_IMAGE'
  }
  feature?: string
  isChecked?: boolean
  isDisabled?: boolean
  isBlocked?: boolean
  isNew?: boolean
  action: React.ChangeEventHandler<HTMLInputElement>
}

export interface SelectStates {
  isWarningVisible: boolean
}

export default class Select extends React.Component<SelectProps, SelectStates> {
  private inputRef: React.RefObject<HTMLInputElement> = React.createRef()

  static defaultProps: Partial<SelectProps> = {
    isChecked: false,
    isDisabled: false,
    isBlocked: false,
    isNew: false,
  }

  constructor(props: SelectProps) {
    super(props)
    this.state = {
      isWarningVisible: false,
    }
  }

  // Templates
  Status = (type: 'checkbox' | 'radio' | 'switch') => {
    const { warning, preview, isBlocked, isNew } = this.props
    const { isWarningVisible } = this.state

    if (warning || isBlocked || isNew)
      return (
        <div className={`${type}__status`}>
          {warning !== undefined && (
            <div
              style={{
                position: 'relative',
                pointerEvents: 'auto',
              }}
              onMouseEnter={() =>
                this.setState({
                  isWarningVisible: true,
                })
              }
              onMouseLeave={() =>
                this.setState({
                  isWarningVisible: false,
                })
              }
            >
              <Icon
                type="PICTO"
                iconName="warning"
              />
              {isWarningVisible && (
                <Tooltip
                  pin={warning?.pin}
                  type={warning?.type}
                >
                  {warning?.label}
                </Tooltip>
              )}
            </div>
          )}
          {(isBlocked || isNew) && (
            <Chip
              preview={preview}
              isSolo
            >
              {isNew ? 'New' : 'Pro'}
            </Chip>
          )}
        </div>
      )
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
        </label>
        {this.Status('checkbox')}
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
        </label>
        {this.Status('radio')}
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
        </label>
        {this.Status('switch')}
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
