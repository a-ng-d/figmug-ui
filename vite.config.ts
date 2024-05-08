import path, { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { globSync } from 'glob'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      exclude: [
        './src/stories',
        './src/test',
        './src/components/**/*.test.tsx'
      ]
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './src/main.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      input: Object.fromEntries(
        globSync(['./src/components/**/*.tsx', './src/index.ts'])
          .filter(file => !/\.test\.tsx$/.test(file))
          .map((file) => {
            const entryName = path.relative(
              'src',
              file.slice(0, file.length - path.extname(file).length)
            )
            const entryUrl = fileURLToPath(new URL(file, import.meta.url))
            return [entryName, entryUrl]
          })
      ),
      output: {
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name][extname]',
        globals: {
          react: 'React',
          'react-dom': 'React-dom',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      include: ['./src/components'],
      exclude: ['./src/stories'],
    },
  },
})