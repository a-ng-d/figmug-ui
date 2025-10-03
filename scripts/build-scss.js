#!/usr/bin/env node
/**
 * Unified script to list and build Terrazzo SCSS files
 *
 * Usage:
 *
 * 1. List all Terrazzo files:
 *    node scripts/build-scss.js
 *    npm run scss:list
 *
 * 2. Build all Terrazzo files:
 *    node scripts/build-scss.js --build
 *    npm run scss:build
 *
 * 3. Build all files for a specific theme:
 *    node scripts/build-scss.js --build --theme=sketch
 *    npm run scss:build theme=sketch
 *
 * 4. Build a specific component for a theme:
 *    node scripts/build-scss.js --build --theme=sketch --component=button
 *    npm run scss:build theme=sketch component=button
 *
 */
import { fileURLToPath } from 'url'
import process from 'process'
import path from 'path'
import { dirname } from 'path'
import fs from 'fs'
import { spawn } from 'child_process'
import chalk from 'chalk'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = path.join(__dirname, '..')
// Process command line arguments
const args = process.argv.slice(2)
let BUILD_MODE = args.includes('--build')
let THEME = null
let COMPONENT = null
// Handle two possible argument formats:
// 1. Legacy style: --theme=sketch --component=button
// 2. New style: theme=sketch component=button
args.forEach((arg) => {
  // Legacy style with --
  if (arg.startsWith('--theme=')) THEME = arg.split('=')[1]
  else if (arg.startsWith('--component=')) COMPONENT = arg.split('=')[1]
  // New style without --
  else if (arg.startsWith('theme=')) {
    THEME = arg.split('=')[1]
    BUILD_MODE = true // If theme is specified, enable build mode
  } else if (arg.startsWith('component=')) {
    COMPONENT = arg.split('=')[1]
    BUILD_MODE = true // If component is specified, enable build mode
  }
})
// If component is specified but no theme, build for all themes
// This will be handled in the main function
// Function to find all Terrazzo files
function findTerrazzoFiles(dir) {
  let results = []
  const files = fs.readdirSync(dir, { withFileTypes: true })
  for (const file of files) {
    const fullPath = path.join(dir, file.name)
    if (file.isDirectory())
      results = results.concat(findTerrazzoFiles(fullPath))
    else if (file.name.startsWith('terrazzo.') && file.name.endsWith('.js'))
      results.push(fullPath)
  }
  return results
}
// Function to group files by theme
function groupFilesByTheme(files) {
  return files.reduce((acc, file) => {
    const relativePath = file.replace(projectRoot, '')
    const pathParts = relativePath.split('/')
    const theme = pathParts[2]
    const isComponent = pathParts.includes('components')
    const componentName = isComponent
      ? path.basename(file, '.js').replace('terrazzo.', '')
      : path.basename(file, '.js').replace('terrazzo.', '')
    if (!acc[theme]) acc[theme] = { tokens: [], components: [] }
    if (isComponent)
      acc[theme].components.push({
        name: componentName,
        path: file,
        relativePath,
      })
    else
      acc[theme].tokens.push({ name: componentName, path: file, relativePath })
    return acc
  }, {})
}
// Function to execute terrazzo build on a file
async function buildTerrazzoFile(filePath) {
  return new Promise((resolve, reject) => {
    console.log(chalk.blue(`\nBuilding ${filePath}...`))
    const child = spawn('npx', ['terrazzo', 'build', '-c', filePath], {
      stdio: 'inherit',
      shell: true,
    })
    child.on('close', (code) => {
      if (code === 0) {
        console.log(chalk.green(`✅ Successfully built ${filePath}`))
        resolve()
      } else {
        console.error(chalk.red(`❌ Failed to build ${filePath}`))
        reject(new Error(`Process exited with code ${code}`))
      }
    })
  })
}
// Function to display information about Terrazzo files
function displayTerrazzoFiles(groupedFiles) {
  console.log(chalk.bold.blue('\n=== AVAILABLE TERRAZZO FILES ===\n'))
  for (const [theme, files] of Object.entries(groupedFiles)) {
    console.log(chalk.bold.green(`\n## ${theme.toUpperCase()} ##\n`))
    if (files.tokens.length > 0) {
      console.log(chalk.bold.yellow('Tokens:'))
      files.tokens.forEach((file, index) => {
        console.log(
          `  ${index + 1}. ${chalk.cyan(file.name)}: ${chalk.dim(file.relativePath)}`
        )
      })
    }
    if (files.components.length > 0) {
      console.log(chalk.bold.yellow('\nComponents:'))
      files.components.forEach((file, index) => {
        console.log(
          `  ${index + 1}. ${chalk.cyan(file.name)}: ${chalk.dim(file.relativePath)}`
        )
      })
    }
  }
  console.log(chalk.bold.blue('\n=== AVAILABLE COMMANDS ===\n'))
  console.log(chalk.bold('List Terrazzo files:'))
  console.log(chalk.cyan('npm run scss:list\n'))
  console.log(chalk.bold('Build all Terrazzo files:'))
  console.log(chalk.cyan('npm run scss:build\n'))
  console.log(chalk.bold('Build all files for a specific theme:'))
  console.log(chalk.cyan('npm run scss:build theme=sketch\n'))
  console.log(chalk.cyan('# or legacy syntax:'))
  console.log(chalk.cyan('npm run scss:build -- --theme=sketch\n'))
  console.log(chalk.bold('Build a specific component for a theme:'))
  console.log(chalk.cyan('npm run scss:build theme=sketch component=button\n'))
  console.log(chalk.cyan('# or legacy syntax:'))
  console.log(
    chalk.cyan(
      'npm run scss:build -- --build --theme=sketch --component=button\n'
    )
  )
  console.log(chalk.bold('Build a specific component for all themes:'))
  console.log(chalk.cyan('npm run scss:build component=button\n'))
  console.log(chalk.cyan('# or legacy syntax:'))
  console.log(chalk.cyan('npm run scss:build -- --build --component=button\n'))
}
// Main function that executes the script
async function main() {
  try {
    const terrazzoDir = path.join(projectRoot, 'terrazzo')
    const terrazzoFiles = findTerrazzoFiles(terrazzoDir)
    const groupedFiles = groupFilesByTheme(terrazzoFiles)
    if (!BUILD_MODE) {
      // List mode only
      displayTerrazzoFiles(groupedFiles)
      return
    }
    // Build mode
    if (COMPONENT && !THEME) {
      // Build a specific component for all themes
      console.log(
        chalk.blue(`\nBuilding component ${COMPONENT} for all themes...`)
      )
      let componentFound = false
      let builtCount = 0

      for (const [theme, files] of Object.entries(groupedFiles)) {
        const componentFile = files.components.find((c) => c.name === COMPONENT)
        if (componentFile) {
          componentFound = true
          await buildTerrazzoFile(componentFile.path)
          builtCount++
          console.log(
            chalk.green(`✅ Built component ${COMPONENT} for theme ${theme}`)
          )
        } else
          console.log(
            chalk.yellow(
              `⚠️  Component ${COMPONENT} not found in theme ${theme}`
            )
          )
      }

      if (!componentFound) {
        console.error(
          chalk.red(
            `Component "${COMPONENT}" not found in any theme. Available components vary by theme.`
          )
        )
        process.exit(1)
      }

      console.log(
        chalk.green(
          `\n✅ Successfully built component ${COMPONENT} for ${builtCount} theme(s)`
        )
      )
    } else if (THEME) {
      const themeFiles = groupedFiles[THEME]
      if (!themeFiles) {
        console.error(
          chalk.red(
            `Theme "${THEME}" not found. Available themes: ${Object.keys(groupedFiles).join(', ')}`
          )
        )
        process.exit(1)
      }
      if (COMPONENT) {
        // Build a specific component for a specific theme
        const componentFile = themeFiles.components.find(
          (c) => c.name === COMPONENT
        )
        if (!componentFile) {
          console.error(
            chalk.red(
              `Component "${COMPONENT}" not found in theme "${THEME}". Available components: ${themeFiles.components.map((c) => c.name).join(', ')}`
            )
          )
          process.exit(1)
        }
        await buildTerrazzoFile(componentFile.path)
        console.log(
          chalk.green(
            `\n✅ Successfully built component ${COMPONENT} for theme ${THEME}`
          )
        )
      } else {
        // Build all files for the theme
        console.log(chalk.blue(`\nBuilding all files for theme ${THEME}...`))
        // First build tokens
        for (const tokenFile of themeFiles.tokens)
          await buildTerrazzoFile(tokenFile.path)
        // Then build components
        for (const componentFile of themeFiles.components)
          await buildTerrazzoFile(componentFile.path)
        console.log(
          chalk.green(`\n✅ Successfully built all files for theme ${THEME}`)
        )
      }
    } else
      // Build all themes
      for (const [theme, files] of Object.entries(groupedFiles)) {
        console.log(chalk.blue(`\nBuilding all files for theme ${theme}...`))
        // First build tokens
        for (const tokenFile of files.tokens)
          await buildTerrazzoFile(tokenFile.path)
        // Then build components
        for (const componentFile of files.components)
          await buildTerrazzoFile(componentFile.path)
        console.log(
          chalk.green(`\n✅ Successfully built all files for theme ${theme}`)
        )
      }
  } catch (error) {
    console.error(chalk.red('Error executing script:'), error)
    process.exit(1)
  }
}
// Execute the script
main()
