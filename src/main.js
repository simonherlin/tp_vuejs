import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store/store.js'
import router from "./router.js";
import VueX from 'vuex'

Vue.config.productionTip = false
Vue.use(VueX)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
