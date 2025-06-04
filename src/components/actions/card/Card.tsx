import { useState } from 'react'
import texts from '@styles/texts/texts.module.scss'
import Thumbnail from '@components/assets/thumbnail/Thumbnail'
import './card.scss'
import { doClassnames } from '@a_ng_d/figmug-utils'

interface CardProps {
  src: string
  label: string
  children: React.ReactNode
  shouldFill?: boolean
}

const Card = (props: CardProps) => {
  const [isActionsVisible, setActionsVisible] = useState<boolean>(false)
  const { src, label, children, shouldFill = false } = props

  return (
    <div
      className={doClassnames(['card', shouldFill && 'card--fill'])}
      role="article"
      aria-label={label}
      onMouseEnter={() => setActionsVisible(true)}
      onMouseLeave={() => setActionsVisible(false)}
      onFocus={() => setActionsVisible(true)}
      onBlur={() => setActionsVisible(false)}
      tabIndex={0}
    >
      <div
        className={'card__asset'}
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
      <span
        className={texts.type}
        role="heading"
        aria-level={2}
      >
        {label}
      </span>
    </div>
  )
}

export default Card
