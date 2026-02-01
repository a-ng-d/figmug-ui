import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import Text from '@components/assets/text/Text'

const meta = {
  title: 'Components/Assets/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default text',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const text = canvas.getByText(args.children as string)
    await expect(text).toBeInTheDocument()
  },
}

export const Small: Story = {
  args: {
    children: 'Small text',
    size: 'small',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const text = canvas.getByText(args.children as string)
    await expect(text).toBeInTheDocument()
  },
}

export const Large: Story = {
  args: {
    children: 'Large text',
    size: 'large',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const text = canvas.getByText(args.children as string)
    await expect(text).toBeInTheDocument()
  },
}

export const XLarge: Story = {
  args: {
    children: 'Extra large text',
    size: 'xlarge',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const text = canvas.getByText(args.children as string)
    await expect(text).toBeInTheDocument()
  },
}

export const Medium: Story = {
  args: {
    children: 'Medium text',
    weight: 'medium',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const text = canvas.getByText(args.children as string)
    await expect(text).toBeInTheDocument()
  },
}

export const Bold: Story = {
  args: {
    children: 'Bold text',
    weight: 'bold',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const text = canvas.getByText(args.children as string)
    await expect(text).toBeInTheDocument()
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary text',
    color: 'secondary',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const text = canvas.getByText(args.children as string)
    await expect(text).toBeInTheDocument()
  },
}

export const Tertiary: Story = {
  args: {
    children: 'Tertiary text',
    color: 'tertiary',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const text = canvas.getByText(args.children as string)
    await expect(text).toBeInTheDocument()
  },
}

export const Inverse: Story = {
  args: {
    children: 'Inverse text',
    color: 'inverse',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const text = canvas.getByText(args.children as string)
    await expect(text).toBeInTheDocument()
  },
}

export const Truncated: Story = {
  args: {
    children:
      'This text is very long and will be truncated if necessary with an ellipsis at the end',
    truncate: true,
  },
  parameters: {
    layout: 'padded',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const text = canvas.getByText(args.children as string)
    await expect(text).toBeInTheDocument()
  },
}

export const AllStyles: Story = {
  args: {
    children: 'Default text',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text>Default text</Text>
      <Text size="small">Small text</Text>
      <Text size="large">Large text</Text>
      <Text size="xlarge">Extra large text</Text>
      <Text weight="medium">Medium text</Text>
      <Text weight="bold">Bold text</Text>
      <Text color="secondary">Secondary text</Text>
      <Text color="tertiary">Tertiary text</Text>
      <div style={{ background: '#333', padding: '8px' }}>
        <Text color="inverse">Inverse text</Text>
      </div>
      <div style={{ width: '200px' }}>
        <Text truncate>
          This text is very long and will be truncated with an ellipsis at the
          end
        </Text>
      </div>
    </div>
  ),
}

export const AllSizes: Story = {
  args: {
    children: 'Demo text',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text size="small">Small text (small): {getSizeInfo('small')}</Text>
      <Text>Default text (default): {getSizeInfo('default')}</Text>
      <Text size="large">Large text (large): {getSizeInfo('large')}</Text>
      <Text size="xlarge">
        Extra large text (xlarge): {getSizeInfo('xlarge')}
      </Text>
    </div>
  ),
}

export const AllWeights: Story = {
  args: {
    children: 'Demo text',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text>Normal text (default): 400</Text>
      <Text weight="medium">Medium text: 500</Text>
      <Text weight="bold">Bold text: 600</Text>
    </div>
  ),
}

export const AllColors: Story = {
  args: {
    children: 'Demo text',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text>Primary text (primary)</Text>
      <Text color="secondary">Secondary text (secondary)</Text>
      <Text color="tertiary">Tertiary text (tertiary)</Text>
      <Text color="success">Success text (success)</Text>
      <Text color="warning">Warning text (warning)</Text>
      <Text color="alert">Alert text (alert)</Text>
      <div style={{ background: '#333', padding: '8px' }}>
        <Text color="inverse">Inverse text (inverse)</Text>
      </div>
    </div>
  ),
}

function getSizeInfo(size: string) {
  switch (size) {
    case 'small':
      return '11px'
    case 'default':
      return '12px'
    case 'large':
      return '13px'
    case 'xlarge':
      return '14px'
    default:
      return '12px'
  }
}
