<template>
  <div class="prov">
    <TopMenu />

    <div class="prov-main">
      <div class="prov-main-title">
        <p>예약정보 / 약관동의</p>
      </div>

      <div class="prov-main-info">
        <UserInfo />

        <div class="prov-main-info-box">
          <div class="prov-main-info-box-title">이용약관</div>

          <!-- <div class="prov-main-info-box-checkbox-all" @click="toggleAll">
            <van-checkbox
              ref="checkbox_all"
              name="d"
              v-model="allChecked"
              icon-size="14px"
              shape="squre"
            ></van-checkbox>
            전체약관동의
          </div> -->
          <van-checkbox-group
            v-model="result"
            ref="checkboxGroup"
            class="prov-main-info-box-checkboxGroup"
          >
            <!-- <div class="line"></div> -->
            <div class="prov-main-info-box-checkbox-select">
              <van-checkbox
                ref="checkbox_1"
                shape="squre"
                name="a"
                icon-size="14px"
                v-model="checked_1"
                @click="toggle('a')"
              ></van-checkbox>
              <div class="checkbox-content">
                <span class="choice">(필수)</span>
                <div class="title">
                  위치/영상정보 수집장치 부착사실 고지
                </div>
              </div>
              <van-icon name="arrow" class="goProv" @click="showPopup1" />
              <van-popup
                v-model="show1"
                closeable
                @click-close-icon="closePop1"
                class="consent-popup"
                :close-on-click-overlay="false"
                ><Consent @sentToAgreement="getAgreement1"
              /></van-popup>
            </div>

            <div class="prov-main-info-box-checkbox-select">
              <van-checkbox
                ref="checkbox_2"
                shape="squre"
                name="b"
                icon-size="14px"
                v-model="checked_2"
                @click="toggle('b')"
              ></van-checkbox>
              <div class="checkbox-content">
                <span class="choice">(필수)</span>
                <div class="title">
                  시승차 이용 및 서비스 이용에 따른 주요 고지사항 및 이용약관
                  안내
                </div>
              </div>
              <van-icon name="arrow" class="goProv" @click="showPopup2" />
              <van-popup
                v-model="show2"
                closeable
                @click-close-icon="closePop2"
                class="consent-popup"
                ><Consent2 @sentToAgreement="getAgreement2"
              /></van-popup>
            </div>

            <div class="prov-main-info-box-checkbox-select">
              <van-checkbox
                ref="checkbox_3"
                name="c"
                icon-size="14px"
                shape="squre"
                v-model="checked_3"
                @click="toggle('c')"
              >
              </van-checkbox>
              <div class="checkbox-content">
                <span class="choice">(필수)</span>
                <div class="title">
                  개인정보 수집 및 이용안내
                </div>
              </div>
              <van-icon name="arrow" class="goProv" @click="showPopup3" />
              <van-popup
                v-model="show3"
                closeable
                @click-close-icon="closePop3"
                class="consent-popup"
                ><Consent3 @sentToAgreement="getAgreement3"
              /></van-popup>
            </div>

            <div class="prov-main-info-box-checkbox-select">
              <van-checkbox
                ref="checkbox_4"
                name="d"
                icon-size="14px"
                shape="squre"
                v-model="checked_4"
                @click="toggle('d')"
              ></van-checkbox>
              <div class="checkbox-content">
                <span class="choice">(선택)</span>
                <div class="title">
                  차량구입 관련 상담 및 각종 정보제공 안내 <br /><span
                    class="addContent"
                    >(마케팅 활용 및 광고성 정보 전송)</span
                  >
                </div>
              </div>
              <van-icon name="arrow" class="goProv" @click="showPopup4" />
              <van-popup
                v-model="show4"
                closeable
                @click-close-icon="closePop4"
                class="consent-popup"
                ><Consent4 @sentToAgreement="getAgreement4"
              /></van-popup>
            </div>
          </van-checkbox-group>
        </div>

        <div class="prov-main-info-box">
          <div class="prov-main-info-box-title">서명</div>
          <CanvasView class="canvas" ref="canvas" @drawingTrue="drawingTrue" />
        </div>

        <div class="prov-main-info-button" @click="sendFormAndMove">
          다음
        </div>
      </div>
    </div>

    <div class="prov-bottom">
      <FooterBar />
    </div>
  </div>
</template>

<script>
import TopMenu from "../TopMenu";
import FooterBar from "../FooterBar";
import CanvasView from "./CanvasView";
import UserInfo from "./UserInfo";
import Consent from "./consent/Consent";
import Consent2 from "./consent/Consent2";
import Consent3 from "./consent/Consent3";
import Consent4 from "./consent/Consent4";

import {
  Icon,
  Checkbox,
  CheckboxGroup,
  Collapse,
  CollapseItem,
  Popup,
  Dialog
} from "vant";

