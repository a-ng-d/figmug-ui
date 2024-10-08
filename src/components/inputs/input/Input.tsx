import React from 'react'
import type { IconList } from 'src/types/icon.types'
import { Chip } from '../../tags/chip/Chip'
import { Button } from '../../actions/button/Button'
import { Icon } from '../../assets/icon/Icon'
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
  onConfirm?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onCleared?: (value: string) => void
}

export interface InputStates {
  inputValue: string
}

export class Input extends React.Component<InputProps, InputStates> {
  inputRef: React.RefObject<HTMLInputElement>
  textareaRef: React.RefObject<HTMLTextAreaElement>

  static defaultProps: Partial<InputProps> = {
    icon: undefined,
    state: 'DEFAULT',
    step: '1',
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
    ;(this.state = {
      inputValue: props.value,
    }),
      (this.inputRef = React.createRef())
    this.textareaRef = React.createRef()
  }

  componentDidMount(): void {
    if (this.textareaRef.current) {
      this.textareaRef.current.style.height = 'auto'
      if (this.props.isGrowing)
        this.textareaRef.current.style.height = `${this.textareaRef.current.scrollHeight + 2}px`
    }
  }

  componentDidUpdate(prevProps: InputProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        inputValue: this.props.value,
      })
    }
    if (prevProps.type === 'CODE' && this.textareaRef.current !== null)
      this.textareaRef.current.scrollTop = 0
    if (this.textareaRef.current) {
      this.textareaRef.current.style.height = 'auto'
      if (this.props.isGrowing)
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
    if (onChange !== undefined) onChange(e)
  }

  onChangeColorValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { onChange } = this.props

    if (/^[0-9a-fA-F]{6}$/i.test(e.target.value)) {
      this.setState({
        inputValue: `#${e.target.value}`,
      })
      if (onChange !== undefined) onChange(e)
    }
  }

  onChangeNumber = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { onChange } = this.props

    this.setState({
      inputValue: e.target.value,
    })
    if (onChange !== undefined) onChange(e)
  }

  onChangeText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { onChange } = this.props

    this.setState({
      inputValue: e.target.value,
    })
    if (onChange !== undefined) onChange(e)
  }

  // Direct actions
  onValidText = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { onConfirm } = this.props

    if (e.key === 'Enter') {
      onConfirm?.(e)
      ;(e.target as HTMLElement).blur()
    } else if (e.key === 'Escape') (e.target as HTMLElement).blur()
  }

  onValidLongText = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { onConfirm } = this.props

    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      onConfirm?.(e)
      ;(e.target as HTMLElement).blur()
    } else if (e.key === 'Escape') (e.target as HTMLElement).blur()
  }

  onValidNumber = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { min, max, step, onConfirm } = this.props
    const { inputValue } = this.state

    const value = parseFloat((e.target as HTMLInputElement).value)

    let nudge = 0

    if (e.key === 'ArrowUp') {
      if (e.shiftKey) nudge = 9
      this.setState({
        inputValue:
          value + nudge < parseFloat(max ?? '100')
            ? (
                value +
                nudge * parseFloat(step === undefined ? '1' : step)
              ).toString()
            : max ?? '100',
      })
      if (value + nudge < parseFloat(max ?? '100')) {
        ;(e.target as HTMLInputElement).value = inputValue
        onConfirm?.(e)
      }
    } else if (e.key === 'ArrowDown') {
      if (e.shiftKey) nudge = 9
      this.setState({
        inputValue:
          value - nudge > parseFloat(min ?? '0')
            ? (
                value -
                nudge * parseFloat(step === undefined ? '1' : step)
              ).toString()
            : min ?? '0',
      })
      if (value - nudge > parseFloat(min ?? '0')) {
        ;(e.target as HTMLInputElement).value = inputValue
        onConfirm?.(e)
      }
    } else if (e.key === 'Enter' || e.key === 'Escape') {
      if (value < parseFloat(min ?? '0')) {
        this.setState({
          inputValue: min ?? '0',
        })
      } else if (value > parseFloat(max ?? '100')) {
        this.setState({
          inputValue: max ?? '100',
        })
      }
      ;(e.target as HTMLInputElement).value = inputValue
      onConfirm?.(e)
      ;(e.target as HTMLElement).blur()
    }
  }

  doClear = () => this.setState({ inputValue: '' })

  // Templates
  Color = () => {
    const {
      id,
      feature,
      isAutoFocus,
      isBlocked,
      isDisabled,
      isNew,
      onFocus,
      onBlur,
    } = this.props

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
          onChange={this.onPickColorValue}
          onBlur={onBlur}
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
          autoFocus={isAutoFocus}
          onChange={this.onChangeColorValue}
          onFocus={(e) => {
            e.target.select()
            if (typeof onFocus === 'function') onFocus(e)
          }}
          onBlur={onBlur}
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
      isAutoFocus,
      isBlocked,
      isDisabled,
      isNew,
      isFlex,
      onFocus,
      onBlur,
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
              style={{
                position: 'absolute',
                left: '0',
                top: '0',
                pointerEvents: 'none',
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
            autoFocus={isAutoFocus}
            onKeyDown={this.onValidNumber}
            onChange={this.onChangeNumber}
            onFocus={(e) => {
              e.target.select()
              if (typeof onFocus === 'function') onFocus(e)
            }}
            onBlur={onBlur}
            ref={this.inputRef}
          />
          {unit !== undefined && (
            <div
              style={{
                position: 'absolute',
                right: '30px',
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
      isAutoFocus,
      isClearable,
      isFramed,
      isBlocked,
      isDisabled,
      isNew,
      onFocus,
      onBlur,
      onCleared,
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
          <Icon
            type={icon?.type}
            iconName={icon.value}
            iconLetter={icon.value}
            iconColor="var(--figma-color-text-disabled)"
          />
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
          autoFocus={isAutoFocus}
          onKeyDown={this.onValidText}
          onChange={this.onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
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
                if (onCleared !== undefined) onCleared('')
              }}
            />
          </div>
        )}
      </div>
    )
  }

  LongText = () => {
    const {
      id,
      state,
      placeholder,
      feature,
      isAutoFocus,
      isBlocked,
      isDisabled,
      isNew,
      onFocus,
      onBlur,
    } = this.props

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
          autoFocus={isAutoFocus}
          onKeyDown={this.onValidLongText}
          onChange={this.onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={this.textareaRef}
        />
        {(isBlocked || isNew) && <Chip>{isNew ? 'New' : 'Pro'}</Chip>}
      </div>
    )
  }

  CodeSnippet = () => {
    const { id, value, feature, isAutoFocus, isBlocked, isDisabled, isNew } =
      this.props

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
          autoFocus={isAutoFocus}
          onChange={this.onChangeText}
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
