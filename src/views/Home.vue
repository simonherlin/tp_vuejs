<template>
  <div class="home">
    <v-toolbar>
      Home
    </v-toolbar>
    <v-form>
        <v-container v-if="listOfList.length > 0">
          <router-link :to="`/myList/${id}`">Regarde ta liste ici</router-link>
        </v-container>
    </v-form>
  </div>
</template>

<script>
import {basicList} from '@/basicList'

  export default {
    name: 'Home',
    data: () => ({
      listOfList: [],
      id: 0
    }),
    mounted() {
      this.listOfList = JSON.parse(window.localStorage.getItem('listOfList')) || basicList
      this.id = this.listOfList[this.listOfList.length - 1].id
    }
  }
</script>
