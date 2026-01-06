import texts from '@styles/texts/texts.module.scss'
import icons from '@styles/icons/icons.module.scss'
import { doClassnames } from '@a_ng_d/figmug-utils'
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
  const { type = 'PICTO', iconName, iconLetter, customClassName, role } = props

  const Letter = () => {
    return (
      <div
        className="icon-box icon-box--letter"
        role={role || 'icon'}
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
        role={role || 'icon'}
      />
    )
  }

  if (type === 'PICTO') return <Pictogram />
  else return <Letter />
}

export default Icon
