import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useCookies } from "vue3-cookies";

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
    path: "/mbti",
    name: "mbti",
    component: () => import("../views/MbtiView.vue"),
    props: true,
  },
  {
    path: "/mbti/addGroup",
    name: "addgroup",
    component: () => import("../views/GroupView.vue"),
  },
  {
    path: "/mbti/addMbti",
    name: "addinfo",
    component: () => import("../views/AddMbtiView.vue"),
  },
  {
    path: "/mbti/detail",
    name: "detail",
    component: () => import("../views/InfoDetail.vue"),
    props: (route) => ({
      groupId: route.query.groupId,
      groupItem: JSON.parse(route.query.groupItem),
    }),
  },
  {
    path: "/mypage",
    name: "mypage",
    component: () => import("../views/MyPage.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/randomanswer",
    name: "randomanswer",
    component: () => import("../views/RandomAnswer.vue"),
  },
  {
    path: "/randomquestion",
    name: "randomquestion",
    component: () => import("../views/RandomQuestion.vue"),
  },
  {
    path: "/randomanswer/detail/:name",
    name: "randomanswerdetail",
    component: () => import("../views/RandomAnswerDetail.vue"),
    props: true,
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
  {
    path: "/docs",
    name: "docs",
    component: () => import("../views/DocsView.vue"),
  },
  {
    path: "/doc",
    name: "doc",
    component: () => import("../views/DocView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "route-active",
});

function requireAuth(to, from, next) {
  const { cookies } = useCookies();
  // console.log("id", cookies.get("id"));
  if (cookies.get("id")) {
    next();
  } else {
    // console.log("none");
    next("login");
  }
}

export default router;
