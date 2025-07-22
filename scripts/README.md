# Figmug-UI Scripts

This directory contains utility scripts for managing and generating resources for the Figmug-UI design system.

## Available Scripts

### [Token Generation](./generate-tokens-README.md)

A script to generate design tokens in a format compatible with Token Studio. This script extracts CSS variables from SCSS files and converts them to a structured token format.

```bash
# Run the token generation script
node generate-tokens.js
```

### [Theme Generator](./create-theme-README.md)

This script allows you to easily generate a new UI theme for figmug-ui, based on existing themes (figma-ui2, figma-ui3, penpot, sketch).

## Theme Generator Features

The script automates the creation of the following elements:

1. **Color tokens**: creation of token files for light and dark modes
2. **Typography tokens**: creation of typography token files
3. **Icons**: duplication of figma-ui3 icons to the new theme
4. **SCSS files**: creation of theme-specific SCSS files for all components

## Usage

### Via NPM Script

```bash
npm run create-theme
```

### Directly

```bash
node scripts/create-theme.js
```

The script will ask you to enter a name for your new theme, then create all the necessary files.

## Generated Structure

- `src/styles/tokens/[theme-name]-colors.scss`: Color tokens
- `src/styles/tokens/modules/[theme-name]-colors.module.scss`: Color tokens module
- `src/styles/tokens/[theme-name]-types.scss`: Typography tokens
- `src/styles/tokens/modules/[theme-name]-types.module.scss`: Typography tokens module
- `src/icons/[theme-name]/`: Icons directory
- Theme-specific SCSS files for each component

## Documentation

For detailed information about each script, refer to the dedicated documentation:

- [Token Generation Documentation](./generate-tokens-README.md)
- [Token Format Documentation](./token-format-README.md)
- [Theme Generator Documentation](./create-theme-README.md)

## Next Steps

After creating a new theme with the theme generator, you'll need to:

1. Customize the tokens for your new theme
2. Generate design tokens using the token generation script
3. Adapt component styles as needed
4. Update your application to include the new theme

- Colors: `figma-ui3`
- Typography: `figma-ui3`
- Icons: `figma-ui3`

## Contribution

To modify the script's behavior, you can edit the constants at the beginning of the `scripts/create-theme.js` file:

```javascript
// Source theme to copy from - using figma-ui3 for everything
const SOURCE_COLOR_THEME = 'figma-ui3'
const SOURCE_TYPE_THEME = 'figma-ui3'
const SOURCE_ICONS = 'figma-ui3'
```
