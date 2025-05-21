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

export const InfoNotification: Story = {
  args: {
    type: 'INFO',
    message: 'The file has been saved successfully',
    onClose: fn(),
  },
  argTypes: {
    onClose: { control: false },
  },
}
