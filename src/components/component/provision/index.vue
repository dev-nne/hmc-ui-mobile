<template>
  <div class="prov">
    <TopMenu />

    <div class="prov-main">
      <div class="prov-main-title">
        <p>예약정보 / 약관동의</p>
      </div>

      <div class="prov-main-info">
        <div class="prov-main-info-box">
          <div class="prov-main-info-box-title">시승 예약 시간</div>
          <div class="prov-main-info-box-time">
            5.17.월 13:00 ~ 14:00(1시간)
          </div>
        </div>

        <div class="prov-main-info-box">
          <div class="prov-main-info-box-title">드라이빙라운지 성수</div>

          <div class="prov-main-info-box-content">
            <p>서울 성동구 성수이로 134 현대자동차 동부서비스센터 1층</p>
            <p><van-icon name="phone" /> 02-3409-7365</p>
            <p class="parking">주차장</p>
            <p>서울 성동구 성수이로 134 현대자동차 동부서비스센터 지하 1층</p>
          </div>
        </div>

        <div class="prov-main-info-box">
          <div class="prov-main-info-box-title">이용약관</div>

          <van-checkbox-group
            v-model="result"
            ref="checkboxGroup"
            class="prov-main-info-box-checkboxGroup"
          >
            <div class="prov-main-info-box-checkbox-all" @click="toggleAll">
              <van-checkbox name="d" icon-size="14px"></van-checkbox>
              전체약관동의
            </div>

            <div class="line"></div>
            <div class="prov-main-info-box-checkbox">
              <van-checkbox name="a" icon-size="14px"
                >(필수) 서비스 이용약관</van-checkbox
              ><van-icon name="arrow" class="goProv" />
            </div>

            <div class="prov-main-info-box-checkbox">
              <van-checkbox name="b" icon-size="14px"
                >(필수) 개인정보 수집 · 이용에 대한 동의</van-checkbox
              ><van-icon name="arrow" class="goProv" />
            </div>

            <div class="prov-main-info-box-checkbox">
              <van-checkbox name="c" icon-size="14px"
                >(필수) 위치기반 서비스 이용약관</van-checkbox
              ><van-icon name="arrow" class="goProv" />
            </div>
          </van-checkbox-group>
        </div>

        <div class="prov-main-info-box">
          <div class="prov-main-info-box-title">서명</div>
          <CanvasView class="canvas" />
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
    CanvasView
  },
  data() {
    return {
      result: [],
      activeNames: ["0"],
      painting: false
    };
  },
  methods: {
    toggleAll() {
      this.$refs.checkboxGroup.toggleAll("true");
    },
    sendFormAndMove() {
      this.$router.push("certification");
    }
  },
  created() {}
};
</script>

<style></style>
