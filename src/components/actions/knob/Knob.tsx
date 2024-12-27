import React from 'react'

import { Chip } from '../../tags/chip/Chip'
import { Input } from '../../inputs/input/Input'
import { Tooltip } from '../../tags/tooltip/Tooltip'
import texts from '../../../styles/texts.module.scss'
import './knob.scss'

interface KnobProps {
  id: string
  shortId: string
  value: string | number
  offset: number
  min?: string
  max?: string
  helper?: string
  canBeTyped: boolean
  isDisplayed: boolean
  isBlocked: boolean
  isDisabled: boolean
  isNew: boolean
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

interface KnobStates {
  isStopInputOpen: boolean
  isTooltipOpen: boolean
  stopInputValue: string | number
}

export default class Knob extends React.Component<KnobProps, KnobStates> {
  static defaultProps = {
    isBlocked: false,
    isDisabled: false,
    isNew: false,
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
            stopInputValue: value,
          })
      },
      Escape: () => {
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
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
        stopInputValue: value,
      })
  }

  transformStopValue = (value: string | number) => {
    let newValue = value
    if (typeof newValue !== 'string') newValue = newValue.toFixed(1)
    if (newValue.includes('.0')) return (newValue = newValue.replace('.0', ''))
    return newValue
  }

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
      isNew,
      onMouseDown,
      onValidStopValue,
    } = this.props
    const { isTooltipOpen, isStopInputOpen, stopInputValue } = this.state

    return (
      <div
        className={[
          'knob',
          isStopInputOpen && 'knob--editing',
          (isBlocked || isDisabled) && 'knob--disabled',
        ]
          .filter((n) => n)
          .join(' ')}
        style={{
          left: `${offset}%`,
          zIndex: isTooltipOpen ? '2' : '1',
        }}
        data-id={id}
        data-value={value}
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
          !(isBlocked || isDisabled)
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
          <div className={`type ${texts.type} type--inverse knob__tooltip`}>
            {this.transformStopValue(value)}
          </div>
        )}
        {isStopInputOpen && (
          <div className="knob__input">
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
        <div className={`type ${texts.type} knob__label`}>
          {shortId}
          {(isBlocked || isNew) && <Chip>{isNew ? 'New' : 'Pro'}</Chip>}
        </div>
        <div className="knob__graduation"></div>
        {helper !== undefined && isTooltipOpen && <Tooltip>{helper}</Tooltip>}
      </div>
    )
  }
}
