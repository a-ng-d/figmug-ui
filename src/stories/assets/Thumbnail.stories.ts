import type { Meta, StoryObj } from '@storybook/react-vite'
import Thumbnail from '@components/assets/thumbnail/Thumbnail'

const meta = {
  title: 'Components/Assets/Thumbnail',
  component: Thumbnail,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Thumbnail>

export default meta
type Story = StoryObj<typeof meta>

export const ExternalImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2343&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    width: '300px',
    height: '200px',
  },
}
