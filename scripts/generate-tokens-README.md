# Generate Tokens Script

This script generates design tokens in a format compatible with Token Studio. It extracts CSS variables from SCSS files and converts them to a structured JSON format that can be used with design tools.

## Features

- **CSS Variable Extraction**: Extracts CSS variables from SCSS files
- **Token Studio Compatibility**: Generates tokens in a format compatible with Token Studio
- **Theme Support**: Creates tokens for multiple themes (figma, sketch, penpot)
- **Alias Support**: Converts CSS `var(--token-name)` references to Token Studio alias format `{token.name}`
- **Component-Specific Tokens**: Extracts and organizes component-level tokens
- **Mode Support**: Generates tokens for light and dark modes

## Usage

```bash
node generate-tokens.js
```

## Generated Files

The script generates the following files in the `tokens/` directory:

- **Color Tokens**: `colors-{theme}-{mode}.json` (e.g., `colors-figma-light.json`)
- **Typography Tokens**: `types-{theme}.json` (e.g., `types-figma.json`)
- **Global Tokens**: `globals.json` (shared across themes)
- **Component Tokens**: `component-{type}-{name}-{theme}.json` (e.g., `component-actions-button-figma-ui3.json`)
- **Token Studio Files**:
  - `$themes.json` - Theme configuration for Token Studio
  - `$metadata.json` - Metadata for token sets

## Token Structure

### Color Tokens

Color tokens are organized by theme and mode:

```json
{
  "figma.color.icon.primary": {
    "value": "#000000",
    "type": "color"
  }
}
```

### Typography Tokens

Typography tokens define text styles:

```json
{
  "figma.typography.heading.h1": {
    "value": "24px",
    "type": "typography"
  }
}
```

### Component Tokens

Component tokens provide component-specific values:

```json
{
  "button.border.radius": {
    "value": "4px",
    "type": "borderRadius"
  }
}
```

## SCSS Structure Requirements

The script expects SCSS files to be structured in a specific way:

- Global variables should be defined in the `:root` selector
- Theme-specific variables should use the `:root[data-mode='theme-mode']` selector
- Component variables should follow a similar pattern

## Implementation Details

The script performs the following operations:

1. Extracts variables from SCSS files
2. Converts variable names to Token Studio format
3. Organizes tokens by theme, mode, and component
4. Generates Token Studio compatible JSON files
5. Creates theme configuration files for Token Studio

For more information on token formats and standards, see the [Token Format Documentation](./token-format-README.md).
