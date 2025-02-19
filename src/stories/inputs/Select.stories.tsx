import { useArgs } from '@storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { ChangeEvent } from 'react'
import Select from '@components/inputs/select/Select'

const meta: Meta<typeof Select> = {
  title: 'Components/Inputs/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  args: { action: fn() },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const CheckBox: Story = {
  args: {
    id: 'check-input',
    type: 'CHECK_BOX',
    label: 'Action label',
    name: 'check-input',
    feature: 'CHECK_INPUT',
    isChecked: false,
    isBlocked: false,
    isDisabled: false,
    isNew: false,
  },
  argTypes: {
    type: { control: false },
    value: { control: false },
  },
  render: (args) => {
    const [argsState, updateArgs] = useArgs<{
      isChecked: boolean
    }>()

    const action = (e: ChangeEvent<HTMLInputElement>) => {
      updateArgs({
        isChecked: !argsState.isChecked,
      })
      args.action(e)
    }

    return (
      <Select
        {...args}
        isChecked={argsState.isChecked}
        action={action}
      />
    )
  },
}

export const RadioButton: Story = {
  args: {
    id: 'radio-input',
    type: 'RADIO_BUTTON',
    label: 'Action label',
    name: 'radio-input',
    feature: 'RADIO_INPUT',
    isChecked: false,
    isBlocked: false,
    isDisabled: false,
    isNew: false,
  },
  argTypes: {
    type: { control: false },
    value: { control: false },
  },
  render: (args) => {
    const [argsState, updateArgs] = useArgs<{
      isChecked: boolean
    }>()

    const action = (e: ChangeEvent<HTMLInputElement>) => {
      updateArgs({
        isChecked: !argsState.isChecked,
      })
      args.action(e)
    }

    return (
      <Select
        {...args}
        isChecked={argsState.isChecked}
        action={action}
      />
    )
  },
}

export const SwitchButton: Story = {
  args: {
    id: 'switch-input',
    type: 'SWITCH_BUTTON',
    label: 'Action label',
    name: 'switch-input',
    feature: 'SWITCH_INPUT',
    isChecked: false,
    isBlocked: false,
    isDisabled: false,
    isNew: false,
  },
  argTypes: {
    type: { control: false },
    value: { control: false },
  },
  render: (args) => {
    const [argsState, updateArgs] = useArgs<{
      isChecked: boolean
    }>()

    const action = (e: ChangeEvent<HTMLInputElement>) => {
      updateArgs({
        isChecked: !argsState.isChecked,
      })
      args.action(e)
    }

    return (
      <Select
        {...args}
        isChecked={argsState.isChecked}
        action={action}
      />
    )
  },
}

export const MultipleChoices: Story = {
  args: {
    id: 'check-input',
    type: 'CHECK_BOX',
    name: 'check-input',
    feature: 'CHECK_INPUT',
    isChecked: false,
    isBlocked: false,
    isDisabled: false,
    isNew: false,
  },
  argTypes: {
    id: { control: false },
    label: { control: false },
    feature: { control: false },
    name: { control: false },
    type: { control: false },
    value: { control: false },
    isChecked: { control: false },
    isBlocked: { control: false },
    isDisabled: { control: false },
    isNew: { control: false },
    action: { control: false },
  },
  render: (args) => {
    const [argsState, updateArgs] = useArgs<{
      optionA: boolean
      optionB: boolean
      optionC: boolean
    }>()

    const action = (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement
      if (target.name === 'option-1')
        updateArgs({
          optionA: !argsState.optionA,
        })
      if (target.name === 'option-2')
        updateArgs({
          optionB: !argsState.optionB,
        })
      if (target.name === 'option-3')
        updateArgs({
          optionC: !argsState.optionC,
        })

      args.action(e)
    }

    return (
      <>
        <Select
          {...args}
          id="option-1"
          label="Option 1"
          name="option-1"
          isChecked={argsState.optionA}
          action={action}
        />
        <Select
          {...args}
          id="option-2"
          label="Option 2"
          name="option-2"
          isChecked={argsState.optionB}
          action={action}
        />
        <Select
          {...args}
          id="option-3"
          label="Option 3"
          name="option-3"
          isChecked={argsState.optionC}
          action={action}
        />
      </>
    )
  },
}

export const SingleChoice: Story = {
  args: {
    id: 'radio-input',
    type: 'RADIO_BUTTON',
    name: 'radio-input',
    value: 'option-1',
    feature: 'RADIO_INPUT',
    isChecked: false,
    isBlocked: false,
    isDisabled: false,
    isNew: false,
  },
  argTypes: {
    id: { control: false },
    label: { control: false },
    feature: { control: false },
    name: { control: false },
    type: { control: false },
    value: { control: false },
    isChecked: { control: false },
    isBlocked: { control: false },
    isDisabled: { control: false },
    isNew: { control: false },
    action: { control: false },
  },
  render: (args) => {
    const [argsState, updateArgs] = useArgs<{
      value: string
    }>()

    const action = (e: ChangeEvent<HTMLInputElement>) => {
      updateArgs({
        value: (e.target as HTMLInputElement).value,
      })
      args.action(e)
    }

    return (
      <>
        <Select
          {...args}
          id="option-1"
          label="Option 1"
          name="option-1"
          value="option-1"
          isChecked={argsState.value === 'option-1'}
          action={action}
        />
        <Select
          {...args}
          id="option-2"
          label="Option 2"
          name="option-2"
          value="option-2"
          isChecked={argsState.value === 'option-2'}
          action={action}
        />
        <Select
          {...args}
          id="option-3"
          label="Option 3"
          name="option-3"
          value="option-3"
          isChecked={argsState.value === 'option-3'}
          action={action}
        />
      </>
    )
  },
}
