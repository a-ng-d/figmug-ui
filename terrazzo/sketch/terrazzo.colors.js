import css from '@terrazzo/plugin-css'
import { defineConfig } from '@terrazzo/cli'

export default defineConfig({
  tokens: ['./tokens/platforms/sketch/color.json'],
  outDir: './src/styles/tokens/',
  plugins: [
    css({
      filename: 'sketch-colors.scss',
      modeSelectors: [
        {
          mode: 'light',
          selectors: ['[data-mode="sketch-light"]'],
        },
        {
          mode: 'dark',
          selectors: ['[data-mode="sketch-dark"]'],
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
