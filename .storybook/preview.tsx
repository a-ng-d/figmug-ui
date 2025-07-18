import type { Preview, Decorator } from '@storybook/react'
import React from 'react'

import '@styles/tokens/modules/figma-colors.module.scss'
import '@styles/tokens/modules/figma-types.module.scss'

import '@styles/tokens/modules/penpot-colors.module.scss'
import '@styles/tokens/modules/penpot-types.module.scss'

import '@styles/tokens/modules/sketch-colors.module.scss'
import '@styles/tokens/modules/sketch-types.module.scss'

import '@styles/tokens/modules/globals.module.scss'

const withTheme: Decorator = (Story, context) => {
  React.useEffect(() => {
    const { themes, modes } = context.globals

    if (themes) {
      document.documentElement.setAttribute('data-theme', themes)
    }

    if (modes) {
      document.documentElement.setAttribute('data-mode', modes)

      const backgroundMap = {
        'figma-light': '#ffffff',
        'figma-dark': '#2c2c2c',
        figjam: '#ffffff',
        'penpot-light': '#ffffff',
        'penpot-dark': '#000000',
        'sketch-light': '#ffffff',
        'sketch-dark': '#202022',
      }

      const bgValue = backgroundMap[modes]
      document.documentElement.style.backgroundColor = bgValue

      if (context.globals.backgrounds) {
        context.globals.backgrounds.value = bgValue
      }
    }
  }, [context.globals.themes, context.globals.modes])

  return <Story />
}

const preview: Preview = {
  globalTypes: {
    themes: {
      defaultValue: 'figma-ui3',
      description: 'Select the UI theme (Figma UI2, Figma UI3, Penpot)',
      toolbar: {
        title: 'UI Theme',
        icon: 'paintbrush',
        items: ['figma-ui2', 'figma-ui3', 'penpot', 'sketch'],
        dynamicTitle: true,
      },
    },
    modes: {
      defaultValue: 'figma-dark',
      description:
        'Select the mode (Figma Light, Figma Dark, FigJam, Penpot Light, Penpot Dark)',
      toolbar: {
        title: 'Color Mode',
        icon: 'photo',
        items: [
          'figma-light',
          'figma-dark',
          'figjam',
          'penpot-light',
          'penpot-dark',
          'sketch-light',
          'sketch-dark',
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a111y: {
      element: '#root',
    },
  },
  decorators: [withTheme],
  tags: ['autodocs'],
}

export default preview
