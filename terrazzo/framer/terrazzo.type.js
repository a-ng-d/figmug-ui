import css from '@terrazzo/plugin-css'
import { defineConfig } from '@terrazzo/cli'

export default defineConfig({
  tokens: ['./tokens/platforms/framer/typography.json'],
  outDir: './src/styles/tokens/',
  plugins: [
    css({
      filename: 'framer-types.scss',
      baseSelector: ':root[data-theme="framer"]',
    }),
  ],
  lint: {
    rules: {
      // my lint rules
    },
  },
})
