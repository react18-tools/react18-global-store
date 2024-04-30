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
