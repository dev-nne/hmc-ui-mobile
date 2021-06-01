import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "*",
    redirect: "/sample"
  },
  {
    name: "user",
    component: () => import("./view/user"),
    meta: {
      title: "로그인"
    }
  },
  {
    name: "cart",
    component: () => import("./view/cart"),
    meta: {
      title: "카트"
    }
  },
  {
    name: "goods",
    component: () => import("./view/goods"),
    meta: {
      title: "상품"
    }
  },
  {
    name: "sample",
    component: () => import("./view/sample"),
    meta: {
      title: "Sample"
    }
  },
  {
    name: "certification",
    component: () => import("./view/certification"),
    meta: {
      title: "certification"
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
