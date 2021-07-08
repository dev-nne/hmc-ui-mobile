<template>
  <div class="cert">
    <TopMenu class="nav" />

    <div class="cert-main">
      <div class="cert-main-title">
        <h3>운전면허인증</h3>
        <div class="cert-main-title-content">
          21세 이상 유효 면허 고객님만 시승 이용이 가능합니다.<br />
          반드시 본인의 운전면허증을 등록해 주세요.<br />
          타인의 운전면허 등록시, 법적 조치를 받을 수 있습니다.
        </div>
      </div>

      <div class="cert-main-info">
        <!-- 셀렉트박스(면허종별) -->
        <div class="cert-main-info-ratio">
          <div class="cert-main-info-ratio-title">
            면허종별
          </div>
          <div class="cert-main-info-ratio-box">
            <van-radio-group
              v-model="checked"
              direction="horizontal"
              icon-size="16px"
            >
              <van-radio name="32" shape="square">2종 보통</van-radio>
              <van-radio name="13" shape="square">1종 소형</van-radio>
              <van-radio name="12" shape="square">1종 보통</van-radio>
              <van-radio name="11" shape="square">1종 대형</van-radio>
            </van-radio-group>
          </div>
        </div>

        <!-- 면허정보박스 -->
        <div class="cert-main-info-type">
          <div class="cert-main-info-type-title">면허 번호</div>
          <div class="cert-main-info-type-num">
            <div class="cert-main-info-type-num-field">
              <van-field
                readonly
                clickable
                :value="value"
                placeholder="발급 지역 선택"
                @click="showPicker = true"
                class="cert-main-info-type-num-field"
              /><van-icon name="arrow-down" />
            </div>
            <van-popup v-model="showPicker" position="bottom">
              <van-picker
                title="발급지역"
                show-toolbar
                :columns="columns"
                default-index="0"
                item-height="36px"
                @cancel="showPicker = false"
                @confirm="onConfirm"
                confirm-button-text="확인"
                cancel-button-text="취소"
              />
            </van-popup>

            <div class="cert-main-info-type-num-input">
              <input
                ref="input"
                type="tel"
                class="input inputTouch1 "
                v-model="keyValue1"
                pattern="[0-9]*"
                maxlength="2"
                oninput="javascript: if (this.value.length >
              this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                @keyup="nextInput"
                @keydown="fullText(2)"
                @blur="inputBlur"
                @focus="inputFocus"
              />
              <div class="line"></div>
              <input
                ref="input2"
                type="tel"
                class="input2 inputTouch2 input"
                v-model="keyValue2"
                pattern="\d*"
                maxlength="6"
                oninput="javascript: if (this.value.length >
              this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                @keyup="nextInput2"
                @keydown="fullText(6)"
                @blur="inputBlur"
                @focus="inputFocus"
              />
              <div class="line"></div>
              <input
                ref="input3"
                type="tel"
                class="input inputTouch3 input"
                v-model="keyValue3"
                pattern="\d*"
                maxlength="2"
                oninput="javascript: if (this.value.length >
              this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                @keyup="checkNumber"
                @keydown="fullText(2)"
                @blur="inputBlur"
                @focus="inputFocus"
              />
            </div>
          </div>
          <div class="cert-main-info-type-title">생년월일</div>
          <div
            class="cert-main-info-type-num cert-main-info-type-day"
            @click="showPop"
          >
            <span class="day" :class="{ dayCSS: selectDay }">
              {{ years }}
            </span>
            <span>년</span>
            <span class="day" :class="{ dayCSS: selectDay }">
              {{ month >= 10 ? month : "0" + month }} </span
            ><span>월</span>
            <span class="day" :class="{ dayCSS: selectDay }">
              {{ day >= 10 ? day : "0" + day }} </span
            ><span>일</span>
          </div>
          <div>
            <van-popup v-model="show" position="bottom">
              <DatetiemPicker
                @childcancel="parents"
                @childconfirm="parentDate"
              />
            </van-popup>
          </div>
        </div>

        <div class="cert-main-info-button" @click="sendFormAndMove">
          인증하기
        </div>
      </div>
    </div>

    <div class="cert-bottom">
      <FooterBar :class="{ focusOn }" />
    </div>
  </div>
</template>

