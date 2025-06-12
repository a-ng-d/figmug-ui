import React from 'react'
import DraggableWindow from '@components/slots/draggable-window/DraggableWindow'
import Button from '@components/actions/button/Button'
import { doClassnames, doMap } from '@a_ng_d/figmug-utils'
import './draggable-item.scss'

export interface DraggableItemProps {
  id: string
  index: number
  canBeRemoved?: boolean
  primarySlot: React.ReactNode
  secondarySlot?: {
    title: string
    node: React.ReactNode
  }
  actionsSlot?: React.ReactNode
  selected?: boolean
  optionsTitle?: string
  helpers?: {
    remove?: string
    more?: string
  }
  guideAbove?: boolean
  guideBelow?: boolean
  isBlocked?: boolean
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

export interface DraggableItemStates {
  isDragged: boolean
  hasMoreOptions: boolean
}

export default class DraggableItem extends React.Component<
  DraggableItemProps,
  DraggableItemStates
> {
  private moreButtonRef: React.RefObject<Button>

  static defaultProps: Partial<DraggableItemProps> = {
    canBeRemoved: true,
    selected: false,
    guideAbove: false,
    guideBelow: false,
    isBlocked: false,
  }

  constructor(props: DraggableItemProps) {
    super(props)
    this.state = {
      isDragged: false,
      hasMoreOptions: false,
    }
    this.moreButtonRef = React.createRef()
  }

  // Direct Actions
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
      optionsTitle,
      helpers,
      guideAbove,
      guideBelow,
      isBlocked,
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
        className={doClassnames([
          'draggable-item',
          isDragged && 'draggable-item--dragged',
          guideAbove && 'draggable-item--above',
          guideBelow && 'draggable-item--below',
        ])}
        draggable={!hasMoreOptions && !isBlocked ? selected : false}
        role="listitem"
        aria-grabbed={isDragged}
        aria-selected={selected}
        onMouseDown={(e) => {
          if (!hasMoreOptions && !isBlocked) onChangeSelection(e)
        }}
        onDragStart={(e) => {
          if (!hasMoreOptions && !isBlocked) this.onDragStart(e)
        }}
        onDragEnd={(e) => {
          if (!hasMoreOptions && !isBlocked) this.onDragEnd(e)
        }}
        onDragOver={(e) => {
          if (!hasMoreOptions && !isBlocked) this.onDragOver(e)
        }}
        onDrop={(e) => {
          if (!hasMoreOptions && !isBlocked) this.onDrop(e)
        }}
      >
        <div
          className="draggable-item__primary"
          role="group"
        >
          <div
            className="draggable-item__left"
            role="presentation"
          >
            {primarySlot}
          </div>
          <div
            className="draggable-item__right"
            role="group"
          >
            {secondarySlot !== undefined && (
              <Button
                ref={this.moreButtonRef}
                type="icon"
                icon="ellipses"
                state={hasMoreOptions ? 'selected' : undefined}
                helper={
                  helpers?.more !== undefined
                    ? {
                        label: helpers.more,
                      }
                    : undefined
                }
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
              helper={
                helpers?.remove !== undefined
                  ? {
                      label: helpers.remove,
                    }
                  : undefined
              }
              feature="REMOVE_ITEM"
              isDisabled={!canBeRemoved}
              action={canBeRemoved ? onRemove : () => null}
            />
          </div>
        </div>
        {hasMoreOptions && secondarySlot !== undefined && (
          <DraggableWindow
            title={
              secondarySlot.title !== undefined
                ? secondarySlot.title
                : optionsTitle
            }
            onClose={() =>
              this.setState({
                hasMoreOptions: false,
              })
            }
            triggerRef={this.moreButtonRef}
          >
            {secondarySlot.node}
          </DraggableWindow>
        )}
      </li>
    )
  }
}
