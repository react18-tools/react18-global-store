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
  esbuildPlugins: [
    {
      name: "improve-minify",
      setup(build) {
        build.onLoad({ filter: /utils.ts/ }, args => {
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
            .map((t, i) => ({ token: t.trim(), i }));

          tokens.sort((a, b) => b.token.length - a.token.length);

          for (const t of tokens) {
            contents = contents.replace(new RegExp(`${t.token}`, "g"), String(t.i));
          }
          return { contents, loader: "ts" };
        });
      },
    },
  ],
}));
