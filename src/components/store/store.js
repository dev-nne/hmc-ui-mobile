import Vue from "vue";
import Vuex from "vuex";
import * as getters from "./modules/getters.js";
import * as mutations from "./modules/mutations.js";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    show: false
  },
  getters: getters,
  mutations: mutations
});
