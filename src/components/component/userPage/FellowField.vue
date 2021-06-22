<template>
  <div class="fel">
    <div class="fel-title">[동승자 정보 입력]</div>

    <van-form>
      <div class="nameInput">
        <input class="input" v-model="fellowname" placeholder="이름" />
        <div class="rules" :class="{ ruleAdd: nameRule }">
          올바른 이름을 입력해 주세요.
        </div>
      </div>

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
  methods: {
    submitFellow() {
      const phoneNumber = `${this.phoneNum1}-${this.phoneNum2}-${this.phoneNum3}`;
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
              if (res.data.infoResponse.rsp_CD === JSON.stringify(1)) {
                this.$store.commit("felloInfoSetting", res.data);
                Toast("동승자가 추가되었습니다.");
              } else {
                Dialog.alert({
                  message: res.data.infoResponse.infoResponse,
                  confirmButtonText: "확인"
                });
              }
            })
            .catch(err => console.log(err));
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
      this.fellowname = "";
      this.phoneNum1 = "";
      this.phoneNum2 = "";
      this.phoneNum3 = "";
      this.$emit("cancelPop", false);
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
