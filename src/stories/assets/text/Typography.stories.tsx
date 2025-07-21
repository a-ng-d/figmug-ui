import type { Meta, StoryObj } from '@storybook/react-vite'
import Text from '@components/assets/text/Text'

const meta = {
  title: 'Components/Assets/Typography',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const TypographyShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '18px' }}>Font Sizes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <Text size="small" weight="bold">Small (11px)</Text>
            <Text size="small">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
              Vivamus hendrerit arcu sed erat molestie vehicula.
            </Text>
          </div>
          
          <div>
            <Text weight="bold">Default (12px)</Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
              Vivamus hendrerit arcu sed erat molestie vehicula.
            </Text>
          </div>
          
          <div>
            <Text size="large" weight="bold">Large (13px)</Text>
            <Text size="large">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
              Vivamus hendrerit arcu sed erat molestie vehicula.
            </Text>
          </div>
          
          <div>
            <Text size="xlarge" weight="bold">Extra Large (14px)</Text>
            <Text size="xlarge">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
              Vivamus hendrerit arcu sed erat molestie vehicula.
            </Text>
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '18px' }}>Font Weights</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <Text weight="bold">Normal (400)</Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
            </Text>
          </div>
          
          <div>
            <Text weight="bold">Medium (500)</Text>
            <Text weight="medium">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
            </Text>
          </div>
          
          <div>
            <Text weight="bold">Bold (600)</Text>
            <Text weight="bold">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
            </Text>
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '18px' }}>Text Colors</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <Text weight="bold">Primary</Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
            </Text>
          </div>
          
          <div>
            <Text weight="bold">Secondary</Text>
            <Text color="secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
            </Text>
          </div>
          
          <div>
            <Text weight="bold">Tertiary</Text>
            <Text color="tertiary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
            </Text>
          </div>
          
          <div style={{ background: '#333', padding: '8px' }}>
            <Text weight="bold" color="inverse">Inverse</Text>
            <Text color="inverse">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
            </Text>
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '18px' }}>Text Combinations</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <Text size="xlarge" weight="bold">Heading</Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
              Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus
              rhoncus ut eleifend nibh porttitor.
            </Text>
          </div>
          
          <div>
            <Text size="large" weight="medium">Subheading</Text>
            <Text color="secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
              Vivamus hendrerit arcu sed erat molestie vehicula.
            </Text>
          </div>
          
          <div style={{ width: '300px' }}>
            <Text weight="bold">Truncated text</Text>
            <Text truncate>
              This is a very long text that will be truncated when it reaches the end of its container element.
            </Text>
          </div>
        </div>
      </section>
    </div>
  ),
}
