# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.19.38] - 2025-12-03

### Fixed

- **ActionsList Component Padding**: Adjusted padding values for selected action items across themes
  - Reduced right padding from `xsmall` to `xxsmall` for better visual balance in selected states
  - Fixed selected focus padding structure in Sketch theme for consistency
  - Updated padding values in Figma, Penpot, and Sketch themes for consistent spacing
  - Improved visual alignment of selected action items across all design systems

### Technical Details

- Updated `actions-list.json` token files for Figma, Penpot, and Sketch platforms
- Changed selected action item right padding from `{size.pos.xsmall}` to `{size.pos.xxsmall}`
- Fixed Sketch theme selectedFocus padding to use individual directional values (top, right, bottom, left)
- Regenerated SCSS files for ActionsList component with updated padding values

## [1.19.37] - 2025-12-02

### Enhanced

- **Tooltip Component with Image Support**: Added native image support to Tooltip component
  - New `image` prop for displaying images within tooltips without manual layout composition
  - Enhanced `WITH_IMAGE` tooltip type with proper image and text alignment
  - Simplified Chip component by leveraging native Tooltip image support
  - Better image rendering with consistent gap spacing between image and text

### Changed

- **Tooltip Component Structure**: Improved internal layout for better content composition
  - Added `tooltip__snack` wrapper for flexible content layout
  - Enhanced styling with proper flexbox alignment and gap management
  - Simplified component usage by removing need for manual layout composition in consumers

- **Chip Component Simplification**: Refactored preview tooltip implementation
  - Removed manual image layout composition in favor of Tooltip's native `image` prop
  - Simplified component by removing unnecessary layout module imports
  - Better separation of concerns between Tooltip rendering and Chip logic

### Added

- **Tooltip Storybook Documentation**: Comprehensive story examples for all tooltip variants
  - Interactive stories for single-line, multi-line, and image tooltips
  - All tooltip types displayed in organized grid layout with proper spacing
  - Examples demonstrating both TOP and BOTTOM pin positions
  - Edge position story showing viewport boundary auto-adjustment
  - Comprehensive AllTooltips story showcasing all variants with visual examples

### Technical Details

- Added `image?: string` prop to Tooltip component interface
- Implemented `tooltip__snack` CSS class with flexbox layout and gap styling
- Enhanced Tooltip component to conditionally render image element when `image` prop is provided
- Updated `.prettierignore` to include `globals.scss` for better build consistency
- Improved Tooltip layout structure with nested presentation wrappers for better styling control

## [1.19.36] - 2025-12-02

### Enhanced

- **Button Component Status Rendering**: Improved conditional rendering logic for button status indicators
  - Status component now only renders when warning prop is defined for icon buttons
  - Chip status (Pro/New badges) no longer displays on icon-type buttons
  - Better visual consistency across different button types

### Technical Details

- Added conditional rendering check for warning prop in icon button template
- Enhanced Status template to check button type before rendering Chip component
- Updated Storybook controls for better icon button configuration

## [1.19.35] - 2025-11-19

### Enhanced

- **SemanticMessage Layout**: Added max-width constraint (400px) for better responsive layout control
- **Select Component Structure**: Improved layout with snackbar wrapper for better tooltip positioning and responsive behavior
- **Background Color Variables**: Standardized semantic message background color variable naming across themes

### Technical Details

- Added semantic-message max-width token across all theme configurations
- Enhanced Select component templates with consistent layout wrapper structure
- Updated background color variable references from base names to `-default` suffix for consistency

## [1.19.34] - 2025-11-19

### Enhanced

- **SemanticMessage Responsive Orientation**: Added automatic vertical orientation on narrow screens (≤460px)
  - Dynamic orientation switching based on document width detection
  - Window resize event handling for real-time responsive adaptation
  - Enhanced mobile layout for better semantic message display

### Technical Details

- Added document width tracking with resize event listeners to SemanticMessage component
- Implemented responsive orientation logic that overrides manual orientation prop on small screens
- Enhanced component state management for viewport dimension tracking

## [1.19.33] - 2025-11-19

### Enhanced

- **Bar Component Responsive Padding**: Improved mobile padding configuration for better responsive design
  - Enhanced mobile padding specification with individual top, right, bottom, left values
  - Refined responsive padding from single `--bar-padding-mobile` to detailed directional padding tokens
  - Better spacing control in mobile layouts with more granular padding configuration

### Technical Details

- Updated bar component padding tokens across all themes (Figma, Penpot, Sketch, Framer)
- Enhanced CSS responsive rules to use individual padding directions for mobile breakpoints
- Improved design token structure for more flexible responsive padding management
- Minor formatting improvements in generated CSS files for better readability

## [1.19.32] - 2025-11-19

### Added

