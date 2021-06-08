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
              <van-radio name="1">2종 보통</van-radio>
              <van-radio name="2">1종 소형</van-radio>
              <van-radio name="3">1종 보통</van-radio>
              <van-radio name="4">1종 대형</van-radio>
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
            <van-popup v-model="showPicker" round position="bottom">
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
              <van-field
                readonly
                clickable
                :value="keyValue"
                @touchstart.native.stop="keypadShow = true"
                ref="numberKeyinput"
              />
              <van-number-keyboard
                v-model="keyValue"
                :show="keypadShow"
                :maxlength="10"
                @blur="closeKeypad"
                close-button-text="Close"
              />
            </div>

            <!-- <input
              type="text"
              class="cert-main-info-type-num-input"
              placeholder="숫자를 입력하세요"
            /> -->
          </div>
          <div class="cert-main-info-type-title">발급일</div>
          <div
            class="cert-main-info-type-num cert-main-info-type-day"
            @click="showPop"
            :showPop="this.show"
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

        <van-popup v-model="alert" class="alert">
          <p>발급 지역을 선택하세요.</p>
          <button @click="closeAlert">확인</button>
        </van-popup>

        <van-popup v-model="alert2" class="alert"
          ><p>면허번호 10자리를 입력하세요.</p>
          <button @click="closeAlert2">확인</button></van-popup
        >

        <van-popup v-model="alert3" class="alert"
          ><p>발급일을 입력하세요.</p>
          <button @click="closeAlert3">확인</button></van-popup
        >
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
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [NumberKeyboard.name]: NumberKeyboard,
    TopMenu,
    DatetiemPicker,
    FooterBar
  },
  data() {
    return {
      checked: "1",
      years: "",
      month: "",
      day: "",
      username: "",
      password: "",
      value: "",
      showPicker: false,
      columns: ["서울", "경기", "인천", "부산", "광주", "전라도", "강원도"],
      show: false,
      selectDay: false,
      keypadShow: false,
      keyValue: "",
      validate1: false,
      validate2: false,
      validate3: false,
      alert: false,
      alert2: false,
      alert3: false
    };
  },
  created() {
    this.years = getDate().year;
    this.month = getDate().month + 1;
    this.day = getDate().day;
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    showPop() {
      this.$store.state.show = true;
      this.show = this.$store.state.show;
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
        if (this.validate2) {
          if (this.validate3) {
            this.$router.push("userPage");
            console.log(
              this.checked,
              this.value,
              this.keyValue,
              this.years,
              this.month,
              this.day
            );
          } else {
            this.alert3 = true;
          }
        } else {
          this.alert2 = true;
        }
      } else {
        this.alert = true;
      }
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
      this.validate1 = true;
    },
    closeAlert() {
      this.alert = false;
    },
    closeAlert2() {
      this.alert2 = false;
    },
    closeAlert3() {
      this.alert3 = false;
    },
    closeKeypad() {
      this.keypadShow = false;
      if (this.keyValue.length === 10) {
        this.validate2 = true;
      } else {
        this.validate2 = false;
      }
    }
  }
};
</script>
