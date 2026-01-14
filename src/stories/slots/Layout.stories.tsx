import type { Meta, StoryObj } from '@storybook/react-vite'
import texts from '@styles/texts/texts.module.scss'
import Chip from '@components/tags/chip/Chip'
import SimpleItem from '@components/slots/simple-item/SimpleItem'
import Section from '@components/slots/section/Section'
import Layout from '@components/slots/layout/Layout'
import Tabs from '@components/lists/tabs/Tabs'
import Input from '@components/inputs/input/Input'
import SectionTitle from '@components/assets/section-title/SectionTitle'
import Button from '@components/actions/button/Button'

const meta = {
  title: 'Patterns/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Layout component provides flexible multi-column layouts with responsive behavior. At 460px and below, it automatically switches from horizontal to vertical (column) layout.',
      },
    },
  },
} satisfies Meta<typeof Layout>

export default meta
type Story = StoryObj<typeof meta>

const SamplePanel = ({
  title,
  content,
}: {
  title: string
  content: string
}) => (
  <Section
    title={
      <SimpleItem
        leftPartSlot={<SectionTitle label={title} />}
        isListItem={false}
      />
    }
    body={[
      {
        node: (
          <SimpleItem
            leftPartSlot={
              <div
                className={texts.type}
                style={{ padding: '16px' }}
              >
                {content}
              </div>
            }
            isListItem={false}
          />
        ),
      },
    ]}
  />
)

const SampleForm = () => (
  <Section
    title={
      <SimpleItem
        leftPartSlot={<SectionTitle label="Settings" />}
        rightPartSlot={<Chip>New</Chip>}
        isListItem={false}
      />
    }
    body={[
      {
        node: (
          <SimpleItem
            leftPartSlot={
              <Input
                id="sample-input"
                type="TEXT"
                placeholder="Enter your name"
              />
            }
            isListItem={false}
          />
        ),
      },
      {
        node: (
          <SimpleItem
            leftPartSlot={
              <Button
                type="primary"
                label="Save Changes"
              />
            }
            isListItem={false}
          />
        ),
      },
    ]}
  />
)

const SampleNavigation = () => (
  <Section
    title={
      <SimpleItem
        leftPartSlot={<SectionTitle label="Navigation" />}
        isListItem={false}
      />
    }
    body={[
      {
        node: (
          <SimpleItem
            leftPartSlot={
              <Tabs
                tabs={[
                  { label: 'Home', id: 'home', isUpdated: false },
                  { label: 'Settings', id: 'settings', isUpdated: true },
                  { label: 'Help', id: 'help', isUpdated: false, isNew: true },
                ]}
                active="settings"
                action={() => {}}
              />
            }
            isListItem={false}
          />
        ),
      },
    ]}
  />
)

export const TwoColumns: Story = {
  args: {
    id: 'two-column-layout',
    isFullWidth: true,
    isFullHeight: true,
    column: [
      {
        node: (
          <SamplePanel
            title="Navigation"
            content="This is the left sidebar with navigation elements. In responsive mode (≤460px), this becomes the top section with a bottom border."
          />
        ),
        typeModifier: 'FIXED',
        fixedWidth: '280px',
      },
      {
        node: (
          <SamplePanel
            title="Main Content"
            content="This is the main content area that takes up the remaining space. It adapts automatically to different screen sizes."
          />
        ),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'A typical two-column layout with a fixed sidebar and flexible main content. The layout becomes vertical on small screens (≤460px).',
      },
    },
  },
}

export const ThreeColumns: Story = {
  args: {
    id: 'three-column-layout',
    isFullWidth: true,
    isFullHeight: true,
    column: [
      {
        node: <SampleNavigation />,
        typeModifier: 'FIXED',
        fixedWidth: '200px',
      },
      {
        node: (
          <SamplePanel
            title="Content"
            content="Main content area with flexible width that adapts to available space."
          />
        ),
      },
      {
        node: <SampleForm />,
        typeModifier: 'FIXED',
        fixedWidth: '300px',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'A three-column layout with two fixed sidebars and a flexible center content area. Notice how borders adapt in responsive mode.',
      },
    },
  },
}
