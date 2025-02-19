import { useArgs } from '@storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Tabs from '@components/lists/tabs/Tabs'

const meta = {
  title: 'Components/Lists/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    tabs: {
      control: 'object',
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const ThreeTabs: Story = {
  args: {
    tabs: [
      {
        label: 'Section 1',
        id: 'SECTION_1',
        isUpdated: false,
      },
      {
        label: 'Section 2',
        id: 'SECTION_2',
        isUpdated: false,
      },
      {
        label: 'Section 3',
        id: 'SECTION_3',
        isUpdated: false,
      },
    ],
    active: 'SECTION_1',
    action: fn(),
  },
  argTypes: {
    active: {
      control: 'select',
      options: ['SECTION_1', 'SECTION_2', 'SECTION_3'],
    },
  },
  render: (args) => {
    const [argsState, updateArgs] = useArgs<{
      active: string
    }>()

    const onChange = (e: React.MouseEvent<Element, MouseEvent>) => {
      updateArgs({
        active: (e.target as HTMLElement).dataset.feature,
      })
      args.action(e)
    }

    return (
      <Tabs
        {...args}
        active={argsState.active}
        action={onChange}
      />
    )
  },
}

export const FiveTabs: Story = {
  args: {
    tabs: [
      {
        label: 'Section 1',
        id: 'SECTION_1',
        isUpdated: false,
      },
      {
        label: 'Section 2',
        id: 'SECTION_2',
        isUpdated: true,
      },
      {
        label: 'Section 3',
        id: 'SECTION_3',
        isUpdated: false,
      },
      {
        label: 'Section 4',
        id: 'SECTION_4',
        isUpdated: false,
      },
      {
        label: 'Section 5',
        id: 'SECTION_5',
        isUpdated: false,
      },
    ],
    active: 'SECTION_1',
    action: fn(),
  },
  argTypes: {
    active: {
      control: 'select',
      options: [
        'SECTION_1',
        'SECTION_2',
        'SECTION_3',
        'SECTION_4',
        'SECTION_5',
      ],
    },
  },
  render: (args) => {
    const [argsState, updateArgs] = useArgs<{
      active: string
    }>()

    const onChange = (e: React.MouseEvent<Element, MouseEvent>) => {
      updateArgs({
        active: (e.target as HTMLElement).dataset.feature,
      })
      args.action(e)
    }

    return (
      <Tabs
        {...args}
        active={argsState.active}
        action={onChange}
      />
    )
  },
}
