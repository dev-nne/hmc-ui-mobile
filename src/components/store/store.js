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
    sessionEnd: false,
    siteName: "",
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
      spaceNumber: "",
      fellowNum: ""
    },
    checkcarMsg: "",
    checkcar: false,
    agreementInfo: {},
    fellow: false,
    doorOpen: false,
    doorClose: false,
    light: false,
    openCount: 10,
    closeCount: 10,
    lightCount: 10,
    doorOpenChecked: false,
    doorCloseChecked: false,
    doorLightChecked: false
  },
  getters: getters,
  mutations: mutations
});

export default { store };
