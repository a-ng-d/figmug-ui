import { doClassnames } from '@unoff/utils'
import Button from '@components/actions/button/Button'
import SemanticMessage from '../semantic-message/SemanticMessage'
import './notification.scss'

export interface NotificationProps {
  /**
   * Type of notification determining its visual style
   */
  type: 'NEUTRAL' | 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR'
  /**
   * Message content to display
   */
  message: string
  /**
   * Auto-close timer in milliseconds (0 or undefined for no auto-close)
   */
  timer?: number
  /**
   * Close handler
   */
  onClose: React.ReactEventHandler
}

const Notification = (props: NotificationProps) => {
  const { type, message, timer, onClose } = props

  if (timer !== undefined && timer > 0)
    setTimeout(() => {
      onClose({} as React.SyntheticEvent)
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
