import { Chip } from '../../tags/chip/Chip'
import { Message } from '../../dialogs/message/Message'
import texts from '../../../styles/texts.module.scss'
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

export const FormItem = (props: FormItemProps) => {
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
          shouldFill ? 'form-item--fill' : null,
          isBlocked ? 'form-item--blocked' : null,
        ]
          .filter((n) => n)
          .join(' ')}
      >
        {label !== undefined ? (
          <label
            className={`type ${texts.type}`}
            htmlFor={id}
          >
            {label}
          </label>
        ) : null}
        {children}
        {isNew ? <Chip>New</Chip> : null}
      </div>
      {helper !== undefined ? (
        <div className="form-item__helper">
          <Message
            icon={helper.type === 'INFO' ? 'info' : 'warning'}
            messages={[helper.message]}
          />
        </div>
      ) : null}
    </>
  )
}
