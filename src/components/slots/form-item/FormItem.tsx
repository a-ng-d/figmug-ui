import texts from '@styles/texts/texts.module.scss'
import Chip from '@components/tags/chip/Chip'
import Message from '@components/dialogs/message/Message'
import { doClassnames } from '@a_ng_d/figmug-utils'
import './form-item.scss'

export interface FormItemProps {
  id?: string
  label?: string
  helper?: {
    type: 'INFO' | 'ERROR'
    message: string
  }
  shouldFill?: boolean
  isMultiLine?: boolean
  isBlocked?: boolean
  isNew?: boolean
  children: React.ReactNode
}

const FormItem = (props: FormItemProps) => {
  const {
    id,
    label,
    helper,
    shouldFill = true,
    isMultiLine = false,
    isBlocked = false,
    isNew = false,
    children,
  } = props

  return (
    <div
      className={doClassnames([
        'form-item',
        shouldFill && 'form-item--fill',
        isMultiLine && 'form-item--multiline',
        isBlocked && 'form-item--blocked',
      ])}
      role="group"
      aria-describedby={helper ? `${id}-helper` : undefined}
    >
      <div
        className="form-item__row"
        role="presentation"
      >
        {label !== undefined && (
          <label
            className={doClassnames([texts.type, 'form-item__label'])}
            htmlFor={id}
            id={`${id}-label`}
          >
            {label}
          </label>
        )}
        <div
          className="form-item__input"
          role="presentation"
        >
          {children}
        </div>
        {isNew && <Chip>New</Chip>}
      </div>
      {helper !== undefined && (
        <div
          className="form-item__helper"
          id={`${id}-helper`}
          role="alert"
          aria-live="polite"
        >
          <Message
            icon={helper.type === 'INFO' ? 'info' : 'warning'}
            messages={[helper.message]}
          />
        </div>
      )}
    </div>
  )
}

export default FormItem
