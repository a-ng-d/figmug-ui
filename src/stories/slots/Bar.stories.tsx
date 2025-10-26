import type { Meta, StoryObj } from '@storybook/react-vite'
import texts from '@styles/texts/texts.module.scss'
import Bar from '@components/slots/bar/Bar'
import { doClassnames } from '@a_ng_d/figmug-utils'

const meta = {
  title: 'Components/Slots/Bar',
  component: Bar,
} satisfies Meta<typeof Bar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    leftPartSlot: <div className={doClassnames([texts.type])}>Left Part</div>,
    soloPartSlot: undefined,
    rightPartSlot: <div className={doClassnames([texts.type])}>Right Part</div>,
  },
}

export const TruncateLeft: Story = {
  args: {
    leftPartSlot: (
      <div className={doClassnames([texts.type])}>
        This is a very long text that should be truncated to a single line in
        the left part.
      </div>
    ),
    soloPartSlot: undefined,
    rightPartSlot: <div className={doClassnames([texts.type])}>Right Part</div>,
    clip: ['LEFT'],
  },
}

export const TruncateRight: Story = {
  args: {
    leftPartSlot: <div className={doClassnames([texts.type])}>Left Part</div>,
    soloPartSlot: undefined,
    rightPartSlot: (
      <div className={doClassnames([texts.type])}>
        Voici un long texte dans la partie droite qui devrait être tronqué.
      </div>
    ),
    clip: ['RIGHT'],
  },
}

export const TruncateSolo: Story = {
  args: {
    leftPartSlot: undefined,
    soloPartSlot: (
      <div className={doClassnames([texts.type])}>
        Solo: very long text displayed in the center and truncated to a single
        line.
      </div>
    ),
    rightPartSlot: undefined,
    clip: ['SOLO'],
  },
}

export const TruncateBoth: Story = {
  args: {
    leftPartSlot: (
      <div className={doClassnames([texts.type])}>
        Left: long text — should be truncated.
      </div>
    ),
    soloPartSlot: undefined,
    rightPartSlot: (
      <div className={doClassnames([texts.type])}>
        Right: another long text — should also be truncated.
      </div>
    ),
    clip: ['LEFT', 'RIGHT'],
  },
}
