import React, { Children, isValidElement, useState } from 'react'

interface TabProps {
  label: string
  children: React.ReactNode
}

export const Tab = ({ children }: TabProps) => <>{children}</>

interface DocTabsProps {
  children: React.ReactNode
}

export const DocTabs = ({ children }: DocTabsProps) => {
  const [active, setActive] = useState(0)

  const tabs = Children.toArray(children).filter(
    isValidElement
  ) as React.ReactElement<TabProps>[]

  return (
    <div
      style={{
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '6px',
        overflow: 'hidden',
        marginBottom: '24px',
      }}
    >
      <div
        role="tablist"
        style={{
          display: 'flex',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          background: 'rgba(0,0,0,0.02)',
        }}
      >
        {tabs.map((tab, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            style={{
              padding: '8px 20px',
              border: 'none',
              borderBottom:
                active === i ? '2px solid #0d99ff' : '2px solid transparent',
              background: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: active === i ? 600 : 400,
              color: active === i ? '#0d99ff' : '#666',
              transition: 'color 0.15s, border-color 0.15s',
            }}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        style={{ padding: '16px 24px' }}
      >
        {tabs[active]}
      </div>
    </div>
  )
}
