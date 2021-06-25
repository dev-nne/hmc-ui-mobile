import Vue from "vue";
import Vuex from "vuex";
import * as getters from "./modules/getters.js";
import * as mutations from "./modules/mutations.js";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isLocal: false,
    auth: false,
    userName: "",
    userNumber: "",
    // 고객정보
    userInfo: {
      bookNumber: "",
      centerName: "",
      spaceName: "",
      carName: "",
      carNumber: "",
      bookDay: "",
      bookTime: "",
      address: "",
      spaceNumber: ""
    },
    agreementInfo: {},
    fellow: false,
    doorOpen: false,
    doorClose: false,
    light: false,
    openCount: 15,
    closeCount: 15,
    lightCount: 15
  },
  getters: getters,
  mutations: mutations
});

export default { store };
