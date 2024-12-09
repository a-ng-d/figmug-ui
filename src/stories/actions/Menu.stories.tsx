import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/client-api'
import { Menu } from '../../components/actions/menu/Menu'
import * as ListStories from '../lists/List.stories'

const meta = {
  title: 'Example/Actions/Multiple Actions',
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
    options: { ...ListStories.FourOptionsList.args.options },
    selected: 'OPTION_1',
    alignment: 'BOTTOM_LEFT',
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
            type: 'OPTION',
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
    icon: 'ellipsis',
    state: 'DEFAULT',
    options: [...ListStories.FourOptionsList.args.options],
    alignment: 'BOTTOM_LEFT',
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
  },
  argTypes: {
    type: { control: false },
    icon: { control: false },
    selected: { control: false },
  },
}
