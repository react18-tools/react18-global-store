import { create } from "r18gs/dist/with-plugins";
import { persist } from "r18gs/dist/plugins";

export const useMyPersistentCounterStore = create<number>("persistent-counter", 1, [persist()]);
