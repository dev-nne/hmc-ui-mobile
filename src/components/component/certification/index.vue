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
              <van-radio name="1" shape="square">2종 보통</van-radio>
              <van-radio name="2" shape="square">1종 소형</van-radio>
              <van-radio name="3" shape="square">1종 보통</van-radio>
              <van-radio name="4" shape="square">1종 대형</van-radio>
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
          <div class="cert-main-info-type-title">발급일</div>
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
  Toast,
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
            if (!this.$store.state.isLocal) {
              const licenseObj = {
                tsrdPrctNo: this.$store.state.userInfo.bookNumber,
                licenseNo: this.value + this.keyValue,
                residentName: this.$store.state.agreementInfo.userName,
                residentDate: `${this.years}${this.month}${this.day}`,
                licenseConCode: this.checked, // 이 부분 면허종별 코드 맞나요~?~?~? 1종 2종 이런거,,,
                country: "{{country}}",
                language: "{{language}}",
                terminal: "{{terminal}}"
              };

              console.log(licenseObj.licenseNo);
              this.$axios
                // .post("/static/bookingInfo.json", userChecking)
                .post(
                  // "http://192.168.10.199:8080/mobile/license.do",
                  "https://hyundai-driving.mocean.com/mobile/license.do",
                  licenseObj
                )
                .then((res, req) => {
                  console.log(res);
                  this.$router.push("userPage");
                })
                .catch(err => console.log(err));
              // this.$axios.get("/static/licenseInfo.json").then(res => {
              //   const code = res.data.code;
              //   if (code === "00") {
              //     this.$router.push("userPage");
              //   } else if (code === "01") {
              //     Toast(
              //       "운전면허 발급 내역이 없습니다. 입력한 정보를 확인해 주세요."
              //     );
              //   } else if (code === "01") {
              //     Toast(
              //       "만료된 운전면허 입니다. 입력한 정보를  확인해 주세요."
              //     );
              //   } else if (code === "02") {
              //     Toast(
              //       "만료된 운전면허 입니다. 입력한 정보를  확인해 주세요."
              //     );
              //   } else if (code === "03") {
              //     Toast(
              //       "취소된 운전면허 입니다. 입력한 정보를  확인해 주세요."
              //     );
              //   } else if (code === "04") {
              //     Toast(
              //       "취소된 운전면허 입니다. 입력한 정보를  확인해 주세요."
              //     );
              //   } else if (code === "11") {
              //     Toast(
              //       "정지된 운전면허 입니다. 입력한 정보를  확인해 주세요."
              //     );
              //   } else if (code === "12") {
              //     Toast(
              //       "취소된 운전면허 입니다. 입력한 정보를  확인해 주세요."
              //     );
              //   } else if (code === "13") {
              //     Toast(
              //       "정지된 운전면허 입니다. 입력한 정보를  확인해 주세요."
              //     );
              //   } else if (code === "14") {
              //     Toast("입력한 정보(이름)를  확인해 주세요.");
              //   } else if (code === "21") {
              //     Toast("입력한 정보(생년월일)를  확인해 주세요.");
              //   } else if (code === "22") {
              //     Toast("입력한 정보를  확인해 주세요. ");
              //   } else if (code === "23") {
              //     Toast("Some messages");
              //   } else if (code === "24") {
              //     Toast("입력한 정보(면허종류)를  확인해 주세요.");
              //   } else {
              //     Toast("입력한 정보를  확인해 주세요.");
              //   }
              // });
            }
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
      let v = value.replace(/[^0-9]/g, "");
      this.value = v;
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
    maxLengthCheck(object) {
      if (object.value.length > object.maxLength) {
        object.value = object.value.slice(0, object.maxLength);
      }
    }
  }
};
</script>
