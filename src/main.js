import Vue from "vue";
import App from "./App";
import { router } from "./router";
import "./components/style/common.css";
import "./components/style/common.less";
import { store } from "./components/store/store.js";
import axios from "axios";

Vue.config.productionTip = false;
/* eslint-disable no-new */
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  el: "#app",
  render: h => h(App)
});

// Vue.use(Vant);
