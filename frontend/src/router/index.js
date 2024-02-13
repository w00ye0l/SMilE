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
    name: "user",
    children: [
      {
        path: "signup",
        name: "signup",
        component: () => import("../views/user/SignupView.vue"),
      },
      {
        path: "login",
        name: "login",
        component: () => import("../views/user/LoginView.vue"),
      },
      {
        path: "mypage",
        name: "mypage",
        component: () => import("../views/user/MyPage.vue"),
        beforeEnter: requireAuth,
      },
    ],
  },
  {
    path: "/mbti",
    children: [
      {
        path: "",
        name: "mbti",
        component: () => import("../views/mbtiInfo/MbtiView.vue"),
        props: true,
        beforeEnter: requireAuth,
      },
      {
        path: "addGroup",
        name: "addGroup",
        component: () => import("../views/mbtiInfo/GroupView.vue"),
        beforeEnter: requireAuth,
      },
      {
        path: "addMbti",
        name: "addMbtiInfo",
        component: () => import("../views/mbtiInfo/AddMbtiView.vue"),
        beforeEnter: requireAuth,
      },
      {
        path: "detail",
        name: "mbtiDetail",
        component: () => import("../views/mbtiInfo/MbtiDetail.vue"),
        beforeEnter: requireAuth,
      },
    ],
  },
  {
    path: "/mbtiDocs",
    children: [
      {
        path: "",
        name: "docs",
        component: () => import("../views/mbtiDocs/DocsView.vue"),
      },
      {
        path: "doc",
        name: "doc",
        component: () => import("../views/mbtiDocs/DocView.vue"),
      },
    ],
  },
  {
    path: "/random",
    children: [
      {
        path: "question",
        name: "randomQuestion",
        component: () => import("../views/random/QuestionView.vue"),
        beforeEnter: requireAuth,
      },
      {
        path: "answer",
        name: "randomAnswer",
        component: () => import("../views/random/AnswerListView.vue"),
        beforeEnter: requireAuth,
      },
      {
        path: "detail/:id",
        name: "randomAnswerDetail",
        component: () => import("../views/random/AnswerDetailView.vue"),
        props: true,
        beforeEnter: requireAuth,
      },
      {
        path: "modify/:id",
        name: "randomAnswerModify",
        component: () => import("../views/random/AnswerModifyView.vue"),
        props: true,
        beforeEnter: requireAuth,
      },
    ],
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
