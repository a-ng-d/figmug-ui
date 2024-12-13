import React from 'react'
import texts from '../../../styles/texts.module.scss'
import type { IconList } from '../../../types/icon.types'
import { Icon } from '../../assets/icon/Icon'
import { Chip } from '../../tags/chip/Chip'
import { Tooltip } from '../../tags/tooltip/Tooltip'
import './button.scss'

export interface ButtonProps {
  type:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'destructive'
    | 'icon'
    | 'compact'
  icon?: IconList
  iconClassName?: string
  customIcon?: React.ReactElement
  label?: string
  state?: 'default' | 'disabled' | 'blocked' | 'selected' | ''
  url?: string
  helper?: string
  feature?: string
  hasMultipleActions?: boolean
  isLink?: boolean
  isLoading?: boolean
  isBlocked?: boolean
  isDisabled?: boolean
  isNew?: boolean
  action?: React.MouseEventHandler & React.KeyboardEventHandler
}

export interface ButtonStates {
  isTooltipVisible: boolean
}

export class Button extends React.Component<ButtonProps, ButtonStates> {
  buttonRef: React.RefObject<HTMLButtonElement> = React.createRef()

  static defaultProps: Partial<ButtonProps> = {
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
        className={[
          'button',
          'recharged',
          `button--${type}`,
          isLoading && 'button--loading',
          isBlocked && 'button--blocked',
        ]
          .filter((n) => n)
          .join(' ')}
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
        <span className={['button__label'].filter((n) => n).join(' ')}>
          {label}
        </span>
        {isLoading && (
          <div className={['button__loader'].filter((n) => n).join(' ')}>
            <Icon
              type="PICTO"
              iconName="spinner"
              iconColor={
                type === 'primary'
                  ? 'var(--figma-color-icon-onbrand)'
                  : 'var(--figma-color-icon)'
              }
              customClassName="button__spinner"
            />
          </div>
        )}
        {hasMultipleActions && (
          <Icon
            type="PICTO"
            iconName="caret"
            iconColor={
              type === 'primary'
                ? 'var(--figma-color-icon-onbrand)'
                : 'var(--figma-color-icon)'
            }
            customClassName="button__caret"
          />
        )}
        {(isBlocked || isNew) && <Chip>{isNew ? 'New' : 'Pro'}</Chip>}
      </button>
    )
  }

  LinkButton = () => {
    const { type, feature, label, url } = this.props

    return (
      <button
        role="link-button"
        className={['button', 'recharged', `button--${type}`]
          .filter((n) => n)
          .join(' ')}
        data-feature={feature}
        ref={this.buttonRef}
      >
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          {label}
        </a>
      </button>
    )
  }

  Icon = () => {
    const {
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

    return (
      <button
        role="icon-button"
        data-feature={feature}
        className={[
          'icon-button',
          'recharged',
          state !== undefined && state !== '' && `icon-button--${state}`,
          isNew && 'icon-button--new',
          isLoading && 'button--loading',
        ]
          .filter((n) => n)
          .join(' ')}
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
        onMouseOver={() => {
          if (helper !== undefined) this.setState({ isTooltipVisible: true })
        }}
        onMouseOut={() => this.setState({ isTooltipVisible: false })}
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
            iconColor={
              isDisabled || isBlocked
                ? 'var(--figma-color-icon-disabled)'
                : undefined
            }
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
        {this.state.isTooltipVisible && <Tooltip>{helper}</Tooltip>}
      </button>
    )
  }

  Compact = () => {
    const { icon, label, isDisabled, isBlocked, isNew, action } = this.props

    return (
      <button
        role="compact-button"
        className="compact-button recharged"
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
        ref={this.buttonRef}
      >
        <Icon
          type="PICTO"
          iconName={icon}
          iconColor="var(--figma-color-icon-oncomponent)"
        />
        <div className={`type ${texts.type}`}>{label}</div>
        {(isBlocked || isNew) && <Chip>{isNew ? 'New' : 'Pro'}</Chip>}
      </button>
    )
  }

  // Render
  render() {
    const { type, isLink } = this.props

    if (type === 'compact') return this.Compact()
    if (type !== 'icon') return isLink ? this.LinkButton() : this.Button()
    return this.Icon()
  }
}
