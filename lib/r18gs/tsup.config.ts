import { defineConfig } from "tsup";

export default defineConfig(options => ({
	format: ["cjs", "esm"],
	target: "es2019",
	sourcemap: false,
	clean: true,
	bundle: true,
	minify: !options.watch,
	legacyOutput: true,
}));
