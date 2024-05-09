import type { Preview } from '@storybook/react'
import type { ThemeConfig } from 'storybook-addon-data-theme-switcher'

import 'figma-plugin-ds/dist/figma-plugin-ds.css'
import '../src/styles/colors.module.scss'

export const globalTypes = {
  dataTheme: {
    defaultValue: 'Figma Dark',
  },
  dataThemes: {
    defaultValue: {
      list: [
        {
          name: 'Figma Light',
          dataTheme: 'figma-light',
          color: '#ffffff'
        },
        {
          name: 'Figma Dark',
          dataTheme: 'figma-dark',
          color: '#2c2c2c'
        },
        {
          name: 'FigJam',
          dataTheme: 'figjam',
          color: '#ffffff'
        },
      ],
      dataAttribute: 'data-theme',
      clearable: false,
      toolbar: {
        title: 'Change Figma Editor',
        icon: 'paintbrush',
      },
    } satisfies ThemeConfig,
  },
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: globalTypes.dataTheme.defaultValue,
      values: [
        {
          name: 'Figma Light',
          value: '#ffffff',
        },
        {
          name: 'Figma Dark',
          value: '#2c2c2c',
        },
        {
          name: 'FigJam',
          value: '#ffffff',
        },
      ],
    },
  }
}

export default preview
