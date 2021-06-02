import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "*",
    redirect: "sample"
  },
  {
    name: "sample",
    component: () => import("./components/component/login"),
    meta: {
      title: "login"
    }
  },
  {
    name: "provision",
    component: () => import("./components/component/provision"),
    meta: {
      title: "provision"
    }
  },
  {
    name: "certification",
    component: () => import("./components/component/certification"),
    meta: {
      title: "certification"
    }
  },
  {
    name: "userPage",
    component: () => import("./components/component/userPage"),
    meta: {
      title: "userPage"
    }
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || "/" + (route.name || "");
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export { router };
