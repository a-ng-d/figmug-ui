import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Button } from '../../components/actions/button/Button'

const mock = fn()

const meta = {
  title: 'Example/Actions/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: { action: mock },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    type: 'primary',
    label: 'Primary action button',
    feature: 'PRIMARY_ACTION',
    hasMultipleActions: false,
    isLoading: false,
    isBlocked: false,
    isDisabled: false,
    isNew: false,
  },
  argTypes: {
    type: { control: false },
    icon: { control: false },
    state: { control: false },
    isLink: { control: false },
    url: { control: false },
  },
}

export const Secondary: Story = {
  args: {
    type: 'secondary',
    label: 'Secondary action button',
    feature: 'SECONDARY_ACTION',
    hasMultipleActions: false,
    isLoading: false,
    isBlocked: false,
    isDisabled: false,
    isNew: false,
  },
  argTypes: {
    type: { control: false },
    icon: { control: false },
    state: { control: false },
    isLink: { control: false },
    url: { control: false },
  },
}

export const Tertiary: Story = {
  args: {
    type: 'tertiary',
    label: 'Tertiary action button',
    feature: 'TERTIARY_ACTION',
    isLink: false,
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUjcmljayBhc3RsZXkgbmV2ZXIgZ29ubmEgZ2l2ZSB5b3UgdXA%3D',
    isLoading: false,
    isBlocked: false,
    isDisabled: false,
    isNew: false,
  },
  argTypes: {
    type: { control: false },
    icon: { control: false },
    state: { control: false },
    hasMultipleActions: { control: false },
  },
}

export const Icon: Story = {
  args: {
    type: 'icon',
    icon: 'adjust',
    feature: 'ACTION',
    isLoading: false,
    isDisabled: false,
  },
  argTypes: {
    type: { control: false },
    label: { control: false },
    state: { control: false },
    hasMultipleActions: { control: false },
    isBlocked: { control: false },
    isNew: { control: false },
    isLink: { control: false },
    url: { control: false },
  },
}

export const Compact: Story = {
  args: {
    type: 'compact',
    icon: 'lock-on',
    label: 'Compact action button',
    feature: 'ACTION',
    isDisabled: false,
  },
  argTypes: {
    type: { control: false },
    state: { control: false },
    hasMultipleActions: { control: false },
    isLoading: { control: false },
    isBlocked: { control: false },
    isDisabled: { control: false },
    isNew: { control: false },
    isLink: { control: false },
    url: { control: false },
  },
}
