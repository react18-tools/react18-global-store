import { useSyncExternalStore } from "react";

type Listener = () => void;
type Subscriber = (l: Listener) => () => void;

export type SetterArgType<T> = T | ((prevState: T) => T);
export type SetStateAction<T> = (value: SetterArgType<T>) => void;

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
	/** Function to get server snapshot. Returns server value is provided else the default value. */
	const getServerSnap = () => (rgs[SERVER_VALUE] ?? rgs[VALUE]) as T;

	const val = useSyncExternalStore<T>(rgs[SUBSCRIBER] as Subscriber, getSnap, getServerSnap);
	return [val, setRGState];
}

type Mutate<T> = (value?: T, serverValue?: T) => void;

export type Plugin<T> = {
	init?: (key: string, value: T | undefined, serverValue: T | undefined, mutate: Mutate<T>) => void;
	onChange?: (key: string, value?: T, serverValue?: T) => void;
};

let allExtentionsInitialized = false;
/** Initialize extestions - wait for previous plugins's promise to be resolved before processing next */
async function initPlugins<T>(key: string, plugins: Plugin<T>[]) {
	const rgs = globalRGS[key] as RGS;
	/** Mutate function to update the value and server value */
	const mutate: Mutate<T> = (newValue, newServerValue) => {
		[rgs[VALUE], rgs[SERVER_VALUE]] = [newValue, newServerValue];
	};
	for (const ext of plugins) {
		/** Next plugins initializer will get the new value if updated by previous one */
		await ext.init?.(key, rgs[VALUE] as T, rgs[SERVER_VALUE] as T, mutate);
	}
	triggerListeners(rgs);
	allExtentionsInitialized = true;
}

/** Initialize the named store when invoked for the first time. */
export function initWithPlugins<T>(
	key: string,
	value?: T,
	serverValue?: T,
	plugins: Plugin<T>[] = [],
) {
	const listeners: Listener[] = [];
	/** setter function to set the state. */
	const setterWithPlugins: SetStateAction<unknown> = val => {
		/** Do not allow mutating the store before all extentions are initialized */
		if (!allExtentionsInitialized) return;
		createSetter(key)(val);
		plugins.forEach(plugin => plugin.onChange?.(key, rgs[VALUE] as T, rgs[SERVER_VALUE] as T));
	};

	globalRGS[key] = [value, serverValue, listeners, setterWithPlugins, createSubcriber(key)];
	initPlugins(key, plugins);
}
