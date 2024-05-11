import { it, expect } from 'vitest'
import { doPascalCase } from './do-pascal-case'

it('renders with the correct text', () => {
  expect(doPascalCase('My pretty function for my little algorithm')).toBe(
    'MyPrettyFunctionForMyLittleAlgorithm'
  )
})
