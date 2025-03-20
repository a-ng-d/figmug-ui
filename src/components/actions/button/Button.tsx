import React from 'react'
import { doClassnames } from '@a_ng_d/figmug-utils'
import type { IconList } from '@tps/icon.types'
import Icon from '@components/assets/icon/Icon'
import Chip from '@components/tags/chip/Chip'
import Tooltip from '@components/tags/tooltip/Tooltip'
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
    isSingleLine?: boolean
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
        role="action-button"
        className={doClassnames([
          'button',
          `button--${type}`,
          `button--${size}`,
          isLoading && 'button--loading',
          isBlocked && 'button--blocked',
        ])}
        data-feature={feature}
        disabled={isDisabled || isBlocked}
        onKeyDown={(e) => {
          if (
            (e.key === ' ' || e.key === 'Enter') &&
            (!isDisabled || !isBlocked)
          )
            action?.(e)
          if (e.key === 'Escape') (e.target as HTMLElement).blur()
        }}
        onMouseDown={!(isDisabled || isBlocked) ? action : undefined}
        ref={this.buttonRef}
      >
        {icon !== undefined && (
          <span className="button__icon">
            <Icon
              type="PICTO"
              iconName={icon}
            />
          </span>
        )}
        <span className="button__label">{label}</span>
        {isLoading && (
          <div className="button__loader">
            <Icon
              type="PICTO"
              iconName="spinner"
              customClassName="button__spinner"
            />
          </div>
        )}
        {hasMultipleActions && (
          <span className="button__caret">
            <Icon
              type="PICTO"
              iconName="chevron-down"
            />
          </span>
        )}
        {(isBlocked || isNew) && <Chip>{isNew ? 'New' : 'Pro'}</Chip>}
      </button>
    )
  }

  LinkButton = () => {
    const { type, size, feature, label, url } = this.props

    return (
      <button
        role="link-button"
        className={doClassnames([
          'button',
          `button--${type}`,
          `button--${size}`,
        ])}
        data-feature={feature}
        ref={this.buttonRef}
      >
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="button__label"
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
        role="icon-button"
        data-feature={feature}
        className={doClassnames([
          'icon-button',
          `icon-button--${size}`,
          state === 'selected' && 'icon-button--selected',
          isNew && 'icon-button--new',
          isLoading && 'button--loading',
        ])}
        disabled={isDisabled || isBlocked}
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
        {isTooltipVisible && (
          <Tooltip
            pin={helper?.pin}
            isSingleLine={helper?.isSingleLine}
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
