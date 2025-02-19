import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Input from '@components/inputs/input/Input'
import InputsBar from '@components/inputs/inputs-bar/InputsBar'

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
      onShift={fn}
    />
    <Input
      type="NUMBER"
      value="34"
      min="0"
      max="100"
      feature="UPDATE_LIGHTNESS"
      onFocus={fn}
      onBlur={fn}
      onShift={fn}
    />
    <Input
      type="NUMBER"
      value="45"
      min="0"
      max="100"
      feature="UPDATE_CHROMA"
      onFocus={fn}
      onBlur={fn}
      onShift={fn}
    />
  </>
)

const meta = {
  title: 'Example/Inputs/Inputs Bar',
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
    children: Inputs(),
  },
}
