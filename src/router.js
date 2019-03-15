import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: () => import("./components/Home.vue"),
    },
    {
        path: "/mesList",
        name: "mesList",
        component: () => import("./components/MesListe.vue")
    },
    {
        path: "/aPropos",
        name: "aPropose",
        component: () => import("./components/APropos.vue")
    },
    {
        path: "/maList/:id",
        name: "maList",
        component: () => import("./components/MaListe.vue")
    }
  ]
});
