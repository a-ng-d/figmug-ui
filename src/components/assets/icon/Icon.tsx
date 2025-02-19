import icons from '@styles/icons.module.scss'
import type { IconList } from '@tps/icon.types'
import './icon.scss'

export interface IconProps {
  type: 'PICTO' | 'LETTER'
  iconName?: IconList
  iconLetter?: string
  iconColor?: string
  customClassName?: string
  customSize?: number
}

export const Icon = (props: IconProps) => {
  const {
    type = 'PICTO',
    iconName,
    iconLetter,
    iconColor = 'var(--figma-color-icon)',
    customClassName,
    customSize = 30,
  } = props

  const Letter = () => {
    return (
      <div
        className="icon-box"
        style={{
          width: `${customSize}px`,
        }}
        role="icon"
      >
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
        role="icon"
      />
    )
  }

  if (type === 'PICTO') return <Pictogram />
  else return <Letter />
}

export default Icon
