#!/usr/bin/env node

/**
 * Fix CSS Modules Generation
 *
 * This script ensures all CSS token modules are generated consistently
 * in the dist/assets/styles/tokens/modules/ directory after build.
 *
 * Issue: Vite sometimes optimizes smaller CSS files differently,
 * causing inconsistent module generation for framer-colors.css
 */

import { fileURLToPath } from 'url'
import process from 'process'
import path from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DIST_DIR = path.join(__dirname, '..', 'dist')
const TOKENS_DIR = path.join(DIST_DIR, 'assets', 'styles', 'tokens')
const MODULES_DIR = path.join(TOKENS_DIR, 'modules')

function fixCSSModules() {
  console.log('🔧 Fixing CSS modules generation...')

  // Check if directories exist
  if (!fs.existsSync(TOKENS_DIR)) {
    console.log('❌ Tokens directory not found. Run build first.')
    return false
  }

  if (!fs.existsSync(MODULES_DIR))
    fs.mkdirSync(MODULES_DIR, { recursive: true })

  // List of expected color modules
  const colorModules = [
    'figma-colors',
    'framer-colors',
    'penpot-colors',
    'sketch-colors',
  ]

  let fixed = 0

  for (const module of colorModules) {
    const sourcePath = path.join(TOKENS_DIR, `${module}.css`)
    const targetPath = path.join(MODULES_DIR, `${module}.css`)

    // Check if source exists and target is missing
    if (fs.existsSync(sourcePath) && !fs.existsSync(targetPath))
      try {
        fs.copyFileSync(sourcePath, targetPath)
        console.log(`✅ Generated missing ${module}.css in modules/`)
        fixed++
      } catch (error) {
        console.log(`❌ Failed to copy ${module}.css:`, error.message)
      }
  }

  if (fixed > 0) console.log(`🎉 Fixed ${fixed} missing CSS module(s)`)
  else console.log('✅ All CSS modules are correctly generated')

  return fixed > 0
}

// Run the fix
// In ES modules, this is how we check if file is run directly
if (import.meta.url === `file://${process.argv[1]}`) fixCSSModules()

export { fixCSSModules }
