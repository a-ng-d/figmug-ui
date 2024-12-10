import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useArgs } from '@storybook/client-api'
import { Accordion } from '../../components/actions/accordion/Accordion'
import { Input } from '../../components/inputs/input/Input'
import * as TitleStory from '../assets/SectionTitle.stories'
import * as InputStory from '../inputs/Input.stories'

const mock = fn()

const meta = {
  title: 'Example/Actions/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const ExpandCollapseInput: Story = {
  args: {
    ...TitleStory.TitleWithHelper.args,
    icon: 'plus',
    isExpanded: false,
    isBlocked: false,
    isNew: false,
    children: (
      <Input
        {...InputStory.ShortText.args}
        isAutoFocus
      />
    ),
    onAdd: mock,
    onEmpty: mock,
  },
  argTypes: {
    ...TitleStory.TitleWithHelper.argTypes,
    children: { control: false },
    onAdd: { control: false },
    onEmpty: { control: false },
  },
  render: (args) => {
    const [argsState, updateArgs] = useArgs<{
      isExpanded: boolean
    }>()

    const onChange = () => {
      updateArgs({
        isExpanded: !argsState.isExpanded,
      })
    }

    return (
      <Accordion
        {...args}
        isExpanded={argsState.isExpanded}
        onAdd={onChange}
        onEmpty={onChange}
      />
    )
  },
}
