import type { Meta, StoryObj } from '@storybook/react'
import Chip from '@components/tags/chip/Chip'

const meta = {
  title: 'Components/Tags/Chip',
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

export const Score: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          width: '296px',
          height: '296px',
          backgroundColor: 'red',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    state: 'ON_BACKGROUND',
    leftSlot: (
      <div
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '6px',
          backgroundColor: 'blue',
        }}
      ></div>
    ),
    children: 'AA',
    rightSlot: (
      <div
        style={{
          fontSize: '12px',
        }}
      >
        ✔︎
      </div>
    ),
  },
}
