import { useState } from 'react'
import texts from '@styles/texts/texts.module.scss'
import Thumbnail from '@components/assets/thumbnail/Thumbnail'
import './card.scss'
import { doClassnames } from '@a_ng_d/figmug-utils'

interface CardProps {
  src: string
  title?: string
  label: string
  children: React.ReactNode
  shouldFill?: boolean
  action: (
    event: React.MouseEvent<Element> | React.KeyboardEvent<Element>
  ) => void
}

const Card = (props: CardProps) => {
  const [isActionsVisible, setActionsVisible] = useState<boolean>(false)
  const { src, title, label, children, shouldFill = false, action } = props

  return (
    <div
      className={doClassnames(['card', shouldFill && 'card--fill'])}
      role="article"
      aria-label={label}
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
        {children !== undefined && (
          <div
            className={'card__actions'}
            role="group"
            aria-hidden={!isActionsVisible}
          >
            {isActionsVisible && children}
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
              texts['text--xlarge'],
              texts['text--bold'],
            ])}
            role="heading"
            aria-level={3}
          >
            {title}
          </span>
        )}
        <span
          className={texts.type}
          role="textbox"
          aria-label={label}
        >
          {label}
        </span>
      </div>
    </div>
  )
}

export default Card
