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
                >(필수) 서비스 이용약관</van-checkbox
              ><van-icon name="arrow" class="goProv" />
            </div>

            <div class="prov-main-info-box-checkbox">
              <van-checkbox
                ref="checkbox_2"
                name="b"
                icon-size="14px"
                v-model="checked_2"
                @click="toggle('b')"
                >(필수) 개인정보 수집 · 이용에 대한 동의</van-checkbox
              ><van-icon name="arrow" class="goProv" />
            </div>

            <div class="prov-main-info-box-checkbox">
              <van-checkbox
                ref="checkbox_3"
                name="c"
                icon-size="14px"
                v-model="checked_3"
                @click="toggle('c')"
                >(필수) 위치기반 서비스 이용약관</van-checkbox
              ><van-icon name="arrow" class="goProv" />
            </div>
          </van-checkbox-group>
        </div>

        <div class="prov-main-info-box">
          <div class="prov-main-info-box-title">서명</div>
          <CanvasView class="canvas" ref="canvas" />
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

import { Icon, Checkbox, CheckboxGroup, Collapse, CollapseItem } from "vant";

export default {
  components: {
    [Icon.name]: Icon,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    TopMenu,
    FooterBar,
    CanvasView,
    UserInfo
  },
  data() {
    return {
      result: [],
      activeNames: ["0"],
      painting: false,
      allChecked: false,
      checked_1: false,
      checked_2: false,
      checked_3: false
    };
  },
  methods: {
    toggle(name) {
      console.log(name);
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
      console.log(this.result.length);
      this.$refs.checkboxGroup.toggleAll({
        checked: this.allChecked,
        skipDisabled: true
      });
    },
    sendFormAndMove() {
      this.$router.push("certification");
      this.$refs.canvas.handleSaveImg();
    }
  },
  created() {}
};
</script>

<style></style>
