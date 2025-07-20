import React from 'react'
import Tooltip from '@components/tags/tooltip/Tooltip'
import IconChip from '@components/tags/icon-chip/IconChip'
import Chip from '@components/tags/chip/Chip'
import Icon from '@components/assets/icon/Icon'
import { doClassnames } from '@a_ng_d/figmug-utils'
import type { IconList } from '@tps/icon.types'
import './button.scss'

export interface ButtonProps {
  type:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'destructive'
    | 'alternative'
    | 'icon'
  size?: 'small' | 'default' | 'large'
  icon?: IconList
  iconClassName?: string
  customIcon?: React.ReactElement
  label?: string
  state?: 'default' | 'selected'
  url?: string
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
  hasMultipleActions?: boolean
  isLink?: boolean
  isLoading?: boolean
  isBlocked?: boolean
  isDisabled?: boolean
  isNew?: boolean
  action?: React.MouseEventHandler & React.KeyboardEventHandler
}

interface ButtonStates {
  isTooltipVisible: boolean
}

export default class Button extends React.Component<ButtonProps, ButtonStates> {
  buttonRef: React.RefObject<HTMLButtonElement> = React.createRef()

  static defaultProps: Partial<ButtonProps> = {
    size: 'default',
    state: 'default',
    isLink: false,
    hasMultipleActions: false,
    isLoading: false,
    isBlocked: false,
    isDisabled: false,
    isNew: false,
  }

  constructor(props: ButtonProps) {
    super(props)
    this.state = {
      isTooltipVisible: false,
    }
  }

  // Templates
  Button = () => {
    const {
      type,
      icon,
      size,
      preview,
      warning,
      isBlocked,
      feature,
      hasMultipleActions,
      isLoading,
      isDisabled,
      isNew,
      action,
      label,
    } = this.props

    return (
      <button
        role="button"
        className={doClassnames([
          'button',
          `button--${type}`,
          `button--${size}`,
          isLoading && 'button--loading',
          isBlocked && 'button--blocked',
        ])}
        data-feature={feature}
        disabled={isDisabled || isBlocked}
        aria-label={label}
        aria-disabled={isDisabled || isBlocked}
        aria-busy={isLoading}
        onKeyDown={(e) => {
          if (
            (e.key === ' ' || e.key === 'Enter') &&
            (!isDisabled || !isBlocked)
          )
            action?.(e)
          if (e.key === 'Escape') (e.target as HTMLElement).blur()
        }}
        onMouseDown={!(isDisabled || isBlocked) ? action : undefined}
        tabIndex={0}
        ref={this.buttonRef}
      >
        {icon !== undefined && (
          <span
            className="button__icon"
            aria-hidden="true"
          >
            <Icon
              type="PICTO"
              iconName={icon}
            />
          </span>
        )}
        <span className="button__label">{label}</span>
        {isLoading && (
          <div
            className="button__loader"
            aria-hidden="true"
          >
            <Icon
              type="PICTO"
              iconName="spinner"
              customClassName="button__spinner"
            />
          </div>
        )}
        {hasMultipleActions && (
          <span
            className="button__caret"
            aria-hidden="true"
          >
            <Icon
              type="PICTO"
              iconName="chevron-down"
            />
          </span>
        )}
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
          <Chip preview={preview}>{isNew ? 'New' : 'Pro'}</Chip>
        )}
      </button>
    )
  }

  LinkButton = () => {
    const { type, size, feature, label, url } = this.props

    return (
      <button
        role="link"
        className={doClassnames([
          'button',
          `button--${type}`,
          `button--${size}`,
        ])}
        data-feature={feature}
        ref={this.buttonRef}
        aria-label={label}
        tabIndex={0}
      >
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="button__label"
          aria-label={label}
        >
          {label}
        </a>
      </button>
    )
  }

  Icon = () => {
    const {
      size,
      icon,
      iconClassName,
      customIcon,
      feature,
      state,
      helper,
      isLoading,
      isDisabled,
      isBlocked,
      isNew,
      action,
    } = this.props
    const { isTooltipVisible } = this.state

    return (
      <button
        role="button"
        data-feature={feature}
        className={doClassnames([
          'icon-button',
          `icon-button--${size}`,
          state === 'selected' && 'icon-button--selected',
          isNew && 'icon-button--new',
          isLoading && 'button--loading',
        ])}
        disabled={isDisabled || isBlocked}
        aria-label={helper?.label || icon}
        aria-disabled={isDisabled || isBlocked}
        aria-pressed={state === 'selected'}
        aria-busy={isLoading}
        onKeyDown={(e) => {
          if (
            (e.key === ' ' || e.key === 'Enter') &&
            !(isDisabled || isBlocked)
          )
            action?.(e)
          if (e.key === 'Escape') (e.target as HTMLElement).blur()
        }}
        onMouseDown={!(isDisabled || isBlocked) ? action : undefined}
        onMouseEnter={() => {
          if (helper !== undefined) this.setState({ isTooltipVisible: true })
        }}
        onMouseLeave={() => {
          if (helper !== undefined) this.setState({ isTooltipVisible: false })
        }}
        onFocus={() => {
          if (helper !== undefined) this.setState({ isTooltipVisible: true })
        }}
        onBlur={() => {
          if (helper !== undefined) this.setState({ isTooltipVisible: false })
        }}
        tabIndex={0}
        ref={this.buttonRef}
      >
        {customIcon === undefined ? (
          <Icon
            type="PICTO"
            iconName={isLoading ? 'spinner' : icon}
            customClassName={
              iconClassName !== undefined ? iconClassName : undefined
            }
          />
        ) : (
          <div
            style={{
              opacity: isDisabled || isBlocked ? 0.5 : 1,
              pointerEvents: 'none',
            }}
          >
            {customIcon}
          </div>
        )}
        {isTooltipVisible && helper !== undefined && state !== 'selected' && (
          <Tooltip
            pin={helper?.pin}
            type={helper?.type}
          >
            {helper?.label}
          </Tooltip>
        )}
      </button>
    )
  }

  // Render
  render() {
    const { type, isLink } = this.props

    if (type !== 'icon') return isLink ? this.LinkButton() : this.Button()
    return this.Icon()
  }
}
