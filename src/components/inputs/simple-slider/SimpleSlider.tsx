import React from 'react'
import Knob from '@components/actions/knob/Knob'
import { doMap } from '@a_ng_d/figmug-utils'
import './simple-slider.scss'

export interface SimpleSliderProps {
  id: string
  label: string
  value: number
  min: number
  max: number
  colors: {
    min: string
    max: string
  }
  feature: string
  isBlocked?: boolean
  isDisabled?: boolean
  isNew?: boolean
  onChange: (feature: string, state: string, value: number) => void
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
    const { min, max, feature, onChange } = this.props
    const target = e.target as HTMLInputElement
    if (target.value !== '')
      if (parseFloat(target.value) < min) onChange(feature, 'TYPED', min)
      else if (parseFloat(target.value) > max) onChange(feature, 'TYPED', max)
      else onChange(feature, 'TYPED', parseFloat(target.value))
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

  onSlide = (
    e: MouseEvent,
    slider: HTMLElement,
    stop: HTMLElement,
    shift: number,
    rangeWidth: number
  ) => {
    const { min, max, feature, onChange } = this.props
    const sliderPadding: number = parseFloat(
      window.getComputedStyle(slider, null).getPropertyValue('padding-left')
    )
    let offset = e.clientX - slider.offsetLeft - sliderPadding - shift

    const limitMin = 0
    const limitMax = rangeWidth

    if (offset <= limitMin) offset = limitMin
    else if (offset >= limitMax) offset = limitMax

    stop.style.left = doMap(offset, 0, rangeWidth, 0, 100).toFixed(1) + '%'
    this.value = Math.floor(doMap(offset, 0, rangeWidth, min, max))

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
      isNew,
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
            isNew={isNew}
            onShiftRight={(e) => {
              if (e.shiftKey)
                onChange(
                  feature,
                  'SHIFTED',
                  value + 10 > max ? max : value + 10
                )
              else
                onChange(feature, 'SHIFTED', value + 1 > max ? max : value + 1)
            }}
            onShiftLeft={(e) => {
              if (e.shiftKey)
                onChange(
                  feature,
                  'SHIFTED',
                  value - 10 < min ? min : value - 10
                )
              else
                onChange(feature, 'SHIFTED', value - 1 < min ? min : value - 1)
            }}
            onMouseDown={(e: React.MouseEvent<HTMLElement>) => {
              this.onGrab(e)
              ;(e.target as HTMLElement).focus()
            }}
            onValidStopValue={(_stopId, e) => this.validHandler(e)}
          />
        </div>
      </div>
    )
  }
}
