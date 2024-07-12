import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { globSync } from "glob";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    lib: {
      entry: globSync("src/**/*.ts", { ignore: "**/*.test.*" }),
    },
    rollupOptions: {
      output: [
        { preserveModules: true, format: "cjs" },
        { preserveModules: true, format: "es" },
      ],
      external: ["react", "react-dom"],
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [],
    coverage: {
      include: ["src/**"],
      reporter: ["text", "json", "clover", "html"],
    },
  },
});
