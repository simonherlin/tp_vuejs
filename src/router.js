import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('./components/Layout.vue'),
      children: [
        {
          path: '',
          name: "home",
          component: () => import('./views/Home.vue')
        },
        {
          path: "lists",
          name: "lists",
          component: () => import("./views/Lists.vue")
        },
        {
            path: "about",
            name: "about",
            component: () => import("./views/About.vue")
        },
        {
            path: "myList/:id",
            name: "myList",
            component: () => import("./views/MyList.vue")
        }
      ]
    }
  ]
});
