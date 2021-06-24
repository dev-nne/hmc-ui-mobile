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
                default-index="1"
                item-height="36px"
                @cancel="showPicker = false"
                @confirm="onConfirm"
                confirm-button-text="확인"
                cancel-button-text="취소"
              />
            </van-popup>

            <div class="cert-main-info-type-num-input">
              <input
                type="number"
                class="input"
                v-model="keyValue"
                placeholder="면허번호 10자리"
                pattern="\d*"
                maxlength="10"
                oninput="javascript: if (this.value.length >
              this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                ref="numberKeyinput"
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
      <FooterBar />
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
      checked: "32",
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
      keyValue: "",
      validate1: false,
      validate2: false,
      validate3: false
    };
  },
  created() {
    this.years = getDate().year;
    this.month = getDate().month + 1;
    this.day = getDate().day;
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    showPop() {
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
      if (this.validate1) {
        if (this.keyValue.length === 10) {
          if (this.validate3) {
            const licenseObj = {
              // tsrdPrctNo: this.$store.state.userInfo.bookNumber,
              licenseNo: this.value + this.keyValue,
              residentName: this.$store.state.userName,
              residentDate: `${this.years.toString().slice(-2)}${
                this.month < 10 ? `0${this.month}` : `${this.month}`
              }${this.day < 10 ? `0${this.day}` : `${this.day}`}`,
              licenseConCode: this.checked
              // country: "KR",
              // language: "ko",
              // terminal: "AM"
            };
            this.$axios
              .post(
                "https://hyundai-driving.mocean.com/mobile/license.do",
                licenseObj
              )
              .then((res, req) => {
                if (res.data.resultMap.certLicense === "0") {
                  this.$router.push("userPage");
                } else {
                  Dialog.alert({
                    message: "올바른 면허정보를 입력해 주세요.",
                    confirmButtonText: "확인"
                  });
                }
              })
              .catch(err => console.log(err));
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
    },
    onConfirm(value) {
      let v = value.replace(/[^0-9]/g, "");
      this.value = v;
      this.showPicker = false;
      this.validate1 = true;
    },

    maxLengthCheck(object) {
      if (object.value.length > object.maxLength) {
        object.value = object.value.slice(0, object.maxLength);
      }
    }
  }
};
</script>
