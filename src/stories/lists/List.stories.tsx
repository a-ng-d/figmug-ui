import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import ActionsList from '@components/lists/actions-list/ActionsList'

const meta = {
  title: 'Components/Lists/Actions List',
  component: ActionsList,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ActionsList>

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

export const LongListWithScroll: Story = {
  decorators: [
    (Story) => (
      <div
        id="list-container"
        style={{
          width: '224px',
          height: '224px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
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
      {
        label: 'Option 5',
        value: 'OPTION_5',
        type: 'OPTION',
        action: fn(),
      },
      {
        label: 'Option 6',
        value: 'OPTION_6',
        type: 'OPTION',
        action: fn(),
      },
      {
        label: 'Option 7',
        value: 'OPTION_7',
        type: 'OPTION',
        action: fn(),
      },
      {
        label: 'Option 8',
        value: 'OPTION_8',
        type: 'OPTION',
        action: fn(),
      },
      {
        label: 'Option 9',
        value: 'OPTION_9',
        type: 'OPTION',
        action: fn(),
      },
      {
        label: 'Option 10',
        value: 'OPTION_10',
        type: 'OPTION',
        action: fn(),
      },
      {
        label: 'Option 11',
        value: 'OPTION_11',
        type: 'OPTION',
        action: fn(),
      },
      {
        label: 'Option 12',
        value: 'OPTION_12',
        type: 'OPTION',
        action: fn(),
      },
    ],
    selected: 'OPTION_1',
    shouldScroll: true,
    containerId: 'list-container',
  },
  argTypes: {
    direction: { control: false },
  },
}
