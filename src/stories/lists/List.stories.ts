import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { List } from '../../components/lists/list/List'

const meta = {
  title: 'Example/Lists/List',
  component: List,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof List>

export default meta
type Story = StoryObj<typeof meta>

export const FourOptionsList: Story = {
  args: {
    options: [
      {
        label: 'Option 1',
        value: null,
        feature: null,
        position: 0,
        type: 'OPTION',
        isActive: true,
        isBlocked: false,
        isNew: false,
        children: [],
        action: fn(),
      },
      {
        label: 'Option 2',
        value: null,
        feature: null,
        position: 1,
        type: 'OPTION',
        isActive: true,
        isBlocked: false,
        isNew: false,
        children: [],
        action: fn(),
      },
      {
        label: 'Option 3',
        value: null,
        feature: null,
        position: 2,
        type: 'OPTION',
        isActive: true,
        isBlocked: false,
        isNew: false,
        children: [],
        action: fn(),
      },
      {
        label: 'Option 4',
        value: null,
        feature: null,
        position: 3,
        type: 'OPTION',
        isActive: true,
        isBlocked: false,
        isNew: false,
        children: [],
        action: fn(),
      },
    ],
  },
  argTypes: {
    direction: { control: false },
    selected: { control: false },
  },
}
