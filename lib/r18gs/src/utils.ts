import { useSyncExternalStore } from "react";

type Listener = () => void;
type Subscriber = (l: Listener) => () => void;

export type SetterArgType<T> = T | ((prevState: T) => T);
export type SetStateAction<T> = (value: SetterArgType<T>) => void;

/**
 * This is a hack to reduce lib size + readability + not encouraging direct access to globalThis
 */
const [VALUE, LISTENERS, SETTER, SUBSCRIBER] = [0, 1, 2, 3, 4];
type RGS = [unknown, Listener[], SetStateAction<unknown>, Subscriber];

declare global {
	// eslint-disable-next-line no-var -- var required for global declaration.
	var rgs: Record<string, RGS | undefined>;
}

const globalThisForBetterMinification = globalThis;
globalThisForBetterMinification.rgs = {};
export const globalRGS = globalThisForBetterMinification.rgs;

/** trigger all listeners */
function triggerListeners(rgs: RGS) {
	(rgs[LISTENERS] as Listener[]).forEach(listener => listener());
}

/** craete subscriber function to subscribe to the store. */
export function createSubcriber(key: string): Subscriber {
	return listener => {
		const rgs = globalRGS[key] as RGS;
		const listeners = rgs[LISTENERS] as Listener[];
		listeners.push(listener);
		return () => {
			rgs[LISTENERS] = listeners.filter(l => l !== listener);
		};
	};
}

/** setter function to set the state. */
export function createSetter<T>(key: string): SetStateAction<unknown> {
	return val => {
		const rgs = globalRGS[key] as RGS;
		rgs[VALUE] = val instanceof Function ? val(rgs[VALUE] as T) : val;
		triggerListeners(rgs);
	};
}

/** Extract coomon create hook logic to utils */
export function createHook<T>(key: string): [T, SetStateAction<T>] {
	const rgs = globalRGS[key] as RGS;
	/** Function to set the state. */
	const setRGState = rgs[SETTER] as SetStateAction<T>;
	/** Function to get snapshot of the state. */
	const getSnap = () => rgs[VALUE] as T;

	const val = useSyncExternalStore<T>(rgs[SUBSCRIBER] as Subscriber, getSnap);
	return [val, setRGState];
}

type Mutate<T> = (value?: T) => void;

export type Plugin<T> = {
	init?: (key: string, value: T | undefined, mutate: Mutate<T>) => void;
	onChange?: (key: string, value?: T) => void;
};

let allExtentionsInitialized = false;
/** Initialize extestions - wait for previous plugins's promise to be resolved before processing next */
async function initPlugins<T>(key: string, plugins: Plugin<T>[]) {
	const rgs = globalRGS[key] as RGS;
	/** Mutate function to update the value */
	const mutate: Mutate<T> = newValue => {
		rgs[VALUE] = newValue;
		triggerListeners(rgs);
	};
	for (const plugin of plugins) {
		/** Next plugins initializer will get the new value if updated by previous one */
		await plugin.init?.(key, rgs[VALUE] as T, mutate);
	}
	allExtentionsInitialized = true;
}

/** Initialize the named store when invoked for the first time. */
export function initWithPlugins<T>(key: string, value?: T, plugins: Plugin<T>[] = []) {
	/** setter function to set the state. */
	const setterWithPlugins: SetStateAction<unknown> = val => {
		/** Do not allow mutating the store before all extentions are initialized */
		if (!allExtentionsInitialized) return;
		const rgs = globalRGS[key] as RGS;
		rgs[VALUE] = val instanceof Function ? val(rgs[VALUE] as T) : val;
		triggerListeners(rgs);
		plugins.forEach(plugin => plugin.onChange?.(key, rgs[VALUE] as T));
	};

	globalRGS[key] = [value, [], setterWithPlugins, createSubcriber(key)];
	initPlugins(key, plugins);
}
