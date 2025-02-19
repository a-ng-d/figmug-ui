import texts from '@styles/texts.module.scss'
import type { HexModel } from '@tps/color.types'
import Button from '@components/actions/button/Button'
import './color-item.scss'

export type ColorItemProps = {
  name: string
  hex: HexModel
  id: string
  canBeRemoved?: boolean
  onRemoveColor?: React.ReactEventHandler
}

const ColorItem = (props: ColorItemProps) => {
  const { name, hex, id, canBeRemoved = false, onRemoveColor } = props

  return (
    <li
      className="color-item recharged"
      data-id={id}
    >
      <div className="color-item__left-part">
        <div className="color-item__info">
          <div className="color-item__color">
            <div
              className="color-item__chip color-item__chip--circle"
              style={{
                backgroundColor: hex,
              }}
            />
          </div>
          <div className={`type ${texts.type} ${texts['type--truncated']}`}>
            {name}
          </div>
          <div className={`type ${texts.type} ${texts['type--secondary']}`}>
            {hex}
          </div>
        </div>
      </div>
      <div className="color-item__right-part">
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
