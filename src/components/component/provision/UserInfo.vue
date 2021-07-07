<template>
  <div class="userInfo">
    <div class="userInfo-box">
      <div class="userInfo-box-title">시승 일정</div>
      <div class="userInfo-box-time">
        {{ `${this.userInfo.bookDay} ${this.userInfo.bookTime}` }}
      </div>
      <div class="userInfo-box-ment">
        ※ 시승차 정비,이동시간 등이 모두 포함된 시간으로 실제 시승 가능 시간은
        30~40분입니다. 다음 고객님을 위해 “시승 종료 시간 30분 전 반납”
        부탁드립니다.
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
  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let bookingId = localStorage.getItem("bookingId");

    const payload = {
      resData: userInfo,
      booking: bookingId
    };
    this.$store.commit("userInfoSetting", payload);
    const centerName = this.userInfo.centerName;
    this.userInfo = this.$store.state.userInfo;
    this.$refs.callNum.href = `tel:${this.userInfo.spaceNumber}`;
    this.$axios
      .get("static/parkingAddress.json")
      .then(res => {
        this.centerName = res.data[centerName];
        this.$store.state.latitude = res.data[centerName].latitude;
        this.$store.state.longitude = res.data[centerName].longitude;
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

    &-ment {
      font-size: 10px;
      line-height: 12px;
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
