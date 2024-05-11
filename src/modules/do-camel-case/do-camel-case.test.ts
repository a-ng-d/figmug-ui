import { it, expect } from 'vitest'
import { doCamelCase } from './do-camel-case';

it('renders with the correct text', () => {
  expect(doCamelCase('My pretty function for my little algorithm')).toBe(
    'myPrettyFunctionForMyLittleAlgorithm'
  );
});

