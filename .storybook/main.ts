import type { StorybookConfig } from '@storybook/react-vite'
import path from 'path'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@chromatic-com/storybook',
      options: {
        configFile: 'chromatic.config.json',
      },
    },
    '@storybook/addon-interactions',
    '@storybook/addon-backgrounds',
    'storybook-addon-data-theme-switcher',
    '@storybook/addon-viewport',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {},
  viteFinal: async (config) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, '../src/components'),
      '@stories': path.resolve(__dirname, '../src/stories'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@tps': path.resolve(__dirname, '../src/types'),
    }
    return config
  },
}
export default config
