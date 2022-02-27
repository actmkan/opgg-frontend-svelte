<script lang="ts">
    import Router from "svelte-spa-router";
    import routes from "./routes";
    import Header from "./components/layout/Header.svelte";
    import Footer from "./components/layout/Footer.svelte";
</script>

<style>
    main {
        padding-top: 56px;
    }
</style>

<Header />
<main>
    <Router routes={routes} />
</main>
<Footer />
