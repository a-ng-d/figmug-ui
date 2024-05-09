import type { IconList } from '../../types/icon.types'
import icons from '../../styles/icons.module.scss'
import './icon.scss'

export interface IconProps {
  type: 'PICTO' | 'LETTER'
  iconName?: IconList
  iconLetter?: string
  iconColor?: string
}

export const Icon = (props: IconProps) => {
  const {
    type = 'PICTO',
    iconName,
    iconLetter,
    iconColor = 'var(--figma-color-icon)',
  } = props

  const Letter = () => {
    return (
      <div className="icon-box">
        <span
          style={{
            color: iconColor,
          }}
          className="type"
        >
          {iconLetter}
        </span>
      </div>
    )
  }

  const Pictogram = () => {
    return (
      <div
        style={{
          backgroundColor: iconColor,
        }}
        className={['icon-box', icons.icon, icons[`icon--${iconName}`]]
          .filter((n) => n)
          .join(' ')}
      />
    )
  }

  if (type === 'PICTO') return <Pictogram />
  else return <Letter />
}
