/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style -- as ! operator is forbidden by eslint*/
import { useSyncExternalStore } from "react";

interface React18GlobalStore {
	listeners: (() => void)[];
	value: unknown;
}

export type SetterArgType<T> = T | ((prevState: T) => T);

export type SetStateAction<T> = (val: SetterArgType<T>) => void;

declare global {
	// eslint-disable-next-line no-var -- var required for global declaration.
	var rgs: Record<string, React18GlobalStore | undefined>;
	// eslint-disable-next-line no-var -- var required for global declaration.
	var setters: Record<string, SetStateAction<unknown> | undefined>;
	// eslint-disable-next-line no-var -- var required for global declaration.
	var subscribers: Record<string, ((listener: () => void) => () => void) | undefined>;
}

globalThis.rgs = {};
globalThis.setters = {};
globalThis.subscribers = {};

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
 */
export default function useRGS<T>(key: string, value?: T): [T, (val: SetterArgType<T>) => void] {
	if (!globalThis.subscribers[key]) {
		globalThis.subscribers[key] = (listener: () => void) => {
			if (!globalThis.rgs[key]) {
				/** opportunity to add initializer */
				globalThis.rgs[key] = { listeners: [], value };
			}
			const rgs = globalThis.rgs[key] as React18GlobalStore;
			rgs.listeners.push(listener);
			return () => {
				rgs.listeners = rgs.listeners.filter(l => l !== listener);
			};
		};
	}
	const subscribe = globalThis.subscribers[key] as (listener: () => void) => () => void;

	if (!globalThis.setters[key]) {
		globalThis.setters[key] = val => {
			const rgs = globalThis.rgs[key] as React18GlobalStore;
			rgs.value = val instanceof Function ? val(rgs.value as T) : val;
			/** opportunity to add custom listener */
			for (const listener of rgs.listeners) listener();
		};
	}
	const setRGState = globalThis.setters[key] as SetStateAction<T>;

	const getSnapshot = () => (globalThis.rgs[key]?.value ?? value) as T;

	const val = useSyncExternalStore<T>(subscribe, getSnapshot, getSnapshot);
	return [val, setRGState];
}
