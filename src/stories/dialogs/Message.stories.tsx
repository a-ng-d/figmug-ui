import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import Message from '@components/dialogs/message/Message'

const meta = {
  title: 'Components/Dialogs/Message',
  component: Message,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Message>

export default meta
type Story = StoryObj<typeof meta>

export const SimpleMessage: Story = {
  args: {
    icon: 'info',
    messages: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ],
    isBlocked: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const message = canvas.getByText(/Lorem ipsum dolor sit amet/i)
    await expect(message).toBeInTheDocument()

    const icon = canvas.getByRole('img', { hidden: true })
    await expect(icon).toBeInTheDocument()
  },
}

export const MessageTicker: Story = {
  args: {
    icon: 'info',
    messages: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ],
    isBlocked: false,
  },
  argTypes: {
    isBlocked: { control: false },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const icon = canvas.getByRole('img', { hidden: true })
    await expect(icon).toBeInTheDocument()

    const ticker = canvas.getByRole('marquee')
    await expect(ticker).toBeInTheDocument()

    const allMessages = canvas.getAllByText(/Lorem ipsum dolor sit amet/i)
    await expect(allMessages.length).toBeGreaterThanOrEqual(3)

    const separators = canvas.getAllByText('﹒')
    await expect(separators.length).toBeGreaterThan(0)

    const tipsElement = ticker.querySelector('.message__tips')
    await expect(tipsElement).toBeInTheDocument()
    const animationStyle = tipsElement
      ? window.getComputedStyle(tipsElement).animation
      : ''
    await expect(animationStyle).toContain('ticker')
  },
}
