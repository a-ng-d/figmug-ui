import type { Meta, StoryObj } from '@storybook/react'
import { SectionTitle } from '../../components/assets/section-title/SectionTitle'

const meta = {
  title: 'Example/Assets/Section title',
  component: SectionTitle,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SectionTitle>

export default meta
type Story = StoryObj<typeof meta>

export const TitleWithHelper: Story = {
  args: {
    label: 'Section title',
    indicator: 7,
    helper:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  argTypes: {
    indicator: { control: 'number' },
  },
}
