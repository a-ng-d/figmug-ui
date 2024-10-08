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
        './src/components/**/*.test.tsx',
        './src/modules/**/*.test.ts',
      ],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      formats: ['es'],
    },
    emptyOutDir: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      input: Object.fromEntries(
        globSync([
          './src/index.ts',
          './src/components/**/*.tsx',
          './src/modules/**/*.ts',
          './src/styles/*.scss',
        ])
          .filter(
            (file) => !/\.test\.tsx|\.test\.ts|colors.module.scss$/.test(file)
          )
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
      include: ['./src/components', './src/modules'],
      exclude: ['./src/stories'],
    },
  },
})
