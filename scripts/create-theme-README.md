# Theme Generator Script

This script allows you to easily generate a new UI theme for figmug-ui, based on existing themes (figma-ui2, figma-ui3, penpot, sketch).

## Features

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

## Next Steps

After generating your theme, you will need to:

1. Customize color tokens in `src/styles/tokens/[theme-name]-colors.scss`
2. Customize typography tokens in `src/styles/tokens/[theme-name]-types.scss`
3. Adapt component SCSS files if necessary
4. Update your application to include the new theme

## Reference Source

The script uses `figma-ui3` theme as reference for all elements.

## Integration with Token Generation

After creating a new theme, you can generate design tokens for it using the [token generation script](./generate-tokens-README.md). This will ensure your new theme is included in the Token Studio configuration.
