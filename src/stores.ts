import { writable } from "svelte/store";
import { browser } from "$app/env";

export const page_name = writable("");
export const API_URL = import.meta.env.VITE_API_URL;

const initial_user = browser ? localStorage.getItem("user") : null;

export const user = writable(initial_user === null || initial_user === '' ? null : JSON.parse(initial_user));
user.subscribe(value => {
    if (browser) {
        localStorage.setItem('user', value === null ? "" : JSON.stringify(value));
    }
})