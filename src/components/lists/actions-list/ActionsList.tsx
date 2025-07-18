import React from 'react'
import { DropdownOption } from '@tps/list.types'
import texts from '@styles/texts/texts.module.scss'
import Chip from '@components/tags/chip/Chip'
import Icon from '@components/assets/icon/Icon.tsx'
import { doClassnames } from '@a_ng_d/figmug-utils'
import './actions-list.scss'

export interface ActionsListProps {
  options: Array<DropdownOption>
  selected?: string
  direction?: 'LEFT' | 'RIGHT'
  shouldScroll?: boolean
  containerId?: string
  preview?: {
    image: string
    text: string
    pin?: 'TOP' | 'BOTTOM'
  }
  onCancellation?: () => void
  menuRef?: React.RefObject<HTMLUListElement>
  subMenuRef?: React.RefObject<HTMLUListElement>
}

export interface ActionsListStates {
  openedGroup: string
  listScrollOffset: number
  listScrollAmount: number
  listClientHeight?: number
}

export default class ActionsList extends React.Component<
  ActionsListProps,
  ActionsListStates
> {
  private scrollInterval: number | null

  static defaultProps: Partial<ActionsListProps> = {
    direction: 'RIGHT',
    shouldScroll: false,
    onCancellation: () => null,
  }

  constructor(props: ActionsListProps) {
    super(props)
    this.state = {
      openedGroup: 'EMPTY',
      listScrollOffset: 0,
      listScrollAmount: 1,
      listClientHeight: 1,
    }
    this.scrollInterval = null
  }

  componentDidUpdate(prevProps: Readonly<ActionsListProps>) {
    const { shouldScroll } = this.props
    const list = document.getElementsByClassName(
      'select-menu__menu'
    )[0] as HTMLElement

    if (prevProps.shouldScroll !== shouldScroll)
      this.setState({
        listScrollOffset: list.scrollTop,
        listScrollAmount: list.scrollHeight - list.clientHeight,
        listClientHeight: list.clientHeight,
      })
  }

  // Direct Actions
  onScroll = (e: React.UIEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement
    this.setState({
      listScrollOffset: target.scrollTop,
      listScrollAmount: target.scrollHeight - target.clientHeight,
    })

    if (target.scrollTop === 0) this.stopScrolling()
    if (target.scrollTop === target.scrollHeight - target.clientHeight)
      this.stopScrolling()
  }

  startScrolling = (direction: 'UP' | 'DOWN') => {
    const list = document.getElementsByClassName('select-menu__menu')[0]

    const scroll = () => {
      if (list) {
        if (direction === 'UP' && list.scrollTop > 0) list.scrollTop -= 4
        else if (
          direction === 'DOWN' &&
          list.scrollTop < list.scrollHeight - list.clientHeight
        )
          list.scrollTop += 4

        this.scrollInterval = requestAnimationFrame(scroll)
      }
    }

    this.scrollInterval = requestAnimationFrame(scroll)
  }

  stopScrolling = () => {
    if (this.scrollInterval) {
      cancelAnimationFrame(this.scrollInterval)
      this.scrollInterval = null
    }
  }

  // Template
  SubMenu = (options: Array<DropdownOption> | undefined) => {
    const { subMenuRef } = this.props

    return (
      <div
        className="select-menu__submenu"
        role="menu"
      >
        <ul
          className="select-menu__menu select-menu__menu--active"
          ref={subMenuRef}
          role="menu"
        >
          {options?.map((option, index) => {
            const isActive =
                option.isActive !== undefined ? option.isActive : true,
              isBlocked =
                option.isBlocked !== undefined ? option.isBlocked : false,
              isNew = option.isNew !== undefined ? option.isNew : false,
              children = option.children !== undefined ? option.children : []

            const activeChildren = children.filter(
              (child) => child.isActive !== false
            )

            if (isActive && activeChildren.length > 0)
              return this.MenuGroup(
                { ...option, isActive, isBlocked, isNew, children },
                index
              )
            else if (isActive && activeChildren.length === 0)
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
        data-role={'TITLE'}
        className={doClassnames([
          'select-menu__item',
          'select-menu__item--disabled',
        ])}
        aria-disabled="true"
      >
        <span
          className={doClassnames([
            texts['type--small'],
            texts.type,
            'select-menu__item__label',
          ])}
          aria-hidden="true"
        >
          {option.label}
        </span>
      </li>
    )
  }

  MenuSeparator = (index: number) => {
    return (
      <hr
        key={`menu-option-${index}`}
        data-role={'SEPARATOR'}
      />
    )
  }

  MenuOption = (option: DropdownOption, index: number) => {
    const { selected, preview, onCancellation } = this.props

    return (
      <li
        role="menuitem"
        key={`menu-option-${index}`}
        className={doClassnames([
          'select-menu__item',
          selected?.split(', ').filter((value) => value === option.value)
            .length === 1 && 'select-menu__item--selected',
          option.isBlocked && 'select-menu__item--blocked',
        ])}
        data-value={option.value}
        data-is-blocked={option.isBlocked}
        data-feature={option.feature}
        data-role={'OPTION'}
        tabIndex={option.isBlocked ? -1 : 0}
        aria-selected={
          selected?.split(', ').filter((value) => value === option.value)
            .length === 1
        }
        aria-disabled={option.isBlocked}
        aria-label={option.label}
        onKeyDown={(e) => {
          if ((e.key === ' ' || e.key === 'Enter') && !option.isBlocked) {
            option.action && option.action(e)
            if (typeof onCancellation === 'function') onCancellation()
          }
          if (e.key === 'Escape')
            if (typeof onCancellation === 'function') onCancellation()

          return null
        }}
        onMouseDown={(e) => {
          !option.isBlocked ? option.action?.(e) : undefined
          if (typeof onCancellation === 'function') onCancellation()
        }}
        onFocus={() => null}
        onBlur={() => null}
      >
        {selected?.split(', ').filter((value) => value === option.value)
          .length === 1 && (
          <span className="select-menu__item__tick">
            <Icon
              type="PICTO"
              iconName="check"
            />
          </span>
        )}

        <span
          className={doClassnames([
            texts['type--small'],
            texts.type,
            'select-menu__item__label',
          ])}
        >
          {option.label}
        </span>
        {(option.isBlocked || option.isNew) && (
          <Chip preview={preview}>{option.isNew ? 'New' : 'Pro'}</Chip>
        )}
      </li>
    )
  }

  MenuGroup = (option: DropdownOption, index: number) => {
    const { preview } = this.props
    const { openedGroup } = this.state

    return (
      <li
        role="menuitem"
        key={`menu-group-${index}`}
        className={doClassnames([
          'select-menu__item',
          option.isBlocked && ' select-menu__item--blocked',
        ])}
        data-is-blocked={option.isBlocked}
        data-role={'GROUP'}
        tabIndex={option.isBlocked ? -1 : 0}
        aria-expanded={openedGroup === option.value}
        aria-disabled={option.isBlocked}
        aria-label={option.label}
        aria-haspopup="true"
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
        <span
          className={doClassnames([
            texts['type--small'],
            texts.type,
            'select-menu__item__label',
          ])}
        >
          {option.label}
        </span>
        {(option.isBlocked || option.isNew) && (
          <Chip preview={preview}>{option.isNew ? 'New' : 'Pro'}</Chip>
        )}
        <span className="select-menu__item__caret">
          <Icon
            type="PICTO"
            iconName="caret-right"
          />
        </span>
        {(() => {
          if (openedGroup === option.value) return this.SubMenu(option.children)
          return null
        })()}
      </li>
    )
  }

  MenuSubOption = (option: DropdownOption, index: number) => {
    const { selected, preview, onCancellation } = this.props

    return (
      <li
        role="menuitem"
        key={`menu-suboption-${index}`}
        className={doClassnames([
          'select-menu__item',
          selected?.split(', ').filter((value) => value === option.value)
            .length === 1 && 'select-menu__item--selected',
          option.isBlocked && 'select-menu__item--blocked',
        ])}
        data-value={option.value}
        data-is-blocked={option.isBlocked}
        data-feature={option.feature}
        data-role={'OPTION'}
        tabIndex={option.isBlocked ? -1 : 0}
        aria-selected={
          selected?.split(', ').filter((value) => value === option.value)
            .length === 1
        }
        aria-disabled={option.isBlocked}
        aria-label={option.label}
        onKeyDown={(e) => {
          if ((e.key === ' ' || e.key === 'Enter') && !option.isBlocked) {
            option.action && option.action(e)
            if (typeof onCancellation === 'function') onCancellation()
          }
          if (e.key === 'Escape') this.setState({ openedGroup: 'EMPTY' })

          return null
        }}
        onMouseDown={!option.isBlocked ? option.action : undefined}
      >
        {selected?.split(', ').filter((value) => value === option.value)
          .length === 1 && (
          <span className="select-menu__item__tick">
            <Icon
              type="PICTO"
              iconName="check"
            />
          </span>
        )}
        <span
          className={doClassnames([
            texts['type--small'],
            texts.type,
            'select-menu__item__label',
          ])}
        >
          {option.label}
        </span>
        {(option.isBlocked || option.isNew) && (
          <Chip preview={preview}>{option.isNew ? 'New' : 'Pro'}</Chip>
        )}
      </li>
    )
  }

  render() {
    const { options, direction, shouldScroll, menuRef } = this.props
    const { listScrollOffset, listScrollAmount } = this.state

    return (
      <div
        className="select-menu"
        style={{
          height: shouldScroll ? '100%' : 'auto',
        }}
      >
        {shouldScroll && listScrollOffset !== 0 && listScrollAmount !== 0 && (
          <div
            className="select-menu__spot select-menu__spot--top"
            onMouseEnter={() => this.startScrolling('UP')}
            onMouseLeave={this.stopScrolling}
          >
            <Icon
              type="PICTO"
              iconName="chevron-up"
            />
          </div>
        )}
        <ul
          className={doClassnames([
            'select-menu__menu',
            'select-menu__menu--active',
            direction === 'RIGHT'
              ? 'select-menu__menu--right'
              : 'select-menu__menu--left',
            shouldScroll && 'select-menu__menu--scrolling',
          ])}
          onScroll={this.onScroll}
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
            if (isActive && option.type === 'OPTION')
              return this.MenuOption(
                { ...option, isActive, isBlocked, isNew, children },
                index
              )
            if (isActive && option.type === 'GROUP' && children) {
              const activeChildren = children.filter(
                (child) => child.isActive !== false
              )

              if (activeChildren.length > 1)
                return this.MenuGroup(
                  { ...option, isActive, isBlocked, isNew, children },
                  index
                )
              else if (activeChildren.length === 1)
                return this.MenuOption(
                  {
                    ...activeChildren[0],
                    isActive: activeChildren[0].isActive,
                    isBlocked: activeChildren[0].isBlocked,
                    isNew: activeChildren[0].isNew,
                  },
                  index
                )
              else return null
            }
            return null
          })}
        </ul>
        {shouldScroll &&
          listScrollAmount !== listScrollOffset &&
          listScrollAmount !== 0 && (
            <div
              className="select-menu__spot select-menu__spot--bottom"
              onMouseEnter={() => this.startScrolling('DOWN')}
              onMouseLeave={this.stopScrolling}
            >
              <Icon
                type="PICTO"
                iconName="chevron-down"
              />
            </div>
          )}
      </div>
    )
  }
}
