#!/usr/bin/env node

/**
 * Script to generate a DTCG token structure from SCSS files
 * Compatible with Token Studio
 *
 * Target structure:
 * - colors
 *   - figma
 *   - sketch
 *   - ...
 * - globals
 * - types (typography)
 *   - figma
 *   - sketch
 *   - ...
 * - components
 *   - component
 *     - figma
 *     - sketch
 *     - ...
 */

import { fileURLToPath } from 'url'
import { dirname, resolve, join } from 'path'
import { promises as fs } from 'fs'
import prettier from 'prettier'
import { glob } from 'glob'

// Get absolute path of current directory in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Source and target paths
const STYLES_DIR = resolve(__dirname, '../src/styles')
const OUTPUT_DIR = resolve(__dirname, '../tokens')

// Configuration options
const CONFIG = {
  // List of themes to process for colors and typography
  themes: ['figma', 'sketch', 'penpot'],
  // Token types
  tokenTypes: ['colors', 'types'],
  // Mode for CSS variable lookup (light or dark)
  modes: ['light', 'dark'],
  // Specific themes for components
  componentThemes: ['figma-ui2', 'figma-ui3', 'sketch', 'penpot'],
}

// Ensures the output directory exists
async function ensureDirectoryExists(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true })
  } catch (error) {
    if (error.code !== 'EEXIST') throw error
  }
}

// Function to convert token names to Token Studio compatible format
function convertTokenName(name) {
  // Replace hyphens with dots
  return name.replace(/-/g, '.')
}

// Function to prefix a token name with the theme
function prefixTokenName(name, theme) {
  // For global tokens, don't add a prefix
  if (theme === 'globals' || theme === 'base') return name
  return `${theme}.${name}`
}

// Function to determine token type based on its name according to Token Studio
function determineTokenType(tokenName) {
  if (tokenName.startsWith('color')) return 'color'
  if (tokenName.includes('radius')) return 'borderRadius'
  if (tokenName.includes('opacity')) return 'opacity'
  if (tokenName.includes('shadow')) return 'boxShadow'
  if (
    tokenName.includes('size') ||
    tokenName.includes('spacing') ||
    tokenName.includes('width') ||
    tokenName.includes('height') ||
    tokenName.includes('padding') ||
    tokenName.includes('margin')
  )
    return 'dimension'
  if (
    tokenName.includes('font') ||
    tokenName.includes('text') ||
    tokenName.includes('typography')
  )
    return 'typography'
  if (tokenName.includes('border') && !tokenName.includes('radius'))
    return 'border'
  if (tokenName.includes('transition')) return 'transition'

  // Default type
  return 'other'
}

// Function to convert a CSS var() reference to a Token Studio alias reference
function convertVarToAlias(value) {
  // Check if it's a CSS variable
  const varMatch = value.match(/var\(--([a-zA-Z0-9-_.]+)\)/)
  if (varMatch) {
    // Convert variable name to alias format
    const varName = varMatch[1]
    // Convert hyphens to dots for alias format
    const aliasName = convertTokenName(varName)
    return {
      value: `{${aliasName}}`,
      type: 'string',
    }
  }

  // If it doesn't match a variable, return null
  return null
}

// Function to correctly format token values for Token Studio
function formatTokenValue(value, tokenName) {
  // Determine token type
  const tokenType = determineTokenType(tokenName)

  // If it's a CSS var() reference, convert it to Token Studio alias
  const aliasValue = convertVarToAlias(value)
  if (aliasValue) return aliasValue

  // For numeric values with units, ensure the format is correct
  if (/^-?\d+(\.\d+)?(px|rem|em|%|vw|vh|deg|s|ms)$/.test(value.trim())) {
    const match = value
      .trim()
      .match(/^(-?\d+(?:\.\d+)?)(px|rem|em|%|vw|vh|deg|s|ms)$/)
    if (match)
      return {
        value: parseFloat(match[1]),
        unit: match[2],
        type: tokenType,
      }
  }

  // For colors
  if (tokenType === 'color')
    return {
      value: value,
      type: 'color',
    }

  // For other values
  return {
    value: value,
    type: tokenType,
  }
}

