import { it, expect } from 'vitest'
import { doKebabCase } from './do-kebab-case';

it('renders with the correct text', () => {
  expect(doKebabCase('My pretty function for my little algorithm')).toBe(
    'my-pretty-function-for-my-little-algorithm'
  );
});
