import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Button from '@components/actions/button/Button'
import Input from '@components/inputs/input/Input'
import SimpleItem from '@components/slots/simple-item/SimpleItem'

const mock = fn()

const meta = {
  title: 'Components/Slots/Simple Item',
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
  },
  argTypes: {
    id: { control: false },
  },
}
