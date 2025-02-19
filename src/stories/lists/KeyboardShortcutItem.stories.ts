import type { Meta, StoryObj } from '@storybook/react'
import KeyboardShortcutItem from '@components/lists/keyboard-shortcut-item/KeyboardShortcutItem'

const meta = {
  title: 'Components/Lists/Keyboard Shortcut Item',
  component: KeyboardShortcutItem,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof KeyboardShortcutItem>

export default meta
type Story = StoryObj<typeof meta>

export const SingleKey: Story = {
  args: {
    label: 'Save',
    shortcuts: [['↩ Enter']],
    separator: '',
  },
  argTypes: {
    separator: { control: false },
  },
}

export const ComboKeys: Story = {
  args: {
    label: 'Select previous',
    shortcuts: [['⇧', '⇥ Tab']],
    separator: '',
  },
  argTypes: {
    separator: { control: false },
  },
}

export const SeveralComboKeys: Story = {
  args: {
    label: 'Select previous',
    shortcuts: [['⇧', '⇥ Tab'], ['⇥ Tab']],
    separator: 'or',
  },
}
