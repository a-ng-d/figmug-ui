import { useArgs } from '@storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { SimpleSlider } from '../../components/inputs/simple-slider/SimpleSlider'

const meta: Meta<typeof SimpleSlider> = {
  title: 'Example/Inputs/Simple Slider',
  component: SimpleSlider,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div
        id="dropdown-container"
        style={{
          width: '400px',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SimpleSlider>

export default meta
type Story = StoryObj<typeof meta>

export const AgeSelect: Story = {
  args: {
    id: 'age',
    label: 'Age',
    value: 25,
    min: 10,
    max: 90,
    colors: {
      min: 'var(--figma-color-bg-tertiary)',
      max: 'var(--figma-color-bg-tertiary)',
    },
    feature: 'PICK_AGE',
    isBlocked: false,
    isDisabled: false,
    isNew: false,
    onChange: fn(),
  },
  argTypes: {
    feature: { control: false },
  },
  render: (args) => {
    const [argsState, updateArgs] = useArgs<{
      value: number
    }>()

    const onChange = (_feature: string, _state: string, value: number) => {
      updateArgs({
        value: value,
      })
      args.onChange?.(_feature, _state, value)
    }

    return (
      <SimpleSlider
        {...args}
        value={argsState.value}
        onChange={onChange}
      />
    )
  },
}
