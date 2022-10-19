import { email } from "svelte-use-form";

export function email_or_username(value: string) {
    let email_error = email(value);
    let username_error = username(value);
    if (email_error == null) {
        return null;
    }
    if (username_error == null) {
        return null;
    }
    return {email_or_username: {email_error, username_error}};
}

const USERNAME_MIN_LENGTH = 1;
const USERNAME_MAX_LENGTH = 150;

export function username(value: string) {
    if (value.length < USERNAME_MIN_LENGTH) {
        return {username_min_length: USERNAME_MIN_LENGTH};
    }
    if (value.length > USERNAME_MAX_LENGTH) {
        return {username_max_length: USERNAME_MAX_LENGTH};
    }

    if (/[a-zA-Z]*/.test(value)) {
        return null;
    }
    return {username_characters: {}};
}