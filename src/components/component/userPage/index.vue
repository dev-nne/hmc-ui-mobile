<template>
  <div class="user">
    <TopMenu />
    <div class="user-main">
      <div class="user-main-carbox">
        <div class="user-main-carbox-text">
          <h2>{{ this.userInfo.carName }}</h2>
          <span>123허4567</span>
        </div>

        <div class="user-main-carbox-img">
          <img src="/static/car.png" alt="" />
        </div>
      </div>

      <div class="user-main-userinfo">
        <UserInfo />
      </div>

      <div class="user-main-smartkey">
        <div class="user-main-smartkey-title">스마트키</div>
        <div class="user-main-smartkey-icon-box">
          <div class="user-main-smartkey-icon-box-circle">
            <div
              class="user-main-smartkey-icon-box-circle-box"
              @click="handlePopup(0)"
              :class="{ clicked: show[0] }"
            >
              <img src="@/assets/icon2.svg" />
              <span>문 열기</span>
            </div>
          </div>
          <div class="user-main-smartkey-icon-box-circle">
            <div
              class="user-main-smartkey-icon-box-circle-box"
              @click="handlePopup(1)"
              :class="{ clicked: show[1] }"
            >
              <img src="@/assets/icon1.svg" />
              <span>문 잠금</span>
            </div>
          </div>
          <div class="user-main-smartkey-icon-box-circle">
            <div
              class="user-main-smartkey-icon-box-circle-box"
              @click="handlePopup(2)"
              :class="{ clicked: show[2] }"
            >
              <img src="@/assets/icon3.svg" />
              <span>비상등</span>
            </div>
          </div>
          <div class="user-main-smartkey-icon-box-circle">
            <div
              class="user-main-smartkey-icon-box-circle-box"
              @click="handlePopup(3)"
              :class="{ clicked: show[3] }"
            >
              <img src="@/assets/icon4.svg" />
              <span>차량반납</span>
            </div>
          </div>
        </div>
      </div>

      <van-popup
        v-model="show[0]"
        position="bottom"
        :style="{ height: '25%' }"
        class="returnPop"
        @click-overlay="cancel(0)"
      >
        <h1>[문 열기]</h1>
        <p>차량 반납 후에는 차량 이용이 불가능합니다.</p>
        <div class="button-box">
          <button class="returnBtn" @click="confirm1">확인</button>
          <button @click="cancel(0)">취소</button>
        </div>
      </van-popup>

      <van-popup
        v-model="show[1]"
        position="bottom"
        :style="{ height: '25%' }"
        class="returnPop"
        @click-overlay="cancel(1)"
      >
        <h1>[문 잠금]</h1>
        <p>차량 반납 후에는 차량 이용이 불가능합니다.</p>
        <div class="button-box">
          <button class="returnBtn" @click="confirm2">확인</button>
          <button @click="cancel(1)">취소</button>
        </div>
      </van-popup>

      <van-popup
        v-model="show[2]"
        position="bottom"
        :style="{ height: '25%' }"
        class="returnPop"
        @click-overlay="cancel(2)"
      >
        <h1>[비상등]</h1>
        <p>차량 위치 확인을 위해 비상등을 켭니다.</p>
        <div class="button-box">
          <button class="returnBtn" @click="confirm3">확인</button>
          <button @click="cancel(2)">취소</button>
        </div>
      </van-popup>

      <van-popup
        v-model="show[3]"
        position="bottom"
        :style="{ height: '25%' }"
        class="returnPop"
        @click-overlay="cancel(3)"
      >
        <h1>[차량 반납]</h1>
        <p>차량 반납 후에는 차량 이용이 불가능합니다.</p>
        <div class="button-box">
          <button class="returnBtn" @click="clickCarReturn">반납</button>
          <button @click="cancel(3)">취소</button>
        </div>
      </van-popup>

      <div class="user-main-fellow" @click="fellowAdd">
        동승자 교대 시승하기
      </div>

      <van-popup
        v-model="fellow"
        :close-on-click-overlay="false"
        class="fellowPop"
      >
        <FellowField @cancelPop="canclePop" />
      </van-popup>

      <van-popup
        v-model="fellow2"
        :close-on-click-overlay="false"
        class="fellowPop2"
      >
        <p>동승자를 추가할 수 없습니다.</p>
        <button @click="closeFellowPop">확인</button>
      </van-popup>

      <div class="user-main-contact">
        <!-- {{ `${this.userInfo.centerName} ${this.userInfo.spaceName}` }} -->
        고객센터 문의

        <a ref="callNum" href="">
          <!-- {{ this.userInfo.spaceNumber }} -->
          1833-2654
        </a>
      </div>
    </div>

    <FooterBar />
  </div>
