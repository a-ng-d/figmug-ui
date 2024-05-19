import texts from '../../../styles/texts.module.scss'
import './inputs-bar.scss'

export interface InputsBarProps {
  label: string
  customClassName?: string
  children: React.ReactNode
}

export const InputsBar = (props: InputsBarProps) => {
  const { label, customClassName, children } = props

  return (
    <div
      className={['inputs', 'recharged', customClassName]
        .filter((n) => n)
        .join(' ')}
    >
      <div className={`label ${texts.label}`}>{label}</div>
      <div className="inputs__bar">{children}</div>
    </div>
  )
}