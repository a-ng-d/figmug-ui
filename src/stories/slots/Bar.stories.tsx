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
