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
            >
              로그인
            </van-button>
          </div>
        </van-form>
      </div>

      <div class="login-main-phone-number">
        고객센터 <a href="tel:1833-2654">1833-2654</a>
      </div>
    </div>

    <div class="login-bottom">
      <FooterBar />
    </div>
  </div>
</template>

<script>
import { Icon, Form, Field, Button, Tabbar, TabbarItem } from "vant";
import TopMenu from "../TopMenu.vue";
import FooterBar from "../FooterBar";

export default {
  components: {
    [TabbarItem.name]: TabbarItem,
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
  methods: {
    onSubmit(values) {
      console.log("submit", values);
      this.$router.push("provision");
    }
  }
};
</script>
