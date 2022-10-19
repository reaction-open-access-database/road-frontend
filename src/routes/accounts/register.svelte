<script lang="ts">
    import { useForm, validators, required, Hint, HintGroup, email } from "svelte-use-form";
    import { username } from "./validators";
    import { page_name, API_URL } from "../../stores.ts";

    page_name.set("Register");

    const form = useForm();

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

        console.log(post_data);

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
            console.log(error);
            console.log(JSON.stringify(error));
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
                <input type="text" name="username" id="username" use:validators={[required, username]} />
                <HintGroup for="username">
                    <Hint on="required">This is a mandatory field</Hint>
                    <Hint on="username">Invalid username</Hint>
                </HintGroup>
            </div>

            <div id="email-group">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" use:validators={[required, email]} />
                <HintGroup for="email">
                    <Hint on="required">This is a mandatory field</Hint>
                    <Hint on="email">Invalid email</Hint>
                </HintGroup>
            </div>

            <div id="password-group">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" use:validators={[required]} />
                <Hint for="password" on="required">This is a mandatory field</Hint>
            </div>

            <button disabled={!$form.valid}>
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
</style>