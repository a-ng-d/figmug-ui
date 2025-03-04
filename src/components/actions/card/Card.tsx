import { useState } from 'react'
import Thumbnail from '@components/assets/thumbnail/Thumbnail'
import texts from '@styles/texts.module.scss'
import './card.scss'

interface CardProps {
  src: string
  label: string
  children: React.ReactNode
}

const Card = (props: CardProps) => {
  const [isActionsVisible, setActionsVisible] = useState<boolean>(false)
  const { src, label, children } = props

  return (
    <div
      className={'card'}
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
