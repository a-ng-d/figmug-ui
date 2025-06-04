import texts from '@styles/texts/texts.module.scss'
import { doClassnames } from '@a_ng_d/figmug-utils'
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
      className={doClassnames(['user', isInverted && 'user--inverted'])}
      role="group"
    >
      <div
        className="user__avatar"
        role="img"
      >
        <img
          src={avatar}
          alt={fullName}
          role="presentation"
        />
      </div>
      <span
        className={doClassnames([
          'user__name',
          texts.type,
          !isAccented && texts['type--secondary'],
        ])}
        role="text"
      >
        {fullName}
      </span>
      {complementarySlot && (
        <div
          className="user__complementary-slot"
          role="complementary"
        >
          {props.complementarySlot}
        </div>
      )}
    </div>
  )
}

export default Avatar
