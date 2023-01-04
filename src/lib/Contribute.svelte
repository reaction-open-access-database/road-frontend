<script lang="ts">
    const options = [
        {
            name: "Add Molecule",
            href: "/create-molecule",
            image_path: "/plus.svg",
            alt: "white plus sign",
        },
        {
            name: "View Molecules",
            href: "/molecules",
            image_path: "/document.svg",
            alt: "white icon of a document",
        },
    ]
</script>

<div id="contribute">
    {#each options as option}
        <a href={option.href}>
            <div class="icon">
                <div class="circle"></div>
                <img src={option.image_path} alt={option.alt} />
            </div>

            <p>{option.name}</p>
        </a>
    {/each}
</div>

<style>
    #contribute {
        display: flex;
        justify-content: space-around;

        margin-top: 10vh;
    }

    a {
        text-decoration: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--dark-text-color);
        margin: 0 3vw;
    }

    .circle {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: var(--light-accent-color);
    }

    .icon {
        position: relative;
        height: 100px;
        width: 100px;
    }

    .icon > * {
        position: absolute;
    }

    .icon > img {
        object-fit: contain;

        --size: 70%;

        width: var(--size);
        height: var(--size);
        top: calc(50% - var(--size) / 2);
        left: calc(50% - var(--size) / 2);
    }
</style>