#!/usr/bin/env node
// @ts-check

import { promisify } from 'util'
import { fileURLToPath } from 'url'
import readline from 'readline'
import process from 'process'
import path from 'path'
import fs from 'fs'

const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const mkdir = promisify(fs.mkdir)
const copyFile = promisify(fs.copyFile)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Get current directory in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '..')

// Directories
const STYLES_TOKEN_DIR = path.join(rootDir, 'src', 'styles', 'tokens')
const STYLES_TOKEN_MODULES_DIR = path.join(STYLES_TOKEN_DIR, 'modules')
const ICONS_DIR = path.join(rootDir, 'src', 'icons')
const COMPONENTS_DIR = path.join(rootDir, 'src', 'components')

// Source theme to copy from - using figma-ui3 for everything
const SOURCE_COLOR_THEME = 'figma-ui3'
const SOURCE_TYPE_THEME = 'figma-ui3'
const SOURCE_ICONS = 'figma-ui3'

/**
 * Ask user for theme name
 */
function askThemeName() {
  return new Promise((resolve) => {
    rl.question('Enter the name for your new theme: ', (answer) => {
      if (!answer.trim()) {
        console.log('Theme name cannot be empty. Please try again.')
        return askThemeName().then(resolve)
      }
      resolve(answer.trim().toLowerCase())
    })
  })
}

/**
 * Create directories if they don't exist
 */
async function ensureDirectories(themeName) {
  const iconDir = path.join(ICONS_DIR, themeName)

  try {
    if (!fs.existsSync(iconDir)) {
      await mkdir(iconDir, { recursive: true })
      console.log(`Created icons directory for ${themeName}`)
    }
  } catch (err) {
    console.error(`Error creating directories: ${err.message}`)
    throw err
  }
}

/**
 * Create color tokens files
 */
