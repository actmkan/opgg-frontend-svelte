import { gradeId } from "./store/auth";
import { get } from "svelte/store";

export const hasPermission = (grade) => {
    return grade <= get(gradeId);
};
