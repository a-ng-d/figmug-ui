import css from '@terrazzo/plugin-css'
import { defineConfig } from '@terrazzo/cli'

export default defineConfig({
  name: 'Unoff',
  tokens: ['./tokens/unoff.resolver.json'],
  outDir: './src/styles/tokens/',
  plugins: [
    css({
      filename: 'all.scss',
      contextSelectors: [
        {
          selector: ':root',
          context: { theme: 'figma', mode: 'figma-light' },
        },
        {
          selector: '[data-theme="figma"][data-mode="figma-light"]',
          context: { theme: 'figma', mode: 'figma-light' },
        },
        {
          selector: '[data-theme="figma"][data-mode="figma-dark"]',
          context: { theme: 'figma', mode: 'figma-dark' },
        },
        {
          selector: '[data-theme="penpot"][data-mode="penpot-light"]',
          context: { theme: 'penpot', mode: 'penpot-light' },
        },
        {
          selector: '[data-theme="penpot"][data-mode="penpot-dark"]',
          context: { theme: 'penpot', mode: 'penpot-dark' },
        },
        {
          selector: '[data-theme="sketch"][data-mode="sketch-light"]',
          context: { theme: 'sketch', mode: 'sketch-light' },
        },
        {
          selector: '[data-theme="sketch"][data-mode="sketch-dark"]',
          context: { theme: 'sketch', mode: 'sketch-dark' },
        },
        {
          selector: '[data-theme="framer"][data-mode="framer-light"]',
          context: { theme: 'framer', mode: 'framer-light' },
        },
        {
          selector: '[data-theme="framer"][data-mode="framer-dark"]',
          context: { theme: 'framer', mode: 'framer-dark' },
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
