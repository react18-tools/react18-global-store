/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
	name: "React18 Global Store",
	entryPoints: ["./src"],
	exclude: ["**/*.test.tsx"],
	entryPointStrategy: "Expand",
	out: "../../docs",
	commentStyle: "all",
	searchInComments: true,
	hideGenerator: true,
	githubPages: false,
	navigationLinks: {
		GitHub: "https://github.com/react18-tools/react18-global-store",
	},
	plugin: [
		"typedoc-plugin-mdn-links",
		"typedoc-plugin-rename-defaults",
		"typedoc-plugin-missing-exports",
		"typedoc-plugin-zod",
	],
};
