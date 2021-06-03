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
                @cancel="showPicker = false"
                @confirm="onConfirm"
                confirm-button-text="Confirm"
                cancel-button-text="Cancel"
              />
            </van-popup>

            <input
              type="text"
              class="cert-main-info-type-num-input"
              placeholder="숫자를 입력하세요"
            />
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
      </div>
    </div>

    <div class="cert-bottom">
      <FooterBar />
    </div>
  </div>
</template>

<script>
import { Icon, Field, Button, RadioGroup, Radio, Popup, Picker } from "vant";

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
      selectDay: false
    };
  },
  created() {
    this.years = getDate().year;
    this.month = getDate().month + 1;
    this.day = getDate().day;
    console.log(this.years, this.month);
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
    parentDate(show, data) {
      this.show = show;
      let dateValue = new Date(data);
      this.years = dateValue.getFullYear();
      this.month = dateValue.getMonth() + 1;
      this.day = dateValue.getDate();

      this.selectDay = true;
    },
    sendFormAndMove() {
      this.$router.push("userPage");
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    }
  }
};
</script>
