import Vue from "vue";
import VueRouter from "vue-router";
import { store } from "./components/store/store";

Vue.use(VueRouter);

export const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/components/component/login"),
      meta: { authRequired: false }
    },
    {
      name: "provision",
      path: "/provision",
      component: () => import("@/components/component/provision"),
      meta: { authRequired: true }
    },
    {
      name: "certification",
      path: "/certification",
      component: () => import("@/components/component/certification"),
      meta: { authRequired: true }
    },
    {
      name: "userPage",
      path: "/userPage",
      component: () => import("@/components/component/userPage"),
      meta: { authRequired: true }
    },
    {
      name: "returnPage",
      path: "/returnPage",
      component: () => import("@/components/component/returnPage"),
      meta: { authRequired: true }
    },
    {
      name: "fellowPage",
      path: "/fellowPage",
      component: () => import("@/components/component/fellowPage")
    },
    {
      path: "*",
      component: () => import("@/components/component/login")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some(routeInfo => {
      return routeInfo.meta.authRequired;
    }) &&
    store.state.auth !== true
  ) {
    next("login");
  } else {
    next();
  }
});

export default { router };
