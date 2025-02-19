import texts from '../../../styles/texts.module.scss'
import './avatar.scss'

export interface Props {
  avatar?: string
  fullName?: string
  isInverted?: boolean
}

export const Avatar = (props: Props) => {
  const {
    avatar = 'https://www.gravatar.com/avatar',
    fullName = 'John Doe',
    isInverted = false,
  } = props

  return (
    <div
      className={['user', isInverted && 'user--inverted']
        .filter((n) => n)
        .join(' ')}
    >
      <div className="user__avatar">
        <img src={avatar} />
      </div>
      <div className={`${texts.type} ${texts['type--secondary']} type`}>
        {fullName}
      </div>
    </div>
  )
}

export default Avatar
