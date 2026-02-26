import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import SimpleItem from '@components/slots/simple-item/SimpleItem'
import Input from '@components/inputs/input/Input'
import Button from '@components/actions/button/Button'

const mock = fn()

const meta = {
  title: 'Patterns/Slots/Simple Item',
  component: SimpleItem,
  decorators: [
    (Story) => (
      <div style={{ width: '296px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SimpleItem>

export default meta
type Story = StoryObj<typeof meta>

export const ColorItem: Story = {
  args: {
    id: '000000',
    leftPartSlot: (() => (
      <div className="draggable-item__param">
        <Input
          type="COLOR"
          value="#FF0000"
        />
      </div>
    ))(),
    rightPartSlot: (() => (
      <Button
        type="icon"
        icon="visible"
        action={mock}
      />
    ))(),
    isListItem: false,
  },
  argTypes: {
    id: { control: false },
  },
}
