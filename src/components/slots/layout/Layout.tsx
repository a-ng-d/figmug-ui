import './layout.scss'

export type LayoutProps = {
  id: string
  column: Array<{
    node: React.ReactElement
    type: 'LIST' | 'DISTRIBUTED' | 'CENTERED'
    hasPadding?: boolean
  }>
  isFullHeight?: boolean
}

const Layout = (props: LayoutProps) => {
  const { id, column, isFullHeight = false } = props

  return (
    <div
      id={id}
      className={['layout', isFullHeight && 'layout--full-height']
        .filter((n) => n)
        .join(' ')}
      role="layout"
    >
      {column.map(
        (item, index) =>
          item.node !== undefined && (
            <div
              key={index}
              className={[
                'layout__block',
                item.type === 'LIST' && 'layout__block--list',
                item.type === 'DISTRIBUTED' && 'layout__block--distributed',
                item.type === 'CENTERED' && 'layout__block--centered',
                !item.hasPadding && 'layout__block--no-padding',
              ]
                .filter((n) => n)
                .join(' ')}
            >
              {item.node}
            </div>
          )
      )}
    </div>
  )
}

export default Layout
