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
    path: "/savingmbti",
    name: "savingmbti",
    component: () => import("../views/MbtiSave.vue"),
    props: true,
  },
  {
    path: "/groupadd",
    name: "groupadd",
    component: () => import("../views/GroupAdd.vue"),
  },
  {
    path: "/addinfo",
    name: "addinfo",
    component: () => import("../views/AddInfo.vue"),
  },
  {
    path: "/infodetail",
    name: "infodetail",
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
  },
  {
    path: "/messagebox/",
    name: "messagebox",
    component: () => import("../views/MessageBox.vue"),
  },
  {
    path: "/randommessage",
    name: "randommessage",
    component: () => import("../views/RandomMessage.vue"),
  },
  {
    path: "/sendmessage/:index",
    name: "sendmessage",
    component: () => import("../views/SendMessage.vue"),
    props: true,
  },
  {
    path: "/messagecheck/",
    name: "messagecheck",
    component: () => import("../views/MessageCheck.vue"),
  },
  {
    path: "/messageconfirm/:index",
    name: "messageconfirm",
    component: () => import("../views/MessageConfirm.vue"),
    props: true,
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
    path: "/writing",
    name: "writing",
    component: () => import("../views/WritingView.vue"),
  },
  {
    path: "/community",
    name: "community",
    component: () => import("../views/CommunityView.vue"),
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
  {
    path: "/calendar",
    name: "calendar",
    component: () => import("../views/CalendarView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "route-active",
});

export default router;
