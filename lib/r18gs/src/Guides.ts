/**
# Quick Start

Welcome to the quick guide for using this library.

## Installation

To get started, you can install the package via your preferred package manager. Here are a few examples:

```bash
$ pnpm add r18gs
```

or

```bash
$ npm install r18gs
```

or

```bash
$ yarn add r18gs
```

## Usage

Utilize this hook similarly to the `useState` hook. However, ensure to pass a unique key, unique across the app, to identify and make this state accessible to all client components.

```tsx
const [state, setState] = useRGS<number>("counter", 1);
```

You can access the same state across all client-side components using a unique key.

> It's advisable to store your keys in a separate file to prevent typos and unnecessary conflicts.

### Example

```tsx
// constants/global-states.ts
export const COUNTER = "counter";
```

```tsx
// components/display.tsx
"use client";

import useRGS from "r18gs";
import { COUNTER } from "../constants/global-states";

export default function Display() {
	const [count] = useRGS<number>(COUNTER);
	return (
		<div>
			<h2>Client Component 2</h2>
			<b>{count}</b>
		</div>
	);
}
```

```tsx
// components/counter.tsx
"use client";

import useRGS from "r18gs";
import { COUNTER } from "../constants/global-states";

export default function Counter() {
	const [count, setCount] = useRGS(COUNTER, 0);
	return (
		<div>
			<h2>Client Component 1</h2>
			<input
				onChange={e => {
					setCount(parseInt(e.target.value.trim()));
				}}
				type="number"
				value={count}
			/>
		</div>
	);
}
```
 */
export const A_Quick_Start = "Quick Start";

/**
 * # Leveraging Plugins

Enhance your store's functionality by utilizing either the `create` function, `withPlugins` function, or the `useRGSWithPlugins` hook from `r18gs/dist/with-plugins`. This enables features such as storing to local storage, among others.

## Creating a Store with the `create` Function

```tsx
// store.ts
import { create } from "r18gs/dist/with-plugins";
import { persist } from "r18gs/dist/plugins"; // You can create your own plugin or import third-party plugins

export const useMyPersistentCounterStore = create<number>("persistent-counter", 0, [persist()]);
```

Now you can utilize `useMyPersistentCounterStore` similar to `useState` without specifying an initial value.

```tsx
// inside your component
const [persistedCount, setPersistedCount] = useMyPersistentCounterStore();
```

## Utilizing the `useRGSWithPlugins` Hook

This function is beneficial if your requirements dictate that your `key` and/or initial value will depend on some props, etc. Or for some other reason you want to initialize the store from within a component (You need to use some variables available inside the component).

```tsx
import { useRGSWithPlugins } from "r18gs/dist/with-plugin";

export function MyComponent(props: MyComponentProps) {
	const [state, setState] = useRGSWithPlugins(
		props.key,
		props.initialVal,
		props.plugins,
		props.doNotInit,
	);
	// ...
}
```

### `doNotInit`

In some cases, you may not want to initialize the store immediately. In such cases, you can pass the fourth argument (`doNotInit`) as `true`. The default value is false.

- When this argument is set to `true`, the store is created, but the setter function is set to null. Thus, you can access the initial value set by the first component that triggered this hook. However, it cannot be modified until the store is initialized, i.e., the hook is invoked by a component setting `doNotInit` to false (or skipping this argument).

**Use case**: When you need that the store be used in many components, however, it should be initialized in a particular component only.

## Creating a Custom Hook using the `withPlugins` Higher-Order Function

This is a utility function that will be very helpful when you want to use the `useRGSWithPlugins` hook with the same plugins in multiple components.

```ts
// custom hook file, e.g., store.ts
export const useMyRGS = withPlugins([plugin1, plugin2, ...]);
```

```tsx
export function MyComponent(props: MyComponentProps) {
	const [state, setState] = useMyRGS(props.key, props.initialVal, props.doNotInit);
	// ...
}
```

You can also create your own plugins. Refer to [Creating Plugins](./3.creating-plugins.md).
 */
export const B_Leveraging_Plugins = "Leveraging Plugins";
