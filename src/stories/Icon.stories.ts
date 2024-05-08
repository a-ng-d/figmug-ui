import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from '../components/icon/Icon'

const meta = {
  title: 'Example/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    iconColor: { control: 'color' },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Monochromatic: Story = {
  args: {
    iconName: 'adjust',
    iconColor: '#000000',
  },
}
