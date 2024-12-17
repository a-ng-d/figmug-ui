import React from 'react'
import { DropdownOption } from '../../../types/list.types'
import { Chip } from '../../tags/chip/Chip'
import './list.scss'

export interface ListProps {
  options: Array<DropdownOption>
  selected?: string
  direction?: 'LEFT' | 'RIGHT' | 'FILL'
  onCancellation?: () => void
  menuRef?: React.RefObject<HTMLUListElement>
  subMenuRef?: React.RefObject<HTMLUListElement>
}

export interface ListStates {
  openedGroup: string
}

export class List extends React.Component<ListProps, ListStates> {
  static defaultProps: Partial<ListProps> = {
    direction: 'RIGHT',
    onCancellation: () => null,
  }

  constructor(props: ListProps) {
    super(props)
    this.state = {
      openedGroup: 'EMPTY',
    }
  }

  // Template
  SubMenu = (options: Array<DropdownOption> | undefined) => {
    const { subMenuRef } = this.props

    return (
      <div className="select-menu__submenu">
        <ul
          className="select-menu__menu recharged select-menu__menu--active"
          ref={subMenuRef}
        >
          {options?.map((option, index) => {
            const isActive =
                option.isActive !== undefined ? option.isActive : true,
              isBlocked =
                option.isBlocked !== undefined ? option.isBlocked : false,
              isNew = option.isNew !== undefined ? option.isNew : false,
              children = option.children !== undefined ? option.children : []

            if (isActive && children.length > 0)
              return this.MenuGroup(
                { ...option, isActive, isBlocked, isNew, children },
                index
              )
            return this.MenuSubOption(
              { ...option, isActive, isBlocked, isNew, children },
              index
            )
          })}
        </ul>
      </div>
    )
  }

  MenuTitle = (option: DropdownOption, index: number) => {
    return (
      <li
        role="menuitem"
        key={`menu-option-${index}`}
        className={['select-menu__item', 'select-menu__item--disabled']
          .filter((n) => n)
          .join(' ')}
      >
        <span className="select-menu__item-label">{option.label}</span>
      </li>
    )
  }

  MenuSeparator = (index: number) => {
    return <hr key={`menu-option-${index}`} />
  }

  MenuOption = (option: DropdownOption, index: number) => {
    const { selected, onCancellation } = this.props

    return (
      <li
        role="menuitem"
        key={`menu-option-${index}`}
        className={[
          'select-menu__item',
          selected?.split(', ').filter((value) => value === option.value)
            .length === 1 && 'select-menu__item--selected',
          option.isBlocked && 'select-menu__item--blocked',
        ]
          .filter((n) => n)
          .join(' ')}
        data-value={option.value}
        data-is-blocked={option.isBlocked}
        data-feature={option.feature}
        data-role={'OPTION'}
        tabIndex={option.isBlocked ? -1 : 0}
        onKeyDown={(e) => {
          if ((e.key === ' ' || e.key === 'Enter') && !option.isBlocked) {
            option.action && option.action(e)
            if (typeof onCancellation === 'function') onCancellation()
          }
          if (e.key === 'Escape') {
            if (typeof onCancellation === 'function') onCancellation()
          }
          return null
        }}
        onMouseDown={(e) => {
          !option.isBlocked ? option.action?.(e) : undefined
          if (typeof onCancellation === 'function') onCancellation()
        }}
        onFocus={() => null}
        onBlur={() => null}
      >
        <span className="select-menu__item-icon" />
        <span className="select-menu__item-label">{option.label}</span>
        {(option.isBlocked || option.isNew) && (
          <Chip>{option.isNew ? 'New' : 'Pro'}</Chip>
        )}
      </li>
    )
  }

  MenuGroup = (option: DropdownOption, index: number) => {
    const { openedGroup } = this.state

    return (
      <li
        role="menuitem"
        key={`menu-group-${index}`}
        className={[
          'select-menu__item',
          option.isBlocked && ' select-menu__item--blocked',
        ]
          .filter((n) => n)
          .join(' ')}
        data-is-blocked={option.isBlocked}
        data-role={'GROUP'}
        tabIndex={option.isBlocked ? -1 : 0}
        onKeyDown={(e) => {
          if ((e.key === ' ' || e.key === 'Enter') && !option.isBlocked)
            return this.setState({ openedGroup: option.value ?? 'EMPTY' })
          if (e.key === 'Escape') return this.setState({ openedGroup: 'EMPTY' })
          return null
        }}
        onMouseEnter={() =>
          this.setState({ openedGroup: option.value ?? 'EMPTY' })
        }
        onMouseLeave={() => this.setState({ openedGroup: 'EMPTY' })}
        onFocus={() => null}
        onBlur={() => null}
      >
        <span className="select-menu__item-icon" />
        <span className="select-menu__item-label">{option.label}</span>
        {(option.isBlocked || option.isNew) && (
          <Chip>{option.isNew ? 'New' : 'Pro'}</Chip>
        )}
        <span className="select-menu__item-carret" />
        {(() => {
          if (openedGroup === option.value) return this.SubMenu(option.children)
          return null
        })()}
      </li>
    )
  }

  MenuSubOption = (option: DropdownOption, index: number) => {
    const { selected } = this.props

    return (
      <li
        role="menuitem"
        key={`menu-suboption-${index}`}
        className={[
          'select-menu__item',
          selected?.split(', ').filter((value) => value === option.value)
            .length === 1 && 'select-menu__item--selected',
          option.isBlocked && 'select-menu__item--blocked',
        ]
          .filter((n) => n)
          .join(' ')}
        data-value={option.value}
        data-is-blocked={option.isBlocked}
        data-feature={option.feature}
        data-role={'OPTION'}
        tabIndex={option.isBlocked ? -1 : 0}
        onKeyDown={(e) => {
          if (
            (e.key === ' ' || e.key === 'Enter') &&
            option.action &&
            !option.isBlocked
          )
            return option.action(e)
          if (e.key === 'Escape') return this.setState({ openedGroup: 'EMPTY' })
          return null
        }}
        onMouseDown={!option.isBlocked ? option.action : undefined}
      >
        <span className="select-menu__item-icon" />
        <span className="select-menu__item-label">{option.label}</span>
        {(option.isBlocked || option.isNew) && (
          <Chip>{option.isNew ? 'New' : 'Pro'}</Chip>
        )}
      </li>
    )
  }

  render() {
    const { options, direction, menuRef } = this.props

    return (
      <ul
        className={[
          'select-menu__menu',
          'recharged',
          'select-menu__menu--active',
          direction === 'RIGHT'
            ? 'select-menu__menu--right'
            : 'select-menu__menu--left',
        ]
          .filter((n) => n)
          .join(' ')}
        ref={menuRef}
      >
        {options?.map((option, index) => {
          const isActive =
              option.isActive !== undefined ? option.isActive : true,
            isBlocked =
              option.isBlocked !== undefined ? option.isBlocked : false,
            isNew = option.isNew !== undefined ? option.isNew : false,
            children = option.children !== undefined ? option.children : []

          if (isActive && option.type === 'SEPARATOR')
            return this.MenuSeparator(index)
          if (isActive && option.type === 'TITLE')
            return this.MenuTitle(option, index)
          if (isActive && option.type === 'OPTION' && children)
            return children.length > 0
              ? this.MenuGroup(
                  { ...option, isActive, isBlocked, isNew, children },
                  index
                )
              : this.MenuOption(
                  { ...option, isActive, isBlocked, isNew, children },
                  index
                )
          return null
        })}
      </ul>
    )
  }
}
