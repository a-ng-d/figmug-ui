import { SyntheticEvent } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useArgs } from '@storybook/preview-api'
import { Select } from '../../components/inputs/select/Select'

const mock = fn()

const meta = {
  title: 'Example/Inputs/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  args: { onChange: mock },
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
  render: function Render(args) {
    const [{ isChecked }, updateArgs] = useArgs()

    const onChange = () => {
      updateArgs({ isChecked: !isChecked })
      mock
    }

    return (
      <Select
        {...args}
        isChecked={isChecked}
        onChange={onChange}
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
  render: function Render(args) {
    const [{ isChecked }, updateArgs] = useArgs()

    const onChange = () => {
      updateArgs({ isChecked: !isChecked })
      mock
    }

    return (
      <Select
        {...args}
        isChecked={isChecked}
        onChange={onChange}
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
  render: function Render(args) {
    const [{ isChecked }, updateArgs] = useArgs()

    const onChange = () => {
      updateArgs({ isChecked: !isChecked })
      mock
    }

    return (
      <Select
        {...args}
        isChecked={isChecked}
        onChange={onChange}
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
    onChange: { control: false },
  },
  render: function Render(args) {
    const [{ isCheckedA }, updateArgsA] = useArgs()
    const [{ isCheckedB }, updateArgsB] = useArgs()
    const [{ isCheckedC }, updateArgsC] = useArgs()

    const onChangeA = () => {
      updateArgsA({ isCheckedA: !isCheckedA })
      mock
    }
    const onChangeB = () => {
      updateArgsB({ isCheckedB: !isCheckedB })
      mock
    }
    const onChangeC = () => {
      updateArgsC({ isCheckedC: !isCheckedC })
      mock
    }

    return (
      <>
        <Select
          {...args}
          id="option-1"
          label="Option 1"
          name="option-1"
          isChecked={isCheckedA}
          onChange={onChangeA}
        />
        <Select
          {...args}
          id="option-2"
          label="Option 2"
          name="option-2"
          isChecked={isCheckedB}
          onChange={onChangeB}
        />
        <Select
          {...args}
          id="option-3"
          label="Option 3"
          name="option-3"
          isChecked={isCheckedC}
          onChange={onChangeC}
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
    onChange: { control: false },
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const onChange = (e: SyntheticEvent) => {
      updateArgs({ value: (e.target as HTMLInputElement).value })
      mock
    }

    return (
      <>
        <Select
          {...args}
          id="option-1"
          label="Option 1"
          name="option-1"
          value="option-1"
          isChecked={value === 'option-1'}
          onChange={onChange}
        />
        <Select
          {...args}
          id="option-2"
          label="Option 2"
          name="option-2"
          value="option-2"
          isChecked={value === 'option-2'}
          onChange={onChange}
        />
        <Select
          {...args}
          id="option-3"
          label="Option 3"
          name="option-3"
          value="option-3"
          isChecked={value === 'option-3'}
          onChange={onChange}
        />
      </>
    )
  },
}
