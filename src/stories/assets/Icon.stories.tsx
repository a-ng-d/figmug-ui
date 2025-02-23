import type { Meta, StoryObj } from '@storybook/react'
import Icon from '@components/assets/icon/Icon'
import { IconList } from '@tps/icon.types'
import texts from '@styles/texts.module.scss'

const width = 960

const icons: Array<IconList> = [
  'adjust',
  'alert',
  'angle',
  'arrow-left-right',
  'arrow-up-down',
  'auto-layout-horizontal',
  'auto-layout-vertical',
  'back',
  'blend',
  'blend-empty',
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
  'downward',
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
  'import',
  'info',
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
  'list',
  'list-detailed',
  'list-tile',
  'lock-off',
  'lock-on',
  'minus',
  'play',
  'plus',
  'random',
  'recent',
  'refresh',
  'repository',
  'reset',
  'resize-grip',
  'resize-to-fit',
  'resolve-filled',
  'reverse',
  'search',
  'search-large',
  'settings',
  'share',
  'smiley',
  'sort-alpha-asc',
  'sort-alpha-dsc',
  'sort-top-bottom',
  'spacing',
  'spinner',
  'star-off',
  'star-on',
  'stroke-weight',
  'styles',
  'swap',
  'target',
  'theme',
  'tidy-up-grid',
  'tidy-up-list-horizontal',
  'tidy-up-list-vertical',
  'timer',
  'trash',
  'upward',
  'user',
  'vertical-padding',
  'visible',
  'warning',
  'warning-large',
]

const meta = {
  title: 'Components/Assets/Icon',
  component: Icon,
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          maxWidth: `${width}px`,
          flexWrap: 'wrap',
          gap: `${width / 80}px`,
          alignItems: 'baseline',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    iconColor: { control: 'color' },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Pictogram: Story = {
  args: {
    type: 'PICTO',
    iconLetter: undefined,
    iconColor: 'var(--figma-color-icon)',
  },
  argTypes: {
    type: { control: false },
    iconName: { control: false },
    iconLetter: { control: false },
  },
  render: (args) => {
    return (
      <>
        {icons.map((icon) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: `${width / 80}px`,
              alignItems: 'center',
              justifyContent: 'center',
              width: `${width / 8}px`,
            }}
          >
            <Icon
              type={args.type}
              iconName={icon}
              iconColor={args.iconColor}
            />
            <span
              className={`type ${texts['type']}`}
              style={{ textAlign: 'center' }}
            >
              {icon}
            </span>
          </div>
        ))}
      </>
    )
  },
}

export const Letter: Story = {
  args: {
    type: 'LETTER',
    iconName: undefined,
    iconLetter: 'L',
    iconColor: 'var(--figma-color-icon)',
  },
  argTypes: {
    type: { control: false },
    iconName: { control: false },
  },
  render: (args) => {
    return (
      <Icon
        type={args.type}
        iconLetter={args.iconLetter}
        iconColor={args.iconColor}
      />
    )
  },
}
