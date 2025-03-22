import { useState } from 'react'
import { doClassnames } from '@a_ng_d/figmug-utils'
import texts from '@styles/texts.module.scss'
import layouts from '@styles/layouts.module.scss'
import Tooltip from '../tooltip/Tooltip'
import './chip.scss'

export interface ChipProps {
  state?: 'ACTIVE' | 'INACTIVE' | 'ON_BACKGROUND'
  leftSlot?: React.ReactElement
  rightSlot?: React.ReactElement
  children: React.ReactNode
  isSolo?: boolean
  preview?: {
    image: string
    text: string
    pin?: 'TOP' | 'BOTTOM'
  }
}

const Chip = (props: ChipProps) => {
  const { children, state = 'ACTIVE', isSolo = false, preview } = props
  const [isPreviewVisible, setIsPreviewVisible] = useState(false)

  return (
    <div
      className={doClassnames([
        'chip',
        state === 'INACTIVE' && 'chip--inactive',
        state === 'ON_BACKGROUND' && 'chip--on-background',
        isSolo && 'chip--solo',
        preview !== undefined && 'chip--preview',
      ])}
      onMouseEnter={() => {
        if (preview !== undefined) setIsPreviewVisible(true)
      }}
      onMouseLeave={() => {
        if (preview !== undefined) setIsPreviewVisible(false)
      }}
      role="chip"
    >
      {props.leftSlot && (
        <div className="chip__left-slot">{props.leftSlot}</div>
      )}
      <div
        className={doClassnames([
          'chip__text',
          texts.type,
          texts['type--truncated'],
        ])}
      >
        {children}
      </div>
      {props.rightSlot && (
        <div className="chip__right-slot">{props.rightSlot}</div>
      )}
      {isPreviewVisible && (
        <Tooltip
          pin={preview?.pin}
          type="WITH_IMAGE"
        >
          <div className={layouts['snackbar--medium']}>
            <img
              src={preview?.image}
              alt={preview?.text}
              className="tooltip__image"
            />
            <span className="tooltip__text">{preview?.text}</span>
          </div>
        </Tooltip>
      )}
    </div>
  )
}

export default Chip