async function createColorTokens(themeName) {
  const sourceColorPath = path.join(
    STYLES_TOKEN_DIR,
    `${SOURCE_COLOR_THEME}-colors.scss`
  )
  const targetColorPath = path.join(
    STYLES_TOKEN_DIR,
    `${themeName}-colors.scss`
  )
  const sourceModuleColorPath = path.join(
    STYLES_TOKEN_MODULES_DIR,
    `${SOURCE_COLOR_THEME}-colors.module.scss`
  )
  const targetModuleColorPath = path.join(
    STYLES_TOKEN_MODULES_DIR,
    `${themeName}-colors.module.scss`
  )

  try {
    // Read source color file
    let colorContent = await readFile(sourceColorPath, 'utf8')

    // Replace all instances of source theme name with new theme name
    colorContent = colorContent
      // Handle variable names
      .replace(
        new RegExp(`${SOURCE_COLOR_THEME}-color`, 'g'),
        `${themeName}-color`
      )
      // Handle data-theme with double quotes
      .replace(
        new RegExp(`\\[data-theme="${SOURCE_COLOR_THEME}"\\]`, 'g'),
        `[data-theme="${themeName}"]`
      )
      // Handle data-theme with single quotes
      .replace(
        new RegExp(`\\[data-theme='${SOURCE_COLOR_THEME}'\\]`, 'g'),
        `[data-theme='${themeName}']`
      )
      // Handle data-mode
      .replace(
        new RegExp(`\\[data-mode='${SOURCE_COLOR_THEME}-light'\\]`, 'g'),
        `[data-mode='${themeName}-light']`
      )
      .replace(
        new RegExp(`\\[data-mode='${SOURCE_COLOR_THEME}-dark'\\]`, 'g'),
        `[data-mode='${themeName}-dark']`
      )
      .replace(
        new RegExp(`\\[data-mode="${SOURCE_COLOR_THEME}-light"\\]`, 'g'),
        `[data-mode="${themeName}-light"]`
      )
      .replace(
        new RegExp(`\\[data-mode="${SOURCE_COLOR_THEME}-dark"\\]`, 'g'),
        `[data-mode="${themeName}-dark"]`
      )
      // Handle direct references to theme-colors
      .replace(
        new RegExp(`${SOURCE_COLOR_THEME}-colors`, 'g'),
        `${themeName}-colors`
      )

    // Write new color file
    await writeFile(targetColorPath, colorContent)
    console.log(`Created color tokens file: ${targetColorPath}`)

    // Check if module file exists and create it if it does
    if (fs.existsSync(sourceModuleColorPath)) {
      let moduleColorContent = await readFile(sourceModuleColorPath, 'utf8')
      moduleColorContent = moduleColorContent
        // Handle variable names
        .replace(
          new RegExp(`${SOURCE_COLOR_THEME}-color`, 'g'),
          `${themeName}-color`
        )
        // Handle data-theme with double quotes
        .replace(
          new RegExp(`\\[data-theme="${SOURCE_COLOR_THEME}"\\]`, 'g'),
          `[data-theme="${themeName}"]`
        )
        // Handle data-theme with single quotes
        .replace(
          new RegExp(`\\[data-theme='${SOURCE_COLOR_THEME}'\\]`, 'g'),
          `[data-theme='${themeName}']`
        )
        // Handle data-mode
        .replace(
          new RegExp(`\\[data-mode='${SOURCE_COLOR_THEME}-light'\\]`, 'g'),
          `[data-mode='${themeName}-light']`
        )
        .replace(
          new RegExp(`\\[data-mode='${SOURCE_COLOR_THEME}-dark'\\]`, 'g'),
          `[data-mode='${themeName}-dark']`
        )
        .replace(
          new RegExp(`\\[data-mode="${SOURCE_COLOR_THEME}-light"\\]`, 'g'),
          `[data-mode="${themeName}-light"]`
        )
        .replace(
          new RegExp(`\\[data-mode="${SOURCE_COLOR_THEME}-dark"\\]`, 'g'),
          `[data-mode="${themeName}-dark"]`
        )
        // Handle import paths
        .replace(
          new RegExp(`\\.\\./${SOURCE_COLOR_THEME}-colors\\.scss`, 'g'),
          `../${themeName}-colors.scss`
        )
        // Handle module export names
        .replace(
          new RegExp(`module: '${SOURCE_COLOR_THEME}-colors'`, 'g'),
          `module: '${themeName}-colors'`
        )
        .replace(
          new RegExp(`'${SOURCE_COLOR_THEME}-colors'`, 'g'),
          `'${themeName}-colors'`
        )
        .replace(
          new RegExp(`"${SOURCE_COLOR_THEME}-colors"`, 'g'),
          `"${themeName}-colors"`
        )

      await writeFile(targetModuleColorPath, moduleColorContent)
      console.log(`Created color module file: ${targetModuleColorPath}`)
    }
  } catch (err) {
    console.error(`Error creating color tokens: ${err.message}`)
    throw err
  }
}

/**
 * Create type tokens files
 */
