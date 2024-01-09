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
    path: "/mbti",
    name: "mbti",
    component: () => import("../views/MbtiView.vue"),
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/mbti/addGroup",
    name: "addgroup",
    component: () => import("../views/GroupView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/mbti/addMbti",
    name: "addinfo",
    component: () => import("../views/AddMbtiView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/mbti/detail",
    name: "detail",
    component: () => import("../views/MbtiDetail.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/mypage",
    name: "mypage",
    component: () => import("../views/MyPage.vue"),
    beforeEnter: requireAuth,
    // props: true,
  },
  {
    path: "/randomanswer",
    name: "randomanswer",
    component: () => import("../views/RandomAnswer.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/randomquestion",
    name: "randomquestion",
    component: () => import("../views/RandomQuestion.vue"),
    beforeEnter: requireAuth,
    // beforeEnter: requireAuth,
  },
  {
    path: "/randomanswer/detail/:id",
    name: "randomanswerdetail",
    component: () => import("../views/RandomAnswerDetail.vue"),
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/randomanswer/modify/:id",
    name: "randomanswermodify",
    component: () => import("../views/RandomAnswerModify.vue"),
    props: true,
    beforeEnter: requireAuth,
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
  scrollBehavior() {
    return { top: 0 };
  },
});

function requireAuth(to, from, next) {
  const { cookies } = useCookies();
  if (cookies.get("id")) {
    next();
  } else {
    next("login");
  }
}

export default router;
