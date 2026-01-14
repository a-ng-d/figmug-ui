import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
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
  render: (args) => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      <KeyboardShortcutItem {...args} />
    </ul>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText(args.label)
    await expect(label).toBeInTheDocument()
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
  render: (args) => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      <KeyboardShortcutItem {...args} />
    </ul>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    
    const label = canvas.getByText(args.label)
    await expect(label).toBeInTheDocument()
    
    const shift = canvas.getByText('⇧')
    await expect(shift).toBeInTheDocument()
    
    const tab = canvas.getByText('⇥ Tab')
    await expect(tab).toBeInTheDocument()
  },
}

export const SeveralComboKeys: Story = {
  args: {
    label: 'Select previous',
    shortcuts: [['⇧', '⇥ Tab'], ['⇥ Tab']],
    separator: 'or',
  },
  render: (args) => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      <KeyboardShortcutItem {...args} />
    </ul>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    
    const label = canvas.getByText(args.label)
    await expect(label).toBeInTheDocument()
    
    const separator = canvas.getByText('or')
    await expect(separator).toBeInTheDocument()
    
    const tabKeys = canvas.getAllByText('⇥ Tab')
    await expect(tabKeys.length).toBe(2)
    
    const shift = canvas.getByText('⇧')
    await expect(shift).toBeInTheDocument()
  },
}
