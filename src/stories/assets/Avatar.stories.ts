import type { Meta, StoryObj } from '@storybook/react'
import Avatar from '../../components/assets/avatar/avatar'

const meta = {
  title: 'Example/Assets/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const DefinedUser: Story = {
  args: {
    avatar:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2343&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fullName: 'Aurélien Grimaud',
    isInverted: false,
  },
}

export const UndefinedUser: Story = {
  args: {
    isInverted: false,
  },
  argTypes: {
    avatar: { control: false },
    fullName: { control: false },
  },
}
