import texts from '@styles/texts.module.scss'
import './inputs-bar.scss'

export interface InputsBarProps {
  label?: string
  customClassName?: string
  children: React.ReactNode
}

const InputsBar = (props: InputsBarProps) => {
  const { label, customClassName, children } = props

  return (
    <div className={['inputs', customClassName].filter((n) => n).join(' ')}>
      {label !== undefined && <div className={texts.label}>{label}</div>}
      <div className="inputs__bar">{children}</div>
    </div>
  )
}

export default InputsBar
