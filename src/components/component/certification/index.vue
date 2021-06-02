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
            <van-dropdown-menu
              active-color="#1989fa"
              class="cert-main-info-type-num-dropdown"
            >
              <van-dropdown-item
                v-model="value1"
                :options="option1"
                class="cert-main-info-type-num-dropdown-menu"
              />
            </van-dropdown-menu>

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
import {
  Icon,
  Field,
  Button,
  DropdownMenu,
  DropdownItem,
  RadioGroup,
  Radio,
  Popup
} from "vant";

import TopMenu from "@/components/component/TopMenu.vue";
import getDate from "../commonJS/getDate";
import DatetiemPicker from "./DatetiemPicker";
import FooterBar from "../FooterBar";

export default {
  components: {
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Button.name]: Button,
    [Field.name]: Field,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
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
      value1: 0,
      option1: [
        { text: "서울", value: 0 },
        { text: "경기", value: 1 },
        { text: "제주", value: 2 },
        { text: "제주", value: 3 },
        { text: "제주", value: 4 },
        { text: "제주", value: 5 }
      ],
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
    }
  }
};
</script>
