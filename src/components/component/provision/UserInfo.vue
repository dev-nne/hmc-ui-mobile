<template>
  <div class="userInfo">
    <div class="userInfo-box">
      <div class="userInfo-box-title">시승 일정</div>
      <div class="userInfo-box-time">
        5.17.월 13:00 ~ 14:00(1시간)
      </div>
    </div>

    <div class="userInfo-box">
      <div class="userInfo-box-title">드라이빙라운지 성수</div>

      <div class="userInfo-box-content">
        <p>서울 성동구 성수이로 134 현대자동차 동부서비스센터 1층</p>
        <p class="number"><van-icon name="phone" /> 02-3409-7365</p>

        <div class="userInfo-box-content-collapseBox">
          <van-icon :name="icon" class="collapseBtn" @click="clickCollapseBtn">
            상세보기
          </van-icon>
        </div>
        <div class="collapse" v-if="collapse">
          <p class="parking">주차장</p>
          <p>서울 성동구 성수이로 134 현대자동차 동부서비스센터 지하 1층</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "vant";
export default {
  components: {
    [Icon.name]: Icon
  },
  data() {
    return {
      collapse: false,
      icon: "arrow-down"
    };
  },
  methods: {
    clickCollapseBtn() {
      this.collapse = !this.collapse;
      if (this.collapse) this.icon = "arrow-up";
      else this.icon = "arrow-down";
    }
  }
};
</script>

<style></style>
