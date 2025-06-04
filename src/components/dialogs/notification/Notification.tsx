import Button from '@components/actions/button/Button'
import { doClassnames } from '@a_ng_d/figmug-utils'
import SemanticMessage from '../semantic-message/SemanticMessage'
import './notification.scss'

export interface NotificationProps {
  type: 'NEUTRAL' | 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR'
  message: string
  timer?: number
  onClose: React.ReactEventHandler
}

const Notification = (props: NotificationProps) => {
  const { type, message, timer, onClose } = props

  if (timer !== undefined && timer <= 0)
    setTimeout(() => {
      onClose
    }, timer)

  return (
    <div
      className={doClassnames(['notification'])}
      role="alert"
      aria-live="polite"
      tabIndex={-1}
    >
      <SemanticMessage
        type={type}
        message={message}
        actionsSlot={
          <Button
            type="icon"
            icon="close"
            action={onClose}
          />
        }
      />
    </div>
  )
}

export default Notification
