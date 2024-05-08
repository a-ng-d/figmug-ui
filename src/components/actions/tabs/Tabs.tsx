import React from 'react'
import texts from '../../../styles/texts.module.scss'
import './tabs.scss'

export interface TabsProps {
  tabs: Array<{
    label: string
    id: string
    isUpdated: boolean
  }>
  active: string
  action: React.MouseEventHandler
}

export const Tabs = (props: TabsProps) => {
  const { tabs, active, action } = props

  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <div
          role="menuitem"
          key={tab.label.toLowerCase()}
          className={[
            'tabs__tab',
            'type',
            texts.type,
            active === tab.id ? 'tabs__tab--active' : null,
            tab.isUpdated ? 'tabs__tab--new' : null,
          ]
            .filter((n) => n)
            .join(' ')}
          data-feature={tab.id}
          tabIndex={-1}
          onMouseDown={action}
        >
          {tab.label}
        </div>
      ))}
    </div>
  )
}