<script>
import {
  Icon,
  Field,
  Button,
  RadioGroup,
  Radio,
  Popup,
  Picker,
  Toast,
  Dialog,
  NumberKeyboard
} from "vant";

import TopMenu from "@/components/component/TopMenu.vue";
import getDate from "../commonJS/getDate";
import DatetiemPicker from "./DatetiemPicker";
import FooterBar from "../FooterBar";

export default {
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Dialog.name]: Dialog,
    [NumberKeyboard.name]: NumberKeyboard,
    TopMenu,
    DatetiemPicker,
    FooterBar
  },
  data() {
    return {
      checked: "",
      years: "",
      month: "",
      day: "",
      username: "",
      password: "",
      value: "",
      showPicker: false,
      columns: [
        "서울 (11)",
        "부산 (12)",
        "경기 (13)",
        "강원 (14)",
        "충북 (15)",
        "충남 (16)",
        "전북 (17)",
        "전남 (18)",
        "경북 (19)",
        "경남 (20)",
        "제주 (21)",
        "대구 (22)",
        "인천 (23)",
        "광주 (24)",
        "대전 (25)",
        "울산 (26)",
        "경기북부 (28)"
      ],
      show: false,
      selectDay: false,
      keypadShow: false,
      keyValue1: "",
      keyValue2: "",
      keyValue3: "",
      validate1: false,
      validate2: false,
      validate3: false,
      focusOn: false
    };
  },
  created() {
    this.years = getDate().year;
    this.month = getDate().month + 1;
    this.day = getDate().day;
    // store 정보저장하기
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let bookingId = localStorage.getItem("bookingId");

    const payload = {
      resData: userInfo,
      booking: bookingId
    };
    this.$store.commit("userInfoSetting", payload);
  },
  mounted() {
    window.scrollTo(0, 0);
    this.CreateWindowEvent();
    this.$store.commit("sessionReload");
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
        this.$router.replace({
          path: "login",
          query: { id: this.$store.state.userInfo.bookNumber }
        });
      }
    }
  },
  methods: {
    showPop() {
      this.$store.commit("sessionEnd");
      this.$store.commit("timeOutFun");
      this.show = true;
    },
    parents(data) {
      this.show = data;
    },
    parentDate(show, data, bool) {
      this.show = show;
      let dateValue = new Date(data);
      this.years = dateValue.getFullYear();
      this.month = dateValue.getMonth() + 1;
      this.day = dateValue.getDate();
      this.validate3 = bool;
      this.selectDay = true;
    },
    sendFormAndMove() {
      this.$store.commit("sessionEnd");
      this.$store.commit("timeOutFun");
      let keyvalue = this.keyValue1 + this.keyValue2 + this.keyValue3;
      if (this.checked !== "") {
        if (this.validate1) {
          if (keyvalue.length === 10) {
            if (this.validate3) {
              const licenseObj = {
                licenseNo: this.value + keyvalue,
                residentName: this.$store.state.userName,
                residentDate: `${this.years.toString().slice(-2)}${
                  this.month < 10 ? `0${this.month}` : `${this.month}`
                }${this.day < 10 ? `0${this.day}` : `${this.day}`}`,
                licenseConCode: this.checked,
                tsrdPrctNo: this.$store.state.userInfo.bookNumber
              };
              console.log(licenseObj);
              this.$axios
                .post(
                  "https://hyundai-driving.mocean.com/mobile/license.do",
                  licenseObj
                )
                .then(res => {
                  if (res.data.resultMap.certLicense === "0") {
                    this.removeWindowEvent();
                    if (
                      this.$store.state.userInfo.fellowNum === undefined ||
                      this.$store.state.userInfo.fellowNum === ""
                    ) {
                      this.$store.commit("sessionSavedPage", "userPage");
                      this.$router.replace("userPage");
                    } else {
                      this.$store.commit("sessionSavedPage", "fellowPage");
                      this.$router.replace("fellowPage");
                    }
                  } else {
                    console.log(res.data.resultMap.errCode);
                    switch (res.data.resultMap.errCode) {
                      case "910770":
                        Dialog.alert({
                          message:
                            "운전면허 발급 내역이 없습니다. 입력한 정보를 확인해 주세요.",
                          confirmButtonText: "확인"
                        });
                        break;
                      case "910771":
                        Dialog.alert({
                          message:
                            "만료된 운전면허 입니다. 입력한 정보를 확인해 주세요.",
                          confirmButtonText: "확인"
                        });
                        break;
                      case "910772":
                        Dialog.alert({
                          message:
                            "만료된 운전면허 입니다. 입력한 정보를 확인해 주세요.",
                          confirmButtonText: "확인"
                        });
                        break;
                      case "910773":
                        Dialog.alert({
                          message:
                            "취소된 운전면허 입니다. 입력한 정보를 확인해 주세요.",
                          confirmButtonText: "확인"
                        });
                        break;
                      case "910774":
                        Dialog.alert({
                          message:
                            "취소된 운전면허 입니다. 입력한 정보를 확인해 주세요.",
                          confirmButtonText: "확인"
                        });
                        break;
                      case "910775":
                        Dialog.alert({
                          message:
                            "정지된 운전면허 입니다. 입력한 정보를 확인해 주세요.",
                          confirmButtonText: "확인"
                        });
                        break;
                      case "910776":
                        Dialog.alert({
                          message:
                            "취소된 운전면허 입니다. 입력한 정보를 확인해 주세요.",
                          confirmButtonText: "확인"
                        });
                        break;
                      case "910777":
                        Dialog.alert({
                          message:
                            "정지된 운전면허 입니다. 입력한 정보를 확인해 주세요.",
                          confirmButtonText: "확인"
                        });
                        break;
                      case "910778":
                        Dialog.alert({
                          message: "입력한 정보(이름)를 확인해 주세요.",
                          confirmButtonText: "확인"
                        });
                        break;
                      case "910779":
                        Dialog.alert({
                          message: "입력한 정보(생년월일)를 확인해 주세요.",
                          confirmButtonText: "확인"
                        });
                        break;
                      case "910780":
                        Dialog.alert({
                          message:
                            "입력한 정보(운전면허 정보)를 확인해 주세요.",
                          confirmButtonText: "확인"
                        });
                        break;
                      case "910781":
                        Dialog.alert({
                          message:
                            "입력한 정보(운전면허 종별)를 확인해 주세요.",
                          confirmButtonText: "확인"
                        });
                        break;
                      default:
                        Dialog.alert({
                          message: "입력한 정보를 확인해 주세요.",
                          confirmButtonText: "확인"
                        });
                        break;
                    }
                  }
                })
                .catch(err => {
                  console.log(err);
                  Dialog.alert({
                    message: "실행할 수 없습니다.",
                    confirmButtonText: "확인"
                  });
                });
            } else {
              Dialog.alert({
                message: "생년월일을 입력하세요.",
                confirmButtonText: "확인"
              });
            }
          } else {
            Dialog.alert({
              message: "면허번호 10자리를 입력하세요.",
              confirmButtonText: "확인"
            });
          }
        } else {
          Dialog.alert({
            message: "발급 지역을 선택하세요.",
            confirmButtonText: "확인"
          });
        }
      } else {
        Dialog.alert({
          message: "면허종별을 선택하세요.",
          confirmButtonText: "확인"
        });
      }
    },
    onConfirm(value) {
      this.$store.commit("sessionEnd");
      this.$store.commit("timeOutFun");
      let v = value.replace(/[^0-9]/g, "");
      this.value = v;
      this.showPicker = false;
      this.validate1 = true;
    },

    maxLengthCheck(object) {
      if (object.value.length > object.maxLength) {
        object.value = object.value.slice(0, object.maxLength);
      }
    },
    nextInput() {
      this.checkNumber(event);
      if (this.$refs.input.value.length === 2) {
        this.checkNumber(event);
        if (this.$refs.input.value.length === 2) {
          event.returnValue = false;
          this.$refs.input2.focus();
        }
      }
    },
    nextInput2() {
      this.checkNumber(event);
      if (this.$refs.input2.value.length === 6) {
        this.checkNumber(event);
        if (this.$refs.input2.value.length === 6) {
          event.returnValue = false;
          this.$refs.input3.focus();
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
    touchWindows() {
      event.stopPropagation();
      let e = event.target.className.indexOf("input");
      if (e === -1) {
        this.$refs.input.blur();
        this.$refs.input2.blur();
        this.$refs.input3.blur();
        setTimeout(() => {
          this.focusOn = false;
        }, 100);
      }
    },
    moveWindows() {
      event.stopPropagation();

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
  }
};
</script>
<style>
.focusOn {
  display: none !important;
}
</style>
