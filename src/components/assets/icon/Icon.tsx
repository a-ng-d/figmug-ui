import icons from '../../../styles/icons.module.scss'
import type { IconList } from '../../../types/icon.types'
import './icon.scss'

export interface IconProps {
  type: 'PICTO' | 'LETTER'
  iconName?: IconList
  iconLetter?: string
  iconColor?: string
  customClassName?: string
}

export const Icon = (props: IconProps) => {
  const {
    type = 'PICTO',
    iconName,
    iconLetter,
    iconColor = 'var(--figma-color-icon)',
    customClassName,
  } = props

  const Letter = () => {
    return (
      <div className="icon-box">
        <span
          style={{
            color: iconColor,
          }}
          className={['type', customClassName].filter((n) => n).join(' ')}
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
        className={[
          'icon-box',
          icons.icon,
          icons[`icon--${iconName}`],
          customClassName,
        ]
          .filter((n) => n)
          .join(' ')}
      />
    )
  }

  if (type === 'PICTO') return <Pictogram />
  else return <Letter />
}
