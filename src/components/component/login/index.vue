<template>
  <div class="login">
    <TopMenu class="nav" />
    <!-- 메인 -->
    <div class="login-main">
      <div class="login-main-title">현대자동차 시승서비스</div>

      <div class="login-main-form-box">
        <input class="input" v-model="username" placeholder="이름" />
        <input
          type="number"
          class="input"
          v-model="phoneNum"
          placeholder="전화번호"
          pattern="\d*"
          maxlength="11"
          oninput="javascript: if (this.value.length >
              this.maxLength) this.value = this.value.slice(0, this.maxLength);"
        />

        <div class="login-main-form-box-button">
          <van-button
            color="#012c5f"
            block
            native-type="submit"
            class="loginBtn"
            @click="submit"
          >
            로그인
          </van-button>
        </div>

        <van-popup v-model="alert1" class="alert"
          ><p>
            예약 내역을 확인 할 수 없습니다.
            <br />예약하신 드라이빙 라운지에 문의해 주세요.
          </p>
          <button @click="closeAlert1">확인</button></van-popup
        >

        <van-popup v-model="alert2" class="alert"
          ><p>
            올바른 전화번호를 입력하세요.
          </p>
          <button @click="closeAlert2">확인</button></van-popup
        >
        <van-popup v-model="alert3" class="alert"
          ><p>
            이름을 입력하세요.
          </p>
          <button @click="closeAlert3">확인</button></van-popup
        >
      </div>
    </div>

    <div class="login-bottom">
      <FooterBar />
    </div>
  </div>
</template>

<script>
import {
  Icon,
  Form,
  Field,
  Button,
  Tabbar,
  TabbarItem,
  Notify,
  Popup
} from "vant";
import TopMenu from "../TopMenu.vue";
import FooterBar from "../FooterBar";
// import data from "@/public/bookingInfo.json";

export default {
  components: {
    [TabbarItem.name]: TabbarItem,
    [Notify.name]: Notify,
    [Popup.name]: Popup,
    [Tabbar.name]: Tabbar,
    [Button.name]: Button,
    [Field.name]: Field,
    [Form.name]: Form,
    [Icon.name]: Icon,
    TopMenu,
    FooterBar
  },
  data() {
    return {
      username: "",
      phoneNum: "",
      active: 0,
      value: "",
      show: false,
      alert1: false,
      alert2: false,
      alert3: false,
      param: ""
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.$router
      .push({ name: "login", query: { id: "2018072310011" } })
      .catch(() => {}); // 파라미터값 입력
    this.param = this.$route.query.id; // 파라미터값 받아오기
    console.log(this.$route.query.id);
  },
  methods: {
    submit() {
      // const phoneNumber = this.phoneNum.slice(-4, this.phoneNum.length);
      const phoneNumber = this.phoneNum;
      // const userInfo = {
      //   CHAN_SCN_CD: "02",
      //   ORG_SCN_CD: "A",
      //   SBCR_NM: this.username,
      //   SBCR_CCPC: phoneNumber
      // };
      const userInfo = {
        userName: this.username,
        phone: phoneNumber,
        tsrdPrctNo: this.param
      };

      // "2018072310011"

      if (this.username.length > 1) {
        if (this.phoneNum.length > 7) {
          if (this.$store.state.isLocal === true) {
            this.$axios
              .get("/static/bookingInfo.json")
              .then(res => {
                if (res.data.infoResponse.rsp_CD === JSON.stringify(0)) {
                  this.$store.state.auth = true;
                  this.$store.commit("userInfoSetting", res.data);
                  this.$router.push("provision");
                } else {
                  this.alert1 = true;
                }
              })
              .catch(err => {
                console.log("에러코드:" + err);
              });
          } else {
            this.$axios
              // .post("http://192.168.10.199:8080/mobile/login.do", userInfo)
              .post(
                "https://hyundai-driving.mocean.com/mobile/login.do",
                userInfo
              )
              .then(res => {
                console.log(res.data.infoResponse.rsp_CD);
                if (res.data.infoResponse.rsp_CD === "200") {
                  this.$store.state.auth = true;
                  this.$store.commit("userInfoSetting", res.data);

                  // 예약정보 확인후 user에 대한 동의 여부 및 싸인 여부에 대한 체크 API 호출
                  const userCheckObj = {
                    tsrdPrctNo: this.$store.state.userInfo.bookNumber
                  };

                  this.$axios
                    .post(
                      // "http://192.168.10.199:8080/mobile/getUserInfoById.do",
                      "https://hyundai-driving.mocean.com/mobile/getUserInfoById.do",
                      userCheckObj
                    )
                    // .post("/mobile/login.do", userInfo)
                    .then(res => {
                      // 인증 정보를 호출하여 인증정보에 따른 페이지 전환
                      console.log(res.data);
                      if (res.data.prctInfoAgrYn === "Y") {
                        if (res.data.prctInfoCjgtAgrYn === "Y") {
                          this.$router.push("provision"); // userPage
                        } else {
                          this.$router.push("provision"); // certification
                        }
                      } else {
                        this.$router.push("provision");
                      }
                    });
                } else {
                  this.alert1 = true;
                }
              });
          }
        } else {
          this.alert2 = true;
        }
      } else {
        this.alert3 = true;
      }
    },
    closeAlert1() {
      this.alert1 = false;
    },
    closeAlert2() {
      this.alert2 = false;
    },
    closeAlert3() {
      this.alert3 = false;
    }
  }
};
</script>