- **Responsive UI Patterns**: Comprehensive responsive behavior across components with 460px breakpoint
  - Button `shouldReflow` prop: labels automatically move to tooltips on narrow screens
  - Dropdown responsive mode: transforms to Menu component on mobile
  - Tabs responsive fallback: converts to dropdown navigation on small screens
  - Select component tooltip handling with optional label rendering for flexible usage

### Enhanced

- **Component Positioning**: Improved Menu and Dropdown viewport management
  - Smart repositioning to prevent overflow outside visible area
  - Enhanced transform calculations for better Menu alignment
  - Added visibility delays for smoother positioning transitions

- **Layout Responsiveness**: Refined responsive layout behavior
  - Flex-wrap support in snackbar layouts and ActionsItem components
  - Better border positioning for mobile (border-left → border-top)
  - Enhanced component dimensions handling in responsive mode

### Fixed

- **Warning Prop Consistency**: Standardized warning prop types across components
  - Removed deprecated `WITH_IMAGE` type from tooltip interfaces
  - Fixed prop type mismatches in Slider, Select, and SimpleSlider components

- **Component Styling**: Minor fixes for better visual consistency
  - Removed fixed dimensions from Dropzone component
  - Updated select component heights (medium → small) for better alignment
  - Enhanced Dialog cover box-sizing for responsive behavior

### Technical Details

- Window resize event handling with proper cleanup across components
- Responsive breakpoint detection at ≤460px with automatic UI adaptation
- Enhanced tooltip management with conditional rendering based on screen size
- Improved component state management for viewport dimension tracking

## [1.19.31] - 2025-11-17

### Fixed

- **Tabs Responsiveness**: Simplified responsive behavior by removing dropdown mode and improving flex layout on small screens

## [1.19.30] - 2025-11-17

### Added

- **Button Helper Tooltip**: Added `helper` prop for contextual tooltips with configurable positioning
- **Tabs Responsive Wrapper**: Enhanced Tabs dropdown mode with proper wrapper structure and ARIA attributes

### Fixed

- **Layout Overflow**: Fixed `overflow: visible` on layout blocks for screens ≤460px to prevent content clipping

## [1.19.29] - 2025-11-17

### Fixed

- **Button Component Label Rendering**: Improved button label rendering to handle optional labels
  - Fixed issue where button label span was always rendered even when label was undefined
  - Added conditional rendering to only display label element when label prop is defined
  - Enhanced component flexibility by allowing buttons with icons only (no label required)
  - Improved DOM structure by avoiding empty label spans in the rendered output

### Technical Details

- Added `label !== undefined` condition before rendering the button label span
- Maintained existing label styling and structure when label is provided
- Enhanced component API flexibility for icon-only button use cases
- Improved DOM cleanliness by preventing unnecessary empty elements

## [1.19.28] - 2025-11-17

### Added

- **Responsive Tabs Component**: Implemented intelligent responsive behavior for navigation tabs
  - Added automatic dropdown fallback for tab navigation on narrow screens (≤460px)
  - Enhanced Tabs component with window width detection using `useState` and `useEffect` hooks
  - Implemented dynamic option mapping that preserves tab functionality in dropdown mode
  - Added proper event handling to maintain `data-feature` attribute consistency between tab and dropdown modes

- **Layout Storybook Documentation**: Created comprehensive Storybook stories for Layout component
  - Added detailed Layout component stories demonstrating responsive behavior
  - Created sample components using Section, SimpleItem, and SectionTitle for realistic examples
  - Implemented TwoColumns and ThreeColumns story variants showcasing different layout configurations
  - Added responsive documentation explaining automatic column-to-row conversion at 460px breakpoint

### Enhanced

- **Layout Component Responsiveness**: Improved Layout component behavior across different screen sizes
  - Added responsive CSS rules with `@media (max-width: 460px)` breakpoint for automatic layout adaptation
  - Enhanced layout to switch from horizontal columns to vertical stacking on small screens
  - Implemented border direction changes: `border-left` converts to `border-top` in responsive mode
  - Added automatic width adjustments with `width: 100%` and constraint resets for responsive columns
  - Fixed height behavior in responsive mode: `height: auto` instead of fixed heights

### Changed

- **Tabs Component API**: Enhanced Tabs component with responsive dropdown integration
  - Added support for automatic UI pattern switching based on viewport width
  - Implemented DropdownOption mapping that preserves original tab functionality
  - Enhanced component to handle both tab navigation and dropdown selection seamlessly
  - Added window resize event handling for real-time responsive behavior

### Technical Details

- Added `useEffect` and `useState` hooks for window width tracking in Tabs component
- Implemented responsive breakpoint detection with proper cleanup of event listeners
- Enhanced Layout CSS with mobile-first responsive design patterns
- Created comprehensive Storybook documentation with realistic component examples
- Added proper TypeScript interfaces for dropdown option mapping from tabs
- Implemented event delegation to maintain consistent action handling across UI patterns

### Documentation

