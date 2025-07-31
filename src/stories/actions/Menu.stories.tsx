import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/internal/test'
import { useArgs } from '@storybook/client-api'
import * as ListStories from '@stories/lists/List.stories.tsx'
import Menu from '@components/actions/menu/Menu'

const meta = {
  title: 'Components/Actions/Multiple Actions',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const DropdownIcon: Story = {
  args: {
    id: 'dropdown-icon',
    type: 'ICON',
    icon: 'adjust',
    state: 'DEFAULT',
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
        type: 'GROUP',
        children: [
          {
            label: 'Option 2.1',
            value: 'OPTION_2.1',
            type: 'OPTION',
            action: fn(),
          },
          {
            label: 'Option 2.2',
            value: 'OPTION_2.2',
            type: 'OPTION',
            action: fn(),
          },
        ],
      },
      {
        label: 'Option 3',
        value: 'OPTION_3',
        type: 'OPTION',
        action: fn(),
      },
      {
        type: 'SEPARATOR',
      },
      {
        label: 'Title',
        type: 'TITLE',
      },
      {
        label: 'Option 4',
        value: 'OPTION_4',
        type: 'OPTION',
        action: fn(),
      },
    ],
    selected: 'OPTION_1',
    alignment: 'BOTTOM_LEFT',
    isBlocked: false,
    isNew: false,
  },
  argTypes: {
    type: { control: false },
    label: { control: false },
  },
  render: (args) => {
    const [argsState, updateArgs] = useArgs<{
      selected: string
    }>()

    const onChange = (
      e:
        | React.MouseEvent<HTMLLIElement, MouseEvent>
        | React.KeyboardEvent<HTMLLIElement>
    ) => {
      updateArgs({
        selected: (e.target as HTMLInputElement).dataset.value,
      })
    }

    return (
      <Menu
        {...args}
        options={[
          {
            label: 'Option 1',
            value: 'OPTION_1',
            type: 'OPTION',
            action: onChange,
          },
          {
            label: 'Option 2',
            value: 'OPTION_2',
            type: 'GROUP',
            children: [
              {
                label: 'Option 2.1',
                value: 'OPTION_2.1',
                type: 'OPTION',
                action: onChange,
              },
              {
                label: 'Option 2.2',
                value: 'OPTION_2.2',
                type: 'OPTION',
                action: onChange,
              },
            ],
          },
          {
            label: 'Option 3',
            value: 'OPTION_3',
            type: 'OPTION',
            action: onChange,
          },
          {
            type: 'SEPARATOR',
          },
          {
            label: 'Title',
            type: 'TITLE',
          },
          {
            label: 'Option 4',
            value: 'OPTION_4',
            type: 'OPTION',
            action: onChange,
          },
        ]}
        selected={argsState.selected}
      />
    )
  },
}

export const MultipleActionsIconButton: Story = {
  args: {
    id: 'dropdown-icon',
    type: 'ICON',
    icon: 'ellipses',
    state: 'DEFAULT',
    options: [...ListStories.FourOptionsList.args.options],
    alignment: 'BOTTOM_LEFT',
    helper: {
      label: 'Run actions',
    },
    isBlocked: false,
    isNew: false,
  },
  argTypes: {
    type: { control: false },
    label: { control: false },
    selected: { control: false },
  },
}

export const MultipleActionsButton: Story = {
  args: {
    id: 'dropdown-icon',
    type: 'PRIMARY',
    label: 'Run',
    state: 'DEFAULT',
    options: [...ListStories.FourOptionsList.args.options],
    alignment: 'BOTTOM_LEFT',
    isNew: false,
    isBlocked: false,
  },
  argTypes: {
    type: { control: false },
    icon: { control: false },
    selected: { control: false },
  },
}
