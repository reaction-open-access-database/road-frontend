import {writable} from "svelte/store";

export const page_name = writable("");
export const API_URL = import.meta.env.VITE_API_URL;