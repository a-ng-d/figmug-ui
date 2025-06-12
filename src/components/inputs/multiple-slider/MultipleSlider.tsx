import React from 'react'
import Chip from '@components/tags/chip/Chip'
import Knob from '@components/actions/knob/Knob'
import { doClassnames, doMap, Easing } from '@a_ng_d/figmug-utils'
import { doScale } from '@a_ng_d/figmug-utils'
import shiftRightStop from './actions/shiftRightStop'
import shiftLeftStop from './actions/shiftLeftStop'
import deleteStop from './actions/deleteStop'
import addStop from './actions/addStop'
import './multiple-slider.scss'

type UpdateEvent = 'TYPED' | 'UPDATING' | 'RELEASED' | 'SHIFTED'

interface SliderProps {
  type: 'EDIT' | 'FULLY_EDIT'
  scale: Record<string, number>
  distributionEasing: Easing
  stops: {
    list: Array<number>
    min?: number
    max?: number
  }
  range: {
    min: number
    max: number
    step?: number
  }
  colors: {
    min: string
    max: string
  }
  tips: {
    minMax: string
  }
  isBlocked?: boolean
  isNew?: boolean
  onChange: (
    state: UpdateEvent,
    results: {
      scale: Record<string, number>
      stops?: Array<number>
      min?: number
      max?: number
    },
    feature?: string
  ) => void
}

interface SliderStates {
  isTooltipDisplay: Array<boolean>
}

export default class Slider extends React.Component<SliderProps, SliderStates> {
  static defaultProps = {
    scale: {},
    stops: {
      list: [],
      min: 0,
      max: 100,
    },
    colors: {
      min: 'white',
      max: 'white',
    },
    isBlocked: false,
    isNew: false,
  }

  constructor(props: SliderProps) {
    super(props)
    this.state = {
      isTooltipDisplay: Array(props.stops.list.length).fill(false),
    }
  }

  // Handlers
  validHandler = (
    stopId: string,
    e:
      | React.FocusEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    const { scale, onChange, range } = this.props
    const step = range.step || 0.1

    const newScale = scale ?? {}
    const target = e.target as HTMLInputElement

    if (target.value !== '') {
      let value = parseFloat(target.value)

      value = Math.round(value / step) * step

      if (value > parseFloat(target.max)) value = parseFloat(target.max)
      else if (value < parseFloat(target.min)) value = parseFloat(target.min)

      const precision = step.toString().split('.')[1]?.length || 0
      newScale[stopId] = parseFloat(value.toFixed(precision))

      onChange('TYPED', {
        scale: newScale,
      })
    }
  }

  // Direct Actions
  onGrab = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    const stop = e.currentTarget as HTMLElement,
      range = stop.parentElement as HTMLElement,
      shift =
        e.clientX -
        (e.currentTarget as HTMLElement).getBoundingClientRect().left -
        (e.currentTarget as HTMLElement).getBoundingClientRect().width / 2,
      rangeWidth = range.offsetWidth as number,
      slider = range.parentElement as HTMLElement,
      stops = Array.from(range.children as HTMLCollectionOf<HTMLElement>)

    const update = (event: UpdateEvent) => {
      const { range, onChange } = this.props
      const scale: Record<string, number> = {}

      stops.forEach(
        (stop) =>
          (scale[stop.dataset.id as string] = parseFloat(
            doMap(
              parseFloat(stop.style.left.replace('%', '')),
              0,
              100,
              range.min,
              range.max
            ).toFixed(1)
          ))
      )
      onChange(event, {
        scale: scale,
      })
    }

    stop.style.zIndex = '2'

    document.onmousemove = (e) =>
      this.onSlide(
        e,
        slider,
        range,
        stops,
        stop,
        shift,
        rangeWidth,
        (event: UpdateEvent) => update(event)
      )

