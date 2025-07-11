import { useState } from 'react'
import texts from '@styles/texts/texts.module.scss'
import Thumbnail from '@components/assets/thumbnail/Thumbnail'
import './card.scss'
import { doClassnames } from '@a_ng_d/figmug-utils'

interface CardProps {
  src: string
  title?: string
  subtitle?: string
  richText: React.ReactNode
  actions: React.ReactNode
  shouldFill?: boolean
  action: (
    event: React.MouseEvent<Element> | React.KeyboardEvent<Element>
  ) => void
}

const Card = (props: CardProps) => {
  const [isActionsVisible, setActionsVisible] = useState<boolean>(false)
  const {
    src,
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
      <div
        className="card__asset"
        role="group"
      >
        <Thumbnail src={src} />
        {actions !== undefined && (
          <div
            className={'card__actions'}
            role="group"
            aria-hidden={!isActionsVisible}
          >
            {isActionsVisible && actions}
          </div>
        )}
      </div>
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
        {richText}
      </div>
    </div>
  )
}

export default Card
