<template>
  <div class="login">
    <TopMenu class="nav" />
    <!-- 메인 -->
    <div class="login-main">
      <div class="login-main-title">현대자동차 시승서비스</div>

      <div class="login-main-form-box">
        <van-form>
          <van-field
            v-model="username"
            name="Username"
            label=""
            placeholder="이름"
            :rules="[{ required: true, message: 'Username is required' }]"
          />
          <van-field
            v-model="phoneNum"
            readonly
            clickable
            :value="phoneNum"
            @touchstart.native.stop="show = true"
            placeholder="전화번호"
            :rules="[{ required: true, message: 'Phone Number is required' }]"
          />
          <van-number-keyboard
            v-model="phoneNum"
            :show="show"
            :maxlength="11"
            @blur="show = false"
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
        </van-form>

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
  Popup,
  NumberKeyboard
} from "vant";
import TopMenu from "../TopMenu.vue";
import FooterBar from "../FooterBar";
// import data from "@/public/bookingInfo.json";

export default {
  components: {
    [TabbarItem.name]: TabbarItem,
    [NumberKeyboard.name]: NumberKeyboard,
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
      alert3: false
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    submit() {
      const phoneNumber = this.phoneNum.slice(-4, this.phoneNum.length);
      const userInfo = {
        CHAN_SCN_CD: "02",
        ORG_SCN_CD: "A",
        SBCR_NM: this.username,
        SBCR_CCPC: phoneNumber
      };

      if (this.username.length > 1) {
        if (this.phoneNum.length > 9) {
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
            this.$axios.post("/static/bookingInfo.json", userInfo).then(res => {
              if (res.data.infoResponse.rsp_CD === JSON.stringify(0)) {
                this.$store.state.auth = true;
                this.$store.commit("userInfoSetting", res.data);
                this.$router.push("provision");
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
