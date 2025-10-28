# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.19.18] - 2025-10-28

### Fixed

- Adjust popin component height settings for better responsiveness (commit 9b088be2)

## [1.19.17] - 2025-10-28

### Added / Changed

- Add centered alignment options to snackbar and stackbar components (commit 865dcafe)

## [1.19.16] - 2025-10-27

### Fixed

- Remove `isDisabled` and `isBlocked` props from `Accordion` component (commit 1d7a7b7b)

## [1.19.15] - 2025-10-26

### Fixed

- Remove overflow:auto from `bar__left`, `bar__right`, and `bar__solo` elements (commit b6c9d194)

## [1.19.14] - 2025-10-26

### Added

- Bar component: add clipping/truncation functionality and update stories (commit d2ed9fcb)

## [1.19.13] - 2025-10-26

### Fixed

- Ensure overflow is auto for `bar__left`, `bar__right`, and `bar__solo` elements (commit 77ff4d67)

## [1.19.12] - 2025-10-26

### Fixed

- Remove overflow hidden from `bar__left`, `bar__right`, and `bar__solo` elements (commit 19685f64)

## [1.19.11] - 2025-10-26

### Fixed

- Ensure overflow is hidden for `bar__left`, `bar__right`, and `bar__solo` elements (commit 8bc3468f)


## [1.19.9] - 2025-10-24

### Added

- **FormItem Baseline Alignment**: Added `isBaseline` prop to FormItem component for better text alignment
  - New baseline alignment option for improved layout when using text content as children
  - Enhanced FormItem styling with `form-item--baseline` modifier class
  - Better visual consistency when mixing interactive and text-only form items

### Changed

- **FormItem Component Enhancement**: Improved FormItem component flexibility and styling
  - Added baseline alignment styling that removes margins from labels and chips
  - Enhanced row alignment to use baseline positioning when `isBaseline` is enabled
  - Improved component API with better prop organization

- **ColorItem Props Refinement**: Improved ColorItem component prop structure
  - Made `id` prop optional for better component flexibility
  - Reordered props for better logical grouping and readability

### Added

- **Storybook Documentation**: Enhanced FormItem component documentation
  - Added new `SimpleTextItem` story demonstrating text content usage with baseline alignment
  - Improved story examples with proper text styling using design system typography
  - Better demonstration of FormItem component versatility

### Technical Details

- Added `isBaseline` prop to FormItem interface with default value of `false`
- Implemented `form-item--baseline` CSS class with baseline alignment and margin resets
- Enhanced FormItem stories with text styling import and baseline alignment example
- Improved ColorItem prop types with optional `id` prop for better developer experience

## [1.19.8] - 2025-10-20

### Added

- **Dropzone Disabled State**: Added comprehensive disabled state support to Dropzone component
  - New disabled visual styling with appropriate background, border, and cursor states
  - Consistent disabled appearance across all supported themes (Figma, Penpot, Sketch, Framer)
  - Proper accessibility support with `pointer-events: none` and `cursor: not-allowed`
  - Automatic disabled state activation when `isBlocked` or `isDisabled` props are true

### Changed

- **Dropzone Theme Tokens**: Enhanced design token system for Dropzone component
  - Added disabled-specific tokens for background color, border color, width, offset, and style
  - Updated all theme configurations (Figma, Penpot, Sketch, Framer) with disabled state tokens
  - Improved semantic message background color handling in disabled state
  - Refined Framer theme default background color for better consistency

### Technical Details

- Added `dropzone--disabled` CSS class with comprehensive disabled styling
- Implemented disabled state tokens across all design system themes
- Enhanced component logic to apply disabled class when `isBlocked` or `isDisabled` is true
- Updated design token JSON files for all platforms with disabled state specifications
- Improved theme consistency with proper disabled color mappings

## [1.19.7] - 2025-10-19

### Fixed

- **Figma Icon Correction**: Fixed visual inconsistency in Figma `caret-down` icon
  - Corrected icon design to match Figma's design system specifications
  - Improved visual consistency across Figma-themed components
  - Enhanced icon clarity and alignment

### Technical Details

- Updated Figma `caret-down` icon SVG for better visual fidelity
- Maintained icon sizing and positioning while improving design accuracy

## [1.19.6] - 2025-10-19

### Changed

- **Release Workflow Enhancement**: Improved GitHub release automation
  - Updated release workflow to include date in release names for better identification
  - Enhanced release notes generation for more informative GitHub releases
  - Streamlined release process with better date formatting

### Technical Details

- Modified GitHub Actions workflow to automatically append current date to release names
- Improved release automation for better release tracking and identification

## [1.19.5] - 2025-10-19

### Changed

- **CSS Values Adjustment**: Minor CSS value corrections for improved visual consistency
  - Updated two CSS property values for better component alignment and spacing
  - Refined styling parameters to enhance overall visual coherence

### Technical Details

- Adjusted specific CSS values to improve component rendering and visual balance
- Minor styling refinements for better cross-browser consistency

## [1.19.4] - 2025-10-15

### Fixed

- **Framer Theme Icon Sizing**: Fixed icon width and positioning inconsistencies in Framer theme
  - Corrected icon width from `msmall` to `medium` for better visual balance
  - Updated input padding with icon to match new icon dimensions
  - Fixed icon color variables to ensure both letter and picto icons use consistent colors

### Changed

- **Input Component Spacing**: Improved input component spacing and positioning in Framer theme
  - Adjusted clearable button positioning from `xunit` to `xxxsmall` for better alignment
  - Updated popin footer padding from `xxsmall` to `msmall` for improved spacing
  - Refined input token values for more consistent visual hierarchy

### Technical Details

- Updated Framer theme tokens for input icon width (`size.pos.medium` instead of `size.pos.msmall`)
- Fixed clearable button positioning tokens (`size.pos.xxxsmall` instead of `size.pos.xunit`)
- Added `--icon-picto-color` CSS variable for consistent icon coloring
- Improved popin footer padding tokens for better visual spacing
- Enhanced input padding calculations to accommodate updated icon dimensions

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
