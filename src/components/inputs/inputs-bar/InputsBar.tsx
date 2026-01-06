import texts from '@styles/texts/texts.module.scss'
import { doClassnames } from '@a_ng_d/figmug-utils'
import './inputs-bar.scss'

export interface InputsBarProps {
  /**
   * Optional label for the input bar
   */
  label?: string
  /**
   * Custom CSS class
   */
  customClassName?: string
  /**
   * Input components to display in the bar
   */
  children: React.ReactNode
}

const InputsBar = (props: InputsBarProps) => {
  const { label, customClassName, children } = props

  return (
    <div className={doClassnames(['inputs', customClassName])}>
      {label !== undefined && <div className={texts.label}>{label}</div>}
      <div className="inputs__bar">{children}</div>
    </div>
  )
}

export default InputsBar
