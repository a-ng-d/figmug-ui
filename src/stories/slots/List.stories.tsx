import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import List from '@components/slots/list/List'
import ActionsItem from '@components/lists/actions-item/ActionsItem'
import SemanticMessage from '@components/dialogs/semantic-message/SemanticMessage'
import Button from '@components/actions/button/Button'

const meta = {
  title: 'Patterns/List',
  component: List,
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
} satisfies Meta<typeof List>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <ActionsItem
          id="Action item 1"
          name="Action item 1"
          description="Description of the action item 1"
          subdescription="Subdescription of the action item 1"
          user={{
            avatar: 'https://www.gravatar.com/avatar',
            name: 'John Doe',
          }}
          actionsSlot={
            <Button
              type="icon"
              icon="plus"
              action={fn()}
            />
          }
        />
        <ActionsItem
          id="Action item 2"
          name="Action item 2"
          description="Description of the action item 2"
          subdescription="Subdescription of the action item"
          user={{
            avatar: 'https://www.gravatar.com/avatar',
            name: 'John Doe',
          }}
          actionsSlot={
            <Button
              type="icon"
              icon="plus"
              action={fn()}
            />
          }
        />
        <ActionsItem
          id="Action item 3"
          name="Action item 3"
          description="Description of the action item 3"
          subdescription="Subdescription of the action item 3"
          user={{
            avatar: 'https://www.gravatar.com/avatar',
            name: 'John Doe',
          }}
          actionsSlot={
            <Button
              type="icon"
              icon="plus"
              action={fn()}
            />
          }
        />
      </>
    ),
    isTopBorderEnabled: true,
  },
  argTypes: {
    padding: { control: false },
    isLoading: { control: false },
    isMessage: { control: false },
  },
}

export const Message: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '296px', height: '296px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: (
      <li>
        <SemanticMessage
          type="ERROR"
          message="This is an error message"
        />
      </li>
    ),
    isMessage: true,
  },
  argTypes: {
    padding: { control: false },
    isTopBorderEnabled: { control: false },
    isLoading: { control: false },
    isMessage: { control: false },
  },
}

export const Loading: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '296px', height: '296px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    isLoading: true,
  },
  argTypes: {
    children: { control: false },
    padding: { control: false },
    isTopBorderEnabled: { control: false },
    isLoading: { control: false },
    isMessage: { control: false },
  },
}
