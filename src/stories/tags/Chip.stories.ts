import type { Meta, StoryObj } from '@storybook/react'
import { Chip } from '../../components/tags/chip/Chip'

const meta = {
  title: 'Example/Tags/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const New: Story = {
  args: {
    state: 'ACTIVE',
    children: 'New',
  },
}

export const Pro: Story = {
  args: {
    state: 'ACTIVE',
    children: 'Pro',
  },
}
