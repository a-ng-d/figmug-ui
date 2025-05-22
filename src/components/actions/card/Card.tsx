import { useState } from 'react'
import Thumbnail from '@components/assets/thumbnail/Thumbnail'
import texts from '@styles/texts/texts.module.scss'
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
      onMouseEnter={() => setActionsVisible(true)}
      onMouseLeave={() => setActionsVisible(false)}
    >
      <div className={'card__asset'}>
        <Thumbnail src={src} />
        {children !== undefined && (
          <div className={'card__actions'}>{isActionsVisible && children}</div>
        )}
      </div>
      <span className={texts.type}>{label}</span>
    </div>
  )
}

export default Card
