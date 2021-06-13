import Vue from "vue";
import Vuex from "vuex";
import * as getters from "./modules/getters.js";
import * as mutations from "./modules/mutations.js";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isLocal: false,
    auth: false,
    // 고객정보
    userInfo: {
      bookNumber: "",
      centerName: "",
      spaceName: "",
      carName: "",
      bookDay: "",
      bookTime: "",
      address: "",
      spaceNumber: ""
    },
    fellow: false
  },
  getters: getters,
  mutations: mutations
});

export default { store };
