export type LayoutProps = {
  id: string
  direction?: 'VERTICAL' | 'HORIZONTAL'
  singleSlot: {
    nodes: React.ReactElement
    type: 'LIST' | 'DISTRIBUTED' | 'CENTERED'
    hasPadding?: boolean
  }
  leftSlot?: {
    nodes: React.ReactElement
    type: 'LIST' | 'DISTRIBUTED' | 'CENTERED'
    hasPadding?: boolean
  }
  rightSlot?: {
    nodes: React.ReactElement
    type: 'NORMAL' | 'LIST' | 'DISTRIBUTED' | 'CENTERED'
    hasPadding?: boolean
  }
  isFullHeight?: boolean
}

const Layout = (props: LayoutProps) => {
  const {
    id,
    direction = 'VERTICAL',
    singleSlot,
    leftSlot = {
      nodes: null,
      type: 'NORMAL',
      hasPadding: false,
    },
    rightSlot = {
      nodes: null,
      type: 'NORMAL',
      hasPadding: false,
    },
    isFullHeight = false,
  } = props

  return (
    <div
      id={id}
      className={[
        'layout',
        direction === 'HORIZONTAL' && 'layout--horizontal',
        isFullHeight && 'layout--full-height',
      ]
        .filter((n) => n)
        .join(' ')}
      role="layout"
    >
      {leftSlot && (
        <div
          className={[
            'layout__block',
            leftSlot.type === 'LIST' && 'layout__block--list',
            leftSlot.type === 'DISTRIBUTED' && 'layout__block--distributed',
            leftSlot.type === 'CENTERED' && 'layout__block--centered',
            !leftSlot.hasPadding && 'layout__block--no-padding',
          ]
            .filter((n) => n)
            .join(' ')}
        >
          {leftSlot.nodes}
        </div>
      )}
      {rightSlot && (
        <div
          className={[
            'layout__block',
            rightSlot.type === 'LIST' && 'layout__block--list',
            rightSlot.type === 'DISTRIBUTED' && 'layout__block--distributed',
            rightSlot.type === 'CENTERED' && 'layout__block--centered',
            !rightSlot.hasPadding && 'layout__block--no-padding',
          ]
            .filter((n) => n)
            .join(' ')}
        >
          {rightSlot.nodes}
        </div>
      )}
      <div
        className={[
          'layout__block',
          singleSlot.type === 'LIST' && 'layout__block--list',
          singleSlot.type === 'DISTRIBUTED' && 'layout__block--distributed',
          singleSlot.type === 'CENTERED' && 'layout__block--centered',
          !singleSlot.hasPadding && 'layout__block--no-padding',
        ]
          .filter((n) => n)
          .join(' ')}
      >
        {singleSlot.nodes}
      </div>
    </div>
  )
}

export default Layout
