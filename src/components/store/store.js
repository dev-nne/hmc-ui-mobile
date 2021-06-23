import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./modules/actions.js";
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
    fellow: false
  },
  actions: actions,
  mutations: mutations
});

export default { store };
