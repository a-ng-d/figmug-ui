module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
    'eslint-config-prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern: '@a_ng_d/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@storybook/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@tps/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@components/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@stories/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@styles/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '*.scss',
            group: 'sibling',
            position: 'after',
          },
        ],
        'newlines-between': 'never',
        alphabetize: {
          order: 'desc',
          caseInsensitive: true,
        },
      },
    ],
    curly: ['warn', 'multi'],
    'prefer-const': 'warn',
  },
}
