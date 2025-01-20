import React from 'react'
import type { IconList } from '../../..//types/icon.types'
import { Button } from '../../actions/button/Button'
import { Icon } from '../../assets/icon/Icon'
import { Chip } from '../../tags/chip/Chip'
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
  feature?: string
  shouldBlur?: boolean
  isAutoFocus?: boolean
  isGrowing?: boolean
  isFlex?: boolean
  isClearable?: boolean
  isFramed?: boolean
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
}

export interface InputStates {
  inputValue: string
}

export class Input extends React.Component<InputProps, InputStates> {
  inputRef: React.RefObject<HTMLInputElement>
  textareaRef: React.RefObject<HTMLTextAreaElement>
  private startValue: string

  static defaultProps: Partial<InputProps> = {
    icon: undefined,
    state: 'DEFAULT',
    step: '1',
    shouldBlur: false,
    isClearable: false,
    isFramed: true,
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
    }
    this.startValue = props.value
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
    if (isAutoFocus) {
      setTimeout(() => {
        if (this.inputRef.current) {
          this.inputRef.current.focus()
        } else if (this.textareaRef.current) {
          this.textareaRef.current.focus()
        }
      }, 1)
    }
  }

  componentDidUpdate(prevProps: InputProps) {
    const { value, isGrowing } = this.props

    if (prevProps.value !== value) {
      this.setState({
        inputValue: value,
      })
    }
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
    const { onChange } = this.props

    this.setState({
      inputValue: e.target.value,
    })
    if (onChange) onChange(e)
  }

  onChangeColorValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { onChange } = this.props

    if (/^[0-9a-fA-F]{6}$/i.test(e.target.value)) {
      this.setState({
        inputValue: `#${e.target.value}`,
      })
      if (onChange) onChange(e)
    }
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
    const { value, onFocus } = this.props

    this.startValue = value

    if (onFocus) {
      onFocus(e)
    }
  }

  onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { shouldBlur, onBlur } = this.props
    const { inputValue } = this.state

    if ((inputValue !== this.startValue && onBlur) || (onBlur && shouldBlur)) {
      onBlur(e)
    }
  }

  // Direct actions
  onValidText = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { onValid } = this.props
    const target = e.target as HTMLInputElement

    if (e.key === 'Enter') {
      target.blur()
      if (onValid !== undefined) onValid(e)
    } else if (e.key === 'Escape') target.blur()
  }

  onValidLongText = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement

    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
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
      })
      this.startValue = v
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
      })
      this.startValue = v
      if (parseFloat(inputValue) - nudge > parseFloat(min ?? '0')) onShift?.(e)
    } else if (e.key === 'Enter' || e.key === 'Escape') {
      if (parseFloat(inputValue) < parseFloat(min ?? '0')) {
        this.setState({
          inputValue: min ?? '0',
        })
      } else if (parseFloat(inputValue) > parseFloat(max ?? '100')) {
        this.setState({
          inputValue: max ?? '100',
        })
      }
      target.blur()
    }
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

    document.body.style.cursor = 'ew-resize'
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', this.onDrag)
      document.body.style.cursor = ''
    })
  }

  // Templates
  Color = () => {
    const { id, feature, isBlocked, isDisabled, isNew } = this.props

    const { inputValue } = this.state

    return (
      <div
        className={[
          'input',
          'recharged',
          'input--color',
          'input--with-icon',
          isBlocked && 'input--blocked',
        ]
          .filter((n) => n)
          .join(' ')}
      >
        <input
          role="color-picker"
          id={id}
          data-feature={feature}
          type="color"
          className="input__color"
          value={inputValue}
          disabled={isDisabled || isBlocked}
          onChange={
            !(isDisabled || isBlocked) ? this.onPickColorValue : undefined
          }
          onFocus={!(isDisabled || isBlocked) ? this.onFocus : undefined}
          onBlur={!(isDisabled || isBlocked) ? this.onBlur : undefined}
          ref={this.inputRef}
        />
        <input
          role="color-display"
          id={id}
          data-feature={feature}
          type="input"
          className="input__field"
          value={inputValue.toUpperCase().replace('#', '')}
          maxLength={6}
          disabled={isDisabled || isBlocked}
          onChange={
            !(isDisabled || isBlocked) ? this.onChangeColorValue : undefined
          }
          onFocus={(e) => {
            e.target.select()
            this.onFocus(e)
          }}
          onBlur={!(isDisabled || isBlocked) ? this.onBlur : undefined}
          ref={this.inputRef}
        />
        {(isBlocked || isNew) && <Chip>{isNew ? 'New' : 'Pro'}</Chip>}
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
      feature,
      isBlocked,
      isDisabled,
      isNew,
      isFlex,
      onSlide,
    } = this.props

    const { inputValue } = this.state

    return (
      <div
        className={[
          'input',
          'recharged',
          'input--number',
          icon !== undefined && 'input--with-icon',
          isFlex && 'input--flex',
          isBlocked && 'input--blocked',
        ]
          .filter((n) => n)
          .join(' ')}
      >
        <div className="input__wrapper">
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
                iconColor="var(--figma-color-text-disabled)"
              />
            </div>
          )}
          <input
            role="numeric-stepper"
            id={id}
            data-feature={feature}
            type="number"
            className={[
              'input__field',
              isFlex && 'input__field--flex',
              unit !== undefined && 'input__field--unit',
            ]
              .filter((n) => n)
              .join(' ')}
            value={inputValue}
            min={min}
            max={max}
            step={step}
            disabled={isDisabled || isBlocked}
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
            <div
              style={{
                position: 'absolute',
                right: '0',
                top: '0',
                pointerEvents: 'none',
              }}
            >
              <Icon
                type={'LETTER'}
                iconLetter={unit}
                iconColor="var(--figma-color-text-disabled)"
              />
            </div>
          )}
        </div>
        {(isBlocked || isNew) && <Chip>{isNew ? 'New' : 'Pro'}</Chip>}
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
      feature,
      isClearable,
      isFramed,
      isBlocked,
      isDisabled,
      isNew,
      onClear,
    } = this.props

    const { inputValue } = this.state

    return (
      <div
        className={[
          'input',
          'recharged',
          'input--short-text',
          icon !== undefined && 'input--with-icon',
          isBlocked && 'input--blocked',
        ]
          .filter((n) => n)
          .join(' ')}
      >
        {icon !== undefined && (
          <div className="input__icon">
            <Icon
              type={icon?.type}
              iconName={icon?.value}
              iconLetter={icon?.value}
              iconColor="var(--figma-color-text-disabled)"
            />
          </div>
        )}
        <input
          role="short-text"
          id={id}
          data-feature={feature}
          type="text"
          className={[
            'input__field',
            !isFramed && 'input__field--no-frame',
            isClearable && 'input__field--clearable',
            state === 'ERROR' && 'input__field--error',
          ]
            .filter((n) => n)
            .join(' ')}
          placeholder={placeholder}
          value={inputValue}
          maxLength={charactersLimit}
          disabled={isDisabled || isBlocked}
          onKeyDown={!(isDisabled || isBlocked) ? this.onValidText : undefined}
          onChange={!(isDisabled || isBlocked) ? this.onChangeText : undefined}
          onFocus={!(isDisabled || isBlocked) ? this.onFocus : undefined}
          onBlur={!(isDisabled || isBlocked) ? this.onBlur : undefined}
          ref={this.inputRef}
        ></input>
        {(isBlocked || isNew) && <Chip>{isNew ? 'New' : 'Pro'}</Chip>}
        {isClearable && inputValue.length > 0 && (
          <div className="input__clear">
            <Button
              type="icon"
              icon="close"
              action={() => {
                this.setState({ inputValue: '' })
                if (onClear !== undefined) onClear('')
              }}
            />
          </div>
        )}
      </div>
    )
  }

  LongText = () => {
    const { id, state, placeholder, feature, isBlocked, isDisabled, isNew } =
      this.props

    const { inputValue } = this.state

    return (
      <div
        className={[
          'input',
          'recharged',
          'input--long-text',
          isBlocked && 'input--blocked',
        ]
          .filter((n) => n)
          .join(' ')}
      >
        <textarea
          role="long-text"
          id={id}
          data-feature={feature}
          className={[
            'textarea',
            'input__field',
            state === 'ERROR' && 'input__field--error',
          ]
            .filter((n) => n)
            .join(' ')}
          rows={1}
          placeholder={placeholder}
          value={inputValue}
          disabled={isDisabled || isBlocked}
          onKeyDown={
            !(isDisabled || isBlocked) ? this.onValidLongText : undefined
          }
          onChange={!(isDisabled || isBlocked) ? this.onChangeText : undefined}
          onFocus={!(isDisabled || isBlocked) ? this.onFocus : undefined}
          onBlur={!(isDisabled || isBlocked) ? this.onBlur : undefined}
          ref={this.textareaRef}
        />
        {(isBlocked || isNew) && <Chip>{isNew ? 'New' : 'Pro'}</Chip>}
      </div>
    )
  }

  CodeSnippet = () => {
    const { id, value, feature, isBlocked, isDisabled, isNew } = this.props

    return (
      <div
        className={[
          'input',
          'recharged',
          'input--code',
          isBlocked && 'input--blocked',
        ]
          .filter((n) => n)
          .join(' ')}
      >
        <textarea
          role="code-snippet"
          id={id}
          data-feature={feature}
          className={['textarea', 'input__field', 'textarea--monospace']
            .filter((n) => n)
            .join(' ')}
          value={value}
          disabled={isDisabled || isBlocked}
          onChange={!(isDisabled || isBlocked) ? this.onChangeText : undefined}
          onFocus={(e) => e.target.select()}
          onBlur={() => window.getSelection()?.removeAllRanges()}
          readOnly
          ref={this.textareaRef}
        />
        {(isBlocked || isNew) && <Chip>{isNew ? 'New' : 'Pro'}</Chip>}
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
