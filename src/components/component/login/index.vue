<template>
  <div class="login">
    <TopMenu class="nav" />
    <!-- 메인 -->
    <div class="login-main">
      <div class="login-main-title">현대자동차 시승서비스</div>

      <div class="login-main-form-box">
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="Username"
            label=""
            placeholder="이름"
            :rules="[{ required: true, message: 'Username is required' }]"
          />
          <van-field
            v-model="password"
            name="Phone-number"
            label=""
            placeholder="전화번호"
            :rules="[{ required: true, message: 'Password is required' }]"
          />
          <div class="login-main-form-box-button">
            <van-button
              color="#012c5f"
              block
              native-type="submit"
              class="loginBtn"
              @click="test"
            >
              로그인
            </van-button>
          </div>
        </van-form>
      </div>
    </div>

    <div class="login-bottom">
      <FooterBar />
    </div>
  </div>
</template>

<script>
import { Icon, Form, Field, Button, Tabbar, TabbarItem, Notify } from "vant";
import TopMenu from "../TopMenu.vue";
import FooterBar from "../FooterBar";
import axios from "axios";

export default {
  components: {
    [TabbarItem.name]: TabbarItem,
    [Notify.name]: Notify,
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
      password: "",
      active: 0
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
      this.$router.push("provision");
    },
    test() {
      axios
        .get("https://reqres.in/api/users?page=2")
        .then(res => console.log(res))
        .catch(err => {
          console.log(err);
          Notify({ type: "danger", message: "이름과 전화번호를 확인하세요" });
        })
        .then(() => {
          // always
          console.log("test");
        });
    }
  }
};
</script>
