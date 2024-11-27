import type { Meta, StoryObj } from '@storybook/react'
import { SimpleItem } from '../../components/slots/simple-item/SimpleItem'
import { ColorItem } from './SimpleItem.stories'
import { Section } from '../../components/slots/section/Section'

const meta = {
  title: 'Example/Slots/Section',
  component: Section,
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
} satisfies Meta<typeof Section>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Selected colors',
    indicator: '5',
    childrens: [
      {
        node: <SimpleItem {...ColorItem.args} />,
        spacingModifier: 'TIGHT',
      },
      {
        node: <SimpleItem {...ColorItem.args} />,
        spacingModifier: 'TIGHT',
      },
      {
        node: <SimpleItem {...ColorItem.args} />,
        spacingModifier: 'TIGHT',
      },
      {
        node: <SimpleItem {...ColorItem.args} />,
        spacingModifier: 'TIGHT',
      },
      {
        node: <SimpleItem {...ColorItem.args} />,
        spacingModifier: 'TIGHT',
      },
    ],
  },
}
