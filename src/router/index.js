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
    path: "/entrance/first",
    name: "first",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Entrance/FirstPage.vue"),
  },
  {
    path: "/entrance/second",
    name: "second",
    component: () => import("../views/Entrance/SecondPage.vue"),
  },
  {
    path: "/entrance/third",
    name: "third",
    component: () => import("../views/Entrance/ThirdPage.vue"),
  },
  {
    path: "/entrance/fourth",
    name: "fourth",
    component: () => import("../views/Entrance/FourthPage.vue"),
  },
  {
    path: "/savingmbti",
    name: "savingmbti",
    component: () => import("../views/MbtiSave.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/SignupView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
