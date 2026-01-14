import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { useArgs } from 'storybook/preview-api'
import React from 'react'
import FormItem from '@components/slots/form-item/FormItem'
import SortableList from '@components/lists/sortable-list/SortableList'
import Input from '@components/inputs/input/Input'
import Message from '@components/dialogs/message/Message'
import Button from '@components/actions/button/Button'

const mock = fn()

interface ListItem {
  id: string
  color: string
  description?: string
}

const meta: Meta<typeof SortableList> = {
  title: 'Components/Lists/Sortable List',
  component: SortableList,
  decorators: [
    (Story) => (
      <div style={{ width: '296px', height: 'auto' }}>
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
    emptySlot: [<div></div>],
    canBeEmpty: true,
    isScrollable: false,
    isBlocked: false,
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

    const onRemove = (
      e: React.MouseEvent<Element> | React.KeyboardEvent<Element>
    ) => {
      let id: string | null
      const element: HTMLElement | null = (
        e.currentTarget as HTMLElement
      ).closest('.draggable-item')

      element !== null ? (id = element.getAttribute('data-id')) : (id = null)

      onChange(argsState.data.filter((item) => item.id !== id))
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
        emptySlot={
          <Message
            icon="info"
            messages={['No colors available']}
          />
        }
        onChangeSortableList={onChange}
        onRemoveItem={onRemove}
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
    actionsSlot: [<div></div>],
    emptySlot: [<div></div>],
    canBeEmpty: true,
    isScrollable: false,
    isBlocked: false,
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

    const onRemove = (
      e: React.MouseEvent<Element> | React.KeyboardEvent<Element>
    ) => {
      let id: string | null
      const element: HTMLElement | null = (
        e.currentTarget as HTMLElement
      ).closest('.draggable-item')

      element !== null ? (id = element.getAttribute('data-id')) : (id = null)

      onChange(argsState.data.filter((item) => item.id !== id))
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
        secondarySlot={argsState.data.map((item) => {
          return {
            title: item.id,
            node: (
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
            ),
          }
        })}
        emptySlot={
          <Message
            icon="info"
            messages={['No colors available']}
          />
        }
        onChangeSortableList={onChange}
        onRemoveItem={onRemove}
        onRefoldOptions={() => {}}
      />
    )
  },
}
