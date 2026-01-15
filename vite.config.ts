import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vitest/config'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import dts from 'vite-plugin-dts'
import { globSync } from 'glob'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      exclude: [
        './src/stories',
        './src/test',
        './src/components/**/*.test.tsx',
      ],
    }),
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@stories': path.resolve(__dirname, './src/stories'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@tps': path.resolve(__dirname, './src/types'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      formats: ['es'],
    },
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      input: Object.fromEntries(
        globSync([
          './src/index.ts',
          './src/components/**/*.tsx',
          './src/styles/**/*.scss',
          './src/styles/tokens/modules/**/*.scss',
          './src/types/**/*.ts',
        ])
          .filter(
            (file) =>
              (!/\.test\.tsx|\.test\.ts$/.test(file) &&
                !/\/modules\/.*\.scss$/.test(file)) ||
              /\/modules\/.*\.module\.scss$/.test(file)
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
})