</template>

<script>
import { Popup, Notify } from "vant";
import TopMenu from "../TopMenu";
import FooterBar from "../FooterBar";
import FellowField from "./FellowField.vue";
import UserInfo from "../provision/UserInfo";

export default {
  components: {
    [Popup.name]: Popup,
    [Notify.name]: Notify,
    TopMenu,
    FooterBar,
    UserInfo,
    FellowField
  },
  data() {
    return {
      fellow: false,
      show: [false, false, false, false],
      userInfo: {},
      fellow2: false
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    // this.$refs.callNum.href = `tel:${this.contactNumber}`;
    this.$refs.callNum.href = "tel:1833-2654";
  },
  created() {
    this.userInfo = this.$store.state.userInfo;
  },
  methods: {
    confirm1() {
      this.show = [...false];

      let doorObj = {
        tsrdPrctNo: "2018072310011", // 임시
        action: "open" // open, close
      };

      this.$axios
        // .post("http://192.168.10.199:8080/control/door.do", doorObj)
        .post("https://hyundai-driving.mocean.com/control/car.do", doorObj)
        // .post("https://hyundai-driving.mocean.com/control/car.do", doorObj)
        .then((res, req) => {
          console.log(res);
          Notify({
            type: "primary",
            message: "잠금이 해제되었습니다.",
            duration: 1500
          });
        });
    },
    confirm2() {
      this.show = [...false];

      let doorObj = {
        tsrdPrctNo: "2018072310011", // 임시
        action: "close" // open, closes
      };

      this.$axios
        // .post("/static/bookingInfo.json", userChecking)
        // .post("http://192.168.10.199:8080/control/door.do", doorObj)
        .post("https://hyundai-driving.mocean.com/control/car.do", doorObj)
        // .post("https://hyundai-driving.mocean.com/control/car.do", doorObj)

        .then((res, req) => {
          console.log(res);
          Notify({
            type: "primary",
            message: "잠금설정 되었습니다.",
            duration: 1500
          });
        });
    },
    confirm3() {
      this.show = [...false];
      let hornObj = {
        tsrdPrctNo: "2018072310011" // 임시
      };

      this.$axios
        // .post("/static/bookingInfo.json", userChecking)
        // .post("http://192.168.10.199:8080/control/horn.do", hornObj)
        .post("https://hyundai-driving.mocean.com/control/horn.do", hornObj)
        .then((res, req) => {
          console.log(res);
          Notify({
            type: "primary",
            message: "비상등을 켭니다.",
            duration: 1500
          });
        });
    },
    handlePopup(x) {
      this.show = [...this.show];
      this.show[x] = true;
    },
    clickCarReturn() {
      this.$router.push("returnPage");
      this.$store.state.auth = false;
      this.$store.state.fellow = false;

      let returnObj = {
        tsrdPrctNo: this.$store.state.userInfo.bookNumber // 임시
      };

      this.$axios
        // .post("/static/bookingInfo.json", userChecking)
        // .post("http://192.168.10.199:8080/control/return.do", returnObj)
        .post("https://hyundai-driving.mocean.com//control/check.do", returnObj)
        .then((res, req) => {
          if (res.data) {
            this.$axios
              // .post("/static/bookingInfo.json", userChecking)
              // .post("http://192.168.10.199:8080/control/return.do", returnObj)
              .post(
                "https://hyundai-driving.mocean.com/control/return.do",
                returnObj
              )
              .then((res, req) => {
                console.log(res);
              });
          }
        });
    },
    cancel(x) {
      this.show = [...false];
    },
    fellowAdd() {
      if (!this.$store.state.fellow) {
        this.fellow = true;
      } else {
        this.fellow2 = true;
      }
    },
    canclePop(v) {
      this.fellow = v;
    },
    closeFellowPop() {
      this.fellow2 = false;
    }
  }
};
</script>

<style></style>
