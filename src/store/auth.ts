import { writable } from "svelte-local-storage-store";

export const authToken = writable("authToken", null);
