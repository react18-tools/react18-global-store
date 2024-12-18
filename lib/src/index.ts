/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style -- as ! operator is forbidden by eslint*/
import { createHook, globalRGS, triggerListeners } from "./utils";

import type { RGS, SetStateAction, ValueType } from "./utils";

export type { SetterArgType, SetStateAction, Plugin } from "./utils";

/**
 * A React hook for managing shared global state, similar to the `useState` hook.
 * This hook requires a unique key, which identifies the global store and allows state sharing across all client components.
 *
 * @example
 * ```tsx
 * const [state, setState] = useRGS<number>("counter", 1);
 * ```
 *
 * @param key - A unique key to identify the global store.
 * @param value - The initial value of the global state. Can be a value or a function returning a value.
 * @param includeRegExp - (Optional) A regular expression to specify which fields trigger updates.
 * @param excludeRegExp - (Optional) A regular expression to specify which fields should be excluded from updates.
 * @returns A tuple containing the current state and a function to update the state.
 *
 * @see [Learn More](https://r18gs.vercel.app/)
 */
const useRGS = <T>(
  key: string,
  value?: ValueType<T>,
  includeRegExp?: RegExp | null | 0,
  excludeRegExp?: RegExp,
): [T, SetStateAction<T>] => {
  /** Initialize the named store when invoked for the first time. */
  if (!globalRGS[key]) {
    globalRGS[key] = {
      v: value instanceof Function ? value() : value,
      l: [],
      s: val => {
        const rgs = globalRGS[key] as RGS;
        const oldV = rgs.v ?? {};
        rgs.v = val instanceof Function ? val(oldV) : val;
        triggerListeners(rgs, oldV, rgs.v);
      },
    };
  }

  return createHook<T>(key, includeRegExp, excludeRegExp);
};

export { useRGS };
