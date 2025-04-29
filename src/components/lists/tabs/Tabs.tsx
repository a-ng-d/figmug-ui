import texts from '@styles/texts/texts.module.scss'
import { doClassnames } from '@a_ng_d/figmug-utils'
import './tabs.scss'
import { IconList } from '@tps/icon.types'
import Icon from '@components/assets/icon/Icon'

export interface TabsProps {
  tabs: Array<{
    label: string
    id: string
    icon?: {
      type: 'PICTO' | 'LETTER'
      name: IconList
    }
    isUpdated: boolean
  }>
  active: string
  direction?: 'HORIZONTAL' | 'VERTICAL'
  isFlex?: boolean
  action: React.MouseEventHandler
}

const Tabs = (props: TabsProps) => {
  const {
    tabs,
    active,
    direction = 'HORIZONTAL',
    isFlex = false,
    action,
  } = props

  return (
    <div
      className={doClassnames([
        'tabs',
        direction === 'VERTICAL' && 'tabs--vertical',
      ])}
    >
      {tabs.map((tab) => (
        <div
          role="navigation"
          key={tab.label.toLowerCase()}
          className={doClassnames([
            'tabs__tab',
            active === tab.id && 'tabs__tab--active',
            tab.isUpdated && 'tabs__tab--new',
            tab.icon !== undefined && 'tabs__tab--with-icon',
            isFlex && 'tabs__tab--flex',
          ])}
          data-feature={tab.id}
          tabIndex={-1}
          onMouseDown={action}
        >
          {tab.icon !== undefined && (
            <Icon
              type={tab.icon.type}
              iconName={tab.icon.type === 'PICTO' ? tab.icon.name : undefined}
              iconLetter={
                tab.icon.type === 'LETTER' ? tab.icon.name : undefined
              }
            />
          )}
          <span
            className={doClassnames([texts.type, texts['type--truncated']])}
          >
            {tab.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Tabs
