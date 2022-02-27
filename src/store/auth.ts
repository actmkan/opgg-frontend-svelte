import { writable } from "svelte-local-storage-store";

export const authToken = writable("authToken", null);
export const userNickname = writable("userNickname", null);
export const userId = writable("userId", null);
export const gradeId = writable("gradeId", null);
