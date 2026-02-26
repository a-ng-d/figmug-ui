import React, { Children, isValidElement } from 'react'

interface ItemProps {
  children: React.ReactNode
}

export const Do = ({ children }: ItemProps) => <>{children}</>
export const Dont = ({ children }: ItemProps) => <>{children}</>
export const Preview = ({ children }: ItemProps) => <>{children}</>

const COLORS = {
  do: {
    bg: 'rgba(27,196,125,0.06)',
    border: 'rgba(27,196,125,0.25)',
    label: '✓ Do',
    labelColor: '#0f7a50',
    previewBorder: 'rgba(27,196,125,0.3)',
  },
  dont: {
    bg: 'rgba(242,72,34,0.06)',
    border: 'rgba(242,72,34,0.25)',
    label: "✕ Don't",
    labelColor: '#b83418',
    previewBorder: 'rgba(242,72,34,0.3)',
  },
}

interface PanelProps {
  type: 'do' | 'dont'
  children: React.ReactNode
}

const Panel = ({ type, children }: PanelProps) => {
  const c = COLORS[type]

  const all = Children.toArray(children).filter(
    isValidElement
  ) as React.ReactElement<ItemProps>[]
  const previewNode = all.find((child) => child.type === Preview)
  const rest = all.filter((child) => child.type !== Preview)
  // If nothing is an element (e.g. plain MDX text/code blocks), show everything in body
  const hasElements = all.length > 0
  const bodyChildren = hasElements ? rest : children

  return (
    <div
      style={{
        flex: '1 1 0',
        minWidth: 0,
        border: `1px solid ${c.border}`,
        borderRadius: '6px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          background: c.bg,
          borderBottom: `1px solid ${c.border}`,
          padding: '6px 14px',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: c.labelColor,
        }}
      >
        {c.label}
      </div>

      {previewNode && (
        <div
          style={{
            borderBottom: `1px solid ${c.previewBorder}`,
            background: 'rgba(0,0,0,0.02)',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '120px',
          }}
        >
          {previewNode.props.children}
        </div>
      )}

      <div
        style={{ padding: '12px 16px', fontSize: '13px', lineHeight: '1.6' }}
      >
        {bodyChildren}
      </div>
    </div>
  )
}

interface DosAndDontsProps {
  children: React.ReactNode
  label?: string
}

export const DosAndDonts = ({ children, label }: DosAndDontsProps) => {
  const items = Children.toArray(children).filter(
    isValidElement
  ) as React.ReactElement<ItemProps>[]

  return (
    <div style={{ margin: '16px 0 24px' }}>
      {label && (
        <div
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#999',
            marginBottom: '8px',
          }}
        >
          {label}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        {items.map((item, i) => {
          const type = item.type === Do ? 'do' : 'dont'
          return (
            <Panel
              key={i}
              type={type}
            >
              {item.props.children}
            </Panel>
          )
        })}
      </div>
    </div>
  )
}
