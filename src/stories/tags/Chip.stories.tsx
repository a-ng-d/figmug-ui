import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import figma from '@figma/code-connect'
import ColorChip from '@components/tags/color-chip/ColorChip'
import Chip from '@components/tags/chip/Chip'

const meta = {
  title: 'Components/Tags/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    design: {
      url: 'https://www.figma.com/design/QlBdsfEcaUsGBzqA20xbNi/Unoff?node-id=276-83',
      props: {
        state: figma.enum('state', {
          ACTIVE: 'ACTIVE',
          INACTIVE: 'INACTIVE',
          TRANSPARENT: 'ON_BACKGROUND',
        }),
      },
    },
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const New: Story = {
  args: {
    state: 'ACTIVE',
    children: 'New',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const chip = canvas.getByText('New')
    await expect(chip).toBeInTheDocument()
    await expect(chip).toBeVisible()
  },
}

export const Pro: Story = {
  args: {
    state: 'ACTIVE',
    children: 'Pro',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const chip = canvas.getByText('Pro')
    await expect(chip).toBeInTheDocument()
    await expect(chip).toBeVisible()
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
      <ColorChip
        color="blue"
        width="8px"
        height="8px"
        isRounded={true}
      />
    ),
    children: 'AA',
    rightSlot: (
      <div
        style={{
          fontSize: '11px',
        }}
      >
        ✔︎
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const chip = canvas.getByText('AA')
    await expect(chip).toBeInTheDocument()
    await expect(chip).toBeVisible()
  },
}
