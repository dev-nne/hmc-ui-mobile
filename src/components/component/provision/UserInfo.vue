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
        {{ `드라이빙 라운지 ${this.userInfo.centerName}` }}
      </div>

      <div class="userInfo-box-content">
        <p>
          {{ this.userInfo.address }}
        </p>
        <p class="number">
          <van-icon name="phone" />
          <a ref="callNum" href="tel"> {{ this.userInfo.spaceNumber }}</a>
        </p>

        <div
          class="userInfo-box-content-collapseBox"
          @click="clickCollapseBtn"
          :class="{ showPark }"
        >
          <van-icon :name="icon" class="collapseBtn"> </van-icon>
          상세보기
        </div>
        <div class="collapse" v-if="collapse">
          <p class="parking" :class="{ showPark }">주차장</p>
          <p>
            {{
              ` ${centerName[0]} ${
                centerName[1] !== undefined || null
                  ? `/
            ${centerName[1]}`
                  : " "
              } `
            }}
          </p>
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
      userInfo: {},
      centerName: "",
      showPark: false
    };
  },
  created() {
    this.userInfo = this.$store.state.userInfo;
  },
  mounted() {
    const centerName = this.userInfo.centerName; // this.userInfo.centerName;
    this.$refs.callNum.href = `tel:${this.userInfo.spaceNumber}`;
    this.$axios
      .get("static/parkingAddress.json")
      .then(res => {
        this.centerName = res.data[centerName];
        if (
          this.centerName === undefined ||
          this.centerName === "" ||
          this.centerName === null
        ) {
          this.showPark = true;
        }
      })
      .catch(err => console.log(err));
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
        }
      }

      &-collapseBox {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 5px;
        font-family: "H undaiSansHead";
        align-items: center;

        .collapseBtn {
          margin-right: 4px;
        }
      }
    }
  }
}

.showPark {
  display: none;
}
</style>
