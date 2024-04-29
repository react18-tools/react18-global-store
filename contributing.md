# Contributing to r18gs

## Contribute

Once you have cloned the repo. `cd` to the repo directory and use following commands.

### Build

To build all apps and packages, run the following command:

```bash
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```bash
pnpm dev
```

### Run unit tests

To run unit tests, run the following command:

```bash
pnpm test
```

### Linting and formating

Before creating PR make sure lint is passing and also run formatter to properly format the code.

```bash
pnpm lint
```

and

```bash
pnpm format
```

You can also contribute by

1. Sponsoring
2. Check out discussion for providing any feedback or sugestions.
3. Report any issues or feature requests in issues tab

## What's inside?

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Library, Examples and Packages

This Turborepo includes the following packages/examples:

#### React18 Global Store library

You will find the core library code inside lib/r18gs

#### Examples (/examples)

- `nextjs`: a [Next.js](https://nextjs.org/) app
- `vite`: a [Vite.js](https://vitest.dev) app
- `remix`: a [Remix](https://remix.run/) app

#### Packages (/packages)

- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `shared-ui`: An internal UI package for shared UI code

Each package/example is 100% [TypeScript](https://www.typescriptlang.org/).

## Automatic file generation

- just run `yarn turbo gen` and follow the propts to auto generate your new component with test file and dependency linking
- follow best practices automatically

## Useful Links

Learn more about Turborepo and Next.js:

- [React and Next.js with TypeScript](https://www.udemy.com/course/react-and-next-js-with-typescript/?referralCode=7202184A1E57C3DCA8B2) - an interactive Next.js course.
- [The Game of Chess with Next.js, React and TypeScrypt](https://www.udemy.com/course/game-of-chess-with-nextjs-react-and-typescrypt/?referralCode=851A28F10B254A8523FE)
- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

> A quick tip: Delete all stale branches `git branch --merged main | grep -v '^[ *]*main$' | xargs git branch -d`

<hr />

### 🤩 Don't forger to star [this repo](https://github.com/mayank1513/react18-global-store)!

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
