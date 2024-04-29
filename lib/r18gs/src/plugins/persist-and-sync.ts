import { Plugin } from "..";

const persistAndSyncExtension: Plugin<unknown> = {
	init(key, value, _, mutate) {
		if (window !== undefined && localStorage !== undefined) {
			const persistedValue = localStorage.getItem(key);
			if (persistedValue) {
				mutate(JSON.parse(persistedValue).val);
			}
			addEventListener("storage", e => {
				if (e.key === key && e.newValue) {
					mutate(JSON.parse(e.newValue).val);
				}
			});
		}
	},
	onChange(key, value) {
		if (window !== undefined && localStorage !== undefined) {
			localStorage.setItem(key, JSON.stringify({ val: value }));
		}
	},
};
