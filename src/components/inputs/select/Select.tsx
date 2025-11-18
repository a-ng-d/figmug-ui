import React from 'react'
import Tooltip from '@components/tags/tooltip/Tooltip'
import IconChip from '@components/tags/icon-chip/IconChip'
import Chip from '@components/tags/chip/Chip'
import { doClassnames } from '@a_ng_d/figmug-utils'
import './select.scss'

export interface SelectProps {
  id: string
  type: 'CHECK_BOX' | 'RADIO_BUTTON' | 'SWITCH_BUTTON'
  label?: string
  name?: string
  value?: string
  helper?: {
    label: string
    pin?: 'TOP' | 'BOTTOM'
    type?: 'MULTI_LINE' | 'SINGLE_LINE'
  }
  preview?: {
    image: string
    text: string
    pin?: 'TOP' | 'BOTTOM'
  }
  warning?: {
    label: string
    pin?: 'TOP' | 'BOTTOM'
    type?: 'MULTI_LINE' | 'SINGLE_LINE'
  }
  feature?: string
  shouldReflow?: boolean
  isChecked?: boolean
  isDisabled?: boolean
  isBlocked?: boolean
  isNew?: boolean
  action: React.ChangeEventHandler<HTMLInputElement>
  onUnblock?: React.MouseEventHandler & React.KeyboardEventHandler
}

export interface SelectStates {
  isTooltipVisible: boolean
  documentWidth: number
}

export default class Select extends React.Component<SelectProps, SelectStates> {
  private inputRef: React.RefObject<HTMLInputElement> = React.createRef()

  static defaultProps: Partial<SelectProps> = {
    shouldReflow: false,
    isChecked: false,
    isDisabled: false,
    isBlocked: false,
    isNew: false,
  }

  constructor(props: SelectProps) {
    super(props)
    this.state = {
      isTooltipVisible: false,
      documentWidth: document.documentElement.clientWidth,
    }
  }

