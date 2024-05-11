import React from 'react'
import type { DropdownOption } from '../../../types/list.types'
import type { IconList } from '../../../types/icon.types'
import { Button } from '../button/Button'
import { List } from '../../lists/list/List'
import './menu.scss'

export interface MenuProps {
  id?: string
  type: 'ICON' | 'PRIMARY'
  label?: string
  icon?: IconList
  options: Array<DropdownOption>
  selected?: string
  state?: 'DEFAULT' | 'DISABLED' | 'LOADING'
  alignment?: 'TOP_RIGHT' | 'TOP_LEFT' | 'BOTTOM_RIGHT' | 'BOTTOM_LEFT'
}

export interface MenuStates {
  isMenuOpen: boolean
}

export class Menu extends React.Component<MenuProps, MenuStates> {
  static defaultProps: Partial<MenuProps> = {
    type: 'ICON',
    options: [],
    state: 'DEFAULT',
    alignment: 'BOTTOM_LEFT',
  }

  constructor(props: MenuProps) {
    super(props)
    this.state = {
      isMenuOpen: false,
    }
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount = () =>
    document.addEventListener('mousedown', this.handleClickOutside)

  componentWillUnmount = () =>
    document.removeEventListener('mousedown', this.handleClickOutside)

  handleClickOutside = (e: Event) => {
    const { id } = this.props

    if (!(e.target as HTMLElement).closest(`#${id}`))
      this.setState({
        isMenuOpen: false,
      })
  }

  // Direct actions
  closeMenu = (action: void) => {
    this.setState({ isMenuOpen: false })
    return action
  }

  render() {
    const { id, type, label, state, alignment, icon, options, selected } =
      this.props
    const { isMenuOpen } = this.state

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
      >
        {type === 'ICON' ? (
          <Button
            type="icon"
            icon={icon}
            state={isMenuOpen ? 'selected' : ''}
            isLoading={state === 'LOADING'}
            isDisabled={state === 'DISABLED'}
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
