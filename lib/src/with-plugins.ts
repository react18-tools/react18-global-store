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
 * @returns - A hook function that returns a tuple (Ordered sequence of values) containing the state and a function to set the state.
 */
export const create = <T>(
	key: string,
	value?: T,
	plugins?: Plugin<T>[],
): (() => [T, SetStateAction<T>]) => {
	return () => useRGSWithPlugins(key, value, plugins);
};

/**
 * Creates a hook similar to useRGS, but with plugins to be applied on first invocation.
 *
 * @param plugins - Plugins to be applied to the store.
 * @returns A hook that automatically initializes the store (if not already initialized) with the given plugins.
 */
export const withPlugins = <T>(
	plugins: Plugin<T>[],
): (<U = T>(key: string, value?: U, doNotInit?: boolean) => [U, SetStateAction<U>]) => {
	/**
	 * Creates a hook similar to useRGS, with plugins applied on first invocation.
	 *
	 * @param key - Unique key to identify the store.
	 * @param value - Initial value of the store.
	 * @param doNotInit - If true, the store won't be initialized immediately. Defaults to false. Useful when you want to initialize the store later. Note that the setter function is not available until the store is initialized.
	 * @returns A tuple containing the state value and its setter function.
	 */
	const hookWithPlugins = <U = T>(
		key: string,
		value?: U,
		doNotInit = false,
	): [U, SetStateAction<U>] =>
		useRGSWithPlugins(key, value, plugins as unknown as Plugin<U>[], doNotInit);

	return hookWithPlugins;
};

export { useRGSWithPlugins };
