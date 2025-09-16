import React from 'react'
import Tooltip from '@components/tags/tooltip/Tooltip'
import IconChip from '@components/tags/icon-chip/IconChip'
import Chip from '@components/tags/chip/Chip'
import Icon from '@components/assets/icon/Icon'
import Button from '@components/actions/button/Button'
import { doClassnames } from '@a_ng_d/figmug-utils'
import type { IconList } from '@tps/icon.types'
import './input.scss'

export interface InputProps {
  id?: string
  type: 'NUMBER' | 'COLOR' | 'TEXT' | 'LONG_TEXT' | 'CODE'
  icon?: { type: 'LETTER' | 'PICTO'; value: IconList }
  unit?: '%' | '°'
  state?: 'DEFAULT' | 'ERROR'
  placeholder?: string
  value: string
  charactersLimit?: number
  min?: string
  max?: string
  step?: string
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
  shouldBlur?: boolean
  isAutoFocus?: boolean
  isGrowing?: boolean
  isFlex?: boolean
  isClearable?: boolean
  isFramed?: boolean
  canBeEmpty?: boolean
  isBlocked?: boolean
  isDisabled?: boolean
  isNew?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onFocus?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onBlur?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onShift?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onClear?: (value: string) => void
  onSlide?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onValid?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onPick?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onUnblock?: React.MouseEventHandler & React.KeyboardEventHandler
}

export interface InputStates {
  inputValue: string
  lastValidValue: string
  lastValidColorValue: string
  colorValue: string
  isTooltipVisible: boolean
}

export default class Input extends React.Component<InputProps, InputStates> {
  inputRef: React.RefObject<HTMLInputElement>
  textareaRef: React.RefObject<HTMLTextAreaElement>

  static defaultProps: Partial<InputProps> = {
    icon: undefined,
    state: 'DEFAULT',
    step: '1',
    shouldBlur: false,
    isClearable: false,
    isFramed: true,
    canBeEmpty: true,
    isBlocked: false,
    isDisabled: false,
    isNew: false,
    isAutoFocus: false,
    isGrowing: false,
    isFlex: false,
  }

  constructor(props: InputProps) {
    super(props)
    this.state = {
      inputValue: props.value,
      lastValidValue: props.value,
      colorValue: props.value,
      lastValidColorValue: props.value,
      isTooltipVisible: false,
    }
    this.inputRef = React.createRef()
    this.textareaRef = React.createRef()
  }

  componentDidMount(): void {
    const { isGrowing } = this.props

    if (this.textareaRef.current) {
      this.textareaRef.current.style.height = 'auto'
      if (isGrowing)
        this.textareaRef.current.style.height = `${this.textareaRef.current.scrollHeight + 2}px`
    }
    const { isAutoFocus } = this.props
    if (isAutoFocus)
      setTimeout(() => {
        if (this.inputRef.current) this.inputRef.current.focus()
        else if (this.textareaRef.current) this.textareaRef.current.focus()
      }, 1)
  }

  componentDidUpdate(prevProps: InputProps) {
    const { value, isGrowing } = this.props

    if (prevProps.value !== value)
      this.setState({
        inputValue: value,
      })

    if (prevProps.type === 'CODE' && this.textareaRef.current !== null)
      this.textareaRef.current.scrollTop = 0
    if (this.textareaRef.current) {
      this.textareaRef.current.style.height = 'auto'
      if (isGrowing)
        this.textareaRef.current.style.height = `${this.textareaRef.current.scrollHeight + 2}px`
    }
  }

  // Handlers
  onPickColorValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { onPick } = this.props
    const value = e.target.value

