import css from '@terrazzo/plugin-css'
import { defineConfig } from '@terrazzo/cli'

export default defineConfig({
  tokens: ['./tokens/platforms/figma/typography.json'],
  outDir: './src/styles/tokens/',
  plugins: [
    css({
      filename: 'figma-types.scss',
      baseSelector: ':root[data-theme="figma"]',
    }),
  ],
  lint: {
    rules: {
      // my lint rules
    },
  },
})
