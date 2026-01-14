import { useState } from 'react'
import texts from '@styles/texts/texts.module.scss'
import ColorChip from '@components/tags/color-chip/ColorChip'
import Button from '@components/actions/button/Button'
import { doClassnames } from '@a_ng_d/figmug-utils'
import './color-item.scss'

export type ColorItemProps = {
  /**
   * Unique identifier for the color item
   */
  id?: string
  /**
   * Name of the color
   */
  name: string
  /**
   * Hex color value
   */
  hex: string
  /**
   * Whether the item can be removed
   * @default false
   */
  canBeRemoved?: boolean
  /**
   * Remove button handler
   */
  onRemoveColor?: React.ReactEventHandler
}

const ColorItem = (props: ColorItemProps) => {
  const { name, hex, id, canBeRemoved = false, onRemoveColor } = props
  const [isRemovePermitted, setIsRemovePermitted] = useState(false)

  return (
    <li
      className="color-item"
      data-id={id}
      onMouseEnter={() => {
        if (canBeRemoved) setIsRemovePermitted(true)
      }}
      onMouseLeave={() => {
        if (canBeRemoved) setIsRemovePermitted(false)
      }}
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
            {hex.toUpperCase()}
          </div>
        </div>
      </div>
      {isRemovePermitted && (
        <div
          className="color-item__right"
          role="group"
        >
          <Button
            type="icon"
            icon="minus"
            feature="REMOVE_COLOR"
            action={onRemoveColor}
          />
        </div>
      )}
    </li>
  )
}

export default ColorItem
