<template>
  <div class="home">
    <v-toolbar>
      Home
    </v-toolbar>
    <v-form>
        <v-container>
          <router-link :to="`/myList/${id}`">Regarde ta liste ici</router-link>
        </v-container>
    </v-form>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data: () => ({
      id: 0
    }),
    mounted() {
      let listOfList = JSON.parse(window.localStorage.getItem('listOfList')) || []
      this.id = listOfList[listOfList.length - 1].id
    }
  }
</script>
