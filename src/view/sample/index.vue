<template>
  <div class="login">
    <van-row>
      <van-nav-bar
        title="Hyundai World Wide"
        border="true"
        left-text="Back"
        left-arrow
        class="login-header"
      />
    </van-row>
    <van-row>
      <van-col span="24"
        ><div class="login-title">현대자동차 시승 서비스</div></van-col
      >
    </van-row>
    <van-row span="24">
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
        <div style="margin: 40px;">
          <van-button color="#093a6b" block native-type="submit">
            로그인
          </van-button>
        </div>
      </van-form>
    </van-row>
    <van-row>
      <van-col span="24"
        ><div class="login-phone-number">고객센터 1833-2654</div></van-col
      >
    </van-row>
    <van-tabbar v-model="active" class="login-tabbar">
      <van-tabbar-item class="login-tabbar-item" icon="home-o"
        >Tab</van-tabbar-item
      >
      <van-tabbar-item class="login-tabbar-item" icon="search"
        >Tab</van-tabbar-item
      >
      <van-tabbar-item class="login-tabbar-item" icon="friends-o"
        >Tab</van-tabbar-item
      >
      <van-tabbar-item class="login-tabbar-item" icon="setting-o"
        >Tab</van-tabbar-item
      >
    </van-tabbar>
    <!-- <van-tabbar>
      <van-tabbar-item class="login-tabbar-item" icon="setting-o"
        >Hyundai Footer Info</van-tabbar-item
      >
    </van-tabbar> -->
    <van-row class="login-footer">
      <van-col span="24" class="login-footer-area"
        >현대자동차 풋터 정보</van-col
      >
    </van-row>
  </div>
</template>

<script>
import {
  Row,
  Col,
  Icon,
  Cell,
  CellGroup,
  Form,
  Field,
  Button,
  NavBar,
  Tabbar,
  TabbarItem
} from "vant";
export default {
  components: {
    [TabbarItem.name]: TabbarItem,
    [Tabbar.name]: Tabbar,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Field.name]: Field,
    [Form.name]: Form,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
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
      this.$router.push("certification");
    }
  }
};
</script>

<style lang="less">
.login {
  &-header {
    font-weight: bold;
  }
  &-title {
    // border-top: 1px solid #aaa;
    font-weight: bold;
    padding-top: 80px;
    padding-bottom: 50px;
    font-size: 24px;
    text-align: center;
  }
  &-phone-number {
    font-weight: bold;
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 18px;
    text-align: center;
  }
  &-tabbar {
    bottom: 50px !important;
  }
  &-tabbar-item {
    background: #333;
  }
  &-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    &-area {
      text-align: center;
      background: #333;
      width: 100%;
      height: 100%;
    }
  }
}
.van-nav-bar__title {
  font-weight: bold;
}
</style>
