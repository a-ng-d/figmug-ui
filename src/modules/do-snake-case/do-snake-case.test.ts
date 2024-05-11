import { it, expect } from 'vitest'
import { doSnakeCase } from './do-snake-case';

it('renders with the correct text', () => {
  expect(doSnakeCase('My pretty function for my little algorithm')).toBe(
    'my_pretty_function_for_my_little_algorithm'
  );
});