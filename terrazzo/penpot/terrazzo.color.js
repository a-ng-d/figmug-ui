import css from '@terrazzo/plugin-css'
import { defineConfig } from '@terrazzo/cli'

export default defineConfig({
  tokens: ['./tokens/platforms/penpot/color.json'],
  outDir: './src/styles/tokens/',
  plugins: [
    css({
      filename: 'penpot-colors.scss',
      legacyHex: true,
      modeSelectors: [
        {
          mode: 'penpot-light',
          selectors: ['[data-mode="penpot-light"]'],
        },
        {
          mode: 'penpot-dark',
          selectors: ['[data-mode="penpot-dark"]'],
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
