import { SyntheticEvent } from 'react'
import { doClassnames } from '@a_ng_d/figmug-utils'
import SemanticMessage from '../semantic-message/SemanticMessage'
import Button from '@components/actions/button/Button'
import './notification.scss'

export interface NotificationProps {
  type: 'NEUTRAL' | 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR'
  message: string
  onClose: React.ReactEventHandler
}

const Notification = (props: NotificationProps) => {
  const { type, message, onClose } = props

  const closeHandler = (e: SyntheticEvent) => {
    if (e.currentTarget === e.target) onClose(e)
  }

  return (
    <div
      className={doClassnames(['notification'])}
      role="dialog"
      tabIndex={-1}
      onMouseDown={closeHandler}
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