// Parse a SCSS file to extract CSS variables
async function extractVariablesFromScss(filePath, theme) {
  // eslint-disable-next-line no-unused-vars
  try {
    try {
      await fs.access(filePath)
    } catch {
      console.warn(`File ${filePath} doesn't exist.`)
      return {}
    }

    const fileContent = await fs.readFile(filePath, 'utf-8')
    const variables = {}

    // Parse each selector :root[data-mode='theme-mode']
    for (const mode of CONFIG.modes) {
      const rootSelector = `:root[data-mode='${theme}-${mode}']`
      // Use a fixed string to avoid escape issues
      const pattern = rootSelector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(pattern + '\\s*\\{([^}]*)\\}', 'g')
      let match

      while ((match = regex.exec(fileContent)) !== null) {
        const cssBlock = match[1]
        const varRegex = /--([a-zA-Z0-9-]+):\s*([^;]+);/g
        let varMatch

        while ((varMatch = varRegex.exec(cssBlock)) !== null) {
          const name = varMatch[1]
          const value = varMatch[2].trim()

          // Normalize the name by removing the theme prefix
          const normalizedName = name.replace(`${theme}-`, '')

          // Convert the name to Token Studio format (with dots)
          const basicTokenName = convertTokenName(normalizedName)

          // Prefix the name with the theme
          const tokenName = prefixTokenName(basicTokenName, theme)

          // Organize by mode (light/dark)
          if (!variables[mode]) variables[mode] = {}

          // For colors or typography, correctly format the value
          variables[mode][tokenName] = formatTokenValue(value, basicTokenName)
        }
      }
    }

    // If we have global variables (outside of mode selectors)
    const globalRegex = new RegExp(
      ':root(?!\\[data-mode=)[^{]*\\{([^}]*)\\}',
      'g'
    )
    let globalMatch
    const globalVars = {}

    while ((globalMatch = globalRegex.exec(fileContent)) !== null) {
      const cssBlock = globalMatch[1]
      const varRegex = /--([a-zA-Z0-9-]+):\s*([^;]+);/g
      let varMatch

      while ((varMatch = varRegex.exec(cssBlock)) !== null) {
        const name = varMatch[1]
        const value = varMatch[2].trim()
        // Convertir le nom au format Token Studio (avec des points)
        const basicTokenName = convertTokenName(name)
        // Préfixer le nom avec le thème
        const tokenName = prefixTokenName(basicTokenName, theme)
        globalVars[tokenName] = formatTokenValue(value, basicTokenName)
      }
    }

    if (Object.keys(globalVars).length > 0) variables.global = globalVars

    return variables
  } catch (error) {
    console.error(`Error analyzing file ${filePath}:`, error)
    return {}
  }
}

