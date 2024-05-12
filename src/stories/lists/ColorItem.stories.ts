import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { ColorItem } from '../../components/lists/color-item/ColorItem'

const meta = {
  title: 'Example/Lists/ColorItem',
  component: ColorItem,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ColorItem>

export default meta
type Story = StoryObj<typeof meta>

export const ColorSample: Story = {
  args: {
    name: 'Primary',
    hex: '#87ebe7',
    uuid: '29f6b9bd-d6c7-4c1f-87fa-ea5bcf7a074c',
    canBeRemoved: false,
    onRemoveColor: fn(),
  },
}
