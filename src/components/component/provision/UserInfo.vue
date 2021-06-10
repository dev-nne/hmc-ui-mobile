<template>
  <div class="userInfo">
    <div class="userInfo-box">
      <div class="userInfo-box-title">시승 일정</div>
      <div class="userInfo-box-time">
        {{ `${this.userInfo.bookDay} ${this.userInfo.bookTime}` }}
      </div>
    </div>

    <div class="userInfo-box">
      <div class="userInfo-box-title">
        {{ `${this.userInfo.centerName} ${this.userInfo.spaceName}` }}
      </div>

      <div class="userInfo-box-content">
        <p>
          {{ this.userInfo.address }}
        </p>
        <p class="number">
          <van-icon name="phone" />
          <a ref="callNum" href="tel"> {{ this.userInfo.spaceNumber }}</a>
        </p>

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
      icon: "arrow-down",
      userInfo: {}
    };
  },
  created() {
    this.userInfo = this.$store.state.userInfo;
  },
  mounted() {
    this.$refs.callNum.href = `tel:${this.userInfo.spaceNumber}`;
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

<style lang="less">
.userInfo {
  &-box {
    background: white;
    padding: 15px;
    margin-bottom: 15px;

    &-title {
      font-weight: 600;
      padding-bottom: 10px;
      font-size: 14px;
      font-family: "HyundaiSansHead";
    }

    &-time {
      font-size: 14px;
      margin-bottom: 5px;
    }
    &-content {
      font-size: 12px;
      line-height: 18px;
      width: 100%;

      .number {
        display: flex;
        align-items: center;
        margin-top: 2px;

        a {
          color: #333;
          margin-left: 2px;
          text-decoration: underline;
        }
      }

      &-collapseBox {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 5px;
        color: #002c5e;
        font-weight: 600;
      }
    }
  }
}
</style>
