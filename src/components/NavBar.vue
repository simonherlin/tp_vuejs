<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link to="/" tag="button" class="btn btn-secondary">
            <i class="material-icons">home</i>
        </router-link>
        <router-link to="/Lists" tag="button" class="btn btn-secondary">
            <i class="material-icons">list_alt</i>
        </router-link>
        <router-link to="/About" tag="button" class="btn btn-secondary">
            <i class="material-icons">info</i>
        </router-link>
    </nav>    
</template>

<script>

export default {
    name: 'NavBar'
}
</script>

<style>
</style>
