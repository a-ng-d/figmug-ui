import { figma } from '@figma/code-connect'
import Input from './Input'

figma.connect(
  Input,
  'https://www.figma.com/design/QlBdsfEcaUsGBzqA20xbNi/Unoff?node-id=1:4618',
  {
    props: {
      type: figma.enum('type', {
        TEXT_INPUT: 'TEXT',
        TEXT_AREA: 'LONG_TEXT',
        NUMBER: 'NUMBER',
        COLOR_INPUT: 'COLOR',
      }),
      value: figma.string('value'),
      placeholder: figma.string('placeholder'),
      isFramed: figma.boolean('hasBorder'),
      state: figma.enum('state', {
        DEFAULT: 'DEFAULT',
        ERROR: 'ERROR',
      }),
    },
    example: (props) => (
      <Input
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        isFramed={props.isFramed}
        state={props.state}
      />
    ),
  }
)
