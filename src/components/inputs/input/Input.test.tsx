import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import { Input, InputProps } from './Input'

const NumericStepperProps: InputProps = {
  type: 'NUMBER',
  value: '10',
  min: '10',
  max: '100',
  step: '1',
}

const ColorPickerProps: InputProps = {
  type: 'COLOR',
  value: '#87ebe7',
}

describe('Numeric stepper test:', () => {
  afterEach(cleanup)

  it('should render component', () => {
    render(<Input {...NumericStepperProps} />)
  })

  it('should render value', () => {
    render(<Input {...NumericStepperProps} />)
    screen.getByDisplayValue('10')
  })

  it('should be disabled', () => {
    render(
      <Input
        {...NumericStepperProps}
        isDisabled
      />
    )
    expect(screen.getByRole('numeric-stepper')).toBeDisabled()
  })

  it('should type 20', () => {
    render(<Input {...NumericStepperProps} />)
    fireEvent.change(screen.getByRole('numeric-stepper'), {
      target: { value: '20' },
    })
    screen.getByDisplayValue('20')
  })
})

describe('Color picker test:', () => {
  afterEach(cleanup)

  it('should render component', () => {
    render(<Input {...ColorPickerProps} />)
  })

  it('should render color and hexa code', () => {
    render(<Input {...ColorPickerProps} />)
    expect(screen.getByRole('color-picker')).toHaveValue('#87ebe7')
    expect(screen.getByRole('color-display')).toHaveValue('87EBE7')
  })

  it('should be disabled', () => {
    render(
      <Input
        {...ColorPickerProps}
        isDisabled
      />
    )
    expect(screen.getByRole('color-picker')).toBeDisabled()
    expect(screen.getByRole('color-display')).toBeDisabled()
  })
})
