import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn, expect, within } from 'storybook/test'
import SemanticMessage from '@components/dialogs/semantic-message/SemanticMessage'
import Button from '@components/actions/button/Button'

const mock = fn()

const meta = {
  title: 'Components/Dialogs/Semantic Message',
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
    orientation: 'HORIZONTAL',
    actionsSlot: (
      <>
        <Button
          type="secondary"
          label="Action"
          action={mock}
        />
        <Button
          type="icon"
          icon="close"
          action={mock}
        />
      </>
    ),
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['INFO', 'SUCCESS', 'WARNING', 'ERROR'],
      },
    },
    actionsSlot: { control: { disable: true } },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const message = canvas.getByText(args.message)
    await expect(message).toBeInTheDocument()
    const buttons = canvas.getAllByRole('button')
    await expect(buttons.length).toBeGreaterThan(0)
  },
}
