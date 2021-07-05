<template>
  <div class="user">
    <TopMenu />
    <div class="user-main">
      <div class="user-main-carbox">
        <div class="user-main-carbox-text">
          <h2>{{ this.userInfo.carName }}</h2>
          <span>{{ this.userInfo.carNumber }}</span>
        </div>

        <div class="user-main-carbox-img">
          <img src="/static/carMap1.png" alt="" />
        </div>
      </div>

      <div class="user-main-userinfo">
        <UserInfo />
      </div>

      <div class="user-main-smartkey">
        <div class="user-main-smartkey-title">스마트키</div>
        <div class="user-main-smartkey-icon-box">
          <div class="user-main-smartkey-icon-box-circle">
            <div
              class="user-main-smartkey-icon-box-circle-box"
              @click="handlePopup(0)"
              :class="{ clicked: show[0] }"
            >
              <img src="@/assets/icon1.svg" />
              <span>문 열기</span>
            </div>
          </div>
          <div class="user-main-smartkey-icon-box-circle">
            <div
              class="user-main-smartkey-icon-box-circle-box"
              @click="handlePopup(1)"
              :class="{ clicked: show[1] }"
            >
              <img src="@/assets/icon2.svg" />
              <span>문 잠금</span>
            </div>
          </div>
          <div class="user-main-smartkey-icon-box-circle">
            <div
              class="user-main-smartkey-icon-box-circle-box"
              @click="handlePopup(2)"
              :class="{ clicked: show[2] }"
            >
              <img src="@/assets/icon3.svg" />
              <span>경적/비상등</span>
            </div>
          </div>
          <div class="user-main-smartkey-icon-box-circle">
            <div
              class="user-main-smartkey-icon-box-circle-box"
              @click="handlePopup(3)"
              :class="{ clicked: show[3] }"
            >
              <img src="@/assets/icon4.svg" />
              <span>차량반납</span>
            </div>
          </div>
        </div>
      </div>

      <van-popup
        v-model="show[0]"
        :style="{ height: '25%' }"
        class="returnPop"
        @click-overlay="cancel(0)"
      >
        <div class="textbox">
          <h1>[문 열기]</h1>
          <p>차량의 문을 엽니다.</p>
        </div>

        <div class="button-box">
          <button class="returnBtn" @click="confirm1">확인</button>
          <button @click="cancel(0)">취소</button>
        </div>
      </van-popup>

      <van-popup
        v-model="show[1]"
        :style="{ height: '25%' }"
        class="returnPop"
        @click-overlay="cancel(1)"
        ><div class="textbox">
          <h1>[문 잠금]</h1>
          <p>차량의 문을 잠급니다.</p>
        </div>

        <div class="button-box">
          <button class="returnBtn" @click="confirm2">확인</button>
          <button @click="cancel(1)">취소</button>
        </div>
      </van-popup>

      <van-popup
        v-model="show[2]"
        :style="{ height: '25%' }"
        class="returnPop"
        @click-overlay="cancel(2)"
        ><div class="textbox">
          <h1>[비상등]</h1>
          <p>차량 위치 확인을 위해 비상등을 켭니다.</p>
        </div>

        <div class="button-box">
          <button class="returnBtn" @click="confirm3">확인</button>
          <button @click="cancel(2)">취소</button>
        </div>
      </van-popup>

      <van-popup
        v-model="show[3]"
        :style="{ height: '25%' }"
        class="returnPop"
        @click-overlay="cancel(3)"
        ><div class="textbox">
          <h1>[차량 반납]</h1>
          <p>차량 반납 후에는 차량 이용이 불가능합니다.</p>
        </div>

        <div class="button-box">
          <button class="returnBtn" @click="clickCarReturn">
            반납
          </button>
          <button @click="cancel(3)">취소</button>
        </div>
      </van-popup>

      <div class="user-main-fellow" @click="fellowAdd">
        동승자 교대 시승하기
      </div>

      <van-popup
        v-model="fellow"
        :close-on-click-overlay="false"
        class="fellowPop"
      >
        <FellowField @cancelPop="canclePop" />
      </van-popup>
    </div>
    <van-loading
      type="spinner"
      color="white"
      vertical
      v-if="loading"
      class="loading"
      text-color="white"
      >최대 30초의 시간이 걸릴 수 있습니다.</van-loading
    >
    <!-- <van-popup v-model="popUpShow" :overlay="false" class="POPUP">
      <div class="POPUP-content">
        내용은 새로 받아야 합니다.
      </div>
      <div class="POPUP-button">
        <button @click="setPopCloseLocal">그만보기</button>
        <button class="blue" @click="popupComfirm">확인</button>
      </div>
    </van-popup> -->
    <FooterBar />
  </div>
