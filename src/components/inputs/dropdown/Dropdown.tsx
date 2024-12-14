import React from 'react'
import type { DropdownOption } from '../../../types/list.types'
import { Icon } from '../../assets/icon/Icon'
import { List } from '../../lists/list/List'
import { Chip } from '../../tags/chip/Chip'
import './dropdown.scss'

export interface DropdownProps {
  id: string
  options: Array<DropdownOption>
  selected: string
  parentClassName?: string
  alignment?: 'RIGHT' | 'LEFT' | 'FILL'
  pin?: 'NONE' | 'TOP' | 'BOTTOM'
  isDisabled?: boolean
  isBlocked?: boolean
  isNew?: boolean
}

export interface DropdownStates {
  isMenuOpen: boolean
}

export class Dropdown extends React.Component<DropdownProps, DropdownStates> {
  selectMenuRef: React.RefObject<HTMLDivElement>
  buttonRef: React.RefObject<HTMLButtonElement>
  listRef: React.RefObject<HTMLDivElement>
  menuRef: React.RefObject<HTMLUListElement>
  subMenuRef: React.RefObject<HTMLUListElement>

  static defaultProps: Partial<DropdownProps> = {
    alignment: 'LEFT',
    pin: 'NONE',
    isNew: false,
    isBlocked: false,
    isDisabled: false,
  }

  constructor(props: DropdownProps) {
    super(props)
    this.state = {
      isMenuOpen: false,
    }
    this.selectMenuRef = React.createRef()
    this.buttonRef = React.createRef()
    this.listRef = React.createRef()
    this.menuRef = React.createRef()
    this.subMenuRef = React.createRef()
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount = () =>
    document.addEventListener('mousedown', this.handleClickOutside)

  componentWillUnmount = () =>
    document.removeEventListener('mousedown', this.handleClickOutside)

  // Direct actions
  onOpenMenu = () => {
    const { parentClassName } = this.props

    this.setState({
      isMenuOpen: true,
    })
    if (parentClassName !== undefined)
      setTimeout(() => {
        if (this.listRef.current != null) {
          const diffTop: number =
            this.listRef.current.getBoundingClientRect().top -
            document
              .getElementsByClassName(parentClassName as string)[0]
              .getBoundingClientRect().top
          const diffBottom: number =
            this.listRef.current.getBoundingClientRect().bottom -
            document
              .getElementsByClassName(parentClassName as string)[0]
              .getBoundingClientRect().bottom

          if (diffTop < -16) {
            this.listRef.current.style.top = '-6px'
            this.listRef.current.style.bottom = 'auto'
          }
          if (diffBottom > -16) {
            this.listRef.current.style.top = 'auto'
            this.listRef.current.style.bottom = '-6px'
          }
        }
      }, 1)
  }

  setPosition = () => {
    const { options, selected } = this.props
    let position = 0

    options.forEach((option, index) => {
      if (option.value === selected) position = index ?? 0
      if (
        option.children?.find((child) => child.value === selected) !== undefined
      )
        position = index ?? 0
    })
    return `${position * -24 - 6}px`
  }

  handleClickOutside = (e: Event) => {
    const target = e.target as HTMLElement
    if (
      target === this.buttonRef.current ||
      target === this.menuRef.current ||
      target === this.subMenuRef.current ||
      (target.tagName === 'HR' && this.menuRef.current?.contains(target)) ||
      (target.dataset.role === 'GROUP' &&
        this.menuRef.current?.contains(target))
    )
      this.setState({
        isMenuOpen: true,
      })
    else
      this.setState({
        isMenuOpen: false,
      })
  }

  findSelectedOption = (options: Array<DropdownOption>): string => {
    const { selected } = this.props
    const label: Array<string> = []

    selected.split(', ').forEach((value) => {
      options.forEach((option) => {
        if (option.value === value) label.push(option.label ?? '')
        if (
          option.children?.find((child) => child.value === value) !== undefined
        )
          label.push(
            option.children?.find((child) => child.value === value)?.label ?? ''
          )
      })
    })
    return label.join(', ')
  }

  render() {
    const { id, alignment, options, selected, isNew, isDisabled, isBlocked } =
      this.props
    const { isMenuOpen } = this.state

    return (
      <div
        id={id}
        className={[
          'select-menu',
          'recharged',
          (() => {
            if (alignment === 'LEFT') return 'select-menu--left'
            if (alignment === 'RIGHT') return 'select-menu--right'
            return 'select-menu--fill'
          })(),
          (isDisabled || isBlocked) && 'select-menu--disabled',
        ]
          .filter((n) => n)
          .join(' ')}
        ref={this.selectMenuRef}
      >
        <button
          role="dropdown-button"
          className={[
            'select-menu__button',
            isMenuOpen && 'select-menu__button--active',
          ]
            .filter((n) => n)
            .join(' ')}
          tabIndex={0}
          disabled={isDisabled || isBlocked}
          onKeyDown={(e) => {
            if (e.key === ' ' || (e.key === 'Enter' && !isDisabled))
              return this.onOpenMenu?.()
            if (e.key === 'Escape') return (e.target as HTMLElement).blur()
            return null
          }}
          onMouseDown={!isDisabled ? this.onOpenMenu : undefined}
          ref={this.buttonRef}
        >
          <span className="select-menu__label">
            {this.findSelectedOption(options)}
          </span>
          <Icon
            type="PICTO"
            iconName="caret"
            iconColor="var(--figma-color-icon-disabled)"
            customClassName="select-menu__caret"
          />
        </button>
        {(isBlocked || isNew) && <Chip>{isNew ? 'New' : 'Pro'}</Chip>}
        {(() => {
          if (isMenuOpen)
            return (
              <div
                className="floating-menu"
                style={{
                  position: 'absolute',
                  zIndex: 99,
                  top:
                    this.props.pin === 'TOP'
                      ? '-4px'
                      : this.props.pin === 'BOTTOM'
                        ? 'auto'
                        : this.setPosition(),
                  bottom: this.props.pin === 'BOTTOM' ? '-4px' : 'auto',
                  right: alignment === 'RIGHT' ? 0 : 'auto',
                  left: alignment === 'LEFT' ? 0 : 'auto',
                }}
                ref={this.listRef}
              >
                <List
                  options={options}
                  selected={selected}
                  direction={alignment?.includes('LEFT') ? 'RIGHT' : 'LEFT'}
                  onCancellation={() => this.setState({ isMenuOpen: false })}
                  menuRef={this.menuRef}
                  subMenuRef={this.subMenuRef}
                />
              </div>
            )
          return null
        })()}
      </div>
    )
  }
}
