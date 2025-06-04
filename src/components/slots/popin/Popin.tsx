import { doClassnames } from '@a_ng_d/figmug-utils'
import texts from '@styles/texts/texts.module.scss'
import Button from '@components/actions/button/Button'
import Select from '@components/inputs/select/Select'
import Chip from '@components/tags/chip/Chip'
import Icon from '@components/assets/icon/Icon'
import './popin.scss'

export interface PopInProps {
  id?: string
  type?: 'POPIN' | 'PANEL'
  title: string
  tag?: string
  actions?: {
    primary?: {
      label: string
      state?: 'DEFAULT' | 'DISABLED' | 'LOADING'
      feature?: string
      action: React.MouseEventHandler & React.KeyboardEventHandler
    }
    destructive?: {
      label: string
      state?: 'DEFAULT' | 'DISABLED' | 'LOADING'
      feature?: string
      action: React.ReactEventHandler | (() => void)
    }
    secondary?: {
      label: string
      state?: 'DEFAULT' | 'DISABLED' | 'LOADING'
      feature?: string
      action: React.MouseEventHandler & React.KeyboardEventHandler
    }
  }
  select?: {
    label: string
    state: boolean
    action: React.ChangeEventHandler<HTMLInputElement> | undefined
  }
  indicator?: string
  isLoading?: boolean
  isMessage?: boolean
  children?: React.ReactNode
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
