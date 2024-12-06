import React from 'react'
import { doMap } from '@a_ng_d/figmug-utils'
import { Button } from '../../actions/button/Button'
import './draggable-item.scss'

export interface DraggableItemProps {
  id: string
  index: number
  canBeRemoved?: boolean
  primarySlot: React.ReactNode
  secondarySlot?: React.ReactNode
  actionsSlot?: React.ReactNode
  selected?: boolean
  guideAbove?: boolean
  guideBelow?: boolean
  onChangeSelection: React.MouseEventHandler<HTMLLIElement>
  onCancelSelection: React.MouseEventHandler<Element> &
    React.FocusEventHandler<HTMLInputElement>
  onRefoldOptions?: () => void
  onDragChange: (
    id: string | undefined,
    hasGuideAbove: boolean,
    hasGuideBelow: boolean,
    position: number
  ) => void
  onDropOutside: (e: React.DragEvent<HTMLLIElement>) => void
  onChangeOrder: (e: React.DragEvent<HTMLLIElement>) => void
  onRemove: React.MouseEventHandler<Element> &
    React.KeyboardEventHandler<Element>
}

interface DraggableItemStates {
  isDragged: boolean
  hasMoreOptions: boolean
}

export class DraggableItem extends React.Component<
  DraggableItemProps,
  DraggableItemStates
> {
  static defaultProps: Partial<DraggableItemProps> = {
    canBeRemoved: true,
    selected: false,
    guideAbove: false,
    guideBelow: false,
  }

  constructor(props: DraggableItemProps) {
    super(props)
    this.state = {
      isDragged: false,
      hasMoreOptions: false,
    }
  }

  // Direct actions
  onDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    const clone = e.currentTarget.cloneNode(true)

    this.setState({ isDragged: true })
    ;(clone as HTMLElement).style.opacity = '0'
    ;(clone as HTMLElement).style.position = 'absolute'
    ;(clone as HTMLElement).id = 'ghost'
    ;(clone as HTMLElement).style.pointerEvents = 'none'
    document.body.appendChild(clone)
    e.dataTransfer.setDragImage(clone as Element, 0, 0)
    e.dataTransfer.effectAllowed = 'move'
  }

  onDragEnd = (e: React.DragEvent<HTMLLIElement>) => {
    const { onDropOutside, onDragChange } = this.props

    this.setState({ isDragged: false })
    onDragChange('', false, false, 0)
    onDropOutside(e)
    document.querySelector('#ghost')?.remove()
  }

  onDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    const { onDragChange } = this.props

    e.preventDefault()
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    const height: number = target.clientHeight
    const y: number = e.clientY - rect.top
    const refY: number = doMap(y, 0, height, 0, height)

    if (refY >= -1 && refY <= height / 2)
      onDragChange(
        target.dataset.id,
        true,
        false,
        parseFloat(target.dataset.position ?? '0')
      )
    else if (refY > height / 2 && refY <= height)
      onDragChange(
        target.dataset.id,
        false,
        true,
        parseFloat(target.dataset.position ?? '0')
      )
  }

  onDrop = (e: React.DragEvent<HTMLLIElement>) => {
    const { onChangeOrder } = this.props

    e.preventDefault()
    onChangeOrder(e)
  }

  // Render
  render() {
    const {
      id,
      index,
      canBeRemoved,
      primarySlot,
      secondarySlot,
      actionsSlot,
      selected,
      guideAbove,
      guideBelow,
      onRemove,
      onChangeSelection,
      onCancelSelection,
      onRefoldOptions,
    } = this.props

    const { isDragged, hasMoreOptions } = this.state

    return (
      <li
        data-id={id}
        data-position={index}
        className={[
          'draggable-item',
          isDragged && 'draggable-item--dragged',
          guideAbove && 'draggable-item--above',
          guideBelow && 'draggable-item--below',
          hasMoreOptions && 'draggable-item--emphasis',
        ]
          .filter((n) => n)
          .join(' ')}
        draggable={selected}
        onMouseDown={onChangeSelection}
        onDragStart={(e) => this.onDragStart(e)}
        onDragEnd={(e) => this.onDragEnd(e)}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => this.onDrop(e)}
      >
        <div className="draggable-item__primary">
          <div className="draggable-item__left-part">{primarySlot}</div>
          <div className="draggable-item__right-part">
            {secondarySlot !== undefined && (
              <Button
                type="icon"
                icon="ellipsis"
                state={hasMoreOptions ? 'selected' : ''}
                action={() => {
                  onCancelSelection
                  onRefoldOptions
                  this.setState({ hasMoreOptions: !hasMoreOptions })
                }}
              />
            )}
            {actionsSlot !== undefined && actionsSlot}
            <Button
              type="icon"
              icon="minus"
              isDisabled={!canBeRemoved}
              feature="REMOVE_ITEM"
              action={canBeRemoved ? onRemove : () => null}
            />
          </div>
        </div>
        {hasMoreOptions && secondarySlot !== undefined && (
          <div className="draggable-item__secondary">{secondarySlot}</div>
        )}
      </li>
    )
  }
}
