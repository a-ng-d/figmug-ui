import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';

const meta = {
  title: 'Example/Tags/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const New: Story = {
  args: {
    children: 'New'
  },
};

export const Pro: Story = {
  args: {
    children: 'Pro'
  },
};
