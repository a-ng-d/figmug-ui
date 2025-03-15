import { doClassnames } from '@a_ng_d/figmug-utils'
import texts from '@styles/texts.module.scss'
import './chip.scss'

export interface ChipProps {
  state?: 'ACTIVE' | 'INACTIVE' | 'ON_BACKGROUND'
  leftSlot?: React.ReactElement
  rightSlot?: React.ReactElement
  children: React.ReactNode
  isSolo?: boolean
}

const Chip = (props: ChipProps) => {
  const { children, state = 'ACTIVE', isSolo = false } = props

  return (
    <div
      className={doClassnames([
        'chip',
        state === 'INACTIVE' && 'chip--inactive',
        state === 'ON_BACKGROUND' && 'chip--on-background',
        isSolo && 'chip--solo',
      ])}
      role="chip"
    >
      {props.leftSlot && (
        <div className="chip__left-slot">{props.leftSlot}</div>
      )}
      <div
        className={doClassnames([
          'chip__text',
          texts.type,
          texts['type--truncated'],
        ])}
      >
        {children}
      </div>
      {props.rightSlot && (
        <div className="chip__right-slot">{props.rightSlot}</div>
      )}
    </div>
  )
}

export default Chip
