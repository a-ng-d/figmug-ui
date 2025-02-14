import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Button } from '../../components/actions/button/Button'
import { IconList } from '../../types/icon.types'

const icons: Array<IconList> = [
  'adjust',
  'angle',
  'alert',
  'arrow-left-right',
  'up-down',
  'auto-layout-horizontal',
  'auto-layout-vertical',
  'back',
  'blend-empty',
  'blend',
  'break',
  'caret-down',
  'caret-left',
  'caret-right',
  'caret-up',
  'check',
  'close',
  'component',
  'corner-radius',
  'corners',
  'distribute-horizontal-spacing',
  'distribute-vertical-spacing',
  'draft',
  'effects',
  'ellipses',
  'eyedropper',
  'filter',
  'forward',
  'frame',
  'group',
  'hidden',
  'horizontal-padding',
  'hyperlink',
  'image',
  'instance',
  'key',
  'layout-align-bottom',
  'align-horizontal-centers',
  'align-left',
  'align-right',
  'align-top',
  'align-vertical-centers',
  'layout-grid-columns',
  'layout-grid-rows',
  'layout-grid-uniform',
  'library',
  'link-broken',
  'link-connected',
  'list-detailed',
  'list-tile',
  'list',
  'lock-off',
  'lock-on',
  'minus',
  'play',
  'plus',
  'random',
  'recent',
  'resize-to-fit',
  'resolve-filled',
  'reverse',
  'search-large',
  'search',
  'settings',
  'share',
  'smiley',
  'sort-alpha-asc',
  'sort-alpha-dsc',
  'sort-top-bottom',
  'spacing',
  'star-off',
  'stroke-weight',
  'styles',
  'swap',
  'theme',
  'tidy-up-grid',
  'tidy-up-list-horizontal',
  'tidy-up-list-vertical',
  'timer',
  'trash',
  'vertical-padding',
  'visible',
  'warning-large',
  'warning',
  'repository',
  'info',
  'resize-grip',
  'caret',
  'spinner',
  'user',
  'target',
]

const mock = fn()

const meta: Meta<typeof Button> = {
  title: 'Example/Actions/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: { action: mock },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    type: 'primary',
    label: 'Primary action button',
    feature: 'PRIMARY_ACTION',
    hasMultipleActions: false,
    isLoading: false,
    isBlocked: false,
    isDisabled: false,
    isNew: false,
  },
  argTypes: {
    type: { control: false },
    icon: { control: false },
    state: { control: false },
    isLink: { control: false },
    url: { control: false },
  },
}

export const Secondary: Story = {
  args: {
    type: 'secondary',
    label: 'Secondary action button',
    feature: 'SECONDARY_ACTION',
    hasMultipleActions: false,
    isLoading: false,
    isBlocked: false,
    isDisabled: false,
    isNew: false,
  },
  argTypes: {
    type: { control: false },
    icon: { control: false },
    state: { control: false },
    isLink: { control: false },
    url: { control: false },
  },
}

export const Tertiary: Story = {
  args: {
    type: 'tertiary',
    label: 'Tertiary action button',
    feature: 'TERTIARY_ACTION',
    isLink: false,
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUjcmljayBhc3RsZXkgbmV2ZXIgZ29ubmEgZ2l2ZSB5b3UgdXA%3D',
    isLoading: false,
    isBlocked: false,
    isDisabled: false,
    isNew: false,
  },
  argTypes: {
    type: { control: false },
    icon: { control: false },
    state: { control: false },
    hasMultipleActions: { control: false },
  },
}

export const Destructive: Story = {
  args: {
    type: 'destructive',
    label: 'Destructive action button',
    feature: 'DESTRUCTIVE_ACTION',
    hasMultipleActions: false,
    isLoading: false,
    isBlocked: false,
    isDisabled: false,
    isNew: false,
  },
  argTypes: {
    type: { control: false },
    icon: { control: false },
    state: { control: false },
    isLink: { control: false },
    url: { control: false },
  },
}

export const Icon: Story = {
  args: {
    type: 'icon',
    icon: 'adjust',
    helper: {
      label: 'Adjust the parameters',
      pin: 'BOTTOM',
      isSingleLine: true,
    },
    feature: 'ACTION',
    isLoading: false,
    isDisabled: false,
    isNew: false,
  },
  argTypes: {
    type: { control: false },
    icon: { control: 'select', options: icons },
    label: { control: false },
    state: { control: false },
    hasMultipleActions: { control: false },
    isBlocked: { control: false },
    isLink: { control: false },
    url: { control: false },
  },
}

export const Compact: Story = {
  args: {
    type: 'compact',
    icon: 'lock-on',
    label: 'Compact action button',
    feature: 'ACTION',
    isBlocked: false,
    isDisabled: false,
    isNew: false,
  },
  argTypes: {
    type: { control: false },
    state: { control: false },
    hasMultipleActions: { control: false },
    isLoading: { control: false },
    isLink: { control: false },
    url: { control: false },
  },
}
