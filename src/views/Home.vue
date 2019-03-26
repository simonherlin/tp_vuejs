<template>
  <div class="home">
    <v-toolbar>
      Home
    </v-toolbar>
    <v-form>
        <v-container v-if="length > 0">
          <router-link :to="`/myList/${id}`">Regarde ta liste ici</router-link>
        </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    name: 'Home',
    data: () => ({
      id: 0
    }),
    computed: {
      ...mapGetters({
        getId: 'getLastId',
        length: 'getLength'
      })
    },
    mounted() {
      if (this.getId < 0) {
        this.id = this.length - 1
      }
      else {
        this.id = this.getId
      }
    },
    beforeCreate () {
		  this.$store.commit('initialiseStore')
	  }
  }
</script>
