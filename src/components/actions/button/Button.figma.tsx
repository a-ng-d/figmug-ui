import { figma } from '@figma/code-connect'
import Button from './Button'

figma.connect(
  Button,
  'https://www.figma.com/design/QlBdsfEcaUsGBzqA20xbNi/Unoff?node-id=1:4605',
  {
    props: {
      type: figma.enum('type', {
        PRIMARY: 'primary',
        SECONDARY: 'secondary',
        TERTIARY: 'tertiary',
        DESTRUCTIVE: 'destructive',
        ALTERNATIVE: 'alternative',
        INACTIVE: 'alternative',
        ICON: 'icon',
      }),
      state: figma.boolean('isSelected', {
        true: 'selected',
        false: 'default',
      }),
      isBlocked: figma.boolean('isDisabled'),
      label: figma.string('label'),
      icon: figma.boolean('hasIcon', {
        true: 'adjust',
        false: undefined,
      }),
      hasMultipleActions: figma.boolean('hasMultipleActions'),
    },
    example: (props) => (
      <Button
        type={props.type}
        state={props.state}
        isBlocked={props.isBlocked}
        label={props.label}
        icon={props.icon}
        hasMultipleActions={props.hasMultipleActions}
      />
    ),
  }
)
