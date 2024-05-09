import React from 'react'
import type { IconList } from '../../../types/icon.types'
import { Chip } from '../../../components/tags/chip/Chip'
import { Icon } from '../../../components/icon/Icon'
import texts from '../../../styles/texts.module.scss'
import './button.scss'

export interface ButtonProps {
  type: 'primary' | 'secondary' | 'tertiary' | 'icon' | 'compact'
  icon?: IconList
  label?: string
  state?: 'default' | 'disabled' | 'blocked' | 'selected' | ''
  url?: string
  feature?: string
  hasMultipleActions?: boolean
  isLink?: boolean
  isLoading?: boolean
  isBlocked?: boolean
  isDisabled?: boolean
  isNew?: boolean
  action: React.MouseEventHandler & React.KeyboardEventHandler
}

export class Button extends React.Component<ButtonProps> {
  buttonRef: React.RefObject<HTMLButtonElement>

  static defaultProps: Partial<ButtonProps> = {
    isLink: false,
    hasMultipleActions: false,
    isLoading: false,
    isBlocked: false,
    isDisabled: false,
    isNew: false,
    action: () => null,
  }

  constructor(props: ButtonProps) {
    super(props), (this.buttonRef = React.createRef())
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
          `button--${type}`,
          isLoading ? 'button--loading' : null,
          isBlocked ? 'button--blocked' : null,
        ]
          .filter((n) => n)
          .join(' ')}
        data-feature={feature}
        disabled={isDisabled || isBlocked}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') action?.(e)
          if (e.key === 'Escape') (e.target as HTMLElement).blur()
        }}
        onMouseDown={action}
        ref={this.buttonRef}
      >
        <span className={['button__label'].filter((n) => n).join(' ')}>
          {label}
        </span>
        {isLoading ? (
          <div className={['button__loader'].filter((n) => n).join(' ')}>
            <Icon
              type="PICTO"
              iconName="spinner"
              iconColor={
                type === 'primary'
                  ? 'var(--figma-color-icon-onbrand)'
                  : 'var(--figma-color-icon)'
              }
            />
          </div>
        ) : null}
        {hasMultipleActions ? (
          <Icon
            type="PICTO"
            iconName="caret"
            iconColor={
              type === 'primary'
                ? 'var(--figma-color-icon-onbrand)'
                : 'var(--figma-color-icon)'
            }
          />
        ) : null}
        {isBlocked || isNew ? <Chip>{isNew ? 'New' : 'Pro'}</Chip> : null}
      </button>
    )
  }

  LinkButton = () => {
    const { type, feature, label, url } = this.props

    return (
      <button
        role="link-button"
        className={['button', `button--${type}`].filter((n) => n).join(' ')}
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
    const { feature, state, isLoading, isDisabled, action, icon } = this.props

    return (
      <button
        role="icon-button"
        data-feature={feature}
        className={[
          'icon-button',
          state !== undefined && state !== '' ? `icon-button--${state}` : null,
          isLoading ? 'button--loading' : null,
        ]
          .filter((n) => n)
          .join(' ')}
        disabled={isDisabled}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') action?.(e)
          if (e.key === 'Escape') (e.target as HTMLElement).blur()
        }}
        onMouseDown={action}
        ref={this.buttonRef}
      >
        <Icon
          type="PICTO"
          iconName={isLoading ? 'spinner' : icon}
          iconColor={
            isDisabled ? 'var(--figma-color-icon-disabled)' : undefined
          }
        />
      </button>
    )
  }

  Compact = () => {
    const { icon, label, action } = this.props

    return (
      <button
        role="compact-button"
        className="compact-button"
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') action?.(e)
          if (e.key === 'Escape') (e.target as HTMLElement).blur()
        }}
        onMouseDown={action}
        ref={this.buttonRef}
      >
        <Icon
          type="PICTO"
          iconName={icon}
          iconColor="var(--figma-color-icon-oncomponent)"
        />
        <div className={`type ${texts.type}`}>{label}</div>
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
