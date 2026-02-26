import texts from '@styles/texts/texts.module.scss'
import Chip from '@components/tags/chip/Chip'
import Select from '@components/inputs/select/Select'
import Icon from '@components/assets/icon/Icon'
import Button from '@components/actions/button/Button'
import { doClassnames } from '@unoff/utils'
import './popin.scss'

export interface PopInProps {
  /**
   * HTML id attribute
   */
  id?: string
  /**
   * Type of popin layout
   * @default 'POPIN'
   */
  type?: 'POPIN' | 'PANEL'
  /**
   * Title text
   */
  title: string
  /**
   * Optional tag to display next to the title
   */
  tag?: string
  /**
   * Configuration for action buttons
   */
  actions?: {
    /** Primary action button */
    primary?: {
      label: string
      state?: 'DEFAULT' | 'DISABLED' | 'LOADING'
      isAutofocus?: boolean
      feature?: string
      action: React.MouseEventHandler & React.KeyboardEventHandler
    }
    /** Destructive action button */
    destructive?: {
      label: string
      state?: 'DEFAULT' | 'DISABLED' | 'LOADING'
      feature?: string
      isAutofocus?: boolean
      action: React.ReactEventHandler | (() => void)
    }
    /** Secondary action button */
    secondary?: {
      label: string
      state?: 'DEFAULT' | 'DISABLED' | 'LOADING'
      feature?: string
      isAutofocus?: boolean
      action: React.MouseEventHandler & React.KeyboardEventHandler
    }
  }
  /**
   * Select/checkbox configuration
   */
  select?: {
    /** Label text */
    label: string
    /** Current state */
    state: boolean
    /** Change handler */
    action: React.ChangeEventHandler<HTMLInputElement> | undefined
  }
  /**
   * Optional indicator text
   */
  indicator?: string
  /**
   * Whether the popin is in loading state
   * @default false
   */
  isLoading?: boolean
  /**
   * Whether to use message layout
   * @default false
   */
  isMessage?: boolean
  /**
   * Popin content
   */
  children?: React.ReactNode
  /**
   * Close handler
   */
  onClose: React.MouseEventHandler & React.KeyboardEventHandler
}

const PopIn = (props: PopInProps) => {
  const {
    id,
    type = 'POPIN',
    title,
    actions,
    select,
    indicator,
    tag,
    isLoading = false,
    isMessage = false,
    children,
    onClose,
  } = props

  return (
    <div
      id={id}
      className={doClassnames(['popin', type === 'PANEL' && 'popin--panel'])}
      role={type === 'PANEL' ? 'complementary' : 'dialog'}
      aria-modal="true"
      aria-labelledby={id ? `${id}-title` : undefined}
      aria-label={!id ? title : undefined}
    >
      <div
        className="popin__header"
        role="presentation"
      >
        <div
          className="popin__title"
          role="presentation"
        >
          <span
            id={`${id}-title`}
            className={doClassnames([
              texts.type,
              texts['type--large'],
              texts['type--bold'],
              texts['type--truncated'],
            ])}
          >
            {title}
          </span>
          {tag != undefined && <Chip>{tag}</Chip>}
        </div>
        <Button
          type="icon"
          icon="close"
          action={onClose}
        />
      </div>
      <div
        className={doClassnames([
          'popin__content',
          isLoading && 'popin__content--loading',
          isMessage && 'popin__content--message',
        ])}
        role="region"
        aria-busy={isLoading}
      >
        {isLoading ? (
          <Icon
            type="PICTO"
            iconName="spinner"
            role="status"
          />
        ) : (
          children
        )}
      </div>
      {(actions !== undefined || indicator !== undefined) && (
        <div
          className="popin__footer"
          role="toolbar"
        >
          <div
            className="popin__extra"
            role="group"
          >
            {indicator !== undefined && (
              <div
                className={texts.label}
                role="status"
              >
                {indicator}
              </div>
            )}
            {select !== undefined && (
              <Select
                id="tertiary-action"
                type="CHECK_BOX"
                name="abstract-action-name"
                label={select.label}
                isChecked={select.state}
                action={select.action}
              />
            )}
          </div>
          <div
            className="popin__actions"
            role="group"
          >
            {actions?.secondary !== undefined && (
              <Button
                type="secondary"
                label={actions.secondary.label}
                isLoading={actions.secondary.state === 'LOADING'}
                isDisabled={actions.secondary.state === 'DISABLED'}
                feature={
                  actions.secondary.feature === undefined
                    ? 'SECONDARY_ACTION'
                    : actions.secondary.feature
                }
                isAutofocus={
                  actions.secondary.isAutofocus === undefined
                    ? false
                    : actions.secondary.isAutofocus
                }
                action={actions.secondary.action}
              />
            )}
            {actions?.destructive !== undefined && (
              <Button
                type="destructive"
                label={actions.destructive.label}
                isLoading={actions.destructive.state === 'LOADING'}
                isDisabled={actions.destructive.state === 'DISABLED'}
                feature={
                  actions.destructive.feature === undefined
                    ? 'DESTRUCTIVE_ACTION'
                    : actions.destructive.feature
                }
                isAutofocus={
                  actions.destructive.isAutofocus === undefined
                    ? false
                    : actions.destructive.isAutofocus
                }
                action={actions.destructive.action}
              />
            )}
            {actions?.primary !== undefined && (
              <Button
                type="primary"
                label={actions.primary.label}
                isLoading={actions.primary.state === 'LOADING'}
                isDisabled={actions.primary.state === 'DISABLED'}
                feature={
                  actions.primary.feature === undefined
                    ? 'PRIMARY_ACTION'
                    : actions.primary.feature
                }
                isAutofocus={
                  actions.primary.isAutofocus === undefined
                    ? false
                    : actions.primary.isAutofocus
                }
                action={actions.primary.action}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default PopIn
