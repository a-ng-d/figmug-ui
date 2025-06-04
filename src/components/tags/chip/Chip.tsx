import { useState } from 'react'
import texts from '@styles/texts/texts.module.scss'
import layouts from '@styles/layouts.module.scss'
import { doClassnames } from '@a_ng_d/figmug-utils'
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
      role="status"
    >
      {props.leftSlot && (
        <div
          className="chip__left-slot"
          role="presentation"
        >
          {props.leftSlot}
        </div>
      )}
      <div
        className={doClassnames([
          'chip__text',
          texts.type,
          texts['type--truncated'],
        ])}
        role="presentation"
      >
        {children}
      </div>
      {props.rightSlot && (
        <div
          className="chip__right-slot"
          role="presentation"
        >
          {props.rightSlot}
        </div>
      )}
      {isPreviewVisible && (
        <Tooltip
          pin={preview?.pin}
          type="WITH_IMAGE"
        >
          <div
            className={layouts['snackbar--medium']}
            role="presentation"
          >
            <img
              src={preview?.image}
              alt={preview?.text}
              className="tooltip__image"
              role="presentation"
            />
            <span
              className="tooltip__text"
              role="presentation"
            >
              {preview?.text}
            </span>
          </div>
        </Tooltip>
      )}
    </div>
  )
}

export default Chip
