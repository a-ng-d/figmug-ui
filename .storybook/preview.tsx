import type { Preview } from '@storybook/react'
import type { ThemeConfig } from 'storybook-addon-data-theme-switcher'
import React, { useEffect } from 'react'

import '@styles/tokens/figma-colors.scss'
import '@styles/tokens/figma-types.scss'
import '@styles/tokens/penpot-colors.scss'
import '@styles/tokens/penpot-types.scss'
import '@styles/tokens/globals.scss'

export const globalTypes = {
  dataTheme: {
    defaultValue: 'figma-ui3',
  },
  dataThemes: {
    defaultValue: {
      list: [
        {
          name: 'Figma UI2',
          dataTheme: 'figma-ui2',
          color: '#0d99ff',
        },
        {
          name: 'Figma UI3',
          dataTheme: 'figma-ui3',
          color: '#9747ff',
        },
        {
          name: 'Penpot',
          dataTheme: 'penpot',
          color: '#00d1b8',
        },
      ],
      dataAttribute: 'data-theme',
      clearable: false,
      toolbar: {
        title: 'Change UI',
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
        {
          name: 'Penpot Light',
          value: '#fffffd',
        },
        {
          name: 'Penpot Dark',
          value: '#18181a',
        },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      useEffect(() => {
        const background = context.globals.backgrounds?.value
        const currentTheme = context.globals.dataTheme
        let mode = 'figma-dark'

        // Adapter le mode en fonction du thème
        if (currentTheme === 'penpot') {
          mode = background === '#fffffd' ? 'penpot-light' : 'penpot-dark'
        } else {
          if (background === '#fffffe') {
            mode = 'figjam'
          } else if (background === '#ffffff') {
            mode = 'figma-light'
          } else if (background === '#2c2c2c') {
            mode = 'figma-dark'
          }
        }

        document.documentElement.setAttribute('data-mode', mode)
      }, [context.globals.backgrounds])

      return <Story />
    },
  ],
}

export default preview
