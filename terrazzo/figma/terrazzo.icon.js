import css from '@terrazzo/plugin-css'
import { defineConfig } from '@terrazzo/cli'

export default defineConfig({
  name: 'global',
  tokens: ['./tokens/platforms/figma/icon.json'],
  outDir: './src/styles/icons/',
  plugins: [
    css({
      filename: 'styles/figma.scss',
      baseSelector: ':root[data-theme="figma"]',
    }),
  ],
  lint: {
    rules: {
      // my lint rules
    },
  },
})
