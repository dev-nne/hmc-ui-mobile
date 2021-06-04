<template>
  <div class="consent">
    <div class="consent-title">위치기반 서비스 이용약관</div>
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
        시승차량에 장착된 블랙박스 단말을 통해 <span>차량 전방</span>이 촬영되고
        있음을 알려드립니다.
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

<style></style>
