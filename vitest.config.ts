import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import react from '@vitejs/plugin-react'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    storybookTest({
      configDir: '.storybook',
      storybookUrl: process.env.SB_URL,
    }),
  ],
  test: {
    name: `storybook:${path.resolve(__dirname, '.storybook')}`,
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
    setupFiles: ['./.storybook/vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        '.storybook/',
        'coverage/',
        'dist/',
        '**/*.d.ts',
        '**/*.stories.tsx',
        '**/index.ts',
      ],
      include: ['src/**/*.{ts,tsx}'],
    },
  },
})
