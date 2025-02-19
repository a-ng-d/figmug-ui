import React from 'react'
import type { IconList } from '@tps/icon.types'
import type { DropdownOption } from '@tps/list.types'
import ActionsList from '@components/lists/actions-list/ActionsList'
import Button from '../button/Button'
import './menu.scss'

export interface MenuProps {
  id: string
  type: 'ICON' | 'PRIMARY'
  label?: string
  icon?: IconList
  customIcon?: React.ReactElement
  options: Array<DropdownOption>
  selected?: string
  parentClassName?: string
  state?: 'DEFAULT' | 'DISABLED' | 'LOADING'
  alignment?: 'TOP_RIGHT' | 'TOP_LEFT' | 'BOTTOM_RIGHT' | 'BOTTOM_LEFT'
  helper?: {
    label: string
    pin?: 'TOP' | 'BOTTOM'
    isSingleLine?: boolean
  }
  isBlocked?: boolean
  isNew?: boolean
}

export interface MenuStates {
  isMenuOpen: boolean
  alignment: 'TOP_RIGHT' | 'TOP_LEFT' | 'BOTTOM_RIGHT' | 'BOTTOM_LEFT'
}

export default class Menu extends React.Component<MenuProps, MenuStates> {
  private selectMenuRef: React.RefObject<HTMLDivElement>
  buttonRef: React.RefObject<Button>
  private listRef: React.RefObject<HTMLDivElement>
  private menuRef: React.RefObject<HTMLUListElement>
  private subMenuRef: React.RefObject<HTMLUListElement>

  static defaultProps: Partial<MenuProps> = {
    type: 'ICON',
    options: [],
    state: 'DEFAULT',
    alignment: 'BOTTOM_LEFT',
    isBlocked: false,
    isNew: false,
  }

  constructor(props: MenuProps) {
    super(props)
    this.state = {
      isMenuOpen: false,
      alignment: props.alignment ?? 'BOTTOM_LEFT',
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

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  // Direct Actions
  handleClickOutside = (e: Event) => {
    const target = e.target as HTMLElement
    const { isMenuOpen } = this.state

    if (
      (this.buttonRef.current?.buttonRef.current?.contains(target) &&
        isMenuOpen) ||
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

  onOpenMenu = () => {
    const { parentClassName } = this.props
    const { isMenuOpen } = this.state

    this.setState({
      isMenuOpen: !isMenuOpen,
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

          if (diffTop < 16) {
            this.listRef.current.style.top =
              'calc(var(--size-medium) + var(--size-xxsmall))'
            this.listRef.current.style.transform = 'none'
          }
          if (diffBottom > -16) {
            this.listRef.current.style.top = 'calc(var(--size-xxsmall) * -1)'
            this.listRef.current.style.transform = 'translateY(-100%)'
          }
        }
      }, 1)
  }

  render() {
    const {
      id,
      type,
      label,
      state,
      icon,
      customIcon,
      options,
      selected,
      alignment,
      isBlocked,
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
            helper={
              this.props.helper === undefined ? undefined : this.props.helper
            }
            isLoading={state === 'LOADING'}
            isDisabled={state === 'DISABLED' || isBlocked}
            isNew={isNew}
            ref={this.buttonRef}
            action={
              !(state === 'DISABLED' || isBlocked) ? this.onOpenMenu : undefined
            }
          />
        ) : (
          <Button
            type="primary"
            label={label}
            hasMultipleActions
            isLoading={state === 'LOADING'}
            isDisabled={state === 'DISABLED' || isBlocked}
            isNew={isNew}
            ref={this.buttonRef}
            action={
              !(state === 'DISABLED' || isBlocked) ? this.onOpenMenu : undefined
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
                <ActionsList
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
