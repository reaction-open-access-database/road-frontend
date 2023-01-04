<script lang="ts">
    import { useForm } from "svelte-use-form";
    import { page_name, API_URL, user } from "../../stores";
    import { format_error } from "./error_formatter";

    page_name.set("Login");

    const form = useForm();

    let error_string = '';

    async function login(e) {
        const form_data = new FormData(e.target);

        let post_data = {
            password: form_data.get('password'),
            username: form_data.get('username')
        };

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
            data['username'] = post_data.username;
            user.set(data);
            window.location.href = '/';
        } else {
            const error = await result.json();
            error_string = format_error(error);
        }
    }
</script>

<main>
    <form use:form on:submit|preventDefault={login}>
        <div id="username-group">
            <label for="username">Username</label>
            <input type="text" name="username" id="username" />
        </div>

        <div id="password-group">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" />
        </div>

        <p id="issue">{@html error_string}</p>

        <button>
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

    label {
        display: inline-block;
        width: 6em;
        text-align: right;
    }
</style>