async function createTypeTokens(themeName) {
  const sourceTypePath = path.join(
    STYLES_TOKEN_DIR,
    `${SOURCE_TYPE_THEME}-types.scss`
  )
  const targetTypePath = path.join(STYLES_TOKEN_DIR, `${themeName}-types.scss`)
  const sourceModuleTypePath = path.join(
    STYLES_TOKEN_MODULES_DIR,
    `${SOURCE_TYPE_THEME}-types.module.scss`
  )
  const targetModuleTypePath = path.join(
    STYLES_TOKEN_MODULES_DIR,
    `${themeName}-types.module.scss`
  )

  try {
    // Read source type file
    let typeContent = await readFile(sourceTypePath, 'utf8')

    // Replace all instances of source theme name with new theme name
    typeContent = typeContent
      // Handle data-theme with single quotes
      .replace(
        new RegExp(`\\[data-theme='${SOURCE_TYPE_THEME}'\\]`, 'g'),
        `[data-theme='${themeName}']`
      )
      // Handle data-theme with double quotes
      .replace(
        new RegExp(`\\[data-theme="${SOURCE_TYPE_THEME}"\\]`, 'g'),
        `[data-theme="${themeName}"]`
      )
      // Handle direct references to theme-types
      .replace(
        new RegExp(`${SOURCE_TYPE_THEME}-types`, 'g'),
        `${themeName}-types`
      )

    // Write new type file
    await writeFile(targetTypePath, typeContent)
    console.log(`Created type tokens file: ${targetTypePath}`)

    // Check if module file exists and create it if it does
    if (fs.existsSync(sourceModuleTypePath)) {
      let moduleTypeContent = await readFile(sourceModuleTypePath, 'utf8')
      moduleTypeContent = moduleTypeContent
        // Handle data-theme
        .replace(
          new RegExp(`\\[data-theme='${SOURCE_TYPE_THEME}'\\]`, 'g'),
          `[data-theme='${themeName}']`
        )
        .replace(
          new RegExp(`\\[data-theme="${SOURCE_TYPE_THEME}"\\]`, 'g'),
          `[data-theme="${themeName}"]`
        )
        // Handle import paths
        .replace(
          new RegExp(`\\.\\./${SOURCE_TYPE_THEME}-types\\.scss`, 'g'),
          `../${themeName}-types.scss`
        )
        // Handle module export names
        .replace(
          new RegExp(`module: '${SOURCE_TYPE_THEME}-types'`, 'g'),
          `module: '${themeName}-types'`
        )
        .replace(
          new RegExp(`'${SOURCE_TYPE_THEME}-types'`, 'g'),
          `'${themeName}-types'`
        )
        .replace(
          new RegExp(`"${SOURCE_TYPE_THEME}-types"`, 'g'),
          `"${themeName}-types"`
        )

      await writeFile(targetModuleTypePath, moduleTypeContent)
      console.log(`Created type module file: ${targetModuleTypePath}`)
    }

    // Create the text SCSS file
    await createTextsScss(themeName)
  } catch (err) {
    console.error(`Error creating type tokens: ${err.message}`)
    throw err
  }
}

/**
 * Create texts SCSS file and update the main texts module
 */
async function createTextsScss(themeName) {
  const stylesTextsDir = path.join(rootDir, 'src', 'styles', 'texts')
  const sourceTextsScssPath = path.join(
    stylesTextsDir,
    `${SOURCE_TYPE_THEME}.scss`
  )
  const targetTextsScssPath = path.join(stylesTextsDir, `${themeName}.scss`)
  const textsModulePath = path.join(stylesTextsDir, 'texts.module.scss')

  try {
    // Read source texts SCSS file
    let textsScssContent = await readFile(sourceTextsScssPath, 'utf8')

    // Replace all references to the source theme with the new theme
    textsScssContent = textsScssContent
      // Replace data-theme attributes
      .replace(
        new RegExp(`\\[data-theme='${SOURCE_TYPE_THEME}'\\]`, 'g'),
        `[data-theme='${themeName}']`
      )
      .replace(
        new RegExp(`\\[data-theme="${SOURCE_TYPE_THEME}"\\]`, 'g'),
        `[data-theme="${themeName}"]`
      )
      // Replace color variable references
      .replace(
        new RegExp(`--${SOURCE_TYPE_THEME}-color-`, 'g'),
        `--${themeName}-color-`
      )

    // Write to the new file
    await writeFile(targetTextsScssPath, textsScssContent)
    console.log(`Created texts SCSS file: ${targetTextsScssPath}`)

    // Update the texts.module.scss file to import the new theme
    let textsModuleContent = await readFile(textsModulePath, 'utf8')

    // Check if the import already exists
    const importRegex = new RegExp(`@import ['"]${themeName}['"];`, 'g')
    if (!importRegex.test(textsModuleContent)) {
      // Add the import at the top with other imports
      textsModuleContent = textsModuleContent.replace(
        /(@import ['"][^'"]+['"];[\r\n]+)+/,
        (match) => `${match}@import '${themeName}';\n`
      )

      await writeFile(textsModulePath, textsModuleContent)
      console.log(
        `Updated texts module to import the new theme: ${textsModulePath}`
      )
    }
  } catch (err) {
    console.error(`Error creating texts SCSS file: ${err.message}`)
    throw err
  }
}

/**
 * Copy icons from source theme
 */
