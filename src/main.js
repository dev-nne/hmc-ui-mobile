// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
// import Vant from "vant";
// // import "vant/lib/index.css";
import App from "./App";
import { router } from "./router";

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  router,
  el: "#app",
  render: h => h(App)
  // router,
  // components: { App },
  // template: "<App/>"
});

// Vue.use(Vant);
