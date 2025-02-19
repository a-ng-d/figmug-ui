import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Button from '@components/actions/button/Button'
import Input from '@components/inputs/input/Input'
import DraggableItem from '@components/lists/draggable-item/DraggableItem'
import FormItem from '@components/slots/form-item/FormItem'

const mock = fn()

const meta = {
  title: 'Example/Lists/Draggable Item',
  component: DraggableItem,
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
} satisfies Meta<typeof DraggableItem>

export default meta
type Story = StoryObj<typeof meta>

export const ColorItem: Story = {
  args: {
    id: '000000',
    index: 0,
    primarySlot: (() => (
      <div className="draggable-item__param">
        <Input
          type="COLOR"
          value="#FF0000"
        />
      </div>
    ))(),
    actionsSlot: (() => (
      <Button
        type="icon"
        icon="visible"
        action={mock}
      />
    ))(),
    selected: false,
    guideAbove: false,
    guideBelow: false,
    onCancelSelection: mock,
    onChangeOrder: mock,
    onRemove: mock,
    onChangeSelection: mock,
    onDragChange: mock,
    onDropOutside: mock,
  },
  argTypes: {
    id: { control: false },
    index: { control: false },
    primarySlot: { control: false },
    secondarySlot: { control: false },
    onCancelSelection: { control: false },
    onChangeOrder: { control: false },
    onRemove: { control: false },
    onChangeSelection: { control: false },
    onDragChange: { control: false },
    onDropOutside: { control: false },
  },
}

export const RichColorItem: Story = {
  args: {
    id: '000000',
    index: 0,
    primarySlot: (() => (
      <div className="draggable-item__param">
        <Input
          type="COLOR"
          value="#FF0000"
        />
      </div>
    ))(),
    secondarySlot: (() => (
      <FormItem
        label="Description"
        id="type-description"
      >
        <Input
          id="type-description"
          type="LONG_TEXT"
          placeholder="Type something"
        />
      </FormItem>
    ))(),
    selected: false,
    guideAbove: false,
    guideBelow: false,
    onCancelSelection: mock,
    onChangeOrder: mock,
    onRemove: mock,
    onChangeSelection: mock,
    onDragChange: mock,
    onDropOutside: mock,
  },
  argTypes: {
    id: { control: false },
    index: { control: false },
    primarySlot: { control: false },
    secondarySlot: { control: false },
    onCancelSelection: { control: false },
    onChangeOrder: { control: false },
    onRemove: { control: false },
    onChangeSelection: { control: false },
    onDragChange: { control: false },
    onDropOutside: { control: false },
  },
}
