import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/client-api'
import { Dropdown } from '../../components/inputs/dropdown/Dropdown'
import * as ListStories from '../lists/List.stories'

const meta = {
  title: 'Example/Inputs/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Button: Story = {
  args: {
    id: 'dropdown-button',
    options: { ...ListStories.FourOptionsList.args.options },
    selected: 'OPTION_1',
    alignment: 'LEFT',
    isNew: false,
  },
  argTypes: {
    parentClassName: { control: false },
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
      <Dropdown
        {...args}
        options={[
          {
            label: 'Option 1',
            value: 'OPTION_1',
            feature: null,
            position: 0,
            type: 'OPTION',
            isActive: true,
            isBlocked: false,
            isNew: false,
            children: [],
            action: onChange,
          },
          {
            label: 'Option 2',
            value: 'OPTION_2',
            feature: null,
            position: 1,
            type: 'OPTION',
            isActive: true,
            isBlocked: false,
            isNew: false,
            children: [],
            action: onChange,
          },
          {
            label: 'Option 3',
            value: 'OPTION_3',
            feature: null,
            position: 2,
            type: 'OPTION',
            isActive: true,
            isBlocked: false,
            isNew: false,
            children: [],
            action: onChange,
          },
          {
            label: 'Option 4',
            value: 'OPTION_4',
            feature: null,
            position: 3,
            type: 'OPTION',
            isActive: true,
            isBlocked: false,
            isNew: false,
            children: [],
            action: onChange,
          },
        ]}
        selected={argsState.selected}
      />
    )
  },
}
