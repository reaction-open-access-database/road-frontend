<script lang="ts">
    import SearchTree from "./searchtree/SearchTree.svelte";
    import {API_URL} from "../../stores";
    import {InputType, Operation, operator_names } from "../../types";
    import type { SearchOption } from "../../types";

    const search_options: SearchOption[] = [
        {
            name: 'Structure',
            operators: [Operation.Equal],
            input: InputType.Structure,
            get_query: (selected_operator, input) => {
                return {value: {type: 'smiles', value: input}, type: 'structure', op: operator_names[selected_operator]};
            },
        },
        {
            name: 'Molecular Weight',
            operators: [Operation.Equal, Operation.GreaterThan, Operation.LessThan, Operation.GreaterThanOrEqual, Operation.LessThanOrEqual],
            input: InputType.Float,
            get_query: (selected_operator: Operation, input) => {
                const op = operator_names[selected_operator];
                let molecular_weight = {value: input.value, type: op};
                if (selected_operator === Operation.Equal) {
                    molecular_weight.tolerance = input.tolerance;
                }
                return {molecular_weight: molecular_weight, type: 'molecularweight'};
            },
        },
        {
            name: 'Molecular Formula',
            operators: [Operation.Equal],
            input: InputType.String,
            get_query: (selected_operator, input) => {
                return {type: 'molecularformula', atoms: parse_string_molecular_formula(input)}
            },
        },
    ]

    let search_tree: SearchTree;

    export async function search() : Promise<any> {
        const query = await search_tree.create_query();
        const string_query = JSON.stringify(query);

        if (string_query == 'null') {
            return undefined;
        }

        const molecule_query_url = new URL('/molecule-query/?', API_URL) + new URLSearchParams({query: string_query});
        const response = await fetch(molecule_query_url);
        const json = await response.json();
        console.log(json);

        return json;
    }

    function parse_string_molecular_formula(molecular_formula: string) {
        const regex = /([A-Z][a-z]?)(\d*)/g;
        let match;
        let parsed_molecular_formula = {};
        while (match = regex.exec(molecular_formula)) {
            const element = match[1];
            const count = match[2] ? parseInt(match[2]) : 1;
            parsed_molecular_formula[element] = count;
        }
        return parsed_molecular_formula;
    }
</script>

<SearchTree search_options={search_options} bind:this={search_tree}></SearchTree>

<style>

</style>