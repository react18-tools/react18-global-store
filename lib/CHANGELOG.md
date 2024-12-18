# r18gs

## 3.0.0

### Major Changes

- 935e8f8: Selectors are now replaced by includeRegExp and excludeRegExp

## 2.1.0

### Minor Changes

- 22efc00: Add selectors - do not unnecessarily re-render the components.

### Patch Changes

- a05da0e: Improve type safety

## 2.0.1

### Patch Changes

- 087a5b9: Fix: fix resetting store

## 2.0.0

### Major Changes

- 05cad85: Remove default export.

## 2.0.0-alpha.0

### Major Changes

- e3e8e74: Remove default export.

## 1.1.3

### Patch Changes

- 6866e86: Simplify build - handle prototype pollution vulnerability.

## 1.1.3-refactor.0

### Patch Changes

- 07e654a: Simplify build - handle prototype pollution vulnerability.

## 1.1.2

### Patch Changes

- 46b9218: Test if Next.js app router works when useRGS is exported as named export
- cad3c42: Add minify plugin

## 1.1.2-alpha.1

### Patch Changes

- cad3c42: Add minify plugin

## 1.1.2-alpha.0

### Patch Changes

- 46b9218: Test if Next.js app router works when useRGS is exported as named export

## 1.1.1

### Patch Changes

- Refactor to reduce minzip size

## 1.1.0

### Minor Changes

- Support initializer function. Now you can initialize the RGStore by supplying a function in place of constant.

## 1.0.2

### Patch Changes

- Refactor to reduce minzip size

## 1.0.1

### Patch Changes

- Fix SSR build

## 1.0.0

### Major Changes

- Removed `serverValue` field as it should always be same as `value`. For more details please check out documentation of useSyncExternalStore hook provided by react.

### Minor Changes

- Added persist plugin to create state that is persisted and synced between browser contexts.
- Added `useRGSWithPlugins` hook to support extending the store functionality with plugins.

### Patch Changes

- Refactored to reduce bundle size and improve stability and reduce likelyhood of bugs.

## 0.2.0

### Minor Changes

- 81b9d3f: Make the library extensible with plugins

### Patch Changes

- Add Persist and Sync plugin

## 0.1.4

### Patch Changes

- Fix ESM builds

## 0.1.3

### Patch Changes

- Quick Fix the build setup and fix library issues.

## 0.1.2

### Patch Changes

- Improve minification

## 0.1.1

### Patch Changes

- Refactor without changing the exposed APIs. Some libraries using internal APIs may face temporary issues.

## 0.1.0

### Minor Changes

- Remove client side hooks. Now this store works well with server components as well. Though, server side use is tricky and not recommended yet.

## 0.0.5

### Patch Changes

- Fix Typescript error

## 0.0.4

### Patch Changes

- Fix getServerSnapshot errors on some projects.

## 0.0.3

### Patch Changes

- Fix exports; improve examples; Update README

## 0.0.2

### Patch Changes

- Export SetStateAction and SetterArgTypes for better documentation and ease of use for other TS projects.

## 0.0.1

### Patch Changes

- Fix publish setup
