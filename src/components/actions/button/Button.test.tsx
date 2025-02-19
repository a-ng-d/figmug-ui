import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Button from './Button'
import Icon from '@components/assets/icon/Icon'

describe('Primary Button test:', () => {
  afterEach(cleanup)

  it('should render component', () => {
    render(
      <Button
        type="primary"
        label="Testing"
      />
    )
  })

  it('should render label', () => {
    render(
      <Button
        type="primary"
        label="Testing"
      />
    )
    screen.getByText('Testing')
  })

  it('should render loader', () => {
    render(
      <Button
        type="primary"
        label="Testing"
        isLoading
      />
    )

    const icon = screen.getByRole('icon')

    expect(icon).toBeInTheDocument()
    expect(icon).toHaveStyle('backgroundColor: var(--figma-color-icon-onbrand)')
  })

  it('should render caret', () => {
    render(
      <Button
        type="primary"
        label="Testing"
        hasMultipleActions
      />
    )

    const icon = screen.getByRole('icon')

    expect(icon).toBeInTheDocument()
    expect(icon).toHaveStyle('backgroundColor: var(--figma-color-icon-onbrand)')
  })

  it('should be disabled', () => {
    render(
      <Button
        type="primary"
        label="Testing"
        isDisabled
      />
    )
    expect(screen.getByRole('action-button')).toBeDisabled()
  })

  it('action triggers properly', async () => {
    const mockFn = vi.fn()
    render(
      <Button
        type="primary"
        label="Testing"
        action={mockFn}
      />
    )

    const actionButton = screen.getByRole('action-button')

    expect(mockFn).toHaveBeenCalledTimes(0)
    fireEvent.mouseDown(actionButton)
    expect(mockFn).toHaveBeenCalledTimes(1)
    actionButton.focus()
    fireEvent.keyDown(document.activeElement || document.body, { key: ' ' })
    expect(mockFn).toHaveBeenCalledTimes(2)
    actionButton.focus()
    fireEvent.keyDown(document.activeElement || document.body, { key: 'Enter' })
    expect(mockFn).toHaveBeenCalledTimes(3)
  })

  it('action does not trigger properly when blocked', async () => {
    const mockFn = vi.fn()
    render(
      <Button
        type="primary"
        label="Testing"
        isBlocked={true}
        action={mockFn}
      />
    )

    const actionButton = screen.getByRole('action-button')
    const chip = screen.getByRole('chip')

    expect(mockFn).toHaveBeenCalledTimes(0)
    fireEvent.mouseDown(actionButton)
    expect(mockFn).toHaveBeenCalledTimes(0)
    actionButton.removeAttribute('disabled')
    fireEvent.mouseDown(actionButton)
    expect(mockFn).toHaveBeenCalledTimes(0)
    expect(chip).toHaveClass('chip')
  })

  it('disabled prevents action', async () => {
    const mockFn = vi.fn()
    render(
      <Button
        type="primary"
        label="Testing"
        isDisabled
        action={mockFn}
      />
    )

    const actionButton = screen.getByRole('action-button')

    expect(mockFn).toHaveBeenCalledTimes(0)
    fireEvent.mouseDown(actionButton)
    expect(mockFn).toHaveBeenCalledTimes(0)
    actionButton.focus()
    fireEvent.keyDown(document.activeElement || document.body, { key: ' ' })
    expect(mockFn).toHaveBeenCalledTimes(0)
  })
})

describe('Secondary Button test:', () => {
  afterEach(cleanup)

  it('should render loader', () => {
    render(
      <Button
        type="secondary"
        label="Testing"
        isLoading
      />
    )

    const icon = screen.getByRole('icon')

    expect(icon).toBeInTheDocument()
    expect(icon).toHaveStyle('backgroundColor: var(--figma-color-icon)')
  })

  it('should render caret', () => {
    render(
      <Button
        type="secondary"
        label="Testing"
        hasMultipleActions
      />
    )

    const icon = screen.getByRole('icon')

    expect(icon).toBeInTheDocument()
    expect(icon).toHaveStyle('backgroundColor: var(--figma-color-icon)')
  })
})

describe('Link Button test:', () => {
  afterEach(cleanup)

  it('should render component', () => {
    render(
      <Button
        type="tertiary"
        label="Testing"
        isLink
      />
    )
  })

  it('should render label', () => {
    render(
      <Button
        type="tertiary"
        label="Testing"
        isLink
      />
    )
    screen.getByText('Testing')
  })
})

