import { defineConfig } from "tsup";
import fs from "node:fs";

export default defineConfig(options => ({
  format: ["cjs", "esm"],
  target: "es2015",
  entry: ["./src"],
  sourcemap: false,
  clean: !options.watch,
  bundle: true,
  minify: !options.watch,
}));
