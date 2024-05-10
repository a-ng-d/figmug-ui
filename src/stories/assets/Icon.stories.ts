import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from '../../components/assets/icon/Icon'

const meta = {
  title: 'Example/Assets/Icon',
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

export const Pictogram: Story = {
  args: {
    type: 'PICTO',
    iconName: 'adjust',
    iconLetter: undefined,
    iconColor: '#000000',
  },
  argTypes: {
    type: { control: false },
    iconLetter: { control: false },
  },
}

export const Letter: Story = {
  args: {
    type: 'LETTER',
    iconName: undefined,
    iconLetter: 'L',
    iconColor: '#000000',
  },
  argTypes: {
    type: { control: false },
    iconName: { control: false },
  },
}