describe('Icon Button test:', () => {
  afterEach(cleanup)

  it('should render component', () => {
    render(
      <Button
        type="icon"
        icon="adjust"
      />
    )
  })

  it('should render component with a custom icon', () => {
    render(
      <Button
        type="icon"
        customIcon={
          <Icon
            type="PICTO"
            iconName="adjust"
          />
        }
      />
    )

    expect(screen.getByRole('icon-button')).toContainElement(
      screen.getByRole('icon')
    )
  })

  it('should be disabled', () => {
    render(
      <Button
        type="icon"
        icon="adjust"
        isDisabled
      />
    )

    expect(screen.getByRole('icon-button')).toBeDisabled()
  })

  it('action triggers properly', async () => {
    const mockFn = vi.fn()

    render(
      <Button
        type="icon"
        icon="adjust"
        action={mockFn}
      />
    )

    const iconButton = screen.getByRole('icon-button')

    expect(mockFn).toHaveBeenCalledTimes(0)
    fireEvent.mouseDown(iconButton)
    expect(mockFn).toHaveBeenCalledTimes(1)
    iconButton.focus()
    fireEvent.keyDown(document.activeElement || document.body, { key: ' ' })
    expect(mockFn).toHaveBeenCalledTimes(2)
    iconButton.focus()
    fireEvent.keyDown(document.activeElement || document.body, { key: 'Enter' })
    expect(mockFn).toHaveBeenCalledTimes(3)
  })

  it('action does not trigger properly when blocked', async () => {
    const mockFn = vi.fn()
    render(
      <Button
        type="icon"
        icon="adjust"
        isBlocked={true}
        action={mockFn}
      />
    )

    const iconButton = screen.getByRole('icon-button')

    expect(mockFn).toHaveBeenCalledTimes(0)
    fireEvent.mouseDown(iconButton)
    expect(mockFn).toHaveBeenCalledTimes(0)
    iconButton.removeAttribute('disabled')
    fireEvent.mouseDown(iconButton)
    expect(mockFn).toHaveBeenCalledTimes(0)
  })

  it('tooltip is displayed properly when helper is defined', async () => {
    render(
      <Button
        type="icon"
        icon="adjust"
        helper={{
          label: 'Testing',
        }}
      />
    )

    const iconButton = screen.getByRole('icon-button')

    fireEvent.focus(iconButton)
    expect(screen.getByText('Testing')).toBeInTheDocument()
    fireEvent.blur(iconButton)
    expect(screen.queryByText('Testing')).not.toBeInTheDocument()

    fireEvent.mouseEnter(iconButton)
    expect(screen.getByText('Testing')).toBeInTheDocument()
    fireEvent.mouseLeave(iconButton)
    expect(screen.queryByText('Testing')).not.toBeInTheDocument()
  })

  it('disabled prevents action', async () => {
    const mockFn = vi.fn()
    render(
      <Button
        type="icon"
        icon="adjust"
        isDisabled
        action={mockFn}
      />
    )

    const button = screen.getByRole('icon-button')

    expect(mockFn).toHaveBeenCalledTimes(0)
    fireEvent.mouseDown(button)
    expect(mockFn).toHaveBeenCalledTimes(0)
    button.focus()
    fireEvent.keyDown(document.activeElement || document.body, { key: ' ' })
    expect(mockFn).toHaveBeenCalledTimes(0)
  })
})

describe('Compact Button test:', () => {
  afterEach(cleanup)

  it('should render component', () => {
    render(
      <Button
        type="compact"
        label="Compact"
      />
    )
  })

  it('should render label', () => {
    render(
      <Button
        type="compact"
        label="Compact"
      />
    )

    screen.getByText('Compact')
  })

  it('should be disabled', () => {
    render(
      <Button
        type="compact"
        label="Compact button"
        isDisabled
      />
    )

    expect(screen.getByRole('compact-button')).toBeDisabled()
  })

  it('action triggers properly', async () => {
    const mockFn = vi.fn()
    render(
      <Button
        type="compact"
        label="Compact button"
        action={mockFn}
      />
    )

    const compactButton = screen.getByRole('compact-button')

    expect(mockFn).toHaveBeenCalledTimes(0)
    fireEvent.mouseDown(compactButton)
    expect(mockFn).toHaveBeenCalledTimes(1)
    compactButton.focus()
    fireEvent.keyDown(document.activeElement || document.body, { key: ' ' })
    expect(mockFn).toHaveBeenCalledTimes(2)
    compactButton.focus()
    fireEvent.keyDown(document.activeElement || document.body, { key: 'Enter' })
    expect(mockFn).toHaveBeenCalledTimes(3)
  })

  it('action does not trigger properly when blocked', async () => {
    const mockFn = vi.fn()
    render(
      <Button
        type="compact"
        label="Compact button"
        isBlocked={true}
        action={mockFn}
      />
    )
    const compactButton = screen.getByRole('compact-button')

    expect(mockFn).toHaveBeenCalledTimes(0)
    fireEvent.mouseDown(compactButton)
    expect(mockFn).toHaveBeenCalledTimes(0)
    compactButton.removeAttribute('disabled')
    fireEvent.mouseDown(compactButton)
    expect(mockFn).toHaveBeenCalledTimes(0)
  })

  it('disabled prevents action', async () => {
    const mockFn = vi.fn()
    render(
      <Button
        type="compact"
        label="Compact button"
        isDisabled
        action={mockFn}
      />
    )
    const compactButton = screen.getByRole('compact-button')

    expect(mockFn).toHaveBeenCalledTimes(0)
    fireEvent.mouseDown(compactButton)
    expect(mockFn).toHaveBeenCalledTimes(0)
    compactButton.focus()
    fireEvent.keyDown(document.activeElement || document.body, { key: ' ' })
    expect(mockFn).toHaveBeenCalledTimes(0)
  })
})
