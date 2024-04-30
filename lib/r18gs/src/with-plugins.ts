/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style -- as ! operator is forbidden by eslint*/
import { useRGSWithPlugins } from "./utils";

import type { Plugin, SetStateAction } from "./utils";

/**
 * Creates a store with plugins.
 * @example
 *
 * ```tsx
 * // in hook file, e.g., store.ts
 * export const useMyRGS = create<type>(key, value, plugins);
 *
 * // in component file
 * const [state, setState] = useMyRGS();
 * ```
 *
 * @param key - Unique key to identify the store.
 * @param value - Initial value of the store.
 * @param plugins - Plugins to be applied to the store.
 * @returns - A hook funciton that returns a tuple (Ordered sequance of values) containing the state and a function to set the state.
 */
export function create<T>(
	key: string,
	value?: T,
	plugins?: Plugin<T>[],
): () => [T, SetStateAction<T>] {
	return () => useRGSWithPlugins(key, value, plugins);
}

/**
 * Creates a hook similar to useRGS, but with plugins to be applied on first invocation.
 *
 * @param plugins - Plugins to be applied to the store.
 * @returns A hook that automatically initializes the store (if not already initialized) with the given plugins.
 */
export function withPlugins<T>(
	plugins?: Plugin<T>[],
): (key: string, value?: T, doNotInit?: boolean) => [T, SetStateAction<T>] {
	/**
	 * todo - this typedoc comments are not visible in IDE suggestions - fix this
	 * @param key - Unique key to identify the store.
	 * @param value - Initial value of the store.
	 * @param doNotInit - @defaultValue false - Do not initialize the store. Useful when you want to initialize the store later. Note that the setter function is not available until the store is initialized.
	 */
	return (key: string, value?: T, doNotInit = false) =>
		useRGSWithPlugins(key, value, plugins, doNotInit);
}

export { useRGSWithPlugins };
