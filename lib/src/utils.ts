import { useSyncExternalStore } from "react";

type Listener = () => void;
type Subscriber = (l: Listener) => () => void;

export type SetterArgType<T> = T | ((prevState: T) => T);
export type SetStateAction<T> = (value: SetterArgType<T>) => void;
export type ValueType<T> = T | (() => T);

/**
 * This is a hack to reduce lib size + readability + not encouraging direct access to globalThis
 */
type RGS = { v: unknown; l: Listener[]; s: SetStateAction<unknown> | null; u: Subscriber };

declare global {
  // eslint-disable-next-line no-var -- var required for global declaration.
  // skipcq: JS-0102, JS-0239
  var rgs: Record<string, RGS | undefined>;
}

const globalThisForBetterMinification = globalThis;
globalThisForBetterMinification.rgs = {};
export const globalRGS = globalThisForBetterMinification.rgs;

/** trigger all listeners */
const triggerListeners = (rgs: RGS) => rgs.l.forEach(listener => listener());

/** craete subscriber function to subscribe to the store. */
export const createSubcriber = (key: string): Subscriber => {
  return listener => {
    const rgs = globalRGS[key] as RGS;
    (rgs.l as Listener[]).push(listener);
    return () => {
      rgs.l = (rgs.l as Listener[]).filter(l => l !== listener);
    };
  };
};

/** setter function to set the state. */
export const createSetter = <T>(key: string): SetStateAction<unknown> => {
  return val => {
    const rgs = globalRGS[key] as RGS;
    rgs.v = typeof val === "function" ? val(rgs.v as T) : val;
    (rgs.l as Listener[]).forEach(listener => listener());
  };
};

/** Extract coomon create hook logic to utils */
export const createHook = <T>(key: string): [T, SetStateAction<T>] => {
  const rgs = globalRGS[key] as RGS;
  /** This function is called by react to get the current stored value. */
  const getSnapshot = () => rgs.v as T;
  const val = useSyncExternalStore<T>(rgs.u as Subscriber, getSnapshot, getSnapshot);
  return [val, rgs.s as SetStateAction<T>];
};

type Mutate<T> = (value?: T) => void;

export type Plugin<T> = {
  init?: (key: string, value: T | undefined, mutate: Mutate<T>) => void;
  onChange?: (key: string, value?: T) => void;
};

let allExtentionsInitialized = false;
/** Initialize extestions - wait for previous plugins's promise to be resolved before processing next */
const initPlugins = async <T>(key: string, plugins: Plugin<T>[]) => {
  const rgs = globalRGS[key] as RGS;
  /** Mutate function to update the value */
  const mutate: Mutate<T> = newValue => {
    rgs.v = newValue;
    triggerListeners(rgs);
  };
  for (const plugin of plugins) {
    /** Next plugins initializer will get the new value if updated by previous one */
    await plugin.init?.(key, rgs.v as T, mutate);
  }
  allExtentionsInitialized = true;
};

/** Initialize the named store when invoked for the first time. */
export const initWithPlugins = <T>(
  key: string,
  value?: ValueType<T>,
  plugins: Plugin<T>[] = [],
  doNotInit = false,
) => {
  value = value instanceof Function ? value() : value;
  if (doNotInit) {
    /** You will not have access to the setter until initialized */
    globalRGS[key] = { v: value, l: [], s: null, u: createSubcriber(key) };
    return;
  }
  /** setter function to set the state. */
  const setterWithPlugins: SetStateAction<unknown> = val => {
    /** Do not allow mutating the store before all extentions are initialized */
    if (!allExtentionsInitialized) return;
    const rgs = globalRGS[key] as RGS;
    rgs.v = val instanceof Function ? val(rgs.v as T) : val;
    triggerListeners(rgs);
    plugins.forEach(plugin => plugin.onChange?.(key, rgs.v as T));
  };

  const rgs = globalRGS[key];
  if (rgs) {
    rgs.v = value;
    rgs.s = setterWithPlugins;
  } else globalRGS[key] = { v: value, l: [], s: setterWithPlugins, u: createSubcriber(key) };
  initPlugins(key, plugins);
};

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
 * @param doNotInit - Do not initialize the store. Useful when you want to initialize the store later. Note that the setter function is not available until the store is initialized.
 * @returns - A tuple (Ordered sequance of values) containing the state and a function to set the state.
 */
export const useRGSWithPlugins = <T>(
  key: string,
  value?: ValueType<T>,
  plugins?: Plugin<T>[],
  doNotInit = false,
): [T, SetStateAction<T>] => {
  if (!globalRGS[key]?.s) initWithPlugins(key, value, plugins, doNotInit);
  return createHook<T>(key);
};
