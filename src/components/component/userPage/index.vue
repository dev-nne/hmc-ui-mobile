<template>
  <div class="user">
    <TopMenu />
    <div class="user-main">
      <div class="user-main-carbox">
        <div class="user-main-carbox-text">
          <h2>쏘나타 Premium Plus</h2>
          <span>123허4567</span>
        </div>

        <div class="user-main-carbox-img">
          <img src="@/assets/car.png" alt="" />
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
              @click="[clickBtn(0), openDoor()]"
              :class="{ clicked: img[0].click }"
            >
              <img :src="img[0].click ? img[0].srcW : img[0].src" />
            </div>
            <span>문 열기</span>
          </div>
          <div class="user-main-smartkey-icon-box-circle">
            <div
              class="user-main-smartkey-icon-box-circle-box"
              @click="[clickBtn(1), closeDoor()]"
              :class="{ clicked: img[1].click }"
            >
              <img :src="img[1].click ? img[1].srcW : img[1].src" />
            </div>
            <span>문 잠금</span>
          </div>
          <div class="user-main-smartkey-icon-box-circle">
            <div
              class="user-main-smartkey-icon-box-circle-box"
              @click="[clickBtn(2), carAlert()]"
              :class="{ clicked: img[2].click }"
            >
              <img :src="img[2].click ? img[2].srcW : img[2].src" />
            </div>
            <span>비상등</span>
          </div>
          <div class="user-main-smartkey-icon-box-circle">
            <div
              class="user-main-smartkey-icon-box-circle-box"
              @click="[clickBtn(3), handleCarReturn()]"
              :class="{ clicked: img[3].click }"
            >
              <img :src="img[3].click ? img[3].srcW : img[3].src" />
            </div>
            <span>차량반납</span>
          </div>
        </div>
      </div>
      <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: '25%' }"
        class="returnPop"
        @click-overlay="cancelCarReturn"
      >
        <h1>[차량 반납]</h1>
        <p>차량 반납 후에는 차량 이용이 불가능합니다.</p>
        <div class="button-box">
          <button class="returnBtn" @click="clickCarReturn">반납</button>
          <button @click="cancelCarReturn">취소</button>
        </div>
      </van-popup>
      <div class="user-main-contact">
        {{ this.contactCenter }}
        <a ref="callNum" href="">{{ this.contactNumber }}</a>
      </div>
    </div>

    <FooterBar />
  </div>
</template>

<script>
import { Popup, Notify } from "vant";
import TopMenu from "../TopMenu";
import FooterBar from "../FooterBar";
import UserInfo from "../provision/UserInfo";
import img1 from "@/assets/icon2.png";
import img2 from "@/assets/icon1.png";
import img3 from "@/assets/icon3.png";
import img4 from "@/assets/icon4.png";
import img1W from "@/assets/icon2_white.png";
import img2W from "@/assets/icon1_white.png";
import img3W from "@/assets/icon3_white.png";
import img4W from "@/assets/icon4_white.png";

export default {
  components: {
    [Popup.name]: Popup,
    [Notify.name]: Notify,
    TopMenu,
    FooterBar,
    UserInfo
  },
  data() {
    return {
      img: [
        { click: false, src: img1, srcW: img1W },
        { click: false, src: img2, srcW: img2W },
        { click: false, src: img3, srcW: img3W },
        { click: false, src: img4, srcW: img4W }
      ],
      show: false,
      contactNumber: "02-3409-7365",
      contactCenter: "드라이빙라운지 성수"
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.$refs.callNum.href = `tel:${this.contactNumber}`;
  },
  methods: {
    clickBtn(x) {
      this.img.map(x => {
        x.click = false;
      });
      this.img[x].click = true;
    },
    openDoor() {
      Notify({
        type: "primary",
        message: "잠금이 해제되었습니다.",
        duration: 1500
      });
    },
    closeDoor() {
      Notify({
        type: "primary",
        message: "잠금설정 되었습니다.",
        duration: 1500
      });
    },
    carAlert() {
      Notify({
        type: "primary",
        message: "경적이 울립니다.",
        duration: 1500
      });
    },
    handleCarReturn() {
      this.show = true;
    },
    clickCarReturn() {
      this.$router.push("returnPage");
    },
    cancelCarReturn() {
      this.show = false;
      this.img[3].click = false;
    }
  }
};
</script>

<style></style>
