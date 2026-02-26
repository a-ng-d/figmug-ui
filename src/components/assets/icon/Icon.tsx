import texts from '@styles/texts/texts.module.scss'
import icons from '@styles/icons/icons.module.scss'
import { doClassnames } from '@unoff/utils'
import type { IconList } from '@tps/icon.types'
import './icon.scss'

export interface IconProps {
  /**
   * Type of icon to display
   * @default 'PICTO'
   */
  type?: 'PICTO' | 'LETTER'
  /**
   * Name of the pictogram icon (when type is PICTO)
   */
  iconName?: IconList
  /**
   * Letter to display (when type is LETTER)
   */
  iconLetter?: string
  /**
   * Custom CSS class to apply
   */
  customClassName?: string
  /**
   * ARIA role for accessibility
   */
  role?: string
}

export const Icon = (props: IconProps) => {
  const { type = 'PICTO', iconName, iconLetter, customClassName } = props

  const Letter = () => {
    return (
      <div
        className="icon-box icon-box--letter"
        role="img"
        aria-label={iconLetter}
      >
        <span className={doClassnames([texts.type, customClassName])}>
          {iconLetter}
        </span>
      </div>
    )
  }

  const Pictogram = () => {
    return (
      <div
        className={doClassnames([
          'icon-box',
          'icon-box--picto',
          icons.icon,
          icons[`icon--${iconName}`],
          customClassName,
        ])}
        role="img"
        aria-label={iconName}
      />
    )
  }

  if (type === 'PICTO') return <Pictogram />
  else return <Letter />
}

export default Icon
