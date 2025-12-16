import { figma } from '@figma/code-connect'
import Icon from './Icon'

figma.connect(
  Icon,
  'https://www.figma.com/design/QlBdsfEcaUsGBzqA20xbNi/Unoff?node-id=378:1109',
  {
    props: {
      iconName: figma.enum('name', {
        adjust: 'adjust',
        info: 'info',
        close: 'close',
        check: 'check',
        plus: 'plus',
        minus: 'minus',
      }),
    },
    example: (props) => (
      <Icon
        type="PICTO"
        iconName={props.iconName}
      />
    ),
  }
)