async function copyIcons(themeName) {
  const sourceIconsDir = path.join(ICONS_DIR, SOURCE_ICONS)
  const targetIconsDir = path.join(ICONS_DIR, themeName)

  try {
    const icons = await readdir(sourceIconsDir)

    for (const icon of icons) {
      const sourceIconPath = path.join(sourceIconsDir, icon)
      const targetIconPath = path.join(targetIconsDir, icon)

      // Only copy files (not directories)
      if (fs.statSync(sourceIconPath).isFile())
        await copyFile(sourceIconPath, targetIconPath)
    }

    console.log(
      `Copied ${icons.length} icons from ${SOURCE_ICONS} to ${themeName}`
    )

    // Create the icon SCSS file
    await createIconsScss(themeName)
  } catch (err) {
    console.error(`Error copying icons: ${err.message}`)
    throw err
  }
}

/**
 * Create icons SCSS file and update the main icons module
 */
async function createIconsScss(themeName) {
  const stylesIconsDir = path.join(rootDir, 'src', 'styles', 'icons')
  const sourceIconsScssPath = path.join(
    stylesIconsDir,
    `${SOURCE_COLOR_THEME}.scss`
  )
  const targetIconsScssPath = path.join(stylesIconsDir, `${themeName}.scss`)
  const iconsModulePath = path.join(stylesIconsDir, 'icons.module.scss')

  try {
    // Read source icons SCSS file
    let iconsScssContent = await readFile(sourceIconsScssPath, 'utf8')

    // Replace all references to the source theme with the new theme
    iconsScssContent = iconsScssContent
      .replace(
        new RegExp(`\\[data-theme='${SOURCE_COLOR_THEME}'\\]`, 'g'),
        `[data-theme='${themeName}']`
      )
      .replace(
        new RegExp(`\\[data-theme="${SOURCE_COLOR_THEME}"\\]`, 'g'),
        `[data-theme="${themeName}"]`
      )

    // Write to the new file
    await writeFile(targetIconsScssPath, iconsScssContent)
    console.log(`Created icons SCSS file: ${targetIconsScssPath}`)

    // Update the icons.module.scss file to import the new theme
    let iconsModuleContent = await readFile(iconsModulePath, 'utf8')

    // Check if the import already exists
    const importRegex = new RegExp(`@import ['"]${themeName}['"];`, 'g')
    if (!importRegex.test(iconsModuleContent)) {
      // Add the import at the top with other imports
      iconsModuleContent = iconsModuleContent.replace(
        /(@import ['"][^'"]+['"];[\r\n]+)+/,
        (match) => `${match}@import '${themeName}';\n`
      )

      await writeFile(iconsModulePath, iconsModuleContent)
      console.log(
        `Updated icons module to import the new theme: ${iconsModulePath}`
      )
    }
  } catch (err) {
    console.error(`Error creating icons SCSS file: ${err.message}`)
    throw err
  }
}

/**
 * Create SCSS files for components
 */
