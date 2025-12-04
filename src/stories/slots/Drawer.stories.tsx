import type { Meta, StoryObj } from '@storybook/react-vite'
import { useRef } from 'react'
import { useArgs } from '@storybook/client-api'
import Drawer from '@components/slots/drawer/Drawer'
import Button from '@components/actions/button/Button'

const meta = {
  title: 'Patterns/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 'simple-drawer',
    direction: 'VERTICAL',
    pin: 'BOTTOM',
    border: ['TOP'],
    defaultSize: {
      value: 100,
      unit: 'PIXEL',
    },
    maxSize: {
      value: 300,
      unit: 'PIXEL',
    },
    minSize: {
      value: 40,
      unit: 'PIXEL',
    },
  },
  render: (args) => {
    const drawerRef = useRef<Drawer>(null)
    const [argsState, updateArgs] = useArgs<{
      isCollapsed: boolean
    }>()

    const toggleDrawer = () => {
      if (drawerRef.current && argsState.isCollapsed)
        drawerRef.current.expandDrawer()
      else if (drawerRef.current && !argsState.isCollapsed)
        drawerRef.current.collapseDrawer()
    }

    const onExpand = () => {
      updateArgs({
        isCollapsed: false,
      })
    }

    const onCollapse = () => {
      updateArgs({
        isCollapsed: true,
      })
    }

    return (
      <div
        style={{
          width: '400px',
          height: '400px',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: args.direction === 'VERTICAL' ? 'column' : 'row',
          justifyContent:
            args.pin === 'TOP' || args.pin === 'LEFT' ? 'start' : 'end',
        }}
      >
        <Drawer
          ref={drawerRef}
          {...args}
          children={
            <Button
              type="icon"
              icon={argsState.isCollapsed ? 'upward' : 'downward'}
              action={toggleDrawer}
            />
          }
          border={[
            args.pin === 'TOP'
              ? 'BOTTOM'
              : args.pin === 'RIGHT'
                ? 'LEFT'
                : 'TOP',
          ]}
          onExpand={onExpand}
          onCollapse={onCollapse}
        />
      </div>
    )
  },
}