</template>

<script>
import { Popup, Dialog, Loading, Toast } from "vant";
import TopMenu from "../TopMenu";
import FooterBar from "../FooterBar";
import FellowField from "./FellowField.vue";
import UserInfo from "../provision/UserInfo";

export default {
  components: {
    [Popup.name]: Popup,
    [Dialog.name]: Dialog,
    [Loading.name]: Loading,
    [Toast.name]: Toast,
    TopMenu,
    FooterBar,
    UserInfo,
    FellowField
  },
  data() {
    return {
      fellow: false,
      show: [false, false, false, false],
      userInfo: {},
      loading: false,
      res: "",
      countDown: 150
      // popUp: true,
      // popUpShow: false
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.timer();
    // this.getPopCloseLocalNum();

    // if (this.popUp) {
    //   this.popUpShow = true;
    // }
  },
  created() {
    this.userInfo = this.$store.state.userInfo;
    // 2시간 30분후 이용종료
  },
  computed: {
    checkDoorOpen() {
      return this.$store.state.doorOpen;
    },
    checkDoorClose() {
      return this.$store.state.doorClose;
    },
    checkLightOnOff() {
      return this.$store.state.light;
    },
    checkOpenErr() {
      return this.$store.state.openCount;
    },
    checkCloseErr() {
      return this.$store.state.closeCount;
    },
    checkLightErr() {
      return this.$store.state.lightCount;
    },
    sessionEnd() {
      return this.$store.state.sessionEnd;
    },
    checkcar() {
      return this.$store.state.checkcar;
    }
  },
  watch: {
    checkcar(v) {
      console.log(v);
      if (v) {
        Dialog.alert({
          message: this.$store.state.checkcarMsg,
          confirmButtonText: "확인"
        });
        this.loading = false;
        this.$store.state.checkcar = false;
      }
    },
    sessionEnd(v) {
      if (v) {
        Dialog.alert({
          message: "1시간 이상 사용이 없어 로그인 페이지로 이동합니다.",
          confirmButtonText: "확인"
        });
        this.$router.push({
          path: "login",
          query: { id: this.$store.state.userInfo.bookNumber }
        });
      } else {
        this.loading = false;
      }
    },
    checkDoorOpen(v) {
      if (v) {
        this.loading = false;
        Toast("잠금이 해제되었습니다.");
      }
    },
    checkDoorClose(v) {
      if (v) {
        this.loading = false;
        Toast("잠금이 설정되었습니다.");
      }
    },
    checkLightOnOff(v) {
      if (v) {
        this.loading = false;
        Toast("경적/비상등이 켜졌습니다.");
      }
    },
    checkOpenErr(v) {
      if (v === 0) {
        this.loading = false;
        Dialog.alert({
          message: "차량 제어에 실패하였습니다. 잠시 후 다시 시도해 주세요.",
          confirmButtonText: "확인"
        });
      }
    },
    checkCloseErr(v) {
      if (v === 0) {
        this.loading = false;

        Dialog.alert({
          message: "차량 제어에 실패하였습니다. 잠시 후 다시 시도해 주세요.",
          confirmButtonText: "확인"
        });
      }
    },
    checkLightErr(v) {
      if (v === 0) {
        this.loading = false;

        Dialog.alert({
          message: "차량 제어에 실패하였습니다. 잠시 후 다시 시도해 주세요.",
          confirmButtonText: "확인"
        });
      }
    }
  },
  methods: {
    confirm1() {
      this.$store.commit("sessionEnd");
      this.show = [...false];

      let doorObj = {
        tsrdPrctNo: this.$store.state.userInfo.bookNumber, // 임시
        action: "open" // open, close
      };
      this.$store.state.openCount = 10;
      this.$store.state.doorOpen = false;
      this.$store.state.doorOpenChecked = false;
      this.loading = true;
      this.$axios
        .post("https://hyundai-driving.mocean.com/controls/door.do", doorObj)
        .then(res => {
          if (res.data.ERR_CODE === "OUT_OF_TIME") {
            this.loading = false;
            Dialog.alert({
              message: "예약한 시간에 다시 시도해 주세요.",
              confirmButtonText: "확인"
            });
          } else {
            this.$store.commit("handleDoorOpen", {
              commandID: res.data.commandID
            });
          }
        })
        .catch(() => {
          this.loading = false;
          Dialog.alert({
            message:
              "네트워크 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
            confirmButtonText: "확인"
          });
        });
    },
    confirm2() {
      this.$store.commit("sessionEnd");
      this.show = [...false];

      let doorObj = {
        tsrdPrctNo: this.$store.state.userInfo.bookNumber, // 임시
        action: "close" // open, close
      };
      this.loading = true;
      this.$store.state.closeCount = 10;
      this.$store.state.doorClose = false;
      this.$store.state.doorCloseChecked = false;
      this.$axios
        .post("https://hyundai-driving.mocean.com/controls/door.do", doorObj)
        .then(res => {
          if (res.data.ERR_CODE === "OUT_OF_TIME") {
            this.loading = false;
            Dialog.alert({
              message: "예약 시간 이후 제어가 가능합니다.",
              confirmButtonText: "확인"
            });
          } else {
            this.$store.commit("handleDoorClose", {
              commandID: res.data.commandID
            });
          }
        })
        .catch(() => {
          this.loading = false;
          Dialog.alert({
            message:
              "네트워크 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
            confirmButtonText: "확인"
          });
        });
    },
    confirm3() {
      this.$store.commit("sessionEnd");
      this.show = [...false];
      let hornObj = {
        tsrdPrctNo: this.$store.state.userInfo.bookNumber // 임시
      };
      this.loading = true;
      this.$store.state.lightCount = 10;
      this.$store.state.light = false;
      this.$store.state.doorLightChecked = false;
      this.$axios
        .post("https://hyundai-driving.mocean.com/controls/horn.do", hornObj)
        .then(res => {
          if (res.data.ERR_CODE === "OUT_OF_TIME") {
            this.loading = false;
            Dialog.alert({
              message: "예약한 시간에 다시 시도해 주세요.",
              confirmButtonText: "확인"
            });
          } else {
            this.$store.commit("handleLightOnOff", {
              commandID: res.data.commandID
            });
          }
        })
        .catch(() => {
          this.loading = false;
          Dialog.alert({
            message:
              "네트워크 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
            confirmButtonText: "확인"
          });
        });
    },
    clickCarReturn() {
      this.$store.commit("sessionEnd");
      let returnObj = {
        tsrdPrctNo: this.$store.state.userInfo.bookNumber // 임시
      };
      this.show[3] = false;
      this.loading = true;
      this.$axios
        .post(
          "https://hyundai-driving.mocean.com/controls/checkDistanceToOrg.do",
          returnObj
        )
        .then(res => {
          this.loading = false;
          if (res.data.resultMap.distance < 300) {
            this.$axios
              .post(
                "https://hyundai-driving.mocean.com/controls/checkCarStatus.do",
                returnObj
              )
              .then(res => {
                console.log(res);
                if (res.data.ERR_CODE === "OUT_OF_TIME") {
                  this.loading = false;
                  Dialog.alert({
                    message: "예약한 시간에 다시 시도해 주세요.",
                    confirmButtonText: "확인"
                  });
                } else {
                  let dataObj = res.data;
                  const checkEngine = this.checkReturn(dataObj, "engine");
                  const checkTrunk = this.checkReturn(dataObj, "trunk");
                  const checkBonnet = this.checkReturn(dataObj, "bonnet");

                  const checkDoor1 = this.checkReturn(
                    dataObj.doorOpenStatus,
                    "frontLeft"
                  );
                  const checkDoor2 = this.checkReturn(
                    dataObj.doorOpenStatus,
                    "frontRight"
                  );
                  const checkDoor3 = this.checkReturn(
                    dataObj.doorOpenStatus,
                    "rearLeft"
                  );
                  const checkDoor4 = this.checkReturn(
                    dataObj.doorOpenStatus,
                    "rearRight"
                  );
                  const checkWindow1 = this.checkReturn(
                    dataObj.windowStatus,
                    "frontLeft"
                  );
                  const checkWindow2 = this.checkReturn(
                    dataObj.windowStatus,
                    "frontRight"
                  );
                  const checkWindow3 = this.checkReturn(
                    dataObj.windowStatus,
                    "rearLeft"
                  );
                  const checkWindow4 = this.checkReturn(
                    dataObj.windowStatus,
                    "rearRight"
                  );

                  this.show[3] = false;
                  let message = "";

                  if (checkBonnet === "1") {
                    this.loading = false;
                    message = "본넷을 닫은 후 반납해 주세요.";
                  }
                  if (checkTrunk === "1") {
                    this.loading = false;
                    message = "트렁크를 닫은 후 반납해 주세요.";
                  }

                  if (
                    checkWindow1 === "1" ||
                    checkWindow2 === "1" ||
                    checkWindow3 === "1" ||
                    checkWindow4 === "1"
                  ) {
                    this.loading = false;
                    message = "창문을 닫은 후 반납해 주세요.";
                  }
                  if (
                    checkDoor1 === "1" ||
                    checkDoor2 === "1" ||
                    checkDoor3 === "1" ||
                    checkDoor4 === "1"
                  ) {
                    this.loading = false;
                    message = "차량 문을 닫은 후 반납해 주세요.";
                  }
                  if (checkEngine === "1") {
                    this.loading = false;
                    message = "차량 시동을 끈 후 반납해 주세요.";
                  }
                  if (message === "") {
                    const returnInfo = {
                      tsrdPrctNo: this.$store.state.userInfo.bookNumber
                    };
                    this.$axios
                      .post(
                        "https://hyundai-driving.mocean.com/mobile/removeUserInfoById.do",
                        returnInfo
                      )
                      .then(res => {
                        localStorage.removeItem("userInfo");
                        // this.removeLocal();
                        this.$router.push("returnPage");
                      })
                      .catch(() =>
                        Dialog.alert({
                          message:
                            "네트워크 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
                          confirmButtonText: "확인"
                        })
                      );
                  } else {
                    Dialog.alert({
                      message: message,
                      confirmButtonText: "확인"
                    });
                  }
                }
              })
              .catch(() => {
                this.loading = false;
                Dialog.alert({
                  message:
                    "네트워크 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
                  confirmButtonText: "확인"
                });
              });
          } else {
            this.loading = false;
            Dialog.alert({
              message: "차량을 대여한 곳에 주차후 반납해주세요.",
              confirmButtonText: "확인"
            });
          }
        })
        .catch(() => {
          this.loading = false;
          Dialog.alert({
            message:
              "네트워크 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
            confirmButtonText: "확인"
          });
        });
    },
    handlePopup(x) {
      this.$store.commit("sessionEnd");
      this.show = [...this.show];
      this.show[x] = true;
    },
    cancel(x) {
      this.show = [...false];
      this.$store.commit("sessionEnd");
    },
    fellowAdd() {
      this.$store.commit("sessionEnd");
      this.fellow = true;
    },
    canclePop(v) {
      this.fellow = v;
      this.$store.commit("sessionEnd");
    },
    timer() {
      let bookT = this.$store.state.userInfo.bookTime;
      let returnT = bookT.split("-")[1];
      let returnH = parseInt(returnT.split(":")[0]);
      let returnM = parseInt(returnT.split(":")[1]);
      const date = new Date();

      setTimeout(() => {
        if (date.getHours() === returnH && date.getMinutes() === returnM) {
          Dialog.alert({
            message: "반납시간이 다 되었습니다. 30분 후에 운행이 종료됩니다.",
            confirmButtonText: "확인"
          });
        }
        if (date.getHours() === returnH && date.getMinutes() === returnM + 30) {
          Dialog.alert({
            message: "운행이 종료됩니다. 라운지에 문의해주세요.",
            confirmButtonText: "확인"
          });
          localStorage.removeItem("userInfo");
          this.$router.push("returnPage");
        }
        this.timer();
      }, 60000);
    },
    checkReturn(obj, key) {
      let bool = obj.hasOwnProperty(key);
      if (bool) {
        return obj[key];
      } else {
        return "0";
      }
    }
    // setPopCloseLocal() {
    //   const userInfo = {
    //     bookNum: this.$store.state.userInfo.bookNumber,
    //     notOpen: "Y"
    //   };
    //   localStorage.setItem("user", JSON.stringify(userInfo));
    //   this.popupComfirm();
    // },
    // getPopCloseLocalNum() {
    //   const getLocal = localStorage.getItem("user");
    //   const localV = JSON.parse(getLocal);

    //   if (localV === null) {
    //     this.popUp = true;
    //   } else {
    //     if (this.$store.state.userInfo.bookNumber === localV.bookNum) {
    //       if (localV.notOpen === "Y") {
    //         this.popUp = false;
    //       } else {
    //         this.popUp = true;
    //       }
    //     }
    //   }
    // },
    // popupComfirm() {
    //   this.popUpShow = false;
    // },
    // removeLocal() {
    //   localStorage.removeItem("user");
    // }
  }
};
</script>
