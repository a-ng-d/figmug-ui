import { SyntheticEvent } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useArgs } from '@storybook/preview-api'
import { Input } from '../../components/inputs/input/Input'

const meta = {
  title: 'Example/Inputs/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onConfirm: fn(),
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const ColorPicker: Story = {
  args: {
    id: 'specific-color-selection',
    type: 'COLOR',
    value: '#87ebe7',
    feature: 'PICK_COLOR',
    isAutoFocus: false,
    isBlocked: false,
    isDisabled: false,
    isNew: false,
  },
  argTypes: {
    type: { control: false },
    value: { control: 'color' },
    icon: { control: false },
    state: { control: false },
    placeholder: { control: false },
    charactersLimit: { control: false },
    min: { control: false },
    max: { control: false },
    step: { control: false },
  },
  render: (args) => {
    const [argsState, updateArgs] = useArgs<{
      value: string
    }>()

    const onChange = (e: SyntheticEvent) => {
      updateArgs({
        value: (e.target as HTMLInputElement).value,
      })
      fn()
    }

    return (
      <Input
        {...args}
        value={argsState.value}
        onChange={onChange}
      />
    )
  },
}

export const NumericStepper: Story = {
  args: {
    id: 'specific-number-selection',
    type: 'NUMBER',
    icon: {
      type: 'LETTER',
      value: 'H',
    },
    value: '20',
    min: '0',
    max: '100',
    step: '1',
    feature: 'ADJUST_NUMBER',
    isAutoFocus: false,
    isBlocked: false,
    isDisabled: false,
    isNew: false,
  },
  argTypes: {
    type: { control: false },
    value: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    state: { control: false },
    placeholder: { control: false },
    charactersLimit: { control: false },
  },
  render: (args) => {
    const [argsState, updateArgs] = useArgs<{
      value: string
    }>()

    const onChange = (e: SyntheticEvent) => {
      updateArgs({
        value: (e.target as HTMLInputElement).value,
      })
      fn()
    }

    return (
      <Input
        {...args}
        value={argsState.value}
        onChange={onChange}
      />
    )
  },
}

export const ShortText: Story = {
  args: {
    id: 'short-text-typing',
    type: 'TEXT',
    placeholder: 'Type something (64 characters max.)…',
    value: '',
    charactersLimit: 64,
    feature: 'TYPE_SHORT_TEXT',
    state: 'DEFAULT',
    isAutoFocus: false,
    isBlocked: false,
    isDisabled: false,
    isNew: false,
  },
  argTypes: {
    type: { control: false },
    charactersLimit: { control: 'number' },
    state: { control: 'select', options: ['DEFAULT', 'ERROR'] },
  },
  render: (args) => {
    const [argsState, updateArgs] = useArgs<{
      value: string
    }>()

    const onChange = (e: SyntheticEvent) => {
      updateArgs({
        value: (e.target as HTMLInputElement).value,
      })
      fn()
    }

    return (
      <Input
        {...args}
        value={argsState.value}
        onChange={onChange}
      />
    )
  },
}

export const LongText: Story = {
  args: {
    id: 'long-text-typing',
    type: 'LONG_TEXT',
    placeholder: 'Type something',
    value: '',
    feature: 'TYPE_SHORT_TEXT',
    state: 'DEFAULT',
    isAutoFocus: false,
    isBlocked: false,
    isDisabled: false,
    isNew: false,
  },
  argTypes: {
    type: { control: false },
    state: { control: 'select', options: ['DEFAULT', 'ERROR'] },
  },
  render: (args) => {
    const [argsState, updateArgs] = useArgs<{
      value: string
    }>()

    const onChange = (e: SyntheticEvent) => {
      updateArgs({
        value: (e.target as HTMLInputElement).value,
      })
      fn()
    }

    return (
      <Input
        {...args}
        value={argsState.value}
        onChange={onChange}
      />
    )
  },
}

export const CodeSnippet: Story = {
  args: {
    id: 'code-snippet-dragging',
    type: 'CODE',
    value: `:root {\n  /* Rectangle 1 */\n  --rectangle-1-source: rgb(217,217,217);\n  --rectangle-1-900: rgb(57,57,57);\n}`,
    isAutoFocus: false,
    isBlocked: false,
    isDisabled: false,
    isNew: false,
  },
  argTypes: {
    type: { control: false },
    placeholder: { control: false },
    state: { control: false },
  },
  render: (args) => {
    const [argsState, updateArgs] = useArgs<{
      value: string
    }>()

    const onChange = (e: SyntheticEvent) => {
      updateArgs({
        value: (e.target as HTMLInputElement).value,
      })
      fn()
    }

    return (
      <Input
        {...args}
        value={argsState.value}
        onChange={onChange}
      />
    )
  },
}