export default {
  components: {
    [Icon.name]: Icon,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Collapse.name]: Collapse,
    [Dialog.name]: Dialog,
    [CollapseItem.name]: CollapseItem,
    [Popup.name]: Popup,
    TopMenu,
    FooterBar,
    CanvasView,
    UserInfo,
    Consent,
    Consent2,
    Consent3,
    Consent4
  },
  data() {
    return {
      result: [],
      allChecked: false,
      checked_1: false,
      checked_2: false,
      checked_3: false,
      checked_4: false,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      drawing: false,
      drawingCode: ""
    };
  },
  created() {
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
    this.$store.commit("timeOutFun");
    window.scrollTo(0, 0);
    window.removeEventListener("touchstart", this.touchWindows);
    window.removeEventListener("touchmove", this.moveWindows);
    this.$store.commit("sessionReload");
    this.$store.commit("timeOutFun");
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
    toggle(name) {
      this.$store.commit("sessionEnd");
      this.$store.commit("timeOutFun");
      if (name === "a") {
        !this.checked_1 ? (this.checked_1 = true) : (this.checked_1 = false);
        this.$refs.checkbox_1.toggle(this.checked_1);
        this.checked_1 ? (this.show1 = true) : (this.show1 = false);
      }
      if (name === "b") {
        !this.checked_2 ? (this.checked_2 = true) : (this.checked_2 = false);
        this.$refs.checkbox_2.toggle(this.checked_2);
        this.checked_2 ? (this.show2 = true) : (this.show2 = false);
      }
      if (name === "c") {
        !this.checked_3 ? (this.checked_3 = true) : (this.checked_3 = false);
        this.$refs.checkbox_3.toggle(this.checked_3);
        this.checked_3 ? (this.show3 = true) : (this.show3 = false);
      }
      if (name === "d") {
        !this.checked_4 ? (this.checked_4 = true) : (this.checked_4 = false);
        this.$refs.checkbox_4.toggle(this.checked_4);
        this.checked_4 ? (this.show4 = true) : (this.show4 = false);
      }

      // if (
      //   this.checked_1 &&
      //   this.checked_2 &&
      //   this.checked_3 &&
      //   this.checked_4
      // ) {
      //   this.allChecked = true;
      //   this.$refs.checkbox_all.toggle(this.allChecked);
      // } else {
      //   this.allChecked = false;
      //   this.$refs.checkbox_all.toggle(this.allChecked);
      // }
    },
    // toggleAll() {
    //   this.$store.commit("sessionEnd");
    //   if (!this.allChecked) {
    //     this.allChecked = true;
    //     this.checked_1 = true;
    //     this.checked_2 = true;
    //     this.checked_3 = true;
    //     this.checked_4 = true;
    //   } else {
    //     this.allChecked = false;
    //     this.checked_1 = false;
    //     this.checked_2 = false;
    //     this.checked_3 = false;
    //     this.checked_4 = false;
    //   }
    //   this.$refs.checkboxGroup.toggleAll({
    //     checked: this.allChecked,
    //     skipDisabled: true
    //   });
    // },
    sendFormAndMove() {
      this.$store.commit("sessionEnd");
      this.$store.commit("timeOutFun");
      let userChecking = {
        tsrdPrctNo: this.$store.state.userInfo.bookNumber, // 임시
        procInfoLocCamYn: this.checked_1 === true ? "Y" : "N",
        prctInfoCjgtAgrYn: this.checked_2 === true ? "Y" : "N",
        prctInfoAgrYn: this.checked_3 === true ? "Y" : "N",
        prctMarketingYn: this.checked_4 === true ? "Y" : "N",
        signImg: ""
      };

      if (this.checked_1 && this.checked_2 && this.checked_3) {
        if (this.drawing) {
          userChecking.signImg = this.$refs.canvas.sendImgCode();

          this.$axios
            .post(
              "https://hyundai-driving.mocean.com/mobile/agreement.do",
              userChecking
            )
            .then((res, req) => {
              console.log(res);
              this.$store.commit("sessionSavedPage", "certification");

              this.$router.replace("certification");
              this.$store.commit("agreementRes", res.data);
            });
        } else {
          Dialog.alert({
            message: "서명 입력 후 서비스 이용이 가능합니다.",
            confirmButtonText: "확인"
          });
        }
      } else {
        Dialog.alert({
          message: "약관 동의 후 서비스 이용이 가능합니다.",
          confirmButtonText: "확인"
        });
      }
    },
    showPopup1() {
      this.$store.commit("sessionEnd");
      this.$store.commit("timeOutFun");
      this.show1 = true;
    },
    showPopup2() {
      this.$store.commit("sessionEnd");
      this.$store.commit("timeOutFun");
      this.show2 = true;
    },
    showPopup3() {
      this.$store.commit("sessionEnd");
      this.$store.commit("timeOutFun");
      this.show3 = true;
    },
    showPopup4() {
      this.$store.commit("sessionEnd");
      this.$store.commit("timeOutFun");
      this.show4 = true;
    },
    getAgreement1() {
      this.$store.commit("sessionEnd");
      this.$store.commit("timeOutFun");
      this.show1 = false;
      this.checked_1 = true;
      this.$refs.checkbox_1.toggle(true);
    },
    getAgreement2() {
      this.$store.commit("sessionEnd");
      this.$store.commit("timeOutFun");
      this.show2 = false;
      this.checked_2 = true;
      this.$refs.checkbox_2.toggle(true);
      this.toggle();
    },
    getAgreement3() {
      this.$store.commit("sessionEnd");
      this.$store.commit("timeOutFun");
      this.show3 = false;
      this.checked_3 = true;
      this.$refs.checkbox_3.toggle(true);
      this.toggle();
    },
    getAgreement4() {
      this.$store.commit("sessionEnd");
      this.$store.commit("timeOutFun");
      this.show4 = false;
      this.checked_4 = true;
      this.$refs.checkbox_4.toggle(true);
      this.toggle();
    },
    drawingTrue(v) {
      this.drawing = v;
      this.$store.commit("sessionEnd");
      this.$store.commit("timeOutFun");
    },
    closePop1() {
      this.checked_1 = false;
      this.$refs.checkbox_1.toggle(false);
    },
    closePop2() {
      this.checked_2 = false;
      this.$refs.checkbox_2.toggle(false);
    },
    closePop3() {
      this.checked_3 = false;
      this.$refs.checkbox_3.toggle(false);
    },
    closePop4() {
      this.checked_4 = false;
      this.$refs.checkbox_4.toggle(false);
    }
  }
};
</script>

<style>
.consent-popup {
  width: 85%;
  /* height: 90%; */
  padding: 20px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
}
</style>
