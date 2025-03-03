import texts from '@styles/texts.module.scss'
import './avatar.scss'

export interface AvatarProps {
  avatar?: string
  fullName?: string
  complementarySlot?: React.ReactNode
  isAccented?: boolean
  isInverted?: boolean
}

const Avatar = (props: AvatarProps) => {
  const {
    avatar = 'https://www.gravatar.com/avatar',
    fullName = 'John Doe',
    complementarySlot,
    isAccented = false,
    isInverted = false,
  } = props

  return (
    <div
      className={['user', isInverted && 'user--inverted']
        .filter((n) => n)
        .join(' ')}
    >
      <div className="user__avatar">
        <img
          src={avatar}
          alt={fullName}
        />
      </div>
      <span
        className={['user_name', texts.type, !isAccented && 'user--accented']
          .filter((n) => n)
          .join(' ')}
      >
        {fullName}
      </span>
      {complementarySlot && (
        <div className="user__complementary-slot">
          {props.complementarySlot}
        </div>
      )}
    </div>
  )
}

export default Avatar