- **Storybook Stories**: Added comprehensive Layout component documentation
  - Created realistic example components using the design system (Section, SimpleItem, SectionTitle)
  - Added detailed story descriptions explaining responsive behavior and breakpoint changes
  - Implemented proper component composition patterns for Layout story examples
  - Added visual examples of two-column and three-column layouts with responsive adaptations

## [1.19.27] - 2025-11-15

### Fixed

- **Menu Component Alignment**: Fixed CSS transform conflicts affecting TOP_RIGHT and TOP_LEFT menu positioning
  - Resolved issue where viewport management transforms were overriding alignment-specific transforms
  - Fixed menus appearing too low when using TOP_RIGHT or TOP_LEFT alignment options
  - Enhanced transform combination logic to preserve both alignment positioning and viewport adjustments
  - Improved transform calculation to properly combine `translateY(-100%)` with viewport `translateX()` adjustments

### Technical Details

- Added intelligent transform combination that preserves base alignment transforms
- Enhanced viewport management to detect and respect existing TOP alignment transforms
- Fixed transform conflicts by properly combining CSS and JavaScript transform values
- Improved positioning logic to handle multiple simultaneous transform operations

## [1.19.26] - 2025-11-15

### Enhanced

- **Menu and Dropdown Components**: Improved positioning and viewport visibility enhancements
  - Added automatic viewport boundary detection to prevent menus from overflowing outside the visible area
  - Implemented smart repositioning for both horizontal and vertical overflow scenarios
  - Enhanced Menu component to use `containerId` prop instead of `parentClassName` for better consistency with Dropdown
  - Added comprehensive viewport management that works in combination with existing parent container positioning
  - Improved menu visibility with proper transform calculations to keep menus within viewport bounds
  - Enhanced accessibility and user experience by ensuring menus remain accessible regardless of screen position

### Changed

- **Menu Component API**: Updated Menu component prop interface for better consistency
  - **BREAKING**: Replaced `parentClassName?: string` with `containerId?: string` prop
  - Unified positioning API between Menu and Dropdown components for consistent developer experience
  - Enhanced ActionsList integration with proper containerId prop passing

### Technical Details

- Implemented dual-layer positioning system: viewport-first, then container-specific adjustments
- Added smart transform calculations using `translateX()` and `translate()` for optimal positioning
- Enhanced both Menu and Dropdown components with identical viewport management logic
- Improved menu visibility logic with proper container-based visibility handling
- Added 8px safety margins from viewport edges to ensure adequate spacing

## [1.19.25] - 2025-11-15

### Enhanced

- **ColorItem Component**: Enhanced ColorItem component to manage removal state and improve styling
  - Added removal state management for better user interaction
  - Improved component styling for enhanced visual feedback
  - Better handling of color item removal workflows

## [1.19.24] - 2025-10-31

### Changed

- Card: remove unnecessary `justify-content` property from card styles

### Fixed

- Card: make `richText` and `actions` props optional in `Card` component
- Build: update `.prettierignore` to include Framer and Figma related styles and ensure `penpot.scss` is ignored

## [1.19.23] - 2025-10-31

### Fixed

- Make `src` prop optional and ensure proper rendering of asset and actions styles

## [1.19.22] - 2025-10-30

### Changed

- Adjust tab padding sizes in SCSS and token JSON for consistency across Figma and Sketch platforms

## [1.19.21] - 2025-10-29

### Changed

- Refactor Framer theme SCSS variable syntax to use double quotes for consistency across components and stylesheets

### Fixed

- Update accordion styles to use null size for row gap across themes (commit aa61978d)

## [1.19.20] - 2025-10-29

### Fixed

- Update tab notification dimensions to use `xxsmall` size

## [1.19.19] - 2025-10-29

### Fixed

- Tabs: clicking the "New" badge now triggers the parent tab and returns the correct `data-feature` id

## [1.19.18] - 2025-10-28

### Fixed

- Adjust popin component height settings for better responsiveness

## [1.19.17] - 2025-10-28

### Added / Changed

- Add centered alignment options to snackbar and stackbar components

## [1.19.16] - 2025-10-27

### Fixed

- Remove `isDisabled` and `isBlocked` props from `Accordion` component

## [1.19.15] - 2025-10-26

### Fixed

- Remove overflow:auto from `bar__left`, `bar__right`, and `bar__solo` elements

## [1.19.14] - 2025-10-26

### Added

- Bar component: add clipping/truncation functionality and update stories

## [1.19.13] - 2025-10-26

### Fixed

- Ensure overflow is auto for `bar__left`, `bar__right`, and `bar__solo` elements

## [1.19.12] - 2025-10-26

### Fixed

- Remove overflow hidden from `bar__left`, `bar__right`, and `bar__solo` elements

## [1.19.11] - 2025-10-26

### Fixed

- Ensure overflow is hidden for `bar__left`, `bar__right`, and `bar__solo` elements

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
