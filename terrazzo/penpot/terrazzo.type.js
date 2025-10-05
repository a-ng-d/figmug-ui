import css from '@terrazzo/plugin-css'
import { defineConfig } from '@terrazzo/cli'

export default defineConfig({
  tokens: ['./tokens/platforms/penpot/typography.json'],
  outDir: './src/styles/tokens/',
  plugins: [
    css({
      filename: 'penpot-types.scss',
      baseSelector: ':root[data-theme="penpot"]',
    }),
  ],
  lint: {
    rules: {
      // my lint rules
    },
  },
})
