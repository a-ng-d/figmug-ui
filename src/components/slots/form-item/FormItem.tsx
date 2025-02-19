import texts from '@styles/texts.module.scss'
import Message from '@components/dialogs/message/Message'
import Chip from '@components/tags/chip/Chip'
import './form-item.scss'

export interface FormItemProps {
  id: string
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
    <>
      <div
        className={[
          'form-item',
          'recharged',
          shouldFill && 'form-item--fill',
          isBlocked && 'form-item--blocked',
        ]
          .filter((n) => n)
          .join(' ')}
      >
        {label !== undefined && (
          <label
            className={`type ${texts.type}`}
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
    </>
  )
}

export default FormItem
