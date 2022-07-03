<script lang="ts">
    const options = [
        { name: "Add Reaction", href: "", image_path: "" },
        { name: "Getting Started", href: "", image_path: "" },
        { name: "Documentation", href: "", image_path: "" },
        { name: "Batch Edit", href: "", image_path: "" },
    ]
</script>

<div id="contribute">
    {#each options as option}
        <a href={option.href}>
            <div class="icon">
<!--                <img src={option.image_path} />-->
                <div class="circle"></div>
            </div>

            <p>{option.name}</p>
        </a>
    {/each}
</div>

<style>
    #contribute {
        display: flex;
        justify-content: space-between;
    }

    a {
        text-decoration: none;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .circle {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: var(--light-accent-color);
    }

    .icon {
        height: 100px;
        width: 100px;
    }
</style>