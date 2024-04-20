/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style -- as ! operator is forbidden by eslint*/
import { useSyncExternalStore } from "react";

type Listener = () => void;
type SetterArgType<T> = T | ((prevState: T) => T);
type Subscriber = (l: Listener) => () => void;
export type SetStateAction<T> = (val: SetterArgType<T>) => void;

/**
 * This is a hack to reduce lib size + readability + not encouraging direct access to globalThis
 */
const [VALUE, LISTENERS, SETTER, SUBSCRIBER] = [0, 1, 2, 3];
type RGS = [unknown, Listener[], SetStateAction<unknown>, Subscriber];

declare global {
	// eslint-disable-next-line no-var -- var required for global declaration.
	var rgs: Record<string, RGS | undefined>;
}

globalThis.rgs = {};

function init<T>(key: string, value?: T) {
	const listeners: Listener[] = [];
	const setter: SetStateAction<T> = val => {
		const rgs = globalThis.rgs[key] as RGS;
		rgs[VALUE] = val instanceof Function ? val(rgs[VALUE] as T) : val;
		(rgs[LISTENERS] as Listener[]).forEach(listener => listener());
	};
	const subscriber: Subscriber = listener => {
		const rgs = globalThis.rgs[key] as RGS;
		const listeners = rgs[LISTENERS] as Listener[];
		listeners.push(listener);
		return () => {
			rgs[LISTENERS] = listeners.filter(l => l !== listener);
		};
	};
	globalThis.rgs[key] = [value, listeners, setter as SetStateAction<unknown>, subscriber];
}

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
export default function useRGS<T>(
	key: string,
	value?: T,
	serverValue?: T,
): [T, (val: SetterArgType<T>) => void] {
	if (!globalThis.rgs[key]) init(key, value);

	const rgs = globalThis.rgs[key] as RGS;

	const setRGState = rgs[SETTER] as SetStateAction<T>;
	const getSnap = () => (rgs[VALUE] ?? value) as T;
	const getServerSnap = () => (serverValue ?? value) as T;

	const val = useSyncExternalStore<T>(rgs[SUBSCRIBER] as Subscriber, getSnap, getServerSnap);
	return [val, setRGState];
}
