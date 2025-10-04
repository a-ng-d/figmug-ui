# Figmug UI Scripts

This directory contains utility scripts for Figmug UI theme development and maintenance.

## Available Scripts

### Theme Generator (`create-theme.js`)

Creates a complete new theme for Figmug UI based on the Figma theme.

**[📚 Detailed documentation available here](../docs/theme-generator.md)**

The script automates the creation of the following elements:

1. **Token JSON files**: Creation of all theme tokens
2. **Terrazzo configuration**: Setup of Terrazzo configuration files
3. **Storybook integration**: Automatic configuration of the new theme in Storybook
4. **SCSS imports**: Updates all necessary SCSS imports automatically

### SCSS Builder (`build-scss.js`)

Generates SCSS files from design tokens.

```bash
# List available themes and components
npm run scss:list

# Build all SCSS files
npm run scss:build

# Build SCSS for a specific theme
npm run scss:build theme=themeName

# Build SCSS for a specific component across all themes
npm run scss:build component=componentName

# Build SCSS for a specific component within a specific theme
npm run scss:build theme=themeName component=componentName

# Build specific token types across all themes
npm run scss:build text
npm run scss:build color
npm run scss:build icon
npm run scss:build typography

# Build specific token types for a specific theme
npm run scss:build theme=themeName text
npm run scss:build theme=themeName color
```

The SCSS Builder:

- Converts JSON design tokens to SCSS variables
- Generates theme-specific styling for all platforms (Figma, Penpot, Sketch)
- Supports granular builds for specific token types (text, color, icon, typography)
- Creates component-specific styling
- Handles both base tokens and component tokens

## Usage of Theme Generator

### Via NPM Script

```bash
npm run create:theme
```

### Directly

```bash
node scripts/create-theme.js
```

The script will ask you to enter a name for your new theme, then create all the necessary files.

## Generated Structure

- `tokens/platforms/[theme-name]/`: JSON token files
- `terrazzo/[theme-name]/`: Terrazzo configuration files
- `terrazzo/[theme-name]/components/`: Terrazzo component configurations
- Automatic Storybook integration
- SCSS import statements in relevant files

## Next Steps After Theme Generation

After generating your theme, you will need to:

1. Review the Terrazzo configuration files in `terrazzo/[theme-name]/`
2. Customize token JSON files in `tokens/platforms/[theme-name]/`
3. Run `npm run scss:build theme=[theme-name]` to build the theme tokens
4. Launch Storybook with `npm run storybook` to preview your new theme

## Reference Source

The script now uses the `figma` theme as reference for all elements:

- Token JSON files: `figma`
- Terrazzo configuration: `figma`

## Contributing

When modifying these scripts, please:

1. Update the documentation in `/docs/` accordingly
2. Test all functionality before committing
3. Follow the existing code style and patterns
