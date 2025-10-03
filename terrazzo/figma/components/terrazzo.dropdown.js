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
    './tokens/platforms/figma/color.json',
    './tokens/platforms/figma/typography.json',
    './tokens/platforms/figma/icon.json',
    './tokens/platforms/figma/components/dropdown.json',
  ],
  outDir: './src/components/inputs/dropdown/',
  plugins: [
    css({
      filename: 'styles/figma.scss',
      exclude: [
        'figma.color.*',
        'font.*',
        'size.*',
        'shadow.*',
        'border.*',
        'grey.*',
        'elevation.*',
        'icon.*',
      ],
      baseSelector: ':root[data-theme="figma"]',
    }),
  ],
  lint: {
    rules: {
      // my lint rules
    },
  },
})
