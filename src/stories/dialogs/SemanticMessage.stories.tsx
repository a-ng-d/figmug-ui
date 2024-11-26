import type { Meta, StoryObj } from '@storybook/react'
import { SemanticMessage } from '../../components/dialogs/semantic-message/SemanticMessage'
import { Button } from '../../components/actions/button/Button'
import { fn } from '@storybook/test'

const mock = fn()

const meta = {
  title: 'Example/Dialogs/Semantic Message',
  component: SemanticMessage,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SemanticMessage>

export default meta
type Story = StoryObj<typeof meta>

export const TypedMessage: Story = {
  args: {
    type: 'INFO',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    isAnchored: false,
    action: (() => (
      <Button
        type="secondary"
        label="Action"
        action={mock}
      />
    ))(),
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['INFO', 'SUCCESS', 'WARNING', 'ERROR'],
      },
    },
    action: { control: { disable: true } },
  },
}
