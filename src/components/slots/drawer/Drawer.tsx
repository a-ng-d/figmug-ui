import React from 'react'
import { doClassnames } from '@a_ng_d/figmug-utils'
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
  isScrolling?: boolean
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

  static defaultProps: Partial<DrawerProps> = {
    isScrolling: false,
  }

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
    const property = 'var(--drawer-border)' as React.CSSProperties
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
    const { direction, pin, minSize, maxSize } = this.props
    const { drawerRef } = this
    const { clientX, clientY } = e

    if (!drawerRef.current) return

    const rect = drawerRef.current.getBoundingClientRect()
    const parentRect = drawerRef.current.parentElement?.getBoundingClientRect()

    if (!parentRect) return

    let delta = 0
    const parentSize =
      direction === 'VERTICAL' ? parentRect.height : parentRect.width

    if (pin === 'TOP') {
      const maxDelta = parentRect.bottom - rect.top
      delta = Math.min(clientY - rect.top, maxDelta)
    } else if (pin === 'BOTTOM') {
      const maxDelta = rect.bottom - parentRect.top
      delta = Math.min(rect.bottom - clientY, maxDelta)
    } else if (pin === 'LEFT') {
      const maxDelta = parentRect.right - rect.left
      delta = Math.min(clientX - rect.left, maxDelta)
    } else if (pin === 'RIGHT') {
      const maxDelta = rect.right - parentRect.left
      delta = Math.min(rect.right - clientX, maxDelta)
    }

    delta = Math.max(0, delta)

    const minPixels =
      minSize.unit === 'PERCENT'
        ? ((minSize.value ?? 0) * parentSize) / 100
        : minSize.value ?? 0
    const maxPixels =
      maxSize.unit === 'PERCENT'
        ? ((maxSize.value ?? 100) * parentSize) / 100
        : maxSize.value ?? Infinity

    delta = Math.max(minPixels, Math.min(delta, maxPixels))

    this.setState({
      drawerSize: {
        value: maxSize.unit === 'PERCENT' ? (delta / parentSize) * 100 : delta,
        unit: maxSize.unit,
      },
      isDrawerCollapsed: delta <= minPixels,
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
    const {
      id,
      pin,
      children,
      direction,
      border,
      maxSize,
      minSize,
      isScrolling,
    } = this.props
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
        className={doClassnames(['drawer', isScrolling && 'drawer--scrolling'])}
        role="complementary"
        ref={this.drawerRef}
      >
        <div
          className={doClassnames([
            'drawer__knob',
            pin === 'TOP' && 'drawer__knob--top',
            pin === 'LEFT' && 'drawer__knob--left',
            pin === 'BOTTOM' && 'drawer__knob--bottom',
            pin === 'RIGHT' && 'drawer__knob--right',
          ])}
          onMouseDown={this.onGrab}
          onClick={this.clickHandler}
          role="separator"
          aria-orientation={
            direction === 'VERTICAL' ? 'vertical' : 'horizontal'
          }
          aria-valuemin={minSize.value}
          aria-valuemax={maxSize.value}
          aria-valuenow={drawerSize.value}
        />
        <div role="region">{children}</div>
      </div>
    )
  }
}
