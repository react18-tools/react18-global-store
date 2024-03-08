import { useSyncExternalStore } from "react";

interface React18GlobalStore {
	l: (() => void)[] /** listeners */;
	v: unknown /** value */;
}

export type SetterArgType<T> = T | ((prevState: T) => T);

export type SetStateAction<T> = (val: SetterArgType<T>) => void;

declare global {
	// eslint-disable-next-line no-var -- var required for global declaration.
	var r: Record<string, React18GlobalStore | undefined>; // rgs global store
	// eslint-disable-next-line no-var -- var required for global declaration.
	var s: Record<string, SetStateAction<unknown> | undefined>; // setters
	// eslint-disable-next-line no-var -- var required for global declaration.
	var t: Record<string, ((listener: () => void) => () => void) | undefined>; // subscribers
}

globalThis.r = {};
globalThis.s = {};
globalThis.t = {};

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

export interface Extension<T> {
	/** called with default value provided before the store value is initialized */
	beforeInit?: (key: string, value: T | undefined, setterFunc: SetStateAction<T>) => T | undefined;
	/** called with the current value of the store. */
	afterInit?: (key: string, value?: T) => void;
	/** called with the current value of the store - transform the value if needed */
	beforeUpdate?: (key: string, value: SetterArgType<T>) => SetterArgType<T>;
	/** called with the current value of the store */
	afterUpdate?: (key: string, value: T) => void;
}

function initialize<T>(key: string, value?: T, extensions?: Extension<T>[]) {
	// add setter function for a given key
	const setterFunc: SetStateAction<T> = valueOrFunc => {
		const rgs = globalThis.r[key] as React18GlobalStore;

		/** Apply beforeUpdate */
		let v1 = valueOrFunc;
		for (const extension of extensions ?? [])
			if (extension.beforeUpdate) v1 = extension.beforeUpdate(key, v1);

		/** update the store */
		rgs.v = v1 instanceof Function ? v1(rgs.v as T) : v1;
		/** call listeners to activate react's reactivity system */
		for (const listener of rgs.l) listener();

		/** afterUpdate - executed sequentially for all the extensions added */
		for (const extension of extensions ?? []) extension.afterUpdate?.(key, rgs.v as T);
	};

	globalThis.s[key] = setterFunc as SetStateAction<unknown>;
	// add subsciber function for a given key
	globalThis.t[key] = (listener: () => void) => {
		let v = value;

		/** beforeInit - executed sequentially for all the extensions added */
		for (const extension of extensions ?? [])
			if (extension.beforeInit) v = extension.beforeInit(key, v, setterFunc);

		globalThis.r[key] = { l: [], v };

		/** afterInit - executed sequentially for all the extensions added */
		for (const extension of extensions ?? []) extension.afterInit?.(key, v);

		const rgs = globalThis.r[key] as React18GlobalStore;
		rgs.l.push(listener);
		return () => {
			rgs.l = rgs.l.filter(l => l !== listener);
		};
	};
}

export default function useRGS<T>(
	key: string,
	value?: T,
	extensions?: Extension<T>[],
): [T, (val: SetterArgType<T>) => void] {
	if (!globalThis.t[key]) initialize(key, value, extensions);

	const subscribe = globalThis.t[key] as (listener: () => void) => () => void;

	const setRGState = globalThis.s[key] as SetStateAction<T>;

	const getSnapshot = () => (globalThis.r[key]?.v ?? value) as T;

	const val = useSyncExternalStore<T>(subscribe, getSnapshot, getSnapshot);
	return [val, setRGState];
}
