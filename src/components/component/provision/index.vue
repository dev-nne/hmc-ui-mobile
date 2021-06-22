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

          <div class="prov-main-info-box-checkbox-all" @click="toggleAll">
            <van-checkbox
              ref="checkbox_all"
              name="d"
              v-model="allChecked"
              icon-size="14px"
              shape="squre"
            ></van-checkbox>
            전체약관동의
          </div>
          <van-checkbox-group
            v-model="result"
            ref="checkboxGroup"
            class="prov-main-info-box-checkboxGroup"
          >
            <div class="line"></div>
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
                  시승차 이용 및 서비스 이용에 따른 주요 고지사항 및 이용약관
                  안내
                </div>
              </div>
              <van-icon name="arrow" class="goProv" @click="showPopup1" />
              <van-popup v-model="show1" closeable class="consent-popup"
                ><Consent @sentToAgreement="getAgreement1"
              /></van-popup>
            </div>

            <div class="prov-main-info-box-checkbox-select">
              <van-checkbox
                ref="checkbox_2"
                name="b"
                icon-size="14px"
                shape="squre"
                v-model="checked_2"
                @click="toggle('b')"
              >
              </van-checkbox>
              <div class="checkbox-content">
                <span class="choice">(필수)</span>
                <div class="title">
                  개인정보 수집 및 이용안내
                </div>
              </div>
              <van-icon name="arrow" class="goProv" @click="showPopup2" />
              <van-popup v-model="show2" closeable class="consent-popup"
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
              <van-icon name="arrow" class="goProv" @click="showPopup3" />
              <van-popup v-model="show3" closeable class="consent-popup"
                ><Consent3 @sentToAgreement="getAgreement3"
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

        <van-popup v-model="alert" class="alert">
          <p>약관 동의 후 서비스 이용이 가능합니다.</p>
          <button @click="closeAlert">확인</button>
        </van-popup>

        <van-popup v-model="alert2" class="alert"
          ><p>서명 입력 후 서비스 이용이 가능합니다.</p>
          <button @click="closeAlert2">확인</button></van-popup
        >
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

import {
  Icon,
  Checkbox,
  CheckboxGroup,
  Collapse,
  CollapseItem,
  Popup,
  Notify
} from "vant";

export default {
  components: {
    [Icon.name]: Icon,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Popup.name]: Popup,
    [Notify.name]: Notify,
    TopMenu,
    FooterBar,
    CanvasView,
    UserInfo,
    Consent,
    Consent2,
    Consent3
  },
  data() {
    return {
      result: [],
      allChecked: false,
      checked_1: false,
      checked_2: false,
      checked_3: false,
      show1: false,
      show2: false,
      show3: false,
      alert: false,
      alert2: false,
      drawing: false,
      drawingCode: ""
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },

  methods: {
    toggle(name) {
      if (name === "a") {
        !this.checked_1 ? (this.checked_1 = true) : (this.checked_1 = false);
        this.$refs.checkbox_1.toggle(this.checked_1);
      }
      if (name === "b") {
        !this.checked_2 ? (this.checked_2 = true) : (this.checked_2 = false);
        this.$refs.checkbox_2.toggle(this.checked_2);
      }
      if (name === "c") {
        !this.checked_3 ? (this.checked_3 = true) : (this.checked_3 = false);
        this.$refs.checkbox_3.toggle(this.checked_3);
      }

      if (this.checked_1 && this.checked_2 && this.checked_3) {
        this.allChecked = true;
        this.$refs.checkbox_all.toggle(this.allChecked);
      } else {
        this.allChecked = false;
        this.$refs.checkbox_all.toggle(this.allChecked);
      }
    },
    toggleAll() {
      if (!this.allChecked) {
        this.allChecked = true;
        this.checked_1 = true;
        this.checked_2 = true;
        this.checked_3 = true;
      } else {
        this.allChecked = false;
        this.checked_1 = false;
        this.checked_2 = false;
        this.checked_3 = false;
      }
      this.$refs.checkboxGroup.toggleAll({
        checked: this.allChecked,
        skipDisabled: true
      });
    },
    sendFormAndMove() {
      let userChecking = {
        tsrdPrctNo: this.$store.state.userInfo.bookNumber, // 임시
        prctInfoAgrYn: this.checked_1 === true ? "Y" : "N",
        prctInfoCjgtAgrYn: this.checked_2 === true ? "Y" : "N",
        prctMarketingYn: this.checked_3 === true ? "Y" : "N",
        signImg: ""
      };

      if (this.checked_1 && this.checked_2) {
        if (this.drawing) {
          userChecking.signImg = this.$refs.canvas.sendImgCode();
          console.log(userChecking);
          if (!this.$store.state.isLocal) {
            this.$axios
              .post(
                "https://hyundai-driving.mocean.com/mobile/agreement.do",
                userChecking
              )
              .then((res, req) => {
                console.log(res);
                this.$router.push("certification");
                this.$store.commit("agreementRes", res.data);
              });
          }
          this.checked_1 = false;
          this.checked_2 = false;
          this.checked_3 = false;
          this.drawing = false;
        } else {
          this.alert2 = true;
        }
      } else {
        this.alert = true;
      }
    },
    showPopup1() {
      this.show1 = true;
    },
    showPopup2() {
      this.show2 = true;
    },
    showPopup3() {
      this.show3 = true;
    },
    getAgreement1() {
      this.show1 = false;
      this.checked_1 = true;
      this.$refs.checkbox_1.toggle(true);
      this.toggle();
    },
    getAgreement2() {
      this.show2 = false;
      this.checked_2 = true;
      this.$refs.checkbox_2.toggle(true);
      this.toggle();
    },
    getAgreement3() {
      this.show3 = false;
      this.checked_3 = true;
      this.$refs.checkbox_3.toggle(true);
      this.toggle();
    },
    closeAlert() {
      this.alert = false;
    },
    closeAlert2() {
      this.alert2 = false;
    },
    drawingTrue(v) {
      this.drawing = v;
    }
  }
};
</script>

<style>
.consent-popup {
  width: 85%;
  height: 90%;
  padding: 20px;
  overflow: scroll;
}
</style>