  // Lifecycle
  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize)
  }

  // Handlers
  handleResize = () => {
    this.setState({ documentWidth: document.documentElement.clientWidth })
  }

  // Templates
  Status = (type: 'checkbox' | 'radio' | 'switch') => {
    const { warning, preview, isBlocked, isNew, onUnblock } = this.props

    if (warning || isBlocked || isNew)
      return (
        <div className={`${type}__status`}>
          {warning !== undefined && (
            <div
              style={{
                position: 'relative',
                pointerEvents: 'auto',
              }}
            >
              <IconChip
                iconType="PICTO"
                iconName="warning"
                text={warning.label}
                pin={warning.pin}
                type={warning.type}
              />
            </div>
          )}
          {(isBlocked || isNew) && (
            <Chip
              preview={preview}
              isSolo
              action={isBlocked ? onUnblock : undefined}
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
      helper,
      feature,
      shouldReflow,
      isChecked,
      isDisabled,
      isBlocked,
      action,
    } = this.props
    const { isTooltipVisible, documentWidth } = this.state

    const isReflowActive = shouldReflow && documentWidth <= 460

    const getSelectLabel = () => (isReflowActive ? undefined : label)
    const getTooltipLabel = () => (isReflowActive ? label : helper?.label)
    const hasTooltipContent = () =>
      isReflowActive ? label !== undefined : helper !== undefined

    return (
      <div
        className={doClassnames(['checkbox', isBlocked && 'checkbox--blocked'])}
        role="checkbox"
        aria-checked={isChecked}
        aria-disabled={isDisabled || isBlocked}
        onMouseEnter={() => {
          if (hasTooltipContent()) this.setState({ isTooltipVisible: true })
        }}
        onMouseLeave={() => {
          if (hasTooltipContent()) this.setState({ isTooltipVisible: false })
        }}
        onFocus={() => {
          if (hasTooltipContent()) this.setState({ isTooltipVisible: true })
        }}
        onBlur={() => {
          if (hasTooltipContent()) this.setState({ isTooltipVisible: false })
        }}
      >
        <div className="checkbox__slot">
          <input
            data-feature={feature}
            id={id}
            className="checkbox__box"
            type="checkbox"
            name={name}
            checked={isChecked}
            disabled={isDisabled || isBlocked}
            onChange={action}
            tabIndex={0}
            ref={this.inputRef}
            aria-label={label}
          />
          <div className="checkbox__box__background" />
          <div className="checkbox__box__tick" />
        </div>
        {getSelectLabel() !== undefined && (
          <label
            className={doClassnames([
              'checkbox__label',
              (isDisabled || isBlocked) && 'checkbox__label--disabled',
            ])}
            htmlFor={!(isDisabled || isBlocked) ? id : undefined}
          >
            {getSelectLabel()}
          </label>
        )}
        {this.Status('checkbox')}
        {isTooltipVisible && hasTooltipContent() && (
          <Tooltip
            pin={helper?.pin || 'BOTTOM'}
            type={helper?.type || 'SINGLE_LINE'}
          >
            {getTooltipLabel()}
          </Tooltip>
        )}
      </div>
    )
  }

  RadioButton = () => {
    const {
      id,
      label,
      name,
      value,
      helper,
      feature,
      shouldReflow,
      isChecked,
      isDisabled,
      isBlocked,
      action,
    } = this.props
    const { isTooltipVisible, documentWidth } = this.state

    const isReflowActive = shouldReflow && documentWidth <= 460

    const getSelectLabel = () => (isReflowActive ? undefined : label)
    const getTooltipLabel = () => (isReflowActive ? label : helper?.label)
    const hasTooltipContent = () =>
      isReflowActive ? label !== undefined : helper !== undefined

    return (
      <div
        className={doClassnames(['radio', isBlocked && 'radio--blocked'])}
        role="radio"
        aria-checked={isChecked}
        aria-disabled={isDisabled || isBlocked}
        onMouseEnter={() => {
          if (hasTooltipContent()) this.setState({ isTooltipVisible: true })
        }}
        onMouseLeave={() => {
          if (hasTooltipContent()) this.setState({ isTooltipVisible: false })
        }}
        onFocus={() => {
          if (hasTooltipContent()) this.setState({ isTooltipVisible: true })
        }}
        onBlur={() => {
          if (hasTooltipContent()) this.setState({ isTooltipVisible: false })
        }}
      >
        <div className="radio__slot">
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
            tabIndex={0}
            ref={this.inputRef}
            aria-label={label}
          />
          <div className="radio__button__background" />
          <div className="radio__button__inner" />
        </div>
        {getSelectLabel() !== undefined && (
          <label
            className={doClassnames([
              'radio__label',
              (isDisabled || isBlocked) && 'radio__label--disabled',
            ])}
            htmlFor={!(isDisabled || isBlocked) ? id : undefined}
          >
            {getSelectLabel()}
          </label>
        )}
        {this.Status('radio')}
        {isTooltipVisible && hasTooltipContent() && (
          <Tooltip
            pin={helper?.pin || 'BOTTOM'}
            type={helper?.type || 'SINGLE_LINE'}
          >
            {getTooltipLabel()}
          </Tooltip>
        )}
      </div>
    )
  }

  SwitchButton = () => {
    const {
      id,
      label,
      name,
      helper,
      feature,
      shouldReflow,
      isChecked,
      isDisabled,
      isBlocked,
      action,
    } = this.props
    const { isTooltipVisible, documentWidth } = this.state

    const isReflowActive = shouldReflow && documentWidth <= 460

    const getSelectLabel = () => (isReflowActive ? undefined : label)
    const getTooltipLabel = () => (isReflowActive ? label : helper?.label)
    const hasTooltipContent = () =>
      isReflowActive ? label !== undefined : helper !== undefined

    return (
      <div
        className={doClassnames(['switch', isBlocked && 'switch--blocked'])}
        role="switch"
        aria-checked={isChecked}
        aria-disabled={isDisabled || isBlocked}
        onMouseEnter={() => {
          if (hasTooltipContent()) this.setState({ isTooltipVisible: true })
        }}
        onMouseLeave={() => {
          if (hasTooltipContent()) this.setState({ isTooltipVisible: false })
        }}
        onFocus={() => {
          if (hasTooltipContent()) this.setState({ isTooltipVisible: true })
        }}
        onBlur={() => {
          if (hasTooltipContent()) this.setState({ isTooltipVisible: false })
        }}
      >
        <div className="switch__slot">
          <input
            data-feature={feature}
            id={id}
            className="switch__toggle"
            type="checkbox"
            name={name}
            checked={isChecked}
            disabled={isDisabled || isBlocked}
            onChange={action}
            tabIndex={0}
            ref={this.inputRef}
            aria-label={label}
          />
          <div className="switch__toggle__background" />
          <div className="switch__toggle__knob" />
        </div>
        {getSelectLabel() !== undefined && (
          <label
            className={doClassnames([
              'switch__label',
              (isDisabled || isBlocked) && 'switch__label--disabled',
            ])}
            htmlFor={!(isDisabled || isBlocked) ? id : undefined}
          >
            {getSelectLabel()}
          </label>
        )}
        {this.Status('switch')}
        {isTooltipVisible && hasTooltipContent() && (
          <Tooltip
            pin={helper?.pin || 'BOTTOM'}
            type={helper?.type || 'SINGLE_LINE'}
          >
            {getTooltipLabel()}
          </Tooltip>
        )}
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
