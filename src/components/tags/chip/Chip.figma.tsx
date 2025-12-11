import { figma } from '@figma/code-connect'
import Chip from './Chip'

figma.connect(
  Chip,
  'https://www.figma.com/design/QlBdsfEcaUsGBzqA20xbNi/Unoff?node-id=276:83',
  {
    props: {
      state: figma.enum('state', {
        ACTIVE: 'ACTIVE',
        INACTIVE: 'INACTIVE',
        TRANSPARENT: 'ON_BACKGROUND',
      }),
    },
    example: (props) => <Chip state={props.state}>Label</Chip>,
  }
)
