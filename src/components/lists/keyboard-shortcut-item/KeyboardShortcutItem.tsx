import texts from '@styles/texts/texts.module.scss'
import { doClassnames } from '@a_ng_d/figmug-utils'
import './keyboard-shortcut-item.scss'

export type KeyboardShortcutItemProps = {
  label: string
  shortcuts: Array<Array<string>>
  separator?: string
}

const KeyboardShortcutItem = (props: KeyboardShortcutItemProps) => {
  const { label, shortcuts = [], separator = '' } = props

  return (
    <li
      className="keyboard-shortcut-item"
      role="listitem"
    >
      <div
        className="keyboard-shortcut-item__label"
        role="presentation"
      >
        <span
          className={texts.type}
          aria-label={label}
        >
          {label}
        </span>
      </div>
      <div
        className="keyboard-shortcut-item__keys"
        role="group"
      >
        <>
          {shortcuts[0].map((shortcut, index) => (
            <span
              className={doClassnames([
                'keyboard-shortcut-item__key',
                texts.type,
              ])}
              key={index}
              role="presentation"
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
                role="presentation"
                aria-hidden="true"
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
                  role="presentation"
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
