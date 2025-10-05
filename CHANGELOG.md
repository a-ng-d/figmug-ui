# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.18.0]

### Added

- Design Tokens Community Group (DTCG) implementation with Terrazzo
- Theme system supporting Figma, Penpot, and Sketch design systems
- Theme Generator tool for creating custom themes
- SCSS Builder for generating theme-specific stylesheets
- Comprehensive tokens for colors, typography, spacing, and effects
- Platform-specific token configurations

### Changed

- **BREAKING**: Complete migration from traditional CSS to DTCG tokens
- Storybook theme system updated to use new token-based themes
- Component styling now uses design tokens for consistency
- Theme switching mechanism improved for better performance

### Improved

- Better design consistency across different platforms
- Easier theme customization and maintenance
- Scalable token management system
- Enhanced documentation with theme generator guide

### Technical Details

- Added `@terrazzo/cli` and related plugins for token processing
- Implemented automatic SCSS generation from JSON tokens
- Created modular token system with globals, colors, typography, and component-specific tokens
- Added support for component-specific token building
- Integrated token validation and linting

### Migration Notes

This version introduces a major architectural change in how styling is handled:

1. **Token Structure**: All design values are now defined as DTCG-compliant JSON tokens
2. **Theme System**: Themes are generated from token configurations
3. **Component Updates**: All components now consume design tokens instead of hard-coded CSS values
4. **Build Process**: SCSS files are automatically generated from tokens using Terrazzo

### Platform Support

- **Figma**: Full token support with Figma UI theme compatibility
- **Penpot**: Complete theme implementation for Penpot design system
- **Sketch**: Theme support matching Sketch's design language
