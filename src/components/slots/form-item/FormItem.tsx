import texts from '@styles/texts.module.scss'
import Message from '@components/dialogs/message/Message'
import Chip from '@components/tags/chip/Chip'
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
    isBlocked = false,
    isNew = false,
    children,
  } = props

  return (
    <div
      className={doClassnames([
        'form-item',
        shouldFill && 'form-item--fill',
        isBlocked && 'form-item--blocked',
      ])}
    >
      <div className="form-item__row">
        {label !== undefined && (
          <label
            className={texts.type}
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <div className="form-item__input">{children}</div>
        {isNew && <Chip>New</Chip>}
      </div>
      {helper !== undefined && (
        <div className="form-item__helper">
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
