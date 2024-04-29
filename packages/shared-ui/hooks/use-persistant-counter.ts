import { create } from "r18gs/dist/with-plugins";
import persistNSyncPlugin from "r18gs/dist/plugins/persist-and-sync";

export const useMyPersistantCounterStore = create<number>("persistant-counter", 1, 1, [
	persistNSyncPlugin(),
]);
