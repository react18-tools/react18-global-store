/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style -- as ! operator is forbidden by eslint*/
import { createHook, globalRGS, initWithPlugins } from "./utils";

import type { Plugin, SetStateAction } from "./utils";

/**
 * Use this hook similar to `useState` hook.
 * The difference is that you need to pass a
 * unique key - unique across the app to make
 * this state accessible to all client components.
 *
 * @example
 * ```tsx
 * const [state, setState] = useRGS<number>("counter", 1);
 * ```
 *
 * @param key - Unique key to identify the store.
 * @param value - Initial value of the store.
 * @param plugins - Plugins to be applied to the store.
 * @returns - A tuple (Ordered sequance of values) containing the state and a function to set the state.
 */
export function useRGSWithPlugins<T>(
	key: string,
	value?: T,
	plugins?: Plugin<T>[],
): [T, SetStateAction<T>] {
	if (!globalRGS[key]) initWithPlugins(key, value, plugins);
	return createHook<T>(key);
}

/**
 * Use this hook similar to `useState` hook.
 * The difference is that you need to pass a
 * unique key - unique across the app to make
 * this state accessible to all client components.
 *
 * @example
 * ```tsx
 * // in hook file
 * export const useRGS = create<type>(key, value, plugins);
 *
 * // in component file
 * const [state, setState] = useRGS();
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