// Extract component variables
async function extractComponentVariables() {
  const componentTokens = {}

  // Find all component SCSS files
  const componentFiles = await glob('**/components/**/*.scss', {
    cwd: resolve(__dirname, '../src'),
    absolute: true,
  })

  console.log(`${componentFiles.length} component SCSS files found`)

  for (const filePath of componentFiles) {
    // Ignore files in node_modules directories
    if (filePath.includes('node_modules')) continue

    // Extract the component name from the file path
    const pathParts = filePath.split('/')
    const componentIndex = pathParts.indexOf('components')
    if (componentIndex === -1) continue

    const componentType = pathParts[componentIndex + 1]
    const componentName = pathParts[componentIndex + 2]
    const fileName = pathParts[pathParts.length - 1]

    if (!componentName) continue

    // Determine which theme this file represents
    // Filenames like figma-ui2.scss or sketch.scss indicate the theme
    let fileTheme = null
    for (const theme of CONFIG.componentThemes)
      if (fileName.includes(theme)) {
        fileTheme = theme
        break
      }

    // If it's not a specific theme file, it's probably the main component file
    if (!fileTheme && !fileName.includes('.module.'))
      // If it's the main file, treat it as "base"
      fileTheme = 'base'

    // If we couldn't determine the theme, skip to the next file
    if (!fileTheme) continue

    console.log(
      `Processing ${fileName} for ${componentName} (theme: ${fileTheme})`
    )

    // Read file content
    const content = await fs.readFile(filePath, 'utf8')

    // Structure to store component variables
    if (!componentTokens[componentType]) componentTokens[componentType] = {}
    if (!componentTokens[componentType][componentName])
      componentTokens[componentType][componentName] = {}
    if (!componentTokens[componentType][componentName][fileTheme])
      componentTokens[componentType][componentName][fileTheme] = {}

    // For specific theme files, look for variables in the :root[data-theme='theme'] block
    if (fileTheme !== 'base') {
      const pattern = `:root[data-theme='${fileTheme}']`.replace(
        /[.*+?^${}()|[\]\\]/g,
        '\\$&'
      )
      const themeRegex = new RegExp(pattern + '\\s*\\{([^}]*)\\}', 'g')
      let match

      while ((match = themeRegex.exec(content)) !== null) {
        const cssBlock = match[1]
        const varRegex = /--([a-zA-Z0-9_-]+):\s*([^;]+);/g
        let varMatch

        while ((varMatch = varRegex.exec(cssBlock)) !== null) {
          const name = varMatch[1]
          const value = varMatch[2].trim()

          // Convert the name to Token Studio format (with dots)
          const tokenName = convertTokenName(name)
          componentTokens[componentType][componentName][fileTheme][tokenName] =
            formatTokenValue(value, tokenName)
        }
      }
    }
    // For base files, look for all CSS variables
    else {
      // First look in blocks without data-theme
      const baseRegex = new RegExp(
        ':root(?!\\[data-theme=)[^{]*\\{([^}]*)\\}',
        'g'
      )
      let baseMatch

      while ((baseMatch = baseRegex.exec(content)) !== null) {
        const cssBlock = baseMatch[1]
        const varRegex = /--([a-zA-Z0-9_-]+):\s*([^;]+);/g
        let varMatch

        while ((varMatch = varRegex.exec(cssBlock)) !== null) {
          const name = varMatch[1]
          const value = varMatch[2].trim()

          // Convert the name to Token Studio format (with dots)
          const tokenName = convertTokenName(name)
          componentTokens[componentType][componentName][fileTheme][tokenName] =
            formatTokenValue(value, tokenName)
        }
      } // Also look in blocks with data-theme=* (to get themes that might be in the main file)
      const allThemeRegex = new RegExp(
        ":root\\[data-theme='([^']+)'\\]\\s*\\{([^}]*)\\}",
        'g'
      )
      let themeMatch

      while ((themeMatch = allThemeRegex.exec(content)) !== null) {
        const themeName = themeMatch[1]
        const cssBlock = themeMatch[2]

        if (!componentTokens[componentType][componentName][themeName])
          componentTokens[componentType][componentName][themeName] = {}

        const varRegex = /--([a-zA-Z0-9_-]+):\s*([^;]+);/g
        let varMatch

        while ((varMatch = varRegex.exec(cssBlock)) !== null) {
          const name = varMatch[1]
          const value = varMatch[2].trim()

          // Convert the name to Token Studio format (with dots)
          const tokenName = convertTokenName(name)
          componentTokens[componentType][componentName][themeName][tokenName] =
            formatTokenValue(value, tokenName)
        }
      }
    }
  }

  return componentTokens
}

// This structure is no longer needed as we create separate files

// Creates a JSON file for a token set
async function writeTokensSet(fileName, tokens) {
  try {
    const jsonContent = JSON.stringify(tokens, null, 2)
    const prettifiedJson = await prettier.format(jsonContent, {
      parser: 'json',
    })

    await fs.writeFile(join(OUTPUT_DIR, fileName), prettifiedJson)
    console.log(`Token set successfully generated: ${fileName}`)
    return fileName
  } catch (error) {
    console.error(`Error generating token set ${fileName}:`, error)
    return null
  }
}

