import { useArgs } from '@storybook/client-api'
import type { Meta, StoryObj } from '@storybook/react'
import Dropdown from '@components/inputs/dropdown/Dropdown'
import * as ListStories from '@stories/lists/List.stories'

const meta = {
  title: 'Components/Inputs/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

const selectedOptions: Array<string> = ['ANY']

export const SingleSelection: Story = {
  args: {
    id: 'dropdown-button',
    options: { ...ListStories.FourOptionsList.args.options },
    selected: 'OPTION_1',
    alignment: 'LEFT',
    pin: 'NONE',
    isNew: false,
    isBlocked: false,
    isDisabled: false,
  },
  argTypes: {
    containerId: { control: false },
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

export const ManyOptionsSelection: Story = {
  decorators: [
    (Story) => (
      <div
        id="dropdown-container"
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
    id: 'dropdown-button',
    options: { ...ListStories.FourOptionsList.args.options },
    selected: 'OPTION_1',
    alignment: 'LEFT',
    pin: 'NONE',
    isNew: false,
    isBlocked: false,
    isDisabled: false,
    containerId: 'dropdown-container',
  },
  argTypes: {
    containerId: { control: false },
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
            type: 'OPTION',
            action: onChange,
          },
          {
            label: 'Option 2',
            value: 'OPTION_2',
            type: 'OPTION',
            action: onChange,
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
          {
            label: 'Option 5',
            value: 'OPTION_5',
            type: 'OPTION',
            action: onChange,
          },
          {
            label: 'Option 6',
            value: 'OPTION_6',
            type: 'OPTION',
            action: onChange,
          },
          {
            label: 'Option 7',
            value: 'OPTION_7',
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
            label: 'Option 8',
            value: 'OPTION_8',
            type: 'OPTION',
            action: onChange,
          },
          {
            label: 'Option 9',
            value: 'OPTION_9',
            type: 'OPTION',
            action: onChange,
          },
        ]}
        selected={argsState.selected}
      />
    )
  },
}

export const MultipleSelection: Story = {
  args: {
    id: 'dropdown-button',
    options: { ...ListStories.FourOptionsList.args.options },
    selected: 'ANY',
    alignment: 'LEFT',
    isNew: false,
    isDisabled: false,
  },
  argTypes: {
    containerId: { control: false },
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
      const value = (e.target as HTMLInputElement).dataset.value ?? ''

      if (value === 'ANY') {
        selectedOptions.length = 0
        selectedOptions.push(value ?? '')
      }
      if (selectedOptions.includes(value))
        selectedOptions.splice(selectedOptions.indexOf(value), 1)
      else {
        if (selectedOptions.includes('ANY'))
          selectedOptions.splice(selectedOptions.indexOf('ANY'), 1)
        selectedOptions.push(value ?? '')
      }

      if (selectedOptions.length === 0) selectedOptions.push('ANY')

      updateArgs({
        selected: selectedOptions.join(', '),
      })
    }

    return (
      <Dropdown
        {...args}
        options={[
          {
            label: 'Any',
            value: 'ANY',
            type: 'OPTION',
            action: onChange,
          },
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
            action: onChange,
          },
          {
            label: 'Option 3',
            value: 'OPTION_3',
            type: 'OPTION',
            action: onChange,
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
