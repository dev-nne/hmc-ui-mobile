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
            ></van-checkbox>
            전체약관동의
          </div>
          <van-checkbox-group
            v-model="result"
            ref="checkboxGroup"
            class="prov-main-info-box-checkboxGroup"
          >
            <div class="line"></div>
            <div class="prov-main-info-box-checkbox">
              <van-checkbox
                ref="checkbox_1"
                name="a"
                icon-size="14px"
                v-model="checked_1"
                @click="toggle('a')"
                ><span class="red">(필수)</span> 서비스 이용약관</van-checkbox
              ><van-icon name="arrow" class="goProv" @click="showPopup1" />
              <van-popup v-model="show1" closeable class="consent-popup" round
                ><Consent @sentToAgreement="getAgreement1"
              /></van-popup>
            </div>

            <div class="prov-main-info-box-checkbox">
              <van-checkbox
                ref="checkbox_2"
                name="b"
                icon-size="14px"
                v-model="checked_2"
                @click="toggle('b')"
                ><span class="red">(필수)</span> 개인정보 수집 · 이용에 대한
                동의</van-checkbox
              ><van-icon name="arrow" class="goProv" @click="showPopup2" />
              <van-popup v-model="show2" closeable round class="consent-popup"
                ><Consent2 @sentToAgreement="getAgreement2"
              /></van-popup>
            </div>

            <div class="prov-main-info-box-checkbox">
              <van-checkbox
                ref="checkbox_3"
                name="c"
                icon-size="14px"
                v-model="checked_3"
                @click="toggle('c')"
                ><span class="red">(필수)</span> 위치기반 서비스
                이용약관</van-checkbox
              ><van-icon name="arrow" class="goProv" @click="showPopup3" />
              <van-popup v-model="show3" closeable round class="consent-popup"
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
      drawing: false
    };
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
      if (this.allChecked) {
        if (this.drawing) {
          this.$router.push("certification");
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
