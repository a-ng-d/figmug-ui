import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/client-api'
import { fn } from '@storybook/test'
import { SortableList } from '../../components/lists/sortable-list/SortableList'
import { Input } from '../../components/inputs/input/Input'
import { Button } from '../../components/actions/button/Button'
import { FormItem } from '../../components/slots/form-item/FormItem'

const mock = fn()

interface ListItem {
  id: string
  color: string
  description?: string
}

const meta: Meta<typeof SortableList> = {
  title: 'Example/Lists/SortableList',
  component: SortableList,
  decorators: [
    (Story) => (
      <div style={{ width: '296px', height: '148px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SortableList>

export default meta
type Story = StoryObj<typeof meta>

export const SimpleColors: Story = {
  args: {
    data: [
      {
        id: '000000',
        color: '#FF0000',
      },
      {
        id: '111111',
        color: '#00FF00',
      },
      {
        id: '222222',
        color: '#0000FF',
      },
      {
        id: '333333',
        color: '#000000',
      },
      {
        id: '444444',
        color: '#FFFFFF',
      },
    ] as Array<ListItem>,
    primarySlot: [<div></div>],
    actionsSlot: [<div></div>],
    isScrollable: false,
    onChangeSortableList: mock,
  },
  argTypes: {
    primarySlot: { control: false },
    secondarySlot: { control: false },
    actionsSlot: { control: false },
    onChangeSortableList: { control: false },
  },
  render: (args) => {
    const [argsState, updateArgs] = useArgs<{
      data: Array<ListItem>
    }>()

    const onChange = (e: Array<ListItem>) => {
      updateArgs({
        data: e,
      })
      args.onChangeSortableList?.(e)
    }

    return (
      <SortableList<ListItem>
        {...args}
        data={argsState.data}
        primarySlot={argsState.data.map((item) => (
          <Input
            type="COLOR"
            value={item.color}
          />
        ))}
        actionsSlot={argsState.data.map(() => (
          <Button
            type="icon"
            icon="visible"
            action={mock}
          />
        ))}
        onChangeSortableList={onChange}
      />
    )
  },
}

export const RichColors: Story = {
  args: {
    data: [
      {
        id: '000000',
        color: '#FF0000',
        description: 'Some description',
      },
      {
        id: '111111',
        color: '#00FF00',
        description: 'Some description',
      },
      {
        id: '222222',
        color: '#0000FF',
        description: 'Some description',
      },
      {
        id: '333333',
        color: '#000000',
        description: '',
      },
      {
        id: '444444',
        color: '#FFFFFF',
        description: 'Some description',
      },
      {
        id: '555555',
        color: '#123456',
        description: '',
      },
      {
        id: '666666',
        color: '#654321',
        description: 'Some description',
      },
    ] as Array<ListItem>,
    primarySlot: [<div></div>],
    isScrollable: false,
    onChangeSortableList: mock,
  },
  argTypes: {
    primarySlot: { control: false },
    secondarySlot: { control: false },
    actionsSlot: { control: false },
    onChangeSortableList: { control: false },
  },
  render: (args) => {
    const [argsState, updateArgs] = useArgs<{
      data: Array<ListItem>
    }>()

    const onChange = (e: Array<ListItem>) => {
      updateArgs({
        data: e,
      })
      args.onChangeSortableList?.(e)
    }

    return (
      <SortableList<ListItem>
        {...args}
        data={argsState.data}
        primarySlot={argsState.data.map((item) => (
          <Input
            type="COLOR"
            value={item.color}
          />
        ))}
        secondarySlot={argsState.data.map((item) => (
          <FormItem
            label="Description"
            id="type-description"
          >
            <Input
              id="type-description"
              type="LONG_TEXT"
              placeholder="Type something"
              value={item.description}
            />
          </FormItem>
        ))}
        onChangeSortableList={onChange}
      />
    )
  },
}
