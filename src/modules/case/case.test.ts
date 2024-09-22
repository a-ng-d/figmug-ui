import { it, expect } from 'vitest'
import { Case } from './case'

it('renders with the correct Camel Case', () => {
  expect(
    new Case('My pretty function for my little algorithm').doCamelCase()
  ).toBe('myPrettyFunctionForMyLittleAlgorithm')
})

it('renders with the correct Kebab Case', () => {
  expect(
    new Case('My pretty function for my little algorithm').doKebabCase()
  ).toBe('my-pretty-function-for-my-little-algorithm')
})

it('renders with the correct Pascal Case', () => {
  expect(
    new Case('My pretty function for my little algorithm').doPascalCase()
  ).toBe('MyPrettyFunctionForMyLittleAlgorithm')
})

it('renders with the correct Snake Case', () => {
  expect(
    new Case('My pretty function for my little algorithm').doSnakeCase()
  ).toBe('my_pretty_function_for_my_little_algorithm')
})
