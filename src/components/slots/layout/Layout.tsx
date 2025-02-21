import './layout.scss'

export type LayoutProps = {
  id: string
  column: Array<{
    node: React.ReactElement
    typeModifier?: 'LIST' | 'DISTRIBUTED' | 'CENTERED'
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
                item.typeModifier === 'LIST' && 'layout__block--list',
                item.typeModifier === 'DISTRIBUTED' &&
                  'layout__block--distributed',
                item.typeModifier === 'CENTERED' && 'layout__block--centered',
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
