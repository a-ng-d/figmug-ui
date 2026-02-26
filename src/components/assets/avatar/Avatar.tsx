import texts from '@styles/texts/texts.module.scss'
import { doClassnames } from '@unoff/utils'
import './avatar.scss'

export interface AvatarProps {
  /**
   * URL of the avatar image
   * @default 'https://www.gravatar.com/avatar'
   */
  avatar?: string
  /**
   * Full name of the user
   * @default 'John Doe'
   */
  fullName?: string
  /**
   * Additional content to display alongside the avatar
   */
  complementarySlot?: React.ReactNode
  /**
   * Whether to use accented text style
   * @default false
   */
  isAccented?: boolean
  /**
   * Whether to use inverted color scheme
   * @default false
   */
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
      <div className="user__avatar">
        <img
          src={avatar}
          alt={fullName}
          role="img"
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
