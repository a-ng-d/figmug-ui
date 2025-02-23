import React from 'react'
import './drawer.scss'

interface Unit {
  value?: number
  unit: 'PIXEL' | 'PERCENT' | 'AUTO'
}

export type DrawerProps = {
  id?: string
  direction: 'VERTICAL' | 'HORIZONTAL'
  pin: 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT'
  defaultSize: Unit
  maxSize: Unit
  minSize: Unit
  border?: Array<'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'>
  children?: React.ReactNode
  onCollapse?: () => void
  onExpand?: () => void
}

export type DrawerState = {
  isDrawerCollapsed: boolean
  drawerSize: {
    value?: number
    unit: 'PIXEL' | 'PERCENT' | 'AUTO'
  }
}

export default class Drawer extends React.Component<DrawerProps, DrawerState> {
  drawerRef: React.RefObject<HTMLDivElement>

  constructor(props: DrawerProps) {
    super(props)
    this.state = {
      isDrawerCollapsed: false,
      drawerSize: {
        value: props.defaultSize.value,
        unit: props.defaultSize.unit,
      },
    }
    this.drawerRef = React.createRef()
  }

  // Lifecycle
  componentDidUpdate = (
    _: Readonly<DrawerProps>,
    prevState: Readonly<DrawerState>
  ) => {
    const { onCollapse, onExpand } = this.props
    const { isDrawerCollapsed } = this.state

    if (isDrawerCollapsed && !prevState.isDrawerCollapsed)
      onCollapse && onCollapse()
    if (!isDrawerCollapsed && prevState.isDrawerCollapsed)
      onExpand && onExpand()
  }

  // Handlers
  clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const { defaultSize, maxSize } = this.props
    const { drawerSize } = this.state

    document.body.style.cursor = ''
    document.removeEventListener('mousemove', this.onDrag)

    if (e.detail === 2)
      this.setState({
        drawerSize: drawerSize === defaultSize ? maxSize : defaultSize,
        isDrawerCollapsed: false,
      })
  }

  // Direct Actions
  setBorder = (
    orientation: Array<'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'> | undefined
  ) => {
    const property =
      '1px solid var(--figma-color-border)' as React.CSSProperties
    const styles: { [key: string]: React.CSSProperties } = {}

    if (!orientation) return styles
    orientation.forEach((entry) => {
      if (entry === 'TOP') styles.borderTop = property
      if (entry === 'LEFT') styles.borderLeft = property
      if (entry === 'BOTTOM') styles.borderBottom = property
      if (entry === 'RIGHT') styles.borderRight = property
    })
    return styles
  }

  setUnit = (size: Unit) => {
    if (size.unit === 'AUTO') return 'auto'
    return size.unit === 'PIXEL' ? `${size.value}px` : `${size.value}%`
  }

  expandDrawer = () => {
    const { defaultSize } = this.props

    this.setState({
      drawerSize: defaultSize,
      isDrawerCollapsed: false,
    })
  }

  collapseDrawer = () => {
    const { minSize } = this.props

    this.setState({
      drawerSize: minSize,
      isDrawerCollapsed: true,
    })
  }

  onGrab = () => {
    document.body.style.cursor = 'ns-resize'
    document.addEventListener('mousemove', this.onDrag)
  }

  onDrag = (e: MouseEvent) => {
    const { direction, pin, minSize } = this.props
    const { drawerRef } = this
    const { clientX, clientY } = e

    let anchor = 0
    if (pin === 'TOP')
      anchor = drawerRef.current
        ? drawerRef.current.getBoundingClientRect().top
        : 0
    if (pin === 'RIGHT')
      anchor = drawerRef.current
        ? drawerRef.current.getBoundingClientRect().right
        : 0
    if (pin === 'BOTTOM')
      anchor = drawerRef.current
        ? drawerRef.current.getBoundingClientRect().bottom
        : 0
    if (pin === 'LEFT')
      anchor = drawerRef.current
        ? drawerRef.current.getBoundingClientRect().left
        : 0

    const offset = direction === 'VERTICAL' ? clientY : clientX

    const delta = Math.abs(anchor - offset)

    this.setState({
      drawerSize: {
        value: delta,
        unit: 'PIXEL',
      },
      isDrawerCollapsed: delta <= (minSize.value ?? 0),
    })

    document.body.style.cursor =
      direction === 'VERTICAL' ? 'ns-resize' : 'ew-resize'
    document.addEventListener('mouseup', () => {
      document.body.style.cursor = ''
      document.removeEventListener('mousemove', this.onDrag)
    })
  }

  // Render
  render() {
    const { id, pin, children, direction, border, maxSize, minSize } =
      this.props
    const { drawerSize } = this.state

    return (
      <div
        id={id}
        style={{
          ...this.setBorder(border),
          ...(direction === 'VERTICAL'
            ? {
                height: this.setUnit(drawerSize),
                maxHeight: this.setUnit(maxSize),
                minHeight: this.setUnit(minSize),
              }
            : {
                width: this.setUnit(drawerSize),
                maxWidth: this.setUnit(maxSize),
                minWidth: this.setUnit(minSize),
              }),
        }}
        className={['drawer'].filter((n) => n).join(' ')}
        role="layout"
        ref={this.drawerRef}
      >
        <div
          className={[
            'drawer__knob',
            pin === 'TOP' && 'drawer__knob--top',
            pin === 'LEFT' && 'drawer__knob--left',
            pin === 'BOTTOM' && 'drawer__knob--bottom',
            pin === 'RIGHT' && 'drawer__knob--right',
          ]
            .filter((n) => n)
            .join(' ')}
          onMouseDown={this.onGrab}
          onClick={this.clickHandler}
        />
        {children}
      </div>
    )
  }
}
