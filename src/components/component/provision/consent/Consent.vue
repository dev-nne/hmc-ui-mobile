<template>
  <div class="consent">
    <div class="consent-title">
      위치정보 수집장치 부착사실 고지
    </div>
    <div class="consent-box">
      <div class="consent-box-title">
        위치정보 수집장치 부착사실 고지
      </div>
      <div class="consent-box-content">
        시승차량에 장착된 블루링크 단말 및 차량관제시스템(FMS) 단말을 통해
        시승서비스 이용시간 동안 시승차량 및 고객님의 위치정보가 수집됨을
        알려드립니다.
      </div>
    </div>

    <div class="consent-box">
      <div class="consent-box-title">
        영상정보 수집장치 부착사실 고지
      </div>
      <div class="consent-box-content">
        시승차량에 장착된 블랙박스 단말을 통해 차량 전/후방이 촬영되고 있음을
        알려드립니다.
      </div>
    </div>

    <div class="consent-button">
      <button @click="checkAgree">동의합니다</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    checkAgree() {
      this.$emit("sentToAgreement");
    }
  }
};
</script>

<style lang="less">
.consent {
  width: 100%;

  &-title {
    font-weight: 800;
    font-size: 16px;
    padding: 10px 0;
    font-family: "HyundaiSansHead";
    width: 90%;
    line-height: 19px;
  }

  &-box {
    &-title {
      font-size: 14px;
      font-weight: 600;
      padding: 5px 0;
      font-family: "HyundaiSansHead";
    }

    &-content {
      font-size: 14px;
      padding: 10px;
      line-height: 18px;
      background: #eeeeee;
      margin-bottom: 10px;

      span {
        color: #e63312;
        font-weight: 600;
      }
    }
  }

  &-button {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p,
    h5 {
      font-size: 12px;
      color: rgb(99, 99, 99);
      margin-bottom: 10px;
      line-height: 14px;
    }

    h5 {
      font-weight: 400;
      color: #e63312;
    }

    p {
      text-align: center;
      width: 90%;
    }

    button {
      padding: 10px 0;
      border: none;
      outline: none;
      background: #012c5f;
      font-family: "HyundaiSansHead";
      color: white;
      width: 60%;
    }
  }
}
</style>
