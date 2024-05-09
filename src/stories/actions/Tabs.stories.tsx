import { SyntheticEvent } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useArgs } from '@storybook/preview-api'
import { Tabs } from '../../components/actions/tabs/Tabs'

const mock = fn()

const meta = {
  title: 'Example/Actions/Tabs',
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
    action: () => {},
  },
  render: (args) => {
    const [{ active }, updateArgs] = useArgs()

    const onChange = (e: SyntheticEvent) => {
      updateArgs({ active: (e.target as HTMLElement).dataset.feature })
      mock
    }

    return (
      <Tabs
        {...args}
        active={active}
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
        isUpdated: false,
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
    action: () => {},
  },
  render: (args) => {
    const [{ active }, updateArgs] = useArgs()

    const onChange = (e: SyntheticEvent) => {
      updateArgs({ active: (e.target as HTMLElement).dataset.feature })
      mock
    }

    return (
      <Tabs
        {...args}
        active={active}
        action={onChange}
      />
    )
  },
}
