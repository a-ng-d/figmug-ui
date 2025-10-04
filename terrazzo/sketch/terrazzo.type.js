import css from '@terrazzo/plugin-css'
import { defineConfig } from '@terrazzo/cli'

export default defineConfig({
  tokens: ['./tokens/platforms/sketch/typography.json'],
  outDir: './src/styles/tokens/',
  plugins: [
    css({
      filename: 'sketch-types.scss',
      baseSelector: ':root[data-theme="sketch"]',
    }),
  ],
  lint: {
    rules: {
      // my lint rules
    },
  },
})
