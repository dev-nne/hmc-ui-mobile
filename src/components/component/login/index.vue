<template>
  <div class="login">
    <!-- -->
    <TopMenu class="nav" />
    <!-- 메인 -->
    <div class="login-main">
      <div class="login-main-title">현대자동차 시승서비스</div>

      <div class="login-main-form-box">
        <input
          type="text"
          class="input nameInput"
          v-model="username"
          placeholder="이름"
          pattern="[^ㄱ-힣a-zA-Z]*"
          ref="nameInput"
          @keydown="keyCodeEvent"
          @blur="blurstart"
        />
        <!-- @keydown="checkKorean" -->
        <div class="inputBox">
          <input
            ref="input"
            type="tel"
            class="inputBox-input input"
            placeholder="010"
            v-model="phoneNum1"
            pattern="[0-9]*"
            maxlength="3"
            oninput="javascript: if (this.value.length >
              this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            @keyup="nextInput"
            @keydown="fullText(3)"
          />
          <div class="line"></div>
          <input
            ref="input2"
            type="tel"
            class="inputBox-input input"
            v-model="phoneNum2"
            placeholder="0000"
            pattern="\d*"
            maxlength="4"
            oninput="javascript: if (this.value.length >
              this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            @keyup="nextInput2"
            @keydown="fullText(4)"
          />
          <div class="line"></div>
          <input
            ref="input3"
            type="tel"
            class="inputBox-input input"
            v-model="phoneNum3"
            placeholder="0000"
            pattern="\d*"
            maxlength="4"
            oninput="javascript: if (this.value.length >
              this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            @keyup="checkNumber"
            @keydown="fullText(4)"
          />
        </div>

        <div class="login-main-form-box-button">
          <van-button
            color="#012c5f"
            block
            native-type="submit"
            class="loginBtn"
            @click="submit"
          >
            로그인
          </van-button>
        </div>
      </div>
    </div>

    <div class="login-bottom">
      <FooterBar />
      <!-- :class="{ focusOn }" -->
    </div>
  </div>
</template>

<script>
import {
  Icon,
  Form,
  Field,
  Button,
  Tabbar,
  TabbarItem,
  Popup,
  Dialog
} from "vant";
import TopMenu from "../TopMenu.vue";
import FooterBar from "../FooterBar";

