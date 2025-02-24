import type { Preview } from '@storybook/react'
import type { ThemeConfig } from 'storybook-addon-data-theme-switcher'
import React, { useEffect } from 'react'

import '@styles/tokens/figma-colors.scss'
import '@styles/tokens/figma-types.scss'
import '@styles/tokens/globals.scss'

export const globalTypes = {
  dataTheme: {
    defaultValue: 'figma-dark',
  },
  dataThemes: {
    defaultValue: {
      list: [
        {
          name: 'Figma Light',
          dataTheme: 'figma-light',
          color: '#ffffff',
        },
        {
          name: 'Figma Dark',
          dataTheme: 'figma-dark',
          color: '#2c2c2c',
        },
        {
          name: 'FigJam',
          dataTheme: 'figjam',
          color: '#ffffff',
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
      default: 'Figma Dark',
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
          value: '#fffffe',
        },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      useEffect(() => {
        const background = context.globals.backgrounds?.value
        let theme = 'figma-dark'

        if (background === '#fffffe') {
          theme = 'figjam'
        } else if (background === '#ffffff') {
          theme = 'figma-light'
        } else if (background === '#2c2c2c') {
          theme = 'figma-dark'
        }

        document.documentElement.setAttribute('data-theme', theme)
      }, [context.globals.backgrounds])

      return <Story />
    },
  ],
}

export default preview
