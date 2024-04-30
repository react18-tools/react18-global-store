/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
	name: "Code Documentation",
	entryPoints: ["./src"],
	exclude: ["**/*.test.tsx"],
	entryPointStrategy: "Expand",
	out: "../../docs",
	commentStyle: "all",
	searchInComments: true,
	plugin: [
		"typedoc-plugin-mdn-links",
		"typedoc-plugin-rename-defaults",
		"typedoc-plugin-missing-exports",
		"typedoc-plugin-zod",
	],
};
