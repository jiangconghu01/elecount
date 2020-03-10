import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/index",
    name: "index",
    component: Home,
    children: [
      {
        path: "/",
        redirect: "detail"
      },
      {
        path: "detail",
        name: "detail",
        component: () => import("../views/home.detail.vue")
      },
      {
        path: "property",
        name: "property",
        component: () => import("../views/home.property.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login.vue")
  }
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
