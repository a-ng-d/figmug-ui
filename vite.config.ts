import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import * as packageJson from "./package.json";

export default defineConfig(() => ({
  plugins: [
    react(),
    tsConfigPaths(),
  ],
  build: {
    lib: {
      entry: resolve("src", "index.ts"),
      name: "figmug-ui",
      formats: ["es", "cjs"],
      fileName: (format) =>
        `figmug-ui.${
          format === "cjs" ? "cjs" : "es.js"
        }`,
    },
    optimizeDeps: {
      exclude: Object.keys(packageJson.peerDependencies),
    },
    esbuild: {
      minify: true,
    },
  },
}));