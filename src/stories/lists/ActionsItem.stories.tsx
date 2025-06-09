import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import ActionsItem from '@components/lists/actions-item/ActionsItem'
import Button from '@components/actions/button/Button'

const mock = fn()

const meta = {
  title: 'Components/Lists/Actions Item',
  component: ActionsItem,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ActionsItem>

export default meta
type Story = StoryObj<typeof meta>

export const SingleAction: Story = {
  args: {
    id: '000000',
    src: 'https://i.pinimg.com/736x/27/38/a1/2738a18b59738718c9c2d7e5d05c9a8a.jpg',
    name: 'Action name',
    indicator: {
      label: 'New',
      status: 'ACTIVE',
    },
    description:
      'Lorem ipsum odor amet, consectetuer adipiscing elit. Justo aenean aptent nostra arcu sit sagittis ipsum gravida.',
    subdescription:
      'Justo aenean aptent nostra arcu sit sagittis ipsum gravida.',
    user: {
      avatar: 'https://www.gravatar.com/avatar',
      name: 'John Doe',
    },
    actionsSlot: (() => {
      return (
        <Button
          type="icon"
          icon="adjust"
        />
      )
    })(),
    isInteractive: false,
    action: mock,
  },
}

export const SeveralActions: Story = {
  args: {
    id: '000000',
    src: 'https://i.pinimg.com/736x/27/38/a1/2738a18b59738718c9c2d7e5d05c9a8a.jpg',
    name: 'Action name',
    indicator: {
      label: 'New',
      status: 'ACTIVE',
    },
    description:
      'Lorem ipsum odor amet, consectetuer adipiscing elit. Justo aenean aptent nostra arcu sit sagittis ipsum gravida.',
    subdescription:
      'Justo aenean aptent nostra arcu sit sagittis ipsum gravida.',
    user: {
      avatar: 'https://www.gravatar.com/avatar',
      name: 'John Doe',
    },
    actionsSlot: (() => {
      return (
        <>
          <Button
            type="icon"
            icon="adjust"
          />
          <Button
            type="secondary"
            label="Add to file"
          />
        </>
      )
    })(),
    isInteractive: false,
    action: mock,
  },
}

export const WithoutActionNorThumbnail: Story = {
  args: {
    id: '000000',
    name: 'Action name',
    indicator: {
      label: 'New',
      status: 'ACTIVE',
    },
    description:
      'Lorem ipsum odor amet, consectetuer adipiscing elit. Justo aenean aptent nostra arcu sit sagittis ipsum gravida.',
    subdescription:
      'Justo aenean aptent nostra arcu sit sagittis ipsum gravida.',
    complementSlot: (() => {
      return (
        <div
          style={{
            display: 'flex',
            gap: 'var(--size-xxsmall)',
          }}
        >
          <div
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '2px',
              outline: '1px solid rgba(0, 0, 0, 0.1)',
              outlineOffset: '-1px',
              backgroundColor: 'yellow',
            }}
          ></div>
          <div
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '2px',
              outline: '1px solid rgba(0, 0, 0, 0.1)',
              outlineOffset: '-1px',
              backgroundColor: 'red',
            }}
          ></div>
        </div>
      )
    })(),
    isInteractive: false,
    action: mock,
  },
  argTypes: {
    src: { control: false },
    actionsSlot: { control: false },
  },
}
