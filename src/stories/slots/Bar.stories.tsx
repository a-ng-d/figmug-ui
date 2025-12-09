import type { Meta, StoryObj } from '@storybook/react-vite'
import texts from '@styles/texts/texts.module.scss'
import Bar from '@components/slots/bar/Bar'
import { doClassnames } from '@a_ng_d/figmug-utils'

const meta = {
  title: 'Patterns/Bar',
  component: Bar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    leftPartSlot: { control: false },
    soloPartSlot: { control: false },
    rightPartSlot: { control: false },
  },
} satisfies Meta<typeof Bar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    leftPartSlot: <div className={doClassnames([texts.type])}>Left Part</div>,
    soloPartSlot: undefined,
    rightPartSlot: <div className={doClassnames([texts.type])}>Right Part</div>,
    border: ['BOTTOM'],
  },
}

export const TruncateLeft: Story = {
  args: {
    leftPartSlot: (
      <div className={doClassnames([texts.type, texts['type--truncated']])}>
        This is a very long text that should be truncated to a single line in
        the left part.
      </div>
    ),
    rightPartSlot: <div className={doClassnames([texts.type])}>Right Part</div>,
    clip: ['LEFT'],
    border: ['BOTTOM'],
  },
}

export const TruncateRight: Story = {
  args: {
    leftPartSlot: (
      <div className={doClassnames([texts.type, texts['type--truncated']])}>
        Left Part
      </div>
    ),
    rightPartSlot: (
      <div className={doClassnames([texts.type, texts['type--truncated']])}>
        This is a long text in the right part that should be truncated.
      </div>
    ),
    isInverted: true,
    clip: ['RIGHT'],
    border: ['BOTTOM'],
  },
}

export const TruncateSolo: Story = {
  args: {
    leftPartSlot: undefined,
    soloPartSlot: (
      <div className={doClassnames([texts.type, texts['type--truncated']])}>
        Solo: very long text displayed in the center and truncated to a single
        line.
      </div>
    ),
    clip: ['SOLO'],
    border: ['BOTTOM'],
  },
}

export const TruncateBoth: Story = {
  args: {
    leftPartSlot: (
      <div className={doClassnames([texts.type, texts['type--truncated']])}>
        Left: long text — should be truncated.
      </div>
    ),
    rightPartSlot: (
      <div className={doClassnames([texts.type, texts['type--truncated']])}>
        Right: another long text — should also be truncated.
      </div>
    ),
    clip: ['LEFT', 'RIGHT'],
    border: ['BOTTOM'],
  },
}
