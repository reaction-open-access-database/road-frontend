<script lang="ts">
    import { useForm } from "svelte-use-form";
    import { page_name, API_URL } from "../../stores";
    import { format_error } from "./error_formatter";

    page_name.set("Register");

    const form = useForm();

    let error_string = '';

    let verification_email_sent = false;

    async function register(e: SubmitEvent) {
        const form_data = new FormData(e.target as HTMLFormElement);

        let post_data = {
            username: form_data.get('username'),
            email: form_data.get('email'),
            password1: form_data.get('password'),
            password2: form_data.get('password'),
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