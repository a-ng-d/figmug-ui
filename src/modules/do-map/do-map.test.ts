import { it, expect } from 'vitest'
import { doMap } from './do-map'

it('renders with the correct value (simple)', () => {
  expect(doMap(5, 0, 10, 0, 20)).toBe(10)
})

it('renders with the correct value (negative)', () => {
  expect(doMap(5, -10, 10, 0, 20)).toBe(15)
})
