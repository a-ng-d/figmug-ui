import React from 'react'
import texts from '@styles/texts/texts.module.scss'
import Tooltip from '@components/tags/tooltip/Tooltip'
import Input from '@components/inputs/input/Input'
import { doClassnames } from '@a_ng_d/figmug-utils'
import './knob.scss'

export interface KnobProps {
  id: string
  shortId: string
  value: string | number
  offset: number
  min?: string
  max?: string
  helper?: {
    label: string
    type: 'MULTI_LINE' | 'SINGLE_LINE' | 'WITH_IMAGE'
  }
  canBeTyped: boolean
  isDisplayed: boolean
  isBlocked: boolean
  isDisabled: boolean
  style?: React.CSSProperties
  onShiftRight?: React.KeyboardEventHandler<HTMLInputElement>
  onShiftLeft?: React.KeyboardEventHandler<HTMLInputElement>
  onDelete?: React.KeyboardEventHandler<HTMLInputElement>
  onMouseDown: React.MouseEventHandler<HTMLDivElement>
  onValidStopValue?: (
    stopId: string,
    e:
      | React.FocusEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => void
}

export interface KnobStates {
  isStopInputOpen: boolean
  isTooltipOpen: boolean
  stopInputValue: string | number
}

export default class Knob extends React.Component<KnobProps, KnobStates> {
  static defaultProps: Partial<KnobProps> = {
    isBlocked: false,
    isDisabled: false,
  }

  constructor(props: KnobProps) {
    super(props)
    this.state = {
      isStopInputOpen: false,
      isTooltipOpen: false,
      stopInputValue: props.value,
    }
  }

  // Handlers
  keyboardHandler = (
    action: string,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const { value, canBeTyped, onShiftRight, onShiftLeft, onDelete } =
      this.props

    const actions = {
      ArrowRight: () => {
        if (onShiftRight !== undefined) onShiftRight(e)
      },
      ArrowLeft: () => {
        if (onShiftLeft !== undefined) onShiftLeft(e)
      },
      Enter: () => {
        if (canBeTyped)
          this.setState({
            isStopInputOpen: true,
            isTooltipOpen: false,
            stopInputValue: value,
          })
      },
      Escape: () => {
        ;(e.target as HTMLElement).blur()
        this.setState({ isStopInputOpen: false })
      },
      Backspace: () => {
        if (onDelete !== undefined) onDelete(e)
      },
    }

    if (e.currentTarget === e.target)
      return actions[
        action as 'ArrowRight' | 'ArrowLeft' | 'Enter' | 'Escape' | 'Backspace'
      ]?.()
  }

  clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const { canBeTyped, value } = this.props

    if (e.detail === 2 && canBeTyped)
      this.setState({
        isStopInputOpen: true,
        isTooltipOpen: false,
        stopInputValue: value,
      })
  }

  transformStopValue = (value: string | number) => {
    let newValue = value
    if (typeof newValue !== 'string') newValue = newValue.toFixed(1)
    if (newValue.includes('.0')) return (newValue = newValue.replace('.0', ''))
    return newValue
  }

  // Render
  render() {
    const {
      id,
      shortId,
      value,
      min,
      max,
      offset,
      helper,
      isDisplayed,
      isBlocked,
      isDisabled,
      onMouseDown,
      onValidStopValue,
    } = this.props
    const { isTooltipOpen, isStopInputOpen, stopInputValue } = this.state

    return (
      <div
        className={doClassnames([
          'knob',
          isStopInputOpen && 'knob--editing',
          (isBlocked || isDisabled) && 'knob--disabled',
        ])}
        style={{
          left: `${offset}%`,
          zIndex: isTooltipOpen ? '2' : '1',
          ...this.props.style,
        }}
        data-id={id}
        data-value={value}
        role="slider"
        aria-valuemin={min ? parseFloat(min) : undefined}
        aria-valuemax={max ? parseFloat(max) : undefined}
        aria-valuenow={typeof value === 'number' ? value : parseFloat(value)}
        aria-valuetext={this.transformStopValue(value).toString()}
        aria-disabled={isDisabled || isBlocked}
        aria-readonly={isBlocked}
        tabIndex={!(isBlocked || isDisabled) ? 0 : -1}
        onKeyDown={(e) =>
          !(isBlocked || isDisabled)
            ? this.keyboardHandler(
                e.key,
                e as React.KeyboardEvent<HTMLInputElement>
              )
            : undefined
        }
        onMouseDown={!(isBlocked || isDisabled) ? onMouseDown : undefined}
        onMouseEnter={() =>
          !(isBlocked || isDisabled || isStopInputOpen)
            ? this.setState({ isTooltipOpen: true })
            : undefined
        }
        onMouseLeave={(e) => {
          const isFocused = document.activeElement === e.target
          if (isFocused && !(isBlocked || isDisabled))
            this.setState({ isTooltipOpen: true })
          else this.setState({ isTooltipOpen: false })
        }}
        onFocus={() =>
          !(isBlocked || isDisabled)
            ? this.setState({ isTooltipOpen: true })
            : undefined
        }
        onBlur={() =>
          !(isBlocked || isDisabled)
            ? this.setState({ isTooltipOpen: false })
            : undefined
        }
        onClick={(e) =>
          !(isBlocked || isDisabled) ? this.clickHandler(e) : undefined
        }
      >
        {(isDisplayed || isTooltipOpen) && (
          <div
            className={doClassnames([
              texts.type,
              texts['type--inverse'],
              'knob__tooltip',
            ])}
            role="status"
          >
            {this.transformStopValue(value)}
          </div>
        )}
        {isStopInputOpen && (
          <div
            className="knob__input"
            role="group"
          >
            <Input
              type="NUMBER"
              value={(stopInputValue as number).toFixed(1) ?? '0'}
              min={min}
              max={max}
              step="0.1"
              feature="TYPE_STOP_VALUE"
              shouldBlur={true}
              isAutoFocus={true}
              isFlex={true}
              onFocus={() =>
                this.setState({
                  stopInputValue: value,
                })
              }
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                if ((e.target as HTMLInputElement)?.value !== value)
                  onValidStopValue?.(shortId, e)
                this.setState({ isStopInputOpen: false })
              }}
            />
          </div>
        )}
        <div
          className={doClassnames([texts.type, 'knob__label'])}
          role="presentation"
          aria-hidden="true"
        >
          {shortId}
        </div>
        <div
          className="knob__graduation"
          role="presentation"
          aria-hidden="true"
        ></div>
        {helper !== undefined && isTooltipOpen && (
          <Tooltip type={helper.type}>{helper.label}</Tooltip>
        )}
      </div>
    )
  }
}
