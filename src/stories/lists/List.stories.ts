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
        value: 'OPTION_1',
        type: 'OPTION',
        action: fn(),
      },
      {
        label: 'Option 2',
        value: 'OPTION_2',
        type: 'OPTION',
        action: fn(),
      },
      {
        label: 'Option 3',
        value: 'OPTION_3',
        type: 'OPTION',
        action: fn(),
      },
      {
        label: 'Option 4',
        value: 'OPTION_4',
        type: 'OPTION',
        action: fn(),
      },
    ],
    selected: 'OPTION_1',
  },
  argTypes: {
    direction: { control: false },
  },
}

export const FourOptionsListWithSeparator: Story = {
  args: {
    options: [
      {
        label: 'Group 1',
        type: 'TITLE',
      },
      {
        label: 'Option 1',
        value: 'OPTION_1',
        type: 'OPTION',
        action: fn(),
      },
      {
        label: 'Option 2',
        value: 'OPTION_1',
        type: 'OPTION',
        action: fn(),
      },
      {
        type: 'SEPARATOR',
      },
      {
        label: 'Group 2',
        type: 'TITLE',
        action: fn(),
      },
      {
        label: 'Option 3',
        value: 'OPTION_3',
        type: 'OPTION',
        action: fn(),
      },
      {
        label: 'Option 4',
        value: 'OPTION_4',
        type: 'OPTION',
        action: fn(),
      },
    ],
  },
  argTypes: {
    direction: { control: false },
    selected: { control: false },
  },
}

export const FourOptionsListInGroups: Story = {
  args: {
    options: [
      {
        label: 'Group 1',
        value: 'GROUP_1',
        type: 'OPTION',
        children: [
          {
            label: 'Option 1',
            value: 'OPTION_A_1',
            type: 'OPTION',
            action: fn(),
          },
          {
            label: 'Option 2',
            value: 'OPTION_A_2',
            type: 'OPTION',
            action: fn(),
          },
          {
            label: 'Option 3',
            value: 'OPTION_A_3',
            type: 'OPTION',
            action: fn(),
          },
          {
            label: 'Option 4',
            value: 'OPTION_A_4',
            type: 'OPTION',
            action: fn(),
          },
        ],
      },
      {
        label: 'Group 2',
        value: 'GROUP_2',
        type: 'OPTION',
        children: [
          {
            label: 'Option 1',
            value: 'OPTION_B_1',
            type: 'OPTION',
            action: fn(),
          },
          {
            label: 'Option 2',
            value: 'OPTION_B_2',
            type: 'OPTION',
            action: fn(),
          },
          {
            label: 'Option 3',
            value: 'OPTION_B_3',
            type: 'OPTION',
            action: fn(),
          },
          {
            label: 'Option 4',
            value: 'OPTION_B_4',
            type: 'OPTION',
            action: fn(),
          },
        ],
      },
    ],
  },
  argTypes: {
    direction: { control: false },
    selected: { control: false },
  },
}
