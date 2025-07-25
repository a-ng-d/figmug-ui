import React from 'react'
import texts from '@styles/texts/texts.module.scss'
import IconChip from '@components/tags/icon-chip/IconChip'
import Chip from '@components/tags/chip/Chip'
import ActionsList from '@components/lists/actions-list/ActionsList'
import Icon from '@components/assets/icon/Icon'
import { doClassnames } from '@a_ng_d/figmug-utils'
import type { DropdownOption } from '@tps/list.types'
import './dropdown.scss'

export interface DropdownProps {
  id: string
  options: Array<DropdownOption>
  selected: string
  containerId?: string
  alignment?: 'RIGHT' | 'LEFT' | 'FILL'
  pin?: 'NONE' | 'TOP' | 'BOTTOM'
  preview?: {
    image: string
    text: string
    pin?: 'TOP' | 'BOTTOM'
  }
  warning?: {
    label: string
    pin?: 'TOP' | 'BOTTOM'
    type?: 'MULTI_LINE' | 'SINGLE_LINE' | 'WITH_IMAGE'
  }
  isDisabled?: boolean
  isBlocked?: boolean
  isNew?: boolean
}

export interface DropdownStates {
  isMenuOpen: boolean
  listShouldScroll: boolean
}

export default class Dropdown extends React.Component<
  DropdownProps,
  DropdownStates
> {
  private selectMenuRef: React.RefObject<HTMLDivElement>
  private buttonRef: React.RefObject<HTMLButtonElement>
  private listRef: React.RefObject<HTMLDivElement>
  private menuRef: React.RefObject<HTMLUListElement>
  private subMenuRef: React.RefObject<HTMLUListElement>

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
      listShouldScroll: false,
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

  // Direct Actions
  onOpenMenu = () => {
    const { containerId } = this.props
    const { isMenuOpen } = this.state

    this.setState({
      isMenuOpen: !isMenuOpen,
    })
    if (containerId !== undefined)
      setTimeout(() => {
        if (this.listRef.current != null) {
          const containerElement = document.getElementById(containerId)
          if (containerElement) {
            const container = containerElement.getBoundingClientRect()
            const button = this.buttonRef.current?.getBoundingClientRect()

            const diffTop =
              this.listRef.current.getBoundingClientRect().top - container.top
            const diffBottom =
              this.listRef.current.getBoundingClientRect().bottom -
              container.bottom

            if (diffTop < -16 && button) {
              this.listRef.current.style.top = `${container.top - button.top + 16}px`
              this.setState({
                listShouldScroll: true,
              })

              const diffBottomV2 =
                this.listRef.current.getBoundingClientRect().bottom -
                container.bottom

              if (diffBottomV2 < -16)
                this.listRef.current.style.bottom = `${
                  button.bottom - container.bottom + 16
                }px`
            }

            if (diffBottom > -16 && button) {
              this.listRef.current.style.bottom = `${
                button.bottom - container.bottom + 16
              }px`
              this.setState({
                listShouldScroll: true,
              })

              const diffTopV2 =
                this.listRef.current.getBoundingClientRect().top - container.top

              if (diffTopV2 > -16)
                this.listRef.current.style.top = `${container.top - button.top + 16}px`
            }

            this.listRef.current.style.visibility = 'visible'
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
        listShouldScroll: false,
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

  // Template
  Status = () => {
    const { warning, preview, isBlocked, isNew } = this.props

    if (warning || isBlocked || isNew)
      return (
        <div className="select-menu__status">
          {warning !== undefined && (
            <IconChip
              iconType="PICTO"
              iconName="warning"
              text={warning.label}
              pin={warning.pin}
              type={warning.type}
            />
          )}
          {(isBlocked || isNew) && (
            <Chip
              preview={preview}
              isSolo
            >
              {isNew ? 'New' : 'Pro'}
            </Chip>
          )}
        </div>
      )
  }

  // Render
  render() {
    const {
      id,
      alignment,
      options,
      selected,
      containerId,
      isDisabled,
      isBlocked,
    } = this.props
    const { isMenuOpen, listShouldScroll } = this.state

    return (
      <div
        id={id}
        className={doClassnames([
          'select-menu',
          (() => {
            if (alignment === 'LEFT') return 'select-menu--left'
            if (alignment === 'RIGHT') return 'select-menu--right'
            return 'select-menu--fill'
          })(),
          (isDisabled || isBlocked) && 'select-menu--disabled',
        ])}
        ref={this.selectMenuRef}
        role="combobox"
        aria-expanded={isMenuOpen}
        aria-haspopup="listbox"
        aria-controls={`${id}-listbox`}
      >
        <button
          role="combobox"
          className={doClassnames([
            'select-menu__button',
            isMenuOpen && 'select-menu__button--active',
          ])}
          disabled={isDisabled || isBlocked}
          aria-expanded={isMenuOpen}
          aria-controls={`${id}-listbox`}
          onKeyDown={(e) => {
            if (
              e.key === ' ' ||
              (e.key === 'Enter' && !(isDisabled || isBlocked))
            )
              return this.onOpenMenu?.()
            if (e.key === 'Escape') return (e.target as HTMLElement).blur()
            return null
          }}
          onMouseDown={!(isDisabled || isBlocked) ? this.onOpenMenu : undefined}
          tabIndex={0}
          ref={this.buttonRef}
        >
          <span
            className={doClassnames([
              texts['type--truncated'],
              texts.type,
              'select-menu__label',
            ])}
          >
            {this.findSelectedOption(options)}
          </span>
          <span className="select-menu__caret">
            <Icon
              type="PICTO"
              iconName="chevron-down"
            />
          </span>
        </button>
        {this.Status()}
        {(() => {
          const { pin } = this.props

          if (isMenuOpen)
            return (
              <div
                className="floating-menu"
                role="listbox"
                id={`${id}-listbox`}
                style={{
                  position: 'absolute',
                  zIndex: 99,
                  top:
                    pin === 'TOP'
                      ? '-4px'
                      : pin === 'BOTTOM'
                        ? 'auto'
                        : this.setPosition(),
                  bottom: pin === 'BOTTOM' ? '-4px' : 'auto',
                  right: alignment === 'RIGHT' ? 0 : 'auto',
                  left: alignment === 'LEFT' ? 0 : 'auto',
                  visibility: containerId === undefined ? 'visible' : 'hidden',
                }}
                ref={this.listRef}
              >
                <ActionsList
                  options={options}
                  selected={selected}
                  direction={alignment?.includes('LEFT') ? 'RIGHT' : 'LEFT'}
                  shouldScroll={listShouldScroll}
                  containerId={containerId}
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
