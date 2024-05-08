import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, it, vi, expect } from 'vitest'
import { Button } from './Button'

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
    expect(mockFn).toHaveBeenCalledTimes(0)
    fireEvent.mouseDown(screen.getByRole('action-button'))
    expect(mockFn).toHaveBeenCalledTimes(1)
    screen.getByRole('action-button').focus()
    fireEvent.keyDown(document.activeElement || document.body, { key: ' ' })
    expect(mockFn).toHaveBeenCalledTimes(2)
    screen.getByRole('action-button').focus()
    fireEvent.keyDown(document.activeElement || document.body, { key: 'Enter' })
    expect(mockFn).toHaveBeenCalledTimes(3)
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
    expect(mockFn).toHaveBeenCalledTimes(0)
    fireEvent.mouseDown(screen.getByRole('action-button'))
    expect(mockFn).toHaveBeenCalledTimes(0)
    screen.getByRole('action-button').focus()
    fireEvent.keyDown(document.activeElement || document.body, { key: ' ' })
    expect(mockFn).toHaveBeenCalledTimes(0)
  })
})
