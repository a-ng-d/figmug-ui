# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.19.3] - 2025-10-14

### Fixed

- **Framer Theme Inconsistencies**: Corrected various inconsistencies in the Framer design system implementation
  - Fixed styling discrepancies between Framer theme and other platform themes
  - Resolved component-specific styling issues affecting visual consistency
  - Improved theme token mappings for better cross-platform alignment

### Changed

- **Theme Consistency**: Enhanced visual coherence across all supported design systems
  - Standardized component styling patterns for better maintainability
  - Improved token usage consistency in Framer-specific components
  - Better alignment with Framer design system guidelines

### Technical Details

- Corrected inconsistent CSS variable usage in Framer theme components
- Fixed theme-specific styling overrides that were causing visual discrepancies
- Improved component token inheritance for better theme consistency

## [1.19.2] - 2025-10-14

### Fixed

- **Framer Styles Export**: Fixed missing export of Framer CSS modules in the main library bundle
  - Added direct imports for `framer-colors.module.scss` and `framer-types.module.scss` to index.ts
  - Framer theme styles now properly available when consuming the library
  - Resolved issue where Framer styling was not accessible in production builds

### Changed

- **Build Process**: Simplified build pipeline by removing post-build CSS fix script
  - Removed `fix-css-modules.mjs` script in favor of direct module imports
  - Streamlined build command from `tsc && vite build && node scripts/fix-css-modules.mjs` to `tsc && vite build`
  - More reliable CSS module inclusion through explicit imports rather than post-build copying

### Technical Details

- Removed automated CSS module fix script (`scripts/fix-css-modules.mjs`)
- Added explicit Framer theme CSS module imports to main entry point
- Simplified build process while maintaining consistent CSS module availability
- Improved library distribution reliability for Framer theme assets

## [1.19.1] - 2025-10-14

### Fixed

- **Framer Colors CSS Module Generation**: Fixed issue where `framer-colors.css` was not being generated in the `dist/assets/styles/tokens/modules/` directory
  - Resolved Vite optimization behavior that treated smaller CSS files differently
  - Added automated CSS module fix script to ensure consistent module generation
  - All Framer color tokens now properly available as CSS modules for import

### Changed

- **Build System**: Enhanced build process with automated CSS module validation
  - Added `fix-css-modules.mjs` script to ensure consistent CSS module generation
  - Converted build scripts to ES modules for better consistency with project structure
  - Improved reliability of CSS token distribution in library builds

### Technical Details

- Implemented post-build validation script that detects and fixes missing CSS modules
- Fixed Vite configuration regex filter that was incorrectly excluding color module files
- Enhanced build pipeline to automatically copy missing CSS modules to proper distribution directories
- Converted CommonJS scripts to ES modules (`.mjs`) for modern JavaScript compatibility

## [1.19.0]

### Added

- **Framer Theme Support**: Complete theme implementation for Framer design system
  - Full Framer color palette, typography, and spacing tokens
  - Platform-specific component styling for Framer
  - Framer-compatible icons and visual elements
- **New Members List Component**: Interactive member avatar display component
  - Support for avatar stacking with configurable display count
  - Tooltip integration for member information
  - `isInverted` prop for flexible z-index management
- **Enhanced Component Library**: Comprehensive Framer theme support across all components
  - Actions List, Buttons, Inputs, Dropdowns, Tabs
  - Dialog systems, Notifications, Form components
  - List components, Layout components, and more

### Changed

- **Input Components**: Improved styling consistency across platforms
  - Unified padding and height variables for better alignment
  - Enhanced color chip and icon positioning
  - Better focus and error state handling
- **Select Component**: Complete refactoring for better maintainability
  - Improved accessibility with proper ARIA labels
  - Enhanced disabled state styling
  - Better box-sizing and positioning control
- **Typography System**: Updated font weights and letter spacing for consistency
- **Component Tokens**: Platform-specific token refinements
  - Improved border radius usage across components
  - Enhanced color token mappings for better theme consistency
  - Optimized spacing and sizing tokens

### Fixed

- **Letter Spacing**: Corrected letter spacing values across all text tokens
- **Border Radius**: Fixed border radius aliases and raw value usage
- **Input Container**: Improved input container radius calculations
- **Color Mapping**: Fixed background color mappings in Framer theme
- **Z-Index Issues**: Resolved input z-index conflicts
- **Icon Fonts**: Ensured icon letter font sizes are properly applied

### Improved

- **Theme Consistency**: Better visual alignment between Figma, Penpot, Sketch, and Framer
- **Token Management**: More robust token system with proper aliases
- **Component Reliability**: Enhanced component stability and predictable behavior
- **Developer Experience**: Better component APIs and prop consistency

### Technical Details

- Added comprehensive Framer configuration files across all component categories
- Implemented platform-specific token generation for Framer
- Enhanced SCSS build system to support multi-platform token generation
- Improved component-level token management and inheritance
- Added proper TypeScript types for new component features

### Platform Support

- **Figma**: Continued full support with optimizations
- **Penpot**: Enhanced theme compatibility and visual consistency
- **Sketch**: Improved component styling and token accuracy
- **Framer**: **NEW** - Complete design system implementation with full component library support

## [1.18.1]

### Changed

- **Icons**: Updated SVG icons for consistency and improved design
  - Refactored Figma icons: check, help, repository, star-off, star-on, user
  - Updated Penpot icons: star-off, star-on
  - Updated Sketch repository icon with improved styling and opacity effects

### Improved

- Better visual consistency across icon sets
- Enhanced icon styling with proper opacity and fill rules
- Improved accessibility and visual clarity

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
