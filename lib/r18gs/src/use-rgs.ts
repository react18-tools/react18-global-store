/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style -- as ! operator is forbidden by eslint*/
import { useSyncExternalStore } from "react";

type Listener = () => void;
type Subscriber = (l: Listener) => () => void;
type Mutate<T> = (value?: T, serverValue?: T) => void;

export type SetterArgType<T> = T | ((prevState: T) => T);
export type SetStateAction<T> = (value: SetterArgType<T>) => void;
export type Extension<T> = {
	init?: (key: string, value: T | undefined, serverValue: T | undefined, mutate: Mutate<T>) => void;
	onChange?: (key: string, value?: T, serverValue?: T) => void;
};

/**
 * This is a hack to reduce lib size + readability + not encouraging direct access to globalThis
 */
const [VALUE, SERVER_VALUE, LISTENERS, SETTER, SUBSCRIBER] = [0, 1, 2, 3, 4];
type RGS = [unknown, unknown, Listener[], SetStateAction<unknown>, Subscriber];

declare global {
	// eslint-disable-next-line no-var -- var required for global declaration.
	var rgs: Record<string, RGS | undefined>;
}

const globalThisForBetterMinification = globalThis;
globalThisForBetterMinification.rgs = {};
const globalRGS = globalThisForBetterMinification.rgs;

function triggerListeners(rgs: RGS) {
	(rgs[LISTENERS] as Listener[]).forEach(listener => listener());
}

let allExtentionsInitialized = false;
/** Initialize extestions - wait for previous extension's promise to be resolved before processing next */
async function initExtentions<T>(key: string, extensions: Extension<T>[]) {
	const rgs = globalRGS[key] as RGS;
	const mutate: Mutate<T> = (newValue, newServerValue) => {
		[rgs[VALUE], rgs[SERVER_VALUE]] = [newValue, newServerValue];
	};
	for (const ext of extensions) {
		/** Next extension initializer will get the new value if updated by previous one */
		await ext.init?.(key, rgs[VALUE] as T, rgs[SERVER_VALUE] as T, mutate);
	}
	triggerListeners(rgs);
	allExtentionsInitialized = true;
}

/** Initialize the named store when invoked for the first time. */
function init<T>(key: string, value?: T, serverValue?: T, extensions: Extension<T>[] = []) {
	const listeners: Listener[] = [];
	/** setter function to set the state. */
	const setter: SetStateAction<T> = val => {
		/** Do not allow mutating the store before all extentions are initialized */
		if (!allExtentionsInitialized) return;
		const rgs = globalRGS[key] as RGS;
		rgs[VALUE] = val instanceof Function ? val(rgs[VALUE] as T) : val;
		triggerListeners(rgs);
		extensions.forEach(ext => ext.onChange?.(key, rgs[VALUE] as T, rgs[SERVER_VALUE] as T));
	};
	/** subscriber function to subscribe to the store. */
	const subscriber: Subscriber = listener => {
		const rgs = globalRGS[key] as RGS;
		const listeners = rgs[LISTENERS] as Listener[];
		listeners.push(listener);
		return () => {
			rgs[LISTENERS] = listeners.filter(l => l !== listener);
		};
	};
	globalRGS[key] = [value, serverValue, listeners, setter as SetStateAction<unknown>, subscriber];
	initExtentions(key, extensions);
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
 *
 * @param key - Unique key to identify the store.
 * @param value - Initial value of the store.
 * @param serverValue - Server value of the store.
 * @returns - A tuple (Ordered sequance of values) containing the state and a function to set the state.
 */
export default function useRGS<T>(
	key: string,
	value?: T,
	serverValue?: T,
	extensions?: Extension<T>[],
): [T, SetStateAction<T>] {
	if (!globalRGS[key]) init(key, value, serverValue, extensions);

	const rgs = globalRGS[key] as RGS;

	/** Function to set the state. */
	const setRGState = rgs[SETTER] as SetStateAction<T>;
	/** Function to get snapshot of the state. */
	const getSnap = () => rgs[VALUE] as T;
	/** Function to get server snapshot. Returns server value is provided else the default value. */
	const getServerSnap = () => (rgs[SERVER_VALUE] ?? rgs[VALUE]) as T;

	const val = useSyncExternalStore<T>(rgs[SUBSCRIBER] as Subscriber, getSnap, getServerSnap);
	return [val, setRGState];
}
