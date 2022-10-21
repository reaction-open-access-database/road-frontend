<script lang="ts">
    import { useForm, validators, required, Hint, HintGroup } from "svelte-use-form";
    import { username } from "./validators";
    import { page_name, API_URL, user } from "../../stores.ts";

    page_name.set("Login");

    const form = useForm();

    async function login(e) {
        const form_data = new FormData(e.target);

        let data = {};
        for (let [key, value] of form_data.entries()) {
            data[key] = value;
        }

        let post_data = {password: data['password'], username: data['username']};

        const login_url = new URL('/login/', API_URL);
        const result = await fetch(login_url, {
            method: 'POST',
            body: JSON.stringify(post_data),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (result.ok) {
            let data = await result.json();
            data['username'] = post_data['username'];
            user.set(data);
            window.location.href = '/';
        } else {
            const error = await result.json();
            alert(JSON.stringify(error));
        }
    }
</script>

<main>
    <form use:form on:submit|preventDefault={login}>
        <div id="username-group">
            <label for="username">Username</label>
            <input type="text" name="username" id="username" use:validators={[required, username]} />
            <HintGroup for="username">
                <Hint on="required">This is a mandatory field</Hint>
                <Hint on="username">Invalid username</Hint>
            </HintGroup>
        </div>

        <div id="password-group">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" use:validators={[required]} />
            <Hint for="password" on="required">This is a mandatory field</Hint>
        </div>

        <button disabled={!$form.valid}>
            Login
        </button>
    </form>
</main>

<style>
    form {
        margin-top: 15vh;
        display: flex;
        flex-direction: column;

        align-items: center;
        justify-content: center;
    }

    #username-group, #password-group {
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
</style>