// Generates the structure of the $themes.json file that links the sets
async function generateThemesJson(setsList) {
  const themesStructure = {}

  // Define the main groups
  const mainGroups = {
    'figma-ui2': {
      id: 'figma-ui2',
      name: 'Figma UI 2',
      group: true,
      selectedTokenSets: {},
    },
    'figma-ui3': {
      id: 'figma-ui3',
      name: 'Figma UI 3',
      group: true,
      selectedTokenSets: {},
    },
    penpot: {
      id: 'penpot',
      name: 'Penpot',
      group: true,
      selectedTokenSets: {},
    },
    sketch: {
      id: 'sketch',
      name: 'Sketch',
      group: true,
      selectedTokenSets: {},
    },
  }

  // Create sub-themes for each main group
  const subThemes = {
    'figma-ui2': {
      light: { id: 'figma-ui2-light', name: 'Light', selectedTokenSets: {} },
      dark: { id: 'figma-ui2-dark', name: 'Dark', selectedTokenSets: {} },
      figjam: { id: 'figma-ui2-figjam', name: 'FigJam', selectedTokenSets: {} },
    },
    'figma-ui3': {
      light: { id: 'figma-ui3-light', name: 'Light', selectedTokenSets: {} },
      dark: { id: 'figma-ui3-dark', name: 'Dark', selectedTokenSets: {} },
      figjam: { id: 'figma-ui3-figjam', name: 'FigJam', selectedTokenSets: {} },
    },
    penpot: {
      light: { id: 'penpot-light', name: 'Light', selectedTokenSets: {} },
      dark: { id: 'penpot-dark', name: 'Dark', selectedTokenSets: {} },
    },
    sketch: {
      light: { id: 'sketch-light', name: 'Light', selectedTokenSets: {} },
      dark: { id: 'sketch-dark', name: 'Dark', selectedTokenSets: {} },
    },
  }

  // Initialize theme structure with main groups
  Object.values(mainGroups).forEach((group) => {
    themesStructure[group.id] = group
  })

  // Add sub-themes to the structure
  Object.values(subThemes).forEach((modes) => {
    Object.values(modes).forEach((themeInfo) => {
      themesStructure[themeInfo.id] = themeInfo
    })
  })

  // Add the global theme
  themesStructure['globals'] = {
    id: 'globals',
    name: 'Globals',
    selectedTokenSets: {},
  }

  // Associate tokens with each theme
  for (const setInfo of setsList) {
    const { path, type, theme, mode } = setInfo

    // Global tokens
    if (type === 'globals') {
      themesStructure['globals'].selectedTokenSets[path] = 'source'
      continue
    }

    // Color tokens (associated with sub-themes by mode)
    if (type === 'colors') {
      if (theme === 'figma') {
        // For figma, we need to distribute to both figma-ui2 and figma-ui3
        subThemes['figma-ui2'][mode].selectedTokenSets[path] = 'source'
        subThemes['figma-ui3'][mode].selectedTokenSets[path] = 'source'
      } else if (subThemes[theme] && subThemes[theme][mode])
        // For other themes, direct association
        subThemes[theme][mode].selectedTokenSets[path] = 'source'
      continue
    }

    // Type tokens (associated with main groups)
    if (type === 'types') {
      if (theme === 'figma') {
        // For figma, we need to distribute to both figma-ui2 and figma-ui3
        mainGroups['figma-ui2'].selectedTokenSets[path] = 'source'
        mainGroups['figma-ui3'].selectedTokenSets[path] = 'source'
      } else if (mainGroups[theme])
        mainGroups[theme].selectedTokenSets[path] = 'source'
      continue
    }

    // Component tokens (associated with sub-themes based on suffix)
    if (type === 'component') {
      // Extract the theme suffix from the path
      const themeMatch = path.match(
        /-(figma-ui2|figma-ui3|penpot|sketch)\.json$/
      )
      if (themeMatch) {
        const componentTheme = themeMatch[1]

        // Associate with appropriate sub-themes
        if (componentTheme === 'figma-ui2')
          // For figma-ui2, distribute to light, dark, figjam modes
          Object.keys(subThemes['figma-ui2']).forEach((mode) => {
            subThemes['figma-ui2'][mode].selectedTokenSets[path] = 'source'
          })
        else if (componentTheme === 'figma-ui3')
          // For figma-ui3, distribute to light, dark, figjam modes
          Object.keys(subThemes['figma-ui3']).forEach((mode) => {
            subThemes['figma-ui3'][mode].selectedTokenSets[path] = 'source'
          })
        else if (componentTheme === 'penpot')
          // For penpot, distribute to light, dark modes
          Object.keys(subThemes['penpot']).forEach((mode) => {
            subThemes['penpot'][mode].selectedTokenSets[path] = 'source'
          })
        else if (componentTheme === 'sketch')
          // For sketch, distribute to light, dark modes
          Object.keys(subThemes['sketch']).forEach((mode) => {
            subThemes['sketch'][mode].selectedTokenSets[path] = 'source'
          })
      }
    }
  }

  return writeTokensSet('$themes.json', themesStructure)
}

