import { figma } from '@figma/code-connect'
import Tabs from './Tabs'

figma.connect(
  Tabs,
  'https://www.figma.com/design/QlBdsfEcaUsGBzqA20xbNi/Unoff?node-id=651:383',
  {
    props: {
      direction: figma.enum('direction', {
        HORIZONTAL: 'HORIZONTAL',
        VERTICAL: 'VERTICAL',
      }),
      isFlex: figma.boolean('isFlex'),
    },
    example: (props) => (
      <Tabs
        tabs={[
          { label: 'Tab 1', id: 'tab1', isUpdated: false },
          { label: 'Tab 2', id: 'tab2', isUpdated: false },
        ]}
        active="tab1"
        direction={props.direction}
        isFlex={props.isFlex}
        action={() => {}}
      />
    ),
  }
)
