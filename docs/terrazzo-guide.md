# Terrazzo SCSS Building Guide for figmug-ui

This guide explains how to use the SCSS building scripts to generate CSS files from design tokens in the figmug-ui project.

## What is Terrazzo?

Terrazzo is a tool that converts design tokens (stored in JSON files) into CSS variables usable in the project. These tokens define colors, spacing, typography, and other visual properties of the interface.

## Terrazzo Files Structure

In the figmug-ui project, Terrazzo files are organized as follows:

```
terrazzo/
  ├── terrazzo.globals.js      # Global configuration
  ├── sketch/                  # Configuration for Sketch theme
  │   ├── terrazzo.color.js    # Color variables generation
  │   ├── terrazzo.icon.js     # Icon variables generation
  │   ├── terrazzo.text.js     # Text variables generation
  │   ├── terrazzo.type.js     # Typography variables generation
  │   └── components/          # Component configurations
  │       ├── terrazzo.accordion.js
  │       ├── terrazzo.button.js
  │       ├── terrazzo.select.js
  │       └── ...
  ├── figma/                   # Configuration for Figma theme
  └── penpot/                  # Configuration for Penpot theme
```

## The Unified `build-scss.js` Script

We use a single script `scripts/build-scss.js` that both lists available Terrazzo files and builds them. The script provides a simple and intuitive syntax for managing design tokens.

## Available Commands

### List All Terrazzo Files

To see all Terrazzo files available in the project:

```bash
npm run scss:list
```

### Build All Terrazzo Files

To generate CSS files from all tokens:

```bash
npm run scss:build
```

### Build Files for a Specific Theme

To generate CSS files for a specific theme:

```bash
npm run scss:build theme=sketch
```

Available themes are:

- sketch
- figma
- penpot

### Build a Specific Component for a Theme

To generate CSS files for a specific component within a theme:

```bash
npm run scss:build theme=sketch component=button
```

### Build a Specific Component for All Themes

To generate CSS files for a specific component across all available themes:

```bash
npm run scss:build component=button
```

This will build the specified component for every theme that contains it.

### Build Specific Token Types

You can build specific types of design tokens (text, icon, color, typography) instead of entire themes or components:

#### Build a Token Type for All Themes

```bash
# Build text tokens for all themes
npm run scss:build text

# Build color tokens for all themes
npm run scss:build color

# Build icon tokens for all themes
npm run scss:build icon

# Build typography tokens for all themes
npm run scss:build typography
```

#### Build a Token Type for a Specific Theme

```bash
# Build text tokens for sketch theme only
npm run scss:build theme=sketch text

# Build color tokens for penpot theme only
npm run scss:build theme=penpot color

# Build typography tokens for figma theme only
npm run scss:build theme=figma typography
```

Available token types are:
- `text` - Text styling tokens (font sizes, weights, colors)
- `color` - Color palette tokens
- `icon` - Icon-related tokens
- `typography` - Typography system tokens

## Direct Script Usage

You can also use the `build-scss.js` script directly with Node:

```bash
# List all Terrazzo files
node scripts/build-scss.js

# Build all Terrazzo files
node scripts/build-scss.js

# Build a specific theme
node scripts/build-scss.js theme=sketch

# Build a specific component
node scripts/build-scss.js component=button

# Build specific token types
node scripts/build-scss.js text
node scripts/build-scss.js theme=penpot color
```

## Common Use Cases

### Update a Component After Modifying Tokens

1. Modify the JSON file corresponding to the component (e.g., `/tokens/platforms/sketch/components/button.json`)
2. Run the command to regenerate the component's CSS files:

```bash
npm run scss:build theme=sketch component=button
```

### Update Base Tokens After Modifications

1. Modify a base token file (e.g., `/tokens/platforms/penpot/text.json`)
2. Run the command to regenerate the token's CSS files:

```bash
# Update text tokens for penpot theme only
npm run scss:build theme=penpot text

# Or update text tokens for all themes
npm run scss:build text
```

### Update All Components for a Theme

```bash
npm run scss:build theme=sketch
```

### Update All Themes

```bash
npm run scss:build
```

### Update Specific Token Types Across All Themes

```bash
# Update all color tokens after changing color system
npm run scss:build color

# Update all typography tokens after font changes
npm run scss:build typography
```

## Important Notes

- Generated files are automatically saved in the directories specified in the Terrazzo configuration.
- Do not directly modify generated CSS files, as your changes will be overwritten during the next generation.
- If you add a new component, don't forget to create the corresponding Terrazzo configuration file.
