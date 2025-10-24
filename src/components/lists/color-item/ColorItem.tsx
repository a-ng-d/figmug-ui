import texts from '@styles/texts/texts.module.scss'
import ColorChip from '@components/tags/color-chip/ColorChip'
import Button from '@components/actions/button/Button'
import { doClassnames } from '@a_ng_d/figmug-utils'
import './color-item.scss'

export type ColorItemProps = {
  id?: string
  name: string
  hex: string
  canBeRemoved?: boolean
  onRemoveColor?: React.ReactEventHandler
}

const ColorItem = (props: ColorItemProps) => {
  const { name, hex, id, canBeRemoved = false, onRemoveColor } = props

  return (
    <li
      className="color-item"
      data-id={id}
      role="listitem"
    >
      <div
        className="color-item__left"
        role="group"
      >
        <div
          className="color-item__info"
          role="presentation"
        >
          <ColorChip
            color={hex}
            isRounded
          />
          <div className={doClassnames([texts.type, texts['type--truncated']])}>
            {name}
          </div>
          <div className={doClassnames([texts.type, texts['type--secondary']])}>
            {hex}
          </div>
        </div>
      </div>
      <div
        className="color-item__right"
        role="group"
      >
        {canBeRemoved && (
          <Button
            type="icon"
            icon="minus"
            feature="REMOVE_COLOR"
            action={onRemoveColor}
          />
        )}
      </div>
    </li>
  )
}

export default ColorItem
