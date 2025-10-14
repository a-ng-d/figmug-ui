import css from '@terrazzo/plugin-css'
import { defineConfig } from '@terrazzo/cli'

export default defineConfig({
  name: 'global',
  tokens: [
    './tokens/globals/color.json',
    './tokens/globals/typography.json',
    './tokens/globals/spacing.json',
    './tokens/globals/effect.json',
    './tokens/globals/radius.json',
  ],
  outDir: './src/styles/tokens/',
  plugins: [
    css({
      filename: 'globals.scss',
      baseSelector: ':root',
      modeSelectors: [
        {
          mode: 'light',
          selectors: ['[data-mode*="light"]'],
        },
        {
          mode: 'dark',
          selectors: ['[data-mode*="dark"]'],
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
