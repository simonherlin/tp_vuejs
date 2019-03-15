<template>
  <div id="app">
    <router-link to="/">home</router-link>
    <router-link to="/mesList">Mes Listes</router-link>
    <router-link to="/aPropos">A propos</router-link>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  methods: {
}
}
</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>
