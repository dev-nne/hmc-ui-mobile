import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const router = new VueRouter({
  // mode: "history",
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
      component: () => import("@/components/component/fellowPage"),
      meta: { authRequired: true }
    },
    {
      path: "*",
      component: () => import("@/components/component/login")
    }
  ]
});

router.beforeEach((to, from, next) => {
  let user = localStorage.getItem("userInfo");
  if (
    to.matched.some(routeInfo => {
      return routeInfo.meta.authRequired;
    }) &&
    user === null
  ) {
    next("login");
  } else {
    next();
  }
});

export default { router };
