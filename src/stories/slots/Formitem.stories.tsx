import type { Meta, StoryObj } from '@storybook/react-vite'
import FormItem from '@components/slots/form-item/FormItem'
import Input from '@components/inputs/input/Input'

const meta = {
  title: 'Components/Slots/Form Item',
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
    isMultiLine: false,
    isBlocked: false,
    isNew: false,
    children: (
      <Input
        id="text-input-item"
        type="TEXT"
        value=""
        placeholder="Type your name"
        isBlocked={true}
        warning={{
          label: 'This field is blocked',
        }}
      />
    ),
  },
  argTypes: {},
}