async function createComponentScssFiles(themeName) {
  try {
    // Get all component folders recursively
    const componentFolders = await getComponentFolders(COMPONENTS_DIR)
    let fileCount = 0
    let importCount = 0

    for (const folder of componentFolders) {
      // Check if there's a component scss file to determine if we should create a theme file
      const componentFiles = await readdir(folder)

      // Check if this component has any theme-specific SCSS files
      const hasThemeFiles = componentFiles.some(
        (file) =>
          file.endsWith('.scss') &&
          (file.includes('figma-ui') ||
            file.includes('sketch') ||
            file.includes('penpot'))
      )

      if (hasThemeFiles) {
        const targetScssPath = path.join(folder, `${themeName}.scss`)

        // Find a reference file to copy from
        const referenceFileName = componentFiles.find((file) =>
          file.includes(`${SOURCE_COLOR_THEME}.scss`)
        )

        if (referenceFileName) {
          const referenceFilePath = path.join(folder, referenceFileName)
          let scssContent = await readFile(referenceFilePath, 'utf8')

          // Replace theme-specific class names and attributes
          scssContent = scssContent
            // Handle data-theme with double quotes
            .replace(
              new RegExp(`\\[data-theme="${SOURCE_COLOR_THEME}"\\]`, 'g'),
              `[data-theme="${themeName}"]`
            )
            // Handle data-theme with single quotes (which is more common in SCSS)
            .replace(
              new RegExp(`\\[data-theme='${SOURCE_COLOR_THEME}'\\]`, 'g'),
              `[data-theme='${themeName}']`
            )
            // Handle data-mode for light/dark themes
            .replace(
              new RegExp(`\\[data-mode="${SOURCE_COLOR_THEME}-light"\\]`, 'g'),
              `[data-mode="${themeName}-light"]`
            )
            .replace(
              new RegExp(`\\[data-mode='${SOURCE_COLOR_THEME}-light'\\]`, 'g'),
              `[data-mode='${themeName}-light']`
            )
            .replace(
              new RegExp(`\\[data-mode="${SOURCE_COLOR_THEME}-dark"\\]`, 'g'),
              `[data-mode="${themeName}-dark"]`
            )
            .replace(
              new RegExp(`\\[data-mode='${SOURCE_COLOR_THEME}-dark'\\]`, 'g'),
              `[data-mode='${themeName}-dark']`
            )
            // Handle variable references
            .replace(
              new RegExp(`var\\(--${SOURCE_COLOR_THEME}-color-`, 'g'),
              `var(--${themeName}-color-`
            )
            // Replace color variable references
            .replace(
              new RegExp(`--${SOURCE_COLOR_THEME}-color-`, 'g'),
              `--${themeName}-color-`
            )
            // Replace any remaining instances of theme name in class names or IDs
            .replace(
              new RegExp(`\\.${SOURCE_COLOR_THEME}-`, 'g'),
              `.${themeName}-`
            )
            .replace(
              new RegExp(`#${SOURCE_COLOR_THEME}-`, 'g'),
              `#${themeName}-`
            )

          await writeFile(targetScssPath, scssContent)
          fileCount++

          // Find the main SCSS file for the component (if it exists)
          // Look for the most appropriate main SCSS file
          // First try to find one without theme names
          let mainScssFileName = componentFiles.find(
            (file) =>
              file.endsWith('.scss') &&
              !file.includes('figma') &&
              (file === 'styles.scss' || file === 'style.scss')
          )

          // If not found, try to find the one named after the component folder or with the component name
          if (!mainScssFileName) {
            const folderName = path.basename(folder)
            mainScssFileName = componentFiles.find(
              (file) =>
                file.endsWith('.scss') &&
                !file.includes('figma') &&
                (file.includes(folderName) || file === 'index.scss')
            )
          }

          // If still not found, just get any scss file that's not theme-specific
          if (!mainScssFileName)
            mainScssFileName = componentFiles.find(
              (file) => file.endsWith('.scss') && !file.includes('figma')
            )

          if (mainScssFileName) {
            const mainScssPath = path.join(folder, mainScssFileName)
            let mainScssContent = await readFile(mainScssPath, 'utf8')

            // Check if the import already exists
            const importRegex = new RegExp(`@import ['"]${themeName}['"];`, 'g')
            if (!importRegex.test(mainScssContent)) {
              // If there are existing imports, add our import to them
              if (mainScssContent.includes('@import ')) {
                // Find the last import statement and add ours after it
                const importMatches = mainScssContent.match(
                  /@import\s+['"][^'"]+['"];/g
                )
                if (importMatches && importMatches.length > 0) {
                  const lastImport = importMatches[importMatches.length - 1]
                  mainScssContent = mainScssContent.replace(
                    lastImport,
                    `${lastImport}\n@import '${themeName}';`
                  )
                }
                // Fallback if regex failed but we know imports exist
                else
                  mainScssContent = `@import '${themeName}';\n${mainScssContent}`
              }
              // No imports found, add at the beginning
              else
                mainScssContent = `@import '${themeName}';\n${mainScssContent}`

              await writeFile(mainScssPath, mainScssContent)
              importCount++
              console.log(
                `Added ${themeName} import to ${path.relative(rootDir, mainScssPath)}`
              )
            } else
              console.log(
                `Import for ${themeName} already exists in ${path.relative(rootDir, mainScssPath)}`
              )
          }
        }
      }
    }

    console.log(
      `Created ${fileCount} component SCSS files for the ${themeName} theme`
    )
    console.log(`Added ${importCount} imports to main SCSS component files`)
  } catch (err) {
    console.error(`Error creating component SCSS files: ${err.message}`)
    throw err
  }
}

/**
 * Get all component folders recursively
 */
