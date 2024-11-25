import React from 'react'
import type { DropdownOption } from '../../../types/list.types'
import { Chip } from '../../tags/chip/Chip'
import { List } from '../../lists/list/List'
import { Icon } from '../../assets/icon/Icon'
import './dropdown.scss'

export interface DropdownProps {
  id: string
  options: Array<DropdownOption>
  selected: string
  parentClassName?: string
  alignment?: 'RIGHT' | 'LEFT' | 'FILL'
  isDisabled?: boolean
  isNew?: boolean
}

export interface DropdownStates {
  isMenuOpen: boolean
}

export class Dropdown extends React.Component<DropdownProps, DropdownStates> {
  selectMenuRef: React.RefObject<HTMLDivElement>
  buttonRef: React.RefObject<HTMLButtonElement>
  listRef: React.RefObject<HTMLDivElement>

  static defaultProps: Partial<DropdownProps> = {
    alignment: 'LEFT',
    isNew: false,
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

    options.forEach((option) => {
      if (option.value === selected) position = option.position ?? 0
      if (
        option.children?.find((child) => child.value === selected) !== undefined
      )
        position =
          option.children.find((child) => child.value === selected)?.position ??
          0
    })
    return `${position * -24 - 6}px`
  }

  handleClickOutside = (e: Event) => {
    if (e.target === this.buttonRef.current)
      this.setState({
        isMenuOpen: true,
      })
    else if (e.target !== this.listRef.current)
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
    const { id, alignment, options, selected, isNew, isDisabled } = this.props
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
          isDisabled && 'select-menu--disabled',
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
          disabled={isDisabled}
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
        {isNew && <Chip>New</Chip>}
        {(() => {
          if (isMenuOpen)
            return (
              <div
                className="floating-menu"
                style={{
                  position: 'absolute',
                  zIndex: 99,
                  top: this.setPosition(),
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
                />
              </div>
            )
          return null
        })()}
      </div>
    )
  }
}
