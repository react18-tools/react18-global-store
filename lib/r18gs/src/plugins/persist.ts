import { Plugin } from "..";

export interface PersistOptions {
	/** @defaultValue true */
	sync?: boolean;
	/** @defaultValue local */
	storage?: "local" | "session" | "cookie";
}

/** get stored item */
function getItem(key: string, options?: PersistOptions) {
	const cookie = document.cookie.split("; ").find(c => c.startsWith(key));
	switch (options?.storage) {
		case "cookie":
			return cookie?.split("=")[1];
		case "session":
			return sessionStorage.getItem(key);
		default:
			return localStorage.getItem(key);
	}
}

/** set item to persistant store */
function setItem(key: string, value: string, options?: PersistOptions) {
	switch (options?.storage) {
		case "cookie":
			document.cookie = `${key}=${value}; max-age=31536000; SameSite=Strict;`;
			if (options.sync ?? true) sessionStorage.setItem(key, value);
			return;
		case "session":
			sessionStorage.setItem(key, value);
			return;
		default:
			localStorage.setItem(key, value);
	}
}
/**
 * A plugin that persists and syncs RGS store between tabs.
 *
 * @returns A plugin that persists and syncs a value between tabs.
 */
export function persist<T>(options?: PersistOptions): Plugin<T> {
	return {
		init(key, _, mutate) {
			if (typeof window === "undefined") return;
			const persistedValue = getItem(key, options);
			const newVal = JSON.parse(persistedValue || "{}").val;
			if (newVal) mutate(newVal);

			if (options?.sync ?? true) {
				addEventListener("storage", e => {
					if (e.key === key && e.newValue) {
						const newVal = JSON.parse(e.newValue).val;
						if (newVal !== undefined) mutate(newVal);
					}
				});
			}
		},
		onChange(key, value) {
			if (typeof window !== "undefined") {
				setItem(key, JSON.stringify({ val: value }), options);
			}
		},
	};
}
