<template>
  <div class="login">
    <TopMenu class="nav" />
    <!-- 메인 -->
    <div class="login-main">
      <div class="login-main-title">현대자동차 시승서비스</div>

      <div class="login-main-form-box">
        <input class="input" v-model="username" placeholder="이름" />

        <div class="inputBox">
          <input
            ref="input"
            type="number"
            class="inputBox-input"
            placeholder="010"
            v-model="phoneNum1"
            pattern="\d*"
            maxlength="3"
            oninput="javascript: if (this.value.length >
              this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            @keyup="nextInput()"
          />
          <div class="line"></div>
          <input
            ref="input2"
            type="number"
            class="inputBox-input"
            v-model="phoneNum2"
            placeholder="0000"
            pattern="\d*"
            maxlength="4"
            oninput="javascript: if (this.value.length >
              this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            @keyup="nextInput2()"
          />
          <div class="line"></div>
          <input
            ref="input3"
            type="number"
            class="inputBox-input"
            v-model="phoneNum3"
            placeholder="0000"
            pattern="\d*"
            maxlength="4"
            oninput="javascript: if (this.value.length >
              this.maxLength) this.value = this.value.slice(0, this.maxLength);"
          />
        </div>

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
      phoneNum1: "",
      phoneNum2: "",
      phoneNum3: "",
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
    let paramInfo = window.location.search;
    if (paramInfo !== "") {
      let paramArr = paramInfo.split("=");
      this.$store.state.userInfo.bookNumber = paramArr[1];
    }
    // this.$router
    // .push({ name: "login", query: { id: "2018072310011" } })
    //   .catch(() => {}); // 파라미터값 입력
    // this.param = this.$route.query.id; // 파라미터값 받아오기
    // console.log(this.$route.query.id);
  },
  methods: {
    submit() {
      const phoneNumber = `${this.phoneNum1}-${this.phoneNum2}-${this.phoneNum3}`;
      const userInfo = {
        userName: this.username,
        phone: phoneNumber,
        tsrdPrctNo: this.$store.state.userInfo.bookNumber
        // tsrdPrctNo: this.param
      };

      if (this.username.length > 1) {
        if (phoneNumber.length > 10) {
          this.$axios
            .post(
              "https://hyundai-driving.mocean.com/mobile/login.do",
              userInfo
            )
            .then(res => {
              if (res.data.infoResponse.rsp_CD === "200") {
                this.$store.state.auth = true;
                this.$store.commit("userInfoSetting", res.data);
                const userCheckObj = {
                  tsrdPrctNo: this.$store.state.userInfo.bookNumber
                };
                document.cookie = `app_info=${JSON.stringify(
                  this.$store.state
                )}`;
                this.$axios
                  .post(
                    "https://hyundai-driving.mocean.com/mobile/getUserInfoById.do", // updateOriginUserInfo
                    userCheckObj
                  )
                  .then(res => {
                    if (res.data.prctInfoAgrYn === "Y") {
                      if (res.data.prctInfoCjgtAgrYn === "Y") {
                        this.$router.push("provision"); // userPage
                      } else {
                        this.$router.push("certification"); // certification
                      }
                    } else {
                      this.$router.push("provision");
                    }
                  });
              } else {
                this.alert1 = true;
              }
            });
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
    },
    nextInput() {
      if (this.$refs.input.value.length === 3) {
        this.$refs.input2.focus();
      }
    },
    nextInput2() {
      if (this.$refs.input2.value.length === 4) {
        this.$refs.input3.focus();
      }
    }
  }
};
</script>
