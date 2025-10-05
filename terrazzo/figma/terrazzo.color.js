import css from '@terrazzo/plugin-css'
import { defineConfig } from '@terrazzo/cli'

export default defineConfig({
  tokens: ['./tokens/platforms/figma/color.json'],
  outDir: './src/styles/tokens/',
  plugins: [
    css({
      filename: 'figma-colors.scss',
      legacyHex: true,
      modeSelectors: [
        {
          mode: 'figma-light',
          selectors: ['[data-mode="figma-light"]'],
        },
        {
          mode: 'figma-dark',
          selectors: ['[data-mode="figma-dark"]'],
        },
        {
          mode: 'figjam',
          selectors: ['[data-mode="figjam"]'],
        },
      ],
    }),
  ],
  lint: {
    rules: {
      // my lint rules
    },
  },
})
