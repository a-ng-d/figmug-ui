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
    './tokens/platforms/sketch/color.json',
    './tokens/platforms/sketch/typography.json',
    './tokens/platforms/sketch/icon.json',
    './tokens/platforms/sketch/components/icon-chip.json',
  ],
  outDir: './src/components/tags/icon-chip/',
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
        'icon.*',
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
