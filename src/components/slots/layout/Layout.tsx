import { doClassnames } from '@a_ng_d/figmug-utils'
import Drawer, { DrawerProps } from '../drawer/Drawer'
import './layout.scss'

export type LayoutProps = {
  id?: string
  column: Array<{
    node?: React.ReactElement
    typeModifier?:
      | 'LIST'
      | 'DISTRIBUTED'
      | 'CENTERED'
      | 'BLANK'
      | 'DRAWER'
      | 'FIXED'
    fixedWidth?: string
    drawerOptions?: DrawerProps
  }>
  isFullWidth?: boolean
  isFullHeight?: boolean
}

const Layout = (props: LayoutProps) => {
  const { id, column, isFullWidth = false, isFullHeight = false } = props

  return (
    <div
      id={id}
      className={doClassnames([
        'layout',
        isFullWidth && 'layout--full-width',
        isFullHeight && 'layout--full-height',
      ])}
      role="main"
    >
      {column.map(
        (item, index) =>
          item.node !== undefined &&
          (item.typeModifier === 'DRAWER' &&
          item.drawerOptions !== undefined ? (
            <Drawer {...item.drawerOptions}>{item.node}</Drawer>
          ) : (
            <div
              key={index}
              className={doClassnames([
                'layout__block',
                item.typeModifier === 'LIST' && 'layout__block--list',
                item.typeModifier === 'DISTRIBUTED' &&
                  'layout__block--distributed',
                item.typeModifier === 'CENTERED' && 'layout__block--centered',
                item.typeModifier === 'BLANK' && 'layout__block--blank',
                item.typeModifier === 'FIXED' && 'layout__block--fixed',
              ])}
              style={{
                width:
                  item.fixedWidth !== undefined ? item.fixedWidth : undefined,
              }}
              role="region"
            >
              {item.node}
            </div>
          ))
      )}
    </div>
  )
}

export default Layout
