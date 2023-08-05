<script>
	import LogIn from "./LogIn.svelte";
	import User from "./User.svelte";

    let logged;
</script>

<div class="main-container">
    {#if !logged}
        <LogIn bind:logged={logged}/>
    {:else}
        <User bind:logged={logged}/>
    {/if}
</div>

<style>
    .main-container {
        width: 100%;
    }
</style>
