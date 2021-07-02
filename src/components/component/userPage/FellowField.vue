<template>
  <div class="fel">
    <div class="fel-title">[동승자 정보 입력]</div>

    <van-form>
      <div class="nameInput">
        <input
          type="text"
          class="input"
          v-model="fellowname"
          placeholder="이름"
          pattern="[^ㄱ-힣a-zA-Z]*"
          @keyup="checkKorean"
        />
        <div class="rules" :class="{ ruleAdd: nameRule }">
          올바른 이름을 입력해 주세요.
        </div>
      </div>

      <div class="inputBox">
        <input
          ref="input"
          type="tel"
          class="inputBox-input"
          placeholder="010"
          v-model="phoneNum1"
          pattern="[0-9]*"
          maxlength="3"
          oninput="javascript: if (this.value.length >
              this.maxLength) this.value = this.value.slice(0, this.maxLength);"
          @keyup="nextInput"
          @keydown="fullText(3)"
        />
        <div class="line"></div>
        <input
          ref="input2"
          type="tel"
          class="inputBox-input"
          v-model="phoneNum2"
          placeholder="0000"
          pattern="[0-9]*"
          maxlength="4"
          oninput="javascript: if (this.value.length >
              this.maxLength) this.value = this.value.slice(0, this.maxLength);"
          @keyup="nextInput2"
          @keydown="fullText(4)"
        />
        <div class="line"></div>
        <input
          ref="input3"
          type="tel"
          class="inputBox-input"
          v-model="phoneNum3"
          placeholder="0000"
          pattern="[0-9]*"
          maxlength="4"
          oninput="javascript: if (this.value.length >
              this.maxLength) this.value = this.value.slice(0, this.maxLength);"
          @keyup="checkNumber"
          @keydown="fullText(4)"
        />
        <div class="rules" :class="{ ruleAdd: numRule }">
          올바른 전화번호를 입력해 주세요.
        </div>
      </div>
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
import { Form, Button, Toast, Dialog } from "vant";
export default {
  components: {
    [Button.name]: Button,
    [Form.name]: Form,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      fellowname: "",
      phoneNum1: "",
      phoneNum2: "",
      phoneNum3: "",
      value: "",
      show: false,
      nameRule: false,
      numRule: false
    };
  },
  computed: {
    sessionEnd() {
      return this.$store.state.sessionEnd;
    }
  },
  watch: {
    sessionEnd(v) {
      if (v) {
        Dialog.alert({
          message: "세션이 만료되었습니다. 로그인페이지로 이동합니다.",
          confirmButtonText: "확인"
        });
        this.$router.push({
          path: "login",
          query: { id: this.$store.state.userInfo.bookNumber }
        });
      }
    }
  },
  methods: {
    submitFellow() {
      this.$store.commit("sessionEnd");
      const phoneNumber = `${this.phoneNum1}-${this.phoneNum2}-${this.phoneNum3}`;
      this.nameRule = false;
      this.numRule = false;
      const fellowInfo = {
        tsrdPrctNo: this.$store.state.userInfo.bookNumber,
        passengerName: this.fellowname,
        passengerPhone: phoneNumber
      };

      if (
        this.fellowname.length < 2 &&
        this.phoneNum1 === "" &&
        this.phoneNum2 === "" &&
        this.phoneNum3 === ""
      ) {
        this.nameRule = true;
        this.numRule = true;
      } else if (this.fellowname.length > 1) {
        this.nameRule = false;
        if (
          this.phoneNum1 !== "" &&
          this.phoneNum2 !== "" &&
          this.phoneNum3 !== ""
        ) {
          this.$axios
            .post(
              "https://hyundai-driving.mocean.com/mobile/registerPassenger.do",
              fellowInfo
            )
            .then(res => {
              if (res.data.infoResponse.rsp_CD === "200") {
                this.$store.commit("felloInfoSetting", res.data);
                Dialog.alert({
                  message:
                    "동승 고객 등록 신청이 완료되었습니다. 동승 고객에게 발송된 문자메세지를 참고하여 절차를 완료해주세요.",
                  confirmButtonText: "확인"
                });
              } else {
                Dialog.alert({
                  message: "동승 고객 등록에 실패하였습니다.",
                  confirmButtonText: "확인"
                });
              }
            })
            .catch(() => {
              Dialog.alert({
                message: "동승 고객 등록에 실패하였습니다.",
                confirmButtonText: "확인"
              });
            });
          this.$emit("cancelPop", false);
          this.fellowname = "";
          this.phoneNum1 = "";
          this.phoneNum2 = "";
          this.phoneNum3 = "";
        } else {
          this.numRule = true;
        }
      } else {
        this.nameRule = true;
      }
    },
    cancelFellow() {
      this.$store.commit("sessionEnd");
      this.fellowname = "";
      this.phoneNum1 = "";
      this.phoneNum2 = "";
      this.phoneNum3 = "";
      this.$emit("cancelPop", false);
      this.nameRule = false;
      this.numRule = false;
    },
    nextInput() {
      this.checkNumber(event);
      if (this.$refs.input.value.length === 3) {
        this.checkNumber(event);
        if (this.$refs.input.value.length === 3) {
          event.returnValue = false;
          if (this.$refs.input2.value.length !== 4) this.$refs.input2.focus();
        }
      }
    },
    nextInput2() {
      this.checkNumber();
      if (this.$refs.input2.value.length === 4) {
        this.checkNumber();
        if (this.$refs.input2.value.length === 4) {
          event.returnValue = false;
          if (this.$refs.input3.value.length !== 4) this.$refs.input3.focus();
        }
      }
    },
    checkKorean() {
      let e = event.target;
      this.fellowname = e.value.replace(
        /([\\.\\,\\/\\|\\-\\_\\;\\·\1-9\d\u002D\u005B\u0022\u0027\u005D\uFFE6\u0023\u002C\u007C\u02DA\u2022\u00B0\u005F]|[~!@#＃$%`^&*×÷–—-₩《》○◇♧♤€£¥¤•º¿¡,￠()□#■♡☆♥_※●+|<>=?:{}])/g,
        ""
      );
    }
  },
  checkNumber() {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
  },
  fullText(x) {
    if (event.target.value.length === x) {
      if (event.keyCode === 8) {
        event.returnValue = true;
      } else {
        event.returnValue = false;
      }
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
  .nameInput {
    width: calc(100% - 30px);
    position: relative;
    margin-bottom: 10px;
    margin: 10px 10px 20px 10px;

    .input {
      width: 100%;
      border: none;
      border-bottom: 1px solid #ebedf0;
      padding: 5px 0;
      font-size: 14px;
      position: relative;
    }
  }

  ::placeholder {
    color: rgba(0, 0, 0, 0.25);
    font-size: 14px;
  }

  .inputBox {
    width: calc(100% - 30px);
    margin: 10px 10px 20px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .line {
      width: 2%;
      height: 1px;
      background: #d3d3d3;
    }

    &-input {
      width: 27%;
      padding: 5px 0;
      border: none;
      border-bottom: 1px solid #ebedf0;
      font-size: 14px;
      text-align: center;
    }
  }

  .rules {
    font-size: 12px;
    position: absolute;
    top: 110%;
    left: 0;
    z-index: 1;
    color: #e63312;
    display: none;
  }

  .ruleAdd {
    display: block;
  }
}
</style>
