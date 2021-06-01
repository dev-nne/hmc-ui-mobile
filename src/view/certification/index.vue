<template>
  <div class="cert">
    <div class="cert-logo"></div>
    <div class="cert-title">
      <h3>운전면허인증</h3>
    </div>
    <div class="cert-content">
      21세 이상 유효 면허 고객님만 시승 이용이 가능합니다.<br />
      반드시 본인의 운전면허증을 등록해 주세요.<br />
      타인의 운전면허 등록시, 법적 조치를 받을 수 있습니다.
    </div>
    <div class="cert-sub">
      <div class="cert-sub-type">
        <div class="cert-sub-type-title">
          운전면허인증
        </div>
        <van-row gutter="20">
          <van-col span="6"
            ><van-button class="cert-sub-type-botton active"
              >2종 보통</van-button
            ></van-col
          >
          <van-col span="6"
            ><van-button class="cert-sub-type-botton"
              >1종 소형</van-button
            ></van-col
          >
          <van-col span="6"
            ><van-button class="cert-sub-type-botton"
              >1종 보통</van-button
            ></van-col
          >
          <van-col span="6"
            ><van-button class="cert-sub-type-botton"
              >1종 대형</van-button
            ></van-col
          >
        </van-row>
      </div>
      <div class="cert-sub-type">
        <div class="cert-sub-type-title">면허 번호</div>
        <div class="cert-sub-type-num">
          <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" />
          </van-dropdown-menu>
        </div>
        <div class="cert-sub-type-title">발급일</div>
        <div>2010년 05월 20일</div>
      </div>
      <div>인증하기</div>
    </div>
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
  DropdownMenu,
  DropdownItem
} from "vant";
export default {
  components: {
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
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
      value1: 0,
      option1: [
        { text: "서울", value: 0 },
        { text: "경기", value: 1 },
        { text: "제주", value: 2 }
      ]
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    }
  }
};
</script>

<style lang="less">
.cert {
  &-logo {
    height: 40px;
    border-bottom: 1px solid #aaa;
    background: url("https://www.hyundai.com/static/images/logo.png") 15px -15px
      no-repeat;
  }
  &-title {
    padding: 0 15px;
    font-weight: bold;
  }
  &-content {
    padding: 0 15px;
    font-size: 14px;
    margin-bottom: 15px;
  }
  &-sub {
    background: #eaeaea;
    padding: 15px;
    &-type {
      padding: 15px;
      background: #fff;
      border-radius: 4px;
      margin-bottom: 15px;
      &-title {
        font-weight: bold;
        margin-bottom: 10px;
      }
      &-botton {
        width: 100%;
        background: #ddd;
        color: #333;
        border-radius: 4px;
      }
      &-botton.active {
        background: rgb(26, 0, 119);
        color: #fff;
      }
      &-num {
        border-radius: 4px;
        background: #000;
      }
    }
  }
}
</style>
