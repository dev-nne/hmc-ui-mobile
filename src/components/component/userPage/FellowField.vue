<template>
  <div class="fel">
    <div class="fel-title">[동승자 정보 입력]</div>

    <van-form>
      <van-field
        v-model="fellowname"
        name="fellowname"
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
        get-container="body"
        z-index="10000"
        close-button-text="close"
      />
      <div class="fel-title-button">
        <van-button
          color="#012c5f"
          block
          class="submitBtn"
          @click="submitFellow"
        >
          확인
        </van-button>
        <van-button block class="closeBtn" @click="cancelFellow">
          취소
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Form, Field, Button, NumberKeyboard, Toast } from "vant";
export default {
  components: {
    [NumberKeyboard.name]: NumberKeyboard,
    [Button.name]: Button,
    [Field.name]: Field,
    [Form.name]: Form,
    [Toast.name]: Toast
  },
  data() {
    return {
      fellowname: "",
      phoneNum: "",
      value: "",
      show: false
    };
  },
  methods: {
    submitFellow() {
      const phoneNumber = this.phoneNum.slice(-4, this.phoneNum.length);
      const fellowInfo = {
        CHAN_SCN_CD: "02",
        ORG_SCN_CD: "A",
        SBCR_NM: this.fellowname,
        SBCR_CCPC: phoneNumber
      };

      if (this.$store.state.isLocal === true) {
        this.$store.state.fellow = true;
        this.$emit("cancelPop", false);
      } else {
        this.$store.state.fellow = true;
        this.$axios.post("/static/bookingInfo.json", fellowInfo).then(res => {
          if (res.data.infoResponse.rsp_CD === JSON.stringify(0)) {
            this.$store.state.auth = true;
            this.$store.commit("felloInfoSetting", res.data);
            this.$router.push("provision");
          } else {
            this.alert = true;
          }
        });
        this.$emit("cancelPop", false);
      }
      Toast("동승자가 추가되었습니다.");
    },
    cancelFellow() {
      this.$emit("cancelPop", false);
    }
  }
};
</script>

<style lang="less">
.fel {
  width: 100%;
  padding: 20px 15px;

  &-title {
    width: 100%;
    text-align: center;
    font-weight: 600;
    padding: 10px 0 20px 0;

    &-button {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-top: 30px;
      margin-bottom: 10px;
      font-size: 14px;

      button {
        width: 48.5%;
        height: auto;
        padding: 8px 0;
      }

      .closeBtn {
        background: #e2e2e2;
        border: none;
      }
    }
  }
  .van-form {
    margin-top: 10px;

    .van-cell {
      line-height: 20px;
      margin-bottom: 15px;
    }
  }
}
.van-number-keyboard {
  width: 100%;
}
</style>
