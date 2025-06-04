import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Notification from '@components/dialogs/notification/Notification'

const meta = {
  title: 'Components/Dialogs/Notification',
  component: Notification,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Notification>

export default meta
type Story = StoryObj<typeof meta>

export const SingleMessage: Story = {
  args: {
    type: 'INFO',
    message: 'The file has been saved successfully',
    onClose: fn(),
  },
  argTypes: {
    onClose: { control: false },
  },
}

export const MultipleMessages: Story = {
  args: {
    type: 'INFO',
    message:
      'The file has been saved successfully. You can now close this notification. Do you want to continue?',
    onClose: fn(),
  },
  argTypes: {
    onClose: { control: false },
  },
}
