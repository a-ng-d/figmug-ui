import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Dialog } from '../../components/dialogs/dialog/Dialog'
import texts from '../../styles/texts.module.scss'

const onBoarding = () => {
  return (
    <>
      <div className="dialog__cover">
        <img
          className="dialog__cover"
          src="https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hello"
          style={{
            width: '100%',
          }}
        />
      </div>
      <div className="dialog__text">
        <p className={`type ${texts.type}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus
          nullam eget felis eget nunc lobortis mattis.
        </p>
      </div>
    </>
  )
}

const meta = {
  title: 'Example/Dialogs/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const ExternalImage: Story = {
  args: {
    title: 'Welcome to the next version',
    actions: {
      primary: {
        label: 'Got it',
        action: fn(),
      },
      secondary: {
        label: 'Learn more',
        action: fn(),
      },
    },
    indicator: '3 of 3',
    children: onBoarding(),
    isForward: false,
    onClose: fn,
  },
  argTypes: {
    select: { control: false },
    isForward: { controls: false },
    onClose: { control: false },
  },
}
