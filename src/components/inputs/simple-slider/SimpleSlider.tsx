import React from 'react'
import IconChip from '@components/tags/icon-chip/IconChip'
import Chip from '@components/tags/chip/Chip'
import Knob from '@components/actions/knob/Knob'
import { doMap } from '@a_ng_d/figmug-utils'
import './simple-slider.scss'

export interface SimpleSliderProps {
  id: string
  label: string
  value: number
  min: number
  max: number
  step?: number
  colors: {
    min: string
    max: string
  }
  warning?: {
    label: string
    pin?: 'TOP' | 'BOTTOM'
    type?: 'MULTI_LINE' | 'SINGLE_LINE'
  }
  feature: string
  isBlocked?: boolean
  isDisabled?: boolean
  isNew?: boolean
  onChange: (feature: string, state: string, value: number) => void
  onUnblock?: React.MouseEventHandler & React.KeyboardEventHandler
}

export interface SimpleSliderStates {
  isTooltipDisplay: boolean
}

export default class SimpleSlider extends React.Component<
  SimpleSliderProps,
  SimpleSliderStates
> {
  private value: number

  static defaultProps: Partial<SimpleSliderProps> = {
    isBlocked: false,
    isDisabled: false,
    isNew: false,
    step: 1,
  }

  constructor(props: SimpleSliderProps) {
    super(props)
    this.state = {
      isTooltipDisplay: false,
    }
    this.value = props.value
  }

  componentDidUpdate = (previousProps: Readonly<SimpleSliderProps>) => {
    const { value } = this.props

    if (previousProps.value !== value) this.value = value
  }

  // Handlers
  validHandler = (
    e:
      | React.FocusEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    const { min, max, feature, onChange, step = 1 } = this.props
    const target = e.target as HTMLInputElement
    if (target.value !== '') {
      const parsedValue = parseFloat(target.value)
      if (parsedValue < min) onChange(feature, 'TYPED', min)
      else if (parsedValue > max) onChange(feature, 'TYPED', max)
      else {
        const roundedValue = this.roundToStep(parsedValue, step)
        onChange(feature, 'TYPED', roundedValue)
      }
    }
  }

  // Direct Actions
  onGrab = (e: React.MouseEvent<HTMLElement>) => {
    const stop = e.currentTarget as HTMLElement,
      range = stop.parentElement as HTMLElement,
      shift =
        e.clientX -
        stop.getBoundingClientRect().left -
        stop.getBoundingClientRect().width / 2,
      rangeWidth = range.offsetWidth as number,
      slider = range.parentElement as HTMLElement

    stop.style.zIndex = '2'

    document.onmousemove = (e) =>
      this.onSlide(e, slider, stop, shift, rangeWidth)

    document.onmouseup = () => this.onRelease(stop)
  }

  roundToStep = (value: number, step: number): number => {
    return Math.round(value / step) * step
  }

  onSlide = (
    e: MouseEvent,
    slider: HTMLElement,
    stop: HTMLElement,
    shift: number,
    rangeWidth: number
  ) => {
    const { min, max, feature, onChange, step = 0.1 } = this.props
    const sliderPadding: number = parseFloat(
      window.getComputedStyle(slider, null).getPropertyValue('padding-left')
    )
    let offset = e.clientX - slider.offsetLeft - sliderPadding - shift

    const limitMin = 0
    const limitMax = rangeWidth

    if (offset <= limitMin) offset = limitMin
    else if (offset >= limitMax) offset = limitMax

    stop.style.left = doMap(offset, 0, rangeWidth, 0, 100).toFixed(1) + '%'

    const rawValue = doMap(offset, 0, rangeWidth, min, max)

    this.value = this.roundToStep(rawValue, step)

    if (this.value < min) this.value = min
    if (this.value > max) this.value = max

    this.setState({
      isTooltipDisplay: true,
    })

    onChange(feature, 'UPDATING', this.value)
    document.body.style.cursor = 'ew-resize'
  }

  onRelease = (stop: HTMLElement) => {
    const { feature, onChange } = this.props

    document.onmousemove = null
    document.onmouseup = null
    stop.onmouseup = null
    stop.style.zIndex = '1'

    this.setState({
      isTooltipDisplay: false,
    })

    onChange(feature, 'RELEASED', this.value)
    document.body.style.cursor = ''
  }

  // Templates
  Status = () => {
    const { warning, isBlocked, isNew, onUnblock } = this.props

    if (warning || isBlocked || isNew)
      return (
        <div className="simple-slider__status">
          {warning !== undefined && (
            <IconChip
              iconType="PICTO"
              iconName="warning"
              text={warning.label}
              pin={warning.pin}
              type={warning.type}
            />
          )}
          {(isBlocked || isNew) && (
            <Chip
              isSolo
              action={isBlocked ? onUnblock : undefined}
            >
              {isNew ? 'New' : 'Pro'}
            </Chip>
          )}
        </div>
      )
  }

  // Render
  render() {
    const {
      id,
      label,
      value,
      min,
      max,
      colors,
      feature,
      isBlocked,
      isDisabled,
      onChange,
    } = this.props
    const { isTooltipDisplay } = this.state

    return (
      <div
        className="simple-slider"
        role="group"
        aria-label={label}
      >
        <div
          className="simple-slider__range"
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={value.toString()}
          aria-label={label}
          style={{
            background: `linear-gradient(90deg, ${colors.min}, ${colors.max})`,
          }}
        >
          <Knob
            id={id}
            shortId={label}
            value={value}
            offset={doMap(value, min, max, 0, 100)}
            min={min.toString()}
            max={max.toString()}
            canBeTyped={true}
            isDisplayed={isTooltipDisplay}
            isBlocked={isBlocked}
            isDisabled={isDisabled}
            onShiftRight={(e) => {
              const { step = 1 } = this.props
              if (e.shiftKey) {
                const newValue = this.roundToStep(value + 10, step)
                onChange(feature, 'SHIFTED', newValue > max ? max : newValue)
              } else {
                const newValue = this.roundToStep(value + step, step)
                onChange(feature, 'SHIFTED', newValue > max ? max : newValue)
              }
            }}
            onShiftLeft={(e) => {
              const { step = 1 } = this.props
              if (e.shiftKey) {
                const newValue = this.roundToStep(value - 10, step)
                onChange(feature, 'SHIFTED', newValue < min ? min : newValue)
              } else {
                const newValue = this.roundToStep(value - step, step)
                onChange(feature, 'SHIFTED', newValue < min ? min : newValue)
              }
            }}
            onMouseDown={(e: React.MouseEvent<HTMLElement>) => {
              this.onGrab(e)
              ;(e.target as HTMLElement).focus()
            }}
            onValidStopValue={(_stopId, e) => this.validHandler(e)}
          />
        </div>
        {this.Status()}
      </div>
    )
  }
}
