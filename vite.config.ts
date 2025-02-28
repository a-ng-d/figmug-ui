import react from '@vitejs/plugin-react'
import { globSync } from 'glob'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import { defineConfig } from 'vitest/config'

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
    //modifyCssPaths(),
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
    assetsInlineLimit: 0,
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      input: Object.fromEntries(
        globSync([
          './src/index.ts',
          './src/components/**/*.tsx',
          './src/styles/**/*.scss',
          './src/styles/icons/*.svg',
          './src/types/**/*.ts',
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
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        '.storybook',
        'src/styles',
        'src/stories',
        'src/test/*.ts',
        '.eslintrc.cjs',
        'src/index.ts',
        'src/**/*.d.ts',
      ],
    },
  },
})