// Generates the structure of the $metadata.json file
async function generateMetadataJson(setsList) {
  // Sort sets by type then by name for a consistent order
  const sortedSets = [...setsList].sort((a, b) => {
    // First sort by type
    if (a.type !== b.type) {
      const typeOrder = { colors: 1, types: 2, globals: 3, component: 4 }
      return typeOrder[a.type] - typeOrder[b.type]
    }

    // Then by theme
    if (a.theme !== b.theme) return a.theme.localeCompare(b.theme)

    // Then by mode (light first)
    if (a.mode !== b.mode) {
      if (!a.mode) return -1
      if (!b.mode) return 1
      return a.mode === 'light' ? -1 : 1
    }

    // Finally by component name
    if (a.component && b.component)
      return a.component.localeCompare(b.component)

    return 0
  })

  // Create metadata structure
  const metadata = {
    tokenSetOrder: sortedSets.map((set) => set.path),
    activeTokenSet: sortedSets.length > 0 ? sortedSets[0].path : '',
  }

  return writeTokensSet('$metadata.json', metadata)
}

// Extracts SCSS variables and generates JSON files
async function generateTokensJson() {
  await ensureDirectoryExists(OUTPUT_DIR)

  // List to track all generated sets
  const tokenSets = []

  // 1. Processing color tokens for each theme and mode
  for (const theme of CONFIG.themes) {
    for (const mode of CONFIG.modes) {
      // Fichier pour les couleurs
      const colorFilePath = join(STYLES_DIR, 'tokens', `${theme}-colors.scss`)
      const colorVariables = await extractVariablesFromScss(
        colorFilePath,
        theme,
        'colors'
      )

      if (
        colorVariables[mode] &&
        Object.keys(colorVariables[mode]).length > 0
      ) {
        // Add data-theme information to the tokens

        const setFileName = `colors-${theme}-${mode}.json`
        tokenSets.push({
          id: `${theme}-${mode}`,
          path: setFileName,
          type: 'colors',
          theme,
          mode,
        })
      }
    }

    // 2. Processing typography tokens for each theme
    const typeFilePath = join(STYLES_DIR, 'tokens', `${theme}-types.scss`)
    const typeVariables = await extractVariablesFromScss(
      typeFilePath,
      theme,
      'types'
    )

    // Types are generally global or by theme, without a specific mode
    if (typeVariables.global && Object.keys(typeVariables.global).length > 0) {
      const setFileName = `types-${theme}.json`
      await writeTokensSet(setFileName, typeVariables.global)
      tokenSets.push({
        id: `types-${theme}`,
        path: setFileName,
        type: 'types',
        theme,
      })
    }
  }

  // 3. Processing global variables
  const globalsFilePath = join(STYLES_DIR, 'tokens', 'globals.scss')
  try {
    await fs.access(globalsFilePath)
    const globals = await extractVariablesFromScss(
      globalsFilePath,
      'globals',
      'globals'
    )

    if (globals.global && Object.keys(globals.global).length > 0) {
      const setFileName = 'globals.json'
      await writeTokensSet(setFileName, globals.global)
      tokenSets.push({
        id: 'globals',
        path: setFileName,
        type: 'globals',
        theme: 'common',
      })
    }
  } catch {
    console.warn(`The file ${globalsFilePath} doesn't exist.`)
  }

  // 4. Processing component variables
  const componentTokens = await extractComponentVariables()

  // Transform objects to arrays to avoid linting issues with for...in
  const componentTypes = Object.keys(componentTokens)

  for (const componentType of componentTypes) {
    const componentNames = Object.keys(componentTokens[componentType])

    for (const componentName of componentNames) {
      const themesForComponent = Object.keys(
        componentTokens[componentType][componentName]
      )

      for (const theme of themesForComponent) {
        const componentVars =
          componentTokens[componentType][componentName][theme]

        if (componentVars && Object.keys(componentVars).length > 0) {
          // Generate a filename for this component and theme
          const setFileName = `component-${componentType}-${componentName}-${theme}.json`

          await writeTokensSet(setFileName, componentVars)

          tokenSets.push({
            id: `${componentType}-${componentName}-${theme}`,
            path: setFileName,
            type: 'component',
            theme,
            component: `${componentType}-${componentName}`,
          })
        }
      }
    }
  }

  // 5. Generating $themes.json and $metadata.json files
  await generateThemesJson(tokenSets)
  await generateMetadataJson(tokenSets)

  console.log(
    `${tokenSets.length} token sets successfully generated in ${OUTPUT_DIR}`
  )
  console.log(
    'Files $themes.json and $metadata.json generated for Token Studio compatibility'
  )
}

// Main function
async function main() {
  console.log('Generating DTCG tokens...')
  await generateTokensJson()
  console.log('Operation completed.')
}

main().catch((error) => {
  console.error('Error executing script:', error)
})
