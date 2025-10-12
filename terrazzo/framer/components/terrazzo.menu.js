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
    './tokens/platforms/framer/color.json',
    './tokens/platforms/framer/typography.json',
    './tokens/platforms/framer/icon.json',
    './tokens/platforms/framer/components/menu.json',
  ],
  outDir: './src/components/actions/menu/',
  plugins: [
    css({
      filename: 'styles/framer.scss',
      exclude: [
        'framer.color.*',
        'font.*',
        'size.*',
        'shadow.*',
        'border.*',
        'grey.*',
        'elevation.*',
        'icon.*',
      ],
      baseSelector: ':root[data-theme="framer"]',
    }),
  ],
  lint: {
    rules: {
      // my lint rules
    },
  },
})
