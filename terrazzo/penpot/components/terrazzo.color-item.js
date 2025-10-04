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
    './tokens/platforms/penpot/color.json',
    './tokens/platforms/penpot/typography.json',
    './tokens/platforms/penpot/icon.json',
    './tokens/platforms/penpot/components/color-item.json',
  ],
  outDir: './src/components/lists/color-item/',
  plugins: [
    css({
      filename: 'styles/penpot.scss',
      exclude: [
        'penpot.color.*',
        'font.*',
        'size.*',
        'shadow.*',
        'border.*',
        'grey.*',
        'elevation.*',
        'icon.*',
      ],
      baseSelector: ':root[data-theme="penpot"]',
    }),
  ],
  lint: {
    rules: {
      // my lint rules
    },
  },
})
