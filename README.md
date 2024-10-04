![GitHub package.json version](https://img.shields.io/github/package-json/v/a-ng-d/figmug-ui?color=informational) ![GitHub last commit](https://img.shields.io/github/last-commit/a-ng-d/figmug-ui?color=informational) ![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/a-ng-d/figmug-ui/npm.yml?label=npm) ![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/a-ng-d/figmug-ui/chromatic.yml?label=Chromatic) ![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/a-ng-d/figmug-ui/deploy.yml?label=Deployment)
 ![GitHub](https://img.shields.io/github/license/a-ng-d/figmug-ui?color=informational)
# Figmug UI

Figmug UI is a comprehensive library of UI components designed specifically for building Figma plugins. It leverages modern tools and frameworks to ensure a seamless development experience.

## Features

- **Build with React**: A popular JavaScript library for building user interfaces
- **Bundled with Vite**: Fast and optimized build tool for modern web projects.
- **Tested with Jest and Vitest**: Ensures reliability and robustness of components.
- **Exposed with Storybook**: Interactive UI component explorer for easy development and testing.

## Installation

To install Figmug UI, use npm or yarn:

```bash
npm install figmug-ui
# or
yarn add figmug-ui
```

## Usage

Here's an example of how to use a button component from Figmug UI:

```tsx
import { Button } from 'figmug-ui';

function App() {
  return (
    <div>
      <Button
        type="primary"
        label="Primary action button"
        action={() => console.log('I have been clicked')}
      />
    </div>
  );
}

export default App;
```

## Testing

To run tests, use the following commands:

```bash
npm test
# or
yarn test
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
