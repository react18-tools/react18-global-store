You can enhance the functionality of the store by utilizing either the `create` function or the `useRGSWithPlugins` hook from `r18gs/dist/with-plugins`, enabling features such as storing to local storage, among others.

```tsx
// store.ts
import { create } from "r18gs/dist/with-plugins";
import { persist } from "r18gs/dist/plugins"; /** You can create your own plugin or import third party plugin */

export const useMyPersistentCounterStore = create<number>("persistent-counter", 0, [persist()]);
```

Now you can use `useMyPersistentCounterStore` similar to `useState` without any initial value.
