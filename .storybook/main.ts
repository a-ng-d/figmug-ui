import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@chromatic-com/storybook',
      options: {
        configFile: 'chromatic.config.json',
      },
    },
    '@storybook/addon-interactions',
    'storybook-addon-data-theme-switcher',
    '@storybook/addon-viewport',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {},
}
export default config
