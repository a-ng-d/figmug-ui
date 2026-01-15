import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn, expect, userEvent, within } from 'storybook/test'
import { IconList } from '@tps/icon.types'
import Button from '@components/actions/button/Button'

const icons: Array<IconList> = [
  'adjust',
  'angle',
  'alert',
  'arrow-left-right',
  'arrow-up-down',
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
  'chevron-down',
  'chevron-left',
  'chevron-right',
  'chevron-up',
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
  'layout-align-horizontal-centers',
  'layout-align-left',
  'layout-align-right',
  'layout-align-top',
  'layout-align-vertical-centers',
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
  'toggle-sidebar-top',
  'toggle-sidebar-right',
  'toggle-sidebar-bottom',
  'toggle-sidebar-left',
  'timer',
  'trash',
  'vertical-padding',
  'visible',
  'warning-large',
  'warning',
  'repository',
  'info',
  'resize-grip',
  'spinner',
  'user',
  'target',
]

const mock = fn()

const meta: Meta<typeof Button> = {
  title: 'Components/Actions/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: { isAutofocus: false, action: mock },
  argTypes: {
    action: { control: false },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    type: 'primary',
    size: 'default',
    label: 'Primary action button',
    preview: {
      image: 'https://placehold.co/96x96',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
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
    iconClassName: { control: false },
    customIcon: { control: false },
    helper: { control: false },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', {
      name: /Primary action button/i,
    })

    await expect(button).toBeInTheDocument()
    await userEvent.click(button)
    await expect(args.action).toHaveBeenCalledTimes(1)
  },
}

export const Secondary: Story = {
  args: {
    type: 'secondary',
    size: 'default',
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
    iconClassName: { control: false },
    customIcon: { control: false },
    helper: { control: false },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', {
      name: /Secondary action button/i,
    })

    await expect(button).toBeInTheDocument()
    await userEvent.click(button)
    await expect(args.action).toHaveBeenCalled()
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
    iconClassName: { control: false },
    customIcon: { control: false },
    helper: { control: false },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', {
      name: /Tertiary action button/i,
    })

    await expect(button).toBeInTheDocument()
    await userEvent.click(button)
    await expect(args.action).toHaveBeenCalled()
  },
}

export const Destructive: Story = {
  args: {
    type: 'destructive',
    size: 'default',
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
    iconClassName: { control: false },
    customIcon: { control: false },
    helper: { control: false },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', {
      name: /Destructive action button/i,
    })

    await expect(button).toBeInTheDocument()
    await userEvent.click(button)
    await expect(args.action).toHaveBeenCalled()
  },
}

export const Alternative: Story = {
  args: {
    type: 'alternative',
    size: 'default',
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
    helper: { control: false },
    iconClassName: { control: false },
    customIcon: { control: false },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', {
      name: /Compact action button/i,
    })

    await expect(button).toBeInTheDocument()

    const icon = canvas.getByRole('img', { hidden: true })
    await expect(icon).toBeInTheDocument()

    await userEvent.click(button)
    await expect(args.action).toHaveBeenCalled()
  },
}

export const Icon: Story = {
  args: {
    type: 'icon',
    size: 'default',
    state: 'default',
    icon: 'adjust',
    helper: {
      label: 'Adjust the parameters',
    },
    feature: 'ACTION',
    isLoading: false,
    isDisabled: false,
    isBlocked: false,
    isNew: false,
  },
  argTypes: {
    type: { control: false },
    icon: { control: 'select', options: icons },
    label: { control: false },
    hasMultipleActions: { control: false },
    isLink: { control: false },
    url: { control: false },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')

    await expect(button).toBeInTheDocument()

    const icon = canvas.getByRole('img', { hidden: true })
    await expect(icon).toBeInTheDocument()

    await userEvent.hover(button)

    await expect(canvas.getByText('Adjust the parameters')).toBeInTheDocument()

    await userEvent.unhover(button)
    await userEvent.click(button)
    await expect(args.action).toHaveBeenCalled()
  },
}
