import { useCallback, useSyncExternalStore } from "react";

interface React18GlobalStore {
	listeners: (() => void)[];
	value: unknown;
}

export type SetterArgType<T> = T | ((prevState: T) => T);

export type SetStateAction<T> = (val: SetterArgType<T>) => void;

declare global {
	// eslint-disable-next-line no-var -- var required for global declaration.
	var rgs: Record<string, React18GlobalStore>;
}

globalThis.rgs = {};

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
	const setRGState = useCallback(
		(val: SetterArgType<T>) => {
			const rgs = globalThis.rgs[key] as React18GlobalStore;
			rgs.value = val instanceof Function ? val(rgs.value as T) : val;
			for (const listener of rgs.listeners) listener();
		},
		[key],
	);
	const subscribe = useCallback(
		(listener: () => void) => {
			if (!globalThis.rgs[key]) globalThis.rgs[key] = { listeners: [], value };
			const rgs = globalThis.rgs[key] as React18GlobalStore;
			rgs.listeners.push(listener);
			return () => {
				rgs.listeners = rgs.listeners.filter(l => l !== listener);
			};
		},
		[key, value],
	);

	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- temp fix
	const getSnapshot = () => (globalThis.rgs[key]?.value ?? value) as T;

	const val = useSyncExternalStore<T>(subscribe, getSnapshot);
	return [val, setRGState];
}
