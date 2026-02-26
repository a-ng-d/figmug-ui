import { useState } from 'react'
import texts from '@styles/texts/texts.module.scss'
import Chip from '@components/tags/chip/Chip'
import Thumbnail from '@components/assets/thumbnail/Thumbnail'
import './card.scss'
import { doClassnames } from '@unoff/utils'

interface CardProps {
  /**
   * Image source URL for the card thumbnail
   */
  src?: string
  /**
   * Tag label of the card
   */
  tag?: string
  /**
   * Main title of the card
   */
  title?: string
  /**
   * Subtitle text of the card
   */
  subtitle?: string
  /**
   * Rich text content to display in the card
   */
  richText?: React.ReactNode
  /**
   * Action buttons to display on hover
   */
  actions?: React.ReactNode
  /**
   * Whether the card should fill available space
   * @default false
   */
  shouldFill?: boolean
  /**
   * Click handler for the card
   */
  action: (
    event: React.MouseEvent<Element> | React.KeyboardEvent<Element>
  ) => void
}

const Card = (props: CardProps) => {
  const [isActionsVisible, setActionsVisible] = useState<boolean>(false)
  const {
    src,
    tag,
    title,
    subtitle,
    richText,
    actions,
    shouldFill = false,
    action,
  } = props

  return (
    <div
      className={doClassnames(['card', shouldFill && 'card--fill'])}
      role="article"
      onMouseEnter={() => setActionsVisible(true)}
      onMouseLeave={() => setActionsVisible(false)}
      onFocus={() => setActionsVisible(true)}
      onBlur={() => setActionsVisible(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') action(e)
        if (e.key === 'Escape') (e.target as HTMLElement).blur()
      }}
      onMouseDown={action}
      tabIndex={0}
    >
      {tag !== undefined && (
        <div
          className="card__tags"
          role="group"
        >
          <Chip isSolo>{tag}</Chip>
        </div>
      )}
      {src && (
        <div
          className="card__asset"
          role="group"
        >
          <Thumbnail src={src} />
          {actions && (
            <div
              className={'card__actions'}
              role="group"
              aria-hidden={!isActionsVisible}
            >
              {isActionsVisible && actions}
            </div>
          )}
        </div>
      )}
      <div
        className="card__text"
        role="contentinfo"
      >
        {title && (
          <span
            className={doClassnames([
              texts.type,
              texts['type--xlarge'],
              texts['type--bold'],
            ])}
            role="heading"
            aria-level={3}
          >
            {title}
          </span>
        )}
        {subtitle && (
          <span
            className={doClassnames([texts.type, texts['type--large']])}
            role="note"
          >
            {subtitle}
          </span>
        )}

        {richText && <>{richText}</>}
      </div>
    </div>
  )
}

export default Card
