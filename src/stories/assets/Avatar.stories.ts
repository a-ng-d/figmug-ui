import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import Avatar from '@components/assets/avatar/Avatar'

const meta = {
  title: 'Components/Assets/Avatar',
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
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole('img')
    await expect(img).toBeInTheDocument()
    if (args.fullName) await expect(img).toHaveAttribute('alt', args.fullName)
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole('img')
    await expect(img).toBeInTheDocument()
    await expect(img).toHaveAttribute('alt', 'John Doe')
  },
}
