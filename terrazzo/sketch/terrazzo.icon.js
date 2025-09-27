import css from '@terrazzo/plugin-css'
import { defineConfig } from '@terrazzo/cli'

export default defineConfig({
  name: 'global',
  tokens: ['./tokens/platforms/sketch/icon.json'],
  outDir: './src/styles/icons/',
  plugins: [
    css({
      filename: 'styles/sketch.scss',
      exclude: [
        'sketch.color.*',
        'font.*',
        'size.*',
        'shadow.*',
        'border.*',
        'grey.*',
        'elevation.*',
      ],
      baseSelector: ':root[data-theme="sketch"]',
    }),
  ],
  lint: {
    rules: {
      // my lint rules
    },
  },
})
