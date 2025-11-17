import './tabs.scss'
import { useEffect, useState } from 'react'
import { DropdownOption } from '@tps/list.types'
import { IconList } from '@tps/icon.types'
import texts from '@styles/texts/texts.module.scss'
import Chip from '@components/tags/chip/Chip'
import Dropdown from '@components/inputs/dropdown/Dropdown'
import Icon from '@components/assets/icon/Icon'
import { doClassnames } from '@a_ng_d/figmug-utils'

export interface TabsProps {
  tabs: Array<{
    label: string
    id: string
    icon?: {
      type: 'PICTO' | 'LETTER'
      name: IconList
    }
    isUpdated: boolean
    isNew?: boolean
  }>
  active: string
  direction?: 'HORIZONTAL' | 'VERTICAL'
  isFlex?: boolean
  action: React.MouseEventHandler & React.KeyboardEventHandler
}

const Tabs = (props: TabsProps) => {
  const {
    tabs,
    active,
    direction = 'HORIZONTAL',
    isFlex = false,
    action,
  } = props

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  )

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const dropdownOptions: DropdownOption[] = tabs.map((tab) => ({
    type: 'OPTION' as const,
    label: tab.label,
    value: tab.id,
    isNew: tab.isNew,
    action: (e: React.MouseEvent<Element> | React.KeyboardEvent<Element>) => {
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          dataset: { feature: tab.id },
        },
        currentTarget: {
          ...e.currentTarget,
          dataset: { feature: tab.id },
        },
      }
      action(
        syntheticEvent as unknown as React.MouseEvent<Element> &
          React.KeyboardEvent<Element>
      )
    },
  }))

  if (tabs.length > 1) {
    if (windowWidth <= 460)
      return (
        <div
          className={doClassnames([
            'tabs',
            direction === 'VERTICAL' && 'tabs--vertical',
          ])}
          role="tablist"
          aria-orientation={
            direction === 'VERTICAL' ? 'vertical' : 'horizontal'
          }
        >
          <Dropdown
            id="tabs-dropdown"
            options={dropdownOptions}
            selected={active}
            alignment="FILL"
          />
        </div>
      )

    return (
      <div
        className={doClassnames([
          'tabs',
          direction === 'VERTICAL' && 'tabs--vertical',
        ])}
        role="tablist"
        aria-orientation={direction === 'VERTICAL' ? 'vertical' : 'horizontal'}
      >
        {tabs.map((tab) => (
          <div
            role="tab"
            key={tab.label.toLowerCase()}
            className={doClassnames([
              'tabs__tab',
              active === tab.id && 'tabs__tab--active',
              tab.isUpdated && 'tabs__tab--updated',
              tab.icon !== undefined && 'tabs__tab--with-icon',
              isFlex && 'tabs__tab--flex',
            ])}
            data-feature={tab.id}
            tabIndex={active === tab.id ? -1 : 0}
            onMouseDown={action}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') action(e)
              if (e.key === 'Escape') (e.target as HTMLElement).blur()
            }}
          >
            {tab.icon !== undefined && (
              <Icon
                type={tab.icon.type}
                iconName={tab.icon.type === 'PICTO' ? tab.icon.name : undefined}
                iconLetter={
                  tab.icon.type === 'LETTER' ? tab.icon.name : undefined
                }
                aria-hidden="true"
              />
            )}
            <span
              className={doClassnames([texts.type, texts['type--truncated']])}
            >
              {tab.label}
            </span>
            {tab.isNew && <Chip>New</Chip>}
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default Tabs
