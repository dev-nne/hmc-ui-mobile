<template>
  <div class="user">
    <TopMenu />
    <div class="user-main">
      <div class="user-main-carbox">
        <div class="user-main-carbox-text">
          <h2>{{ this.userInfo.carName }}</h2>
          <span>{{ this.userInfo.carNumber }}</span>
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

      <div class="user-main-contact">
        <!-- {{ `${this.userInfo.centerName} ${this.userInfo.spaceName}` }} -->
        고객센터 문의

        <a ref="callNum" href="">
          <!-- {{ this.userInfo.spaceNumber }} -->
          1833-2654
        </a>
      </div>
    </div>
    <van-loading
      type="spinner"
      color="#1989fa"
      vertical
      v-if="loading"
      class="loading"
    />
    <FooterBar />
  </div>
</template>

<script>
import { Popup, Notify, Dialog, Loading } from "vant";
import TopMenu from "../TopMenu";
import FooterBar from "../FooterBar";
import FellowField from "./FellowField.vue";
import UserInfo from "../provision/UserInfo";

export default {
  components: {
    [Popup.name]: Popup,
    [Notify.name]: Notify,
    [Dialog.name]: Dialog,
    [Loading.name]: Loading,
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
      loading: false,
      res: ""
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    // this.$refs.callNum.href = `tel:${this.contactNumber}`;
    this.$refs.callNum.href = "tel:1833-2654";
  },
  created() {
    this.userInfo = this.$store.state.userInfo;
    console.log(this.$store.commit.getCookie);
  },
  methods: {
    confirm1() {
      this.show = [...false];

      let doorObj = {
        tsrdPrctNo: this.$store.state.userInfo.bookNumber, // 임시
        action: "open" // open, close
      };
      this.loading = true;
      this.$axios
        .post("https://hyundai-driving.mocean.com/controls/door.do", doorObj)
        .then(res => {
          setTimeout(() => {
            this.$axios
              .post(
                "https://hyundai-driving.mocean.com/controls/checkControlResponse.do ",
                { commandID: res.data.commandID }
              )
              .then(res => {
                console.log(res);
                if (res.data.commandState === "DONE") {
                  this.loading = false;
                  Notify({
                    type: "primary",
                    message: "잠금이 해제되었습니다.",
                    duration: 1500
                  });
                } else {
                  this.loading = false;

                  Dialog.alert({
                    message: "잠금해제에 실패하였습니다.",
                    confirmButtonText: "확인"
                  });
                }
              })
              .catch(err => {
                console.log(err);
                this.loading = false;
              });
          }, 2000);
        })
        .catch(err => {
          Dialog.alert({
            message: err,
            confirmButtonText: "확인"
          });
          this.loading = false;
        });
    },
    confirm2() {
      this.show = [...false];

      let doorObj = {
        tsrdPrctNo: this.$store.state.userInfo.bookNumber, // 임시
        action: "close" // open, close
      };
      this.loading = true;
      this.$axios
        .post("https://hyundai-driving.mocean.com/controls/door.do", doorObj)
        .then(res => {
          setTimeout(() => {
            this.$axios
              .post(
                "https://hyundai-driving.mocean.com/controls/checkControlResponse.do ",
                { commandID: res.data.commandID }
              )
              .then(res => {
                console.log(res);
                if (res.data.commandState === "DONE") {
                  this.loading = false;
                  Notify({
                    type: "primary",
                    message: "잠금이 설정되었습니다.",
                    duration: 1500
                  });
                } else {
                  this.loading = false;

                  Dialog.alert({
                    message: "잠금설정에 실패하였습니다.",
                    confirmButtonText: "확인"
                  });
                }
              })
              .catch(err => {
                console.log(err);
                this.loading = false;
              });
          }, 2000);
        })
        .catch(err => {
          Dialog.alert({
            message: err,
            confirmButtonText: "확인"
          });
          this.loading = false;
        });
    },
    confirm3() {
      this.show = [...false];
      let hornObj = {
        tsrdPrctNo: this.$store.state.userInfo.bookNumber // 임시
      };
      this.loading = true;
      this.$axios
        .post("https://hyundai-driving.mocean.com/controls/flasher.do", hornObj)
        .then(res => {
          setTimeout(() => {
            this.$axios
              .post(
                "https://hyundai-driving.mocean.com/controls/checkControlResponse.do ",
                { commandID: res.data.commandID }
              )
              .then(res => {
                if (res.data.commandState === "DONE") {
                  this.loading = false;
                  Notify({
                    type: "primary",
                    message: "비상등을 켭니다.",
                    duration: 1500
                  });
                } else {
                  this.loading = false;

                  Dialog.alert({
                    message: "비상등켜기에 실패하였습니다.",
                    confirmButtonText: "확인"
                  });
                }
              })
              .catch(err => {
                Dialog.alert({
                  message: err,
                  confirmButtonText: "확인"
                });
                this.loading = false;
              });
          }, 2000);
        })
        .catch(err => {
          Dialog.alert({
            message: err,
            confirmButtonText: "확인"
          });
          this.loading = false;
        });
    },
    clickCarReturn() {
      // this.$store.state.auth = false;
      // this.$store.state.fellow = false;

      let returnObj = {
        tsrdPrctNo: this.$store.state.userInfo.bookNumber // 임시
      };
      this.show[3] = false;
      this.loading = true;
      this.$axios
        .post(
          "https://hyundai-driving.mocean.com/controls/checkCarStatus.do",
          returnObj
        )
        .then((res, req) => {
          let doorObj = res.data.doorOpenStatus;
          let lampObj = res.data.lampStatus;
          let windowObj = res.data.windowStatus;

          setTimeout(() => {
            if (res.data.engine === "0") {
              if (Object.values(doorObj).filter(v => v === "1").length === 0) {
                if (
                  Object.values(lampObj).filter(v => v === "1").length === 0
                ) {
                  if (
                    Object.values(windowObj).filter(v => v === "1").length === 0
                  ) {
                    if (res.data.trunk === "0") {
                      this.$axios
                        .post(
                          "https://hyundai-driving.mocean.com/controls/checkDistanceToOrg.do",
                          returnObj
                        )
                        .then(res => {
                          this.loading = false;
                          if (res.data.resultMap.distance < 300) {
                            sessionStorage.removeItem("userInfo");
                            this.$router.push("returnPage");
                          } else {
                            Dialog.alert({
                              message: "차량이 너무 멀리 있습니다.",
                              confirmButtonText: "확인"
                            });
                          }
                        })
                        .catch(err => {
                          Dialog.alert({
                            message: err,
                            confirmButtonText: "확인"
                          });
                        });
                    } else {
                      this.loading = false;
                      Dialog.alert({
                        message: "트렁크를 확인해주세요",
                        confirmButtonText: "확인"
                      });
                    }
                  } else {
                    this.loading = false;
                    Dialog.alert({
                      message: "창문을 확인해주세요",
                      confirmButtonText: "확인"
                    });
                  }
                } else {
                  this.loading = false;
                  Dialog.alert({
                    message: "비상등을 확인해주세요",
                    confirmButtonText: "확인"
                  });
                }
              } else {
                this.show[3] = false;
                this.loading = false;
                Dialog.alert({
                  message: "닫히지 않은 문이 있습니다",
                  confirmButtonText: "확인"
                });
              }
            } else {
              this.show[3] = false;
              this.loading = false;
              Dialog.alert({
                message: "시동이 꺼지지 않았습니다.",
                confirmButtonText: "확인"
              });
            }
          }, 2000);
        });
    },
    handlePopup(x) {
      this.show = [...this.show];
      this.show[x] = true;
    },
    cancel(x) {
      this.show = [...false];
    },
    fellowAdd() {
      this.fellow = true;
    },
    canclePop(v) {
      this.fellow = v;
    }
  }
};
</script>

<style></style>
