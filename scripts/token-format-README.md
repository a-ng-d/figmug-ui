# Design Token Format Documentation

This document describes the token formats and standards used in the Figmug-UI design system.

## Token Structure

Design tokens in Figmug-UI follow a hierarchical structure organized by theme, category, and specific use case.

### Naming Convention

Tokens follow a dot-notation naming convention:

```
{theme}.{category}.{subcategory}.{variant}
```

Examples:

- `figma.color.text.primary`
- `sketch.typography.heading.h1`
- `penpot.spacing.component.small`

### Token Categories

#### Colors

Color tokens define all color values in the system:

```json
{
  "figma.color.text.primary": {
    "value": "#000000",
    "type": "color"
  },
  "figma.color.background.default": {
    "value": "#FFFFFF",
    "type": "color"
  },
  "figma.color.icon.tertiary": {
    "value": "#757575",
    "type": "color"
  }
}
```

#### Typography

Typography tokens define text styles:

```json
{
  "figma.typography.heading.h1": {
    "value": {
      "fontFamily": "Inter",
      "fontSize": "24px",
      "fontWeight": "600",
      "lineHeight": "32px"
    },
    "type": "typography"
  }
}
```

#### Spacing

Spacing tokens define consistent spacing values:

```json
{
  "spacing.component.small": {
    "value": "4px",
    "type": "dimension"
  },
  "spacing.component.medium": {
    "value": "8px",
    "type": "dimension"
  }
}
```

### Token Types

The token `type` property follows Token Studio conventions:

- `color`: Color values
- `dimension`: Sizes, spacing, width, height
- `typography`: Text styles
- `borderRadius`: Corner radius values
- `border`: Border styles
- `opacity`: Opacity values
- `boxShadow`: Shadow styles
- `other`: Any other token type

## Alias References

Aliases allow tokens to reference other tokens. In SCSS, this is done with CSS variables. The token generation script converts these references to Token Studio alias format:

**SCSS:**

```scss
--button-background: var(--color-primary);
```

**Token Studio Format:**

```json
{
  "button.background": {
    "value": "{color.primary}",
    "type": "color"
  }
}
```

## Theme Structure

The Figmug-UI design system supports multiple themes, each with light and dark modes:

- **Figma UI 2**: figma-ui2-light, figma-ui2-dark, figma-ui2-figjam
- **Figma UI 3**: figma-ui3-light, figma-ui3-dark, figma-ui3-figjam
- **Sketch**: sketch-light, sketch-dark
- **Penpot**: penpot-light, penpot-dark

## Integration with Token Studio

The token generation script creates two special files for Token Studio compatibility:

### $themes.json

Defines theme configurations and token set associations:

```json
{
  "figma-ui2": {
    "id": "figma-ui2",
    "name": "Figma UI 2",
    "group": true,
    "selectedTokenSets": {}
  },
  "figma-ui2-light": {
    "id": "figma-ui2-light",
    "name": "Light",
    "selectedTokenSets": {
      "colors-figma-light.json": "source",
      "component-actions-button-figma-ui2.json": "source"
    }
  }
}
```

### $metadata.json

Defines the order of token sets and the active set:

```json
{
  "tokenSetOrder": [
    "colors-figma-light.json",
    "colors-figma-dark.json",
    "types-figma.json"
  ],
  "activeTokenSet": "colors-figma-light.json"
}
```

For more information on how tokens are generated, see the [Generate Tokens Documentation](./generate-tokens-README.md).
