import { Button } from '../../actions/button/Button'
import { Select } from '../../inputs/select/Select'
import texts from '../../../styles/texts.module.scss'
import './popin.scss'

export interface PopInProps {
  title: string
  actions: {
    primary?: {
      label: string
      state?: 'DEFAULT' | 'DISABLED' | 'LOADING'
      action: React.MouseEventHandler & React.KeyboardEventHandler
    }
    secondary?: {
      label: string
      state?: 'DEFAULT' | 'DISABLED' | 'LOADING'
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
  const { title, actions, select, indicator, children, onClose } = props

  return (
    <div className="popin recharged">
      <div className="popin__header">
        <p className={`${texts.type} type type--large type--bold`}>{title}</p>
        <Button
          type="icon"
          icon="close"
          feature="CLOSE_HIGHLIGHT"
          action={onClose}
        />
      </div>
      <div className="popin__content">{children}</div>
      {Object.keys(actions).length > 0 || indicator !== undefined ? (
        <div className="popin__footer">
          <div className="popin__extra">
            {indicator !== undefined ? (
              <p className={`${texts.label} label`}>{indicator}</p>
            ) : null}
            {select !== undefined ? (
              <Select
                id="tertiary-action"
                type="CHECK_BOX"
                name="abstract-action-name"
                label={select.label}
                isChecked={select.state}
                onChange={select.action}
              />
            ) : null}
          </div>
          <div className="popin__actions">
            {actions.secondary !== undefined ? (
              <Button
                type="secondary"
                label={actions.secondary.label}
                isLoading={actions.secondary.state === 'LOADING'}
                isDisabled={actions.secondary.state === 'DISABLED'}
                feature="SECONDARY_ACTION"
                action={actions.secondary.action}
              />
            ) : null}
            {actions.primary !== undefined ? (
              <Button
                type="primary"
                label={actions.primary.label}
                isLoading={actions.primary.state === 'LOADING'}
                isDisabled={actions.primary.state === 'DISABLED'}
                feature="PRIMARY_ACTION"
                action={actions.primary.action}
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
