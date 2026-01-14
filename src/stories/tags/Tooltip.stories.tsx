import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Tooltip from '@components/tags/tooltip/Tooltip'
import Button from '@components/actions/button/Button'

const meta = {
  title: 'Components/Tags/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    pin: {
      control: 'select',
      options: ['TOP', 'BOTTOM'],
    },
    type: {
      control: 'select',
      options: ['SINGLE_LINE', 'MULTI_LINE', 'WITH_IMAGE'],
    },
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

const TooltipWrapper = ({
  children,
  pin,
  type,
  image,
}: {
  children: React.ReactNode
  pin?: 'TOP' | 'BOTTOM'
  type?: 'MULTI_LINE' | 'SINGLE_LINE' | 'WITH_IMAGE'
  image?: string
}) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div
      style={{
        display: 'inline-flex',
        position: 'relative',
      }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <Button
        type="primary"
        icon="adjust"
        label="Hover me"
        feature="tooltip-demo"
        action={() => {}}
      />
      {isVisible && (
        <Tooltip
          pin={pin}
          type={type}
          image={image}
        >
          {children}
        </Tooltip>
      )}
    </div>
  )
}

export const SingleLineBottom: Story = {
  args: {
    children: 'This is a single line tooltip',
    pin: 'BOTTOM',
    type: 'SINGLE_LINE',
  },
  render: (args) => <TooltipWrapper {...args}>{args.children}</TooltipWrapper>,
}

export const SingleLineTop: Story = {
  args: {
    children: 'This is a single line tooltip at the top',
    pin: 'TOP',
    type: 'SINGLE_LINE',
  },
  render: (args) => <TooltipWrapper {...args}>{args.children}</TooltipWrapper>,
}

export const MultiLineBottom: Story = {
  args: {
    children:
      'This is a multi-line tooltip with more detailed information that spans across multiple lines to provide better context.',
    pin: 'BOTTOM',
    type: 'MULTI_LINE',
  },
  render: (args) => <TooltipWrapper {...args}>{args.children}</TooltipWrapper>,
}

export const MultiLineTop: Story = {
  args: {
    children:
      'This is a multi-line tooltip positioned at the top with detailed information that helps users understand the feature better.',
    pin: 'TOP',
    type: 'MULTI_LINE',
  },
  render: (args) => <TooltipWrapper {...args}>{args.children}</TooltipWrapper>,
}

export const WithImage: Story = {
  args: {
    children: 'Tooltip with an image example',
    pin: 'BOTTOM',
    type: 'WITH_IMAGE',
    image: 'https://placehold.co/96x96',
  },
  render: (args) => <TooltipWrapper {...args}>{args.children}</TooltipWrapper>,
}

export const LongText: Story = {
  args: {
    children:
      'This is a very long tooltip text that demonstrates how the tooltip handles extensive content. It should wrap properly and maintain good readability even with lots of information. The tooltip component automatically adjusts its position to stay within the viewport boundaries.',
    pin: 'BOTTOM',
    type: 'MULTI_LINE',
  },
  render: (args) => <TooltipWrapper {...args}>{args.children}</TooltipWrapper>,
}

export const EdgePosition: Story = {
  args: {
    children: 'This tooltip near the edge auto-adjusts its position',
    pin: 'BOTTOM',
    type: 'SINGLE_LINE',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingLeft: '10px',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: (args) => <TooltipWrapper {...args}>{args.children}</TooltipWrapper>,
}

export const AllTooltips: Story = {
  args: {
    children: 'Single line tooltip',
    pin: 'BOTTOM',
    type: 'SINGLE_LINE',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '120px',
          width: '100%',
          maxWidth: '1000px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '150px',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '80px',
            }}
          >
            <Button
              type="primary"
              icon="info"
              label="Single Line"
              feature="tooltip-demo"
              action={() => {}}
            />
            <Tooltip
              pin="BOTTOM"
              type="SINGLE_LINE"
            >
              Single line tooltip at bottom
            </Tooltip>
          </div>

          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column-reverse',
              alignItems: 'center',
              gap: '80px',
            }}
          >
            <Button
              type="primary"
              icon="info"
              label="Single Line"
              feature="tooltip-demo"
              action={() => {}}
            />
            <Tooltip
              pin="TOP"
              type="SINGLE_LINE"
            >
              Single line tooltip at top
            </Tooltip>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '150px',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '80px',
            }}
          >
            <Button
              type="primary"
              icon="info"
              label="Multi Line"
              feature="tooltip-demo"
              action={() => {}}
            />
            <Tooltip
              pin="BOTTOM"
              type="MULTI_LINE"
            >
              This is a multi-line tooltip with more detailed information that
              spans across multiple lines.
            </Tooltip>
          </div>

          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column-reverse',
              alignItems: 'center',
              gap: '80px',
            }}
          >
            <Button
              type="primary"
              icon="info"
              label="Multi Line"
              feature="tooltip-demo"
              action={() => {}}
            />
            <Tooltip
              pin="TOP"
              type="MULTI_LINE"
            >
              This is a multi-line tooltip positioned at the top with detailed
              information.
            </Tooltip>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '150px',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '80px',
            }}
          >
            <Button
              type="primary"
              icon="info"
              label="With Image"
              feature="tooltip-demo"
              action={() => {}}
            />
            <Tooltip
              pin="BOTTOM"
              type="WITH_IMAGE"
              image="https://placehold.co/96x96"
            >
              Tooltip with image
            </Tooltip>
          </div>

          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column-reverse',
              alignItems: 'center',
              gap: '80px',
            }}
          >
            <Button
              type="primary"
              icon="info"
              label="With Image"
              feature="tooltip-demo"
              action={() => {}}
            />
            <Tooltip
              pin="TOP"
              type="WITH_IMAGE"
              image="https://placehold.co/96x96"
            >
              Tooltip with image at top
            </Tooltip>
          </div>
        </div>
      </div>
    )
  },
}