async function getComponentFolders(dir) {
  const folders = []
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      // Check if it's a component folder (has .tsx files)
      const files = await readdir(fullPath)
      const hasTsxFiles = files.some((file) => file.endsWith('.tsx'))

      if (hasTsxFiles) folders.push(fullPath)

      // Recursively get subfolders
      const subfolders = await getComponentFolders(fullPath)
      folders.push(...subfolders)
    }
  }

  return folders
}

/**
 * Update Storybook preview configuration to include the new theme
 */
async function updateStorybookPreview(themeName) {
  const previewPath = path.join(rootDir, '.storybook', 'preview.tsx')

  try {
    // Read the preview file
    let previewContent = await readFile(previewPath, 'utf8')

    // 1. Add import statements for the new theme modules after the existing imports
    // Find the last import statement for modules and add after it
    const importRegex =
      /(import '@styles\/tokens\/modules\/.*?-types\.module\.scss'.*?\n)/gs
    const matches = [...previewContent.matchAll(importRegex)]
    const lastImportStatement =
      matches.length > 0 ? matches[matches.length - 1][0] : null

    if (lastImportStatement) {
      // Find position of the last import and add our imports after it
      const lastImportIndex =
        previewContent.lastIndexOf(lastImportStatement) +
        lastImportStatement.length
      const beforeLastImport = previewContent.substring(0, lastImportIndex)
      const afterLastImport = previewContent.substring(lastImportIndex)

      // Add our imports right after the last one
      const importStatements = `\nimport '@styles/tokens/modules/${themeName}-colors.module.scss'\nimport '@styles/tokens/modules/${themeName}-types.module.scss'`
      previewContent = beforeLastImport + importStatements + afterLastImport
    }

    // 2. Add the new theme to the toolbar items list
    const themesItemsRegex = /(items: \[.*?'sketch'.*?)(\],)/
    const updatedThemesItems = `$1, '${themeName}'$2`
    previewContent = previewContent.replace(
      themesItemsRegex,
      updatedThemesItems
    )

    // 3. Add the light and dark modes for the new theme with proper indentation
    const modesItemsRegex = /(items: \[\s*.*?'sketch-dark',\s*)/s
    const updatedModesItems = `$1  '${themeName}-light',\n          '${themeName}-dark',\n        `
    previewContent = previewContent.replace(modesItemsRegex, updatedModesItems)

    // 4. Add background colors for the new theme modes with proper indentation
    const backgroundMapRegex =
      /(const backgroundMap = \{.*?'sketch-dark': '#202022',\s*)/s
    const updatedBackgroundMap = `$1  '${themeName}-light': '#ffffff',\n        '${themeName}-dark': '#202022',\n      `
    previewContent = previewContent.replace(
      backgroundMapRegex,
      updatedBackgroundMap
    )

    // Write the updated content back to the file
    await writeFile(previewPath, previewContent)
    console.log(
      `✅ Updated Storybook preview configuration for ${themeName} theme`
    )
  } catch (err) {
    console.error(`Error updating Storybook preview: ${err.message}`)
    throw err
  }
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Welcome to the Figmug UI Theme Generator!')
    console.log(
      'This script will create a new theme based on the existing structure.'
    )

    const themeName = await askThemeName()
    console.log(`Creating new theme: ${themeName}`)

    // Execute all the theme creation tasks
    await ensureDirectories(themeName)
    await createColorTokens(themeName)
    await createTypeTokens(themeName)
    await copyIcons(themeName)
    await createComponentScssFiles(themeName)
    await updateStorybookPreview(themeName)

    console.log(`\n✅ Theme "${themeName}" has been successfully created!`)
    console.log(`\nNext steps:`)
    console.log(
      `1. Review and customize the color tokens in src/styles/tokens/${themeName}-colors.scss`
    )
    console.log(
      `2. Review and customize the type tokens in src/styles/tokens/${themeName}-types.scss`
    )
    console.log(`3. Check the component SCSS files and adjust as needed`)
    console.log(`4. The theme has been added to Storybook configuration`)
  } catch (error) {
    console.error(`Error creating theme: ${error}`)
  } finally {
    rl.close()
  }
}

main()
