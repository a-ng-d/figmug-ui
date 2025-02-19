import texts from '@styles/texts.module.scss'
import './chip.scss'

export interface ChipProps {
  state?: 'ACTIVE' | 'INACTIVE'
  children: React.ReactNode
}

const Chip = (props: ChipProps) => {
  const { children, state = 'ACTIVE' } = props

  return (
    <div
      className={['chip', 'recharged', state === 'INACTIVE' && 'chip--inactive']
        .filter((n) => n)
        .join(' ')}
      role="chip"
    >
      <div className={['chip__text', texts.type].filter((n) => n).join(' ')}>
        {children}
      </div>
    </div>
  )
}

export default Chip