export default {
  components: {
    [TabbarItem.name]: TabbarItem,
    [Dialog.name]: Dialog,
    [Popup.name]: Popup,
    [Tabbar.name]: Tabbar,
    [Button.name]: Button,
    [Field.name]: Field,
    [Form.name]: Form,
    [Icon.name]: Icon,
    TopMenu,
    FooterBar
  },
  data() {
    return {
      username: "",
      phoneNum1: "",
      phoneNum2: "",
      phoneNum3: "",
      active: 0,
      value: "",
      show: false,
      // alert1: false,
      // alert2: false,
      // alert3: false,
      param: "",
      data: ""
    };
  },

  mounted() {
    window.scrollTo(0, 0);
    this.param = this.$route.query.id;
    window.addEventListener("touchstart", this.touchWindows);
    let savedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (localStorage.getItem("userInfo") !== null) {
      this.$axios
        .post(
          "https://hyundai-driving.mocean.com/mobile/login.do",
          savedUserInfo
        )
        .then(res => {
          if (res.data.infoResponse.rsp_CD === "200") {
            const payload = {
              resData: res.data,
              booking: savedUserInfo.tsrdPrctNo
            };
            this.$store.commit("userInfoSetting", payload);
            const userCheckObj = {
              tsrdPrctNo: savedUserInfo.tsrdPrctNo
            };
            if ("chanTsrdPrctNo" in res.data.DisplayResponse[0]) {
              this.$axios
                .post(
                  "https://hyundai-driving.mocean.com/mobile/getUserInfoById.do", // updateOriginUserInfo
                  userCheckObj
                )
                .then(res => {
                  // 세션저장
                  this.$store.commit("sessionEnd");
                  this.$store.state.auth = true;
                  this.$store.state.userName = savedUserInfo.userName;
                  this.$store.state.userNumber = savedUserInfo.phone;
                  window.removeEventListener("touchstart", this.touchWindows);
                  if (!this.$store.state.sessionEnd) {
                    if (res.data.returnYn === "N") {
                      if (
                        res.data.prctInfoAgrYn === "Y" &&
                        res.data.prctInfoCjgtAgrYn === "Y"
                      ) {
                        if (res.data.prctLicenseYn === "Y") {
                          this.$router.push("fellowPage");
                        } else {
                          this.$router.push("certification"); // certification
                        }
                      } else {
                        this.$router.push("provision");
                      }
                    }
                  }
                });
            } else {
              this.$axios
                .post(
                  "https://hyundai-driving.mocean.com/mobile/getUserInfoById.do", // updateOriginUserInfo
                  userCheckObj
                )
                .then(res => {
                  this.$store.commit("sessionEnd");
                  this.$store.state.auth = true;
                  this.$store.state.userName = savedUserInfo.userName;
                  this.$store.state.userNumber = savedUserInfo.phone;
                  window.removeEventListener("touchstart", this.touchWindows);
                  if (!this.$store.state.sessionEnd) {
                    if (res.data.returnYn === "N") {
                      if (
                        res.data.prctInfoAgrYn === "Y" &&
                        res.data.prctInfoCjgtAgrYn === "Y"
                      ) {
                        if (res.data.prctLicenseYn === "Y") {
                          this.$router.push("userPage"); // userPage
                        } else {
                          this.$router.push("certification"); // certification
                        }
                      } else {
                        this.$router.push("provision");
                      }
                    }
                  }
                });
            }
          }
        });
    }
  },
  computed: {
    sessionEnd() {
      return this.$store.state.sessionEnd;
    }
  },
  watch: {
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
        this.param = this.$store.state.userInfo.bookNumber;
      }
    }
  },
  methods: {
    submit() {
      const phoneNumber = `${this.phoneNum1}-${this.phoneNum2}-${this.phoneNum3}`;
      const userInfo = {
        userName: this.username,
        phone: phoneNumber,
        // tsrdPrctNo: this.$store.state.userInfo.bookNumber
        tsrdPrctNo: this.param
      };
      if (this.username.length > 1) {
        if (phoneNumber.length > 12) {
          this.$axios
            .post(
              "https://hyundai-driving.mocean.com/mobile/login.do",
              userInfo
            )
            .then(res => {
              if (res.data.infoResponse.rsp_CD === "200") {
                const payload = {
                  resData: res.data,
                  booking: userInfo.tsrdPrctNo
                };
                this.$store.state.auth = true;
                this.$store.commit("userInfoSetting", payload);
                const userCheckObj = {
                  tsrdPrctNo: this.$store.state.userInfo.bookNumber
                };

                if ("chanTsrdPrctNo" in res.data.DisplayResponse[0]) {
                  this.$axios
                    .post(
                      "https://hyundai-driving.mocean.com/mobile/getUserInfoById.do", // updateOriginUserInfo
                      userCheckObj
                    )
                    .then(res => {
                      // 세션저장
                      localStorage.setItem(
                        "userInfo",
                        JSON.stringify(userInfo)
                      );
                      this.$store.commit("sessionEnd");
                      this.$store.state.userName = this.username;
                      this.$store.state.userNumber = phoneNumber;
                      window.removeEventListener(
                        "touchstart",
                        this.touchWindows
                      );
                      if (res.data.returnYn === "N") {
                        if (
                          res.data.prctInfoAgrYn === "Y" &&
                          res.data.prctInfoCjgtAgrYn === "Y"
                        ) {
                          if (res.data.prctLicenseYn === "Y") {
                            this.$router.push("fellowPage");
                          } else {
                            this.$router.push("certification"); // certification
                          }
                        } else {
                          this.$router.push("provision");
                        }
                      } else {
                        Dialog.alert({
                          message: "반납이후에는 다시 이용하실 수 없습니다.",
                          confirmButtonText: "확인"
                        });
                      }
                    });
                } else {
                  this.$axios
                    .post(
                      "https://hyundai-driving.mocean.com/mobile/getUserInfoById.do", // updateOriginUserInfo
                      userCheckObj
                    )
                    .then(res => {
                      // 세션저장
                      localStorage.setItem(
                        "userInfo",
                        JSON.stringify(userInfo)
                      );
                      this.$store.commit("sessionEnd");
                      this.$store.state.userName = this.username;
                      this.$store.state.userNumber = phoneNumber;
                      window.removeEventListener(
                        "touchstart",
                        this.touchWindows
                      );
                      if (res.data.returnYn === "N") {
                        if (
                          res.data.prctInfoAgrYn === "Y" &&
                          res.data.prctInfoCjgtAgrYn === "Y"
                        ) {
                          if (res.data.prctLicenseYn === "Y") {
                            this.$router.push("userPage"); // userPage
                          } else {
                            this.$router.push("certification"); // certification
                          }
                        } else {
                          this.$router.push("provision");
                        }
                      } else {
                        Dialog.alert({
                          message: "반납이후에는 다시 이용하실 수 없습니다.",
                          confirmButtonText: "확인"
                        });
                      }
                    });
                }
              } else {
                this.alert1 = true;
              }
            })
            .catch(err => {
              console.log(err);
              Dialog.alert({
                message: "예약된 정보를 확인해주세요",
                confirmButtonText: "확인"
              });
            });
        } else {
          Dialog.alert({
            message: "올바른 전화번호를 입력하세요.",
            confirmButtonText: "확인"
          });
        }
      } else {
        Dialog.alert({
          message: "올바른 이름을 입력하세요.",
          confirmButtonText: "확인"
        });
      }
    },

    nextInput() {
      this.checkNumber(event);
      if (this.$refs.input.value.length === 3) {
        this.checkNumber(event);
        if (this.$refs.input.value.length === 3) {
          event.returnValue = false;
          if (this.$refs.input2.value.length !== 4) this.$refs.input2.focus();
        }
      }
    },
    nextInput2() {
      this.checkNumber(event);
      if (this.$refs.input2.value.length === 4) {
        this.checkNumber(event);
        if (this.$refs.input2.value.length === 4) {
          event.returnValue = false;
          if (this.$refs.input3.value.length !== 4) this.$refs.input3.focus();
        }
      }
    },
    checkNumber(e) {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    },
    fullText(x) {
      if (event.target.value.length === x) {
        if (event.keyCode === 8) {
          event.returnValue = true;
        } else {
          event.returnValue = false;
        }
      }
    },
    inputTarget() {
      let e = event.target;
      this.username = e.value.replace(
        /([\\|\\-\\_\\;\\·\1-9\d\u002D\u005B\u0022\u0027\u005D\uFFE6\u0023\u002C\u007C\u02DA\u2022\u00B0\u002F]|[~@#＃$%`^&*×÷–—-₩《,.?!》○◇♧♤€£¥¤•º¿¡￠()□#■♡☆♥_※●+|<>=:{}])/g,
        ""
      );
    },

    keyCodeEvent() {
      let key = event.keyCode;
      if (key === 190 || key === 188 || key === 49 || key === 191) {
        event.preventDefault();
      }
      this.inputTarget();
    },

    touchWindows() {
      let e = event.target.className;
      if (e === "input") {
        // 제외
      } else {
        this.$refs.nameInput.blur();
      }
    },
    blurstart() {
      console.log("");
    }
    // resetFixed() {
    //   let browser = navigator.userAgent.toLowerCase();
    //   const html = document.getElementsByTagName("html");

    //   if (browser.indexOf("crios") === -1 || browser.indexOf("chrome") === -1) {
    //     if (browser.indexOf("safari") !== -1) {
    //       // this.focusOn = true;
    //       html[0].classList.value = "focusOn";
    //     }
    //   }
    // },
    // resetCss() {
    //   // this.focusOn = false;
    //   const html = document.getElementsByTagName("html");
    //   html[0].classList.value = "";
    // }
  }
};
</script>
<style>
.focusOn {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh;
}
</style>
