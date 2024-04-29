/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style -- as ! operator is forbidden by eslint*/
import { createHook, createSetter, createSubcriber, globalRGS } from "./utils";

import type { SetStateAction } from "./utils";

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
 * @param serverValue - Server value of the store.
 * @returns - A tuple (Ordered sequance of values) containing the state and a function to set the state.
 */
export default function useRGS<T>(key: string, value?: T, serverValue?: T): [T, SetStateAction<T>] {
	/** Initialize the named store when invoked for the first time. */
	if (!globalRGS[key])
		globalRGS[key] = [value, serverValue, [], createSetter(key), createSubcriber(key)];

	return createHook(key);
}
