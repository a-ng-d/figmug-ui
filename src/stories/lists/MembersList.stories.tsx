import type { Meta, StoryObj } from '@storybook/react-vite'
import MembersList from '@components/lists/members-list/MembersList'

const meta: Meta<typeof MembersList> = {
  title: 'Components/Lists/Members List',
  component: MembersList,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof MembersList>

const mockMembers = [
  {
    avatar: 'https://i.pravatar.cc/150?img=1',
    fullName: 'John Doe',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=2',
    fullName: 'Jane Smith',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=3',
    fullName: 'Bob Johnson',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=4',
    fullName: 'Alice Williams',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=5',
    fullName: 'Charlie Brown',
  },
]

export const Default: Story = {
  args: {
    members: mockMembers,
    numberOfAvatarsDisplayed: 3,
  },
}

export const ShowAllMembers: Story = {
  args: {
    members: mockMembers,
    numberOfAvatarsDisplayed: 5,
  },
}

export const ShowOneMember: Story = {
  args: {
    members: mockMembers,
    numberOfAvatarsDisplayed: 1,
  },
}

export const EmptyList: Story = {
  args: {
    members: [],
    numberOfAvatarsDisplayed: 3,
  },
}
