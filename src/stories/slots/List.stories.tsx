import type { Meta, StoryObj } from '@storybook/react'
import { ActionsItem } from '../../components/lists/actions-item/ActionsItem'
import List from '../../components/slots/list/List'
import { Button } from '../../components/actions/button/Button'
import { fn } from '@storybook/test'
import { SemanticMessage } from '../../components/dialogs/semantic-message/SemanticMessage'

const meta = {
  title: 'Example/Slots/List',
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
  },
  argTypes: {
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
      <SemanticMessage
        type="ERROR"
        message="This is an error message"
      />
    ),
    isMessage: true,
  },
  argTypes: {
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
    isLoading: { control: false },
    isMessage: { control: false },
  },
}
