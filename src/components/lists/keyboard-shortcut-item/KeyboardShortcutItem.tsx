import { doClassnames } from '@a_ng_d/figmug-utils'
import texts from '@styles/texts/texts.module.scss'
import './keyboard-shortcut-item.scss'

export type KeyboardShortcutItemProps = {
  label: string
  shortcuts: Array<Array<string>>
  separator?: string
}

const KeyboardShortcutItem = (props: KeyboardShortcutItemProps) => {
  const { label, shortcuts = [], separator = '' } = props

  return (
    <li className="keyboard-shortcut-item">
      <div className="keyboard-shortcut-item__label">
        <span className={texts.type}>{label}</span>
      </div>
      <div className="keyboard-shortcut-item__keys">
        <>
          {shortcuts[0].map((shortcut, index) => (
            <span
              className={doClassnames([
                'keyboard-shortcut-item__key',
                texts.type,
              ])}
              key={index}
            >
              {shortcut}
            </span>
          ))}
          {shortcuts[1] !== undefined && (
            <>
              <span
                className={doClassnames([
                  'keyboard-shortcut-item__separator',
                  texts.type,
                ])}
              >
                {separator}
              </span>
              {shortcuts[1].map((shortcut, index) => (
                <span
                  className={doClassnames([
                    'keyboard-shortcut-item__key',
                    texts.type,
                  ])}
                  key={index}
                >
                  {shortcut}
                </span>
              ))}
            </>
          )}
        </>
      </div>
    </li>
  )
}

export default KeyboardShortcutItem
