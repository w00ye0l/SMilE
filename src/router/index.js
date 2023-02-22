import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/Entrance/first",
    name: "FirstPage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Entrance/FirstPage.vue"),
  },
  {
    path: "/Entrance/second",
    name: "SecondPage",
    component: () =>
      import(/* webpackChunkName: "a" */ "../views/Entrance/SecondPage.vue"),
  },
  {
    path: "/Entrance/third",
    name: "ThirdPage",
    component: () =>
      import(/* webpackChunkName: "a" */ "../views/Entrance/ThirdPage.vue"),
  },
  {
    path: "/Entrance/Fourth",
    name: "FourthPage",
    component: () =>
      import(/* webpackChunkName: "a" */ "../views/Entrance/FourthPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