    document.onmouseup = () =>
      this.onRelease(stops, stop, (event: UpdateEvent) => update(event))
  }

  onSlide = (
    e: MouseEvent,
    slider: HTMLElement,
    range: HTMLElement,
    stops: Array<HTMLElement>,
    stop: HTMLElement,
    shift: number,
    rangeWidth: number,
    update: (e: UpdateEvent) => void
  ) => {
    const { min, max, step = 0.1 } = this.props.range
    const sliderPadding: number = parseFloat(
      window.getComputedStyle(slider, null).getPropertyValue('padding-left')
    )
    let offset = e.clientX - slider.offsetLeft - sliderPadding - shift

    if (stop === range.firstChild && offset <= 0) offset = 0
    else if (stop === range.lastChild && offset >= rangeWidth)
      offset = rangeWidth

    // Distribute stops horizontal spacing
    if (stop === range.firstChild && e.shiftKey)
      return this.distributeStops(
        'MIN',
        parseFloat(doMap(offset, 0, rangeWidth, min, max).toFixed(1)),
        stops
      )
    else if (stop === range.lastChild && e.shiftKey)
      return this.distributeStops(
        'MAX',
        parseFloat(doMap(offset, 0, rangeWidth, min, max).toFixed(1)),
        stops
      )

    // Link every stop
    if (e.ctrlKey || e.metaKey)
      if (
        offset <
          stop.offsetLeft - (range.firstChild as HTMLElement).offsetLeft ||
        offset >
          rangeWidth -
            (range.lastChild as HTMLElement).offsetLeft +
            stop.offsetLeft
      )
        offset = stop.offsetLeft
      else
        return this.linkStops(
          parseFloat(doMap(offset, 0, rangeWidth, min, max).toFixed(1)),
          stop,
          stops
        )

    if (e.ctrlKey === false && e.metaKey === false && e.shiftKey === false)
      this.setState({
        isTooltipDisplay: Array(stops.length).fill(false),
      })

    const rawValue = doMap(offset, 0, rangeWidth, min, max)
    const steppedValue = Math.round(rawValue / step) * step
    const precision = step.toString().split('.')[1]?.length || 0

    const newPosition = doMap(steppedValue, min, max, 0, 100)
    stop.style.left = newPosition.toFixed(precision) + '%'

    requestAnimationFrame(() => {
      stop.focus()
    })

    update('UPDATING')
    document.body.style.cursor = 'ew-resize'
  }

  onRelease = (
    stops: Array<HTMLElement>,
    stop: HTMLElement,
    update: (e: UpdateEvent) => void
  ) => {
    document.onmousemove = null
    document.onmouseup = null
    stop.onmouseup = null
    stop.style.zIndex = '1'

    requestAnimationFrame(() => {
      stop.focus()
    })

    this.setState({
      isTooltipDisplay: Array(stops.length).fill(false),
    })

    update('RELEASED')
    document.body.style.cursor = ''
  }

  onAdd = (e: React.MouseEvent<HTMLDivElement>) => {
    const { scale, onChange } = this.props
    const { min, max } = this.props.range

    const results = addStop(e.nativeEvent, scale, min, max)
    onChange('SHIFTED', results, 'ADD_STOP')
  }

  onDelete = (knob: HTMLElement) => {
    const { scale, onChange } = this.props

    const results = deleteStop(scale, knob)
    onChange('SHIFTED', results, 'DELETE_STOP')
  }

  onShiftRight = (knob: HTMLElement, isMeta: boolean, isCtrl: boolean) => {
    const { scale, onChange } = this.props
    const { min, max } = this.props.range

    const results = shiftRightStop(scale, knob, isMeta, isCtrl, min, max)

    onChange('SHIFTED', results)

    requestAnimationFrame(() => {
      const sliderRange = knob.closest('.multiple-slider__range')
      if (sliderRange) {
        const updatedKnob = sliderRange.querySelector(
          `[data-id="${knob.dataset.id}"]`
        )
        if (updatedKnob instanceof HTMLElement) updatedKnob.focus()
      }
    })
  }

  onShiftLeft = (knob: HTMLElement, isMeta: boolean, isCtrl: boolean) => {
    const { scale, onChange } = this.props
    const { min, max } = this.props.range

    const results = shiftLeftStop(scale, knob, isMeta, isCtrl, min, max)

    onChange('SHIFTED', results)

    requestAnimationFrame(() => {
      const sliderRange = knob.closest('.multiple-slider__range')
      if (sliderRange) {
        const updatedKnob = sliderRange.querySelector(
          `[data-id="${knob.dataset.id}"]`
        )
        if (updatedKnob instanceof HTMLElement) updatedKnob.focus()
      }
    })
  }

  distributeStops = (
    type: string,
    value: number,
    stops: Array<HTMLElement>
  ) => {
    const { scale, distributionEasing, onChange, range } = this.props
    const { min, max, step = 0.1 } = range

    const steppedValue = Math.round(value / step) * step
    const precision = step.toString().split('.')[1]?.length || 0

    if (type === 'MIN')
      onChange('UPDATING', {
        scale: doScale(
          Object.entries(scale)
            .sort((a, b) => b[1] - a[1])
            .map((entry) => parseFloat(entry[0])),
          parseFloat(steppedValue.toFixed(precision)),
          Math.max(...Object.values(scale)) ?? max,
          distributionEasing
        ),
      })
    else if (type === 'MAX')
      onChange('UPDATING', {
        scale: doScale(
          Object.entries(scale)
            .sort((a, b) => b[1] - a[1])
            .map((entry) => parseFloat(entry[0])),
          Math.min(...Object.values(scale)) ?? min,
          parseFloat(steppedValue.toFixed(precision)),
          distributionEasing
        ),
      })

    this.setState({
      isTooltipDisplay: Array(stops.length).fill(true),
    })

    document.body.style.cursor = 'ew-resize'
  }

  linkStops = (value: number, src: HTMLElement, stops: Array<HTMLElement>) => {
    const { scale, onChange, range } = this.props
    const { step = 0.1 } = range
    const newScale: Record<string, number> = scale

    const steppedValue = Math.round(value / step) * step
    const precision = step.toString().split('.')[1]?.length || 0

    stops
      .filter((stop) => stop !== src)
      .forEach((stop) => {
        const delta =
          newScale[stop.dataset.id as string] -
          newScale[src.dataset.id as string] +
          steppedValue

        const steppedDelta = Math.round(delta / step) * step
        newScale[stop.dataset.id as string] = parseFloat(
          steppedDelta.toFixed(precision)
        )
      })

    newScale[src.dataset.id as string] = parseFloat(
      steppedValue.toFixed(precision)
    )

    this.setState({
      isTooltipDisplay: this.state.isTooltipDisplay.fill(true),
    })

    onChange('UPDATING', {
      scale: newScale,
    })
    document.body.style.cursor = 'ew-resize'
  }

  // Templates
  Edit = () => {
    const { scale, range, colors, tips, isBlocked } = this.props
    const { isTooltipDisplay } = this.state

    return (
      <div
        className="multiple-slider__range"
        style={{
          background: `linear-gradient(90deg, ${colors.min}, ${colors.max})`,
        }}
        role="slider"
        aria-orientation="horizontal"
        aria-valuemin={range.min}
        aria-valuemax={range.max}
      >
        {Object.entries(scale)
          .sort((a, b) => a[1] - b[1])
          .map((item, index, original) => (
            <Knob
              key={item[0]}
              id={item[0]}
              shortId={item[0]}
              value={item[1]}
              offset={doMap(item[1], range.min, range.max, 0, 100)}
              min={range.min.toString()}
              max={range.max.toString()}
              helper={
                index === 0 || index === original.length - 1
                  ? {
                      label: tips.minMax,
                      type: 'MULTI_LINE',
                    }
                  : undefined
              }
              canBeTyped
              isDisplayed={isTooltipDisplay[index]}
              isBlocked={isBlocked}
              onShiftRight={(e: React.KeyboardEvent<HTMLInputElement>) => {
                this.onShiftRight(e.target as HTMLElement, e.metaKey, e.ctrlKey)
              }}
              onShiftLeft={(e: React.KeyboardEvent<HTMLInputElement>) => {
                this.onShiftLeft(e.target as HTMLElement, e.metaKey, e.ctrlKey)
              }}
              onMouseDown={(e: React.MouseEvent<HTMLElement>) => {
                this.onGrab(e)
                ;(e.target as HTMLElement).focus()
              }}
              onValidStopValue={(stopId, e) => this.validHandler(stopId, e)}
              aria-valuenow={item[1]}
            />
          ))}
      </div>
    )
  }

  FullyEdit = () => {
    const { scale, stops, range, colors, tips, isBlocked } = this.props
    const { isTooltipDisplay } = this.state

    return (
      <div
        className={doClassnames([
          'multiple-slider__range',
          stops.list.length < (stops.max ?? Infinity) &&
            'multiple-slider__range--add',
          stops.list.length === (stops.max ?? Infinity) &&
            'multiple-slider__range--not-allowed',
        ])}
        style={{
          background: `linear-gradient(90deg, ${colors.min}, ${colors.max})`,
        }}
        onMouseDown={(e) =>
          stops.list.length < (stops.max ?? Infinity) && this.onAdd(e)
        }
      >
        {Object.entries(scale)
          .sort((a, b) => a[1] - b[1])
          .map((item, index, original) => (
            <Knob
              key={item[0]}
              id={item[0]}
              shortId={item[0]}
              value={item[1]}
              offset={doMap(item[1], range.min, range.max, 0, 100)}
              min={range.min.toString()}
              max={range.max.toString()}
              helper={
                index === 0 || index === original.length - 1
                  ? {
                      label: tips.minMax,
                      type: 'MULTI_LINE',
                    }
                  : undefined
              }
              canBeTyped
              isDisplayed={isTooltipDisplay[index]}
              isBlocked={isBlocked}
              onShiftRight={(e: React.KeyboardEvent<HTMLInputElement>) => {
                this.onShiftRight(e.target as HTMLElement, e.metaKey, e.ctrlKey)
              }}
              onShiftLeft={(e: React.KeyboardEvent<HTMLInputElement>) => {
                this.onShiftLeft(e.target as HTMLElement, e.metaKey, e.ctrlKey)
              }}
              onDelete={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (stops.list.length > (stops.min ?? Infinity))
                  this.onDelete(e.target as HTMLElement)
              }}
              onMouseDown={(e: React.MouseEvent<HTMLElement>) => {
                this.onGrab(e)
                ;(e.target as HTMLElement).focus()
              }}
              onValidStopValue={(stopId, e) => this.validHandler(stopId, e)}
              aria-valuenow={item[1]}
            />
          ))}
      </div>
    )
  }

  // Render
  render() {
    const { type, isBlocked, isNew } = this.props

    return (
      <div className="multiple-slider">
        {type === 'EDIT' && <this.Edit />}
        {type === 'FULLY_EDIT' && <this.FullyEdit />}
        {(isBlocked || isNew) && <Chip>{isNew ? 'New' : 'Pro'}</Chip>}
      </div>
    )
  }
}
