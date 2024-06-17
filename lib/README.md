# R18gs <img src="https://github.com/react18-tools/react18-global-store/blob/main/popper.png?raw=true" style="height: 40px"/>

[![test](https://github.com/react18-tools/react18-global-store/actions/workflows/test.yml/badge.svg)](https://github.com/react18-tools/react18-global-store/actions/workflows/test.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/aa896ec14c570f3bb274/maintainability)](https://codeclimate.com/github/react18-tools/react18-global-store/maintainability) [![codecov](https://codecov.io/gh/react18-tools/react18-global-store/graph/badge.svg)](https://codecov.io/gh/react18-tools/react18-global-store) [![Version](https://img.shields.io/npm/v/r18gs.svg?colorB=green)](https://www.npmjs.com/package/r18gs) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/r18gs.svg)](https://www.npmjs.com/package/r18gs) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/r18gs) [![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

R18gs is a comprehensive library designed to unlock the full potential of React 18 server components. It provides customizable loading animation components and a fullscreen loader container, seamlessly integrating with React and Next.js.

✅ Fully Treeshakable (import from `r18gs/client/loader-container`)

✅ Fully TypeScript Supported

✅ Leverages the power of React 18 Server components

✅ Compatible with all React 18 build systems/tools/frameworks

✅ Documented with [Typedoc](https://react18-tools.github.io/react18-global-store) ([Docs](https://react18-tools.github.io/react18-global-store))

✅ Examples for Next.js, Vite, and Remix

> <img src="https://github.com/react18-tools/react18-global-store/blob/main/popper.png?raw=true" style="height: 20px"/> Please consider starring [this repository](https://github.com/react18-tools/react18-global-store) and sharing it with your friends.

## Getting Started

### Installation

```bash
$ pnpm add r18gs
```

**_or_**

```bash
$ npm install r18gs
```

**_or_**

```bash
$ yarn add r18gs
```

## Want Lite Version? [![npm bundle size](https://img.shields.io/bundlephobia/minzip/r18gs-lite)](https://www.npmjs.com/package/r18gs-lite) [![Version](https://img.shields.io/npm/v/r18gs-lite.svg?colorB=green)](https://www.npmjs.com/package/r18gs-lite) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/r18gs-lite.svg)](https://www.npmjs.com/package/r18gs-lite)

```bash
$ pnpm add r18gs-lite
```

**or**

```bash
$ npm install r18gs-lite
```

**or**

```bash
$ yarn add r18gs-lite
```

> You need `r18gs` as a peer-dependency

### Import Styles

You can import styles globally or within specific components.

```css
/* globals.css */
@import "r18gs/dist";
```

```tsx
// layout.tsx
import "r18gs/dist/index.css";
```

For selective imports:

```css
/* globals.css */
@import "r18gs/dist/client"; /** required if you are using LoaderContainer */
@import "r18gs/dist/server/bars/bars1";
```

### Usage

Using loaders is straightforward.

```tsx
import { Bars1 } from "r18gs/dist/server/bars/bars1";

export default function MyComponent() {
  return someCondition ? <Bars1 /> : <>Something else...</>;
}
```

For detailed API and options, refer to [the API documentation](https://react18-tools.github.io/react18-global-store).

**Using LoaderContainer**

`LoaderContainer` is a fullscreen component. You can add this component directly in your layout and then use `useLoader` hook to toggle its visibility.

```tsx
// layout.tsx
<LoaderContainer />
	 ...
```

```tsx
// some other page or component
import { useLoader } from "r18gs/dist/hooks";

export default MyComponent() {
	const { setLoading } = useLoader();
	useCallback(()=>{
		setLoading(true);
		...do some work
		setLoading(false);
	}, [])
	...
}
```

## License

This library is licensed under the MPL-2.0 open-source license.

> <img src="https://github.com/react18-tools/react18-global-store/blob/main/popper.png?raw=true" style="height: 20px"/> Please consider enrolling in [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsoring](https://github.com/sponsors/mayank1513) our work.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
