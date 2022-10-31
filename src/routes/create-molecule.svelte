<script lang="ts">
    import {API_URL, page_name, user} from '../stores';
    import Input from "../lib/searchbox/searchtree/Input.svelte";
    import { format_error } from "./accounts/error_formatter";

    page_name.set("Create Molecule");

    let input;
    let name;

    let error = '';

    async function create_molecule() {
        const molecule = await input.get_value();

        if ($user == null) {
            error = "You must be logged in to create a molecule.";
            return;
        }

        const post_data = {
            name: name,
            smiles: molecule
        };

        console.log(post_data);

        const molecule_url = new URL('/molecules/', API_URL);
        const result = await fetch(molecule_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + $user['key']
            },
            body: JSON.stringify(post_data)
        });

        const json = await result.json();
        if (result.ok) {
            window.location.href = `/molecules?molecule=${json.id}`;
        } else {
            error = format_error(json);
        }
    }
</script>

<main>
    <Input type="structure" operator="=" bind:this={input} />
    <div id="other-information">
        <input type="text" placeholder="Name" bind:value={name} />
        <button on:click={create_molecule} id="create-button">Create</button>
        <p id="error">{@html error}</p>
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    #other-information {
        flex-grow: 1;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;

        height: 30vh;
    }

    #create-button {
        background-color: var(--dark-accent-color);
        color: var(--light-text-color);

        font-size: 1.4em;
        font-weight: bold;

        padding: 0.5em 1em;

        border-radius: 0.3em;
    }
</style>