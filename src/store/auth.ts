import { writable } from "svelte-local-storage-store";

export const authToken = writable("authToken", null);
export const userNickname = writable("userNickname", null);
