import texts from '../../../styles/texts.module.scss'
import './keyboard-shortcut-item.scss'

export type KeyboardShortcutItemProps = {
  label: string
  shortcuts: Array<Array<string>>
  separator?: string
}

export const KeyboardShortcutItem = (props: KeyboardShortcutItemProps) => {
  const { label, shortcuts = [], separator = '' } = props

  return (
    <li className="keyboard-shortcut-item recharged">
      <div className="keyboard-shortcut-item__label">
        <span className={`type ${texts.type}`}>{label}</span>
      </div>
      <div className="keyboard-shortcut-item__keys">
        <>
          {shortcuts[0].map((shortcut, index) => (
            <span
              className={`type keyboard-shortcut-item__key ${texts.type}`}
              key={index}
            >
              {shortcut}
            </span>
          ))}
          {shortcuts[1] !== undefined ? (
            <>
              <span
                className={`type keyboard-shortcut-item__separator ${texts.type}`}
              >
                {separator}
              </span>
              {shortcuts[1].map((shortcut, index) => (
                <span
                  className={`type keyboard-shortcut-item__key ${texts.type}`}
                  key={index}
                >
                  {shortcut}
                </span>
              ))}
            </>
          ) : null}
        </>
      </div>
    </li>
  )
}
