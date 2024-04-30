import { Plugin } from "..";

/**
 * A plugin that persists and syncs RGS store between tabs.
 *
 * @returns A plugin that persists and syncs a value between tabs.
 */
function persistAndSyncPlugin<T>(): Plugin<T> {
	return {
		init(key, _, mutate) {
			if (typeof window === "undefined") return;
			const persistedValue = localStorage.getItem(key);
			const newVal = JSON.parse(persistedValue || "{}").val;
			if (newVal) mutate(newVal);

			addEventListener("storage", e => {
				if (e.key === key && e.newValue) {
					const newVal = JSON.parse(e.newValue).val;
					if (newVal !== undefined) mutate(newVal);
				}
			});
		},
		onChange(key, value) {
			if (typeof window !== "undefined") {
				localStorage.setItem(key, JSON.stringify({ val: value }));
			}
		},
	};
}

export default persistAndSyncPlugin;
