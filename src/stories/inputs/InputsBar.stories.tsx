import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { InputsBar } from '../../components/inputs/inputs-bar/InputsBar'
import { Input } from '../../components/inputs/input/Input'

const Inputs = () => (
  <>
    <Input
      type="NUMBER"
      value="134"
      min="0"
      max="360"
      feature="UPDATE_HUE"
      onFocus={fn}
      onBlur={fn}
      onConfirm={fn}
    />
    <Input
      type="NUMBER"
      value="34"
      min="0"
      max="100"
      feature="UPDATE_LIGHTNESS"
      onFocus={fn}
      onBlur={fn}
      onConfirm={fn}
    />
    <Input
      type="NUMBER"
      value="45"
      min="0"
      max="100"
      feature="UPDATE_CHROMA"
      onFocus={fn}
      onBlur={fn}
      onConfirm={fn}
    />
  </>
)

const meta = {
  title: 'Example/Inputs/InputsBar',
  component: InputsBar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof InputsBar>

export default meta
type Story = StoryObj<typeof meta>

export const ColorParameters: Story = {
  args: {
    label: 'HSL',
    children: Inputs()
  }
}