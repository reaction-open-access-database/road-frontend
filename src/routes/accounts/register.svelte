<script lang="ts">
    import { useForm } from "svelte-use-form";
    import { page_name, API_URL } from "../../stores.ts";
    import { format_error } from "./error_formatter";

    page_name.set("Register");

    const form = useForm();

    let error_string = '';

    let verification_email_sent = false;

    async function register(e) {
        const form_data = new FormData(e.target);

        let data = {};
        for (let [key, value] of form_data.entries()) {
            data[key] = value;
        }

        let post_data = {
            username: data['username'],
            email: data['email'],
            password1: data['password'],
            password2: data['password'],
        }

        const register_url = new URL('/register/', API_URL);
        const result = await fetch(register_url, {
            method: 'POST',
            body: JSON.stringify(post_data),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (result.ok) {
            verification_email_sent = true;
        } else {
            const error = await result.json();
            error_string = format_error(error);
        }
    }
</script>

<main>
    {#if verification_email_sent}
        <p>Please check your inbox for the verification email.</p>
    {:else}
        <form use:form on:submit|preventDefault={register}>
            <div id="username-group">
                <label for="username">Username</label>
                <input type="text" name="username" id="username" />
            </div>

            <div id="email-group">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" />
            </div>

            <div id="password-group">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" />
            </div>

            <p id="issue">{@html error_string}</p>

            <button>
                Register
            </button>
        </form>
    {/if}
</main>

<style>
    form {
        margin-top: 15vh;
        display: flex;
        flex-direction: column;

        align-items: center;
        justify-content: center;
    }

    #email-group, #username-group, #password-group {
        margin-bottom: 1.5em;
        margin-top: 0.25em;
    }

    form > button {
        font-size: 1em;
        background-color: var(--light-accent-color);
        color: var(--light-text-color);
        width: 4.5em;
        --height: 1.75em;
        height: var(--height);
        line-height: var(--height);
        border-radius: 0.25em;
    }

    main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    label {
        display: inline-block;
        width: 6em;
        text-align: right;
    }
</style>