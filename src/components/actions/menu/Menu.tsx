import React from 'react'
import type { IconList } from '../../../types/icon.types'
import type { DropdownOption } from '../../../types/list.types'
import { List } from '../../lists/list/List'
import { Button } from '../button/Button'
import './menu.scss'

export interface MenuProps {
  id: string
  type: 'ICON' | 'PRIMARY'
  label?: string
  icon?: IconList
  customIcon?: React.ReactElement
  options: Array<DropdownOption>
  selected?: string
  state?: 'DEFAULT' | 'DISABLED' | 'LOADING'
  alignment?: 'TOP_RIGHT' | 'TOP_LEFT' | 'BOTTOM_RIGHT' | 'BOTTOM_LEFT'
  isNew?: boolean
}

export interface MenuStates {
  isMenuOpen: boolean
}

export class Menu extends React.Component<MenuProps, MenuStates> {
  selectMenuRef: React.RefObject<HTMLDivElement>
  buttonRef: React.RefObject<Button>
  listRef: React.RefObject<HTMLDivElement>
  menuRef: React.RefObject<HTMLUListElement>
  subMenuRef: React.RefObject<HTMLUListElement>

  static defaultProps: Partial<MenuProps> = {
    type: 'ICON',
    options: [],
    state: 'DEFAULT',
    alignment: 'BOTTOM_LEFT',
    isNew: false,
  }

  constructor(props: MenuProps) {
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
  closeMenu = (action: void) => {
    this.setState({ isMenuOpen: false })
    return action
  }

  handleClickOutside = (e: Event) => {
    const target = e.target as HTMLElement

    if (
      (this.buttonRef.current?.buttonRef.current?.contains(target) &&
        this.state.isMenuOpen) ||
      target === this.menuRef.current ||
      target === this.subMenuRef.current ||
      target.tagName === 'HR' ||
      target.dataset.role === 'GROUP'
    )
      this.setState({
        isMenuOpen: true,
      })
    else
      this.setState({
        isMenuOpen: false,
      })
  }

  render() {
    const {
      id,
      type,
      label,
      state,
      alignment,
      icon,
      customIcon,
      options,
      selected,
      isNew,
    } = this.props
    const { isMenuOpen } = this.state

    if (options.every((option) => option.isActive === false)) return null
    return (
      <div
        id={id}
        className={[
          'menu',
          'recharged',
          `menu--${alignment?.toLocaleLowerCase().replace('_', '-')}`,
        ]
          .filter((n) => n)
          .join(' ')}
        ref={this.selectMenuRef}
      >
        {type === 'ICON' ? (
          <Button
            type="icon"
            icon={icon === undefined ? undefined : icon}
            customIcon={customIcon === undefined ? undefined : customIcon}
            state={isMenuOpen ? 'selected' : ''}
            isLoading={state === 'LOADING'}
            isDisabled={state === 'DISABLED'}
            isNew={isNew}
            ref={this.buttonRef}
            action={() => {
              this.setState({
                isMenuOpen: !isMenuOpen,
              })
            }}
          />
        ) : (
          <Button
            type="primary"
            label={label}
            hasMultipleActions
            isLoading={state === 'LOADING'}
            isDisabled={state === 'DISABLED'}
            isNew={isNew}
            ref={this.buttonRef}
            action={() =>
              this.setState({
                isMenuOpen: !isMenuOpen,
              })
            }
          />
        )}
        {(() => {
          if (isMenuOpen)
            return (
              <div
                className="floating-menu"
                style={{
                  position: 'absolute',
                  zIndex: 99,
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