    this.setState({
      inputValue: value,
      colorValue: value,
      lastValidColorValue: value,
    })
    if (onPick) onPick(e)
  }

  onChangeColorValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { onChange } = this.props

    this.setState({
      inputValue: e.target.value,
    })
    if (onChange) onChange(e)
  }

  onChangeNumber = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { onChange } = this.props

    this.setState({
      inputValue: e.target.value,
    })
    if (onChange) onChange(e)
  }

  onChangeText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { onChange } = this.props

    this.setState({
      inputValue: e.target.value,
    })
    if (onChange) onChange(e)
  }

  onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, onFocus, canBeEmpty, type } = this.props

    const shouldPreventEvent =
      (type === 'TEXT' || type === 'LONG_TEXT') &&
      !canBeEmpty &&
      value.trim() === ''

    if (onFocus && !shouldPreventEvent) onFocus(e)
  }

  onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { shouldBlur, onBlur, canBeEmpty, type, min, max } = this.props
    const { inputValue, lastValidValue, lastValidColorValue } = this.state

    if (type === 'NUMBER') {
      const isEmpty = inputValue.trim() === ''
      let transformedValue

      if (parseFloat(inputValue) < parseFloat(min ?? '0'))
        transformedValue = min ?? '0'
      else if (parseFloat(inputValue) > parseFloat(max ?? '100'))
        transformedValue = max ?? '100'
      else if (isEmpty) {
        transformedValue = lastValidValue
        this.setState({
          inputValue: transformedValue,
        })
      } else transformedValue = inputValue

      if (
        (transformedValue !== lastValidValue && onBlur) ||
        (shouldBlur && onBlur)
      ) {
        onBlur({
          ...e,
          target: { ...e.target, value: transformedValue },
          currentTarget: { ...e.currentTarget, value: transformedValue },
        } as React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>)

        this.setState({
          inputValue: transformedValue ?? inputValue,
          lastValidValue: transformedValue ?? inputValue,
        })
      }

      return
    }

    if (type === 'COLOR') {
      const transformedValue = this.transformColorCode(e.target.value)

      if (
        (transformedValue !== lastValidColorValue && onBlur) ||
        (shouldBlur && onBlur)
      ) {
        onBlur({
          ...e,
          target: { ...e.target, value: transformedValue },
          currentTarget: { ...e.currentTarget, value: transformedValue },
        } as React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>)

        this.setState({
          colorValue: transformedValue,
          lastValidColorValue: transformedValue,
        })

        return
      }
    }

    if (type === 'TEXT' || type === 'LONG_TEXT') {
      const isEmpty = inputValue.trim() === ''
      const shouldPreventEvent =
        (type === 'TEXT' || type === 'LONG_TEXT') && !canBeEmpty && isEmpty

      if (shouldPreventEvent) {
        this.setState({
          inputValue: lastValidValue,
        })
        return
      }

      if ((inputValue !== lastValidValue && onBlur) || (shouldBlur && onBlur)) {
        onBlur(e)

        this.setState({
          lastValidValue: inputValue,
        })

        return
      }
    }
  }

  // Direct Actions
  onValidText = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { onValid } = this.props
    const target = e.target as HTMLInputElement

    if (e.key === 'Enter') {
      if (onValid !== undefined) onValid(e)
      target.blur()
    } else if (e.key === 'Escape') target.blur()
  }

  onValidLongText = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { onValid } = this.props
    const target = e.target as HTMLInputElement

    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      if (onValid !== undefined) onValid(e)
      target.blur()
    } else if (e.key === 'Escape') target.blur()
  }

  onValidNumber = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { min, max, step, onShift } = this.props
    const { inputValue } = this.state
    const target = e.target as HTMLInputElement

    let nudge = 0

    if (e.key === 'ArrowUp') {
      if (e.shiftKey) nudge = 9
      const v =
        parseFloat(inputValue) + nudge < parseFloat(max ?? '100')
          ? (
              parseFloat(inputValue) +
              nudge * parseFloat(step === undefined ? '1' : step)
            ).toString()
          : max ?? '100'

      this.setState({
        inputValue: v,
        lastValidValue: v,
      })
      if (parseFloat(inputValue) + nudge < parseFloat(max ?? '100'))
        onShift?.(e)
    } else if (e.key === 'ArrowDown') {
      if (e.shiftKey) nudge = 9
      const v =
        parseFloat(inputValue) - nudge > parseFloat(min ?? '0')
          ? (
              parseFloat(inputValue) -
              nudge * parseFloat(step === undefined ? '1' : step)
            ).toString()
          : min ?? '0'
      this.setState({
        inputValue: v,
        lastValidValue: v,
      })
      if (parseFloat(inputValue) - nudge > parseFloat(min ?? '0')) onShift?.(e)
    } else if (e.key === 'Enter' || e.key === 'Escape') {
      if (parseFloat(inputValue) < parseFloat(min ?? '0'))
        this.setState({
          inputValue: min ?? '0',
        })
      else if (parseFloat(inputValue) > parseFloat(max ?? '100'))
        this.setState({
          inputValue: max ?? '100',
        })

      target.blur()
    }
  }

  onValidColor = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { onValid } = this.props
    const target = e.target as HTMLInputElement

    if (e.key === 'Enter') {
      if (onValid !== undefined) onValid(e)
      target.blur()
    } else if (e.key === 'Escape') target.blur()
  }

  doClear = () => this.setState({ inputValue: '' })

  onGrab = () => {
    if (this.inputRef.current) this.inputRef.current.focus()
    document.addEventListener('mousemove', this.onDrag)
  }

  onDrag = (e: MouseEvent) => {
    if (this.inputRef.current) this.inputRef.current.focus()
    const { min, max, onSlide } = this.props
    const { inputValue } = this.state

    const nMin = parseFloat(min ?? '0')
    const nMax = parseFloat(max ?? '100')
    const nValue = parseFloat(inputValue)
    const delta = nValue + e.movementX

    if (delta >= nMin && delta <= nMax) {
      this.setState({
        inputValue: delta.toString(),
      })
      if (this.inputRef.current) {
        const event = new Event('input', { bubbles: true })
        Object.defineProperty(event, 'target', {
          value: this.inputRef.current,
          enumerable: true,
        })
        Object.defineProperty(event, 'currentTarget', {
          value: this.inputRef.current,
          enumerable: true,
        })
        onSlide?.(event as unknown as React.ChangeEvent<HTMLInputElement>)
      }
    }

    document.body.style.setProperty('cursor', 'ew-resize', 'important')
    this.inputRef.current?.style.setProperty('cursor', 'ew-resize', 'important')
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', this.onDrag)
      document.body.style.cursor = ''
      if (this.inputRef.current) this.inputRef.current.style.cursor = ''
    })
  }

  transformColorCode = (colorCode: string): string => {
    const { lastValidColorValue } = this.state

    const inputWithoutHash = colorCode.startsWith('#')
      ? colorCode.substring(1)
      : colorCode

    const validChars = inputWithoutHash
      .toLowerCase()
      .split('')
      .filter((char) => /[0-9a-f]/i.test(char))

    if (validChars.length === 0) return lastValidColorValue

    if (validChars.length >= 6) return `#${validChars.slice(0, 6).join('')}`

    let result = ''

    switch (validChars.length) {
      case 1:
        result = validChars[0].repeat(6)
        break

      case 2:
        result = `${validChars.join('')}`.repeat(3)
        break

      case 3:
        result = `${validChars[0]}${validChars[0]}${validChars[1]}${validChars[1]}${validChars[2]}${validChars[2]}`
        break

      case 4:
        result = `${validChars[0]}${validChars[0]}${validChars[1]}${validChars[1]}${validChars[2]}${validChars[2]}`
        break

      case 5:
        result = `${validChars[0]}${validChars[0]}${validChars[1]}${validChars[1]}${validChars[2]}${validChars[2]}`
        break

      default:
        result = validChars.slice(0, 6).join('')
    }

    result.indexOf('#') !== 0 && (result = `#${result}`)

    return result.toLowerCase()
  }

  // Templates
  Status = () => {
    const { warning, preview, isBlocked, isNew, onUnblock } = this.props

    if (warning || isBlocked || isNew)
      return (
        <div className="input__status">
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

  Color = () => {
    const { id, feature, helper, isBlocked, isDisabled, onBlur } = this.props
    const { inputValue, colorValue, isTooltipVisible } = this.state

    return (
      <div
        className={doClassnames([
          'input',
          'input--color',
          'input--with-icon',
          isBlocked && 'input--blocked',
        ])}
        role="group"
      >
        <div
          className="input__wrapper"
          onMouseEnter={() => {
            if (helper !== undefined) this.setState({ isTooltipVisible: true })
          }}
          onMouseLeave={() => {
            if (helper !== undefined) this.setState({ isTooltipVisible: false })
          }}
        >
          <input
            role="color-picker"
            id={id}
            data-feature={feature}
            type="color"
            className="input__color"
            value={colorValue}
            disabled={isDisabled || isBlocked}
            aria-disabled={isDisabled || isBlocked}
            onChange={
              !(isDisabled || isBlocked) ? this.onPickColorValue : undefined
            }
            onBlur={!(isDisabled || isBlocked) ? onBlur : undefined}
            ref={this.inputRef}
          />
          <input
            role="color-display"
            id={id}
            data-feature={feature}
            type="input"
            className="input__field"
            value={inputValue.toUpperCase().replace('#', '')}
            maxLength={7}
            disabled={isDisabled || isBlocked}
            onChange={
              !(isDisabled || isBlocked) ? this.onChangeColorValue : undefined
            }
            onFocus={(e) => {
              e.target.select()
              this.onFocus(e)
            }}
            onKeyDown={
              !(isDisabled || isBlocked) ? this.onValidColor : undefined
            }
            onBlur={!(isDisabled || isBlocked) ? this.onBlur : undefined}
            ref={this.inputRef}
          />
          {isTooltipVisible && helper !== undefined && (
            <Tooltip
              pin={helper?.pin || 'BOTTOM'}
              type={helper?.type || 'SINGLE_LINE'}
            >
              {helper?.label}
            </Tooltip>
          )}
        </div>
        {this.Status()}
      </div>
    )
  }

  Number = () => {
    const {
      id,
      icon,
      unit,
      min,
      max,
      step,
      helper,
      feature,
      isBlocked,
      isDisabled,
      isFlex,
      onSlide,
    } = this.props
    const { inputValue, isTooltipVisible } = this.state

    return (
      <div
        className={doClassnames([
          'input',
          'input--number',
          icon !== undefined && 'input--with-icon',
          isFlex && 'input--flex',
          isBlocked && 'input--blocked',
        ])}
        role="group"
      >
        <div
          className="input__wrapper"
          onMouseEnter={() => {
            if (helper !== undefined) this.setState({ isTooltipVisible: true })
          }}
          onMouseLeave={() => {
            if (helper !== undefined) this.setState({ isTooltipVisible: false })
          }}
        >
          {icon !== undefined && (
            <div
              className="input__icon"
              style={{
                cursor:
                  typeof onSlide === 'function' && !(isDisabled || isBlocked)
                    ? 'ew-resize'
                    : 'default',
              }}
              onMouseDown={() => {
                if (typeof onSlide === 'function' && !(isDisabled || isBlocked))
                  this.onGrab()
              }}
            >
              <Icon
                type={icon?.type}
                iconName={icon?.value}
                iconLetter={icon?.value}
              />
            </div>
          )}
          <input
            role="spinbutton"
            id={id}
            data-feature={feature}
            type="number"
            className={doClassnames([
              'input__field',
              isFlex && 'input__field--flex',
              unit !== undefined && 'input__field--unit',
            ])}
            value={inputValue}
            min={min}
            max={max}
            step={step}
            disabled={isDisabled || isBlocked}
            aria-valuemin={min ? parseFloat(min) : undefined}
            aria-valuemax={max ? parseFloat(max) : undefined}
            aria-valuenow={parseFloat(inputValue)}
            aria-disabled={isDisabled || isBlocked}
            onKeyDown={
              !(isDisabled || isBlocked) ? this.onValidNumber : undefined
            }
            onChange={
              !(isDisabled || isBlocked) ? this.onChangeNumber : undefined
            }
            onFocus={(e) => {
              e.target.select()
              if (!(isDisabled || isBlocked)) this.onFocus(e)
            }}
            onBlur={!(isDisabled || isBlocked) ? this.onBlur : undefined}
            ref={this.inputRef}
          />
          {unit !== undefined && (
            <div className="input__unit">
              <Icon
                type={'LETTER'}
                iconLetter={unit}
              />
            </div>
          )}
          {isTooltipVisible && helper !== undefined && (
            <Tooltip
              pin={helper?.pin || 'BOTTOM'}
              type={helper?.type || 'SINGLE_LINE'}
            >
              {helper?.label}
            </Tooltip>
          )}
        </div>
        {this.Status()}
      </div>
    )
  }

  Text = () => {
    const {
      id,
      icon,
      state,
      placeholder,
      charactersLimit,
      helper,
      feature,
      isClearable,
      isFlex,
      isFramed,
      isBlocked,
      isDisabled,
      onClear,
    } = this.props
    const { inputValue, isTooltipVisible } = this.state

    return (
      <div
        className={doClassnames([
          'input',
          'input--short-text',
          icon !== undefined && 'input--with-icon',
          isFlex && 'input__field--flex',
          isBlocked && 'input--blocked',
        ])}
        role="group"
      >
        <div
          className="input__wrapper"
          onMouseEnter={() => {
            if (helper !== undefined) this.setState({ isTooltipVisible: true })
          }}
          onMouseLeave={() => {
            if (helper !== undefined) this.setState({ isTooltipVisible: false })
          }}
        >
          {icon !== undefined && (
            <div className="input__icon">
              <Icon
                type={icon?.type}
                iconName={icon?.value}
                iconLetter={icon?.value}
              />
            </div>
          )}
          <input
            role="textbox"
            id={id}
            data-feature={feature}
            type="text"
            className={doClassnames([
              'input__field',
              !isFramed && 'input__field--no-frame',
              isClearable && inputValue.length > 0 && 'input__field--clearable',
              state === 'ERROR' && 'input__field--error',
            ])}
            placeholder={placeholder}
            value={inputValue}
            maxLength={charactersLimit}
            disabled={isDisabled || isBlocked}
            aria-invalid={state === 'ERROR'}
            aria-disabled={isDisabled || isBlocked}
            onKeyDown={
              !(isDisabled || isBlocked) ? this.onValidText : undefined
            }
            onChange={
              !(isDisabled || isBlocked) ? this.onChangeText : undefined
            }
            onFocus={!(isDisabled || isBlocked) ? this.onFocus : undefined}
            onBlur={!(isDisabled || isBlocked) ? this.onBlur : undefined}
            ref={this.inputRef}
          ></input>
          {isClearable &&
            inputValue.length > 0 &&
            !(isDisabled || isBlocked) && (
              <div className="input__clear">
                <Button
                  type="icon"
                  size="small"
                  icon="close"
                  action={() => {
                    this.setState({ inputValue: '' })
                    if (onClear !== undefined) onClear('')
                  }}
                />
              </div>
            )}
          {isTooltipVisible && helper !== undefined && (
            <Tooltip
              pin={helper?.pin || 'BOTTOM'}
              type={helper?.type || 'SINGLE_LINE'}
            >
              {helper?.label}
            </Tooltip>
          )}
        </div>
        {this.Status()}
      </div>
    )
  }

  LongText = () => {
    const { id, state, placeholder, helper, feature, isBlocked, isDisabled } =
      this.props
    const { inputValue, isTooltipVisible } = this.state

    return (
      <div
        className={doClassnames([
          'input',
          'input--long-text',
          isBlocked && 'input--blocked',
        ])}
        role="group"
      >
        <div
          className="input__wrapper"
          onMouseEnter={() => {
            if (helper !== undefined) this.setState({ isTooltipVisible: true })
          }}
          onMouseLeave={() => {
            if (helper !== undefined) this.setState({ isTooltipVisible: false })
          }}
        >
          <textarea
            role="textbox"
            id={id}
            data-feature={feature}
            className={doClassnames([
              'textarea',
              'input__field',
              state === 'ERROR' && 'input__field--error',
            ])}
            rows={1}
            placeholder={placeholder}
            value={inputValue}
            disabled={isDisabled || isBlocked}
            aria-invalid={state === 'ERROR'}
            aria-disabled={isDisabled || isBlocked}
            onKeyDown={
              !(isDisabled || isBlocked) ? this.onValidLongText : undefined
            }
            onChange={
              !(isDisabled || isBlocked) ? this.onChangeText : undefined
            }
            onFocus={!(isDisabled || isBlocked) ? this.onFocus : undefined}
            onBlur={!(isDisabled || isBlocked) ? this.onBlur : undefined}
            ref={this.textareaRef}
          />
          {isTooltipVisible && helper !== undefined && (
            <Tooltip
              pin={helper?.pin || 'BOTTOM'}
              type={helper?.type || 'SINGLE_LINE'}
            >
              {helper?.label}
            </Tooltip>
          )}
        </div>
        {this.Status()}
      </div>
    )
  }

  CodeSnippet = () => {
    const { id, value, helper, feature, isBlocked, isDisabled } = this.props

    return (
      <div
        className={doClassnames([
          'input',
          'input--code',
          isBlocked && 'input--blocked',
        ])}
        role="group"
      >
        <div
          className="input__wrapper"
          onMouseEnter={() => {
            if (helper !== undefined) this.setState({ isTooltipVisible: true })
          }}
          onMouseLeave={() => {
            if (helper !== undefined) this.setState({ isTooltipVisible: false })
          }}
        >
          <textarea
            role="textbox"
            id={id}
            data-feature={feature}
            className={doClassnames([
              'textarea',
              'input__field',
              'textarea--monospace',
            ])}
            value={value}
            disabled={isDisabled || isBlocked}
            aria-disabled={isDisabled || isBlocked}
            onChange={
              !(isDisabled || isBlocked) ? this.onChangeText : undefined
            }
            onFocus={(e) => e.target.select()}
            onBlur={() => window.getSelection()?.removeAllRanges()}
            readOnly
            ref={this.textareaRef}
          />
        </div>
        {this.Status()}
      </div>
    )
  }

  // Render
  render() {
    const { type } = this.props

    if (type === 'NUMBER') return this.Number()
    if (type === 'COLOR') return this.Color()
    if (type === 'LONG_TEXT') return this.LongText()
    if (type === 'CODE') return this.CodeSnippet()
    return this.Text()
  }
}
