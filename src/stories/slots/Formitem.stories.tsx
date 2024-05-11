import type { Meta, StoryObj } from '@storybook/react'
import { FormItem } from '../../components/slots/form-item/FormItem'
import { Input } from '../../components/inputs/input/Input'

const meta = {
  title: 'Example/Slots/Form item',
  component: FormItem,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FormItem>

export default meta
type Story = StoryObj<typeof meta>

export const TextInputItem: Story = {
  args: {
    id: 'text-input-item',
    label: 'Type your name',
    helper: {
      type: 'INFO',
      message: 'First name followed by your last name',
    },
    shouldFill: false,
    isBlocked: false,
    isNew: false,
    children: (
      <Input
        type="TEXT"
        value="Jean-Michel Avous"
      />
    ),
  },
  argTypes: {},
}
