import Vue from "vue";
// import Vant from "vant";
// // import "vant/lib/index.css";
import App from "./App";
import { router } from "./router";
import "./components/style/common.css";
import "./components/style/common.less";
import { store } from "./components/store/store.js";

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: "#app",
  render: h => h(App)
});

// Vue.use(Vant);
