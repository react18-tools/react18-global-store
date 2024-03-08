/* eslint-disable @typescript-eslint/no-unnecessary-condition -- localStorage is not defined on server side */

import { type Extension, type SetStateAction } from "../use-rgs";

export default function persistExtension<T>(sync?: boolean): Extension<T> {
	return {
		beforeInit(key: string, val: T | undefined, setterFunc: SetStateAction<T>) {
			const str = localStorage?.getItem(key);
			// Add storage event listener
			if (sync)
				window?.addEventListener("storage", (e: StorageEvent) => {
					if (e.key === key && e.newValue) {
						const newVal = (JSON.parse(e.newValue) as { val: Partial<T> }).val;
						setterFunc(state => ({ ...state, ...newVal }));
					}
				});
			if (!str) return val;
			return (JSON.parse(str) as { val: T }).val as T | undefined;
		},
		afterUpdate(key, val) {
			if (val !== undefined) localStorage?.setItem(key, JSON.stringify({ val }));
		},
	};
}
