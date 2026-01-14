import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import SectionTitle from '@components/assets/section-title/SectionTitle'

const meta = {
  title: 'Components/Assets/Section Title',
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
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const title = canvas.getByText(args.label)
    await expect(title).toBeInTheDocument()
    const indicator = canvas.getByText(`(${args.indicator?.toString()})`)
    await expect(indicator).toBeInTheDocument()
  },
}
