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
          @blur="inputBlur"
          @focus="inputFocus"
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
            @blur="inputBlur"
            @focus="inputFocus"
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
            @blur="inputBlur"
            @focus="inputFocus"
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
            @blur="inputBlur"
            @focus="inputFocus"
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
      <FooterBar :class="{ focusOn }" />
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
      phoneNum1: "010",
      phoneNum2: "",
      phoneNum3: "",
      active: 0,
      value: "",
      show: false,
      // alert1: false,
      // alert2: false,
      // alert3: false,
      param: "",
      data: "",
      focusOn: false
    };
  },

  mounted() {
    let query = this.$route.query.id;
    this.param = query;
    let resId = localStorage.getItem("bookingId");

    if (
      resId === this.param ||
      resId === null ||
      resId === "undefined" ||
      query === undefined
    ) {
      if (this.param !== undefined) {
        localStorage.setItem("bookingId", this.param);
      }
      let site = localStorage.getItem("site");
      if (site === null) {
        this.$router
          .push({
            path: "login",
            query: { id: this.param }
          })
          .catch(() => {});
      } else {
        this.$store.commit("sessionReload");
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        let bookingId = localStorage.getItem("bookingId");

        const payload = {
          resData: userInfo,
          booking: bookingId
        };
        this.$store.commit("userInfoSetting", payload);
      }
    } else {
      localStorage.removeItem("userInfo");
      localStorage.setItem("bookingId", this.param);
    }
    this.CreateWindowEvent();
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
      if (this.username.length > 1) {
        if (phoneNumber.length > 12) {
          this.axiosLogin();
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
    axiosLogin() {
      const phoneNumber = `${this.phoneNum1}-${this.phoneNum2}-${this.phoneNum3}`;
      const userInfo = {
        userName: this.username,
        phone: phoneNumber,
        // tsrdPrctNo: this.$store.state.userInfo.bookNumber
        tsrdPrctNo: this.param
      };
      this.$axios
        .post("https://hyundai-driving.mocean.com/mobile/login.do", userInfo)
        .then(res => {
          if (res.data.infoResponse.rsp_CD === "200") {
            const userInfo = {
              userName: this.username,
              phone: phoneNumber,
              tsrdPrctNo: this.param
            };
            const payload = {
              resData: res.data,
              booking: userInfo.tsrdPrctNo
            };
            this.$store.state.auth = true;
            this.$store.commit("userInfoSetting", payload);

            localStorage.setItem("userInfo", JSON.stringify(res.data));
            // 예약시간 마지막 부분과 현재시간을 비교해서 예약시간이 지났으면...
            let curTime = new Date();
            let date = this.$store.state.userInfo.getDate;
            let time = this.$store.state.userInfo.bookTime;
            let timeSplit = time.split("-")[1];
            let pastTime = new Date(
              date.slice(0, 4),
              Number(date.slice(4, 6)) - 1,
              date.slice(6, 8),
              timeSplit.split(":")[0],
              timeSplit.split(":")[1]
            );
            if (curTime.getTime() > pastTime.getTime()) {
              Dialog.alert({
                message: "예약시간 이후에는 이용하실 수 없습니다.",
                confirmButtonText: "확인"
              });
            } else {
              this.axiosGetUserInfoById(res);
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
    },

    axiosGetUserInfoById(data) {
      const phoneNumber = `${this.phoneNum1}-${this.phoneNum2}-${this.phoneNum3}`;

      const userCheckObj = {
        tsrdPrctNo: this.$store.state.userInfo.bookNumber
      };
      this.$axios
        .post(
          "https://hyundai-driving.mocean.com/mobile/getUserInfoById.do",
          userCheckObj
        )
        .then(res => {
          // 세션저장
          // localStorage.setItem("userInfo", JSON.stringify(userInfo));
          this.$store.commit("sessionEnd");

          this.$store.state.userName = this.username;
          this.$store.state.userNumber = phoneNumber;
          this.removeWindowEvent();
          if (res.data.returnYn === "N") {
            if (
              res.data.prctInfoAgrYn === "Y" &&
              res.data.prctInfoCjgtAgrYn === "Y" &&
              res.data.procInfoLocCamYn === "Y"
            ) {
              if (res.data.prctLicenseYn === "Y") {
                // 동승자냐
                if ("chanTsrdPrctNo" in data.data.DisplayResponse[0]) {
                  this.$store.commit("sessionSavedPage", "fellowPage");
                  this.$router.replace("fellowPage");
                } else {
                  this.$store.commit("sessionSavedPage", "userPage");
                  this.$router.replace("userPage"); // userPage
                }
              } else {
                this.$store.commit("sessionSavedPage", "certification");
                this.$router.replace("certification"); // certification
              }
            } else {
              this.$store.commit("sessionSavedPage", "provision");
              this.$router.replace("provision");
            }
          } else {
            Dialog.alert({
              message: "반납이후에는 다시 이용하실 수 없습니다.",
              confirmButtonText: "확인"
            });
          }
        });
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
      event.stopPropagation();
      let e = event.target.className.indexOf("input");

      if (e === -1) {
        this.$refs.nameInput.blur();
        this.$refs.input.blur();
        this.$refs.input2.blur();
        this.$refs.input3.blur();
        setTimeout(() => {
          this.focusOn = false;
        }, 100);
      }
      this.inputBlur();
    },
    moveWindows() {
      event.stopPropagation();

      this.$refs.nameInput.blur();
      this.$refs.input.blur();
      this.$refs.input2.blur();
      this.$refs.input3.blur();
      setTimeout(() => {
        this.focusOn = false;
      }, 100);
    },
    CreateWindowEvent() {
      window.addEventListener("touchstart", this.touchWindows);
      window.addEventListener("touchmove", this.moveWindows);
    },
    removeWindowEvent() {
      window.removeEventListener("touchstart", this.touchWindows);
      window.removeEventListener("touchmove", this.moveWindows);
    },
    inputFocus() {
      this.focusOn = true;
    },
    inputBlur() {
      let e = event.target.className.indexOf("input");
      if (e === -1) {
        setTimeout(() => {
          this.focusOn = false;
        }, 100);
      }
    }
    // getLocation() {
    //   navigator.geolocation.getCurrentPosition(
    //     position => {
    //       alert(position.coords.latitude + " " + position.coords.longitude);
    //     },
    //     () => {
    //       Dialog.alert({
    //         message: "위치 접근을 허용으로 설정해주세요.",
    //         confirmButtonText: "확인"
    //       });
    //     },
    //     {
    //       enableHighAccuracy: false,
    //       maximumAge: 0,
    //       timeout: Infinity
    //     }
    //   );
    // }
  }
};
</script>
<style>
.focusOn {
  display: none !important;
}
</style>
