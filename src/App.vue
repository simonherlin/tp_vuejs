<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>

import navBar from './components/NavBar.vue'
export default {
  name: 'app',
  components: {
    navBar
  }
}
</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>
