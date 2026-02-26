import texts from '@styles/texts/texts.module.scss'
import { doClassnames } from '@unoff/utils'
import './text.scss'

export type TextProps = {
  /**
   * Text content
   */
  children: React.ReactNode
  /**
   * Text size
   */
  size?: 'default' | 'small' | 'large' | 'xlarge'
  /**
   * Text weight
   */
  weight?: 'default' | 'medium' | 'bold'
  /**
   * Text color
   */
  color?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'inverse'
    | 'success'
    | 'warning'
    | 'alert'
  /**
   * Truncate text if too long (adds ...)
   */
  truncate?: boolean
  /**
   * Optional ID for the text
   */
  id?: string
  /**
   * Additional CSS class
   */
  className?: string
}

const Text = (props: TextProps) => {
  const {
    children,
    size = 'default',
    weight = 'default',
    color = 'primary',
    truncate = false,
    id,
    className,
  } = props

  const classNames = [
    'text',
    texts.type,
    size !== 'default' && texts[`type--${size}`],
    weight !== 'default' && texts[`type--${weight}`],
    color !== 'primary' && texts[`type--${color}`],
    truncate && texts['type--truncated'],
    className,
  ]

  return (
    <div
      className={doClassnames(classNames)}
      id={id}
    >
      {children}
    </div>
  )
}

export default Text
