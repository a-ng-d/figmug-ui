import texts from '../../../styles/texts.module.scss'
import { Button } from '../../actions/button/Button'
import { Select } from '../../inputs/select/Select'
import { Chip } from '../../tags/chip/Chip'
import './popin.scss'

export interface PopInProps {
  title: string
  tag?: string
  actions: {
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
  children?: React.ReactNode
  onClose: React.MouseEventHandler & React.KeyboardEventHandler
}

export const PopIn = (props: PopInProps) => {
  const { title, actions, select, indicator, tag, children, onClose } = props

  return (
    <div className="popin recharged">
      <div className="popin__header">
        <div className="popin__title">
          <p className={`${texts.type} type type--large type--bold`}>{title}</p>
          {tag != undefined && <Chip>{tag}</Chip>}
        </div>
        <Button
          type="icon"
          icon="close"
          feature="CLOSE_HIGHLIGHT"
          action={onClose}
        />
      </div>
      <div className="popin__content">{children}</div>
      {(Object.keys(actions).length > 0 || indicator !== undefined) && (
        <div className="popin__footer">
          <div className="popin__extra">
            {indicator !== undefined && (
              <div className={`${texts.label} label`}>{indicator}</div>
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
          <div className="popin__actions">
            {actions.secondary !== undefined && (
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
            {actions.destructive !== undefined && (
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
            {actions.primary !== undefined && (
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
