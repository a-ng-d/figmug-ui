import type { Meta, StoryObj } from '@storybook/react'
import { Message } from '../../components/dialogs/message/Message'

const meta = {
  title: 'Example/Dialogs/Message',
  component: Message,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Message>

export default meta
type Story = StoryObj<typeof meta>

export const SimpleMessage: Story = {
  args: {
    icon: 'info',
    messages: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    ],
    isBlocked: false
  },
}

export const MessageTicker: Story = {
  args: {
    icon: 'info',
    messages: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    ],
    isBlocked: false
  },
  argTypes: {
    isBlocked: { control: false }
  },
}
