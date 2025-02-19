import type { Meta, StoryObj } from '@storybook/react'
import SectionTitle from '@components/assets/section-title/SectionTitle'
import Section from '@components/slots/section/Section'
import SimpleItem from '@components/slots/simple-item/SimpleItem'
import { ColorItem } from './SimpleItem.stories'

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
    title: (
      <SimpleItem
        leftPartSlot={
          <SectionTitle
            label="Selected colors"
            indicator="5"
          />
        }
        isListItem={false}
      />
    ),
    body: [
      {
        node: <SimpleItem {...ColorItem.args} />,
        spacingModifier: 'NONE',
      },
      {
        node: <SimpleItem {...ColorItem.args} />,
        spacingModifier: 'NONE',
      },
      {
        node: <SimpleItem {...ColorItem.args} />,
        spacingModifier: 'NONE',
      },
      {
        node: <SimpleItem {...ColorItem.args} />,
        spacingModifier: 'NONE',
      },
      {
        node: <SimpleItem {...ColorItem.args} />,
        spacingModifier: 'NONE',
      },
    ],
  },
}
