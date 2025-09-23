import css from '@terrazzo/plugin-css'
import { defineConfig } from '@terrazzo/cli'

export default defineConfig({
  name: 'global',
  tokens: [
    './tokens/global/color.json',
    './tokens/global/typography.json',
    './tokens/global/spacing.json',
    './tokens/global/effect.json',
    './tokens/global/radius.json',
  ],
  outDir: './src/styles/tokens/',
  plugins: [
    css({
      filename: 'globals.scss',
      baseSelector: ':root',
    }),
  ],
  lint: {
    rules: {
      // my lint rules
    },
  },
})
