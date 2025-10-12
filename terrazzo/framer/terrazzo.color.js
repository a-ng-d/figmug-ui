import css from '@terrazzo/plugin-css'
import { defineConfig } from '@terrazzo/cli'

export default defineConfig({
  tokens: ['./tokens/platforms/framer/color.json'],
  outDir: './src/styles/tokens/',
  plugins: [
    css({
      filename: 'framer-colors.scss',
      legacyHex: true,
      modeSelectors: [
        {
          mode: 'framer-light',
          selectors: ['[data-mode="framer-light"]'],
        },
        {
          mode: 'framer-dark',
          selectors: ['[data-mode="framer-dark"]'],
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
