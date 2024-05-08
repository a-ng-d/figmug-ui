import type { Preview } from '@storybook/react'

import 'figma-plugin-ds/dist/figma-plugin-ds.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
