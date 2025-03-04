import { useArgs } from '@storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Dialog from '@components/dialogs/dialog/Dialog'
import Input from '@components/inputs/input/Input'
import FormItem from '@components/slots/form-item/FormItem'
import texts from '@styles/texts.module.scss'
import SemanticMessage from '@components/dialogs/semantic-message/SemanticMessage'

const onBoardingSample = () => {
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
        <p className={texts.type}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus
          nullam eget felis eget nunc lobortis mattis.
        </p>
      </div>
    </>
  )
}

const FormSample = () => {
  return (
    <div className="dialog__form">
      <div className="dialog__form__item">
        <FormItem
          label="Full Name"
          id="type-fullname"
          shouldFill
        >
          <Input type="TEXT" />
        </FormItem>
      </div>
      <div className="dialog__form__item">
        <FormItem
          label="Email"
          id="type-email"
          shouldFill
        >
          <Input type="TEXT" />
        </FormItem>
      </div>
      <div className="dialog__form__item">
        <FormItem
          label="Message"
          id="type-message"
          shouldFill
        >
          <Input
            type="LONG_TEXT"
            placeholder="Type your message here"
          />
        </FormItem>
      </div>
    </div>
  )
}

const meta = {
  title: 'Components/Dialogs/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const SingleMessage: Story = {
  args: {
    title: 'Do you want to say hello?',
    actions: {
      primary: {
        label: 'Continue',
        action: fn(),
      },
      secondary: {
        label: 'Learn more',
        action: fn(),
      },
    },
    select: {
      label: 'I want to say hello',
      state: false,
      action: fn(),
    },
    pin: 'CENTER',
    children: onBoardingSample(),
    onClose: fn(),
  },
  argTypes: {
    select: { control: false },
    onClose: { control: false },
    isLoading: { control: false },
    isMessage: { control: false },
  },
  render: (args) => {
    const [argsState, updateArgs] = useArgs<{
      state: boolean
    }>()

    const onSelect = () => {
      updateArgs({
        state: !argsState.state,
      })

      args.select?.action
    }

    return (
      <Dialog
        {...args}
        select={{
          label: 'I want to say hello',
          state: argsState.state,
          action: () => onSelect(),
        }}
      >
        {onBoardingSample()}
      </Dialog>
    )
  },
}

export const MultipleMessage: Story = {
  args: {
    title: 'Welcome to the next version',
    actions: {
      primary: {
        label: 'Next',
        action: fn(),
      },
      secondary: {
        label: 'Learn more',
        action: fn(),
      },
    },
    indicator: '3 of 3',
    pin: 'CENTER',
    children: onBoardingSample(),
    onClose: fn(),
  },
  argTypes: {
    select: { control: false },
    onClose: { control: false },
  },
}

export const Form: Story = {
  args: {
    title: 'What do you want to say?',
    actions: {
      primary: {
        label: 'Submit',
        action: fn(),
      },
    },
    pin: 'CENTER',
    children: FormSample(),
    onClose: fn(),
  },
  argTypes: {
    select: { control: false },
    onClose: { control: false },
    isLoading: { control: false },
    isMessage: { control: false },
  },
}

export const SimpleDialog: Story = {
  args: {
    title: 'Are you sure to delete?',
    actions: {
      destructive: {
        label: 'Delete',
        action: fn(),
      },
      secondary: {
        label: 'Cancel',
        action: fn(),
      },
    },
    pin: 'CENTER',
    children: (() => (
      <div className="dialog__text">
        <p className={texts.type}>
          Deleting this item will remove it permanently.
        </p>
      </div>
    ))(),
    onClose: fn(),
  },
  argTypes: {
    select: { control: false },
    onClose: { control: false },
    isLoading: { control: false },
    isMessage: { control: false },
  },
}

export const LoadingDialog: Story = {
  args: {
    title: 'Loading…',
    pin: 'CENTER',
    isLoading: true,
    onClose: fn(),
  },
  argTypes: {
    select: { control: false },
    onClose: { control: false },
    isLoading: { control: false },
    isMessage: { control: false },
  },
}

export const DialogOnError: Story = {
  args: {
    title: 'Something went wrong…',
    pin: 'CENTER',
    isMessage: true,
    children: (() => (
      <SemanticMessage
        type="WARNING"
        message={'Something went wrong. Please try again later.'}
      />
    ))(),
    onClose: fn(),
  },
  argTypes: {
    select: { control: false },
    onClose: { control: false },
    isLoading: { control: false },
    isMessage: { control: false },
  },
}
