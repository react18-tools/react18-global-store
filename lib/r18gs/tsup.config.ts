import { defineConfig } from "tsup";
import fs from "node:fs";
import path from "node:path";

export default defineConfig(options => ({
	format: ["cjs", "esm"],
	target: "es2019",
	sourcemap: false,
	clean: true,
	bundle: true,
	minify: !options.watch,
	legacyOutput: true,
	esbuildPlugins: [
		{
			name: "improve-minify",
			setup(build) {
				build.onLoad({ filter: /use-rgs.ts/ }, args => {
					let contents = fs.readFileSync(args.path, "utf8");
					const lines = contents.split("\n");
					const hackLine = lines.find(line => line.startsWith("const [VALUE,"));

					if (!hackLine) return { contents, loader: "ts" };
					/** remove hackLine */
					contents = contents.replace(hackLine, "");

					/** clean up */
					const tokens = hackLine
						.replace("const", "")
						.split("=")[0]
						.trim()
						.replace(/\]|\[/g, "")
						.split(",")
						.map(t => t.trim());

					tokens.sort((a, b) => a.length - b.length);

					for (let i = 0; i < tokens.length; i++) {
						contents = contents.replace(new RegExp(`${tokens[i]}`, "g"), i + "");
					}
					console.log({ contents });
					return { contents, loader: "ts" };
				});
			},
		},
	],
}));
