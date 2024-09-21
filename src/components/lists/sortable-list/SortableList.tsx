import React from 'react'
import './sortable-list.scss'
import { DraggableItem } from '../draggable-item/DraggableItem'

interface SelectedColor {
  id: string | undefined
  position: number
}

interface DefaultData {
  id: string
}

interface HoveredColor extends SelectedColor {
  hasGuideAbove: boolean
  hasGuideBelow: boolean
}

export interface SortableListProps<T = DefaultData> {
  data: Array<T>
  primarySlot: Array<React.ReactNode>
  secondarySlot?: Array<React.ReactNode>
  actionsSlot?: Array<React.ReactNode>
  isScrollable?: boolean
  onChangeSortableList: (data: Array<T>) => void
  onRemoveItem: React.MouseEventHandler<Element> &
    React.KeyboardEventHandler<Element>
}

interface SortableListStates {
  selectedElement: SelectedColor
  hoveredElement: HoveredColor
}

export class SortableList<T extends DefaultData> extends React.Component<
  SortableListProps<T>,
  SortableListStates
> {
  listRef: React.RefObject<HTMLUListElement>

  static defaultProps: Partial<SortableListProps> = {
    isScrollable: false,
  }

  constructor(props: SortableListProps<T>) {
    super(props)
    this.state = {
      selectedElement: {
        id: undefined,
        position: 0,
      },
      hoveredElement: {
        id: undefined,
        hasGuideAbove: false,
        hasGuideBelow: false,
        position: 0,
      },
    }
    this.listRef = React.createRef()
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  // Lifecycle
  componentDidMount = () =>
    document.addEventListener('mousedown', this.handleClickOutside)

  componentWillUnmount = () =>
    document.removeEventListener('mousedown', this.handleClickOutside)

  handleClickOutside = (e: Event) => {
    if (this.listRef.current !== null)
      if (
        this.listRef &&
        !this.listRef.current.contains(e.target as HTMLElement)
      )
        this.setState({
          selectedElement: {
            id: undefined,
            position: 0,
          },
        })
  }

  // Handlers
  orderHandler = () => {
    const { onChangeSortableList, data } = this.props
    const { selectedElement, hoveredElement } = this.state

    const source: SelectedColor = selectedElement,
      target: HoveredColor = hoveredElement,
      duplicatedData = data.map((el) => el)

    let position: number
    const sourceIndex = duplicatedData.findIndex(
      (item) => item.id === source.id
    )

    const [removedElement] = duplicatedData.splice(sourceIndex, 1)

    if (target.hasGuideAbove && target.position > source.position) {
      position = target.position - 1
    } else if (target.hasGuideBelow && target.position > source.position) {
      position = target.position
    } else if (target.hasGuideAbove && target.position < source.position) {
      position = target.position
    } else if (target.hasGuideBelow && target.position < source.position) {
      position = target.position + 1
    } else {
      position = target.position
    }

    duplicatedData.splice(position, 0, removedElement)

    onChangeSortableList(duplicatedData)
  }

  selectionHandler: React.MouseEventHandler<HTMLLIElement> &
    React.MouseEventHandler<Element> &
    React.FocusEventHandler<HTMLInputElement> = (e) => {
    const item = e.currentTarget as HTMLElement
    const target = e.target as HTMLElement

    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'BUTTON' ||
      target.tagName === 'TEXTAREA'
    )
      return this.setState({
        selectedElement: {
          id: undefined,
          position: 0,
        },
      })

    return this.setState({
      selectedElement: {
        id: item.dataset.id,
        position: parseFloat(item.dataset.position ?? '0'),
      },
    })
  }

  dragHandler = (
    id: string | undefined,
    hasGuideAbove: boolean,
    hasGuideBelow: boolean,
    position: number
  ) => {
    this.setState({
      hoveredElement: {
        id: id,
        hasGuideAbove: hasGuideAbove,
        hasGuideBelow: hasGuideBelow,
        position: position,
      },
    })
  }

  dropOutsideHandler = (e: React.DragEvent<HTMLLIElement>) => {
    const target = e.target,
      parent: ParentNode =
        (target as HTMLElement).parentNode ?? (target as HTMLElement),
      scrollY: number = (parent.parentNode?.parentNode as HTMLElement)
        .scrollTop,
      parentRefTop: number = (parent as HTMLElement).offsetTop,
      parentRefBottom: number =
        parentRefTop + (parent as HTMLElement).clientHeight

    if (e.pageY + scrollY < parentRefTop) this.orderHandler()
    else if (e.pageY + scrollY > parentRefBottom) this.orderHandler()
  }

  removeHandler = (
    e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => {
    const { onChangeSortableList, data } = this.props
    const duplicatedData = data.map((el) => el)
    let id: string | null
    const element: HTMLElement | null = (
      e.currentTarget as HTMLElement
    ).closest('.draggable-item')

    element !== null ? (id = element.getAttribute('data-id')) : (id = null)

    onChangeSortableList(duplicatedData.filter((item) => item.id !== id))
  }

  // Render
  render() {
    const {
      data,
      primarySlot,
      secondarySlot,
      actionsSlot,
      isScrollable,
      onRemoveItem,
    } = this.props
    const { selectedElement, hoveredElement } = this.state

    return (
      <ul
        className={[
          'sortable-list',
          isScrollable && 'sortable-list--scrollable',
        ]
          .filter((n) => n)
          .join(' ')}
        ref={this.listRef}
      >
        {data.map((item, index) => (
          <DraggableItem
            key={item.id}
            id={item.id}
            index={index}
            primarySlot={primarySlot[index]}
            secondarySlot={secondarySlot ? secondarySlot[index] : undefined}
            actionsSlot={actionsSlot ? actionsSlot[index] : undefined}
            selected={selectedElement.id === item.id}
            guideAbove={
              hoveredElement.id === item.id
                ? hoveredElement.hasGuideAbove
                : false
            }
            guideBelow={
              hoveredElement.id === item.id
                ? hoveredElement.hasGuideBelow
                : false
            }
            onCancellationSelection={this.selectionHandler}
            onChangeOrder={this.orderHandler}
            onRemove={onRemoveItem}
            onChangeSelection={this.selectionHandler}
            onDragChange={this.dragHandler}
            onDropOutside={this.orderHandler}
          />
        ))}
      </ul>
    )
  }
}
