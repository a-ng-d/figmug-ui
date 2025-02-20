import texts from '@styles/texts.module.scss'
import './chip.scss'

export interface ChipProps {
  state?: 'ACTIVE' | 'INACTIVE' | 'ON_BACKGROUND'
  leftSlot?: React.ReactElement
  children: React.ReactNode
  rightSlot?: React.ReactElement
}

const Chip = (props: ChipProps) => {
  const { children, state = 'ACTIVE' } = props

  return (
    <div
      className={[
        'chip',
        'recharged',
        state === 'INACTIVE' && 'chip--inactive',
        state === 'ON_BACKGROUND' && 'chip--on-background',
      ]
        .filter((n) => n)
        .join(' ')}
      role="chip"
    >
      {props.leftSlot && (
        <div className="chip__left-slot">{props.leftSlot}</div>
      )}
      <div className={['chip__text', texts.type].filter((n) => n).join(' ')}>
        {children}
      </div>
      {props.rightSlot && (
        <div className="chip__right-slot">{props.rightSlot}</div>
      )}
    </div>
  )
}

export default Chip
