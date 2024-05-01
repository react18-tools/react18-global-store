/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
	name: "Code Documentation",
	entryPoints: ["./src"],
	exclude: ["**/*.test.tsx"],
	entryPointStrategy: "Expand",
	out: "../../docs",
	commentStyle: "all",
	searchInComments: true,
	hideGenerator: true,
	githubPages: false,
	navigationLinks: {
		"Getting Started": "./md-docs/1.getting-started.md",
	},
	plugin: [
		"typedoc-plugin-mdn-links",
		"typedoc-plugin-rename-defaults",
		"typedoc-plugin-missing-exports",
		"typedoc-plugin-zod",
	],
};
